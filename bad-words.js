const badWords = [
  'negro',
  'niger',
  'nigga',
  'niga',
  'nig',
  'nigs',
  'faglex',
  'fagot',
  'fag',
  'пig',
  'nger',
  'higer',
];

const characterReplicas = {
  // A
  a: 'a',
  A: 'a',
  // F,
  f: 'f',
  F: 'f',
  // G
  g: 'g',
  G: 'g',
  '&': 'g',
  9: 'g',
  // H
  h: 'h',
  H: 'h',
  // I
  i: 'i',
  I: 'i',
  1: 'i',
  '!': 'i',
  '\\': 'i',
  '|': 'i',
  '{': 'i',
  '}': 'i',
  '[': 'i',
  ']': 'i',
  '(': 'i',
  ')': 'i',
  '*': 'i',
  l: 'i',
  $: 'i',
  // N
  n: 'n',
  N: 'n',
  o: 'o',
  O: 'o',
  0: '0',
  t: 't',
  T: 't',
};

module.exports = class BadWordDetector {
  constructor() {}

  resolve(word) {
    let resolvedWord = '';
    let i = 0;
    while (i < word.length) {
      const currentChar = word.charAt(i);
      resolvedWord += characterReplicas[currentChar]
        ? characterReplicas[currentChar]
        : currentChar !== ' '
        ? currentChar
        : '';
      i++;
    }
    return resolvedWord;
  }

  compress(word) {
    let compressedWord = '';
    let i = 0;
    while (i < word.length) {
      const currentChar = word.charAt(i);
      const previousChar = i !== 0 ? word.charAt(i - 1) : '';
      compressedWord += currentChar !== previousChar ? currentChar : '';
      i++;
    }
    return compressedWord;
  }

  detect(word) {
    return badWords.find((badWord) =>
      this.compress(this.resolve(word)).includes(badWord)
    );
  }

  // checkIfAlphanumeric(word) {
  //   let regex = /^[A-Za-z][A-Za-z0-9]*$/;
  //   return word.length > 1 && word.match(regex);
  // }
  checkIfAlphanumeric(str) {
    var code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 31 && code < 128)) {
        // lower alpha (a-z)
        return false;
      }
    }
    return true;
  }
};
