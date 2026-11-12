/**
 * ATOBAR-FLOW INTERACTIVE ENGINE (js/scrolly.js)
 * - Scroll-driven scrollytelling preview + sticky journey rail tracker
 * - Whole-section hover -> Full-Screen Theater Mode for code-slowmo stages
 * - Keyboard navigation in Full Screen (Left/Right arrows, Space, Escape)
 * - [AS-BUILT] / [VISION] Reality Filter & BYOK Contribution Simulator
 */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
    ));
  }

  function el(tag, attrs, parent, text) {
    const isSvg = [
      "svg", "g", "rect", "line", "path", "polygon", "text", "circle"
    ].includes(tag);
    const node = isSvg
      ? document.createElementNS("http://www.w3.org/2000/svg", tag)
      : document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v !== null && v !== undefined) node.setAttribute(k, String(v));
      }
    }
    if (text !== undefined && text !== null) node.textContent = text;
    if (parent) parent.appendChild(node);
    return node;
  }

  // --- 1. Copy-to-Clipboard Buttons ---
  document.querySelectorAll("[data-copy-text]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const payload = btn.getAttribute("data-copy-text") || "";
      const originalLabel = btn.textContent;
      try {
        await navigator.clipboard.writeText(payload);
        btn.textContent = "Copied!";
      } catch (_err) {
        const ta = document.createElement("textarea");
        ta.value = payload;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        btn.textContent = "Copied!";
      }
      window.setTimeout(() => {
        btn.textContent = originalLabel;
      }, 1800);
    });
  });

  // --- 2. Reality Filter ([AS-BUILT] vs. [VISION]) ---
  const filterBtns = Array.from(document.querySelectorAll(".filter-btn[data-filter]"));
  const filterBanner = document.getElementById("filter-banner");
  const filterBannerText = document.getElementById("filter-banner-text");
  const filterResetBtn = document.getElementById("filter-reset-btn");

  const FILTER_DESCRIPTIONS = {
    "as-built": "[AS-BUILT] live on main today (repo KMS BYOK for Claude/Gemini/DeepSeek/Grok, Spec-Sufficiency Gate, Warm Worktrees, Nano Harness, Web X11 QA, Pure-Python Arbitrate, Turn Spend Ledger). [VISION] roadmap items are dimmed.",
    "vision": "[VISION] roadmap specs (J53 per-invoking-user BYOK & /profile keys, J54 Listed/Ready/Blocked + 1-line uninstall, multi-repo ventures, Android KVM QA, Co-Founder Fiscal + Architectural split). [AS-BUILT] modules are dimmed."
  };

  function applyRealityFilter(filterKey) {
    filterBtns.forEach((btn) => {
      const isSelected = btn.dataset.filter === filterKey;
      btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });

    if (!filterKey || filterKey === "all") {
      document.body.removeAttribute("data-active-filter");
      if (filterBanner) filterBanner.hidden = true;
      return;
    }

    document.body.setAttribute("data-active-filter", filterKey);
    const matchingNodes = document.querySelectorAll(`[data-status="${filterKey}"]`);
    if (filterBanner && filterBannerText) {
      filterBanner.hidden = false;
      filterBannerText.textContent = `Showing ${matchingNodes.length} ${FILTER_DESCRIPTIONS[filterKey] || filterKey}`;
    }
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => applyRealityFilter(btn.dataset.filter));
  });

  if (filterResetBtn) {
    filterResetBtn.addEventListener("click", () => applyRealityFilter("all"));
  }

  // --- 3. Embedded code-slowmo Engine + Full-Screen Stage Controller ---
  const stageControllers = new Map(); // stageEl -> controller API
  const allStages = Array.from(document.querySelectorAll(".slowmo-stage"));

  const slowmoDataEl = document.getElementById("slowmo-journeys-data");
  if (slowmoDataEl) {
    try {
      const pageData = JSON.parse(slowmoDataEl.textContent);
      const terms = pageData.terms || {};
      const roleColors = {
        human: { stroke: "#ff7ab7", fill: "#2b193d", text: "#ff7ab7" },
        github: { stroke: "#7fb8eb", fill: "#13294b", text: "#7fb8eb" },
        cp: { stroke: "#a88bf2", fill: "#231d42", text: "#cbb8ff" },
        fe: { stroke: "#2f6db6", fill: "#122a52", text: "#7fb8eb" },
        spot: { stroke: "#5ce0a8", fill: "#10302a", text: "#5ce0a8" }
      };

      function formatProse(html) {
        if (!html) return "";
        return String(html).replace(/<code>([\s\S]*?)<\/code>/g, (m, inner) => {
          const key = inner.replace(/<[^>]+>/g, "").trim();
          return terms[key] ? `<code class="term" tabindex="0" data-term="${esc(key)}">${inner}</code>` : m;
        });
      }

      // Hover & focus tooltip for code.term inside Full Screen
      const tip = document.getElementById("slowmo-tip");
      function showTip(target) {
        if (!tip) return;
        const key = target.dataset.term;
        if (!key || !terms[key]) return;
        tip.innerHTML = `<b>${esc(key)}</b>${esc(terms[key])}`;
        tip.hidden = false;
        const r = target.getBoundingClientRect();
        const tw = tip.offsetWidth || 260;
        const th = tip.offsetHeight || 60;
        const x = Math.min(window.innerWidth - tw - 12, Math.max(12, r.left));
        let y = r.bottom + 8;
        if (y + th > window.innerHeight - 12) y = r.top - th - 8;
        tip.style.left = `${x}px`;
        tip.style.top = `${y}px`;
      }

      document.addEventListener("mouseover", (e) => {
        const t = e.target.closest?.("code.term");
        if (t) showTip(t);
      });
      document.addEventListener("focusin", (e) => {
        const t = e.target.closest?.("code.term");
        if (t) showTip(t);
      });
      document.addEventListener("mouseout", (e) => {
        if (e.target.closest?.("code.term") && tip) tip.hidden = true;
      });
      document.addEventListener("focusout", (e) => {
        if (e.target.closest?.("code.term") && tip) tip.hidden = true;
      });
      window.addEventListener("scroll", () => {
        if (tip) tip.hidden = true;
      }, { passive: true });

      function carryField(steps, field) {
        let last = null;
        return steps.map((s) => (s[field] != null ? (last = s[field]) : last));
      }

      function renderStateHTML(state, prev) {
        if (!state) return "";
        return `<div class="slowmo-state">${Object.entries(state)
          .map(([k, v]) => {
            const changed = prev && JSON.stringify(prev[k]) !== JSON.stringify(v);
            return `<span class="sk">${esc(k)}</span><span class="sv${changed ? " chg" : ""}">${formatProse(esc(String(v)))}</span>`;
          })
          .join("")}</div>`;
      }

      const sectionsById = Object.fromEntries((pageData.sections || []).map((s) => [s.id, s]));

      document.querySelectorAll("[data-slowmo-mount]").forEach((mountEl) => {
        const secId = mountEl.getAttribute("data-slowmo-mount");
        const sec = sectionsById[secId];
        if (!sec || sec.type !== "flow") return;

        const stageEl = mountEl.closest(".slowmo-stage");
        const previewPill = stageEl?.querySelector("[data-preview-pill]");
        const lanes = sec.lanes || [];
        const steps = sec.steps || [];
        const laneMap = Object.fromEntries(lanes.map((l) => [l.id, l]));

        mountEl.innerHTML = `
          <div class="slowmo-flow-grid">
            <div class="slowmo-svg-box"></div>
            <div class="slowmo-side">
              <div class="slowmo-say" aria-live="polite"></div>
              <div class="slowmo-scr-wrap"></div>
              <div class="slowmo-st-wrap"></div>
            </div>
          </div>
          <div class="slowmo-transport">
            <button type="button" class="tbtn" data-a="first" aria-label="First step">|&lt;</button>
            <button type="button" class="tbtn" data-a="prev" aria-label="Previous step">&lt;</button>
            <button type="button" class="tbtn primary" data-a="next" aria-label="Next step">Next &gt;</button>
            <button type="button" class="tbtn" data-a="play" aria-label="Play slow-motion steps">&#9654; Play</button>
            <span class="slowmo-count"></span>
            <div class="slowmo-scrub">
              <input type="range" min="0" max="${Math.max(0, steps.length - 1)}" value="0" aria-label="Step scrubber">
            </div>
            <label class="slowmo-speed">Speed
              <select aria-label="Playback speed">
                <option value="0.5">0.5x</option>
                <option value="1" selected>1x</option>
                <option value="2">2x</option>
              </select>
            </label>
            <span class="slowmo-kbd-hint">&larr; &rarr; Space &middot; Esc</span>
          </div>
        `;

        const svgBox = mountEl.querySelector(".slowmo-svg-box");
        const sayBox = mountEl.querySelector(".slowmo-say");
        const scrWrap = mountEl.querySelector(".slowmo-scr-wrap");
        const stWrap = mountEl.querySelector(".slowmo-st-wrap");
        const countEl = mountEl.querySelector(".slowmo-count");
        const rangeEl = mountEl.querySelector('input[type="range"]');
        const playBtn = mountEl.querySelector('[data-a="play"]');
        const speedSel = mountEl.querySelector("select");

        const laneW = Math.max(126, ...lanes.map((l) => l.name.length * 8.6 + 30));
        const naturalW = 44 + laneW * lanes.length + 34;
        const baseW = Math.max(660, naturalW);
        const spanW = (baseW - 78) / Math.max(1, lanes.length);
        const X = {};
        lanes.forEach((l, idx) => {
          X[l.id] = 44 + spanW / 2 + idx * spanW;
        });
        const loopRight = Math.max(
          0,
          ...steps
            .filter((m) => m.from === m.to && X[m.from] != null)
            .map((m) => X[m.from] + 36 + String(m.label).length * 7.6 + 18)
        );
        const top = 60;
        const rowH = 52;
        const W = Math.max(baseW, loopRight);
        const H = top + steps.length * rowH + 20;

        const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": sec.title }, svgBox);

        lanes.forEach((l) => {
          const x = X[l.id];
          const rc = roleColors[l.role] || roleColors.fe;
          el("line", { x1: x, y1: 44, x2: x, y2: H - 6, stroke: "#31487d", "stroke-dasharray": "3 4" }, svg);
          const g = el("g", {}, svg);
          const w = Math.min(laneW - 8, l.name.length * 8.6 + 22);
          el("rect", { x: x - w / 2, y: 10, width: w, height: 32, rx: 4, fill: rc.fill, stroke: rc.stroke, "stroke-width": "1.7" }, g);
          el("text", { x, y: 30, "text-anchor": "middle", fill: "#f3f4f9", "font-size": "13", "font-weight": "700" }, g, l.name);
        });

        const msgGroups = steps.map((m, k) => {
          const yy = top + k * rowH + 24;
          const role = laneMap[m.from]?.role || "fe";
          const rc = roleColors[role] || roleColors.fe;

          if (m.phase) {
            el("line", { x1: 0, y1: yy - 24, x2: W, y2: yy - 24, stroke: "#283e73" }, svg);
            el("text", { x: W - 8, y: yy - 10, "text-anchor": "end", fill: "#7fb8eb", "font-family": "monospace", "font-size": "11", "font-weight": "700" }, svg, String(m.phase).toUpperCase());
          }

          const g = el("g", { style: "cursor:pointer" }, svg);
          const band = el("rect", { x: 2, y: yy - 21, width: W - 4, height: rowH - 4, rx: 4, fill: "transparent" }, g);
          const x1 = X[m.from];
          const x2 = X[m.to];
          let arrowLine;

          if (m.from === m.to) {
            arrowLine = el("path", { d: `M${x1} ${yy - 6}h28v12h-24`, fill: "none", stroke: rc.stroke, "stroke-width": "2" }, g);
            el("polygon", { points: `${x1 + 2},${yy + 6} ${x1 + 9},${yy + 2} ${x1 + 9},${yy + 10}`, fill: rc.stroke }, g);
            el("text", { x: x1 + 34, y: yy + 4, fill: "#f3f4f9", "font-size": "12.5", "font-weight": "600", style: "paint-order:stroke;stroke:#0d183b;stroke-width:4px;stroke-linejoin:round" }, g, m.label);
          } else {
            const dir = x2 > x1 ? 1 : -1;
            const xe = x2 - dir * 3;
            arrowLine = el("line", { x1, y1: yy, x2: xe - dir * 6, y2: yy, stroke: rc.stroke, "stroke-width": "2" }, g);
            el("polygon", { points: `${xe},${yy} ${xe - dir * 8},${yy - 4.5} ${xe - dir * 8},${yy + 4.5}`, fill: rc.stroke }, g);
            el("text", { x: (x1 + x2) / 2, y: yy - 8, "text-anchor": "middle", fill: "#f3f4f9", "font-size": "12.5", "font-weight": "600", style: "paint-order:stroke;stroke:#0d183b;stroke-width:4px;stroke-linejoin:round" }, g, m.label);
          }
          el("text", { x: 8, y: yy + 4, fill: "#cfd6ea", "font-family": "monospace", "font-size": "11.5", "font-weight": "700" }, g, `${k + 1}.`);
          return { g, band, arrowLine, rc };
        });

        const screens = carryField(steps, "screen");
        const states = carryField(steps, "state");

        let curIdx = 0;
        let timer = null;
        let speed = 1;

        function renderStep(k) {
          curIdx = Math.max(0, Math.min(steps.length - 1, k));
          rangeEl.value = String(curIdx);
          countEl.textContent = `Step ${curIdx + 1} / ${steps.length}`;
          if (previewPill) {
            previewPill.textContent = `Scroll Preview · Step ${curIdx + 1} / ${steps.length}`;
          }

          msgGroups.forEach((item, j) => {
            const isCurrent = j === curIdx;
            const isFuture = j > curIdx;
            item.g.style.opacity = isFuture ? "0.52" : "1";
            item.band.setAttribute("fill", isCurrent ? "rgba(47, 109, 182, 0.34)" : "transparent");
            item.band.setAttribute("stroke", isCurrent ? item.rc.stroke : "none");
            item.arrowLine.setAttribute("stroke-width", isCurrent ? "2.8" : "1.8");
          });

          const m = steps[curIdx];
          const fromName = laneMap[m.from]?.name || m.from;
          const toName = laneMap[m.to]?.name || m.to;
          sayBox.innerHTML = `<span class="stepn">STEP ${curIdx + 1} OF ${steps.length} &middot; ${esc(fromName)} &rarr; ${esc(toName)}</span>${formatProse(m.say)}`;

          scrWrap.innerHTML = screens[curIdx]
            ? `<span class="slowmo-sub-label">${esc(sec.screenLabel || "What you see")}</span><div class="slowmo-screen">${screens[curIdx]}</div>`
            : "";

          stWrap.innerHTML = states[curIdx]
            ? `<span class="slowmo-sub-label">${esc(sec.stateLabel || "Live state")} (yellow = changed)</span>${renderStateHTML(states[curIdx], curIdx > 0 ? states[curIdx - 1] : null)}`
            : "";
        }

        function stopPlay() {
          if (timer) {
            clearInterval(timer);
            timer = null;
          }
          playBtn.innerHTML = "&#9654; Play";
          playBtn.setAttribute("aria-label", "Play slow-motion steps");
        }

        function togglePlay() {
          if (timer) {
            stopPlay();
            return;
          }
          if (curIdx === steps.length - 1) renderStep(0);
          playBtn.innerHTML = "&#10074;&#10074; Pause";
          playBtn.setAttribute("aria-label", "Pause");
          timer = setInterval(() => {
            if (curIdx >= steps.length - 1) {
              stopPlay();
            } else {
              renderStep(curIdx + 1);
            }
          }, 2200 / speed);
        }

        mountEl.addEventListener("click", (e) => {
          const actionBtn = e.target.closest("[data-a]");
          if (!actionBtn) return;
          const a = actionBtn.getAttribute("data-a");
          if (a === "first") { stopPlay(); renderStep(0); }
          if (a === "prev") { stopPlay(); renderStep(curIdx - 1); }
          if (a === "next") { stopPlay(); renderStep(curIdx + 1); }
          if (a === "play") { togglePlay(); }
        });

        rangeEl.addEventListener("input", () => {
          stopPlay();
          renderStep(Number(rangeEl.value));
        });

        speedSel.addEventListener("change", () => {
          speed = Number(speedSel.value) || 1;
          if (timer) {
            stopPlay();
            togglePlay();
          }
        });

        msgGroups.forEach((item, idx) => {
          item.g.addEventListener("click", () => {
            stopPlay();
            renderStep(idx);
          });
        });

        renderStep(0);

        if (stageEl) {
          stageControllers.set(stageEl, {
            stepsCount: steps.length,
            getCurIdx: () => curIdx,
            setStep: (idx) => { stopPlay(); renderStep(idx); },
            next: () => { stopPlay(); renderStep(curIdx + 1); },
            prev: () => { stopPlay(); renderStep(curIdx - 1); },
            togglePlay,
            stopPlay
          });
        }
      });
    } catch (err) {
      console.error("Failed to initialize code-slowmo stages:", err);
    }
  }

  // --- 4. Full-Screen Stage Open / Close / Switch & Tab Controls ---
  function openStageFullScreen(stageEl) {
    if (!stageEl) return;
    allStages.forEach((other) => {
      if (other !== stageEl && other.classList.contains("is-expanded")) {
        stageControllers.get(other)?.stopPlay();
        other.classList.remove("is-expanded");
      }
    });
    stageEl.classList.add("is-expanded");
    document.body.classList.add("has-expanded-slowmo");

    // Highlight matching Full-Screen switcher button inside this stage
    const stageId = stageEl.getAttribute("data-stage-id") || "";
    stageEl.querySelectorAll("[data-fs-switch]").forEach((btn) => {
      btn.classList.toggle("is-current", btn.getAttribute("data-fs-switch") === stageId);
    });

    const closeBtn = stageEl.querySelector("[data-slowmo-close]");
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  }

  function closeStageFullScreen(stageEl) {
    if (!stageEl) return;
    stageControllers.get(stageEl)?.stopPlay();
    stageEl.classList.remove("is-expanded");
    document.body.classList.remove("has-expanded-slowmo");
    if (tip) tip.hidden = true;
    stageEl.scrollIntoView({ behavior: "auto", block: "center" });
    const launchBtn = stageEl.querySelector("[data-slowmo-open]");
    if (launchBtn) launchBtn.focus({ preventScroll: true });
  }

  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-slowmo-open]");
    if (openBtn) {
      const stageEl = openBtn.closest(".slowmo-stage");
      openStageFullScreen(stageEl);
      return;
    }

    const closeBtn = e.target.closest("[data-slowmo-close]");
    if (closeBtn) {
      const stageEl = closeBtn.closest(".slowmo-stage");
      closeStageFullScreen(stageEl);
      return;
    }

    const switchBtn = e.target.closest("[data-fs-switch]");
    if (switchBtn) {
      const targetStageId = switchBtn.getAttribute("data-fs-switch");
      const nextStage = document.querySelector(`.slowmo-stage[data-stage-id="${targetStageId}"]`);
      if (nextStage) openStageFullScreen(nextStage);
      return;
    }

    const tabBtn = e.target.closest(".slowmo-tab-btn[data-journey-tab]");
    if (tabBtn) {
      const stageEl = tabBtn.closest(".slowmo-stage");
      if (!stageEl) return;
      const targetTab = tabBtn.getAttribute("data-journey-tab");
      stageEl.querySelectorAll(".slowmo-tab-btn[data-journey-tab]").forEach((btn) => {
        btn.setAttribute("aria-selected", btn === tabBtn ? "true" : "false");
      });
      stageEl.querySelectorAll(".slowmo-pane[data-pane]").forEach((pane) => {
        pane.hidden = pane.getAttribute("data-pane") !== targetTab;
      });
    }
  });

  document.addEventListener("keydown", (e) => {
    const openStage = document.querySelector(".slowmo-stage.is-expanded");
    if (!openStage) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeStageFullScreen(openStage);
      return;
    }

    const ctrl = stageControllers.get(openStage);
    if (!ctrl) return;

    const activeTag = document.activeElement?.tagName || "";
    const inFormControl = ["INPUT", "SELECT", "TEXTAREA"].includes(activeTag);

    if (!inFormControl && e.key === "ArrowRight") {
      e.preventDefault();
      ctrl.next();
    } else if (!inFormControl && e.key === "ArrowLeft") {
      e.preventDefault();
      ctrl.prev();
    } else if (!inFormControl && activeTag !== "BUTTON" && e.key === " ") {
      e.preventDefault();
      ctrl.togglePlay();
    }
  });

  // --- 5. True Scrollytelling: Sticky Rail Highlight + Scroll-Driven Preview ---
  const railBtns = Array.from(document.querySelectorAll(".scene-jump-btn[data-scene-target]"));
  const beatEls = Array.from(document.querySelectorAll(".journey-beat[data-beat-idx]"));

  function setActiveRailIdx(idxStr) {
    railBtns.forEach((b) => {
      if (b.getAttribute("data-scene-target") === idxStr) {
        b.setAttribute("aria-current", "step");
      } else {
        b.removeAttribute("aria-current");
      }
    });
  }

  railBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-scene-target");
      setActiveRailIdx(targetId);
      const targetEl = document.getElementById(`journey-${targetId}`);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: prefersReducedMotion.matches ? "auto" : "smooth",
          block: "start"
        });
      }
    });
  });

  if ("IntersectionObserver" in window && beatEls.length > 0) {
    const railObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const idx = visible[0].target.getAttribute("data-beat-idx");
          if (idx) setActiveRailIdx(idx);
        }
      },
      { rootMargin: "-18% 0px -55% 0px", threshold: [0, 0.25] }
    );
    beatEls.forEach((elNode) => railObserver.observe(elNode));
  }

  // Ambient scroll-linked step progression while stages are inline on the page
  let scrollTicking = false;
  function updateScrollDrivenPreviews() {
    scrollTicking = false;
    if (prefersReducedMotion.matches || document.body.classList.contains("has-expanded-slowmo")) {
      return;
    }
    const vh = window.innerHeight || 800;
    allStages.forEach((stageEl) => {
      if (stageEl.classList.contains("is-expanded")) return;
      const ctrl = stageControllers.get(stageEl);
      if (!ctrl || ctrl.stepsCount <= 1) return;
      const r = stageEl.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;

      // Progress 0 when stage top enters lower 78% of viewport -> 1 when stage reaches upper 18%
      const startY = vh * 0.78;
      const endY = vh * 0.14;
      const raw = (startY - r.top) / Math.max(1, startY - endY);
      const clamped = Math.max(0, Math.min(0.999, raw));
      const targetStep = Math.floor(clamped * ctrl.stepsCount);
      if (targetStep !== ctrl.getCurIdx()) {
        ctrl.setStep(targetStep);
      }
    });
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        scrollTicking = true;
        window.requestAnimationFrame(updateScrollDrivenPreviews);
      }
    },
    { passive: true }
  );

  // --- 6. Interactive BYOK & Co-Founder Contribution Simulator ---
  const calcInputs = Array.from(document.querySelectorAll("[data-calc-input]"));

  function formatUsdK(val) {
    return `$${val}K`;
  }

  function updateEquityCalculator() {
    const f1Stake = Number(document.getElementById("f1-stake")?.value ?? 4);
    const f2Stake = Number(document.getElementById("f2-stake")?.value ?? 6);
    const f3Stake = Number(document.getElementById("f3-stake")?.value ?? 5);

    const f1Prs = Number(document.getElementById("f1-prs")?.value ?? 15);
    const f2Prs = Number(document.getElementById("f2-prs")?.value ?? 30);
    const f3Prs = Number(document.getElementById("f3-prs")?.value ?? 15);

    const rawSpend = f1Stake + f2Stake + f3Stake;
    const rawPrs = f1Prs + f2Prs + f3Prs;
    const totalApiSpend = Math.max(rawSpend, 1);
    const totalPrs = Math.max(rawPrs, 1);

    const founders = [
      { idx: 1, login: "@architect-1", stake: f1Stake, prs: f1Prs },
      { idx: 2, login: "@builder-2", stake: f2Stake, prs: f2Prs },
      { idx: 3, login: "@cofounder-3", stake: f3Stake, prs: f3Prs }
    ].map((f) => {
      const fiscalShare = rawSpend > 0 ? f.stake / totalApiSpend : 0;
      const archYield = rawPrs > 0 ? f.prs / totalPrs : 0;
      const blendedEquity = 0.5 * fiscalShare + 0.5 * archYield;
      return {
        ...f,
        fiscalPct: (fiscalShare * 100).toFixed(1),
        archPct: (archYield * 100).toFixed(1),
        equityPct: (blendedEquity * 100).toFixed(1)
      };
    });

    founders.forEach((f) => {
      const stakeLabel = document.getElementById(`f${f.idx}-stake-val`);
      const prsLabel = document.getElementById(`f${f.idx}-prs-val`);
      const readoutEl = document.getElementById(`f${f.idx}-readout`);
      if (stakeLabel) stakeLabel.textContent = formatUsdK(f.stake);
      if (prsLabel) prsLabel.textContent = `${f.prs} PRs`;
      if (readoutEl) {
        readoutEl.textContent = `Fiscal ${f.fiscalPct}% + Arch ${f.archPct}% -> ${f.equityPct}% Share`;
      }
    });

    const poolValEl = document.getElementById("calc-monthly-pool");
    const prsValEl = document.getElementById("calc-total-prs");
    if (poolValEl) poolValEl.textContent = formatUsdK(rawSpend);
    if (prsValEl) prsValEl.textContent = `${rawPrs} Merged PRs`;
  }

  calcInputs.forEach((input) => {
    input.addEventListener("input", updateEquityCalculator);
  });
  if (calcInputs.length > 0) updateEquityCalculator();
})();
