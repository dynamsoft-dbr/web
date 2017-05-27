var dbrObject;

function onInitSuccess() {
    dbrObject = new dynamsoft.dbrEnv.BarcodeReader();
}

function onInitError(errCode, errMsg) {
    alert(errMsg);
}

dynamsoft.dbrEnv.productKey = "t0068NQAAAGesx+MAzzxDdPsKq7w2o/NatXjaIedwY/4h8b6dfEz+7OG8DZxgHoUfaHZC4xu+AoMxriB2L44DAKXJK25f0hg=";
dynamsoft.dbrEnv.init(onInitSuccess, onInitError);

function fileSelected() {
    var count = document.getElementById('fileToUpload').files.length;
    if (count > 0) {
        var file = document.getElementById('fileToUpload').files[0];
        document.getElementById('filename').value = file.name;
    }

    resetCheckBox();
}

function resetCheckBox() {
    var barcodeTypes = document.getElementsByName("BarcodeType");
    for (i = 0; i < barcodeTypes.length; i++) {
        barcodeTypes[i].checked = false;
    }
}

function getSelectedBarcodeTypes() {
    var vType = 0;
    var barcodeTypes = document.getElementsByName("BarcodeType");
    for (i = 0; i < barcodeTypes.length; i++) {
        if (barcodeTypes[i].checked == true)
            vType = vType | (barcodeTypes[i].value * 1);
    }

    return vType? vType : -1;
}

function onBarcodeReadSuccess(userData, result) {
    var count = result.getCount();
    var strMsg = "";
    if (count > 0) {
        for (var i = 0; i < count; i++) {
            strMsg += "<p>" + "Index: " + i + ". ";
            strMsg += "Barcode Type: " + result.get(i).formatString + ", ";
            strMsg += "Barcode Value: " + result.get(i).text + ".</p>";
        }
        document.getElementById('resultBox').innerHTML = strMsg;
    } else {
        alert("No barcode(s) found.");
    }
}

function onBarcodeReadFailure(userData, errorCode, errorString) {
    alert(errorCode + errorString);
}

function doReadBarcode() {
    dbrObject.barcodeFormats = getSelectedBarcodeTypes();
    var file = document.getElementById("fileToUpload").files[0];
    dbrObject.readBinaryAsync(file, "tmp.bmp", onBarcodeReadSuccess, onBarcodeReadFailure);
}