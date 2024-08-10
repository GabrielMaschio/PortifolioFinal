// SCROLLING AND SLIDE

const slideShowEl = document.querySelectorAll(".nav-button");
const navLinksEl = document.querySelectorAll('a[href^="#"]');
const containerProjetosEl = document.querySelector('.container-projetos');
const ProjetosEl = document.querySelectorAll('.projeto');
const sections = document.querySelectorAll('.slides');

const handleSlideShow = (targetIndex) => {
    slideShowEl.forEach(option => {
        option.classList.remove("current")
    });
    
    slideShowEl[targetIndex].classList.add("current");
}

const handleScrolling = (targetIndex) => {
    sections[targetIndex].scrollIntoView({ behavior: 'auto' });
    handleSlideShow(targetIndex);
}

const checkScreenSection = () => {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
    
        let view = Array.from(sections).indexOf(section);
        if (rect.top == 0) {
            handleSlideShow(view);
        }    
    });
}

const checkArrow = (direction) => {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        var targetIndex;

        if (direction === 'up') {
            if (rect.top == 0) {
                targetIndex = Math.max(Array.from(sections).indexOf(section) - 1, 0);
                handleScrolling(targetIndex);
            }   
        } else if (direction === 'down') {
            if (rect.top == 0) {
                targetIndex = Math.min(Array.from(sections).indexOf(section) + 1, sections.length - 1);
                handleScrolling(targetIndex);
            }   
        }
    });
}

navLinksEl.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'auto'
        });
    });
});

sections.forEach(section => {

    section.addEventListener('wheel', function(event) {
        event.preventDefault(); // Impede o comportamento padrão de rolagem
        
        const deltaY = event.deltaY; // Obtém a direção da rolagem do mouse

        // Obtém a próxima ou anterior seção dependendo da direção da rolagem
        let targetIndex;
        if (deltaY > 0) {
            targetIndex = Math.min(Array.from(sections).indexOf(this) + 1, sections.length - 1);
        } else {
            targetIndex = Math.max(Array.from(sections).indexOf(this) - 1, 0);
        }

        handleScrolling(targetIndex);
    });
});

slideShowEl.forEach(option => {
    let targetIndex;

    option.addEventListener('click', () => {
        targetIndex = Math.min(Array.from(slideShowEl).indexOf(option));
        handleScrolling(targetIndex);
    })
})

window.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        checkArrow('up');
    } else if (event.key === 'ArrowDown') {
        checkArrow('down');
    }
});

document.addEventListener("scroll", () => {
    checkScreenSection();
})

checkScreenSection();

// Carrossel Projetos
const slides = document.querySelectorAll('.projeto-slide');
const carousel = document.querySelector('.carousel');
let slideIndex = 0;

function showSlides() {
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    carousel.style.transform = `translateX(-${slideIndex * 556}px)`;
}

function prevSlide() {
    if(slideIndex > 0) {
        slideIndex--;
        showSlides();
    }
}

function nextSlide() {
    if(slideIndex < (slides.length / 3) + 1){
        console.log(slideIndex)
        console.log((slides.length / 3))
        slideIndex++;
        showSlides();
    } else if(slideIndex > (slides.length / 3) - 1) {
        slideIndex = 0;
        showSlides();
        console.log("a")
    }
}

showSlides();


// TOGGLE THEME
const containerToggleTheme = document.getElementById("toggle-theme");
const imgTheme = document.querySelector("#toggle-theme img");
const profileHome = document.getElementById("profileHome");
const mediaLine = document.querySelector(".line");
const mediaGitHub = document.getElementById("mediaGitHub");
const mediaEmail = document.getElementById("mediaEmail");
const mediaLinkedin = document.getElementById("mediaLinkedin");
const imgHTML = document.getElementById("imgHTML");
const imgCSS = document.getElementById("imgCSS");
const imgJS = document.getElementById("imgJS");
const imgPHP = document.getElementById("imgPHP");

let theme = 1;

containerToggleTheme.addEventListener("click", () => {
    document.querySelector("html").classList.toggle("dark-mode");

    if(theme) {
        theme = 0;
        imgTheme.src = "./imagens/moon.png";
        imgTheme.style.translate = "40px";
        imgTheme.classList.remove("sol");
        imgTheme.classList.add("lua");

        imgHTML.src = "./imagens/d_html.png";
        imgCSS.src = "./imagens/d_css.png";
        imgJS.src = "./imagens/d_js.png";
        imgPHP.src = "./imagens/d_php.png";
        mediaLine.src = "./imagens/media_line_dark.png";
        mediaGitHub.src = "./imagens/media_github_dark.png";
        mediaEmail.src = "./imagens/media_email_dark.png";
        mediaLinkedin.src = "./imagens/media_linkedin_dark.png";
    } else {
        theme = 1;
        imgTheme.src = "./imagens/sun.png";
        imgTheme.style.translate = "0";
        imgTheme.classList.remove("lua");
        imgTheme.classList.add("sol");

        imgHTML.src = "./imagens/l_html.png";
        imgCSS.src = "./imagens/l_css.png";
        imgJS.src = "./imagens/l_js.png";
        imgPHP.src = "./imagens/l_php.png";
        mediaLine.src = "./imagens/media_line_light.png";
        mediaGitHub.src = "./imagens/media_github_light.png";
        mediaEmail.src = "./imagens/media_email_light.png";
        mediaLinkedin.src = "./imagens/media_linkedin_light.png";
    }
}); 

function copyText(elemento) {
    navigator.clipboard.writeText("gabrielribeiromaschio@hotmail.com");

    const copiedMessage = document.getElementById(elemento);
    copiedMessage.style.display = "inline";
    copiedMessage.style.opacity = 1;

    setTimeout(() => {
        copiedMessage.style.opacity = 0;
        setTimeout(() => {
            copiedMessage.style.display = "none";
        }, 500);
    }, 2000);
}