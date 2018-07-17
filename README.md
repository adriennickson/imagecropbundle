# Overview
The ImageCropBundle is a bundle for Symfony 3.4 / 4 that lets you crop images before uploading them.
It uses the Cropper jQuery library and integrates with VichUploaderBundle.

# Installation
To install this bundle, first you need to have jQuery installed, as well as the Cropper library.You can download Cropper from [here](https://github.com/fengyuanchen/cropper).Make sure you also installed and configured VichUploaderBundle.

Make sure that you include the css and js files from Cropper in your template:

```twig
<link href="{{ asset('css/cropper.min.css') }}" rel="stylesheet">
<script src="{{ asset('js/cropper.min.js') }}"></script>
```

Then you need to require the bundle in Composer:

```
    composer require "rares/image-crop-bundle"
```

Then enable the bundle in your AppKernel file:

```php
$bundles = [
	...,
	new Rares\ImageCropBundle\RaresImageCropBundle(),
];
```

You will then have to install the assets using the command:

```
bin/console assets:install --symlink
```

Then you need to include the script file provided with this bundle in your template:

```twig
<script src="{{ asset('bundles/raresimagecrop/js/image-crop.js') }}"></script>
```

Also, you need to configure twig to use the form theme defined in this bundle and also have vich uploader configured for an entity.

```yml
twig:
    form_themes:
        - 'VichUploaderBundle:Form:fields.html.twig'
        - 'RaresImageCropBundle:Form:fields.html.twig'
```

# Features

This bundle lets you resize (crop, zoom) and rotate images before uploading them to the server.To enable this functionality, in your form class, instead of using the default VichImageType form type for your image, you will have to use the type available in this bundle.The type has the same options as the vich image one.

```php
$builder
	->add('imageFile', CropImageType::class, [
                'required' => false,
                'label' => 'user.account.image',
                'download_link' => false,
            ]);
```

And that's it!You can now edit images before uploading them and this bundle will take care of the rest.
