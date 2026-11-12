# AI Agent Instructions — `atobar-flow.github.io` (Agentic Teams On BYOK And Repos)

If you are an AI assistant (Claude, GPT, Gemini, Cursor, Cline, Devin, `pi`, Antigravity, etc.) operating in this repository, read this file before taking any action.

## 1. Sibling Repository Separation (`../atobar-flow` vs. `../atobar-flow.github.io`)

Assuming collaboration takes place in `~/projects/`, the **ATOBAR** (**"Agentic Teams On BYOK And Repos"**) initiative is split across two strictly separated sibling repositories:

- **This repository (`../atobar-flow.github.io`)** — Public GitHub Pages website ([`https://atobar.org`](https://atobar.org) / `https://atobar-flow.github.io`, repo `atobar-flow/atobar-flow.github.io`). Contains static web assets (`index.html`, `css/`, `js/`, `explainers/`, and brand imagery under `images/atobar-logo.jpeg`). Zero Python runtime services or secrets live here.
- **Main Factory Repository ([`../atobar-flow`](../atobar-flow/AI.md))** — The 5-package Python software factory (`contracts`, `flow-engine`, `control-panel`, `flow-agent`, `atobar-ops`). Its agent operating rules live in [`../atobar-flow/AI.md`](../atobar-flow/AI.md) and [`../atobar-flow/AGENTS.md`](../atobar-flow/AGENTS.md).

## 2. Canonical Repo-Level Skills & Cross-Agent Shims (`.pi/skills/code-slowmo`)

Canonical agent skills in this repository live under **`.pi/skills/`** with relative symlink shims so every coding agent picks them up automatically:

- **Canonical Skill Directory:** [`.pi/skills/code-slowmo/SKILL.md`](.pi/skills/code-slowmo/SKILL.md) (`precious112/code-slowmo`)
- **Cross-Agent Skill Symlinks:**
  - `.claude/skills/code-slowmo` &rarr; `../../.pi/skills/code-slowmo` (Claude Code / Devin)
  - `.agents/skills/code-slowmo` &rarr; `../../.pi/skills/code-slowmo` (Universal / Gemini CLI / Codex)
  - `.gemini/skills/code-slowmo` &rarr; `../../.pi/skills/code-slowmo` (Gemini)
  - `.agent/skills/code-slowmo` &rarr; `../../.pi/skills/code-slowmo` (Antigravity)
- **Root Instruction Symlinks:** `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, and `.cursorrules` all symlink to `AI.md`.

When updating User Journey and Nano Harness diagrams (`J1`–`J6` + `nano-harness`), edit `explainers/user-journeys.json`, validate with:
```bash
python3 .pi/skills/code-slowmo/scripts/build.py explainers/user-journeys.json explainers/user-journeys.html
```
and synchronize `<script id="slowmo-journeys-data" type="application/json">` in `index.html`.

## 3. Ground-Truth Rules & Design Hygiene

- **Two-state reality labeling (`[AS-BUILT]` vs. `[VISION]`):** Cross-check every claim against the live code in `../atobar-flow/` and open Jumbo issues. Features live on `main` carry `data-status="as-built"`; roadmap and open Jumbo specs (such as `J53` per-invoking-user BYOK billing, `J54` repo lifecycle states, multi-repo Ventures, Android KVM QA, and Co-Founder Fiscal + Architectural splits) carry `data-status="vision"`. Never use compound `data-status="as-built vision"` attributes so the Reality Filter stays mutually exclusive.
- **Single-column narrative + wide Full-Screen Slow-Mo stages:** Keep narrative prose in `index.html` strictly single-column (`max-width: 920px`) while `code-slowmo` stages widen on desktop (`.scrolly-wide`) and launch Full-Screen Theater Mode on hover/click. Link canonical Architect Spec Sheets (`docs/PRD.md`, `docs/HLD.md`, `docs/SWARM_ARCHITECTURE.md`, `docs/ONBOARDING.md`) upstream on `atobar-flow/atobar-flow` instead of embedding dense reference tables.
- **Brand asset anchor:** Derive color tokens in OKLCH from [`images/atobar-logo.jpeg`](images/atobar-logo.jpeg) (`#edeef3` Ice Mist canvas, `#15265c` Crest Deep Navy, `#2f6db6` Royal Cobalt, `#ff7ab7` Rebel Pink, `#7fb8eb` Sky Cyan).
- **Clean git tree:** Never commit macOS `.DS_Store`, `._*` resource forks, editor swap files, or temporary screenshots.
