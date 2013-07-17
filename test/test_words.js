var findSubs = require('../lib/words').findSubs;
var wordList = require('../lib/words').wordList;
var assert = require('assert');

var sampleText = ["The", "sky"];
var sampleTargets = {"sky": 1};

describe('findSubs', function() {
  it('should replace a word with the 7th word after it in the word list', function(done) {
    findSubs(sampleText, sampleTargets, wordList, cb);

    function cb (err, res) {
      assert.equal(res[1], "skylark")
      done()
    }
  })
})
