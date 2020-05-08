let touchArea = document.getElementById("touchArea");
let compareButton = document.getElementById("compareButton");
let playButton = document.getElementById("playButton");

touchArea.onpointerup = touchAreaUp;
touchArea.onpointerdown = touchAreaDown;
playButton.onclick = playButtonClick;
compareButton.onclick = compareButtonClick;

function touchAreaUp(event) {
  compareButton.disabled = false;
  touchArea.innerHTML = "Sound saved";

  event.preventDefault();
}

function touchAreaDown(event) {
  touchArea.innerHTML = "";
  touchArea.style.cssText = "border-color:transparent;";

  event.preventDefault();
}

function playButtonClick(event) {
  webAudioXML.playSequence("_storedGesture");
  event.preventDefault();
}

function compareButtonClick(event) {
  webAudioXML.lastGesture.play();
  webAudioXML.copyLastGestureToClipboard();
  compare(webAudioXML.lastGesture, webAudioXML.getSequence("_storedGesture"))
    ? ((touchArea.style.cssText = "border-color:green;"),
      (touchArea.innerHTML =
        "YOU DID IT! <br/> The sounds and gestures match!"))
    : ((touchArea.style.cssText = "border-color:red;"),
      (touchArea.innerHTML = "The sounds do not match.. <br/> Try again!"));
  event.preventDefault();
}
