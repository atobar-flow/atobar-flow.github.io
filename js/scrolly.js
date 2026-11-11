/**
 * ATOBAR-FLOW INTERACTIVE ENGINE (js/scrolly.js)
 * Single-column vertical scroll + embedded code-slowmo User Journey player:
 * 1. code-slowmo step-by-step interactive flow diagrams for User Journeys J1-J6
 * 2. Interactive [AS-BUILT] / [VISION] Reality Filter (grounded against ../atobar-flow)
 * 3. Per-Journey 3-Tab Switcher (1. Slow-Mo Journey / 2. Code Artifact / 3. DB Boundary)
 * 4. Interactive Co-Founder BYOK Equity Simulator (50% Fiscal Share + 50% Architectural Yield, low units)
 * 5. Mermaid Source & CLI One-Liner Clipboard Copy
 */

(function initAtobarSite() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const NS = "http://www.w3.org/2000/svg";
  const SVGT = new Set(["svg", "g", "rect", "text", "path", "line", "circle", "polygon", "tspan"]);

  function el(tag, attrs = {}, parent = null, text = null) {
    const node = SVGT.has(tag) ? document.createElementNS(NS, tag) : document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v != null) node.setAttribute(k, v);
    }
    if (text != null) node.textContent = text;
    if (parent) parent.appendChild(node);
    return node;
  }

  function esc(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // --- 1. Clipboard Copy Helper ---
  async function copyTextWithFeedback(btn, textToCopy, successLabel = "Copied ✓") {
    const originalLabel = btn.dataset.originalLabel || btn.textContent;
    btn.dataset.originalLabel = originalLabel;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const ta = document.createElement("textarea");
        ta.value = textToCopy;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      btn.textContent = successLabel;
      setTimeout(() => {
        btn.textContent = originalLabel;
      }, 1800);
    } catch (_err) {
      btn.textContent = "Press Ctrl+C";
    }
  }

  document.addEventListener("click", (e) => {
    const copyCmdBtn = e.target.closest("[data-copy-text]");
    if (copyCmdBtn) {
      copyTextWithFeedback(copyCmdBtn, copyCmdBtn.getAttribute("data-copy-text"), "Copied Command ✓");
      return;
    }

    const copyMermaidBtn = e.target.closest("[data-copy-mermaid]");
    if (copyMermaidBtn) {
      const sourceId = copyMermaidBtn.getAttribute("data-copy-mermaid");
      const scriptEl = document.getElementById(sourceId);
      if (scriptEl) {
        copyTextWithFeedback(copyMermaidBtn, scriptEl.textContent.trim(), "Copied Mermaid ✓");
      }
    }
  });

  // --- 2. Topbar Status Reality Filter ([AS-BUILT] / [VISION] ONLY) ---
  const filterBtns = Array.from(document.querySelectorAll(".filter-btn[data-filter]"));
  const filterBanner = document.getElementById("filter-banner");
  const filterBannerText = document.getElementById("filter-banner-text");
  const filterResetBtn = document.getElementById("filter-reset-btn");

  const FILTER_DESCRIPTIONS = {
    "as-built": "[AS-BUILT] — Verified in atobar-flow main: KMS AES-GCM BYOK vault with per-repo/per-role routing, 4-role Spot loop, warm developer worktrees, fresh X11 Evaluator, pure Python arbitrate(), SotaWiki Mermaid, and 1-commit exit.",
    "vision": "[VISION] — Roadmap & open Jumbo specs (J53/J54): per-invoking-user BYOK billing & profile default keys, unonboarded trigger gate, verifiable price catalog & Fiscal/Architectural equity ledger, multi-repo venture links, and Android KVM QA profile."
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
    const matchingNodes = document.querySelectorAll(`[data-status*="${filterKey}"]`);
    if (filterBanner && filterBannerText) {
      filterBanner.hidden = false;
      filterBannerText.textContent = `Showing ${matchingNodes.length} elements tagged ${FILTER_DESCRIPTIONS[filterKey] || filterKey}`;
    }
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => applyRealityFilter(btn.dataset.filter));
  });

  if (filterResetBtn) {
    filterResetBtn.addEventListener("click", () => applyRealityFilter("all"));
  }

  // --- 3. Per-Journey Tab Switcher & Full-Browser Expand Toggle ---
  function setSlowmoExpanded(stageEl, expand) {
    if (!stageEl) return;
    stageEl.classList.toggle("is-expanded", expand);
    document.body.classList.toggle("has-expanded-slowmo", expand);
    stageEl.querySelectorAll("[data-slowmo-expand]").forEach((btn) => {
      btn.setAttribute("aria-expanded", expand ? "true" : "false");
      btn.innerHTML = expand ? "Exit Full Browser (Esc) &#10005;" : "Expand to Full Browser &#10530;";
    });
    if (!expand) {
      stageEl.scrollIntoView({ behavior: "auto", block: "nearest" });
    }
  }

  document.addEventListener("click", (e) => {
    const expandBtn = e.target.closest("[data-slowmo-expand]");
    if (expandBtn) {
      const stageEl = expandBtn.closest(".slowmo-stage");
      const isExpanded = stageEl?.classList.contains("is-expanded");
      // Collapse any other expanded stage first
      document.querySelectorAll(".slowmo-stage.is-expanded").forEach((other) => {
        if (other !== stageEl) setSlowmoExpanded(other, false);
      });
      setSlowmoExpanded(stageEl, !isExpanded);
      return;
    }

    const tabBtn = e.target.closest(".slowmo-tab-btn[data-journey-tab]");
    if (!tabBtn) return;
    const stageEl = tabBtn.closest(".slowmo-stage");
    if (!stageEl) return;
    const targetTab = tabBtn.getAttribute("data-journey-tab");

    stageEl.querySelectorAll(".slowmo-tab-btn[data-journey-tab]").forEach((btn) => {
      btn.setAttribute("aria-selected", btn === tabBtn ? "true" : "false");
    });

    stageEl.querySelectorAll(".slowmo-pane[data-pane]").forEach((pane) => {
      pane.hidden = pane.getAttribute("data-pane") !== targetTab;
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const openStage = document.querySelector(".slowmo-stage.is-expanded");
      if (openStage) {
        e.preventDefault();
        setSlowmoExpanded(openStage, false);
      }
    }
  });

  // --- 4. Embedded code-slowmo Interactive User Journey Engine ---
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

      // Hover tooltip for code.term
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
        const x = Math.min(window.innerWidth - tw - 10, Math.max(10, r.left));
        let y = r.bottom + 8;
        if (y + th > window.innerHeight - 10) y = r.top - th - 8;
        tip.style.left = `${x}px`;
        tip.style.top = `${y}px`;
      }

      document.addEventListener("mouseover", (e) => {
        const t = e.target.closest?.("code.term");
        if (t) showTip(t);
      });
      document.addEventListener("mouseout", (e) => {
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
            <button type="button" class="tbtn" data-a="play" aria-label="Play slow-motion steps">&#9654;</button>
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
            <button type="button" class="slowmo-expand-btn" data-slowmo-expand aria-expanded="false">Expand to Full Browser &#10530;</button>
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

        const laneW = Math.max(120, ...lanes.map((l) => l.name.length * 8.2 + 28));
        const X = {};
        lanes.forEach((l, idx) => {
          X[l.id] = 42 + laneW / 2 + idx * laneW;
        });
        const loopRight = Math.max(
          0,
          ...steps
            .filter((m) => m.from === m.to && X[m.from] != null)
            .map((m) => X[m.from] + 34 + String(m.label).length * 7.2 + 16)
        );
        const top = 58;
        const rowH = 48;
        const W = Math.max(42 + laneW * lanes.length + 32, loopRight);
        const H = top + steps.length * rowH + 18;

        const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": sec.title }, svgBox);

        lanes.forEach((l) => {
          const x = X[l.id];
          const rc = roleColors[l.role] || roleColors.fe;
          el("line", { x1: x, y1: 42, x2: x, y2: H - 6, stroke: "#2b3e6e", "stroke-dasharray": "3 4" }, svg);
          const g = el("g", {}, svg);
          const w = Math.min(laneW - 8, l.name.length * 8.2 + 20);
          el("rect", { x: x - w / 2, y: 10, width: w, height: 30, rx: 4, fill: rc.fill, stroke: rc.stroke, "stroke-width": "1.6" }, g);
          el("text", { x, y: 29, "text-anchor": "middle", fill: "#f3f4f9", "font-size": "12.5", "font-weight": "700" }, g, l.name);
        });

        const msgGroups = steps.map((m, k) => {
          const yy = top + k * rowH + 22;
          const role = laneMap[m.from]?.role || "fe";
          const rc = roleColors[role] || roleColors.fe;

          if (m.phase) {
            el("line", { x1: 0, y1: yy - 22, x2: W, y2: yy - 22, stroke: "#233663" }, svg);
            el("text", { x: W - 8, y: yy - 9, "text-anchor": "end", fill: "#7fb8eb", "font-family": "monospace", "font-size": "10.5", "font-weight": "700" }, svg, String(m.phase).toUpperCase());
          }

          const g = el("g", { style: "cursor:pointer" }, svg);
          const band = el("rect", { x: 2, y: yy - 20, width: W - 4, height: rowH - 4, rx: 4, fill: "transparent" }, g);
          const x1 = X[m.from];
          const x2 = X[m.to];
          let arrowLine;
          let arrowHead;

          if (m.from === m.to) {
            arrowLine = el("path", { d: `M${x1} ${yy - 6}h26v12h-22`, fill: "none", stroke: rc.stroke, "stroke-width": "1.8" }, g);
            arrowHead = el("polygon", { points: `${x1 + 2},${yy + 6} ${x1 + 9},${yy + 2} ${x1 + 9},${yy + 10}`, fill: rc.stroke }, g);
            el("text", { x: x1 + 32, y: yy + 4, fill: "#f3f4f9", "font-size": "12", "font-weight": "600", style: "paint-order:stroke;stroke:#0d183b;stroke-width:4px;stroke-linejoin:round" }, g, m.label);
          } else {
            const dir = x2 > x1 ? 1 : -1;
            const xe = x2 - dir * 3;
            arrowLine = el("line", { x1, y1: yy, x2: xe - dir * 6, y2: yy, stroke: rc.stroke, "stroke-width": "1.8" }, g);
            arrowHead = el("polygon", { points: `${xe},${yy} ${xe - dir * 8},${yy - 4} ${xe - dir * 8},${yy + 4}`, fill: rc.stroke }, g);
            el("text", { x: (x1 + x2) / 2, y: yy - 7, "text-anchor": "middle", fill: "#f3f4f9", "font-size": "12", "font-weight": "600", style: "paint-order:stroke;stroke:#0d183b;stroke-width:4px;stroke-linejoin:round" }, g, m.label);
          }
          el("text", { x: 8, y: yy + 4, fill: "#a9b6d8", "font-family": "monospace", "font-size": "11", "font-weight": "700" }, g, `${k + 1}.`);
          return { g, band, arrowLine, arrowHead, rc };
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

          msgGroups.forEach((item, j) => {
            const isCurrent = j === curIdx;
            const isFuture = j > curIdx;
            item.g.style.opacity = isFuture ? "0.38" : "1";
            item.band.setAttribute("fill", isCurrent ? "rgba(47, 109, 182, 0.28)" : "transparent");
            item.band.setAttribute("stroke", isCurrent ? item.rc.stroke : "none");
            item.arrowLine.setAttribute("stroke-width", isCurrent ? "2.6" : "1.5");
          });

          const m = steps[curIdx];
          const fromName = laneMap[m.from]?.name || m.from;
          const toName = laneMap[m.to]?.name || m.to;
          sayBox.innerHTML = `<span class="stepn">STEP ${curIdx + 1} OF ${steps.length} · ${esc(fromName)} &rarr; ${esc(toName)}</span>${formatProse(m.say)}`;

          scrWrap.innerHTML = screens[curIdx]
            ? `<span class="slowmo-sub-label">${esc(sec.screenLabel || "What you see")}</span><div class="slowmo-screen">${screens[curIdx]}</div>`
            : "";

          stWrap.innerHTML = states[curIdx]
            ? `<span class="slowmo-sub-label">${esc(sec.stateLabel || "Database state right now")} (yellow = changed)</span>${renderStateHTML(states[curIdx], curIdx > 0 ? states[curIdx - 1] : null)}`
            : "";
        }

        function stopPlay() {
          if (timer) {
            clearInterval(timer);
            timer = null;
          }
          playBtn.innerHTML = "&#9654;";
          playBtn.setAttribute("aria-label", "Play slow-motion steps");
        }

        function togglePlay() {
          if (timer) {
            stopPlay();
            return;
          }
          if (curIdx === steps.length - 1) renderStep(0);
          playBtn.innerHTML = "&#10074;&#10074;";
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
      });
    } catch (err) {
      console.error("Failed to initialize code-slowmo user journeys:", err);
    }
  }

  // --- 5. Journey Jump Buttons ---
  const railBtns = Array.from(document.querySelectorAll(".scene-jump-btn[data-scene-target]"));
  railBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-scene-target");
      railBtns.forEach((b) => {
        if (b === btn) b.setAttribute("aria-current", "step");
        else b.removeAttribute("aria-current");
      });
      const targetEl = document.getElementById(`journey-${targetId}`);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: prefersReducedMotion.matches ? "auto" : "smooth",
          block: "start"
        });
      }
    });
  });

  // --- 6. Interactive Co-Founder BYOK Equity Simulator (50% Fiscal Share + 50% Architectural Yield, Low Numbers) ---
  const calcInputs = Array.from(document.querySelectorAll("[data-calc-input]"));

  function updateEquityCalculator() {
    const f1Stake = Number(document.getElementById("f1-stake")?.value || 40);
    const f2Stake = Number(document.getElementById("f2-stake")?.value || 60);
    const f3Stake = Number(document.getElementById("f3-stake")?.value || 50);

    const f1Prs = Number(document.getElementById("f1-prs")?.value || 3);
    const f2Prs = Number(document.getElementById("f2-prs")?.value || 6);
    const f3Prs = Number(document.getElementById("f3-prs")?.value || 3);

    const totalApiSpend = Math.max(f1Stake + f2Stake + f3Stake, 1);
    const totalPrs = Math.max(f1Prs + f2Prs + f3Prs, 1);

    const founders = [
      { idx: 1, login: "@cofounder-1 (P1 Founding Architect)", stake: f1Stake, prs: f1Prs },
      { idx: 2, login: "@builder-2 (P2 Software Builder)", stake: f2Stake, prs: f2Prs },
      { idx: 3, login: "@cofounder-3 (P1 Co-Founder)", stake: f3Stake, prs: f3Prs }
    ].map((f) => {
      const fiscalShare = f.stake / totalApiSpend;
      const archYield = f.prs / totalPrs;
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
      if (stakeLabel) stakeLabel.textContent = `$${f.stake}`;
      if (prsLabel) prsLabel.textContent = `${f.prs} PRs`;
      if (readoutEl) {
        readoutEl.textContent = `Fiscal ${f.fiscalPct}% · Arch ${f.archPct}% → Combined Share ${f.equityPct}%`;
      }
    });

    const poolValEl = document.getElementById("calc-monthly-pool");
    const prsValEl = document.getElementById("calc-total-prs");
    if (poolValEl) poolValEl.textContent = `$${totalApiSpend}`;
    if (prsValEl) prsValEl.textContent = `${totalPrs} Merged PRs`;

    const ledgerJsonCode = document.getElementById("scene6-live-ledger-json");
    if (ledgerJsonCode) {
      const ledgerPayload = {
        attribution_formula: "0.5 * Fiscal_Share + 0.5 * Architectural_Yield",
        total_byok_usage_usd: totalApiSpend,
        total_merged_prs: totalPrs,
        collaborators: founders.map((f) => ({
          github_login: f.login.split(" ")[0],
          byok_spend_usd: f.stake,
          merged_prs_attributed: f.prs,
          fiscal_share_pct: Number(f.fiscalPct),
          architectural_yield_pct: Number(f.archPct),
          combined_share_pct: Number(f.equityPct)
        }))
      };
      ledgerJsonCode.textContent = JSON.stringify(ledgerPayload, null, 2);
    }
  }

  calcInputs.forEach((input) => {
    input.addEventListener("input", updateEquityCalculator);
  });
  updateEquityCalculator();
})();
