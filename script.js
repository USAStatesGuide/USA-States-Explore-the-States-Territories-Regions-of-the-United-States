const states = document.querySelectorAll(".states-list details");

states.forEach((state) => {
    state.addEventListener("toggle", () => {
        if (state.open) {
            states.forEach((otherState) => {
                if (otherState !== state) {
                    otherState.removeAttribute("open");
                }
            });
        }
    });
});

 document.addEventListener("DOMContentLoaded", function () {

    const navigationGroups = {

        states: [
            ["Alabama", "alabama.html"],
            ["Alaska", "alaska.html"],
            ["Arizona", "arizona.html"],
            ["Arkansas", "arkansas.html"],
            ["California", "california.html"],
            ["Colorado", "colorado.html"],
            ["Connecticut", "connecticut.html"],
            ["Delaware", "delaware.html"],
            ["Florida", "florida.html"],
            ["Georgia", "georgia.html"],
            ["Hawaii", "hawaii.html"],
            ["Idaho", "idaho.html"],
            ["Illinois", "illinois.html"],
            ["Indiana", "indiana.html"],
            ["Iowa", "iowa.html"],
            ["Kansas", "kansas.html"],
            ["Kentucky", "kentucky.html"],
            ["Louisiana", "louisiana.html"],
            ["Maine", "maine.html"],
            ["Maryland", "maryland.html"],
            ["Massachusetts", "massachusetts.html"],
            ["Michigan", "michigan.html"],
            ["Minnesota", "minnesota.html"],
            ["Mississippi", "mississippi.html"],
            ["Missouri", "missouri.html"],
            ["Montana", "montana.html"],
            ["Nebraska", "nebraska.html"],
            ["Nevada", "nevada.html"],
            ["New Hampshire", "new-hampshire.html"],
            ["New Jersey", "new-jersey.html"],
            ["New Mexico", "new-mexico.html"],
            ["New York", "new-york.html"],
            ["North Carolina", "north-carolina.html"],
            ["North Dakota", "north-dakota.html"],
            ["Ohio", "ohio.html"],
            ["Oklahoma", "oklahoma.html"],
            ["Oregon", "oregon.html"],
            ["Pennsylvania", "pennsylvania.html"],
            ["Rhode Island", "rhode-island.html"],
            ["South Carolina", "south-carolina.html"],
            ["South Dakota", "south-dakota.html"],
            ["Tennessee", "tennessee.html"],
            ["Texas", "texas.html"],
            ["Utah", "utah.html"],
            ["Vermont", "vermont.html"],
            ["Virginia", "virginia.html"],
            ["Washington", "washington.html"],
            ["West Virginia", "west-virginia.html"],
            ["Wisconsin", "wisconsin.html"],
            ["Wyoming", "wyoming.html"]
        ],

        territories: [
            ["Puerto Rico", "puerto-rico.html"],
            ["Guam", "guam.html"],
            ["American Samoa", "american-samoa.html"],
            ["Northern Mariana Islands", "northern-mariana-islands.html"],
            ["U.S. Virgin Islands", "us-virgin-islands.html"]
        ],

        islands: [
            ["Baker Island", "baker-island.html"],
            ["Howland Island", "howland-island.html"],
            ["Jarvis Island", "jarvis-island.html"],
            ["Johnston Atoll", "johnston-atoll.html"],
            ["Kingman Reef", "kingman-reef.html"],
            ["Midway Atoll", "midway-atoll.html"],
            ["Navassa Island", "navassa-island.html"],
            ["Palmyra Atoll", "palmyra-atoll.html"],
            ["Wake Island", "wake-island.html"]
        ]
    };


    const currentPage =
        window.location.pathname.split("/").pop().toLowerCase();


    let currentGroup = null;
    let currentIndex = -1;


    /*
     * البحث عن الصفحة الحالية
     */
    for (const groupName in navigationGroups) {

        const group = navigationGroups[groupName];

        const index = group.findIndex(function (item) {
            return item[1].toLowerCase() === currentPage;
        });

        if (index !== -1) {
            currentGroup = group;
            currentIndex = index;
            break;
        }
    }


    /*
     * إذا لم تكن الصفحة ولاية أو إقليمًا أو جزيرة
     * لا نضيف شريط التنقل
     */
    if (!currentGroup || currentIndex === -1) {
        return;
    }


    /*
     * إنشاء شريط التنقل
     */
    const navigation = document.createElement("nav");

    navigation.className = "bottom-navigation";


    /*
     * Previous
     */
    if (currentIndex > 0) {

        const previous = currentGroup[currentIndex - 1];

        const previousLink = document.createElement("a");

        previousLink.href = previous[1];
        previousLink.className = "page-nav-previous";

        previousLink.innerHTML =
            "← Previous: <strong>" + previous[0] + "</strong>";

        navigation.appendChild(previousLink);
    }


    /*
     * العودة إلى الصفحة الرئيسية
     */
    const homeLink = document.createElement("a");

    homeLink.href = "index.html";
    homeLink.className = "page-nav-home";

    if (currentGroup === navigationGroups.states) {
        homeLink.textContent = "States List";
    }

    else if (currentGroup === navigationGroups.territories) {
        homeLink.textContent = "Territories List";
    }

    else if (currentGroup === navigationGroups.islands) {
        homeLink.textContent = "Islands List";
    }

    navigation.appendChild(homeLink);


    /*
     * Next
     */
    if (currentIndex < currentGroup.length - 1) {

        const next = currentGroup[currentIndex + 1];

        const nextLink = document.createElement("a");

        nextLink.href = next[1];
        nextLink.className = "page-nav-next";

        nextLink.innerHTML =
            "Next: <strong>" + next[0] + "</strong> →";

        navigation.appendChild(nextLink);
    }


    /*
     * وضع شريط التنقل قبل Footer
     */
    const footer = document.querySelector("footer");

    if (footer) {
        footer.parentNode.insertBefore(navigation, footer);
    }

});


