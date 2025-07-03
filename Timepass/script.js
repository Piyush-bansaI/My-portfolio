const nav = document.querySelector(".navbar");

window.addEventListener('scroll', () => {
    if (scrollY > 10 ) {
        nav.classList.add("color-change");
    }
    else {
        nav.classList.remove("color-change");
    }
});

//theme 
const themes = document.querySelectorAll(".themes")
    const lightthemes = document.querySelectorAll(".light");
    const darkthemes = document.querySelectorAll(".dark");
    const changedtheme = localStorage.getItem("themes");

    function lightcolors() {
        document.documentElement.style.setProperty("--primary--color", "#f0f0f0")
        document.documentElement.style.setProperty("--secondary--color", "#121212")
        document.documentElement.style.setProperty("--menu--clr--", "#121212a1")
        document.documentElement.style.setProperty("--line--clr", "#f0f0f03b")
        document.documentElement.style.setProperty("--footer--clr", "#212121")
        document.documentElement.style.setProperty("--not--imp--clr", "#f0f0f04f")
    }
    function darkcolors() {
        document.documentElement.style.setProperty("--primary--color", "#121212")
        document.documentElement.style.setProperty("--secondary--color", "#f0f0f0")
        document.documentElement.style.setProperty("--menu--clr--", "#f0f0f03b")
        document.documentElement.style.setProperty("--line--clr", "#121212a1")
        document.documentElement.style.setProperty("--footer--clr", "#d9d9d9")
        document.documentElement.style.setProperty("--not--imp--clr", "#5c5c5c67")
    }

    if (changedtheme === "dark") {
        lightthemes.forEach((lighttheme) => lighttheme.classList.add("inactive"));
        darkthemes.forEach((darktheme) => darktheme.classList.add("active"));
        themes.forEach((theme) => theme.classList.add("active"))
        darkcolors()
    } else {
        lightthemes.forEach((lighttheme) => lighttheme.classList.remove("inactive"));
        darkthemes.forEach((darktheme) => darktheme.classList.remove("active"));
        themes.forEach((theme) => theme.classList.remove("active"))
        lightcolors()
    }

themes.forEach((theme) => {

    theme.addEventListener('click', () => {
        lightthemes.forEach((lighttheme) => {
        lighttheme.classList.toggle("inactive");
        });
        darkthemes.forEach((darktheme) => {
        darktheme.classList.toggle("active");
        });
       const isDark = theme.classList.toggle("active");

        if (isDark) {
            localStorage.setItem("themes", "dark")
            darkcolors()
        } else {
            localStorage.setItem("themes", "light")
            lightcolors()
        }
    });
});

// login

const openbtn = document.querySelectorAll(".openbtn");
const closebtn = document.getElementById("closebtn");
const loginPage = document.querySelector(".login-page");
const loginback = document.querySelector(".login-back")

openbtn.forEach((login) => {
    login.addEventListener('click', () => {
        loginPage.classList.add("active")
    })
});

closebtn.addEventListener('click', () => {
        loginPage.classList.remove("active")
});

loginback.addEventListener('click', () => {
        loginPage.classList.remove("active")
});


const showPass = document.getElementById("show-pass");
const hidePass = document.getElementById("hide-pass");
let pass = document.getElementById("password");

showPass.addEventListener('click', () => {
    pass.type = `text`;
    showPass.classList.add("inactive");
    hidePass.classList.add("active");
});

hidePass.addEventListener('click', () => {
    pass.type = `password`;
    showPass.classList.remove("inactive");
    hidePass.classList.remove("active");
});

usernamefloat(document.getElementById("name"));

function usernamefloat(username) {

username.addEventListener('input', () => {
    if (username.value.trim() !== "") {
        username.classList.add('filled')
    } else {
        username.classList.remove('filled')
    }
});
username.addEventListener('blur', () => {
    if (username.value.trim() === "") {
        username.classList.remove("filled");
    }
});
};

mailfloat(document.getElementById("mail"))

function mailfloat(mail) {
    mail.addEventListener('input', () => {
        if (mail.value.trim() !== "") {
            mail.classList.add("filled")
        } else {
            mail.classList.remove("filled")
        }
    });
    mail.addEventListener('blur', () => {
        if (mail.value.trim() === "") {
            mail.classList.remove("filled")
        }
    });
};

passwordfloat(document.getElementById("password"));

function passwordfloat(password) {
password.addEventListener('input', () => {
    if (password.value.trim() !== "") {
        password.classList.add("filled")
    } else {
        password.classList.remove("filled")
    }
});
password.addEventListener('blur', () => {
    if (password.value.trim() === "") {
        password.classList.remove("filled")
    }
});
};

const username = document.getElementById("name");
const email = document.getElementById("mail");
const password = document.getElementById("password");
const errMessage = document.getElementById("message");
const form = document.getElementById("form")

