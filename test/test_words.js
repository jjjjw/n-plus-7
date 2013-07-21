var findSubs = require('../lib/words').findSubs,
  wordList = require('../lib/words').wordList,
  assert = require('assert'),
  sampleText = ["The", "sky"],
  sampleTextZ = ["The", "Zyzzogeton"], // Depends upon the dictionary used.
  sampleTargets = {"sky": 1};
  sampleTargetsZ = {"Zyzzogeton": 1};

describe('findSubs', function() {
  it('should replace a word with the 7th word after it in the word list', function(done) {
    findSubs(cb, sampleText, sampleTargets, wordList);

    function cb (err, res) {
      assert.equal(res[1], "skylark")
      done()
    }
  })

  it('should circle the alphabet in the event of replacing a word at the end of the word list', function(done) {
    findSubs(cb, sampleTextZ, sampleTargetsZ, wordList);

    function cb (err, res) {
      assert.equal(res[1], "Aani")
      done()
    }
  })
})
