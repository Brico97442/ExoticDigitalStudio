// animation.js
import gsap from "gsap";

export const animatePageIn = () => {
  const bannerOne = document.getElementById('banner-1');
  const bannerTwo = document.getElementById('banner-2');
  const bannerThree = document.getElementById('banner-3');
  const bannerFour = document.getElementById('banner-4');
  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline();
    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0,
      duration: 1,
      ease: "power4.inOut",
      zIndex: 209,
      delay: 1,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: -100,
      ease: "power4.inOut",
      zIndex: 209,
      delay: 1,
    });
  }
};

export const animatePageOut = (href, router) => {

  const bannerOne = document.getElementById('banner-1');
  const bannerTwo = document.getElementById('banner-2');
  const bannerThree = document.getElementById('banner-3');
  const bannerFour = document.getElementById('banner-4');
  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline();

    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 100,
      duration: 1,
      ease: "power4.inOut",
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0,
      duration: 1,
      ease: "power4.inOut",
      stagger: 0.2,
      scrub: 1,
      onComplete: () => {
        router.push(href);
      },
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 100,
      duration: 1,
      delay: 1,
      scrub: 1,
      ease: "power4.inOut",
    });
  }
};
