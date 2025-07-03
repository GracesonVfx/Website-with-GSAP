gsap.registerPlugin(ScrollTrigger);

// Wait until everything (images, fonts, css) is fully loaded
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const main = document.getElementById("main");

  preloader.style.opacity = 0;

  // Then hide it completely
  setTimeout(() => {
    preloader.style.display = "none";
    ScrollTrigger.refresh();
  }, 500);
});

gsap.set(".card", {
  y: 0,
  rotation: 0,
  opacity: 0,
});

gsap.to(".card", {
  y: 0,
  opacity: 1,
  rotation: (i) => -10 * (i + 1),
  delay: 1,
  duration: 0.5,
  ease: "power2.out",
  stagger: 0.2,
  onComplete: scrollTriggerAnim,
});

function scrollTriggerAnim() {
  const tl = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      pin: true,
      trigger: "#main",
      start: "top top",
      end: "+=500", // gives enough scroll space
      // end: "+=" + window.innerHeight * 2,
      // markers: true,
    },
  });

  document.querySelectorAll(".card").forEach((card, index) => {
    tl.to(
      card,
      {
        y: -window.innerHeight * 1.5,
        rotate: 20,
        duration: 1,
        ease: "power2.inOut",
      },
      index * 0.3
    );
  });
}

gsap.utils.toArray(".pop h1").forEach((el, i) => {
  gsap.to(el, {
    y: 0,
    duration: 0.5,
    ease: Power2.easeOut,
    scrollTrigger: {
      trigger: el,
      start: "top 50%",
      end: "top 50%",
      scrub: true,
      // markers: true, // remove in production
      // onComplete: () => {
      //   setTimeout(() => {
      //     chalado(), 2000;
      //   });
      // },
    },
  });
});

const chalado = (elem) => {
  gsap.to(elem, {
    x: "-=100%",
    duration: 1,
    ease: "power4.out",
  });
};

// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on("scroll", ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// / Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

const swiper1 = new Swiper(".swip1", {
  direction: "vertical",
  loop: true,
  slidesPerView: 2.4,
  spaceBetween: 30,
  speed: 1000,
  freeMode: true,
  autoplay: {
    delay: 500,
    disableOnInteraction: false,
  },
  // pagination: {
  //   el: ".swiper-pagination",
  // },
});

setTimeout(() => {
  const swiper2 = new Swiper(".swip2", {
    direction: "vertical",
    loop: true,
    slidesPerView: 2.4,
    spaceBetween: 30,
    freeMode: true,
    speed: 1000,
    autoplay: {
      delay: 500,
      disableOnInteraction: false,
      reverseDirection: true,
    },
    initialSlide: 0.5,
    // pagination: {
    //   el: ".swiper-pagination",
    // },
  });
}, 750);
