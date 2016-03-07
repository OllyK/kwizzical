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

    //fetch the document
    fetchXML("http://localhost:1252/img/thinlogopath3.svg",function(newSVGDoc){
        //import it into the current DOM
        var n = document.importNode(newSVGDoc.documentElement,true);
        document.documentElement.appendChild(n);
    }) 

myobj = document.getElementById('myobj').cloneNode(true);

var init = function() {
  current_frame = 0;
  total_frames = 120;
  path = new Array();
  length = new Array();
  for(var i=0; i<2;i++){
    path[i] = document.getElementById('i'+i);
    l = path[i].getTotalLength();
    length[i] = l;
    path[i].style.strokeDasharray = l + ' ' + l; 
    path[i].style.strokeDashoffset = l;
  }
  handle = 0;
}
