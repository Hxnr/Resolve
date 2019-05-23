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

var isFlippedHorizontal = false;
var isFlippedVertical = false;
var doubleFlip = false;

// for undoing
var previousAction = "";

var previousSepia = 0;
var previousBlur = 0;
var previousGrayscale = 0;
var previousSaturate = 0;
var previousHue = 0;
var previousBrightness = 0;
var previousContrast = 0;
var previousOpacity = 0;
var previousRotate = 0;
var previousWidth = 0;
var previousHeight = 0;

var restoreSepia = 0;
var restoreBlur = 0;
var restoreGrayscale = 0;
var restoreSaturate = 0;
var restoreHue = 0;
var restoreBrightness = 0;
var restoreContrast = 0;
var restoreOpacity = 0;
var restoreRotate = 0;
var restoreWidth = 0;
var restoreHeight = 0;

var saveImage = false;

var isUndone = false;

var isDrawing = false;

var isUploaded = false;


runDrawing();

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var scaleImage = new Image();
            scaleImage.src = e.target.result;
            scaleImage.onload = function () {
                scaleFactor = this.width / this.height;
                console.log("---------------------------------")
                console.log(input.files[0].name);
                console.log("Image Resolution: " + (this.width) + "x" + (this.height));
                console.log("Scale Factor: " + scaleFactor);
                console.log("---------------------------------")
                document.getElementById("proj-title").value = (input.files[0].name);            
                resizable(document.getElementById('proj-title'), 7);   
                pgwidth = $(window).width();
                endWidth = this.width;
                endHeight = this.height;
                originalWidth = this.width;
                originalHeight = this.height;
                document.getElementById("resize-width").value = canvas3.width;
                document.getElementById("resize-height").value = canvas3.height;
                runImageFilter();
                drawImage();
                saveImage = true;
            };
        };
        reader.readAsDataURL(input.files[0]);
        resetAll();
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
   // if (input.files[0].name.split('.').pop() == "gif") {
        //$('#error-gif').css('display', 'block');
   // }
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
    previousAction = "sepia";
}

/*Blur*/
var sliderBlur = document.getElementById("sliderBlur");
var outputBlur = document.getElementById("outputBlur");
outputBlur.innerHTML = sliderBlur.value;
sliderBlur.oninput = function () {
    outputBlur.innerHTML = this.value;
    blurAmt = this.value;
    runImageFilter();
    previousAction = "blur";
}

/*Grayscale*/
var sliderGrayscale = document.getElementById("sliderGrayscale");
var outputGrayscale = document.getElementById("outputGrayscale");
outputGrayscale.innerHTML = sliderGrayscale.value;
sliderGrayscale.oninput = function () {
    outputGrayscale.innerHTML = this.value;
    grayscaleAmt = this.value;
    runImageFilter();
    previousAction = "grayscale";
}

/*Saturate*/
var sliderSaturate = document.getElementById("sliderSaturate");
var outputSaturate = document.getElementById("outputSaturate");
outputSaturate.innerHTML = sliderSaturate.value;
sliderSaturate.oninput = function () {
    outputSaturate.innerHTML = this.value;
    saturateAmt = this.value;
    runImageFilter();
    previousAction = "saturate";
}

/*Hue*/
var sliderHue = document.getElementById("sliderHue");
var outputHue = document.getElementById("outputHue");
outputHue.innerHTML = sliderHue.value;
sliderHue.oninput = function () {
    outputHue.innerHTML = this.value;
    hueAmt = this.value;
    runImageFilter();
    previousAction = "hue";
}

/*Brightness*/
var sliderBrightness = document.getElementById("sliderBrightness");
var outputBrightness = document.getElementById("outputBrightness");
outputBrightness.innerHTML = sliderBrightness.value;
sliderBrightness.oninput = function () {
    outputBrightness.innerHTML = this.value;
    brightnessAmt = this.value;
    runImageFilter();
    previousAction = "brightness";
}

