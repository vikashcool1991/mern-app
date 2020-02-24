module.exports = {
  uuid() {
    return Math.random().toString(36).substring(4) + (new Date()).getTime().toString(36);
  },
  getUuid() {
    const fourByteMaxNum = 4294967296;
    return parseInt(Math.random() * (fourByteMaxNum), 10);
  },
  // min and max included
  randomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
};