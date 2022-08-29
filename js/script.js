(() => {
  const initSliders = () => {
    const heroSlider = new Swiper('.top-wrapper__slider', {
      speed: 10000,
      loop: true,
      effect: 'fade',
      allowTouchMove: false,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
      },
    });

    const gallerySlider = new Swiper('.slider-gallery__slider', {

      observer: true,
      observeParents: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
      speed: 800,
      ally: false,
      keyboard: true,

      pagination: {
        el: '.button-gallery__pagination',
        type: 'fraction',
      },

      navigation: {
        prevEl: '.button-gallery__btn-prev',
        nextEl: '.button-gallery__btn-next',
      },

      breakpoints: {
        610: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 38,
        },
        970: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 34,
        },
        1281: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50,
        },
      },
    });

    const doingSlider = new Swiper('.doing__slider', {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
      speed: 800,

      navigation: {
        prevEl: '.doing__prev',
        nextEl: '.doing__next',
      },

      pagination: {
        el: '.doing__swiper-pagination',
      },

      breakpoints: {
        511: {
          slidesPerView: 2,
          spaceBetween: 34,
        },
        971: {
          slidesPerView: 3,
          spaceBetween: 27,
        },
        1281: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }
    });

    const partnersSlider = new Swiper('.partners__slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 800,
      scrollbar: false,

      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },

      pagination: {
        el: '.partners__swiper-pagination',
      },

      breakpoints: {
        // 320: {
        //   slidesPerView: 1,
        //   spaceBetween: 10,

        // },
        610: {
          slidesPerView: 2,
          spaceBetween: 34,
        },
        1024: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 50,
        },
        1281: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50,
        },
      },

    });

  };
  initSliders();

  const defaultSelect = () => {
    const element = document.querySelector('.gallery-select');
    const choices = new Choices(element, {
      searchEnabled: false,
      shouldSort: false,
      itemSelectText: '',
    });
  };
  defaultSelect();

  const multiDefault = () => {
    const elements = document.querySelectorAll('.hero__select');
    elements.forEach(element => {
      const choices = new Choices(element, {
        searchEnabled: false,
      });
      let ariaLabel = element.getAttribute('aria-label');
      element.closest('.choices').setAttribute('aria-label', ariaLabel);
    })
  }
  setTabs('data-painter-btn', 'data-painter-content');

  const accordionInit = () => {
    const accordion = new Accordion(".js-accordion-container", {
      openOnInit: [0]
    })
  };
  accordionInit();

  ymaps.ready(initMap);

  function initMap() {
    const myMap = new ymaps.Map("map", {
      center: [55.75846806898367, 37.60108849999989],
      zoom: 14,
      controls: ['geolocationControl', 'zoomControl']
    }, {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlPosition: {
        top: "300px",
        right: "20px"
      },
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: {
        top: "200px",
        right: "20px"
      }
    });

    myMap.behaviors.disable('scrollZoom');
    myMap.container.fitToViewport();

    // Создание геообъекта с типом точка (метка).
    const myGeoObject = new ymaps.Placemark(
      [55.75846806898367, 37.60108849999989], {}, {
        iconLayout: "default#image",
        iconImageHref: "../img/myGeoObject.svg",
        iconImageSize: [20, 20],
        iconImageOffset: [-10, -10],
      }
    );

    myMap.geoObjects.add(myGeoObject);

  }

  const multiTippy = () => {
    tippy('.tooltip-btn', {
      theme: 'custom',
      maxWidth: 264,
    });


  };
  multiTippy();

  function initValidate() {
    const formInput = document.querySelector('.contacts-form');
    const telSelector = formInput.querySelector("input[type='tel']");
    const inputMask = new Inputmask('+7 (999)-999-99-99');
    const validation = new JustValidate('.contacts-form');

    inputMask.mask(telSelector);

    validation
      .addField('.form-name', [{
          rule: 'minLength',
          value: 2,
          errorMessage: 'Введите 2 и более символов',
        },
        {
          rule: 'maxLength',
          value: 30,
          errorMessage: 'Введите не более 30 символов',
        },
        {
          rule: 'customRegexp',
          value: /[А-Яа-яЁё]/,
          errorMessage: 'Недопустимый формат',
        },
      ])
      .addField('.form-tel', [{
          rule: 'required',
          errorMessage: 'Введите номер',
        },
        {
          rule: 'function',
          validator: function () {
            const phone = telSelector.inputmask.unmaskedvalue();
            return phone.length === 10
          },
          errorMessage: 'Укажите 11 цифр после +',
        },
      ]).onSuccess((event) => {
        console.log(event);
        let formData = new FormData(event.target);

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('отправлено');
            }
          }
        }
        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);

        event.target.reset();
      });
  }
  initValidate();

  (() => {
    const MOBILE_WIDTH = 970;

    function getWindowWidth() {
      return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
      );
    }

    function scrollToContent(link, isMobile) {
      if (isMobile && getWindowWidth() > MOBILE_WIDTH) {
        return;
      }

      const href = link.getAttribute('href').substring(1);
      const scrollTarget = document.getElementById(href);
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      console.log(elementPosition);

      window.scrollBy({
        top: elementPosition,
        behavior: 'smooth'
      });
    }

    document.querySelectorAll('.js-scroll-link').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        scrollToContent(this, true);
      });
    });
  })();

  class Popup {
    constructor(options) {
      let config = {
        isOpen: () => {},
        isClose: () => {},
      }

      this.options = Object.assign(config, options);
      this.popup = document.querySelector('.popup');
      this.speed = false;
      this.animation = false;
      this.isOpen = false;
      this.popupContainer = false;
      this.previousActiveElement = false;
      this.fixBlocks = document.querySelectorAll('.fix-block');
      this.focusElements = [
        'a[href]',
        'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
        'button:not([disabled]):not([aria-hidden])',
        'select:not([disabled]):not([aria-hidden])',
        'textarea:not([disabled]):not([aria-hidden])',
        'area[href]',
        'iframe',
        'object',
        'embed',
        '[contenteditable]',
        '[tabindex]:not([tabindex^="-"])'
      ];
      this.eventsPopup();
    }

    eventsPopup() {
      if (this.popup) {
        document.addEventListener("click", function (e) {
          const clickedElement = e.target.closest('[data-path]');
          if (clickedElement) {
            let target = clickedElement.dataset.path;
            let animation = clickedElement.dataset.animation;
            this._reOpen = false;
            this._nextContainer = false;
            let speed = clickedElement.dataset.speed;
            this.animation = animation ? animation : 'fade';
            this.speed = speed ? parseInt(speed) : 300;
            this.popupContainer = document.querySelector(`[data-target="${target}"]`);
            this.open();
            return;
          }
          if (e.target.closest('.popup__close')) {
            this.close();
            return;
          }
        }.bind(this));

        window.addEventListener("keydown", function (e) {
          if (e.keyCode == 27) {
            if (this.isOpen) {
              this.close();
            }
          }

          if (e.keyCode == 9 && this.isOpen) {
            this,
            focusCatch(e);
            return;
          }
        }.bind(this));

        document.addEventListener('click', function (e) {
          if (e.target.classList.contains('popup') && e.target.classList.contains("is-open")) {
            this.close();
          }
        }.bind(this));
      }
    }

    open(selector) {
      this.previousActiveElement = document.activeElement;
  
      this.popup.style.setProperty('--transition-time', `${this.speed / 1000}s`);
      this.popup.classList.add('is-open');
  
      document.body.style.scrollBehavior = 'auto';
      document.documentElement.style.scrollBehavior = 'auto';
  
      this.disableScroll();
  
      this.popupContainer.classList.add('popup__open');
      this.popupContainer.classList.add(this.animation);
  
      setTimeout(() => {
        this.options.isOpen(this);
        this.popupContainer.classList.add('animate-open');
        this.isOpen = true;
        this.focusTrap();
      }, this.speed);
    }

    close() {
      if (this.popupContainer) {
        this.popupContainer.classList.remove('animate-open');
        this.popupContainer.classList.remove(this.animation);
        this.popup.classList.remove('is-open');
        this.popupContainer.classList.remove('popup__open');

        this.enableScroll();
        this.options.isClose(this);
        this.isOpen = false;
        this.focusTrap();
      }
    }

    focusCatch(e) {
      const focusable = this.popupContainer.querySelectorAll(this.focusElements);
      const focusArray = Array.prototype.slice.call(focusable);
      const focusedIndex = focusArray.indexOf(document.activeElement);

      if (e.shiftKey && focusedIndex === 0) {
        focusArray[focusArray.length - 1].focus();
        e.preventDefault();
      }
      if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
        focusArray[0].focus();
        e.preventDefault();
      }
    }

    focusTrap() {
      const focusable = this.popupContainer.querySelectorAll(this.focusElements);
      if (!this.isOpen && this.lastFocusEl) {
        this.lastFocusEl.focus();
      } else {
        focusable[0].focus();
      }
    }


    disableScroll() {
      let pagePosition = window.scrollY;
      this.lockPadding;
      document.body.classList.add('disable-scroll');
      document.body.dataset.position = pagePosition;
      document.body.style.top = -pagePosition + 'px';
    }

    enableScroll() {
      let pagePosition = parseInt(document.body.dataset.position, 10);
      this.unlockPadding;
      document.body.style.top = 'auto';
      document.body.classList.remove('disable-scroll');
      window.scroll({
        top: pagePosition,
        left: 0
      })
      document.body.removeAttribute('data-position');
    }

    lockPadding() {
      let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
      this.fixBlocks.forEach((el) => {
        el.style.paddingRight = paddingOffset;
      });
      document.body.style.paddingRight = paddingOffset;
    }


    unlockPadding() {
      this.fixBlocks.forEach((el) => {
        el.style.paddingRight = '0px';
      });
      document.body.style.paddingRight = '0px';
    }

    // Функция вывода в консоль
    // popupLogging(message) {
    //   this.options.logging ? FLS(`[Попапос]: ${message}`) : null;
    // }
  }
  const popup = new Popup({
    isOpen: (popup) => {

      console.log('popup');
    }
  });

})();