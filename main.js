// Save score with day in local storage
// Make lvls in selec boxes can choose from
// Make more functions
// Add deffirent words for each lvl
// Make instruction box dynamically after the game
// Add 3 seconds more in the first word
let date = new Date();
let selectors = document.querySelectorAll(".select div");
let table = document.querySelector("table");
let playAgain = document.querySelector(".play-again");
let showRezults = document.querySelector(".show-rezults");
storedRezults();
let easyWords = [
  "come",
  "think",
  "look",
  "want",
  "give",
  "use",
  "find",
  "tell",
  "ask",
  "work",
  "seem",
  "feel",
  "try",
  "leave",
  "call",
  "year",
  "time",
  "child",
  "woman",
  "week",
  "day",
  "way",
  "man",
  "thing",
  "world",
  "person",
  "part",
  "eye",
  "work",
  "case",
];
let words = [
  "Accessibility",
  "Algorithm",
  "Development",
  "Bandwidth",
  "Bootstrap",
  "Browser",
  "Cache",
  "Integration",
  "Libraries",
  "Framework",
  "Redirects",
  "Sitemap",
  "Plugins",
  "Waterfall",
  "Cookies",
  "Programming",
  "Jquery",
  "Javascript",
  "Maintenance",
  "Operating",
  "Assurance",
  "Database",
  "Minification",
  "Interface",
  "Web",
  "Control",
  "Debugging",
  "Experience",
  "Firewall",
  "Architecture",
];
let hardWords = [
  "Nauseous",
  "Dilate",
  "Indict",
  "Liquefy",
  "Wednesday",
  "Sherbet",
  "Bologna",
  "Playwright",
  "Fuchsia",
  "Minuscule",
  "Ingenious",
  "Sacrilegious",
  "Accommodate",
  "Orangutan",
  "Mischievous",
  "Gubernatorial",
  "Acquiesce",
  "Conscientious",
  "Paraphernalia",
  "Onomatopoeia",
];
// Setting Lvls
let lvls = {
  Easy: 3,
  Normal: 4,
  Hard: 3,
};
let allWords = {
  Easy: easyWords,
  Normal: words,
  Hard: hardWords,
};
// Default
let defaultLvlName = document.querySelector(".checked").dataset.type;
let defaultLvlSeconds = lvls[defaultLvlName];
// Selectors
let currentLvl = document.querySelector("span.lvl");
let currentSeconds = document.querySelector("span.time");
let startBtn = document.querySelector(".start");
let currentWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let commingWords = document.querySelector(".upcomming-words");
let timeLeft = document.querySelector("span.left");
let score = document.querySelector(".current-score");
let totalScore = document.querySelector("span.total");
let winMsg = document.querySelector(".finish .win");
let loseMsg = document.querySelector(".finish .lose");
changeLvl();
// set lvl name & seconds & score
currentLvl.innerHTML = defaultLvlName;
currentSeconds.innerHTML = defaultLvlSeconds;
timeLeft.innerHTML = defaultLvlSeconds;
totalScore.innerHTML = allWords[defaultLvlName].length;
// Disable Paste Event
input.onpaste = function () {
  return false;
};
// Start Game
startBtn.addEventListener("click", () => {
  startBtn.remove();
  playAgain.style.display = "block";
  input.focus();
  if (score.innerHTML == 0) {
    timeLeft.innerHTML = +timeLeft.innerHTML + 3;
  }
  generateWord();
});
// Generate Word
function generateWord() {
  currentWord.style.display = "block";
  let randomWord =
    allWords[defaultLvlName][
      Math.floor(Math.random() * allWords[defaultLvlName].length)
    ];
  let wordIndex = allWords[defaultLvlName].indexOf(randomWord);
  allWords[defaultLvlName].splice(wordIndex, 1);
  currentWord.innerHTML = randomWord;
  commingWords.innerHTML = "";
  for (let i = 0; i < allWords[defaultLvlName].length; i++) {
    commingWords.innerHTML += `<div>${allWords[defaultLvlName][i]}</div>`;
  }
  startPlay();
}
function startPlay() {
  let timer = setInterval(() => {
    timeLeft.innerHTML--;
    if (timeLeft.innerHTML == 0) {
      clearInterval(timer);
      if (currentWord.innerHTML.toLowerCase() === input.value) {
        score.textContent++;
        input.value = "";
        timeLeft.innerHTML = defaultLvlSeconds;
        if (allWords[defaultLvlName].length > 0) {
          generateWord();
        }
      } else {
        loseMsg.innerHTML = `Game Over`;
        localStorage.setItem(
          date,
          `${score.textContent} From ${totalScore.textContent} [Lose]`
        );
      }
      if (score.innerHTML === totalScore.innerHTML) {
        winMsg.innerHTML = `You Win The Game :)`;
        localStorage.setItem(
          date,
          `${score.textContent} From ${totalScore.textContent} [Won]`
        );
      }
    }
  }, 1000);
}

function changeLvl() {
  selectors.forEach((select) => {
    select.addEventListener("click", () => {
      selectors.forEach((selector) => {
        selector.classList.remove("checked");
      });
      select.classList.add("checked");
      defaultLvlName = select.dataset.type;
      defaultLvlSeconds = lvls[defaultLvlName];
      currentLvl.innerHTML = defaultLvlName;
      currentSeconds.innerHTML = defaultLvlSeconds;
      timeLeft.innerHTML = defaultLvlSeconds;
      totalScore.innerHTML = allWords[defaultLvlName].length;
      input.onpaste = function () {
        return false;
      };
    });
  });
}
playAgain.onclick = function () {
  window.location.reload();
};

function storedRezults() {
  if (localStorage.length > 0) {
    showRezults.style.display = "block";

    showRezults.onclick = function () {
      table.classList.toggle("show");
    };
    for (let i = localStorage.length - 1; i >= 0; i--) {
      table.innerHTML += `
      <tr>
      <td>
      ${localStorage.key(i)}
      </td>
          <td>
          ${localStorage.getItem(localStorage.key(i))}
      </td>
      </tr>
      `;
    }
  }
}

if (localStorage.length > 5) {
  localStorage.clear();
}
