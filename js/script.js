document.addEventListener("DOMContentLoaded", function () {
    const hamMenu = document.querySelector(".burger");
    const offScreenMenu = document.querySelector(".menu");
    const body = document.querySelector(".body");
    const formInputs = document.querySelectorAll(".form__input");
    // Get all elements with class video__item.
    const videos = document.querySelectorAll(".video__item");
    // Get all elements with class video__button.
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

    // Go through a loop for each of buttons.
    videoButtons.forEach(function (button) {
        // Listen user's click.
        button.addEventListener("click", function (element) {
            // Go through a loop for each of video elements.
            videos.forEach(function (video) {
                // Listen if user clicks on pause button.
                video.addEventListener("pause", function (el) {
                    // Check if video has an attribute 'controls' and
                    // its attribute equals the attribute of video button.
                    // If true, remove the attribute 'controls' from video and show play button.
                    if (
                        video.hasAttribute("controls") &&
                        video.dataset.parent == button.dataset.parent
                    ) {
                        video.removeAttribute("controls");
                        button.style.display = "block";
                    }
                });
                // Check if video has an attribute 'data-parent' and
                // its attribute equals the attribute of video button.
                // If true, set the attribute 'controls' in video, hide play button,
                // open video in full screen and start to play.
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

    /**
     * Show block, when user clicks on link.
     * @param {number} defaultValue
     */
    function showBlock(defaultValue = 0) {
        // Get all div elements with data-block-parent attribute.
        let parentElements = document.querySelectorAll("[data-block-parent]");

        // Go through a loop for each of element.
        parentElements.forEach(function (parentElement) {
            // Get all links with data-block-link attribute.
            const childlinks =
                parentElement.querySelectorAll("[data-block-link]");

            // Get all items with data-block-item attribute.
            const childblocks =
                parentElement.querySelectorAll("[data-block-item]");

            if (defaultValue) {
                addActiveByDefault(childlinks, defaultValue);
                addActiveByDefault(childblocks, defaultValue);
            }

            // Go through a loop for each of links.
            childlinks.forEach(function (childlink) {
                // Listen user's click on the link.
                childlink.addEventListener("click", function (element) {
                    // Removes active class from links and items
                    removeActives(childlinks);
                    removeActives(childblocks);
                    // Get attribute of link element
                    let attrElement = childlink.dataset.blockLink;
                    childlink.classList.add("active");

                    // Go through a loop for each of items.
                    childblocks.forEach(function (childblock) {
                        // Get attribute of item element
                        let attrBlock = childblock.dataset.blockItem;
                        // Check if attribute of link equals attribute of item.
                        // If true, add an active class to item element.
                        if (attrBlock === attrElement) {
                            childblock.classList.add("active");
                        }
                    });
                });
            });
        });
    }

    /**
     * Add active to the element.
     * It is for to select default element.
     * @param {object} elements
     * @param {number} defaultValue
     */
    function addActiveByDefault(elements, defaultValue) {
        elements.forEach(function (element) {
            let attrElement;
            // Check if element has an attribute 'data-block-link' or 'data-block-item'.
            // If one of the conditions is true,
            // then to set an attribute value to the attrElement variable.
            if (element.hasAttribute("data-block-link")) {
                attrElement = element.dataset.blockLink;
            } else if (element.hasAttribute("data-block-item")) {
                attrElement = element.dataset.blockItem;
            }
            // Check if an attribute value equals default value.
            // If true, add active class.
            if (attrElement == defaultValue) {
                element.classList.add("active");
            }
        });
    }

    /**
     * Remove active class from elements.
     * @param {object} elements
     */
    function removeActives(elements) {
        elements.forEach(function (element) {
            element.classList.remove("active");
        });
    }

    /**
     * Add hover effect for related elements.
     */
    function hoverElement() {
        // Get all elements with data-hover-block attribute.
        const blocks = document.querySelectorAll("[data-hover-block]");
        // Go through a loop for each of elements.
        blocks.forEach(function (block) {
            // Get all elements with data-hover-attr attribute.
            const hoverTags = block.querySelectorAll("[data-hover-attr]");
            // Go through a loop for each of elements with data-hover-attr attribute.
            hoverTags.forEach(function (hoverTag) {
                hover(hoverTags, hoverTag);
            });
        });
    }

    /**
     * Add active class, when the user mouseover on element.
     * If the user mouseout on element, active class removes.
     */
    function hover(tags, currentTag) {
        // Get attribute of element.
        let attrTag = currentTag.dataset.hoverAttr;
        // Go through a loop for each of elements.
        tags.forEach(function (tag) {
            // Check if attrTag value equals value of current element attribute.
            if (attrTag == tag.dataset.hoverAttr) {
                // Check if current element doesn't have class active.
                // If true, we listen user's hover on element.
                if (!tag.classList.contains("active")) {
                    // If it's mouseover, then we add class active.
                    tag.addEventListener("mouseover", function () {
                        tag.classList.add("active");
                        currentTag.classList.add("active");
                    });
                    // If it's mouseout, then we remove class active.
                    tag.addEventListener("mouseout", function () {
                        tag.classList.remove("active");
                        currentTag.classList.remove("active");
                    });
                }
            }
        });
    }

    /**
     * Adds a custom select instead of the base one.
     */
    function addCustomSelect() {
        // Get all selects.
        let selectBlocks = document.querySelectorAll(
            "select[data-custom-select]"
        );
        // Create a class of custom select.
        const className = "select-custom";
        // Go through a loop for each of select.
        selectBlocks.forEach(function (selectBlock) {
            // Create and add a custom select.
            createSelect(selectBlock, className);
        });
    }

    /**
     * Create and add a custom select.
     * @param {object} selectBlock
     * @param {string} className
     */
    function createSelect(selectBlock, className) {
        // Create div elments for a custom select.
        let selectCustom = createDiv(className);
        let selectBody = createDiv(`${className}__body`);
        let selectIcon = createDiv(`${className}__icon`);
        let selectValue = createDiv(`${className}__value`, selectBlock.value);
        let selectItems = createSelectItems(selectBlock, className);

        // Collection div elements in a specific order.
        const blocks = {
            0: [selectBody, "afterbegin", selectValue],
            1: [selectBody, "beforeend", selectIcon],
            2: [selectCustom, "afterbegin", selectBody],
            3: [selectCustom, "beforeend", selectItems],
            4: [selectBlock, "afterend", selectCustom],
        };

        appendElements(blocks);

        // Hide base select
        selectBlock.style.display = "none";

        addActive(selectCustom);
        putValue(selectCustom, className);
        changeSelectValue(selectBlock, selectCustom, className);
    }

    /**
     * Create div element.
     * @param {string} className
     * @param {string} value
     */
    function createDiv(className, value = null) {
        // Create div element with a className.
        let element = document.createElement("div");
        element.className = className;

        // Set selected value for element with class: select-custom__value.
        if (value) {
            element.innerText = value;
        }
        return element;
    }

    /**
     * Сhange value in base select.
     * @param {object} selectOrigin
     * @param {object} selectCustom
     * @param {string} className
     */
    function changeSelectValue(selectOrigin, selectCustom, className) {
        // Listen user's click on the custom select.
        selectCustom.addEventListener("click", function (element) {
            // Get div element with class: select-custom__value.
            let selectValue = selectCustom.querySelector(
                `.${className}__value`
            );
            // Remove attribute 'selected' from all <option> elements of base <select>.
            let selectBlock = removeSelectedOptions(selectOrigin);
            // Go through a loop for each of <option> elements of base <select>.
            for (let option of selectBlock.options) {
                // Check if select-custom's value equals <select> value.
                // If true, set an attribute 'selected'.
                if (selectValue.innerText == option.value) {
                    option.setAttribute("selected", "");
                }
            }
        });
    }

    /**
     * Remove value in base select.
     * @param {object} select
     */
    function removeSelectedOptions(select) {
        // Go through a loop for each of <option> elements of base <select>.
        // And remove attribute 'selected' from all <option> elements of base <select>.
        for (let option of select.options) {
            option.removeAttribute("selected");
        }
        return select;
    }

    /**
     * Create div items for a custom select.
     * @param {object} select
     * @param {string} className
     */
    function createSelectItems(select, className) {
        // Create div element with a className.
        let selectItems = document.createElement("div");
        selectItems.className = `${className}__items`;

        // Go through a loop for each of <option> elements of base <select>.
        for (let option of select.options) {
            // Add div elements with className and <option> values.
            selectItems.innerHTML += `<div class="${className}__item">${option.value}</div>`;
        }
        return selectItems;
    }

    /**
     * Append elements in a specific order.
     * @param {object} blocks
     */
    function appendElements(blocks) {
        // Go through a loop for each of collection elements.
        for (let block in blocks) {
            // Add div element in a specific order.
            blocks[block][0].insertAdjacentElement(
                blocks[block][1],
                blocks[block][2]
            );
        }
    }

    /**
     * Add acticve class to the custom select to show items,
     * when user clicks on it.
     * @param {object} select
     */
    function addActive(select) {
        select.addEventListener("click", function (option) {
            select.classList.toggle("is-active");
        });
    }

    /**
     * Put a value to the custom select.
     * @param {object} select
     * @param {string} className
     */
    function putValue(select, className) {
        // Get all the div elements with select-custom__item class.
        const items = select
            .querySelector(`.${className}__items`)
            .querySelectorAll(`.${className}__item`);

        // Go through a loop for each of div elements with select-custom__item class.
        items.forEach(function (item) {
            // Listen user's click on div element.
            item.addEventListener("click", function (element) {
                // Get value of div element.
                let text = item.innerText;
                // Get value of div element with select-custom__value class.
                let currentText = item
                    .closest(`.${select.classList[0]}`)
                    .querySelector(`.${className}__value`);
                // Change value of div element with select-custom__value class.
                currentText.innerText = text;
            });
        });
    }

    showBlock(1);
    addCustomSelect();
    hoverElement();
});
