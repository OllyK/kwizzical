"use strict";
addEventListener('load', start);

function start() {
  var b = document.querySelector("#applybutton");
  b.addEventListener('click', change);
}

function change(event) {
  document.querySelector("#paragraph").innerHTML = "You changed the heading. Well done.";
}
