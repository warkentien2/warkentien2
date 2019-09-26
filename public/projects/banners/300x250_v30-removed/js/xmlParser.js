params = product;

var xmlURL = "https://www.ally.com/apps/global/xml/rates.xml", rateValue = [], parseRates = function() {
    var x = new XMLHttpRequest();
    try {
        x.open("GET", xmlURL), x.timeout = 3e3, !window.ActiveXObject && "ActiveXObject" in window && (x.responseType = "msxml-document"), 
        x.send(null), x.onreadystatechange = function() {
            if (4 == x.readyState && 200 == x.status && null != x.responseXML) for (var doc = x.responseXML, i = 0; i < params.length; i++) {
                var getrate;
                if (null == (getrate = doc.evaluate ? doc.evaluate("//product/term[@id='" + params[i].termId + "']/rate[@min='" + params[i].min + "' and @max='" + params[i].max + "']/apy/text()", doc, null, 0, null).iterateNext() : doc.selectNodes("//product/term[@id='" + params[i].termId + "']/rate[@min='" + params[i].min + "' and @max='" + params[i].max + "']/apy/text()")[0])) break;
                doc.evaluate ? 0 != getrate.textContent.length && -1 != getrate.textContent.indexOf(".") && (rateValue.push(getrate.textContent), 
                window.console && console.log) : 0 != getrate.text.length && -1 != getrate.text.indexOf(".") && (rateValue.push(getrate.text), 
                window.console && console.log);
            }
        };
    } catch (e) {
        window.console && console.error;
    }
};