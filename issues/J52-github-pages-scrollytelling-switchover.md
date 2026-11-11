# J52 (github-pages-scrollytelling-switchover): Launch `atobar-flow.github.io` — Developer-First Scrollytelling & Co-Founder BYOK Pitch Website (Repo Switchover)

- **Priority:** P0 (Public Launch & Narrative Surface for `https://atobar-flow.github.io`)
- **Milestone:** M07 / M12 (Externalization, Scrollytelling & Co-Founder BYOK Value Chain)
- **Switchover Target Repo:** `~/projects/atobar-flow.github.io` (`https://github.com/atobar-flow/atobar-flow.github.io`)
- **Upstream Source-of-Truth Repo:** `~/projects/atobar-flow` (`https://github.com/arsenyspb/atobar-flow`, J51 `#370`)

---

## 0. MANDATE: Refresh Ground Realities Before Implementation (READ FIRST)

> **STOP — Mandatory Pre-Implementation Refresh**
> Because `atobar-flow` (`../atobar-flow`) and `atobar-flow.github.io` (`../atobar-flow.github.io`) evolve in parallel, any agent or contributor picking up this Jumbo Issue **MUST** execute the following reality-refresh checklist before writing a single line of HTML, CSS, or SVG:
>
> 1. **Switch CWD & Verify Sibling Layout:**
>    ```bash
>    cd ~/projects/atobar-flow.github.io
>    pwd && ls -la && ls -la ../atobar-flow/docs/
>    ```
>    **Switchover Rule:** From this issue onward, **all** website branches, commits, local previews, and PRs happen exclusively inside `~/projects/atobar-flow.github.io`. `../atobar-flow` is read-only reference material for this track.
> 2. **Sync Upstream Factory Truth (`../atobar-flow`):**
>    - Check git state and open/merged Jumbos in `../atobar-flow`:
>      ```bash
>      git -C ../atobar-flow fetch origin
>      git -C ../atobar-flow log -n 5 --oneline origin/main
>      gh -R arsenyspb/atobar-flow issue list --state all --limit 15
>      gh -R arsenyspb/atobar-flow pr list --state all --limit 15
>      ```
>    - Read `../atobar-flow/docs/PRD.md` and `../atobar-flow/docs/HLD.md` (introduced in J51 `#370`).
>    - **Audit Status Badges:** Check whether `[IN PR]` items (specifically **J48 `#360` / `#364` Janitor-Sourced Verifiable Price Catalog & Spot Cost Settlement**) or any `[VISION]` items have merged to `main` since this issue was authored. If merged, upgrade their website badges from `[IN PR]` to `[AS-BUILT]` and cite the live module/table names.
> 3. **Verify Codebase Contracts Against Copy:**
>    - Confirm package boundaries in `../atobar-flow/tests/test_boundaries.py` (`contracts`, `flow-engine`, `control-panel`, `flow-agent`, `atobar-ops`) and table ownership in `../atobar-flow/tests/test_table_ownership.py` (`CP_OWNED_TABLES` vs. `FE_OWNED_TABLES` / `FE_OWNED_RPCS`).
>    - Confirm `WARM_HANDOVER_FORBIDDEN_ROLES = {"evaluator", "arbitrator"}` in `../atobar-flow/contracts/src/atobar_contracts/conductor_io.py`.
> 4. **Verify Brand Asset Integrity (`images/atobar-logo.jpeg`):**
>    - Confirm `images/atobar-logo.jpeg` (`2048x2048`) is present in `~/projects/atobar-flow.github.io/images/atobar-logo.jpeg` and zero `.DS_Store` files exist (`git status -u`).

---

## 1. Product Marketing Positioning & Narrative Strategy (User-First, Non-Flashy)

### 1.1 Who Reaches This Page & Their State of Mind
Senior staff engineers, technical co-founders, and indie systems architects land on `https://atobar-flow.github.io` with healthy skepticism. They have seen a hundred flashy 2026 "AI agent swarm" landing pages full of neon gradients, vague promises, and zero architectural receipts.

They want three questions answered in under 30 seconds:
1. **What is ATOBAR (`Agentic Teams On BYOK And Repos`) in plain English?**
   A Hub-and-Spoke software factory around GitHub where 2–4 technical co-founders pool their own LLM API keys (**BYOK**, e.g. `$5K/mo × 3 = $15K/mo`), coordinate strictly through **GitHub Jumbo Issues and Pull Requests**, and let isolated AWS EC2 Spot sandboxes (`PLANNER`, `DEVELOPER`, `EVALUATOR`, `ARBITRATOR`) write, visually test (X11/Playwright today; Android KVM next), and squash-merge code.
