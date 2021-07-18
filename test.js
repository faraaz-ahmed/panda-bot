const BadWordDetector = require('./src/BadWordDetector/BadWordDetector');

const bWD = new BadWordDetector();
console.log(bWD.detect('retard'));
