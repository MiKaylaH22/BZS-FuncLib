// TODO: Add tag features

// read text from URL location
var request = new XMLHttpRequest();
request.open('GET', 'https://raw.githubusercontent.com/MN-Script-Team/BZS-FuncLib/working-branch-325-docstring-time-yo/MASTER%20FUNCTIONS%20LIBRARY.vbs', true);

request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
        var type = request.getResponseHeader('Content-Type');
        if (type.indexOf("text") !== 1) {
            
            var x = request.responseText.split("\n");
            var z = "";
            for (var i = 0; i < x.length; i++) {
                
                
                
                if (x[i].toLowerCase().startsWith("function")) {
                    
                    // Now we need to get the function name (removing the word "function" of course)
                    var nameOfFunction = x[i].toLowerCase().replace("function", "");
                    
                    // Stripping out everything after the first "(" character
                    nameOfFunction = nameOfFunction.slice(0, nameOfFunction.indexOf("(" ));
                    
                    // Grabbing the docstring definition for the function
                    var functionDefinition = x[i + 1].replace("'--- ", "");
                    
                    z = z + "<h1>" + nameOfFunction + "</h1>" + "\n" + "<h2>" + functionDefinition + "</h2>";
                }
                
            }
            document.getElementById("list").innerHTML = z;
        }
    }
}

request.send(null);
