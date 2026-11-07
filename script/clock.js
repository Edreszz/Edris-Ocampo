document.addEventListener("DOMContentLoaded", function () {
  const clock = document.getElementById("local-clock");
  if (!clock) return;

  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  });

  function updateClock() {
    const now = new Date();
    clock.dateTime = now.toISOString();
    clock.textContent = formatter.format(now);
  }

  updateClock();
  window.setInterval(updateClock, 1000);
});
