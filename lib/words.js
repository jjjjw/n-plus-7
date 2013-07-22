var fs = require('fs'),
  wordList = '/usr/share/dict/words',
  stream = require('stream'),
  Writable = require('stream').Writable,
  readline = require('readline');

/*
 * Find the 7th word after each target word and replace it in the text.
 */
function findSubs(cb, text, targets, wordList, opts) {
  var opts = opts || {},
    swap = opts.swap || {},
    i =  opts.i || 0,
    step = opts.step || 7,
    subs = 0,
    // If this is a recursive call, we only care about completing the swaps.
    targetsCount = i ? Object.keys(swap).length : Object.keys(targets).length,
    reader = fs.createReadStream(wordList),
    readLine = readWords(reader);

  reader.setEncoding('utf8');

  readLine.on('line', function (word) {
    findSub(word)
    i += 1;
  })

  reader.on('error', function(err) {
    cb(err)
  })

  reader.on('close', function() {
    // We made all the subsitutions that we could.
    if (Object.keys(swap).length == 0) {
      cb(null, text);

      return;
    }

    // We aren't done, recurse.
    findSubs(cb, text, targets, wordList, {swap: swap, i: i})
  })

  function findSub(word) {
    if (targets.hasOwnProperty(word)) {
      swap[i + step] = word;
    }

    if (swap.hasOwnProperty(i)) {
      var sourceWord = swap[i],
        sourceIndex = targets[sourceWord];

      text[sourceIndex] = word;
      delete swap[i]

      incSubsMade()
    }
  }

  function incSubsMade() {
    subs += 1;
    if (subs >= targetsCount) {
      cb(null, text)  // Done!!!
      reader.pause()  // Stop reading.
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
