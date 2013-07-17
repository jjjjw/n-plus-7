var fs = require('fs'),
  wordList = '/usr/share/dict/words',
  stream = require('stream'),
  Writable = require('stream').Writable,
  readline = require('readline');

/*
 * Find the 7th word after each target word and replace it in the text.
 */
function findSubs(text, targets, wordList, cb) {
  var swap = {},
    i = 0,
    subs = 0,
    targetsCount = Object.keys(targets).length,
    reader = fs.createReadStream(wordList),
    readLine = readWords(reader);

  reader.setEncoding('utf8');

  readLine.on('line', function (word) {
    findSub(word)
  })

  reader.on('error', function(err) {
    cb(err)
  })

  function findSub(word) {
    if (targets.hasOwnProperty(word)) {
      swap[i + 7] = word;
    }

    if (swap.hasOwnProperty(i)) {
      var sourceWord = swap[i],
        sourceIndex = targets[sourceWord];

      text[sourceIndex] = word;
      delete swap[i]

      incSubsMade()
    }

    i += 1;
  }

  function incSubsMade () {
    subs += 1;
    if (subs >= targetsCount) {
      cb(null, text)  // Done!!!
      reader.pause() // Stop reading.
    }
  }

  return true;
}

/*
 * Read a string buffer and emit each line as a word.
 */
function readWords(reader) {
  var wr = new Writable(),
    rl = readline.createInterface({
      input: reader,
      output: wr
    });

  return rl;
}

module.exports = {
  findSubs: findSubs,
  wordList: wordList
}
