/* Functions for "Dynamic Numeral System Converter" - dnsc */

function focusHandler(element)
/* Makes the entry ready for typeing in; removes readonly state and selects the entry. */
{
    element.readOnly = false; // IE7
    element.removeAttribute('readonly', 1);
    element.select();
}

function blurHandler(element)
/* Makes the entry closed; sets readonly state. */
{
    element.readOnly = true; // IE7
    element.setAttribute('readonly', 'readonly', 1);
}

function keyUpHandler(element)
/* Converts any values to all other numeral systems. */
{
    var numSys = element.name;
    var form = document.getElementById('dnsc');

    if (numSys == 'bin') {
        form.dec.value = parseInt(form.bin.value, 2);
        form.oct.value = parseInt(form.dec.value).toString(8);
        form.hex.value = parseInt(form.dec.value).toString(16);
    }
    else if (numSys == 'oct') {
        form.dec.value = parseInt(form.oct.value, 8);
        form.bin.value = parseInt(form.dec.value).toString(2);
        form.hex.value = parseInt(form.dec.value).toString(16);
    }
    else if (numSys == 'dec') {
        form.bin.value = parseInt(form.dec.value).toString(2);
        form.oct.value = parseInt(form.dec.value).toString(8);
        form.hex.value = parseInt(form.dec.value).toString(16);
    }
    else if (numSys == 'hex') {
        form.dec.value = parseInt(form.hex.value, 16);
        form.bin.value = parseInt(form.dec.value).toString(2);
        form.oct.value = parseInt(form.dec.value).toString(8);
    }
}

function keyDownHandler(eventObject)
/* Prevents typing in invalid characters. */
{
    var keyCode = null;
    var keyChar = null;
    var elementName = null;

    if (eventObject.keyCode) {
        keyCode = eventObject.keyCode;
        keyChar = String.fromCharCode(eventObject.keyCode);
    }
    else if (eventObject.which) {
        keyCode = eventObject.which;
        keyChar = unescape("%" + eventObject.which.toString(16));
    }
    else if (eventObject.charCode) {
        keyCode = eventObject.charCode;
        keyChar = unescape("%" + eventObject.charCode.toString(16));
    }

    if (eventObject.srcElement)
        elementName = eventObject.srcElement.name;
    else if (eventObject.target)
        elementName = eventObject.target.name;
    else if (eventObject.currentTarget)
        elementName = eventObject.currentTarget.name;

    if (!isAlphanumeric(keyCode)) {
        return;
    }
    else if (isBadChar(keyChar, elementName)) {

        if (eventObject.stopPropagation) /* W3C (Firefox, Safari) */{
            eventObject.stopPropagation();
            eventObject.preventDefault();
        }
        else if (event.cancelBubble == false) /* IE7, Safari */{
            event.cancelBubble = true;
            event.returnValue = false;
        }
        /*
        Both above variants don't work with Opera 9 ...
        The following alert() statement consumes the event in Opera 9, but why? 
        Anyway it causes the event handling for Firefox to fail!
        */
        alert("Wrong character!");

    }
}

function isAlphanumeric(keyCode)
/* Checks key code for alphanumeric being. */
{
    if (
        !(48 <= keyCode && 57 >= keyCode) &&    // Zahlen 0-9
        !(65 <= keyCode && 90 >= keyCode) &&    // Großbuchstaben A-Z
        !(97 <= keyCode && 122 >= keyCode)      // Kleinbuchstaben a-z
    ) // ASCII
        return false;
    else
        return true;
}

function isBadChar(value, numSys)
/* Checks for invalid characters. */
{
    var rtn;

    if (numSys == 'bin' && value.match(/[^0-1]/gi)) {
        rtn = true;
    }
    else if (numSys == 'oct' && value.match(/[^0-7]/gi)) {
        rtn = true;
    }
    else if (numSys == 'dec' && value.match(/[^0-9]/gi)) {
        rtn = true;
    }
    else if (numSys == 'hex' && value.match(/[^0-9A-F]/gi)) {
        rtn = true;
    }
    else {
        rtn = false;
    }

    return rtn;
}
