"use strict";

var _build = require("./build");

var _tests = require("./tests");

var _cmp = require("./cmp");

var testDoc = (0, _build.doc)((0, _build.p)("ab"), (0, _build.blockquote)((0, _build.p)((0, _build.em)("cd"), "ef")));
var _doc = { node: testDoc, start: 0, end: 12 };
var _p1 = { node: testDoc.child(0), start: 1, end: 3 };
var _blk = { node: testDoc.child(1), start: 5, end: 11 };
var _p2 = { node: _blk.node.child(0), start: 6, end: 10 };

(0, _tests.defTest)("resolve", function () {
  var expected = {
    0: [_doc, 0, null, _p1.node],
    1: [_doc, _p1, 0, null, "ab"],
    2: [_doc, _p1, 1, "a", "b"],
    3: [_doc, _p1, 2, "ab", null],
    4: [_doc, 4, _p1.node, _blk.node],
    5: [_doc, _blk, 0, null, _p2.node],
    6: [_doc, _blk, _p2, 0, null, "cd"],
    7: [_doc, _blk, _p2, 1, "c", "d"],
    8: [_doc, _blk, _p2, 2, "cd", "ef"],
    9: [_doc, _blk, _p2, 3, "e", "f"],
    10: [_doc, _blk, _p2, 4, "ef", null],
    11: [_doc, _blk, 6, _p2.node, null],
    12: [_doc, 12, _blk.node, null]
  };

  for (var pos = 0; pos <= testDoc.content.size; pos++) {
    var $pos = testDoc.resolve(pos),
        exp = expected[pos];
    (0, _cmp.cmp)($pos.depth, exp.length - 4, pos + " depth");
    for (var i = 0; i < exp.length - 3; i++) {
      (0, _cmp.cmpNode)($pos.node(i), exp[i].node, pos + " " + i + " node");
      (0, _cmp.cmp)($pos.start(i), exp[i].start, pos + " " + i + " start");
      (0, _cmp.cmp)($pos.end(i), exp[i].end, pos + " " + i + " end");
      if (i) {
        (0, _cmp.cmp)($pos.before(i), exp[i].start - 1, pos + " " + i + " before");
        (0, _cmp.cmp)($pos.after(i), exp[i].end + 1, pos + " " + i + " end");
      }
    }
    (0, _cmp.cmp)($pos.parentOffset, exp[exp.length - 3], pos + " parentOffset");
    var before = $pos.nodeBefore,
        eBefore = exp[exp.length - 2];
    (0, _cmp.cmp)(typeof eBefore == "string" ? before.textContent : before, eBefore);
    var after = $pos.nodeAfter,
        eAfter = exp[exp.length - 1];
    (0, _cmp.cmp)(typeof eAfter == "string" ? after.textContent : after, eAfter);
  }
});