<?php

namespace Pitech\ImageCropBundle\Form\Type;

use Pitech\ImageCropBundle\Helper\ImageHelper;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Vich\UploaderBundle\Form\Type\VichImageType;

class CropImageType extends AbstractType
{
    private $helper;

    public function __construct(ImageHelper $helper)
    {
        $this->helper = $helper;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('imageData', HiddenType::class, [
            'required' => false,
        ]);

        $builder->addEventListener(FormEvents::POST_SUBMIT, function (FormEvent $event) {
            $data = $event->getData();

            if ($data['file']) {
                $this->helper->cropImage($data['imageData'], $data['file']);
            }
        });
    }

    public function getBlockPrefix()
    {
        return 'pitech_image_crop_crop_image';
    }

    public function getParent()
    {
        return VichImageType::class;
    }
}
