import { lock, unlock } from 'tua-body-scroll-lock'

const scrollIntoView = require('scroll-into-view');


const initFixedHeader = () => {
  const header = document.querySelector('.header');
  const headerHeight = header.scrollHeight;

  document.addEventListener('scroll', () => {
    if (window.pageYOffset > headerHeight) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  });
};

const burgerButton = document.querySelector('[data-js-burger-btn]');
const mobileMenu = document.querySelector('[data-js-mobile-menu]');

const openBurger = () => {
  bodyLock();
  burgerButton.classList.add('opened');
  burgerButton.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.add('opened');
}

const closeBurger = () => {
  bodyUnlock();
  burgerButton.classList.remove('opened');
  burgerButton.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('opened');
}

const initBurgerButton = () => {
  const isBurgerButtonOpen = () => burgerButton.classList.contains('opened');

  burgerButton.addEventListener('click', () => {
    if (isBurgerButtonOpen()) {
      closeBurger();
    } else {
      openBurger();
    }
  });
};

const initCloseModal = () => {
  document.addEventListener('click', e => {
    if (e.target.closest('.modal__close-btn') || !e.target.closest('.modal__inner')) {
      const openModal = document.querySelector('.modal.opened');

      if (openModal !== null) {
        openModal.classList.remove('opened');
        bodyUnlock();
      }
    }
  });
};

const openModal = modalId => {
  document.querySelector(`#${modalId}`).classList.add('opened');
  bodyLock();
};

const bodyLock = () => {
  const defaultScrollingElements = Array.from(document.querySelectorAll('[data-js-default-scrolling]'));

  lock(defaultScrollingElements);
  // document.body.classList.add('lock');
};

const bodyUnlock = () => {
  const defaultScrollingElements = Array.from(document.querySelectorAll('[data-js-default-scrolling]'));

  unlock(defaultScrollingElements);
  // document.body.classList.remove('lock');
};

const isElemInViewport = elem => {
  const distance = elem.getBoundingClientRect();
  const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
  const vertInView = (distance.top <= windowHeight) && ((distance.top + distance.height) >= 0);
  const horInView = (distance.left <= windowWidth) && ((distance.left + distance.width) >= 0);

  return (vertInView && horInView);
};

const initScrollingElements = () => {
  const scrollingElements = document.querySelectorAll('.scroll-effect');

  window.addEventListener('scroll', function(event) {
    scrollingElements.forEach(element => {
      if (isElemInViewport(element)) {
        element.classList.add('scroll-effect--visible');
      }
    });
  }, false);
};

const initTranslateOnMousemove = (element, scene, hoveredSpace) => {
  const sceneRadius = scene.offsetWidth / 2;
  const boxRadius = element.offsetWidth / 2;
  const maxTranslate = sceneRadius - boxRadius;

  hoveredSpace.addEventListener('mousemove', e => {
    const center = {
      x: scene.offsetLeft  + scene.offsetWidth / 2,
      y: scene.offsetTop  + scene.offsetHeight / 2
    };
    const mouseCoords = {
      x: e.screenX - center.x,
      y: e.screenY - center.y,
    };

    const translateDistance = Math.sqrt(
      mouseCoords.x * mouseCoords.x + mouseCoords.y * mouseCoords.y);

    let translate;

    if (translateDistance <= maxTranslate) {
      translate = `translate(${mouseCoords.x}px, ${mouseCoords.y}px)`;
    } else {
      // Нормализуем вектор смещения
      const normalizeCoords = {
        x: mouseCoords.x / translateDistance,
        y: mouseCoords.y / translateDistance,
      };

      const finalCoords = {
        x: normalizeCoords.x * maxTranslate,
        y: normalizeCoords.y * maxTranslate,
      };

      translate = `translate(${finalCoords.x}px, ${finalCoords.y}px)`;
    }

    element.style.transform = translate;
  });
};

const initHeroTranslateOnMousemove = () => {
  const hoveredSpace = document.querySelector('.hero');
  const movingElements = document.querySelectorAll('.hero__icon-content');

  movingElements.forEach(element => {
    const scene = element.closest('.hero__icon-wrapper');

    initTranslateOnMousemove(element, scene, hoveredSpace);
  })
};

const initStartTranslateOnMousemove = () => {
  const movingElements = document.querySelectorAll('.start__icon-content');

  movingElements.forEach((element, index) => {
    const hoveredSpace = document.querySelectorAll('.start__body li')[index];
    const scene = element.closest('.start__icon-wrapper');

    initTranslateOnMousemove(element, scene, hoveredSpace);
  });
};

const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

const getNodeIndex = node => {
  let index = 0;

  while (node = node.previousSibling) {
    if (node.nodeType != 3 || !/^\s*$/.test(node.data)) {
      index++;
    }
  }

  return index;
};

