var pos = require('pos');

/*
 * Returns the words and the word: location for targeted parts of speech.
 * Options are the tag types of pos-js.
 */
function findPOS (text, opts) {
  var words = new pos.Lexer().lex(text),
      taggedWords = new pos.Tagger().tag(words),
      targets = {}

  taggedWords.forEach(function(taggedWord, i) {
    var tag = taggedWord[1];

    if (opts.hasOwnProperty(tag)) {
      var word = taggedWord[0];  // Throw away the actual tag.
      targets[word] = i;
    }
  })

  return {
    words: words,
    targets: targets
  }
}


module.exports = {
  findPOS: findPOS
}