/* =========================================
   Elegant Copy Button beside Box Title
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const infoBoxes = document.querySelectorAll(".parts-box");

    infoBoxes.forEach(function (box) {

        const summary = box.querySelector(":scope > summary");

        if (!summary || summary.querySelector(".parts-copy-btn")) {
            return;
        }

        /* إنشاء زر النسخ */
        const copyButton = document.createElement("button");

        copyButton.type = "button";
        copyButton.className = "parts-copy-btn";
        copyButton.setAttribute("aria-label", "Copy information");
        copyButton.setAttribute("title", "Copy");

        /* أيقونة النسخ SVG */
        copyButton.innerHTML = `
            <svg class="copy-icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="9" y="9" width="11" height="11" rx="2"></rect>
                <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3"></path>
            </svg>
        `;

        const plusButton = summary.querySelector(".parts-plus");

if (plusButton) {
    summary.insertBefore(copyButton, plusButton);
} else {
    summary.appendChild(copyButton);
}


        copyButton.addEventListener("click", function (event) {

            /* منع فتح/إغلاق المستطيل */
            event.preventDefault();
            event.stopPropagation();

            const clone = box.cloneNode(true);

            /* حذف العنوان */
            const clonedSummary = clone.querySelector(":scope > summary");

            if (clonedSummary) {
                clonedSummary.remove();
            }

            /* حذف أزرار النسخ */
            clone.querySelectorAll(".parts-copy-btn").forEach(function (button) {
                button.remove();
            });

            /* حذف الروابط */
            clone.querySelectorAll("a").forEach(function (link) {
                link.remove();
            });

            /* الحصول على العنوان */
            const titleElement = summary.querySelector("span");

            const title = titleElement
                ? titleElement.innerText.trim()
                : summary.innerText.trim();

            const content = clone.innerText.trim();

            const textToCopy = title + "\n\n" + content;


            /* حالة نجاح النسخ */
            function copied() {

                copyButton.classList.add("copied");
                copyButton.setAttribute("title", "Copied");

                copyButton.innerHTML = `
                    <svg class="check-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12.5l4 4L19 7"></path>
                    </svg>
                `;

                setTimeout(function () {

                    copyButton.classList.remove("copied");
                    copyButton.setAttribute("title", "Copy");

                    copyButton.innerHTML = `
                        <svg class="copy-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <rect x="9" y="9" width="11" height="11" rx="2"></rect>
                            <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3"></path>
                        </svg>
                    `;

                }, 1400);
            }


            /* النسخ الاحتياطي */
            function fallbackCopy(text) {

                const textarea = document.createElement("textarea");

                textarea.value = text;
                textarea.style.position = "fixed";
                textarea.style.left = "-9999px";

                document.body.appendChild(textarea);

                textarea.focus();
                textarea.select();

                try {
                    document.execCommand("copy");
                    copied();
                } catch (error) {
                    console.error("Copy failed:", error);
                }

                document.body.removeChild(textarea);
            }


            /* Clipboard API */
            if (navigator.clipboard && window.isSecureContext) {

                navigator.clipboard.writeText(textToCopy)
                    .then(copied)
                    .catch(function () {
                        fallbackCopy(textToCopy);
                    });

            } else {

                fallbackCopy(textToCopy);

            }

        });

    });

});








document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll("details > summary").forEach(function (summary) {

        // Remove trailing ▼ from summary text
        summary.childNodes.forEach(function (node) {

            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = node.textContent.replace(/\s*▼\s*$/, "");
            }

        });

    });

});
