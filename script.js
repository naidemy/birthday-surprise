const messages = [
  "Внимание! Обнаружена угроза безопасности!",
  "Ваш телефон заражён 17 вирусами!",
  "Система повреждена!",
  "Подозрительная активность обнаружена!",
  "Неизвестное устройство подключено!",
  "Ваша батарея повреждена!",
  "Обнаружена спам-атака!",
  "Ошибка системы 0x00021!",
  "Доступ к данным открыт!",
  "Срочно закройте это окно!"
];

let openWindows = 0;

function createPopup(text, isFinal = false) {
  const popup = document.createElement("div");
  popup.className = "popup";

  const width = 200 + Math.random() * 200;
  const height = 120 + Math.random() * 120;

  popup.style.width = width + "px";
  popup.style.height = height + "px";

  popup.style.left = Math.random() * (window.innerWidth - width) + "px";
  popup.style.top = Math.random() * (window.innerHeight - height) + "px";

  popup.style.zIndex = 1000 + openWindows;

  popup.innerHTML = `
    <div class="titlebar">
      SYSTEM ERROR
      <span class="close">✖</span>
    </div>
    <div class="content">
      ${text}
      ${
        isFinal
          ? `<br><br><button id="prizeBtn">🎁 Жми и получи приз!</button>`
          : ""
      }
    </div>
  `;

  document.body.appendChild(popup);

  if (!isFinal) {
    openWindows++;
  }

  popup.querySelector(".close").onclick = () => {
    popup.remove();
    if (!isFinal) {
      openWindows--;
      checkIfDone();
    }
  };

  if (isFinal) {
    popup.querySelector("#prizeBtn").onclick = openVideo;
  }
}

function checkIfDone() {
  if (openWindows === 0) {
    createPopup("Система очищена!", true);
  }
}

function openVideo() {
  document.getElementById("videoContainer").classList.remove("hidden");
}

// создаём 12 хаотичных окон
for (let i = 0; i < 12; i++) {
  const randomText =
    messages[Math.floor(Math.random() * messages.length)];
  createPopup(randomText);
}