const initHeroMobileOffset = () => {
  if (isMobile()) {
    const heroSlogan = document.querySelector('.hero__slogan');
    const heroImages = document.querySelector('.hero__images');
    const heroImagesHeight = heroImages.offsetHeight;
    const heroSloganOffsetY = heroSlogan.offsetTop + heroSlogan.offsetHeight;

    heroSlogan.setAttribute('style', `--heroImagesHeight: ${heroImagesHeight}px`);
    heroImages.setAttribute('style', `--heroSloganOffsetY: ${heroSloganOffsetY}px`);
  }
};

const getSiblings = node => {
  let siblings = [];

  if (!node.parentNode) {
    return siblings;
  }

  let sibling  = node.parentNode.firstChild;

  // collecting siblings
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== node) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

const initTabs = () => {
  const tabsButtons = document.querySelectorAll('[data-js-tabs-btn]');

  const handleTabsButtonClick = e => {
    const clickedTabsBtn = e.target;
    const tabsContentWrapper = clickedTabsBtn.closest('[data-js-tabs]').querySelector('[data-js-tabs-content-wrapper]')

    const tabIndex = getNodeIndex(clickedTabsBtn);
    const siblingTabsButtons = getSiblings(clickedTabsBtn);

    const TabsContent = clickedTabsBtn.closest('[data-js-tabs]').querySelectorAll('[data-js-tabs-content]')[tabIndex];
    const siblingTabsContent = getSiblings(TabsContent);

    clickedTabsBtn.classList.add('active');
    TabsContent.classList.add('active');

    siblingTabsButtons.forEach(tabsBtn => tabsBtn.classList.remove('active'));
    siblingTabsContent.forEach(tabsContent => tabsContent.classList.remove('active'));

    tabsContentWrapper.setAttribute('style', `--tabsOffset: -${tabIndex}00%`);
  };

  tabsButtons.forEach(tabsButton => tabsButton.addEventListener('click', e => handleTabsButtonClick(e)));
};

const initAccordion = () => {
  const accordionButtons = document.querySelectorAll('[data-js-accordion-btn]');
  const accordionContents = document.querySelectorAll('[data-js-accordion-content]');

  const isActive = el => el.classList.contains('active');

  const handleAccordionBtnClick = e => {
    const clickedAccordionBtn = e.target;
    const siblingsContent = e.target.nextElementSibling;
    const siblingsContentHeight = window.getComputedStyle(siblingsContent).getPropertyValue('height');

    if (isActive(clickedAccordionBtn)) {
      clickedAccordionBtn.classList.remove('active');
    } else {
      clickedAccordionBtn.classList.add('active');
    }

    if (siblingsContentHeight === '0px') {
      siblingsContent.style.height = `${ siblingsContent.scrollHeight }px`
      siblingsContent.classList.add('active');
      scrollIntoView(siblingsContent, {
        align: {
          topOffset: 100
        },
      });
    } else {
      siblingsContent.style.height = `${ siblingsContent.scrollHeight }px`;
      siblingsContent.clientHeight;
      siblingsContent.style.height = '0';
      siblingsContent.classList.remove('active');
    }

    accordionButtons.forEach(accordionBtn => {
      if (clickedAccordionBtn !== accordionBtn) accordionBtn.classList.remove('active');
    });

    accordionContents.forEach(accordionContent => {
      if (siblingsContent !== accordionContent) {
        accordionContent.style.height = `${ accordionContent.scrollHeight }px`;
        accordionContent.clientHeight;
        accordionContent.style.height = '0';
        accordionContent.classList.remove('active');
      }
    });
  };

  accordionButtons.forEach(accordionBtn => accordionBtn.addEventListener('click', e => handleAccordionBtnClick(e)));
};

const initFilters = () => {
  const filtersButtons = document.querySelectorAll('[data-js-filters-btn]');
  const filtersContents = document.querySelectorAll('[data-js-filters-content]');

  const handleFiltersBtnClick = e => {
    const clickedBtn = e.target;
    const filtersButtons = getSiblings(clickedBtn);
    const markId = clickedBtn.dataset.markId;

    clickedBtn.classList.add('active');
    filtersButtons.forEach(filtersBtn => filtersBtn.classList.remove('active'));

    filtersContents.forEach(filtersContent => {
      if (markId === filtersContent.dataset.category || markId === 'all') {
        filtersContent.classList.add('active');
      } else {
        filtersContent.classList.remove('active');
      }
    });
  };

  filtersButtons.forEach(filtersBtn => filtersBtn.addEventListener('click', e => handleFiltersBtnClick(e)))
};

const initNavLinksBehavior = () => {
  const navLinks = document.querySelectorAll('.navigation__link');

  navLinks.forEach(navLink => {
    navLink.addEventListener('click', function (e) {
      const anchor = this.getAttribute('href');
      if (anchor.charAt(0) === '#') {
        const section = document.querySelector(anchor);

        e.preventDefault();
        scrollIntoView(section);
        closeBurger();
      }
    })
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('dom-is-ready');

  initNavLinksBehavior();
  initFixedHeader();
  initBurgerButton();
  initCloseModal();
  initScrollingElements();
  initHeroTranslateOnMousemove();
  initStartTranslateOnMousemove();
  initHeroMobileOffset();
  initTabs();
  initAccordion();
  initFilters();
});