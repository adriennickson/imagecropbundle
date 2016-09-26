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

    $("#pitech_image_crop_crop_file").closest('form').submit(function(e) {
        if($("#pitech_image_crop_crop_file input").first().val()) {
            var data = $('#pitech_image_crop_crop_image').cropper('getData');
            $('#pitech_image_crop_crop_data input').first().val(JSON.stringify(data));
        }
    });
});