2. **Why can I trust it with my repo and my API keys?**
   - **Zero Lock-In (1-Commit Exit):** Client repos contain only `.github/workflows/flow-trigger.yml` and `flow-metrics.yml`. Zero runtime SDKs. Delete those two files and your repo is 100% standalone.
   - **Zero LLM in Control, Merge, or Budget Decisions:** `step()` (`machine.py`) and `arbitrate()` (`arbitration.py`) are 100% deterministic Python. `contracts` and `flow-engine` are blocked at CI time (`test_boundaries.py`) from importing any LLM SDK.
   - **Zero-Trust Sandbox Isolation:** `EVALUATOR` never shares a warm VM with `DEVELOPER` (`WARM_HANDOVER_FORBIDDEN_ROLES`), holds a read-only `contents: read` token, and runs on a fresh Spot VM. BYOK keys stay in an AWS KMS (`AES-GCM`) vault with single-use `/llm-key` claim delivery.
   - **Radical Honesty:** Every feature, diagram node, and journey step on the website is explicitly badged **`[AS-BUILT]`**, **`[IN PR]`**, or **`[VISION]`**.
3. **Why does this change startup unit economics?**
   Because AI writes the boilerplate, founder equity among collaborators (even strangers) reduces to two measurable, auditable inputs:
   - **Fiscal Share:** LLM tokens + EC2 Spot compute paid by that founder's staked BYOK keys.
   - **Architectural Yield:** Shipped PRs and goal progress driven by that founder's Jumbo Issues, metric specs, and `@atobar-flow-agent` PR course-corrections.
   Designed for disciplined, time-boxed SaaS ventures: **90-day build ($45K pooled BYOK in) → $100K revenue harvest → clean 1-year sunset**.

---

## 2. Visual Direction & Impeccable Design System (Derived from `images/atobar-logo.jpeg`)

### 2.1 Physical Scene Sentence (Theme Selection)
> *"Three technical co-founders in a daylight workspace with GitHub Pull Request tabs, Mermaid architecture diagrams, and terminal logs open side-by-side, auditing whether an autonomous Spot swarm deserves access to their repositories and $15,000/month of their own API keys."*

This scene forces a **Daylight-First, High-Contrast Architectural Spec Sheet** whose primary canvas matches the exact outer background of `images/atobar-logo.jpeg` (`#edeef3`), paired with **Crest Deep Navy (`#15265c`)** inspection stages for code, envelopes, and runtime sequence diagrams. Because the page background matches the logo's `#edeef3` canvas, the pixel-art wolf crest sits natively on the hero surface without an artificial box or border.

### 2.2 Logo Pantone Extraction & OKLCH Color Tokens
Sampled directly from `~/projects/atobar-flow.github.io/images/atobar-logo.jpeg` (`2048×2048`):

| Token Name | Logo Source Landmark | Hex / RGB | OKLCH Value | Role & Dosage (**Committed** Color Strategy) |
| :--- | :--- | :--- | :--- | :--- |
| `--bg-canvas` | Outer Logo Canvas (Ice Mist) | `#edeef3` `rgb(237,238,243)` | `oklch(0.950 0.007 277.2)` | **Primary page background** (replaces AI-slop warm cream/beige with cool 277° indigo-tinted mist matching logo bitmap). |
| `--bg-surface` | Wolf Halo Cool White | `#f6f7fb` `rgb(246,247,251)` | `oklch(0.976 0.005 277.2)` | Elevated spec panels, comparison tables, and scrollytelling step cards. |
| `--bg-stage-navy` | Outer Crest Ring (Deep Navy) | `#15265c` `rgb(21,38,92)` | `oklch(0.290 0.099 266.8)` | **Sticky Scrollytelling Inspector stage**, architecture diagram canvas, and terminal/envelope blocks. |
| `--bg-stage-indigo` | Inner Crest Sky (Slate Indigo) | `#435d9a` `rgb(67,93,154)` | `oklch(0.487 0.103 265.3)` | Secondary diagram node fills, active step borders on dark navy surfaces. |
| `--ink-primary` | Pixel Outline Ink | `#0c1222` `rgb(12,18,34)` | `oklch(0.185 0.032 266.8)` | Primary body & heading ink on `--bg-canvas` (**15.2:1** contrast ratio). |
| `--ink-secondary` | Beanie Charcoal | `#3b4348` `rgb(59,67,72)` | `oklch(0.380 0.012 225.0)` | Secondary prose, captions, and table metadata (**8.4:1** contrast ratio on `--bg-canvas`). |
| `--ink-muted` | Wolf Fur Slate | `#586063` `rgb(88,96,99)` | `oklch(0.483 0.011 222.2)` | Borders, inactive step markers, and code comments (**5.3:1** contrast ratio — never light gray). |
| `--accent-cobalt` | Wolf Tie Royal Cobalt | `#2f6db6` `rgb(47,109,182)` | `oklch(0.531 0.131 254.5)` | Primary interactive controls, `[AS-BUILT]` badge anchor, deterministic `flow-engine` paths. |
| `--accent-pink` | Wolf Shirt Rebel Pink | `#ff7ab7` `rgb(255,122,183)` | `oklch(0.751 0.174 353.3)` | Accent on `--bg-stage-navy` surfaces (human co-founder triggers, `[VISION]` highlights, pixel-art focus cues). |
| `--accent-pink-ink` | Darkened Rebel Pink (AA Text) | `#a81b5e` `rgb(168,27,94)` | `oklch(0.485 0.190 353.3)` | Rebel Pink text/badges on light `--bg-canvas` (**6.1:1** contrast ratio). |
| `--accent-violet` | Right Pixel Confetti (Violet) | `#8164b4` `rgb(129,100,180)` | `oklch(0.566 0.123 299.2)` | `[IN PR]` badge & KMS cryptographic envelope highlights. |
| `--accent-cyan` | Lower-Right Confetti (Sky Cyan) | `#7fb8eb` `rgb(127,184,235)` | `oklch(0.763 0.095 246.4)` | Spot VM telemetry & `EVALUATOR` visual proof highlights inside `--bg-stage-navy`. |
| `--border-hairline` | Indigo-Tinted Hairline | `#cfd4e3` `rgb(207,212,227)` | `oklch(0.868 0.018 272.0)` | `1px solid` structural grid lines and table borders. |

