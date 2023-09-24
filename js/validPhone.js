const isNumericInput = (event) => {
    const key = event.keyCode;
    return ((key >= 48 && key <= 57) || // Allow number line
        (key >= 96 && key <= 105) // Allow number pad
    );
};

const isModifierKey = (event) => {
    const key = event.keyCode;
    return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
        (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
        (key > 36 && key < 41) || // Allow left, up, right, down
        (
            // Allow Ctrl/Command + A,C,V,X,Z
            (event.ctrlKey === true || event.metaKey === true) &&
            (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
        )
};

const enforceFormat = (event) => {
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if(!isNumericInput(event) && !isModifierKey(event)){
        event.preventDefault();
    }
};

const formatToPhone = (event) => {
    if (isModifierKey(event)) { return; }

    const target = event.target;
    const isContentEditableDiv = target.hasAttribute('contenteditable') && target.getAttribute('contenteditable') === 'true';
    let input, cursorPosition;

    if (isContentEditableDiv) {
        const selection = window.getSelection();
        cursorPosition = selection.anchorOffset;
        input = (target.textContent || '').replace(/\D/g, '').substring(0, 10);
    } else {
        input = (target.value || '').replace(/\D/g, '').substring(0, 10);
    }

    const areaCode = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    let formattedValue = '';
    if (input.length > 6) { formattedValue = `(${areaCode}) ${middle}-${last}`; }
    else if (input.length > 3) { formattedValue = `(${areaCode}) ${middle}`; }
    else if (input.length > 0) { formattedValue = `(${areaCode}`; }

    if (isContentEditableDiv) {
        target.textContent = formattedValue;

        // Move the cursor to the end of the div
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(target); // select all text contents
        range.collapse(false); // collapse the range to its end point
        selection.removeAllRanges(); // remove all ranges from the selection
        selection.addRange(range); // add the new range to the selection
    } else {
        target.value = formattedValue;
    }
};

const inputElements = document.querySelectorAll('.phoneNumber');
inputElements.forEach(element => {
    element.addEventListener('keydown',enforceFormat);
    element.addEventListener('keyup',formatToPhone);
});