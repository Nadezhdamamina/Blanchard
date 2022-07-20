(() => {
    function setTabs(dataPath, dataTarget) {
        const btns = document.querySelectorAll(`.js-tab-btn[${dataPath}]`);
        const contents = document.querySelectorAll(`.js-tab-content[${dataTarget}]`);

        btns.forEach((btn) => {
            btn.addEventListener('click', function (evt) {
                evt.preventDefault();
                const path = this.getAttribute(dataPath);
                console.log(path);
                const target = document.querySelector(`.js-tab-content[${dataTarget}="${path}"]`);


                btns.forEach((currentBtn) => {
                    currentBtn.classList.remove('is-active');
                });

                this.classList.add('is-active');

                contents.forEach((content) => {
                    content.classList.remove('is-active');
                });

                target.classList.add('is-active');
            });
        });
    }

    window.setTabs = setTabs;

    //setTabs('data-painter-btn', 'data-painter-content');


})();