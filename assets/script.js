var scaleFactor = 0;
var sepiaAmt = 0;
var blurAmt = 0;
var grayscaleAmt = 0;
var saturateAmt = 1;
var hueAmt = 0;
var brightnessAmt = 10;
var contrastAmt = 10;
var opacityAmt = 100;

var applyImgHeight = 0;
var applyImgWidth = 0;

var originalWidth = 0;
var originalHeight = 0;

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var scaleImage = new Image();
            scaleImage.src = e.target.result;
            scaleImage.onload = function () {
                scaleFactor = this.height / this.width;
                console.log("Scale Factor: " + scaleFactor);
            };
            $('#uploadedImage')
                .attr('src', e.target.result)
                .height(500)
                .width(this.width * scaleFactor);
                applyImgHeight = ($('#uploadedImage').height());
                applyImgWidth = ($('#uploadedImage').width());
                originalHeight = ($('#uploadedImage').height());
                originalWidth = ($('#uploadedImage').width());
                document.getElementById("resize-width").value = applyImgWidth;
                document.getElementById("resize-height").value = applyImgHeight;
        };
        reader.readAsDataURL(input.files[0]);
    }
    $('.submit').css('display', 'block');
    $('#preview').css('display', 'block');
}

/*Sepia*/
var sliderSepia = document.getElementById("sliderSepia");
var outputSepia = document.getElementById("outputSepia");
outputSepia.innerHTML = sliderSepia.value;
sliderSepia.oninput = function () {
    outputSepia.innerHTML = this.value;
    sepiaAmt = this.value;
    runImageFilter();
}

/*Blur*/
var sliderBlur = document.getElementById("sliderBlur");
var outputBlur = document.getElementById("outputBlur");
outputBlur.innerHTML = sliderBlur.value;
sliderBlur.oninput = function () {
    outputBlur.innerHTML = this.value;
    blurAmt = this.value;
    runImageFilter();
}

/*Grayscale*/
var sliderGrayscale = document.getElementById("sliderGrayscale");
var outputGrayscale = document.getElementById("outputGrayscale");
outputGrayscale.innerHTML = sliderGrayscale.value;
sliderGrayscale.oninput = function () {
    outputGrayscale.innerHTML = this.value;
    grayscaleAmt = this.value;
    runImageFilter();
}

/*Saturate*/
var sliderSaturate = document.getElementById("sliderSaturate");
var outputSaturate = document.getElementById("outputSaturate");
outputSaturate.innerHTML = sliderSaturate.value;
sliderSaturate.oninput = function () {
    outputSaturate.innerHTML = this.value;
    saturateAmt = this.value;
    runImageFilter();
}

/*Hue*/
var sliderHue = document.getElementById("sliderHue");
var outputHue = document.getElementById("outputHue");
outputHue.innerHTML = sliderHue.value;
sliderHue.oninput = function () {
    outputHue.innerHTML = this.value;
    hueAmt = this.value;
    runImageFilter();
}

/*Brightness*/
var sliderBrightness = document.getElementById("sliderBrightness");
var outputBrightness = document.getElementById("outputBrightness");
outputBrightness.innerHTML = sliderBrightness.value;
sliderBrightness.oninput = function () {
    outputBrightness.innerHTML = this.value;
    brightnessAmt = this.value;
    runImageFilter();
}

/*Contrast*/
var sliderContrast = document.getElementById("sliderContrast");
var outputContrast = document.getElementById("outputContrast");
outputContrast.innerHTML = sliderContrast.value;
sliderContrast.oninput = function () {
    outputContrast.innerHTML = this.value;
    contrastAmt = this.value;
    runImageFilter();
}

/*Brightness*/
var sliderOpacity = document.getElementById("sliderOpacity");
var outputOpacity = document.getElementById("outputOpacity");
outputOpacity.innerHTML = sliderOpacity.value;
sliderOpacity.oninput = function () {
    outputOpacity.innerHTML = this.value;
    opacityAmt = this.value;
    runImageFilter();
}

function runImageFilter() {
    $('#uploadedImage').css('filter', 'sepia(' + (sepiaAmt) + '%) blur(' + (blurAmt / 10) + 'px) grayscale(' + (grayscaleAmt / 10) + ') saturate(' + (saturateAmt) + ') hue-rotate(' + (hueAmt) + 'deg) brightness(' + (brightnessAmt / 10) + ') contrast(' + (contrastAmt / 10) + ') opacity(' + (opacityAmt / 100) + ')');
}

var canvas2 = document.getElementsByTagName('canvas')[0];
canvas2.height = 400;
canvas2.width = 400;

function drawImage(ev) {
    var ctx = document.getElementById('canvas').getContext('2d'),
        img = new Image(),
        f = document.getElementById("inputIMG").files[0],
        url = window.URL || window.webkitURL,
        src = url.createObjectURL(f);
    img.src = src;
    img.onload = function () {
        getCanvasSize();
        eval("ctx.filter = 'sepia(' + (sepiaAmt) + '%) blur(' + (blurAmt / 10) + 'px) grayscale(' + (grayscaleAmt / 10) + ') saturate(' + (saturateAmt) + ') hue-rotate(' + (hueAmt) + 'deg) brightness(' + (brightnessAmt / 10) + ') contrast(' + (contrastAmt / 10) + ') opacity(' + (opacityAmt / 100) + ')'");
        ctx.drawImage(img, (canvas2.width / 2 - applyImgWidth / 2), (canvas2.height / 2 - applyImgHeight / 2), applyImgWidth, applyImgHeight);
        url.revokeObjectURL(src);
    }
}

function getCanvasSize() {
    applyImgHeight = ($('#uploadedImage').height());
    applyImgWidth = ($('#uploadedImage').width());
    canvas2.width = applyImgWidth;
    canvas2.height = applyImgHeight;
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function drawCanvas() {
    ctx.clearRect(0, 0, applyImgWidth, applyImgHeight);
    drawImage();
}

function submit() {
    drawCanvas();
}

function changeSize(x) {
    if (x == 1) {
        $('#uploadedImage').width(document.getElementById("resize-width").value);
        applyImgWidth = ($('#uploadedImage').width());
    }
    else if (x == 2) {
        $('#uploadedImage').height(document.getElementById("resize-height").value);
        applyImgHeight = ($('#uploadedImage').height());
    }
    else if (x == 3) {
        $('#uploadedImage').height(originalHeight).width(originalWidth);
        applyImgHeight = ($('#uploadedImage').height());
        applyImgWidth = ($('#uploadedImage').width());
        document.getElementById("resize-width").value = applyImgWidth;
        document.getElementById("resize-height").value = applyImgHeight;
    }
}