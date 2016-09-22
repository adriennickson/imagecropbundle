# Overview
The ImageCropBundle is a bundle for Symfony 3 that lets you crop images before uploading them.
It uses the Cropper jQuery library and integrates with VichUploaderBundle.

# Installation
To install this bundle, first you need to have jQuery and Bootstrap installed.

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
