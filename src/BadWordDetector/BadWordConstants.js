const badWords = [
  'negr',
  'nihg',
  // 'niger',
  // 'nigga',
  // 'niga',
  'nig',
  // 'nigs',
  // 'faglex',
  // 'fagot',
  'fag',
  // 'пig',
  'nger',
  'higer',
  'gay',
  'retard',
  'retrd',
  'retord',
  'feg',
  'fahg',
  'fgot',
  'fgat',
  'ngr'
];

const allowedWords = [
  'night',
  'onger',
  'anger',
]

const characterReplicas = {
  // A
  a: 'a',
  A: 'a',
  '@': 'a',
  // D
  d: 'd',
  D: 'd',
  // E
  e: 'e',
  E: 'e',
  // F,
  f: 'f',
  F: 'f',
  // G
  g: 'g',
  G: 'g',
  '&': 'g',
  9: 'g',
  q: 'g',
  ɠ: 'g',
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
  ı: 'i',
  // N
  n: 'n',
  N: 'n',
  и: 'n',
  п: 'n',
  // O
  o: 'o',
  O: 'o',
  0: 'o',
  // R
  r: 'r',
  R: 'r',
  // T
  t: 't',
  T: 't',
};

module.exports = {
  badWords,
  characterReplicas,
  allowedWords
};
