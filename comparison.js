const timeMargin = 70; // Within this margin the time value is considered correct
const positionMargin = 7; // Within this margin the coordinates is considered correct
const ratioMargin = 0.35; // The percentage of data points that can be wrong

/**
 * A type that represents one data point from a sequence. Consists of a time value and a xy coordinate pair.
 * @typedef {Object} DataPoint
 * @property {number} time
 * @property {{relX: number, relY: number}} value
 */

/**
 * Checks if `lastSequence` is equal to `storedSequence` within the specified margins.
 * @param {DataPoint[]} lastSequence
 * @param {DataPoint[]} storedSequence
 * @returns {boolean}
 */
function compare(lastSequence, storedSequence) {
  lastSequence = lastSequence._events;
  storedSequence = storedSequence._events;

  console.log(lastSequence);
  console.log(storedSequence);

  let numInMargin = 0;
  for (let index = 0; index < lastSequence.length; index++) {
    const dataPoint = lastSequence[index];
    if (dataPointInSequence(dataPoint, storedSequence)) {
      numInMargin += 1;
    }
  }
  const correctRatio = numInMargin / lastSequence.length;
  const lengthRatio = lastSequence.length / storedSequence.length;

  console.log("Ratio of correct points: " + correctRatio);
  console.log("Length ratio: " + lengthRatio);

  return (
    inMargin(correctRatio, 1, ratioMargin) && inMargin(lengthRatio, 1, ratioMargin)
  );
}

/**
 * Checks if `dataPoint` ± the specified margin exists in the array `sequence`.
 * @param {DataPoint} dataPoint
 * @param {DataPoint[]} sequence
 * @returns {boolean}
 */
function dataPointInSequence(dataPoint, sequence) {
  return sequence.some(compareDataPoint.bind(null, dataPoint));
}

/**
 * Checks if `singlePoint` is `sequencePoint` ± the specified margin.
 * @param {DataPoint} singlePoint
 * @param {DataPoint} sequencePoint
 */
function compareDataPoint(singlePoint, sequencePoint) {
  return (inMargin(sequencePoint.time, singlePoint.time, timeMargin) &&
    inMargin(sequencePoint.value.relX, singlePoint.value.relX, positionMargin) &&
    inMargin(sequencePoint.value.relY, singlePoint.value.relY, positionMargin));
}

/**
 * A helper that checks if `comparedValue` is in the interval `centerValue ± margin`
 * @param {number} comparedValue
 * @param {number} centerValue
 * @param {number} margin
 * @returns {boolean}
 */
function inMargin(comparedValue, centerValue, margin) {
  return comparedValue <= centerValue + margin && comparedValue >= centerValue - margin;
}
