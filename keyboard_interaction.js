"use strict";
(() => {
  let startTime;
  let keyCount = 0;
  let timer;
  let typingSpeed;

  const okBtn = document.getElementById("ok-btn");
  const startButton = document.getElementById("start-button");
  const speedTest = document.getElementById("speed-test");
  const timerDisplay = document.getElementById("timer");

  function startTest() {
    startTime = Date.now();
    keyCount = 0;
    speedTest.textContent = "0 타 (0 타/분)";
    timerDisplay.textContent = "00:00";
    startButton.disabled = true;
    document.addEventListener("keydown", countKey);
    timer = setInterval(updateTimer, 1000); // 1초마다 타이머 업데이트
  }

  function countKey(event) {
    if (event.keyCode === 72) {
      // 스페이스바 누름
      keyCount++;
      const elapsedTime = (Date.now() - startTime) / 1000; // 경과 시간 (초)
      typingSpeed = Math.round((keyCount / elapsedTime) * 60); // 타수 (타/분)
      speedTest.textContent = `${keyCount} 타 (${typingSpeed} 타/분)`;
    }
  }

  function updateTimer() {
    const elapsedTime = (Date.now() - startTime) / 1000; // 경과 시간 (초)
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = Math.floor(elapsedTime % 60);
    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    timerDisplay.textContent = formattedTime;
    typingSpeed = Math.round((keyCount / elapsedTime) * 60); // 타수 (타/분)
    speedTest.textContent = `${keyCount} 타 (${typingSpeed} 타/분)`;
    if (elapsedTime >= 10) {
      // 시간이 지나면 테스트 종료
      endTest(typingSpeed);
    }
  }

  function endTest(typingSpeed) {
    if (typingSpeed < 100 || typingSpeed > 120) {
      clearInterval(timer);
      document.removeEventListener("keydown", countKey);
      startButton.disabled = false;
      alert(
        "테스트를 실패하셨습니다.\n다시 도전하세요!\n총 경과 시간: " +
          timerDisplay.textContent
      );
    } else {
      clearInterval(timer);
      document.removeEventListener("keydown", countKey);
      startButton.disabled = false;
      document.getElementById("modal-dialog").showModal();
      // location.href = "camera_interaction.html";
    }
  }

  startButton.addEventListener("click", startTest);
  okBtn.addEventListener("click", () => {
    location.href = "camera_interaction.html";
  });
})();