### 2.3 Typography & Hierarchy (Impeccable Reflex-Reject Compliant)
- **Strict Ban on Saturated Reflex Fonts:** Do **not** load `Inter`, `Space Grotesk`, `Space Mono`, `IBM Plex Sans/Mono`, `Fraunces`, `Newsreader`, `DM Sans`, `Plus Jakarta Sans`, `Instrument Sans/Serif`, `Outfit`, or `Syne`.
- **Selected Font Pairing (Self-Hosted WOFF2 or Google Fonts with `font-display: swap`):**
  1. **Primary UI & Prose (`--font-sans`):** **`Atkinson Hyperlegible Next`** (or **`Chivo`**) — engineered for zero-ambiguity technical reading, distinct character shapes (`I`/`l`/`1`, `0`/`O`), calm authority, zero startup-hype pretension.
  2. **Architectural Headings (`--font-display`):** **`Bricolage Grotesque`** (`600`/`700` weight, optical size `opsz 24..48`, `letter-spacing: -0.025em` — strictly respecting the `>= -0.04em` floor) — crisp mechanical geometry that echoes the pixel-art wolf's structured grid without looking "retro-gamer."
  3. **Code, Envelopes & Schemas (`--font-mono`):** **`Commit Mono`** (or **`JetBrains Mono`**) with `font-variant-numeric: tabular-nums` — used **only** for actual code paths (`contracts/src/...`), `flow-*` comments, SQL schemas, and USD unit-economics tables.
- **Type Scale (Modular `1.25` Ratio, Fluid `clamp()`):**
  - Hero Headline (`h1`): `clamp(2.25rem, 3.8vw + 1rem, 3.5rem)`, `line-height: 1.08`, `letter-spacing: -0.025em`, `text-wrap: balance`.
  - Section Heading (`h2`): `clamp(1.65rem, 2.2vw + 0.8rem, 2.35rem)`, `line-height: 1.15`, `text-wrap: balance`.
  - Scene Title (`h3`): `clamp(1.25rem, 1.2vw + 0.75rem, 1.55rem)`, `line-height: 1.25`.
  - Body Prose: `1.0625rem` (`17px`), `line-height: 1.62`, capped strictly at `max-width: 68ch`, `text-wrap: pretty`.

### 2.4 Impeccable Anti-Slop Guardrails (Mandatory Enforcement)
1. **No side-stripe borders:** Never use `border-left: 3px/4px solid ...` on callouts or active scrollytelling steps. Use full `1px solid` perimeter borders, background surface shifts (`--bg-surface`), or leading step indices (`Scene 1`..`Scene 7`, which are a true 7-step runtime sequence).
2. **No gradient text (`background-clip: text`) or glassmorphism (`backdrop-filter: blur`)** on cards.
3. **No ghost cards:** Never combine `border: 1px solid` with a wide soft `box-shadow` (`blur >= 16px`). Use crisp `1px solid var(--border-hairline)` or a hard pixel-inspired structural offset (`2px 2px 0 var(--bg-stage-navy)`) on primary CTAs only.
4. **No over-rounded containers:** Card/panel `border-radius` caps at `6px` (`--radius-sm: 4px`, `--radius-md: 6px`), honoring the crisp pixel geometry of `atobar-logo.jpeg`.
5. **No tiny uppercase tracked eyebrows above non-sequential sections:** Only the 7 sequential Scrollytelling Scenes carry `Scene 01`–`Scene 07` sequence markers + Persona pills (`P1`–`P4`).
6. **Progressive enhancement & `@media (prefers-reduced-motion: reduce)`:** Every section and diagram is **100% visible by default** with JS disabled or in headless browsers. Scroll-linked state changes use `IntersectionObserver` + instant/crossfade fallbacks under `prefers-reduced-motion: reduce`.

