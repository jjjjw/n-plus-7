var fs = require('fs');
var wordList = '/usr/share/dict/words';

/*
 * Find the 7th word after each target word and replace it in the text.
 */
function findSubs(text, targets, wordList, cb) {
  var swap = {};
  var i = 0;
  var reader = fs.createReadStream(wordList);  // Read the whole list.

  reader.setEncoding('utf8');
  reader.on('data', function(chunk) {
    // TODO: find word by newlines
  })

  reader.on("close", function() {
    cb(text);
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

module.exports = {
  findSubs: findSubs,
  wordList: wordList
}
