var sepiaAmt = 0;
var blurAmt = 0;
var grayscaleAmt = 0;
var saturateAmt = 1;
var hueAmt = 0;
var brightnessAmt = 10;
var contrastAmt = 10;
var opacityAmt = 100;

var saveSepia = 0;
var saveBlur = 0;
var saveGrayscale = 0;
var saveSaturate = 1;
var saveHue = 0;
var saveBrightness = 10;
var saveContrast = 10;
var saveOpacity = 100;
var saveRotate = 0;

var applyImgHeight = 0;
var applyImgWidth = 0;

var originalWidth = 0;
var originalHeight = 0;

var endWidth = 0;
var endHeight = 0;

var pgwidth;

var scaleFactor = 0;

var rulerOn = true;

var isRotated = false;
var rotateAmt = 0;

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var scaleImage = new Image();
            scaleImage.src = e.target.result;
            scaleImage.onload = function () {
                scaleFactor = this.width / this.height;
                console.log("Image Resolution: " + (this.width) + "x" + (this.height));
                console.log("Scale Factor: " + scaleFactor);
                pgwidth = $(window).width();
                endWidth = this.width;
                endHeight = this.height;
                originalWidth = this.width;
                originalHeight = this.height;
                document.getElementById("footer-origwidth").innerHTML = originalWidth + "&nbsp;x&nbsp;";
                document.getElementById("footer-origheight").innerHTML = originalHeight; 
                if ((scaleFactor < 0.4) || (pgwidth < 500)) {
                    $('#uploadedImage')
                        .attr('src', e.target.result)
                        .width(300)
                        .height(300 / scaleFactor);
                } else if ((scaleFactor < 0.6) || (pgwidth < 1000)) {
                    $('#uploadedImage')
                        .attr('src', e.target.result)
                        .width(430)
                        .height(430 / scaleFactor);
                } else {
                    $('#uploadedImage')
                        .attr('src', e.target.result)
                        .width(500)
                        .height(500 / scaleFactor);
                }
                $("#uploadedImage").css("display", "block");
                applyImgHeight = ($('#uploadedImage').height());
                applyImgWidth = ($('#uploadedImage').width());
                document.getElementById("resize-width").value = endWidth;
                document.getElementById("resize-height").value = endHeight;
                runImageFilter();
                document.getElementById("footer-imgwidth").innerHTML = document.getElementById("uploadedImage").width + "&nbsp;x&nbsp;"; 
                document.getElementById("footer-imgheight").innerHTML = document.getElementById("uploadedImage").height; 
            };

        };
        reader.readAsDataURL(input.files[0]);
    }
    $('.submit').css('display', 'block');
    // $('#preview').css('display', 'block');
    $('.bk').css('background', '#DDDDDD');

    $('.zaz').css('display', 'none');

    $('.uploader').css('border', 'none');
    $('.editor').css('border', 'none');
    $('.resize').css('border', 'none');
    $('.master').css('border', 'none');
    $('#uploadedImage').css('border', '1px solid #ccc');
    if (input.files[0].name.split('.').pop() == "gif") {
        $('#error-gif').css('display', 'block');
    }
    $('#formats').css('display', 'none');
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

/*Zoom*/
var sliderZoom = document.getElementById("zoomslide");
sliderZoom.oninput = function () {
    zoomamt = this.value;
    $("#uploadedImage").css('transform', 'scale(' + zoomamt / 25 + ')');
}

function runImageFilter() {
    $('#uploadedImage').css('filter', 'sepia(' + (sepiaAmt) + '%) blur(' + (blurAmt / 10) + 'px) grayscale(' + (grayscaleAmt / 10) + ') saturate(' + (saturateAmt) + ') hue-rotate(' + (hueAmt) + 'deg) brightness(' + (brightnessAmt / 10) + ') contrast(' + (contrastAmt / 10) + ') opacity(' + (opacityAmt / 100) + ')');
}
var canvas2 = document.getElementsByTagName('canvas')[0];

