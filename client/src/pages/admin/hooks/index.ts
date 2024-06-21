export default function scrollToSection(id: any) {
  if (document.getElementById(id) !== null) {
    const divElement = document.getElementById(id);
    if (divElement !== null) {
      divElement.scrollIntoView({ behavior: "smooth" });
    }
  }
}
