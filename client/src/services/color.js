
export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getTextColorFromCSSBackground(bg) {
  const hex = bg.substr(1);
  let r = hex.substr(0, 2);
  let g = hex.substr(2, 2);
  let b = hex.substr(4, 2);
  r = Number.parseInt(`${r}`, 16);
  g = Number.parseInt(`${g}`, 16);
  b = Number.parseInt(`${b}`, 16);
  if (r + g + b < 370) {
    return 'white';
  }
  return 'black';
}
