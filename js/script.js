document.addEventListener('DOMContentLoaded', function() {
    const hamMenu = document.querySelector(".burger");
    const offScreenMenu = document.querySelector(".menu");
    const body = document.querySelector('.body');
    const videos = document.querySelectorAll('.video__item');
    const videoButtons = document.querySelectorAll('.video_button');
    const plansButtons = document.querySelectorAll('.plans__button');
    const formInputs = document.querySelectorAll('.form__input');
    const selects = document.querySelectorAll('.select');
    const selectsItems = document.querySelectorAll('.select__item');


    plansButtons.forEach(function (plansButton) {
        plansButton.addEventListener('mouseover', function (button) {
            let parent = plansButton.closest('.plans__item');
            let price = parent.querySelector('.plans__price');
            price.classList.add('active');
        });
        plansButton.addEventListener('mouseout', function (button) {
            let parent = plansButton.closest('.plans__item');
            let price = parent.querySelector('.plans__price');
            price.classList.remove('active');
        });
    });


    selects.forEach(function (select) {
        select.addEventListener('click', function (option) {
            select.classList.toggle('is-active');
        });
    });

    selectsItems.forEach(function (selectItem) {
        selectItem.addEventListener('click', function (selectOption) {
            let text = selectItem.innerText;
            let currentText = selectItem.closest('.select').querySelector('.select__current');
            currentText.innerText = text;
        });
    });

    formInputs.forEach(function (formInput) {
        formInput.addEventListener('change', function (element) {
            if (formInput.value != '') {
                formInput.classList.add('valid');
            } else {
                formInput.classList.remove('valid');
            }
        });
    });


    
    hamMenu.addEventListener('click', () => {
        hamMenu.classList.toggle('active');
        offScreenMenu.classList.toggle('active');
        body.classList.toggle('lock');
    });



    
    const infoLinks = document.querySelector('.info__links');
    const infoContent = document.querySelector('.info__content');
    const infoLinksChildren = infoLinks.children;
    const infoContentChildren = infoContent.children;

    for (let infoLink of infoLinksChildren) {
        let infoLinkAttr = infoLink.dataset.infoAttr;
        if (infoLinkAttr == '1') {
            infoLink.classList.add('active');
            for (let infoContent of infoContentChildren) {
                let infoContentAttr = infoContent.dataset.infoAttr;
                if (infoLinkAttr === infoContentAttr) {
                    infoContent.classList.add('active');
                }
            }
        }
    }

    for (let infoLink of infoLinksChildren) {
        infoLink.addEventListener("click", function(link) {
            let infoLinkAttr = infoLink.dataset.infoAttr;
            for (let infoLinkChild of infoLinksChildren) {
                infoLinkChild.classList.remove('active');
            }
            for (let infoContentChild of infoContentChildren) {
                infoContentChild.classList.remove('active');
            }
            infoLink.classList.add('active');
            for (let infoContent of infoContentChildren) {
                let infoContentAttr = infoContent.dataset.infoAttr;
                if (infoLinkAttr === infoContentAttr) {
                    infoContent.classList.add('active');
                }
            }
        });
    }

    videoButtons.forEach(function (button) {
        button.addEventListener("click", function(element) {
            videos.forEach(function (video) {
                video.addEventListener("pause", function (el) {
                    if (video.hasAttribute('controls') && (video.dataset.parent == button.dataset.parent)) {
                        video.removeAttribute('controls'); 
                        button.style.display = "block";
                    }
                });
                if (video.hasAttribute('data-parent') && (video.dataset.parent == button.dataset.parent)) {
                    video.setAttribute('controls', '');
                    button.style.display = "none";
                    video.requestFullscreen();
                    video.play();
                }
            });
        });
    });
    
});