---

## 3. Page Architecture: Dual-Mode Pitch + 7-Scene Scrollytelling Experience

The website (`index.html`) is structured as a fast, zero-build static document with five cohesive zones:

### Zone A — Sticky Top Utility Bar & Status Reality Filter
- **Left:** `images/atobar-logo.jpeg` (`36×36px` crisp avatar) + `atobar-flow` wordmark + subtitle `Agentic Teams On BYOK And Repos`.
- **Center (Jump Links):** `The Pitch` · `7-Scene Runtime Walkthrough` · `Architecture & HLD` · `Unit Economics` · `5-Min Onboarding`.
- **Right (Interactive Reality Filter + Repo Links):**
  - Filter toggle pills: `All` · `[AS-BUILT]` (Cobalt) · `[IN PR]` (Electric Violet) · `[VISION]` (Rebel Pink). Clicking a filter highlights or dims features across the entire page so technical visitors can audit what runs on `main` today vs. what is in PR (`J48 #360`) vs. the multi-founder roadmap.
  - Direct GitHub links: `github.com/arsenyspb/atobar-flow` (`PRD.md`, `HLD.md`).

### Zone B — Above-the-Fold Pitch Hero (Communicate + Verify in 15 Seconds)
- **Asymmetric 2-Column Split on `--bg-canvas` (`#edeef3`):**
  - **Left Column (The Pitch):**
    - Headline: **"Pool BYOK Keys. Plan in GitHub Issues. Let Isolated Spot Roles Ship & Verify the Code."**
    - Subhead: Plain-English explanation of the Hub-and-Spoke software factory: 3 co-founders stake `$5,000/mo` each in KMS-encrypted LLM keys (`$15,000/mo` pool), coordinate strictly via GitHub Jumbo Issues & PRs, and let isolated Spot VMs (`PLANNER` → `DEVELOPER` → `EVALUATOR` → `ARBITRATOR`) write, visually prove, and merge features with **zero runtime lock-in**.
    - **3 Concrete Proof Pills (Not SaaS Vanity Metrics):**
      1. `2 YAML Files in Client Repo` (`.github/workflows/flow-trigger.yml` + `flow-metrics.yml` → 1-commit exit) `[AS-BUILT]`
      2. `0 LLM Calls in State & Merge Gates` (`machine.step()` + `arbitrate()` enforced by `test_boundaries.py`) `[AS-BUILT]`
      3. `Fresh Spot VM for Visual QA` (`WARM_HANDOVER_FORBIDDEN_ROLES` blocks `DEVELOPER` → `EVALUATOR` reuse) `[AS-BUILT]`
    - **Primary CTAs:** `Walk the 7 Runtime Scenes ↓` (solid `--bg-stage-navy` button) + `Read Canonical PRD & HLD on GitHub ↗` + copyable 1-line onboarding command (`curl -fsSL .../onboard.sh | bash`).
  - **Right Column (The Brand & Topology Anchor):**
    - Displays `images/atobar-logo.jpeg` seamlessly blended into the `#edeef3` background above a compact, interactive **Hub-and-Spoke Live Map** (`Founders P1–P4` ↔ `GitHub Client Repo Spokes` ↔ `Atobar Hub: control-panel + flow-engine + KMS + Supabase` ↔ `EC2 Spot Sandboxes`). Hovering any node previews its exact package path and trust boundary.

### Zone C — The Core 7-Scene Scrollytelling Engine (PRD §5 + HLD §1–§4)
- **Spatial Layout:**
  - **Desktop (`>= 1024px`):** CSS Grid `grid-template-columns: minmax(340px, 5fr) minmax(480px, 7fr)` with `gap: clamp(2rem, 4vw, 4.5rem)`.
    - **Left Track (Scrolling Narrative Steps):** 7 rich narrative scenes (`Scene 1` through `Scene 7`), each anchored to its Persona (`P1`–`P4`), User Journey (`J1`–`J6`), Requirement IDs (`FR-1`..`FR-7`, `NFR-1`..`NFR-4`), and honest Status Badges (`[AS-BUILT]`, `[IN PR]`, `[VISION]`).
    - **Right Stage (`position: sticky; top: 5.5rem`, `--bg-stage-navy: #15265c`):** **The Interactive Architecture & Artifact Inspector**. As each scene enters the viewport via `IntersectionObserver` (or when clicked directly), the sticky navy stage transitions between **3 synchronized tabs** for that active scene:
      1. **`Runtime Path (SVG Diagram)`** — Highlighted Hub-and-Spoke / Sequence path for the current scene.
      2. **`GitHub / Code Artifact`** — Real concrete artifact (e.g., `flow-plan` markdown checklist, `POST /v1/runs/{id}/turn-complete` JSON, `flow-verdict` with `xwininfo`/`ps` proof, `arbitrate()` Python signature, or the Equity Attribution formula).
      3. **`DB & Security Boundary`** — Exact tables mutated (`CP_OWNED_TABLES` vs. `FE_OWNED_TABLES`), credential scope (`FLOW_RUN_CREDENTIAL` + `X-Instance-ID`), and test guard (`test_table_ownership.py`, `test_boundaries.py`).
  - **Mobile / Tablet (`< 1024px`):** Clean single-column vertical flow where each Scene renders its own inline collapsible Inspector card directly beneath the prose—zero horizontal overflow, zero scroll-hijacking.

