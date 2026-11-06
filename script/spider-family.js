document.addEventListener("DOMContentLoaded", function () {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cycleDuration = 120000;
  const visitDuration = 90000;
  const webDelay = 10000;
  const webDuration = 18000;
  const storageKeys = {
    started: "portfolio-spider-v2-started",
    lastPath: "portfolio-spider-v2-last-path",
    visit: "portfolio-spider-v2-visit"
  };
  const sessionStore = {
    get(key) {
      try {
        return window.sessionStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        window.sessionStorage.setItem(key, value);
      } catch {
        // The animation still works for this page when storage is unavailable.
      }
    }
  };

  const pagePath = window.location.pathname;
  let startedAt = Number(sessionStore.get(storageKeys.started));
  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    startedAt = Date.now();
    sessionStore.set(storageKeys.started, String(startedAt));
  }

  const previousPath = sessionStore.get(storageKeys.lastPath);
  let visit = Number(sessionStore.get(storageKeys.visit)) || 0;
  if (previousPath && previousPath !== pagePath) {
    visit += 1;
    sessionStore.set(storageKeys.visit, String(visit));
  }
  sessionStore.set(storageKeys.lastPath, pagePath);

  const scene = document.createElement("div");
  scene.className = `spider-family spider-family--arrival-${visit % 4}`;
  scene.setAttribute("aria-hidden", "true");
  scene.innerHTML = `
    <div class="spider-family__web">
      <svg viewBox="0 0 100 100" focusable="false">
        <path d="M50 50 50 2M50 50 84 16M50 50 98 50M50 50 84 84M50 50 50 98M50 50 16 84M50 50 2 50M50 50 16 16M50 8 50 92M8 50 92 50M16 16 84 84M84 16 16 84M35 35Q50 27 65 35T79 50Q73 65 65 65T50 79Q35 73 35 65T21 50Q27 35 35 35Z" />
      </svg>
    </div>
    <div class="spider-family__remains"><i></i><i></i><i></i></div>
    <div class="spider-family__insect"><i></i><i></i></div>
    <div class="spider-family__spider">
      <svg viewBox="0 0 64 72" focusable="false">
        <defs>
          <linearGradient id="spider-leg-shade" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b3a5cc"/><stop offset=".45" stop-color="#51465f"/><stop offset="1" stop-color="#211c2a"/></linearGradient>
          <radialGradient id="spider-body-shade" cx=".28" cy=".2" r=".92"><stop stop-color="#9786b1"/><stop offset=".28" stop-color="#665775"/><stop offset=".72" stop-color="#383044"/><stop offset="1" stop-color="#211c2a"/></radialGradient>
          <radialGradient id="spider-head-shade" cx=".3" cy=".18" r=".88"><stop stop-color="#b2a1ce"/><stop offset=".35" stop-color="#77688f"/><stop offset=".8" stop-color="#40374f"/><stop offset="1" stop-color="#282230"/></radialGradient>
          <linearGradient id="spider-gloss" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
        </defs>
        <g class="spider-family__legs">
          <path class="spider-family__leg spider-family__leg--1" d="M25 29 15 19 5 17"/>
          <path class="spider-family__leg spider-family__leg--2" d="M23 34 11 29 3 31"/>
          <path class="spider-family__leg spider-family__leg--3" d="M23 40 11 43 4 49"/>
          <path class="spider-family__leg spider-family__leg--4" d="M26 45 17 56 13 65"/>
          <path class="spider-family__leg spider-family__leg--5" d="M39 29 49 19 59 17"/>
          <path class="spider-family__leg spider-family__leg--6" d="M41 34 53 29 61 31"/>
          <path class="spider-family__leg spider-family__leg--7" d="M41 40 53 43 60 49"/>
          <path class="spider-family__leg spider-family__leg--8" d="M38 45 47 56 51 65"/>
        </g>
        <g class="spider-family__legs-highlight">
          <path d="M25 29 15 19 5 17M23 34 11 29 3 31M23 40 11 43 4 49M26 45 17 56 13 65M39 29 49 19 59 17M41 34 53 29 61 31M41 40 53 43 60 49M38 45 47 56 51 65"/>
        </g>
        <ellipse class="spider-family__abdomen" cx="32" cy="48" rx="14" ry="16"/>
        <ellipse class="spider-family__body-glint" cx="26" cy="43" rx="5" ry="8"/>
        <ellipse class="spider-family__head" cx="32" cy="30" rx="10" ry="11"/>
        <ellipse class="spider-family__head-glint" cx="28" cy="25" rx="3.5" ry="2"/>
        <circle class="spider-family__eye" cx="27" cy="25" r="1"/>
        <circle class="spider-family__eye" cx="30" cy="23" r=".9"/>
        <circle class="spider-family__eye" cx="34" cy="23" r=".9"/>
        <circle class="spider-family__eye" cx="37" cy="25" r="1"/>
        <circle class="spider-family__eye" cx="29" cy="28" r=".8"/>
        <circle class="spider-family__eye" cx="35" cy="28" r=".8"/>
      </svg>
    </div>
  `;
  document.body.append(scene);

  const spider = scene.querySelector(".spider-family__spider");
  const web = scene.querySelector(".spider-family__web");
  const insect = scene.querySelector(".spider-family__insect");
  const remains = scene.querySelector(".spider-family__remains");

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const getRoute = () => {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    const header = document.querySelector(".site-header");
    const safeTop = Math.min(height * 0.25, Math.max(74, (header?.getBoundingClientRect().bottom || 0) + 10));
    const safeBottom = Math.min(64, height * 0.12);
    const usableHeight = Math.max(100, height - safeTop - safeBottom);
    const points = [
      [0.85, 0.05], [0.72, 0.17], [0.52, 0.1], [0.36, 0.23],
      [0.18, 0.16], [0.08, 0.38], [0.25, 0.51], [0.47, 0.38],
      [0.68, 0.48], [0.88, 0.38], [0.78, 0.66], [0.56, 0.77],
      [0.34, 0.69], [0.12, 0.81], [0.23, 0.94], [0.48, 0.84],
      [0.71, 0.94], [0.9, 0.75], [0.77, 0.53], [0.52, 0.62],
      [0.3, 0.46], [0.11, 0.26], [0.32, 0.08], [0.61, 0.22],
      [0.85, 0.05]
    ];
    const jittered = points.map(([x, y], index) => {
      if (index === points.length - 1) return points[0];
      return [x + (Math.random() - 0.5) * 0.035, y + (Math.random() - 0.5) * 0.035];
    });

    return jittered.map(([x, y]) => ({
      x: clamp(width * x, 10, width - 70),
      y: clamp(safeTop + usableHeight * y, safeTop, height - safeBottom - 78)
    }));
  };

  let route = getRoute();
  let roamAnimation;
  let resizeTimer;
  let cycle = -1;
  let visible = false;
  let webVisible = false;

  const startRoam = (cycleElapsed) => {
    route = getRoute();
    spider.style.width = "60px";
    spider.style.left = `${route[0].x}px`;
    spider.style.top = `${route[0].y}px`;
    if (reducedMotion) {
      return;
    }

    if (roamAnimation) roamAnimation.cancel();
    let distance = 0;
    const distances = route.map((point, index) => {
      if (index > 0) {
        distance += Math.hypot(point.x - route[index - 1].x, point.y - route[index - 1].y);
      }
      return distance;
    });
    const totalDistance = distances[distances.length - 1] || 1;
    roamAnimation = spider.animate(
      route.map((point, index) => {
        const next = route[(index + 1) % route.length];
        const previous = route[Math.max(0, index - 1)];
        const direction = index === route.length - 1
          ? Math.atan2(point.y - previous.y, point.x - previous.x)
          : Math.atan2(next.y - point.y, next.x - point.x);
        const rotation = direction * 180 / Math.PI + 90;
        return {
          transform: `translate(${point.x - route[0].x}px, ${point.y - route[0].y}px) rotate(${rotation}deg)`,
          offset: distances[index] / totalDistance,
          easing: "ease-in-out"
        };
      }),
      { duration: visitDuration, easing: "linear", fill: "forwards" }
    );
    roamAnimation.currentTime = Math.min(cycleElapsed, visitDuration);
  };

  const setWebState = (elapsed) => {
    const shouldShow = elapsed >= webDelay && elapsed < webDelay + webDuration;
    if (shouldShow === webVisible) return;
    webVisible = shouldShow;
    if (shouldShow) {
      const bounds = spider.getBoundingClientRect();
      web.style.left = `${clamp(bounds.left + bounds.width / 2 - 41, 10, window.innerWidth - 92)}px`;
      web.style.top = `${clamp(bounds.top + bounds.height / 2 - 41, 76, window.innerHeight - 92)}px`;
    }
    web.classList.toggle("is-visible", shouldShow);
  };

  let insectStarted = false;
  let eatingStarted = false;
  const setInsectState = (elapsed) => {
    const isEating = elapsed >= 35000 && elapsed < 50000;
    const isEaten = elapsed >= 41000 && elapsed < 50000;
    if (isEating && !insectStarted) {
      insectStarted = true;
      const bounds = spider.getBoundingClientRect();
      insect.style.left = `${clamp(bounds.left + bounds.width / 2 + 28, 8, window.innerWidth - 24)}px`;
      insect.style.top = `${clamp(bounds.top + bounds.height / 2, 76, window.innerHeight - 24)}px`;
    }
    if (isEaten && !eatingStarted) {
      eatingStarted = true;
      const bounds = spider.getBoundingClientRect();
      insect.style.left = `${clamp(bounds.left + bounds.width / 2, 8, window.innerWidth - 24)}px`;
      insect.style.top = `${clamp(bounds.top + bounds.height / 2 + 8, 76, window.innerHeight - 24)}px`;
      remains.style.left = insect.style.left;
      remains.style.top = insect.style.top;
    }
    insect.classList.toggle("is-visible", isEating);
    insect.classList.toggle("is-eaten", isEaten);
    remains.classList.toggle("is-visible", elapsed >= 41500 && elapsed < 55000);
    spider.classList.toggle("is-annoyed", elapsed >= 44000 && elapsed < 52000);
    if (!isEating) insectStarted = false;
    if (!isEaten) eatingStarted = false;
  };

  let hasAppeared = false;
  const showSpider = (elapsed, cycleIndex) => {
    visible = true;
    scene.classList.remove("is-hidden");
    scene.classList.add("is-active");
    if (!hasAppeared) {
      scene.classList.add(cycleIndex > 0 ? "is-returning" : "is-entering");
      window.setTimeout(() => scene.classList.remove("is-entering", "is-returning"), 1300);
      hasAppeared = true;
    } else {
      scene.classList.add("is-returning");
      window.setTimeout(() => scene.classList.remove("is-returning"), 1300);
    }
    startRoam(elapsed);
    setWebState(elapsed);
    setInsectState(elapsed);
  };

  const hideSpider = () => {
    if (!visible) return;
    visible = false;
    scene.classList.remove("is-active");
    scene.classList.add("is-hidden");
    web.classList.remove("is-visible");
    webVisible = false;
    insect.classList.remove("is-visible", "is-eaten");
    remains.classList.remove("is-visible");
    spider.classList.remove("is-annoyed");
    insectStarted = false;
    eatingStarted = false;
    if (roamAnimation) roamAnimation.cancel();
  };

  const update = () => {
    const elapsedTotal = Math.max(0, Date.now() - startedAt);
    const nextCycle = Math.floor(elapsedTotal / cycleDuration);
    const elapsed = elapsedTotal % cycleDuration;
    const shouldShow = elapsed < visitDuration;

    if (nextCycle !== cycle) {
      cycle = nextCycle;
      if (shouldShow) showSpider(elapsed, cycle);
    } else if (shouldShow && !visible) {
      showSpider(elapsed, cycle);
    } else if (!shouldShow && visible) {
      hideSpider();
    } else if (shouldShow && visible) {
      setWebState(elapsed);
      setInsectState(elapsed);
    }
  };

  if (reducedMotion) scene.classList.add("spider-family--reduced-motion");

  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (visible) startRoam((Date.now() - startedAt) % cycleDuration);
    }, 140);
  });

  update();
  window.setInterval(update, 500);
});
