const langResource = {
    ko: {
        profilenav: "프로필",
        settingsnav: "설정",
        faqnav: "문의",
        recevent: "추천 경기",
        upcomingevents: "다가오는 경기",
        news: "뉴스",
        tips: "팁과 충고",
        tips1: "현지 풍습과 예절",
        tips1n1: "호주사람들은 대체로 친절하고 느긋합니다",
        tips1n2: "간단한 인사로 G'day(그데이)나 Hello(헬로우)가 있습니다.",
        tips1n3:
            "팁은 필수는 아니지만 감사한 마음으로 할 수는 있습니다. (가격의 10%정도)",
        tips2: "음식",
        tips2n1:
            "베지마이트 (발라먹는 잼 종류), 미트파이, 래밍턴, 캥거루고기 그리고 댐퍼 (빵의 종류) 같은 호주 음식들을 시도해보세요.",
        tips2n2: "호주 전통의 바베큐(바비)를 시도해보세요",
        tips2n3:
            "호주의 다문화 인구 덕분에 다양한 나라의 음식들을 맛볼 수 있습니다.",
        tips3: "야생동물과 자연",
        tips3n1:
            "호주는 호주만의 자연으로 잘 알려져있습니다. 야생동물들을 조심해주세요. 그리고 특히 자연공원에선 안전 가이드라인을 따라주세요.",
        tips3n2:
            "야생동물에게 먹이를 주지마세요. 동물이나 먹이를 주는 분도 위험할 수 있어요.",
        tips4: "대중교통",
        tips4n1:
            "브리즈번은 대중교통이 잘 발달돼있습니다. 예로 버스, 기차, 페리가 있습니다. 편리함을 위해서 Go Card(고카드) 구입을 생각해보세요.",
        tips4n2:
            "차를 렌트하기로 결정했다면 호주는 왼쪽 차선에서 운전하니 조심하세요.",
        tips5: "위급상황",
        tips5n1: "경찰, 소방, 의료지원은 000번으로 전화주세요",
        tips6: "원주민 문화",
        tips6n1:
            "호주의 원주민 문화와 전통에 대해 배우고 존중하며, 더 깊은 이해를 얻기 위해 문화 센터를 방문하거나 원주민 행사에 참석하는 것을 추천합니다.",
        bottomtip:
            "이러한 팁을 따르고 현지의 관습과 문화를 존중함으로써, 2032년 브리즈번 올림픽 기간 동안 기억에 남고 즐거운 시간을 보낼 수 있을겁니다. 스포츠와 아름다운 호주의 풍경을 즐기세요",
        translateButton: "번역",
        inputplaceholder: "입력하거나 마이크버튼을 누르고 말하세요.",
        outputplaceholder: "번역이 되면 여기에 표시됩니다.",
    },
    en: {
        profilenav: "Profile",
        settingsnav: "Settings",
        faqnav: "FAQ",
        recevent: "Recommended Events",
        upcomingevents: "Upcoming Events",
        news: "News",
        inputplaceholder: "Enter or speak to translate",
        outputplaceholder: "Translation will appear here",
    },
};

// Function to set the language cookie
function setLanguageCookie(lang) {
    setCookie("selectedLanguage", lang, 30);
}

// Function to get the language from the cookie
function getLanguageFromCookie() {
    return getCookie("selectedLanguage") || "en";
}

// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
// Function to get a cookie
function getCookie(name) {
    const cookieName = name + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

// Function to update language
function updateLanguage(lang, langResource) {
    const inputTextElement = document.getElementById("input-text");
    if (inputTextElement) {
        inputTextElement.placeholder =
            langResource[lang].inputplaceholder || "";
    }
    const outputTextElement = document.getElementById("output-text");
    if (outputTextElement) {
        outputTextElement.placeholder =
            langResource[lang].outputplaceholder || "";
    }

    for (let key in langResource[lang]) {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = langResource[lang][key];
        }
    }
}

// Initialize the page with the selected language from a cookie
window.addEventListener("load", function () {
    const selectedLang = getLanguageFromCookie();
    document.getElementById("languageSelector").value = selectedLang;
    updateLanguage(selectedLang, langResource);

    // Add a listener to the language selector
    document
        .getElementById("languageSelector")
        .addEventListener("change", function () {
            const selectedLang = this.value;
            setCookie("selectedLanguage", selectedLang, 30); // Store the selected language in a cookie (expires in 30 days)
            updateLanguage(selectedLang, langResource); // Update the content with the selected language
            setLanguageCookie(selectedLang); // Set the language cookie
            updateLanguage(selectedLang, langResource);
        });
});

//Side navigation bar opening and closing function
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function toggleSubNav() {
    var subNavContent = document.getElementById("subNavContent");
    if (subNavContent.style.display === "block") {
        subNavContent.style.display = "none";
    } else {
        subNavContent.style.display = "block";
    }
}

