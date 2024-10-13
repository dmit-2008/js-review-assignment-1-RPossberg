// function toElement(template) {
//   // const template = document.createElement("template");
//   // template.innerHTML = templateString.trim();
//   return document.createRange().createContextualFragment(template).children[0];
// }

// export { toElement };

// export { toElement };
export function toElement(htmlString) {
  const div = document.createElement("div"); // Create a new div element
  div.innerHTML = htmlString.trim(); // Set the innerHTML of the div to the HTML string
  return div.firstElementChild; // Return the first child of the div
}
