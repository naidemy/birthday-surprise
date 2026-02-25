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
  "Передача данных..."
];

let openWindows = 0;
let stubbornWindowClosed = false;

const errorSound = new Audio("error.mp3");

function shakeScreen() {
  document.body.style.transform = "translateX(5px)";
  setTimeout(() => {
    document.body.style.transform = "translateX(-5px)";
  }, 50);
  setTimeout(() => {
    document.body.style.transform = "translateX(0)";
  }, 100);
}

function createPopup(text, isFinal = false, stubborn = false) {
  const popup = document.createElement("div");
  popup.className = "popup";

  const width = 200 + Math.random() * 250;
  const height = 120 + Math.random() * 150;

  popup.style.width = width + "px";
  popup.style.height = height + "px";

  popup.style.left = Math.random() * (window.innerWidth - width) + "px";
  popup.style.top = Math.random() * (window.innerHeight - height) + "px";

  popup.style.zIndex = 1000 + openWindows;

  let content = text;

  if (!isFinal) {
    const fakeTimer = Math.floor(Math.random() * 10) + 5;
    content += `<br><br>Удаление через ${fakeTimer} сек...`;
  }

  if (isFinal) {
    content = `
      🎉 Система успешно очищена! 🎉
      <br><br>
      <button id="prizeBtn">🎁 Жми и получи приз!</button>
    `;
  }

  popup.innerHTML = `
    <div class="titlebar">
      SYSTEM ERROR
      <span class="close">✖</span>
    </div>
    <div class="content">${content}</div>
  `;

  document.body.appendChild(popup);

  if (!isFinal) openWindows++;

  // лёгкое хаотичное движение
  const moveInterval = setInterval(() => {
    popup.style.left =
      parseFloat(popup.style.left) + (Math.random() * 6 - 3) + "px";
    popup.style.top =
      parseFloat(popup.style.top) + (Math.random() * 6 - 3) + "px";
  }, 200);

  popup.querySelector(".close").onclick = () => {
    errorSound.play();
    shakeScreen();

    if (stubborn && !stubbornWindowClosed) {
      popup.querySelector(".content").innerHTML =
        "ЭТО ОКНО НЕЛЬЗЯ ЗАКРЫТЬ 😈";
      stubbornWindowClosed = true;
      return;
    }

    clearInterval(moveInterval);
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
    setTimeout(() => {
      createPopup("", true);
    }, 800);
  }
}

function openVideo() {
  document.getElementById("videoContainer").classList.remove("hidden");
}

// создаём 14 хаотичных окон
for (let i = 0; i < 14; i++) {
  const randomText =
    messages[Math.floor(Math.random() * messages.length)];

  if (i === 5) {
    createPopup(randomText, false, true); // упрямое окно
  } else {
    createPopup(randomText);
  }
}
