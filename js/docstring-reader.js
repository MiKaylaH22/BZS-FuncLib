// TODO: scan script files for a list of scripts where each function is used IRL
// TODO: Create alpha links bar in navbar, corresponding functionality in the long lists
// TODO: turn dummy tag buttons into useable tag buttons which sort and integrate with the Functions by tags menu
// TODO: add a feature to switch branches (master or insert your own)
// TODO: create page explaining how to use FuncLib in your project
// TODO: replace warning text with a spinner or something so as not to alarm folks with slow connections, move warning text to something that happens if connection not made
// TODO: create expand all functionality

function displayFuncLibInfo() {

    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', 'https://raw.githubusercontent.com/MN-Script-Team/BZS-FuncLib/RELEASE/MASTER%20FUNCTIONS%20LIBRARY.vbs', true);

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
                
                // Creating blank variables for the contents-to-be-displayed-on-the-site. This will be filled in by what's to come!
                var contentsForSite = "";
                var listOfParameters = "";
                var listOfTags = "";
            

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
                        
                        // ...we set an increment variable for the following do loop...
                        var parameterLineToCheck = i + 2;
                        
                        // ...now we need to grab all of the parameters used by the function...
                        do {
                            var areWeDoneYet = false;                                                                                                           // sets this initial value
                            var parameterCheck = funclibContentsArray[parameterLineToCheck].startsWith("'~~~~~ ");                                              // checks to see if this is a parameter
                            var tagCheck = funclibContentsArray[parameterLineToCheck].startsWith("'===== Keywords: ");                                          // also checks to see if this is a list of keywords or tags
                            if (parameterCheck == true) {                                                                                                       // if it is a parameter, add it!     
                                listOfParameters = listOfParameters + "<li>" + funclibContentsArray[parameterLineToCheck].replace("'~~~~~ ", "") + "</li>";     // This adds it to the list of parameters!
                            } else if (tagCheck = true) {
                                var tagList = funclibContentsArray[parameterLineToCheck].replace("'===== Keywords: ", "");
                                var tagArray = tagList.split(",");
                                for (var j = 0; j < tagArray.length; j++) {
                                    listOfTags = listOfTags + "<button class='btn btn-info btn-xs tag-buttons' type='button'>" + tagArray[j].trim() + "</button>";                 // This adds it to the list of tags!
                                }
                                areWeDoneYet = true;
                            } else {                                                                                                                            // otherwise...
                                areWeDoneYet = true;                                                                                                            // ...then we're done with parameters and tags!
                            }
                            parameterLineToCheck++;                                                                                                                                                                 // increment i one more so we can go through again!
                        }
                        while (areWeDoneYet != true);                                                                                                                                                               // do this until we're done with parameters or tags!
                        
                        // ...and finally we write the contents to the contentsForSite variable.
                        contentsForSite = contentsForSite + "<div class='panel-group'>" + "\n" + 
                                                                "<div class='panel panel-default'>" + "\n" + 
                                                                    "<div class='panel-heading'>" + "\n" + 
                                                                        "<h4 class='panel-title'>" + "\n" + 
                                                                            "<a data-toggle='collapse' href='#" + nameOfFunction.replace(" ", "") + "'>" + nameOfFunction + "</a>" + "\n" + 
                                                                        "</h4>" + "\n" + 
                                                                    "</div>" + "\n" + 
                                                                    "<div id='" + nameOfFunction.replace(" ", "") + "' class='panel-collapse collapse'>" + "\n" + 
                                                                        "<div class='panel-body'>" + 
                                                                            "<p>" + functionDefinition + "</p>" + "\n" + 
                                                                            "<p>Parameters used by this function: </p>" + "\n" + 
                                                                            "<ul>" + listOfParameters + "</ul>" + "\n" + 
                                                                            listOfTags + "\n" +
                                                                        "</div>" + "\n" + 
                                                                    "</div>" + "\n" + 
                                                                "</div>" + "\n" + 
                                                            "</div>";
                        
                        // We need to clear the listOfParameters and listOfTags before proceeding
                        listOfParameters = "";
                        listOfTags = "";
                    }                
                }
                
                // This displays the contents in the element with the ID of "list"
                document.getElementById("funclibContents").innerHTML = contentsForSite;
            }
        }
    }

    request.send(null);
}
