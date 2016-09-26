# Overview
The ImageCropBundle is a bundle for Symfony 3 that lets you crop images before uploading them.
It uses the Cropper jQuery library and integrates with VichUploaderBundle.

# Installation
To install this bundle, first you need to have jQuery installed, as well as the Cropper library.You can download Cropper from [here](https://github.com/fengyuanchen/cropper).Make sure you also installed and configured VichUploaderBundle.

Make sure that you include the css and js files from Cropper in your template:

```twig
<link href="{{ asset('css/cropper.min.css') }}" rel="stylesheet">
<script src="{{ asset('js/cropper.min.js') }}"></script>
```

Then you need to add the following to your composer.json:

```json
    "require": {
		...,
		"pitech/image-crop-bundle": "dev-master"
    },
    "repositories": [
        {
            "type": "vcs",
            "url": "git@gitlab.pitechplus.com:rares.serban/ImageCropBundle.git"
        }
    ]
```
Then enable the bundle in your AppKernel file:

```php
$bundles = [
	...,
	new Pitech\ImageCropBundle\PitechImageCropBundle(),
];
```

You will then have to install the assets using the command:

```
bin/console assets:install --symlink
```

Then you need to include the script file provided with this bundle in your template:

```twig
<script src="{{ asset('bundles/pitechimagecrop/js/image-crop.js') }}"></script>
```

Also, you need to configure twig to use the form theme defined in this bundle and also have vich uploader configured for an entity.

```yml
twig:
    form_themes:
        - 'VichUploaderBundle:Form:fields.html.twig'
        - 'PitechImageCropBundle:Form:fields.html.twig'
```

# Features

This bundle lets you resize (crop, zoom) images before uploading them to the server.To enable this functionality, in your form class, instead of using the default VichImageType form type for your image, you will have to use the type available in this bundle.The type has the same options as the vich image one.

```php
$builder
	->add('imageFile', CropImageType::class, [
                'required' => false,
                'label' => 'user.account.image',
                'download_link' => false,
            ]);
```

And that's it!You can now edit images before uploading them and this bundle will take care of the rest.
