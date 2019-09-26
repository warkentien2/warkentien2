function initiate() {
    var dynamicData = jvxAd.getDynamicData(), selectedRow = dynamicData.AllyBank[0];
    document.querySelector("#frm1-bkg1").src = selectedRow.frm1Bkg1, document.querySelector("#frm1-bkg1-copy1").src = selectedRow.frm1Bkg1Copy, 
    document.querySelector("#frm1-img1").src = selectedRow.frm1Img1, document.querySelector("#frm1-copy1").innerHTML = selectedRow.frm1Copy1, 
    document.querySelector("#frm2-copy1").innerHTML = selectedRow.frm2Copy1, document.querySelector("#frm1-cta1").innerHTML = selectedRow.frm1Cta1 || "learn more";
}