export function toElement(htmlString) {
  const div = document.createElement("div"); // Create a new div element
  div.innerHTML = htmlString.trim(); // Set the innerHTML of the div to the HTML string
  return div.firstElementChild; // Return the first child of the div
}
