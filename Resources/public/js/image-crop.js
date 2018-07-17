var imageCropFunctions = {};

imageCropFunctions.readUrl = function(input) {
    if (input.files && input.files[0]) {
        if (input.files[0].type.match('image.*')) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var imageFile = new Image();
                imageFile.src = e.target.result;

                imageFile.onload = function() {
                    var image = $('#rares_image_crop_crop_image');
                    image.attr('src', this.src);
                    image.show();
                    cropper = image.cropper();
                    $("#rares_image_crop_crop_rotate").show();
                }
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
};

$(document).ready(function() {
    $("#rares_image_crop_crop_file input").first().change(function() {
        imageCropFunctions.readUrl(this);
    });

    $("#rares_image_crop_crop_rotate .btn-rares-crop-left").click(function(e) {
        e.preventDefault();
        $('#rares_image_crop_crop_image').cropper('rotate', -45);
    });

    $("#rares_image_crop_crop_rotate .btn-rares-crop-right").click(function(e) {
        e.preventDefault();
        $('#rares_image_crop_crop_image').cropper('rotate', 45);
    });

    $("#rares_image_crop_crop_file").closest('form').submit(function(e) {
        if($("#rares_image_crop_crop_file input").first().val()) {
            var data = $('#rares_image_crop_crop_image').cropper('getData');
            console.log(data);
            $('#rares_image_crop_crop_data input').first().val(JSON.stringify(data));
        }
    });
});
