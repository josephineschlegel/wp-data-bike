window.addEventListener("load", setup);
const endpoint = "http://schlegelj.com/wordpress2/wp-json/wp/v2/";

function setup() {
    setupBurgerNav();
    getCategories();


}

function setupAccordion() {
    const h2s = document.querySelectorAll(".home main h2");
    if (h2s) {
        h2s.forEach(h2 => {
            h2.addEventListener("click", e => {
                h2.classList.toggle("open");
                h2.nextElementSibling.classList.toggle("open");
            });
        });
    }
}

function setupBurgerNav() {
    const burger = document.querySelector("header svg");
    const nav = document.querySelector("nav");
    burger.addEventListener("click", e => {
        burger.classList.toggle("open");
        nav.classList.toggle("open");
    });
}

function getCategories() {
    fetch(endpoint + "categories?parent=3&_fields=name")
        .then(res => res.json())
        .then(setupCategories);

}

function getTheBikes() {
    fetch("http://schlegelj.com/wordpress2/wp-json/wp/v2/bike?per_page=100&_embed")
        .then(res => res.json())
        .then(setupBikes)
}

function setupBikes(bikeArray) {
    console.log(bikeArray);
    const template = document.querySelector("template#biketemplate").content;

    const parentElement = document.querySelector(".home main section");
    bikeArray.forEach(bike => {
        const copy = template.cloneNode(true);
        copy.querySelector("img").src=bike._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
        copy.querySelector("h3").textContent=`${bike.title.rendered}[${bike.price}]`
        parentElement.appendChild(copy);
    });
    document.querySelector("main h2").classList.add("open");
    document.querySelector("main section.collapsible").classList.add("open");
    setupAccordion();
}

function setupCategories(catArray) {
    const template = document.querySelector("template").content;

    const parentElement = document.querySelector("main");
    catArray.forEach(cat => {
        const copy = template.cloneNode(true);
        copy.querySelector("h2").textContent = cat.name;
        parentElement.appendChild(copy);
    });
    document.querySelector("main h2").classList.add("open");
    document.querySelector("main section.collapsible").classList.add("open");
    setupAccordion();
    getTheBikes();
}
