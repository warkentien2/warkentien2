!function(window, undefined) {
    "use strict";
    var document = window.document;
    function fallback() {
        var fallbackDiv = document.getElementById("fallback");
        if (fallback) {
            fallbackDiv.style.display = "inline";
            var productNameDiv = document.getElementById("productName");
            productNameDiv && (productNameDiv.style.display = "none");
        }
    }
    parseRates(), setTimeout(function() {
        !function() {
            if (rateValue && 0 != rateValue.length && rateValue.length == params.length) for (var i = 0; i < rateValue.length; i++) try {
                var rateDiv, minimumDeposit;
                rateDiv = document.getElementById("darate" + i), minimumDeposit = document.getElementById("minimum-deposit"), 
                rateDiv.getElementsByTagName("span")[0].innerHTML = rateValue[i], rateDiv.style.display = "inline", 
                minimumDeposit.style.display = "inline";
            } catch (e) {
                window.console && console.error, fallback();
                for (var y = 0; y < i; y++) null != document.getElementById("rate" + y) && ((rateDiv = document.getElementById("rate" + y)).style.display = "none");
                break;
            } else fallback(), window.console && console.error;
        }();
    }, 3e3);
}(this);