#### Scene-by-Scene Specification (Exact Mapping to `docs/PRD.md` §5 & `docs/HLD.md`)

| Scene | Title & Persona | Narrative Copy Focus (Left Scroll Track) | Sticky Navy Stage Visual & Real Code Artifact (Right Stage) | Status Badges |
| :--- | :--- | :--- | :--- | :--- |
| **Scene 1** | **The USD 15K/mo Co-Founder Pool**<br>`P1` Token-Staking Co-Founder (`J1`, `FR-5`) | 3 co-founders stake `$5K/mo` each in BYOK keys (`gemini`, `claude`, `openai`, `deepseek`, `grok`) without forming a corporation first. Keys are envelope-encrypted with AWS KMS (`AES-GCM`) using `(tenant_id, provider)` AAD and bound per role (`tenant_role_llm`). `onboarder` synthesizes the initial `SotaWiki` (`J50`) and opens a PR with `flow-trigger.yml` and `flow-metrics.yml`. | **Visual:** KMS Vault envelope encryption diagram (`CP_OWNED_TABLES`: `tenant_llm_keys`, `tenant_role_llm` + `[VISION]` `contributor_github_login`, `monthly_cap_usd`).<br>**Artifact:** `onboard.sh` + 2-file `.github/workflows/` diff showing zero SDK imports in client repo. | `[AS-BUILT]` KMS Vault & Onboarding<br>`[VISION]` Multi-Founder Pool |
| **Scene 2** | **Architecture by Jumbo Issue & Spec-Sufficiency Gate**<br>`P2` Swarm Wrangler (`J2`, `FR-1`, `FR-3`) | Humans coordinate strictly in GitHub Issues. Labeling `flow:feature` or mentioning `@atobar-flow-agent` sends a webhook to `POST /v1/events`. `flow-engine` runs `resolve_delegated_issue_number()` and the deterministic `assess_issue_sufficiency()` gate (`J38`, zero LLM): concrete specs fast-track straight to `DEVELOPER`; broad specs launch `PLANNER` to post a `flow-plan` Task Ledger grounded in `SotaWiki` and pause at `flow:needs-approval`. | **Visual:** HLD Sequence 1 (`GH -> control-panel -> flow-engine -> Spec-Sufficiency Gate branch`).<br>**Artifact:** Real `flow-plan` GitHub comment checklist + `assess_issue_sufficiency()` decision table + `[VISION]` cross-repo `venture_jumbo_links` (`api`, `web`, `mobile`). | `[AS-BUILT]` Single-Repo Gate & Planner<br>`[VISION]` Multi-Repo Venture Links |
| **Scene 3** | **Warm Worktrees, Hard Isolation & Plain-English Steering**<br>`P2` Swarm Wrangler (`J3`, `FR-2`, `NFR-1`) | On `flow:approved` (or `@atobar-flow-agent approve`), `CONDUCTOR` boots an EC2 Spot VM. `PLANNER -> DEVELOPER` and rework rounds reuse the warm Spot VM in isolated `git worktree` directories via `POST /v1/runs/{run_id}/turn-complete` (`J38`). Live tool calls and USD spend stream into the pinned GitHub comment. Co-founders course-correct active PRs with `@atobar-flow-agent` comments (`J49`). | **Visual:** HLD Sequence 2 (`DEV_VM` single-use `/llm-key` claim + `prepare_role_worktree()` vs. `WARM_HANDOVER_FORBIDDEN_ROLES = {"evaluator", "arbitrator"}` hard termination boundary).<br>**Artifact:** Pinned live telemetry comment + `@atobar-flow-agent` PR steering comment. | `[AS-BUILT]` (`J38`, `J42`, `J43`, `J49`) |
| **Scene 4** | **Unattended Visual & Mobile QA on Fresh Spot VMs**<br>`P3` QA Gatekeeper (`J4`, `FR-4`, `NFR-1`) | `EVALUATOR` **never** reuses a `DEVELOPER` VM. It boots cold on a fresh Spot VM with a `contents: read` GitHub token, waits for external CI on `head_sha`, runs Stage 1 static `file:<path>#L<start>-L<end>` checks (`J39`), then runs Stage 2 inside X11 (`Xvfb` + `Fluxbox` + Playwright), attesting real open windows (`xwininfo`) and processes (`ps`) before uploading encrypted PNGs tagged with `data_mode` (`live` \| `synthetic` \| `hybrid`, `J49`). | **Visual:** Split QA stage showing `web-x11-arm64` (`t4g.large` X11 + `xwininfo` + `sha256` screenshot provenance) alongside `[VISION]` `android-studio-kvm-x86` (`c7i.large` KVM headless Android Emulator + ADB).<br>**Artifact:** `flow-verdict` summary + screenshot provenance payload (`POST /v1/runs/{id}/screenshots`). | `[AS-BUILT]` Two-Stage Web X11 QA (`J39`, `J49`)<br>`[VISION]` Android Studio KVM Profile |
| **Scene 5** | **Deterministic Metric Gate, Auto-Merge & Living `SotaWiki`**<br>`P3` QA Gatekeeper (`J5`, `FR-3`, `FR-6`, `NFR-3`) | No LLM ever decides whether code merges. Once CI is green, `flow-verdict` is `approved`, and `flow-ack` has zero open disputes on `head_sha`, the serverless `ARBITRATOR` verifies `flow-metrics.json` provenance from GitHub Actions and runs pure Python `arbitrate(policy, observations)`. Under `auto_merge`, it squash-merges the PR and increments `repository_wikis.merges_since_refresh` to trigger a coalesced Mermaid `SotaWiki` refresh (`J50`). | **Visual:** HLD Sequence 3 (`EVAL -> CP -> FE arbitrate() -> Squash Merge -> flow_record_default_branch_merge_for_wiki()`).<br>**Artifact:** `arbitrate()` pure input/output JSON + validated `SotaWiki` Mermaid diagram block. | `[AS-BUILT]` (`J50`) |
| **Scene 6** | **Verifiable FinOps & Fair Co-Founder Equity Split**<br>`P1` & `P4` FinOps Steward (`J5.3`, `FR-5`) | Every turn records cache-aware token usage and USD spend in `loop_rounds.cost_usd` and `tenant_goals.spent_usd`. The 6-hour Janitor syncs pinned LiteLLM commit SHAs, OpenRouter rates, and AWS EC2 Spot price history into `price_snapshots` (`J48 #360`). In the Venture model, server-side settlement attributes every dollar of **Fiscal Share** (`key_contributor_login`) and every merged PR of **Architectural Yield** (`architect_github_login`). | **Visual:** HLD Sequence 4 (`loop_rounds` + `price_snapshots` -> Deterministic Co-Founder Ledger).<br>**Artifact:** Interactive **Co-Founder Equity Calculator** widget where visitors can slide 3 founders' monthly BYOK stakes and shipped Jumbo Issues/PR steers to see live `Fiscal_Share` and `Architectural_Yield` computation. | `[AS-BUILT]` Turn & Goal Spend<br>`[IN PR #360]` Verifiable Price Catalog (`J48`)<br>`[VISION]` Co-Founder Equity Ledger |
| **Scene 7** | **USD 45K In → USD 100K Out → 1-Commit Clean Sunset**<br>`P4` Sunset Steward (`J6`, `FR-3`, `NFR-4`) | After each merge, `goal_step()` re-evaluates default-branch metrics against `tenant_goals`. Hard circuit breakers (`max_pr_cost_usd`, `max_review_rounds`, `max_repeat_finding`, `max_pr_wall_clock_minutes`) prevent runaway spend. When the 90-day build hits target metrics and transitions to harvest or 1-year sunset, deleting `.github/workflows/flow-trigger.yml` and `flow-metrics.yml` detaches the client repo in a single commit. | **Visual:** 90-Day Venture Lifecycle timeline (`$45K Build -> Goal Met & Guardrails Active -> $100K Harvest -> 1-Commit Exit`).<br>**Artifact:** `git rm .github/workflows/flow-trigger.yml .github/workflows/flow-metrics.yml` diff proving zero residual imports or vendor lock-in. | `[AS-BUILT]` Goal Loop, Circuit Breakers & 1-Commit Exit<br>`[VISION]` Venture Lifecycle Presets |

