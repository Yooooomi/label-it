
export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getTextColorFromCSSBackground(bg) {
  const hex = bg.substr(1);
  let r = hex.substr(0, 2);
  let g = hex.substr(2, 2);
  let b = hex.substr(4, 2);
  r = Number.parseInt(`0x${r}`);
  g = Number.parseInt(`0x${g}`);
  b = Number.parseInt(`0x${b}`);
  if (r + g + b < 370) {
    return 'white';
  }
  return 'black';
}
