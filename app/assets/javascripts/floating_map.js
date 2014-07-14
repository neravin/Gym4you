function offsetPosition(e) { // отступ от верхнего края экрана до элемента
  var offsetTop = 0;
  do {offsetTop  += e.offsetTop;} while (e = e.offsetParent);
  return offsetTop;
}
var divMap = document.getElementById('map'),
    OP = offsetPosition(divMap);
window.onscroll = function() {
  divMap.className = (OP < window.pageYOffset + 15 ? 'floating-map' : ''); // если значение прокрутки больше отступа от верхнего края экрана до элемента, то элементу присваивается класс floating-map
}

