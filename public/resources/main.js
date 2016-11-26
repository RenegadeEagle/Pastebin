var editor = ace.edit("editor");

function post(params) {
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "/");

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
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

function setupEditor(){
    editor.setTheme("ace/theme/sqlserver");
    editor.session.setMode("ace/mode/plain");
    editor.setOptions({
        maxLines: Infinity,
        minLines: 25
    });
    editor.resize();
    editor.setShowPrintMargin(false);
    editor.session.setUseWorker(false)
}

function buttonListener() {
    $("#submitbutton").click(function (){
        var editor = ace.edit("editor");
        
        var text = editor.getValue();
        if(text == "") {
            return;
        }
        var syntax = document.getElementById("syntax-highlight-selector").value;
        
        post({
            paste : text,
            syntax: syntax
        })
    });
}
function syntaxListener() {
    $("#syntax-highlight-selector").change(function () {
        var changeto = $(this).val();
        switch (changeto) {
            case "none":
                editor.session.setMode("ace/mode/plain");
                break;
            case "c":
                editor.session.setMode("ace/mode/c_cpp");
                break;
            case "cpp":
                editor.session.setMode("ace/mode/c_cpp");
                break;
            case "csharp":
                editor.session.setMode("ace/mode/csharp");
                break;
            case "golang":
                editor.session.setMode("ace/mode/golang");
                break;
            case "java":
                editor.session.setMode("ace/mode/java");
                break;
            case "lau":
                editor.session.setMode("ace/mode/lua");
                break;
            case "mysql":
                editor.session.setMode("ace/mode/sql");
                break;
            case "php":
                editor.session.setMode("ace/mode/php");
                break;
            case "python":
                editor.session.setMode("ace/mode/python");
                break;    
        }
    });;
}
setupEditor();
syntaxListener();
buttonListener();
