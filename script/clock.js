document.addEventListener("DOMContentLoaded", function () {
  const clock = document.getElementById("local-clock");
  if (!clock) return;

  const formatter = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  function updateClock() {
    const now = new Date();
    clock.dateTime = now.toISOString();
    clock.textContent = formatter.format(now);
  }

  updateClock();
  window.setInterval(updateClock, 1000);
});
