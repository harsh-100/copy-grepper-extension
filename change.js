let answerContainers = document.querySelectorAll(".commando_code_block_outer");
const myStyles = document.createElement("style");

myStyles.innerHTML =
  "<style>.custom_copy_button{background-color: red}</style>";

document.querySelector("head").appendChild(myStyles);

let buttonDefaultString = `<button ___ style="position:absolute; right: 0; z-index: 1000;">Copy</button>`;

function selectText(el) {
  clearSelection();

  var sel, range;

  if (window.getSelection && document.createRange) {
    //Browser compatibility
    sel = window.getSelection();
    if (sel.toString() == "") {
      //no text selection
      window.setTimeout(function () {
        range = document.createRange(); //range object
        range.selectNodeContents(el); //sets Range
        sel.removeAllRanges(); //remove all ranges from selection
        sel.addRange(range); //add Range to a Selection.
      }, 1);
    }
  } else if (document.selection) {
    //older ie
    sel = document.selection.createRange();

    if (sel.text == "") {
      //no text selection
      range = document.body.createTextRange(); //Creates TextRange object
      range.moveToElementText(el); //sets Range
      range.select(); //make selection.
    }
  }
}

function clearSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
}

answerContainers.forEach((answerContainer, index) => {
  const buttonId = `custom-copy-button-${index}`;
  const existingHtml = answerContainer.innerHTML;
  const buttonToAdd = [
    buttonDefaultString.split("___")[0] + `id="${buttonId}"`,
    buttonDefaultString.split("___")[1],
  ].join("");

  answerContainer.innerHTML = buttonToAdd + existingHtml;

  const button = document.getElementById(buttonId);

  button.addEventListener("click", (e) => {
    const code = answerContainer.children[2].children[0].textContent;
    navigator.clipboard.writeText(code);
    selectText(answerContainer.children[2].children[0]);
  });
});
