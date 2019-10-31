$(function() {

    let eidasBtn = document.getElementById("setup_eidas");
    let eidasSubmit = document.getElementById("eidasModal");
    let did = "";

    eidasBtn.onclick = function(){
        did = createDID();
        $("#eidasModal").modal();
    };

    eidasSubmit.onsubmit = function(e){
        var password = document.getElementById("psw").value;
        var file = document.getElementById("p12file").files[0];

        // setting up the reader
        var reader = new FileReader();

        reader.onload = function () {
            var resultHexString = buf2hex(reader.result);
            loadQEC(resultHexString, password, did);
        };

        reader.readAsArrayBuffer(file);
    };

});

function createDID() {
    return "did:example:21tDAKCERh95uGgKbJNHYp";
}

function buf2hex(buffer) { // buffer is an ArrayBuffer
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

function loadQEC (p12data, input_password, input_did) {

    var data = {
        "did": input_did,
        "p12data": p12data,
        "password": input_password
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:5002/eidas/load-qec",
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: onValidationSuccess
    });
}

function onValidationSuccess(data) {
    if (data.result) {
        console.log("eIDAS Certificate and keys imported successfully!");
        updateDIDDoc(did);
    } else {
        console.error('Error');
    }
}

function updateDIDDoc(did) {
    console.log("DID Document successfully updated.");
}