### Zone D — Deep-Dive Technical Reference Drawer (For Architects Who Read the Fine Print)
- **5-Package Monorepo Boundary Table (`HLD §1.1`):** Shows `atobar_contracts`, `flow_engine`, `control_panel`, `flow_agent`, and `atobar_ops`, their exact responsibilities, and the `LLM Imports Allowed?` column (`No` for all deterministic packages, enforced by `tests/test_boundaries.py`).
- **Single-Writer Database Ownership Matrix (`HLD §3.1`):** Side-by-side table of `control-panel` (`CP_OWNED_TABLES`: `tenant_tokens`, `tenant_llm_keys`, `tenant_role_llm`, `security_audit_log`) vs. `flow-engine` (`FE_OWNED_TABLES` + `FE_OWNED_RPCS`), enforced by `tests/test_table_ownership.py`.
- **Explicit Anti-Goals Box (`PRD §2.2`):**
  1. *No custom IDE or chat app* — GitHub Issues and PRs are the only workspace.
  2. *No Atobar SDK inside client repos* — zero runtime coupling.
  3. *No LLM in merge or budget decisions* — 100% deterministic Python state & arbitration gates.

### Zone E — 5-Minute Onboarding & Open-Source Call to Action Footer
- Step-by-step terminal walkthrough matching `docs/ONBOARDING.md` (`J1.1`–`J1.4`), links to `docs/PRD.md`, `docs/HLD.md`, `docs/SWARM_ARCHITECTURE.md`, and `LICENSE` (MIT).