//FAQ Page
var faq = document.getElementsByClassName("faq-page");
var i;
for (i = 0; i < faq.length; i++) {
    faq[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");
        /* Toggle between hiding and showing the active panel */
        var body = this.nextElementSibling;
        if (body.style.display === "block") {
            body.style.display = "none";
        } else {
            body.style.display = "block";
        }
    });
}

//Translation part
// browserify features.js -o bundle.js
document
    .getElementById("translate-button")
    .addEventListener("click", async () => {
        const sourceLanguage = document.getElementById("source-language").value;
        const targetLanguage = document.getElementById("target-language").value;
        const inputText = document.getElementById("input-text").value;

        // Translation feature
        const { Translate } = require("./@google-cloud/translate").v2;
        const translate = new Translate({
            key: "AIzaSyAAA0VNdOevLNCj781gGkycuP7fxKO_u7o",
        });

        async function translateText(text, targetLanguage) {
            let result = await translate.translate(text, targetLanguage);
            return result[0];
        }

        document.getElementById("output-text").value = await translateText(
            inputText,
            targetLanguage
        );
    });

// Js for all events page.
function toggleListExpansion(parentElement) {
    const listExpansion = parentElement.querySelector(".list-expansion");
    listExpansion.classList.toggle("show");
}

function toggleAllListExpansion(button) {
    var eventTable = button.closest(".event-table");
    const listExpansions = eventTable.querySelectorAll(".list-expansion");

    if (button.innerText === "Show all") {
        for (var listExpansion of listExpansions) {
            listExpansion.classList.add("show");
        }
        button.innerText = "Hide all";
    } else {
        for (var listExpansion of listExpansions) {
            listExpansion.classList.remove("show");
        }
        button.innerText = "Show all";
    }
}

function addOrRemove(button) {
    var event = button.closest(".list-expansion-content");
    // TODO: if the event in the planner, remove it, otherwise add

    button.classList.add("rotating");
    var img = getComputedStyle(button).backgroundImage;

    // Toggle the add/remove icon
    // change img after animation finish (0.3s)
    setTimeout(function () {
        if (img.includes("add.png")) {
            button.style.backgroundImage = "url('img/remove.png')";
        } else {
            button.style.backgroundImage = "url('img/add.png')";
        }
        button.classList.remove("rotating");
    }, 300);
}

// Searching functions
const homeSearchBox = document.getElementById("home-search-box");
const mainSearchBox = document.getElementById("main-search-box");
const searchOverlay = document.getElementById("search-overlay");
const suggestionsBox = document.getElementById("suggestions-box");

const suggestions = [
    "Test",
    "Archery",
    "Artistic Gymnastics",
    "Artistic Swimming",
    "Athletics",
    "Badminton",
    "Baseball Softball",
    "Basketball",
    "Beach Volleyball",
    "Boxing",
    "Breaking",
];

// add event listener
homeSearchBox.addEventListener("focus", function () {
    searchOverlay.style.display = "flex";
    mainSearchBox.value = "";
    mainSearchBox.focus();
});

searchOverlay.addEventListener("click", function (e) {
    if (e.target === searchOverlay) {
        searchOverlay.style.display = "none";
        mainSearchBox.value = ""; // Clear the overlay search input
        mainSearchBox.blur(); // Remove focus from the overlay search input
    }
});

mainSearchBox.addEventListener("input", handleInput);

// functions

function handleInput(event) {
    const value = formatting(event.target.value);

    const filteredSuggestions = suggestions.filter((s) => s.startsWith(value));

    suggestionsBox.innerHTML = "";
    if (value != "") {
        displaySuggestions(filteredSuggestions);
    } else {
        suggestionsBox.style.display = "none";
    }
}

// Capitalize the first letter of each word in the sentence
// e.g. artistic gymnastics -> Artistic Gymnastics
function formatting(string) {
    var value = string.toLowerCase().split(" ");

    for (let i = 0; i < value.length; i++) {
        value[i] = value[i].charAt(0).toUpperCase() + value[i].slice(1);
    }

    value = value.join(" ");
    return value;
}

// auto complete user's input, and create a drop down menu
function displaySuggestions(suggestions) {
    suggestions.forEach((suggestion) => {
        const div = document.createElement("div");
        const hr = document.createElement("hr");
        const a = document.createElement("a");

        // div.textContent = suggestion;
        div.className = "suggestion";

        hr.className = "suggestion-separator";

        a.href = "allEvents#" + suggestion.split(" ").join("");
        a.textContent = suggestion;

        div.onclick = function () {
            mainSearchBox.value = suggestion;
            suggestionsBox.style.display = "none";
        };

        suggestionsBox.appendChild(div);
        div.appendChild(a);
        div.appendChild(hr);
    });
    suggestionsBox.style.display = suggestions.length ? "block" : "none";
}