/*Contrast*/
var sliderContrast = document.getElementById("sliderContrast");
var outputContrast = document.getElementById("outputContrast");
outputContrast.innerHTML = sliderContrast.value;
sliderContrast.oninput = function () {
    outputContrast.innerHTML = this.value;
    contrastAmt = this.value;
    runImageFilter();
    previousAction = "contrast";
}

/*Brightness*/
var sliderOpacity = document.getElementById("sliderOpacity");
var outputOpacity = document.getElementById("outputOpacity");
outputOpacity.innerHTML = sliderOpacity.value;
sliderOpacity.oninput = function () {
    outputOpacity.innerHTML = this.value;
    opacityAmt = this.value;
    runImageFilter();
    previousAction = "opacity";
}

var zoomamt = 25;
/*Zoom*/
var sliderZoom = document.getElementById("zoomslide");
sliderZoom.oninput = function () {
    zoomamt = this.value;
    runZoom();
}

function runZoom() {
    $("#drawCanvas").css('transform', ('scale(' + zoomamt / 25 + ')'));
    $(".bk").css('transform', ('scale(' + zoomamt / 25 + ')'));
}

function zoom(x) {
    console.log(1);
    if (x == 1) {
        zoomamt++;
        if (zoomamt > 25) {
            zoomamt--;
        }
        runZoom();
        console.log(zoomamt);
    } else if (x == 2) {
        zoomamt--;
        if (zoomamt < 5) {
            zoomamt++;
        }
        runZoom();
    }
    sliderZoom.value = zoomamt;
}

function runImageFilter() {

    if (isUploaded) {
        eval("ctx2.filter = 'sepia(' + (sepiaAmt) + '%) blur(' + (blurAmt / 10) + 'px) grayscale(' + (grayscaleAmt / 10) + ') saturate(' + (saturateAmt) + ') hue-rotate(' + (hueAmt) + 'deg) brightness(' + (brightnessAmt / 10) + ') contrast(' + (contrastAmt / 10) + ') opacity(' + (opacityAmt / 100) + ')'");
        drawImage(); 
    } else {
        ctx2.drawImage(canvas3, 0, 0, canvas3.width, canvas3.height);
    }

}

