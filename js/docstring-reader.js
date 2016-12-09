// TODO: Add tag features
// TODO: Switch branch to classic

// read text from URL location
var request = new XMLHttpRequest();
request.open('GET', 'https://raw.githubusercontent.com/MN-Script-Team/BZS-FuncLib/working-branch-325-docstring-time-yo/MASTER%20FUNCTIONS%20LIBRARY.vbs', true);

// This sends the request for info and does all of the hard work
request.onreadystatechange = function () {
    // If the data is there, then...
    if (request.readyState === 4 && request.status === 200) {
        // create a new variable called "type" which handles the response header, or "type of content we're dealing with"
        var type = request.getResponseHeader('Content-Type');
        
        // If it's text, that means it's probably working and we can proceed!
        if (type.indexOf("text") !== 1) {
            
            // Create a variable filled with the contents of the FuncLib file
            var funclibContentsArray = request.responseText.split("\n");
            
            // Creating a blank variable for the contents-to-be-displayed-on-the-site. This will be filled in by what's to come!
            var contentsForSite = "";

            // <<<<<<<<<<   I have temporarily commented this out because there's extra functions that should be (eventually) placed in the primary
            //              order of functions. For now, these extra functions aren't included in the regular documentation and thus aren't described.
            //for (var i = 0; i < funclibContentsArray.length; i++) {
            
            // This iterates through the entirity of the array...
            for (var i = 234; i < funclibContentsArray.length; i++) {
            
                // ...and if the line starts with "function" (converted to lower case for consistency)...
                if (funclibContentsArray[i].toLowerCase().startsWith("function")) {
                    
                    // ...then we need to get the function name (removing the word "function" of course)...
                    var nameOfFunction = funclibContentsArray[i].toLowerCase().replace("function", "");
                    
                    // ...and strip out everything after the first "(" character...
                    nameOfFunction = nameOfFunction.slice(0, nameOfFunction.indexOf("(" ));
                    
                    // ...then we grab the docstring definition for the function...
                    var functionDefinition = funclibContentsArray[i + 1].replace("'--- ", "");
                    
                    // ...and finally we write the contents to the contentsForSite variable.
                    contentsForSite = contentsForSite + "<h1>" + nameOfFunction + "</h1>" + "\n" + "<h2>" + functionDefinition + "</h2>";
                }                
            }
            
            // This displays the contents in the element with the ID of "list"
            document.getElementById("funclibContents").innerHTML = contentsForSite;
        }
    }
}

request.send(null);