---

## 4. Technical Stack & Repository Architecture in `~/projects/atobar-flow.github.io`

To keep the site blazingly fast, zero-dependency in production, and natively served by GitHub Pages without fragile CI build steps:

```text
~/projects/atobar-flow.github.io/
├── .gitignore                 # Already configured (Jekyll + macOS .DS_Store + Playwright ignores)
├── .nojekyll                  # Bypass Jekyll processing for instant raw static serving
├── AI.md                      # Already configured (relative links to ../atobar-flow)
├── LICENSE                    # Existing MIT license
├── README.md                  # Repo overview, local preview command & verification instructions
├── index.html                 # Semantic HTML5 single-page pitch + 7-scene scrollytelling experience
├── css/
│   ├── tokens.css             # OKLCH color palette from atobar-logo.jpeg, fluid clamp() type & 4pt spacing scale
│   └── site.css               # Layout grid, sticky inspector stage, responsive breakpoints & reduced-motion rules
├── js/
│   └── scrolly.js             # Vanilla ES module (< 8 KB, zero framework bloat): IntersectionObserver scene tracker,
│                              # inspector tab switcher, [AS-BUILT]/[IN PR]/[VISION] filter, and BYOK Equity calculator
└── images/
    ├── atobar-logo.jpeg       # Existing 2048x2048 pixel-art wolf crest
    └── favicon.png            # 64x64 / 32x32 crisp downsampled icon from atobar-logo.jpeg
```

### Why Vanilla Semantic HTML + CSS Custom Properties + Lightweight ES Module?
- **Zero build step required for GitHub Pages:** Pushing to `main` on `atobar-flow/atobar-flow.github.io` deploys immediately.
- **100% Progressive Enhancement:** Every scene's prose, status badge, and primary diagram is rendered in static HTML so `curl`, search crawlers, screen readers, and no-JS browsers see the complete pitch and architecture. `js/scrolly.js` enhances the sticky right-hand Inspector stage on desktop (`>= 1024px`) and powers the interactive Status Filter and Co-Founder Equity Calculator.
- **No external runtime JS dependencies:** Inline semantic SVGs (styled with CSS variables `--bg-stage-navy`, `--accent-cobalt`, `--accent-pink`, `--accent-cyan`, `--accent-violet`) render sharper, faster, and more accessibly than client-side Mermaid JS bundles, while still offering a "Copy Mermaid Source" button on every diagram that copies the exact GitHub-valid Mermaid code from `../atobar-flow/docs/HLD.md`.

---

## 5. Work Packages (To Be Executed in `~/projects/atobar-flow.github.io`)

### WP-1: Ground-Truth Refresh, `.nojekyll` & Brand Token Foundation (`css/tokens.css`)
- **Action:**
  - Execute the **Section 0 Mandate** against `../atobar-flow/docs/PRD.md` and `../atobar-flow/docs/HLD.md`.
  - Add `.nojekyll` and generate `images/favicon.png` from `images/atobar-logo.jpeg` using `sips`.
  - Author `css/tokens.css` with the exact OKLCH tokens sampled from `images/atobar-logo.jpeg` (`--bg-canvas: oklch(0.950 0.007 277.2)` `#edeef3`, `--bg-stage-navy: oklch(0.290 0.099 266.8)` `#15265c`, etc.), fluid `clamp()` typography (`Bricolage Grotesque` + `Atkinson Hyperlegible Next` + `Commit Mono`), 4pt spacing tokens, and semantic z-index scale.

