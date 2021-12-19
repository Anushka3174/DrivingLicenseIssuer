async function submit() {
    const bizCard = {
        DLNumber: document.getElementById("DLNumber").value,
        Name: document.getElementById("Name").value,
        Address: document.getElementById("Address").value,
        Issuer_Address: document.getElementById("Issuer_Address").value,
        DOB: document.getElementById("DOB").value,
        FName:document.getElementById("FName").value,
        Contact: document.getElementById("Contact").value,
        Residence_Number: document.getElementById("Residence_Number").value
    }

    console.log(bizCard)
    openModal();
    hideQRCode();
    showSpinner();
    axios.post('/api/issue', bizCard).then((response) => {
        console.log("This is in js",response);
        // let inviteURL = response.data.invitation;
        setQRCodeImage(response.data.offerUrl);
        hideSpinner();
        showQRCode();
    });
}

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function hideQRCode() {
    let qrImage = document.getElementsByClassName("qr-image")[0];
    if (qrImage) {
        qrImage.remove();
    }
    qr.style.display = "none";
}

function showQRCode() {
    qr.style.display = "block";
}

function setQRCodeImage(url) {
    let svgElement = document.createElement("div");
    let s = QRCode.generateSVG(url, {
        ecclevel: "M",
        fillcolor: "#FFFFFF",
        textcolor: "#373737",
        margin: 4,
        modulesize: 8,
    });
    s.classList.add("qr-image");
    svgElement.appendChild(s);
    qr.appendChild(s);
}

function hideSpinner() {
    spinner.style.display = "none";
}

function showSpinner() {
    spinner.style.display = "block";
}
