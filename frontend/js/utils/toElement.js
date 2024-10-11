// function toElement(templateString) {
//   const template = document.createElement("template");
//   template.innerHTML = templateString.trim();
//   return template.content.firstChild;
// }

// export { toElement };
export function toElement(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstElementChild;
}
