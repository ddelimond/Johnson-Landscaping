// Menu Toggle
let linkContainer = document.querySelector('.link-container');
let links = document.querySelector('.links');
let menuButton = document.querySelector('.hamburger');

menuButton.addEventListener('click', showLinks)

function showLinks() {

    let containerHeight = linkContainer.getBoundingClientRect().height;
    let linkHeight = links.getBoundingClientRect().height

    if (containerHeight === 0) { linkContainer.style.height = `${linkHeight}px` } else { linkContainer.style.height = '0px' }
}