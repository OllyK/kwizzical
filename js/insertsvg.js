"use strict";

    function fetchXML  (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function (evt) {
        //Do not explicitly handle errors, those should be
        //visible via console output in the browser.
        if (xhr.readyState === 4) {
            callback(xhr.responseXML);
        }
        };
        xhr.send(null);
    };

    //check if https is being used
    function isHttps() {
      return window.location.protocol == "https:";
    }

    //fetch the document
    if(isHttps()) {
      console.log("HTTPS");
      fetchXML("https://localhost:2347/img/thinlogopath3.svg", function(newSVGDoc){
          //import it into the current DOM
          var n = document.importNode(newSVGDoc.documentElement,true);
          document.documentElement.appendChild(n);
      });
    }
    else if(!isHttps()){
      console.log("HTTP");
      fetchXML("http://localhost:1252/img/thinlogopath3.svg", function(newSVGDoc){
          //import it into the current DOM
          var n = document.importNode(newSVGDoc.documentElement,true);
          document.getElementById("myobj").appendChild(n);
      });
    }
