function setup() {
  noCanvas();
  let text = "Hello/ there'; my friend!.";
  let text2 = removeChars(text, "/';!");
  text[1] = " ";
  log(text);
  log(text2);
}

function update() {
  // loop code
}