function drawImage(ev) {
    var ctx = document.getElementById('canvas').getContext('2d'),
        img = new Image(),
        f = document.getElementById("inputIMG").files[0],
        url = window.URL || window.webkitURL,
        src = url.createObjectURL(f);
    img.src = src;
    img.onload = function () {
        getEndCanvasSize();
        eval("ctx.filter = 'sepia(' + (sepiaAmt) + '%) blur(' + (blurAmt / 10) + 'px) grayscale(' + (grayscaleAmt / 10) + ') saturate(' + (saturateAmt) + ') hue-rotate(' + (hueAmt) + 'deg) brightness(' + (brightnessAmt / 10) + ') contrast(' + (contrastAmt / 10) + ') opacity(' + (opacityAmt / 100) + ')'");
        if (isRotated) {
            ctx.translate(ctx.canvas.width * 0.5, ctx.canvas.height * 0.5);
            ctx.rotate(rotateAmt * Math.PI / 180);

            ctx.drawImage(img, -img.width * 0.5, -img.height * 0.5);
        } else {
            ctx.drawImage(img, (canvas2.width / 2 - endWidth / 2), (canvas2.height / 2 - endHeight / 2), canvas2.width, canvas2.height);
            //window.open(canvas2.toDataURL("image/png"), '_blank');
            // ^^ Broken on chrome as it blocks toDataURL. 
        url.revokeObjectURL(src);
    }
}

function getEndCanvasSize() {
    canvas2.width = endWidth;
    canvas2.height = endHeight;
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function drawCanvas() {
    ctx.clearRect(0, 0, applyImgWidth, applyImgHeight);
    drawImage();
}

function submit() {
    canvas2.height = 400;
    canvas2.width = 400;
    $('#canvas').css('display', 'block');
    drawCanvas();
}

function changeSize(x) {
    if (x == 1) {
        endWidth = document.getElementById("resize-width").value;
    } else if (x == 2) {
        endHeight = document.getElementById("resize-height").value;
    } else if (x == 3) {
        document.getElementById("resize-width").value = originalWidth;
        document.getElementById("resize-height").value = originalHeight;
    }
}

var zoomamt = 25;

function zoom(x) {
    if (x == 1) {
        zoomamt++;
        if (zoomamt > 25) {
            zoomamt--;
            $('#error-zoom-1').css('display', 'block');
        }
        $("#uploadedImage").css('transform', 'scale(' + zoomamt / 25 + ')');
    } else if (x == 2) {
        zoomamt--;
        if (zoomamt < 5) {
            zoomamt++;
            $('#error-zoom-2').css('display', 'block');
        }
        $("#uploadedImage").css('transform', 'scale(' + zoomamt / 25 + ')');
    }
}

window.addEventListener('wheel', function (e) {
    if (e.deltaY < 0) {
        if ($('#uploadedImage').is(":hover")) {
            if (e.shiftKey) {
                zoomamt++;
                if (zoomamt > 50) {
                    zoomamt--;
                    $('#error-zoom-1').css('display', 'block');
                }
                $("#uploadedImage").css('transform', 'scale(' + zoomamt / 50 + ')');
            }
        }
    }
    if (e.deltaY > 0) {
        if ($('#uploadedImage').is(":hover")) {
            if (e.shiftKey) {
                zoomamt--;
                if (zoomamt < 10) {
                    zoomamt++;
                    $('#error-zoom-2').css('display', 'block');
                }
                $("#uploadedImage").css('transform', 'scale(' + zoomamt / 50 + ')');
            }
        }
    }
});


function fileNew() {
    $('.zaz').css('display', 'block');
    $('#uploadedImage').css('display', 'none');
    $('.bk').css('background', 'white');
    $('.uploader').css('border', '1px solid #ccc');
    $('.editor').css('border', '1px solid #ccc');
    $('#formats').css('display', 'block');
    $('.master').css('border', '1px solid rgb(156, 156, 156)');
    resetSepia();
    resetBlur();
    resetGrayscale();
    resetHue();
    resetOpacity();
    resetSaturate();
    resetBrightnessContrast();
}

/* Sepia */
function openSepia() { $('#modal-sepia').css('display', 'block'); var sliderSepia = document.getElementById("sliderSepia"); saveSepia = sliderSepia.value; }
function applySepia() { $('#modal-sepia').css('display', 'none'); }
function resetSepia() { sepiaAmt = saveSepia; $('#modal-sepia').css('display', 'none'); var outputSepia = document.getElementById("outputSepia"); 
var sliderSepia = document.getElementById("sliderSepia"); outputSepia.innerHTML = sepiaAmt; sliderSepia.value = sepiaAmt; runImageFilter(); }

/* Blur */
function openBlur() { $('#modal-blur').css('display', 'block'); var sliderBlur = document.getElementById("sliderBlur"); saveBlur = sliderBlur.value; }
function applyBlur() { $('#modal-blur').css('display', 'none'); }
function resetBlur() { blurAmt = saveBlur; $('#modal-blur').css('display', 'none'); var outputBlur = document.getElementById("outputBlur"); 
var sliderBlur = document.getElementById("sliderBlur"); outputBlur.innerHTML = blurAmt; sliderBlur.value = blurAmt; runImageFilter(); }

/* Grayscale */
function openGrayscale() { $('#modal-grayscale').css('display', 'block'); var sliderGrayscale = document.getElementById("sliderGrayscale"); saveGrayscale = sliderGrayscale.value; }
function applyGrayscale() { $('#modal-grayscale').css('display', 'none'); }
function resetGrayscale() { blurAmt = saveGrayscale; $('#modal-grayscale').css('display', 'none'); var outputGrayscale = document.getElementById("outputGrayscale"); 
var sliderGrayscale = document.getElementById("sliderGrayscale"); outputGrayscale.innerHTML = grayscaleAmt; sliderGrayscale.value = grayscaleAmt; runImageFilter(); }

/* Saturate */
function openSaturate() { $('#modal-saturate').css('display', 'block'); var sliderSaturate = document.getElementById("sliderSaturate"); saveSaturate = sliderSaturate.value; }
function applySaturate() { $('#modal-saturate').css('display', 'none'); }
function resetSaturate() { saturateAmt = saveSaturate; $('#modal-saturate').css('display', 'none'); var outputSaturate = document.getElementById("outputSaturate"); 
var sliderSaturate = document.getElementById("sliderSaturate"); outputSaturate.innerHTML = saturateAmt; sliderSaturate.value = saturateAmt; runImageFilter(); }

/* Hue */
function openHue() { $('#modal-hue').css('display', 'block'); var sliderHue = document.getElementById("sliderHue"); saveHue = sliderHue.value; }
function applyHue() { $('#modal-hue').css('display', 'none'); }
function resetHue() { hueAmt = saveHue; $('#modal-hue').css('display', 'none'); var outputHue = document.getElementById("outputHue"); 
var sliderHue = document.getElementById("sliderHue"); outputHue.innerHTML = hueAmt; sliderHue.value = hueAmt; runImageFilter(); }

/* Brightness / Contrast */
function openBrightnessContrast() { 
    $('#modal-brightnesscontrast').css('display', 'block'); 
    var sliderBrightness = document.getElementById("sliderBrightness"); 
    saveBrightness = sliderBrightness.value; 
    var sliderContrast = document.getElementById("sliderContrast");
    saveContrast = sliderContrast.value; 
}
function applyBrightnessContrast() { $('#modal-brightnesscontrast').css('display', 'none'); }
function resetBrightnessContrast() {
    brightnessAmt = saveBrightness; $('#modal-brightnesscontrast').css('display', 'none'); var outputBrightness = document.getElementById("outputBrightness");
    var sliderBrightness = document.getElementById("sliderBrightness"); outputBrightness.innerHTML = brightnessAmt; sliderBrightness.value = brightnessAmt;
    contrastAmt = saveContrast; var outputContrast = document.getElementById("outputContrast");
    var sliderContrast = document.getElementById("sliderContrast"); outputContrast.innerHTML = contrastAmt; sliderContrast.value = contrastAmt; runImageFilter();
}

/* Opacity */
function openOpacity() { $('#modal-opacity').css('display', 'block'); var sliderOpacity = document.getElementById("sliderOpacity"); saveOpacity = sliderOpacity.value; }
function applyOpacity() { $('#modal-opacity').css('display', 'none'); }
function resetOpacity() { opacityAmt = saveOpacity; $('#modal-opacity').css('display', 'none'); var outputOpacity = document.getElementById("outputOpacity");
var sliderOpacity = document.getElementById("sliderOpacity"); outputOpacity.innerHTML = opacityAmt; sliderOpacity.value = opacityAmt; runImageFilter();
}

function ruler() {
    if (rulerOn) {
        $('.ruler-horizontal').css('display', 'none');
        $('.ruler-vertical').css('display', 'none');
        $('#rulerbk').css('background-color', 'inherit');
        $('#rulerbk').css('border', 'inherit');
        rulerOn = false;
    } else {
        $('.ruler-horizontal').css('display', 'block');
        $('.ruler-vertical').css('display', 'block');

        $('#rulerbk').css('background-color', 'rgb(191, 215, 224)');
        $('#rulerbk').css('border', '1px solid rgb(136, 173, 185)');

        rulerOn = true;
    }
}

onmousemove = function (e) { document.getElementById("footer-coordx").innerHTML = e.clientX + ",&nbsp"; document.getElementById("footer-coordy").innerHTML = e.clientY; }

/* Rotate */
function openRotate() { 
    $('#modal-rotate').css('display', 'block'); 
    var inputRotate = document.getElementById("inputRotate"); 
    saveRotate = inputRotate.value; 
}
function applyRotate() { 
    rotateAmt = inputRotate.value;
    if (rotateAmt < 0 || rotateAmt > 360) {
        rotateAmt = 0;
    } else {
        $('#modal-rotate').css('display', 'none'); 
        isRotated = true; 
        $("#uploadedImage").css('transform', 'rotate(' + rotateAmt + 'deg)'); 
    }
}
function resetRotate() {
    rotateAmt = saveRotate; $('#modal-rotate').css('display', 'none'); runImageFilter();
}
document.getElementById("inputRotate").onchange = function() {
    var inputRotate = document.getElementById("inputRotate");
    rotateAmt = inputRotate.value;
    if (rotateAmt < 0 || rotateAmt > 360) {
        rotateAmt = 0;
        $('#rotateBTN').css('cursor', 'not-allowed');
        document.getElementById("rotateBTN").disabled = true;
    } else {
        $('#rotateBTN').css('cursor', 'pointer');
        document.getElementById("rotateBTN").disabled = false;
    }
}