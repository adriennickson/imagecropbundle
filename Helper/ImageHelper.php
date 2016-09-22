<?php

namespace Pitech\ImageCropBundle\Helper;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class ImageHelper
{
    public function cropImage($cropData, UploadedFile $file, $destPath = null)
    {
        $path = $file->getRealPath();
        $type = explode('/', $file->getMimeType());

        if ($type[0] != 'image') {
            return;
        }

        switch ($type[1]) {
            case 'jpg':
            case 'jpeg':
                $srcFunc = 'imagecreatefromjpeg';
                $writeFunc = 'imagejpeg';
                $imageQuality = 100;
                break;
            case 'gif':
                $srcFunc = 'imagecreatefromgif';
                $writeFunc = 'imagegif';
                $imageQuality = null;
                break;
            case 'png':
                $srcFunc = 'imagecreatefrompng';
                $writeFunc = 'imagepng';
                $imageQuality = 9;
                break;
            default:
                return;
        }

        $this->doCrop($path, $destPath ?: $file->getRealPath(), $cropData, $srcFunc, $writeFunc, $imageQuality);
    }

    private function doCrop($path, $destPath, $cropData, $srcFunc, $writeFunc, $imageQuality)
    {
        $image = imagecrop($srcFunc($path), $this->getNormalizedCropData($cropData));

        $writeFunc($image, $destPath, $imageQuality);
        imagedestroy($image);
    }

    private function getNormalizedCropData($cropData)
    {
        $data = json_decode($cropData);

        $x = $data->x;
        $y = $data->y;
        $w = $data->width;
        $h = $data->height;

        if ($x < 0) {
            $w = $w + $x;
            $x = 0;
        }

        if ($y < 0) {
            $h = $h + $y;
            $y = 0;
        }

        return [
            'x' => $x,
            'y' => $y,
            'width' => $w,
            'height' => $h,
        ];
    }
}