form.addEventListener('submit', (e) => {

    function showMessage(text) {
        clearTimeout (errMessage);
        errMessage.textContent = text;
        errMessage.style.color = `red`;
        errMessage.classList.add("active");
        errMessage = setTimeout(() => {
            errMessage.classList.remove("active");
        }, 5000);
    };

    if (username.value.trim() === "" && email.value.trim() === "" && password.value.trim() === "" ) {
        e.preventDefault();
        showMessage(`please enter the information before proceeding`)
        return;
    }

    if (username.value.trim() === "" || username.value.trim() === null) {
        e.preventDefault();
        showMessage(`Please enter a valid username`)
        return;
    }
    if (email.value.trim() === "" || !email.value.trim().includes('@') || !email.value.trim().includes('.') ) {
        e.preventDefault();
        showMessage("Please enter a valid E-mail")
        return;
    }
    if (password.value.trim().length <= 6 ) {
        e.preventDefault();
        showMessage(`the password is too short`);
        return;
    }
    if (!/[A-Z]/.test(password.value)) {
        e.preventDefault();
        showMessage(`the password must contain an uppercase letter`);
        return;
    }
    if (!/[1-9]/.test(password.value)) {
        e.preventDefault();
        showMessage("the passowrd must contain a numbers")
        return;
    }
    if (!/[!@#$%^&*]/.test(password.value)) {
        e.preventDefault();
        showMessage(`the password must contain a special charcter`)
        return;
    }
});

// slider

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const next = document.getElementById("nextbtn");
const prev = document.getElementById("prevbtn");

slides.forEach(
    (slide, index) => {
        slide.style.left = `${index * 100}%` 
    }
)

function moreSlider() {
    slides.forEach(
        (slide) => {
            slide.style.transform = `translateX(-${currentSlide * 100}%)`
        }
    )
};


next.addEventListener('click', () => {
    currentSlide++
    if (currentSlide >= slides.length) {
        currentSlide = 0
    }
    moreSlider()
})

prev.addEventListener('click', () => {
    if (currentSlide == 0) {
        return
    }
    currentSlide--
    moreSlider()
})

let autoplay;

function start() {
autoplay = setInterval(
    () => {
        currentSlide++
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        moreSlider()
    }
, 10000);
}

const background = document.querySelectorAll(".slide-backs")

background.forEach((bg) => {
    bg.addEventListener('mouseover', () => {
        clearInterval(autoplay);
    });
    bg.addEventListener('mouseleave', () => {
        start();
    });
});
start();

const more = document.getElementById("more");
const moreinfo = document.getElementById("more-links");

more.addEventListener('mouseover', () => {
    moreinfo.classList.add("show");
});
more.addEventListener('click', () => {
        moreinfo.classList.toggle("show");
});
moreinfo.addEventListener('mouseover', () => {
    moreinfo.classList.add("show");
});
more.addEventListener('mouseout', () => {
    moreinfo.classList.remove("show");
});
moreinfo.addEventListener('mouseout', () => {
    moreinfo.classList.remove("show");
});

const openmenu = document.getElementById("open-menu");
const menu = document.getElementById("navbar-mobile");
const closemenu = document.getElementById("close-menu");

openmenu.addEventListener('click', () => {
    menu.classList.add("show");
});
closemenu.addEventListener('click', () => {
    menu.classList.remove("show");
});

const moreSlide = document.querySelectorAll(".swiper-slide");

moreSlide.forEach((slidebar) => {
    const video = slidebar.querySelector(".videos");

    slidebar.addEventListener('mouseenter', () => {
        video.play();
    });
    slidebar.addEventListener('mouseleave', () => {
        video.pause();
    });
    
});

new Swiper('.project-swiper', {
    loop: true,
    spaceBetween: 30,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
breakpoints: {
    0: {
        slidesPerView: 1,
    }, 
    768: {
        slidesPerView: 2, 
    },
    1024: {
        slidesPerView: 3,
    },
    1700: {
        slidesPerView: 4,
    }}
});

const ytNav = document.getElementById("yt-nav-container");
const yt = document.getElementById("media-1");

yt.addEventListener('mouseover', () => {
    ytNav.classList.add("active");
})
yt.addEventListener('mouseleave', () => {
    ytNav.classList.remove("active");
})

const instaNav = document.getElementById("insta-nav-container");
const insta = document.getElementById("media-2")

insta.addEventListener('mouseover', () => {
    instaNav.classList.add("active");
});
insta.addEventListener('mouseleave', () => {
    instaNav.classList.remove("active");
});
const discoNav = document.getElementById("disco-nav-container");
const disco = document.getElementById("media-3")

disco.addEventListener('mouseover', () => {
    discoNav.classList.add("active");
});
disco.addEventListener('mouseleave', () => {
    discoNav.classList.remove("active");
});
const redditNav = document.getElementById("reddit-nav-container");
const reddit = document.getElementById("media-4")

reddit.addEventListener('mouseover', () => {
    redditNav.classList.add("active");
});
reddit.addEventListener('mouseleave', () => {
    redditNav.classList.remove("active");
});