function drawImage(ev) {
    var img = new Image(),
        f = document.getElementById("inputIMG").files[0],
        url = window.URL || window.webkitURL,
        src = url.createObjectURL(f);
    img.src = src;
    isUploaded = true;
    img.onload = function () {
         if (isRotated) {
            ctx.translate(ctx.canvas.width * 0.5, ctx.canvas.height * 0.5);
            ctx.rotate(rotateAmt * Math.PI / 180);
          //  ctx.drawImage(img, -img.width * 0.5, -img.height * 0.5, canvas2.width, canvas2.height);
            save();
        } else {
            if (isFlippedHorizontal) {
             //   ctx.translate(canvas2.width, 0);
                ctx.scale(-1, 1);
            }
            if (isFlippedVertical) {
              //  ctx.translate(0, canvas2.height);
                ctx.scale(1, -1);
            }
           // ctx.drawImage(img, (canvas2.width / 2 - endWidth / 2), (canvas2.height / 2 - endHeight / 2), canvas2.width, canvas2.height);
            if ((scaleFactor < 0.4) || (pgwidth < 500)) {
                canvas3.width = 300;
                canvas3.height = 300 / scaleFactor;
            } else if ((scaleFactor < 0.6) || (pgwidth < 1000)) {
                canvas3.width = 450;
                canvas3.height = 450 / scaleFactor;
            } else {
                canvas3.width = 500;
                canvas3.height = 500 / scaleFactor;
            }


            $('.bk').css('width', canvas3.width);
            $('.bk').css('height', canvas3.height);
            $('.master').css('width', canvas3.width);

            document.getElementById("footer-imgwidth").innerHTML = canvas3.width + "&nbsp;x&nbsp;";
            document.getElementById("footer-imgheight").innerHTML = canvas3.height; 

            eval("ctx2.filter = 'sepia(' + (sepiaAmt) + '%) blur(' + (blurAmt / 10) + 'px) grayscale(' + (grayscaleAmt / 10) + ') saturate(' + (saturateAmt) + ') hue-rotate(' + (hueAmt) + 'deg) brightness(' + (brightnessAmt / 10) + ') contrast(' + (contrastAmt / 10) + ') opacity(' + (opacityAmt / 100) + ')'");

            ctx2.drawImage(img, 0, 0, canvas3.width, canvas3.height);

            //  ctx2.drawImage(canvas3, 0, 0, canvas3.width, canvas3.height);

            if (saveImage) {
             //   save();
            }
        }
        url.revokeObjectURL(src);
    }
}


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function changeSize(x) {
    previousAction = "resize";
    if (x == 1) {
        previousWidth = endWidth;
        endWidth = document.getElementById("resize-width").value;
        canvas3.width = endWidth;

        $('.bk').css('width', canvas3.width);
        $('.bk').css('height', canvas3.height);
        $('.bk').css('display', 'inline-block');
        $('.master').css('background', '#DDDDDD');

        document.getElementById("footer-imgwidth").innerHTML = canvas3.width + "&nbsp;x&nbsp;";
        document.getElementById("footer-imgheight").innerHTML = canvas3.height; 

    } else if (x == 2) {
        previousHeight = endHeight;
        endHeight = document.getElementById("resize-height").value;
        canvas3.height = endHeight;

        $('.bk').css('width', canvas3.width);
        $('.bk').css('height', canvas3.height);
        $('.bk').css('display', 'inline-block');
        $('.master').css('background', '#DDDDDD');

        document.getElementById("footer-imgwidth").innerHTML = canvas3.width + "&nbsp;x&nbsp;";
        document.getElementById("footer-imgheight").innerHTML = canvas3.height; 

    }
}

/*
function zoom(x) {
    if (x == 1) {
        zoomamt++;
        if (zoomamt > 25) {
            zoomamt--;
        }
        $("#uploadedImage").css('transform', 'scale(' + zoomamt / 25 + ')');
    } else if (x == 2) {
        zoomamt--;
        if (zoomamt < 5) {
            zoomamt++;
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
                }
                $("#uploadedImage").css('transform', 'scale(' + zoomamt / 50 + ')');
            }
        }
    }
});
*/

function fileNew() {
    alert(1);
    $('.zaz').css('display', 'block');
    $('#uploadedImage').css('display', 'none');
    $('.bk').css('background', 'white');
    $('.uploader').css('border', '1px solid #ccc');
    $('.editor').css('border', '1px solid #ccc');
    $('#formats').css('display', 'block');
    $('.master').css('border', '1px solid rgb(156, 156, 156)');
    resetAll();
    document.getElementById("proj-title").value = "New project";
    resizable(document.getElementById('proj-title'), 7);          
    document.getElementById("footer-imgwidth").innerHTML = canvas3.width + "&nbsp;x&nbsp;";
    document.getElementById("footer-imgheight").innerHTML = canvas3.height; 
    resetDrawing();
}

function resetAll() {
    resetSepia();
    resetBlur();
    resetGrayscale();
    resetHue();
    resetOpacity();
    resetSaturate();
    resetBrightnessContrast();
    resetRotate();
    rotateAmt = 0;
    $("#uploadedImage").css('transform', 'rotate(0deg)'); 
}

/* Sepia */
function openSepia() { previousSepia = saveSepia; $('#modal-sepia').css('display', 'block'); var sliderSepia = document.getElementById("sliderSepia"); saveSepia = sliderSepia.value; }
function applySepia() { $('#modal-sepia').css('display', 'none'); }
function resetSepia() { sepiaAmt = saveSepia; $('#modal-sepia').css('display', 'none'); var outputSepia = document.getElementById("outputSepia"); 
var sliderSepia = document.getElementById("sliderSepia"); outputSepia.innerHTML = sepiaAmt; sliderSepia.value = sepiaAmt; runImageFilter(); }

