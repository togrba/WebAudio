let touchArea = document.getElementById("touchArea");
let buttonTwo = document.getElementById("button2");

touchArea.onclick = touchAreaClick;
touchArea.onpointerdown = touchAreaDown;

function touchAreaClick(event) {
  buttonTwo.disabled = false;
  compare(webAudioXML.lastGesture, webAudioXML.getSequence("_storedGesture"))
    ? ((touchArea.style.cssText = "border-color:green;"),
      (touchArea.innerHTML =
        "YOU DID IT! <br/> The sounds and gestures match!"))
    : ((touchArea.style.cssText = "border-color:red;"),
      (touchArea.innerHTML = "The sounds do not match.. <br/> Try again!"));

  event.preventDefault();
}

function touchAreaDown(event) {
  touchArea.innerHTML = "";
  touchArea.style.cssText = "border-color:transparent;";

  event.preventDefault();
}
