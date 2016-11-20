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
buttonListener();