/* Blur */
function openBlur() { previousBlur = saveBlur; $('#modal-blur').css('display', 'block'); var sliderBlur = document.getElementById("sliderBlur"); saveBlur = sliderBlur.value; }
function applyBlur() { $('#modal-blur').css('display', 'none'); }
function resetBlur() { blurAmt = saveBlur; $('#modal-blur').css('display', 'none'); var outputBlur = document.getElementById("outputBlur"); 
var sliderBlur = document.getElementById("sliderBlur"); outputBlur.innerHTML = blurAmt; sliderBlur.value = blurAmt; runImageFilter(); }

/* Grayscale */
function openGrayscale() { previousGrayscale = saveGrayscale; $('#modal-grayscale').css('display', 'block'); var sliderGrayscale = document.getElementById("sliderGrayscale"); saveGrayscale = sliderGrayscale.value; }
function applyGrayscale() { $('#modal-grayscale').css('display', 'none'); }
function resetGrayscale() { blurAmt = saveGrayscale; $('#modal-grayscale').css('display', 'none'); var outputGrayscale = document.getElementById("outputGrayscale"); 
var sliderGrayscale = document.getElementById("sliderGrayscale"); outputGrayscale.innerHTML = grayscaleAmt; sliderGrayscale.value = grayscaleAmt; runImageFilter(); }

/* Saturate */
function openSaturate() { previousSaturate = saveSaturate; $('#modal-saturate').css('display', 'block'); var sliderSaturate = document.getElementById("sliderSaturate"); saveSaturate = sliderSaturate.value; }
function applySaturate() { $('#modal-saturate').css('display', 'none'); }
function resetSaturate() { saturateAmt = saveSaturate; $('#modal-saturate').css('display', 'none'); var outputSaturate = document.getElementById("outputSaturate"); 
var sliderSaturate = document.getElementById("sliderSaturate"); outputSaturate.innerHTML = saturateAmt; sliderSaturate.value = saturateAmt; runImageFilter(); }

/* Hue */
function openHue() { previousHue = saveHue; $('#modal-hue').css('display', 'block'); var sliderHue = document.getElementById("sliderHue"); saveHue = sliderHue.value; }
function applyHue() { $('#modal-hue').css('display', 'none'); }
function resetHue() { hueAmt = saveHue; $('#modal-hue').css('display', 'none'); var outputHue = document.getElementById("outputHue"); 
var sliderHue = document.getElementById("sliderHue"); outputHue.innerHTML = hueAmt; sliderHue.value = hueAmt; runImageFilter(); }

