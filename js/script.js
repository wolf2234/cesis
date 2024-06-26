document.addEventListener("DOMContentLoaded", function () {
    const hamMenu = document.querySelector(".burger");
    const offScreenMenu = document.querySelector(".menu");
    const body = document.querySelector(".body");
    const formInputs = document.querySelectorAll(".form__input");
    const videos = document.querySelectorAll(".video__item");
    const videoButtons = document.querySelectorAll(".video__button");

    hamMenu.addEventListener("click", () => {
        hamMenu.classList.toggle("active");
        offScreenMenu.classList.toggle("active");
        body.classList.toggle("lock");
    });

    formInputs.forEach(function (formInput) {
        formInput.addEventListener("change", function (element) {
            if (formInput.value != "") {
                formInput.classList.add("valid");
            } else {
                formInput.classList.remove("valid");
            }
        });
    });

    videoButtons.forEach(function (button) {
        button.addEventListener("click", function (element) {
            videos.forEach(function (video) {
                video.addEventListener("pause", function (el) {
                    if (
                        video.hasAttribute("controls") &&
                        video.dataset.parent == button.dataset.parent
                    ) {
                        video.removeAttribute("controls");
                        button.style.display = "block";
                    }
                });
                if (
                    video.hasAttribute("data-parent") &&
                    video.dataset.parent == button.dataset.parent
                ) {
                    video.setAttribute("controls", "");
                    button.style.display = "none";
                    video.requestFullscreen();
                    video.play();
                }
            });
        });
    });

    function showBlock(defaultValue = 0) {
        let parentElements = document.querySelectorAll("[data-block-parent]");

        parentElements.forEach(function (parentElement) {
            const childlinks =
                parentElement.querySelectorAll("[data-block-link]");
            const childblocks =
                parentElement.querySelectorAll("[data-block-item]");

            if (defaultValue) {
                addActiveByDefault(childlinks, defaultValue);
                addActiveByDefault(childblocks, defaultValue);
            }

            childlinks.forEach(function (childlink) {
                childlink.addEventListener("click", function (element) {
                    removeActives(childlinks);
                    removeActives(childblocks);

                    let attrElement = childlink.dataset.blockLink;
                    childlink.classList.add("active");
                    childblocks.forEach(function (childblock) {
                        let attrBlock = childblock.dataset.blockItem;
                        if (attrBlock === attrElement) {
                            childblock.classList.add("active");
                        }
                    });
                });
            });
        });
    }

    function addActiveByDefault(elements, defaultValue) {
        elements.forEach(function (element) {
            let attrElement;
            if (element.hasAttribute("data-block-link")) {
                attrElement = element.dataset.blockLink;
            } else if (element.hasAttribute("data-block-item")) {
                attrElement = element.dataset.blockItem;
            }
            if (attrElement == defaultValue) {
                element.classList.add("active");
            }
        });
    }

    function removeActives(elements) {
        elements.forEach(function (element) {
            element.classList.remove("active");
        });
    }

    function hoverElement() {
        const blocks = document.querySelectorAll("[data-hover-block]");
        blocks.forEach(function (block) {
            const hoverTags = block.querySelectorAll("[data-hover-attr]");
            hoverTags.forEach(function (hoverTag) {
                hover(hoverTags, hoverTag);
            });
        });
    }

    function hover(tags, currentTag) {
        let attrTag = currentTag.dataset.hoverAttr;
        tags.forEach(function (tag) {
            if (attrTag == tag.dataset.hoverAttr) {
                if (!tag.classList.contains("active")) {
                    tag.addEventListener("mouseover", function () {
                        tag.classList.add("active");
                        currentTag.classList.add("active");
                    });
                    tag.addEventListener("mouseout", function () {
                        tag.classList.remove("active");
                        currentTag.classList.remove("active");
                    });
                }
            }
        });
    }

    function enableCustomSelect() {
        let selectBlocks = document.querySelectorAll(
            "select[data-custom-select]"
        );
        const className = "select-custom";
        selectBlocks.forEach(function (selectBlock) {
            let selectCustom = createSelectCustom(className);
            let selectBody = createSelectBody(className);
            let selectValue = createSelectValue(selectBlock, className);
            let selectIcon = createSelectIcon(className);
            let selectItems = createSelectItems(selectBlock, className);

            const blocks = {
                0: [selectBody, "afterbegin", selectValue],
                1: [selectBody, "beforeend", selectIcon],
                2: [selectCustom, "afterbegin", selectBody],
                3: [selectCustom, "beforeend", selectItems],
                4: [selectBlock, "afterend", selectCustom],
            };

            appendElements(blocks);
            selectBlock.style.display = "none";

            addActive(selectCustom);
            showItems(selectCustom, className);
            changeSelectValue(selectBlock, selectCustom, className);
        });
    }

    function changeSelectValue(selectOrigin, selectCustom, className) {
        selectCustom.addEventListener("click", function (element) {
            let selectValue = selectCustom.querySelector(
                `.${className}__value`
            );
            let selectBlock = removeSelectedOptions(selectOrigin);
            for (let option of selectBlock.options) {
                if (selectValue.innerText == option.value) {
                    option.setAttribute("selected", "");
                }
            }
        });
    }

    function removeSelectedOptions(select) {
        for (let option of select.options) {
            option.removeAttribute("selected");
        }
        return select;
    }

    function createSelectCustom(className) {
        let selectCustom = document.createElement("div");
        selectCustom.className = className;
        return selectCustom;
    }

    function createSelectBody(className) {
        let selectBody = document.createElement("div");
        selectBody.className = `${className}__body`;
        return selectBody;
    }

    function createSelectCurrent(className) {
        let selectCurrent = document.createElement("div");
        selectCurrent.className = `${className}__current`;
        return selectCurrent;
    }

    function createSelectValue(select, className) {
        let selectValue = document.createElement("div");
        selectValue.className = `${className}__value`;
        selectValue.innerText = select.value;
        return selectValue;
    }

    function createSelectIcon(className) {
        let selectIcon = document.createElement("span");
        selectIcon.className = `${className}__icon`;
        return selectIcon;
    }

    function createSelectItems(select, className) {
        let selectItems = document.createElement("div");
        selectItems.className = `${className}__items`;
        for (let option of select.options) {
            selectItems.innerHTML += `<div class="${className}__item">${option.value}</div>`;
        }
        return selectItems;
    }

    function appendElements(blocks) {
        for (let block in blocks) {
            blocks[block][0].insertAdjacentElement(
                blocks[block][1],
                blocks[block][2]
            );
        }
    }

    function addActive(select) {
        select.addEventListener("click", function (option) {
            select.classList.toggle("is-active");
        });
    }

    function showItems(select, className) {
        const items = select
            .querySelector(`.${className}__items`)
            .querySelectorAll(`.${className}__item`);

        items.forEach(function (item) {
            item.addEventListener("click", function (element) {
                let text = item.innerText;
                let currentText = item
                    .closest(`.${select.classList[0]}`)
                    .querySelector(`.${className}__value`);
                currentText.innerText = text;
            });
        });
    }

    function showBlock(defaultValue = 0) {
        let parentElements = document.querySelectorAll("[data-block-parent]");

        parentElements.forEach(function (parentElement) {
            const childlinks =
                parentElement.querySelectorAll("[data-block-link]");
            const childblocks =
                parentElement.querySelectorAll("[data-block-item]");

            if (defaultValue) {
                addActiveByDefault(childlinks, defaultValue);
                addActiveByDefault(childblocks, defaultValue);
            }

            childlinks.forEach(function (childlink) {
                childlink.addEventListener("click", function (element) {
                    removeActives(childlinks);
                    removeActives(childblocks);

                    let attrElement = childlink.dataset.blockLink;
                    childlink.classList.add("active");
                    childblocks.forEach(function (childblock) {
                        let attrBlock = childblock.dataset.blockItem;
                        if (attrBlock === attrElement) {
                            childblock.classList.add("active");
                        }
                    });
                });
            });
        });
    }

    function addActiveByDefault(elements, defaultValue) {
        elements.forEach(function (element) {
            let attrElement;
            if (element.hasAttribute("data-block-link")) {
                attrElement = element.dataset.blockLink;
            } else if (element.hasAttribute("data-block-item")) {
                attrElement = element.dataset.blockItem;
            }
            if (attrElement == defaultValue) {
                element.classList.add("active");
            }
        });
    }

    function removeActives(elements) {
        elements.forEach(function (element) {
            element.classList.remove("active");
        });
    }

    function hoverElement() {
        const blocks = document.querySelectorAll("[data-hover-block]");
        blocks.forEach(function (block) {
            const hoverTags = block.querySelectorAll("[data-hover-attr]");
            hoverTags.forEach(function (hoverTag) {
                hover(hoverTags, hoverTag);
            });
        });
    }

    function hover(tags, currentTag) {
        let attrTag = currentTag.dataset.hoverAttr;
        tags.forEach(function (tag) {
            if (attrTag == tag.dataset.hoverAttr) {
                if (!tag.classList.contains("active")) {
                    tag.addEventListener("mouseover", function () {
                        tag.classList.add("active");
                        currentTag.classList.add("active");
                    });
                    tag.addEventListener("mouseout", function () {
                        tag.classList.remove("active");
                        currentTag.classList.remove("active");
                    });
                }
            }
        });
    }

    showBlock(1);
    enableCustomSelect();
    hoverElement();
});
