function createPopup(withSecret = false) {
  const popup = document.createElement("div");
  popup.className = "popup";

  popup.style.left = Math.random() * window.innerWidth + "px";
  popup.style.top = Math.random() * window.innerHeight + "px";

  popup.innerHTML = `
    <div class="titlebar">SYSTEM ERROR</div>
    <div class="content">
      Ваш телефон заражён вирусом!
      ${withSecret ? '<br><button onclick="openVideo()">Проверить</button>' : ''}
    </div>
  `;

  document.body.appendChild(popup);
}

function openVideo() {
  document.getElementById("videoContainer").classList.remove("hidden");
}

for (let i = 0; i < 20; i++) {
  createPopup(i === 7); // одно окно с "секретом"
}
