const badWords = [
  'negro',
  'nihg',
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
  'gay',
  'retard',
  'retrd',
  'retord',
  'feg',
  'fahg'
];

const characterReplicas = {
  // A
  a: 'a',
  A: 'a',
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
  // O
  o: 'o',
  O: 'o',
  0: 'o',
  // R
  r: 'r',
  R: 'r',
  t: 't',
  T: 't',
};

module.exports = {
  badWords,
  characterReplicas,
};
