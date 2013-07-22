var findPOS = require('../lib/pos').findPOS,
  wordList = require('../lib/words').wordList,
  findSubs = require('../lib/words').findSubs;

function transformText (cb, text) {
  var posOpts = {
      "NN": true
    },
    taggingRes = findPOS(text, posOpts),
    txtRes;

    findSubs(waterfall, taggingRes.words, taggingRes.targets, wordList)

    function waterfall(err, res) {
      res = rejoin(res);

      cb(err, res)
    }

    return true;
}

/*
 * Punctuation aware join, WIP.
 */
function rejoin(resArray) {
  var resString = "",
    punc = {
      ",": true,
      ".": true,
      ";": true,
      "?": true,
      "'": true
    };

  resArray.forEach(function(word, i) {
    if (i == 0) {
      resString = word;

      return;
    }

    if (punc.hasOwnProperty(word)) {
      resString = resString + word;

      return;
    }

    resString = resString + " " + word;
  })

  return resString;
}

module.exports = {
  transformText: transformText
}