/* Brightness / Contrast */
function openBrightnessContrast() { 
    previousBrightness = saveBrightness;
    previousContrast = saveContrast;
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
function openOpacity() { previousOpacity = saveOpacity; $('#modal-opacity').css('display', 'block'); var sliderOpacity = document.getElementById("sliderOpacity"); saveOpacity = sliderOpacity.value; }
function applyOpacity() { $('#modal-opacity').css('display', 'none'); }
function resetOpacity() { opacityAmt = saveOpacity; $('#modal-opacity').css('display', 'none'); var outputOpacity = document.getElementById("outputOpacity");
var sliderOpacity = document.getElementById("sliderOpacity"); outputOpacity.innerHTML = opacityAmt; sliderOpacity.value = opacityAmt; runImageFilter();
}

function closeResize() {
    $('#modal-resize').css('display', 'none');
}
function openResize() {
    $('#modal-resize').css('display', 'block');
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
    previousRotate = saveRotate;
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
        previousAction = "rotate"; 
    }
}
function resetRotate() {
    rotateAmt = saveRotate; $('#modal-rotate').css('display', 'none'); runImageFilter();
}
function runRotate() {
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

function runFlip(x) {
    if (x == 1) { // horizontal
        if (!(isFlippedVertical)) {
            if (isFlippedHorizontal) {
                isFlippedHorizontal = false;
                $('#vertbk').css('cursor', 'pointer');
                $('#vertbk').css('opacity', '1');
                $('#horizbk').css('background-color', 'inherit');
                $('#horizbk').css('border', 'inherit');
                $("#uploadedImage").css('transform', 'scaleX(1)');
                previousAction = "flipHorizFalse";
            } else {
                isFlippedHorizontal = true;
                $('#vertbk').css('cursor', 'not-allowed');
                $('#vertbk').css('opacity', '0.4');
                $('#horizbk').css('background-color', 'rgb(191, 215, 224)');
                $('#horizbk').css('border', '1px solid rgb(136, 173, 185)');
                $("#uploadedImage").css('transform', 'scaleX(-1)');
                previousAction = "flipHorizTrue";
            } 
        } 
    } 
    else if (x == 2) { // vertical
        if (!(isFlippedHorizontal)) {
            if (isFlippedVertical) {
                isFlippedVertical = false;
                $('#horizbk').css('cursor', 'pointer');
                $('#horizbk').css('opacity', '1');
                $('#vertbk').css('background-color', 'inherit');
                $('#vertbk').css('border', 'inherit');
                $("#uploadedImage").css('transform', 'scaleY(1)');
                previousAction = "flipVertFalse";
            } else {
                isFlippedVertical = true;   
                $('#horizbk').css('cursor', 'not-allowed');
                $('#horizbk').css('opacity', '0.4');
                $('#vertbk').css('background-color', 'rgb(191, 215, 224)');
                $('#vertbk').css('border', '1px solid rgb(136, 173, 185)');
                $("#uploadedImage").css('transform', 'scaleY(-1)');
                previousAction = "flipVertTrue";
            } 
        } 
    }
}

function submit() {
    saveImage = true;
    save();
}

function save2() {
    save();
}

function save() {
    var link = document.createElement('a');
    link.innerHTML = 'download image';
    link.addEventListener('click', function (ev) {
        link.href = canvas3.toDataURL();
        link.download = document.getElementById("proj-title").value;
    }, false);
    document.body.appendChild(link);
    link.click();
    $(link).css('display', 'none');
}

function copy() {
    saveImage = false;
    $('#modal-copy').css('display', 'block');
    $('#canvas').css('border', '1px solid black');
    canvas4.width = 300;
    canvas4.height = ((canvas3.height / canvas3.width) * 300);
    ctx3.drawImage(canvas3, 0, 0, canvas4.width, canvas4.height); 
}

function closeCopy() {
    $('#modal-copy').css('display', 'none');
}

function undo() {
    if (!(isUndone)) {
        switch (previousAction) {
            case "sepia":
                restoreSepia = sepiaAmt;
                sepiaAmt = previousSepia;
                runImageFilter();
                isUndone = true;
                break;

            case "blur":
                restoreBlur = blurAmt;
                blurAmt = previousBlur;
                runImageFilter();
                isUndone = true;
                break;
        
            case "grayscale":
                restoreGrayscale = grayscaleAmt;
                grayscaleAmt = previousGrayscale;
                runImageFilter();
                isUndone = true;
                break;

            case "saturate":
                restoreSaturate = saturateAmt;
                saturateAmt = previousSaturate;
                runImageFilter();
                isUndone = true;
                break;

            case "brightness":
                restoreBrightness = brightnessAmt;
                brightnessAmt = previousBrightness;
                runImageFilter();
                isUndone = true;
                break;

            case "contrast":
                restoreContrast = contrastAmt;
                contrastAmt = previousContrast;
                runImageFilter();
                isUndone = true;
                break;

            case "hue":
                restoreHue = hueAmt;
                hueAmt = previousHue;
                runImageFilter();
                isUndone = true;
                break;

            case "rotate":
                restoreRotate = rotateAmt;
                rotateAmt = previousRotate;
                $("#uploadedImage").css('transform', 'rotate(' + rotateAmt + 'deg)');
                runImageFilter();
                isUndone = true;
                break;

            case "resize":
                restoreWidth = endWidth;
                restoreHeight = endHeight;
                endWidth = previousWidth;
                endHeight = previousHeight;
                isUndone = true;
                break;

            case "flipHorizFalse":
                isFlippedHorizontal = true;
                $("#uploadedImage").css('transform', 'scaleX(-1)');
                isUndone = true;
                break;

            case "flipHorizTrue":
                isFlippedHorizontal = false;
                $("#uploadedImage").css('transform', 'scaleX(1)');
                isUndone = true;
                break;

            case "flipVertFalse":
                isFlippedVertical = true;
                $("#uploadedImage").css('transform', 'scaleY(-1)');
                isUndone = true;
                break;

            case "flipVertTrue":
                isFlippedVertical = false;
                $("#uploadedImage").css('transform', 'scaleY(1)');
                isUndone = true;
                break;
        }
    } 
}

function redo() {
    switch (previousAction) {
        case "sepia":
            sepiaAmt = restoreSepia;
            runImageFilter();
            isUndone = false;
            break;

        case "blur":
            blurAmt = restoreBlur;
            runImageFilter();
            isUndone = false;
            break;

        case "grayscale":
            grayscaleAmt = restoreGrayscale;
            runImageFilter();
            isUndone = false;
            break;

        case "saturate":
            saturateAmt = restoreSaturate;
            runImageFilter();
            isUndone = false;
            break;

        case "brightness":
            brightnessAmt = restoreBrightness;
            runImageFilter();
            isUndone = false;
            break;

        case "contrast":
            contrastAmt = restoreContrast;
            runImageFilter();
            isUndone = false;
            break;

        case "hue":
            hueAmt = restoreHue;
            runImageFilter();
            isUndone = false;
            break;

        case "rotate":
            rotateAmt = restoreRotate;
            $("#uploadedImage").css('transform', 'rotate(' + rotateAmt + 'deg)');
            runImageFilter();
            isUndone = false;
            break;

        case "resize":
            endWidth = restoreWidth;
            endHeight = restoreHeight;
            document.getElementById("footer-origwidth").innerHTML = endWidth + "&nbsp;x&nbsp;";
            document.getElementById("footer-origheight").innerHTML = endHeight;
            isUndone = false;
            break;

        case "flipHorizFalse":
            isFlippedHorizontal = false;
            $("#uploadedImage").css('transform', 'scaleX(1)');
            isUndone = false;
            break;

        case "flipHorizTrue":
            isFlippedHorizontal = true;
            $("#uploadedImage").css('transform', 'scaleX(-1)');
            isUndone = false;
            break;

        case "flipVertFalse":
            isFlippedVertical = false;
            $("#uploadedImage").css('transform', 'scaleY(1)');
            isUndone = false;
            break;

        case "flipVertTrue":
            isFlippedVertical = true;
            $("#uploadedImage").css('transform', 'scaleY(-1)');
            isUndone = false;
            break;
    }
}

function resizable(el, factor) {
    var int = Number(factor) || 7.7;
    function resizeInput() { el.style.width = ((el.value.length + 5) * int) + 'px' }
    var e = 'keyup,keypress,focus,blur,change'.split(',');
    for (var i in e) el.addEventListener(e[i], resizeInput, false);
    resizeInput();
}
resizable(document.getElementById('proj-title'), 7);


/************************************************************************************************************************************************************/
/************************************************************************************************************************************************************/
/************************************************************************************************************************************************************/
/************************************************************************************************************************************************************/


var canvas3 = document.getElementById('drawCanvas');

document.getElementById("resize-width").value = canvas3.width;
document.getElementById("resize-height").value = canvas3.height;

var ctx2 = canvas3.getContext('2d');

var canvas4 = document.getElementById('canvas');

var ctx3 = canvas4.getContext('2d');


var lineID = document.getElementById("canvasLineTool"); // Line tool
var lineStatus = false;
var eraserStatus = false;

// Default values
ctx2.lineWidth = '3'; // Line width
ctx2.lineCap = 'round'; // Line style
ctx2.lineJoin = 'round'; // Line style
var color = '#000000'; // Default color
var mouseDown = false; // Set mouse to be up by default

var isActive = false; // Drawing status
var plots = []; // Areas to draw
var colorList = []; // Store previous color to reset to after erasing

canvas3.addEventListener('mousedown', startDraw, false); // Begin drawing
canvas3.addEventListener('mousemove', draw, false); // Plot points
canvas3.addEventListener('mouseup', endDraw, false); // Releasing the mouse
canvas3.addEventListener('mouseout', endDraw, false); // No longer hovering canvas    
canvas3.addEventListener("click", setSinglePixel); // Single pixels
canvas3.addEventListener('mouseout', disablePixel, false); // Disable putting pixels if the mouse is not on the canvas
lineID.addEventListener("click", lineToolStatus); // Enabling or disabling line tool
canvas3.addEventListener("click", runLineTool); // Running line tool if enabled

function runColorCheck() { return color = document.getElementById("colorPicker").value; } // Get the color 

function drawOnCanvas(color, plots) {
    ctx2.strokeStyle = color;
    ctx2.beginPath();
    for (var i = 1; i < plots.length; i++) { ctx2.lineTo(plots[i].x, plots[i].y); }
    ctx2.stroke();
}

function setSinglePixel(e) {
    if (!isDrawing) return;
    if (mouseDown) {
        if (!lineStatus) {
            runColorCheck();
            ctx2.strokeStyle = color;
            var x = e.offsetX || e.layerX - canvas.offsetLeft;
            var y = e.offsetY || e.layerY - canvas.offsetTop;
            ctx2.beginPath();
            ctx2.lineTo(x, y);
            ctx2.stroke();
        }
    }
}

function drawFromStream(message) {
    if (!message || message.plots.length < 1) return;
    drawOnCanvas(message.color, message.plots);
}

function draw(e) {
    if (!isActive) return;
    if (!eraserStatus) {
        if (!isDrawing) return;
    }
    if (!lineStatus) {
        var x = e.offsetX || e.layerX - canvas3.offsetLeft;
        var y = e.offsetY || e.layerY - canvas3.offsetTop;
        plots.push({ x: x, y: y });
        runColorCheck();
        drawOnCanvas(color, plots);
    }
}

function startDraw(e) { isActive = true; mouseDown = true; }
function endDraw(e) { isActive = false; plots = []; }
function disablePixel(e) { mouseDown = false; }

function runEraser() {
    var oldcolor = color;
    $('.fa-pen-alt').css('color', 'white');
    $('.fa-eraser').css('color', '#25911a');
    colorList.push(oldcolor);
    if (!eraserStatus) {
        color = '#fcfcfc';
        document.getElementById("colorPicker").value = '#fcfcfc';
        runColorCheck();
        eraserStatus = true;
        lineStatus = false; 
        $('.fa-sliders-h').css('color', '#fff');
        isDrawing = false;
        $('.fa-pen-alt').css('color', '#fff');
    } else {
        eraserStatus = false;
        $('.fa-eraser').css('color', 'white');
        isDrawing = true;
        $('.fa-pen-alt').css('color', '#25911a');
        document.getElementById("colorPicker").value = (colorList.slice(-2)[0]);
    }
}

function lineToolStatus(e) {
    if (!lineStatus) { lineStatus = true; $('.fa-sliders-h').css('color', '#25911a'); isDrawing = true; $('.fa-pen-alt').css('color', '#fff'); }
    else if (lineStatus) { lineStatus = false; $('.fa-sliders-h').css('color', '#fff'); isDrawing = false; $('.fa-pen-alt').css('color', '#25911a'); eraserStatus = false; $('.fa-eraser').css('color', 'white'); }
}

function runLineTool(e) {
    if (lineStatus) {
        runColorCheck();
        ctx2.strokeStyle = color;
        var x = e.offsetX || e.layerX - canvas3.offsetLeft;
        var y = e.offsetY || e.layerY - canvas3.offsetTop;
        ctx2.lineTo(x, y);
        ctx2.stroke();
        isDrawing = false;
        $('.fa-pen-alt').css('color', 'white');
        $('.fa-sliders-h').css('color', '#25911a');
    } else {
        lineStatus = false;
        $('.fa-sliders-h').css('color', '#fff');


    } 
}

function runBackground() {
    runColorCheck();
    ctx2.beginPath();

    ctx2.rect(0, 0, canvas3.width, canvas3.height);
    
    ctx2.fillStyle = color;
    ctx2.fill();
}

function resetDrawing() {
    canvas3.width = canvasLoadWidth;
    canvas3.height = canvasLoadHeight;
    $('.bk').css('width', canvas3.width);
    $('.bk').css('height', canvas3.height);
    $('.master').css('width', canvas3.width);
    $('.bk').css('background', '#fff');
    document.getElementById("footer-imgwidth").innerHTML = canvas3.width + "&nbsp;x&nbsp;";
    document.getElementById("footer-imgheight").innerHTML = canvas3.height; 
    eraserStatus = false;
    lineStatus = false; 
    document.getElementById("colorPicker").value = '#000000';
    $('#colorPicker').css('background', '#000000');
    $('#colorPicker').css('color', '#ffffff');
    isUploaded = false;
}

function changeBrushSize() {
    var brushInput = document.getElementById("brushSizeInput").value;
    var setBrushDisplay = document.getElementById("brushSizeDisplay");
    setBrushDisplay.innerHTML = brushInput;
    ctx2.lineWidth = brushInput;
}

function runDrawing() {
    if (isDrawing) {
        isDrawing = false;
        $('.fa-pen-alt').css('color', 'white');
    } else {
        isDrawing = true;
        $('.fa-pen-alt').css('color', '#25911a');
        $('.fa-sliders-h').css('color', '#fff');
        lineStatus = false; 
        eraserStatus = false;
        $('.fa-eraser').css('color', 'white');
        document.getElementById("colorPicker").value = '#000';
    }
}

var picker = new CP(document.querySelector('#colorPicker'));
picker.on("change", function (color) {
    this.source.value = '#' + color;
    eraserStatus = false;
    $('.tmU1').css('border', '1px solid white');
    $('#canvasEraser').css('font-weight', 'normal');
    tempColor = '#' + color;
    $('#colorPicker').css('background', tempColor);
    var r = parseInt(color.substr(0, 2), 16);
    var g = parseInt(color.substr(2, 2), 16);
    var b = parseInt(color.substr(4, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    if (yiq >= 128) {
        $('#colorPicker').css('color', 'black');
    } else { $('#colorPicker').css('color', 'white'); }
});    

$("#master-brush").hover(function () {
    console.log(1);
    $('#brushSize').css('display', 'inline-block');
}, function () {
    $('#brushSize').css('display', 'none');
});

// Canvas size
var canvasLoadWidth = $(".master").width();
var canvasLoadHeight = $(".master").height();

canvas3.width = canvasLoadWidth;
canvas3.height = canvasLoadHeight;

document.getElementById("resize-width").value = canvas3.width;
document.getElementById("resize-height").value = canvas3.height;

document.getElementById("footer-imgwidth").innerHTML = canvasLoadWidth + "&nbsp;x&nbsp;";
document.getElementById("footer-imgheight").innerHTML = canvasLoadHeight; 