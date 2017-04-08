var imageCropFunctions = {};

imageCropFunctions.readUrl = function(input) {
    if (input.files && input.files[0]) {
        if (input.files[0].type.match('image.*')) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var imageFile = new Image();
                imageFile.src = e.target.result;

                imageFile.onload = function() {
                    var image = $('#pitech_image_crop_crop_image');
                    image.attr('src', this.src);
                    image.show();
                    cropper = image.cropper();
                    $("#pitech_image_crop_crop_rotate").show();
                }
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
};

$(document).ready(function() {
    $("#pitech_image_crop_crop_file input").first().change(function() {
        imageCropFunctions.readUrl(this);
    });

    $("#pitech_image_crop_crop_rotate .btn-pitech-crop-left").click(function(e) {
        e.preventDefault();
        $('#pitech_image_crop_crop_image').cropper('rotate', -45);
    });

    $("#pitech_image_crop_crop_rotate .btn-pitech-crop-right").click(function(e) {
        e.preventDefault();
        $('#pitech_image_crop_crop_image').cropper('rotate', 45);
    });

    $("#pitech_image_crop_crop_file").closest('form').submit(function(e) {
        if($("#pitech_image_crop_crop_file input").first().val()) {
            var data = $('#pitech_image_crop_crop_image').cropper('getData');
            console.log(data);
            $('#pitech_image_crop_crop_data input').first().val(JSON.stringify(data));
        }
    });
});
