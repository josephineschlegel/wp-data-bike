window.addEventListener("load", setup);

function setup(){
    const h2 = document.querySelectorAll(".home main h2");
    if(h2) {
        h2.forEach(h2=>{
            h2.addEventListener("click", e=>{
               h2.classList.toggle("open"); h2.nextElementSibling.classList.toggle("open");
            })
        })
    }
}
