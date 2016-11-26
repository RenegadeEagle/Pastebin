var editor = ace.edit("editor");

function post(params) {
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "/");
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    form.submit();
}

function buttonListener() {
    $("#clonebutton").click(function() {
        var editor = ace.edit("editor");
        var paste = editor.getValue();
        post({
            clonepaste: paste
        })
    });
}

function setupEditor() {
    editor.setTheme("ace/theme/sqlserver");
    editor.setOptions({
        maxLines: Infinity,
        minLines: 25
    });
    editor.setReadOnly(true);
    editor.setShowPrintMargin(false);
}

setupEditor();
buttonListener();