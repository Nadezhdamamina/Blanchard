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
      // slidesPerView: 3,
      // slidesPerGroup: 3,
      // spaceBetween: 50,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
      // autoHeight: true,
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
        // 300: {
        //   slidesPerView: 1,
        //   slidesPerGroup: 1,
        //   spaceBetween: 10,

        // },

        // 421: {
        //   slidesPerView: 2,

        //   spaceBetween: 20,

        // },
        610: {
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
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
      speed: 800,

      navigation: {
        prevEl: '.doing__prev',
        nextEl: '.doing__next',
      },

      pagination: {
        el: '.doing__swiper-pagination',
      },

      breakpoints: {
        220: {
          slidesPerView: 1,
          spaceBetween: 10,

        },
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

  ymaps.ready(init);

  function init() {
    const myMap = new ymaps.Map("map", {
      center: [55.76, 37.60],
      zoom: 14
    });

    // Создание геообъекта с типом точка (метка).
    const myGeoObject = new ymaps.GeoObject({
      geometry: {
        type: "Point", // тип геометрии - точка
        coordinates: [55.76, 37.60]

      }
    });

    // Размещение геообъекта на карте.
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

})();