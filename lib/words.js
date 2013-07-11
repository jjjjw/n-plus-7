var fs = require('fs');
var wordList = '/usr/share/dict/words';
var stream = require('stream');
var Writable = require('stream').Writable;
var readline = require('readline');

/*
 * Find the 7th word after each target word and replace it in the text.
 */
function findSubs(text, targets, wordList, cb) {
  var swap = {};
  var i = 0;
  var reader = fs.createReadStream(wordList);  // Read the whole list.

  reader.setEncoding('utf8');

  var rl = readWords(reader);
  rl.on('line', function (word) {
    findSub(word)
  })

  reader.on('error', function(err) {
    console.log("Error reading word list" + err)
  })

  function findSub(word) {
    if (targets.hasOwnProperty(word)) {
      swap[i] = word;
    }

    if (swap.hasOwnProperty(i + 7)) {
      var origionalWord = swap[i];
      var sourceIndex = targets[origionalWord];

      text[sourceIndex] = word;
      delete swap[i]
    }

    i += 1;
  }

  return true;
}

/*
 * Read a string buffer and emit each word found.
 */
function readWords(reader) {
  var wr = new Writable();  // Throwaway

  var rd = readline.createInterface({
    input: reader,
    output: wr
  });

  return rd;
}

module.exports = {
  findSubs: findSubs,
  wordList: wordList
}
