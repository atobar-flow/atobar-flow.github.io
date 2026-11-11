# `atobar-flow.github.io` — Agentic Teams On BYOK And Repos (ATOBAR)

Public GitHub Pages website and interactive **`code-slowmo`** User Journey walkthrough for **[`atobar-flow`](https://github.com/atobar-flow/atobar-flow)** ([`https://atobar.org`](https://atobar.org) / `https://atobar-flow.github.io`).

- **ATOBAR Acronym:** **A**gentic **T**eams **O**n **B**YOK **A**nd **R**epos
- **Main Software-Factory Monorepo:** [`atobar-flow/atobar-flow`](https://github.com/atobar-flow/atobar-flow) (local sibling: [`../atobar-flow`](../atobar-flow/AI.md))
- **Agent Instructions & Skill Shims:** [`AI.md`](AI.md) (symlinked via `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.cursorrules`)

---

## 1. What This Website Covers

Structured as a self-contained, single-column vertical scroll that reflects the complete ATOBAR Product Requirements and Architecture:

1. **Vision, BYOK Cost Routing & Forkability:**
   - Explains how collaborators share KMS-encrypted LLM API keys (**BYOK**) with **per-repo, per-role routing today (`[AS-BUILT]`)** and **per-invoking-user billing & profile default keys on the roadmap (`[VISION]`)**, coordinate strictly through **GitHub Jumbo Issues and Pull Requests**, and keep a **1-commit clean exit**.
   - Explains in plain English that **ATOBAR is 100% open-source (MIT) and fully forkable for any use-case** (web/mobile apps, internal company tools, security/compliance automation, data pipelines, or documentation repos).
2. **Two Target Personas (`P1` & `P2`), Built-In Ledger & Explicit Anti-Goals:**
   - **`P1` (Co-Founder / Founding Early Architect):** Builds iteratively on GitHub, minimizes operational surfaces, and proportionally calculates contributions with co-founders.
   - **`P2` (Software Builder):** Runs, steers, and verifies long-running agentic coding and visual QA jobs (`PLANNER -> DEVELOPER -> EVALUATOR -> ARBITRATOR`).
3. **End-to-End User Journeys (`J1`–`J6`) Powered by `code-slowmo`:**
   - Each major User Journey (`J1` through `J6`) embeds an interactive **`code-slowmo`** slow-motion sequence diagram (with step transport controls, live screen preview, and yellow-highlighted database state diffs), alongside concrete code artifacts and single-writer DB boundary specs.
   - Journey `J5` includes the **Interactive Co-Founder BYOK Equity Simulator (50% Fiscal Share + 50% Architectural Yield)**.
4. **Functional (`FR-1`–`FR-7`) & Non-Functional Requirements (`NFR-1`–`NFR-4`) + Architecture:**
   - Complete requirements tables, 5-package monorepo boundary table (`tests/test_boundaries.py`), and Single-Writer Database Ownership Matrix (`CP_OWNED_TABLES` vs. `FE_OWNED_TABLES` + `FE_OWNED_RPCS`, `tests/test_table_ownership.py`).
5. **Interactive Reality Filter (`All` · `[AS-BUILT]` · `[VISION]`):**
   - Highlights what runs on `main` in `atobar-flow` today vs. the `[VISION]` roadmap.

---

## 2. Repository Structure & Cross-Agent `code-slowmo` Skill Shims

```text
.
├── .nojekyll                              # Bypass Jekyll processing for direct static GitHub Pages serving
├── AI.md                                  # Canonical agent instructions (shimmed by AGENTS.md, CLAUDE.md, GEMINI.md, .cursorrules)
├── .pi/skills/code-slowmo/                # Canonical code-slowmo skill (build.py, check_text.py, template.html)
├── .claude/skills/code-slowmo             # Symlink -> ../../.pi/skills/code-slowmo
├── .agents/skills/code-slowmo             # Symlink -> ../../.pi/skills/code-slowmo
├── .gemini/skills/code-slowmo             # Symlink -> ../../.pi/skills/code-slowmo
├── .agent/skills/code-slowmo              # Symlink -> ../../.pi/skills/code-slowmo
├── explainers/
│   ├── user-journeys.json                 # Validated code-slowmo data for User Journeys J1-J6
│   └── user-journeys.html                 # Standalone code-slowmo explainer built by build.py
├── index.html                             # Single-column vertical scroll with embedded code-slowmo journeys
├── css/
│   ├── tokens.css                         # OKLCH color palette sampled from images/atobar-logo.jpeg
│   └── site.css                           # Single-column layout, code-slowmo stage & reduced-motion rules
├── js/
│   └── scrolly.js                         # Embedded code-slowmo player, [AS-BUILT]/[VISION] filter & equity simulator
└── images/
    ├── atobar-logo.jpeg                   # 2048x2048 pixel-art wolf crest (#edeef3 Ice Mist outer canvas)
    └── favicon.png                        # 64x64 crisp downsampled icon
```

---

## 3. Local Preview & Verification Commands

```bash
# 1. Validate & rebuild the code-slowmo User Journeys explainer (0 errors, 0 warnings):
python3 .pi/skills/code-slowmo/scripts/build.py explainers/user-journeys.json explainers/user-journeys.html

# 2. Run the Impeccable anti-slop & contrast detector:
node ~/.agents/skills/impeccable/scripts/detect.mjs --json index.html css/

# 3. Serve locally:
python3 -m http.server 8080 --directory ~/projects/atobar-flow.github.io
```

---

## License

MIT — see [`LICENSE`](LICENSE).
