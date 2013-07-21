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
      res = res.join(" ");
      res = cleanTransform(res);

      cb(err, res)
    }

    return true;
}

/*
 * Brute force, stripping problematic spaces from punctuation.
 * TODO, implement a sentence join func.
 */
function cleanTransform(text) {
  text = text.replace(/(\s\,)/g, ",")
  text = text.replace(/(\s\.)/g, ".")
  text = text.replace(/(\s\;)/g, ";")
  text = text.replace(/(\s\?)/g, "?")
  text = text.replace(/(\s\')/g, "'")  // bad

  return text;
}

module.exports = {
  transformText: transformText
}
