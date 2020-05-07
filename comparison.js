function compare(lastSequence, storedSequence) {
  lastSequence = lastSequence._events;
  storedSequence = storedSequence._events;
  console.log(lastSequence);
  console.log(storedSequence);
  let numOfCorrect = 0;
  for (let index = 0; index < lastSequence.length; index++) {
    const dataPoint = lastSequence[index];
    if (dataPointInSequence(dataPoint, storedSequence)) {
      numOfCorrect += 1;
    }
  }
  let correctRatio = numOfCorrect / lastSequence.length;
  console.log("correct: " + correctRatio);
  let lengthRatio = lastSequence.length / storedSequence.length;
  console.log("length: " + lengthRatio);
  let ratioMargin = 0.2;
  console.log(
    inMargin(correctRatio, ratioMargin) && inMargin(lengthRatio, ratioMargin)
  );

  return (
    inMargin(correctRatio, ratioMargin) && inMargin(lengthRatio, ratioMargin)
  );
  // if (correctRatio > 0.8 && lastSequence.length * ratioMargin > storedSequence.length) {
  //   console.log("true");
  //   return true;
  // } else {
  //   console.log("false");
  //   return false;
  // }
}

function inMargin(ratio, margin) {
  return ratio <= 1 + margin && ratio >= 1 - margin;
}

function dataPointInSequence(dataPoint, sequence) {
  return sequence.some(compareDataPoint.bind(null, dataPoint));
}

function compareDataPoint(singlePoint, sequencePoint) {
  let timeMargin = 30;
  let posMargin = 5;
  let timeInMargin =
    sequencePoint.time <= singlePoint.time + timeMargin &&
    sequencePoint.time >= singlePoint.time - timeMargin;
  let xInMargin =
    sequencePoint.value.relX <= singlePoint.value.relX + posMargin &&
    sequencePoint.value.relX >= singlePoint.value.relX - posMargin;
  let yInMargin =
    sequencePoint.value.relY <= singlePoint.value.relY + posMargin &&
    sequencePoint.value.relY >= singlePoint.value.relY - posMargin;

  return timeInMargin && xInMargin && yInMargin;
}
