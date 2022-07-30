
let date = document.querySelector('.date');
let header = document.querySelector('header');
let scrollLinks = document.querySelectorAll('.scroll-link')


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

        if (!fixedNav) {
            sectionPosition = sectionPosition - navHeight
        }

        if (navHeight > 95) { sectionPosition = sectionPosition + linkHeight }



        window.scrollTo(0, sectionPosition)

        linkContainer.style.height = '0px'
    })
})



// Modal

// get selector and checks to makesure that it is an element

function getElement(selector) {
    let element = document.querySelector(selector);
    if (element) { return element }
    else { throw Error(`Plese check your selector ${selector}, the element does not exist`) }
}

function Gallery(element) {
    this.container = element;
    this.clientSectionImages = [...element.querySelectorAll('.image')];
    this.modal = getElement('.modal-overlay');
    this.mainModalImage = getElement('.main-image');
    this.modalBottom = getElement('.modal-bottom');
    this.listOfModalImages = this.modal.querySelectorAll('.modal-image');
    this.closeBtn = getElement('.close-btn');
    this.prevBtn = getElement('.prev-btn');
    this.nextBtn = getElement('.next-btn');
    this.container.addEventListener('click', function (e) {
        let selectedImage = e.target;
        this.open(selectedImage, this.clientSectionImages);
    }.bind(this))

}

Gallery.prototype.open = function (image, list) {
    this.modal.classList.add('open');
    this.mainModalImage.src = image.src



    this.mainModalImage.dataset.id = image.dataset.id
    this.modalBottom.innerHTML = list.map(function (image) {
        return `
<img src="${image.src}" data-id="${image.dataset.id}" class="${image.dataset.id === this.mainModalImage.dataset.id ? "modal-image selected" : "modal-image"}">
`
    }.bind(this)).join('')

    this.closeBtn.addEventListener('click', this.close.bind(this))
    this.prevBtn.addEventListener('click', this.prev.bind(this))
    this.nextBtn.addEventListener('click', this.next.bind(this))
    this.modalBottom.addEventListener('click', function (e) {
        let selected = e.target;
        this.clickOnModalImage(selected)
    }.bind(this))
}

Gallery.prototype.close = function () {
    this.modal.classList.remove('open');
    this.closeBtn.removeEventListener('click', this.close.bind(this));
    this.prevBtn.removeEventListener('click', this.prev.bind(this));
    this.nextBtn.removeEventListener('click', this.next.bind(this));
}

Gallery.prototype.next = function () {
    const selectedImage = document.querySelector('.selected');
    const next = document.querySelector('.selected').nextElementSibling || this.modalBottom.firstElementChild;
    selectedImage.classList.remove('selected');
    next.classList.add('selected');
    this.mainModalImage.src = next.src;
}
Gallery.prototype.prev = function () {
    const selectedImage = document.querySelector('.selected');
    const prev = document.querySelector('.selected').previousElementSibling || this.modalBottom.lastElementChild;
    selectedImage.classList.remove('selected');
    prev.classList.add('selected');
    this.mainModalImage.src = prev.src;
}

Gallery.prototype.clickOnModalImage = function (image) {
    const selectedImage = image;
    const prevSelectedImage = document.querySelector('.selected');
    prevSelectedImage.classList.remove('selected');
    selectedImage.classList.add('selected');
    this.mainModalImage.src = selectedImage.src;
}







let clientImageContainer = new Gallery(getElement('.client-container'))

