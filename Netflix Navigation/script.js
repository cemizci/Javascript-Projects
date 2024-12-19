const openBtn = document.querySelector('.open-btn')
const closeBtn = document.querySelector('.close-btn')
const nav = document.querySelectorAll('.nav')

runEvents();

function runEvents() {
    openBtn.addEventListener('click',openNav)
    closeBtn.addEventListener('click',closeNav)
}

function openNav() {
    nav.forEach(i => i.classList.add('visible'))
}

function closeNav() {
    nav.forEach(i => i.classList.remove('visible'))
}