### WP-2: Semantic HTML Structure — Pitch Hero, 7 Scrollytelling Scenes & HLD Reference (`index.html`)
- **Action:**
  - Build `index.html` containing Zone A (Sticky Header + Reality Filter), Zone B (Pitch Hero with seamlessly blended `images/atobar-logo.jpeg` + interactive Hub-and-Spoke overview SVG), Zone C (7 Scrollytelling Scenes with `P1`–`P4` personas, `J1`–`J6` journeys, and `[AS-BUILT]` / `[IN PR]` / `[VISION]` badges), Zone D (5-Package Monorepo & Single-Writer DB Ownership tables + Explicit Anti-Goals), and Zone E (5-Minute Onboarding & Footer).
  - Embed semantic, accessible `<svg role="img" aria-labelledby="...">` diagrams and real code/envelope artifacts for all 7 scenes, plus "Copy Mermaid Source" buttons containing the exact Mermaid definitions from `../atobar-flow/docs/HLD.md`.

### WP-3: Sticky Inspector Choreography, Status Reality Filter & BYOK Equity Calculator (`css/site.css`, `js/scrolly.js`)
- **Action:**
  - Implement the two-column desktop scrollytelling layout (`css/site.css`) and single-column mobile/tablet adaptation (`< 1024px`).
  - Write `js/scrolly.js` using `IntersectionObserver` to synchronize the sticky Navy Inspector Stage with whichever of Scenes 1–7 is in view, support keyboard navigation (`ArrowUp`/`ArrowDown` or `1`–`7` keys when focused), filter page elements by `[AS-BUILT]` / `[IN PR]` / `[VISION]`, and compute live co-founder `Fiscal_Share` and `Architectural_Yield` in Scene 6.
  - Enforce `@media (prefers-reduced-motion: reduce)` across all transitions.

### WP-4: Impeccable Design Audit, Visual Browser Verification & Switchover Documentation (`README.md`)
- **Action:**
  - Serve the site locally (`python3 -m http.server 8080 --directory ~/projects/atobar-flow.github.io`).
  - Run the Impeccable mechanical detector (`node /Users/chernov/.agents/skills/impeccable/scripts/detect.mjs --json index.html css/`) and verify **zero** slop violations or contrast failures.
  - Verify visually across desktop (`1440×900`) and mobile (`390×844`) viewports (checking headline wrapping, zero horizontal scroll, sticky stage transitions, reduced-motion behavior, and logo background blending).
  - Update `~/projects/atobar-flow.github.io/README.md` with local preview, verification, and cross-repo sync instructions.

---

## 6. Acceptance Criteria

- [ ] **AC-1 (Ground-Truth Fidelity):** All 7 scrollytelling scenes, personas (`P1`–`P4`), user journeys (`J1`–`J6`), package boundaries (`contracts`, `flow-engine`, `control-panel`, `flow-agent`, `atobar-ops`), and single-writer tables (`CP_OWNED_TABLES` vs. `FE_OWNED_TABLES`) match `../atobar-flow/docs/PRD.md` and `../atobar-flow/docs/HLD.md` with zero fabricated endpoints or stale pre-`J34` paths.
- [ ] **AC-2 (Honest Status Labeling):** Every scene and architectural claim carries an explicit `[AS-BUILT]`, `[IN PR]`, or `[VISION]` badge, and the top-bar Reality Filter interactively highlights/filters them.
- [ ] **AC-3 (Logo Pantone & Seamless Blend):** `css/tokens.css` uses the OKLCH palette extracted from `images/atobar-logo.jpeg`; the hero background (`#edeef3`) matches the logo's outer canvas so `images/atobar-logo.jpeg` blends natively without a visible bounding box.
- [ ] **AC-4 (Impeccable Anti-Slop & Accessibility Gate):** Passes `detect.mjs` with zero violations: body contrast `>= 4.5:1` (`15.2:1` primary ink), zero reflex-reject fonts, zero side-stripe borders (`border-left > 1px`), zero gradient text, zero ghost cards, display letter-spacing `>= -0.04em`, and full `@media (prefers-reduced-motion: reduce)` support.
- [ ] **AC-5 (Dual-Mode UX — Pitch + Scrollytelling):** Visitors can grasp the BYOK co-founder pitch and 1-commit exit guarantee above the fold in `< 30s`, scroll through all 7 runtime scenes with a synchronized sticky Inspector on desktop (`>= 1024px`) and inline cards on mobile (`< 1024px`), and test the interactive Co-Founder Equity Calculator in Scene 6.
- [ ] **AC-6 (Repo Hygiene & Switchover Readiness):** Zero `.DS_Store` or build cruft in `git status`; `AI.md` in both `~/projects/atobar-flow` and `~/projects/atobar-flow.github.io` cross-reference each other via relative paths (`../atobar-flow` ↔ `../atobar-flow.github.io`).
