/* Shared deck helpers for the card games. */
var Cards = (function () {
  var RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  var NAMES = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
  var SUITS = ['S', 'H', 'D', 'C'];
  var SYM = { S: '♠︎', H: '♥︎', D: '♦︎', C: '♣︎' };
  var SNAME = { S: 'spades', H: 'hearts', D: 'diamonds', C: 'clubs' };

  function deck(n) {
    var d = [];
    for (var k = 0; k < (n || 1); k++) SUITS.forEach(function (s) { for (var r = 1; r <= 13; r++) d.push({ r: r, s: s }); });
    return d;
  }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function isRed(c) { return c.s === 'H' || c.s === 'D'; }
  function rank(c) { return RANKS[c.r - 1]; }
  function name(c) { return NAMES[c.r - 1] + ' of ' + SNAME[c.s]; }
  function short(c) { return RANKS[c.r - 1] + SYM[c.s]; }

  // Builds a card. Pass onClick to get a real button, cls for size or state classes.
  function el(c, o) {
    o = o || {};
    var node = document.createElement(o.onClick ? 'button' : 'div');
    if (o.onClick) { node.type = 'button'; node.addEventListener('click', function () { o.onClick(c, node); }); }
    node.className = 'pc' + (isRed(c) ? ' red' : '') + (o.cls ? ' ' + o.cls : '');
    node.setAttribute('aria-label', name(c));
    var r = rank(c), s = SYM[c.s];
    node.innerHTML = '<span class="c tl"><i>' + r + '</i><i>' + s + '</i></span><span class="c mid">' + s + '</span><span class="c br"><i>' + r + '</i><i>' + s + '</i></span>';
    return node;
  }
  function back(cls) {
    var n = document.createElement('div');
    n.className = 'pc back' + (cls ? ' ' + cls : '');
    n.setAttribute('aria-label', 'Face-down card');
    return n;
  }
  return { RANKS: RANKS, SUITS: SUITS, SYM: SYM, SNAME: SNAME, deck: deck, shuffle: shuffle, isRed: isRed, rank: rank, name: name, short: short, el: el, back: back };
})();
