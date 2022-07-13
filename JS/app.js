
// Variables
let clientImages = [
    { img: "/Assets/Past Jobs/House-2.jpeg" },
    { img: "/Assets/Past Jobs/House-3.jpeg" },
    { img: "/Assets/Past Jobs/Garden-1.jpeg" },
    { img: "/Assets/Past Jobs/garden-2.jpeg" },
    { img: "/Assets/Past Jobs/House-1-Side.jpeg" },
    { img: "/Assets/Past Jobs/House-1.jpeg" }
]
let clientImage = document.querySelector('.image');
let numOfClientImages = clientImages.length;
let indexOfLastClientImage = clientImages.length - 1;
let lastClientImage = clientImages[clientImages.length - 1];
let prevButton = document.querySelector('.left-btn');
let nextButton = document.querySelector('.right-btn');
let intialIndex = 0;
let date = document.querySelector('.date');
let header = document.querySelector('header');
let scrollLinks = document.querySelectorAll('.scroll-link')

// Button Functionality

let next = function () {
    if (intialIndex === 0) { intialIndex++; showClient(intialIndex) }
    else if (intialIndex < indexOfLastClientImage) { intialIndex++; showClient(intialIndex) }
    else if (intialIndex === indexOfLastClientImage) { intialIndex = 0; showClient(intialIndex) }
}
let prev = function () {
    if (intialIndex === 0) { intialIndex = indexOfLastClientImage; showClient(intialIndex) }
    else if (intialIndex > 0) { intialIndex--; showClient(intialIndex) }
}
nextButton.addEventListener('click', next);
prevButton.addEventListener('click', prev);

// Load Client Photos
window.addEventListener('DOMContentLoaded', function () {
    showClient(intialIndex);
})


function showClient(index) {
    let imgSource = clientImages[index];
    clientImage.src = imgSource.img;
}

// Dynamic Copyright Date

date.innerHTML = new Date().getFullYear();

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


// Dynamic Scroll 

window.addEventListener('scroll', fixHeader)


function fixHeader() {
    if (window.pageYOffset > 70) { header.classList.add('scroll') } else {
        header.classList.remove('scroll')
    }
}

// Smooth Scroll

scrollLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {

        e.preventDefault();
        let id = e.currentTarget.getAttribute('href').split('');

        id = id.slice(1, id.length).join('');


        let navHeight = document.querySelector('header').getBoundingClientRect().height;
        let sectionPosition = document.getElementById(`${id}`).offsetTop - navHeight;
        let linkHeight = links.getBoundingClientRect().height;
        let fixedNav = header.classList.contains('scroll');

        // if (header.classList.contains('scroll')) { window.scrollTo(0, Number(`${sectionPosition}`) - Number(document.querySelector('.logo-container').getBoundingClientRect().height)) }

        if (!fixedNav) {
            sectionPosition = sectionPosition - navHeight
        }

        if (navHeight > 95) { sectionPosition = sectionPosition + linkHeight }



        window.scrollTo(0, sectionPosition)

        linkContainer.style.height = '0px';
    })
})





