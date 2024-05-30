const hamMenu = document.querySelector(".burger");
const offScreenMenu = document.querySelector(".menu");
const body = document.querySelector('.body');


document.addEventListener('DOMContentLoaded', function() {
    
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
    
});