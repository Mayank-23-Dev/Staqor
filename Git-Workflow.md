# Git-Workflow.md — Standing Git & Version Control Protocol

## 1. Core Mandate: Auto-Commit, Never Auto-Push
- **Auto-Commit:** After every meaningful unit of work (a completed feature, a bugfix, a phase checkpoint from `Phases.md`, or any file change resulting from a user request), automatically run `git add` + `git commit` without waiting to be asked and without asking permission first.
- **Never Auto-Push:** Never run `git push`, `git push --force`, or anything that touches a remote. Pushing stays fully manual and is exclusively executed by the user.

## 2. Commit Staging Discipline
- Stage **only** the files actually created or modified for that specific unit of work (e.g., `git add path/to/file.ts`).
- **Never** perform a blind `git add .` if it would sweep up unrelated files, untracked junk, build artifacts, `.env` files, or `node_modules`.
- Keep commits small, isolated, and scoped to one logical change. Never bundle unrelated changes into a single commit just because they occurred in the same session.

## 3. Commit Message Convention
Commit messages must strictly follow the format:
`<type>(<scope>): <short description>`

### Commit Types:
- `feat`: New feature or user-facing functionality
- `fix`: Bug fix, error resolution, or patch
- `docs`: Documentation, architecture specs, or whitepapers
- `refactor`: Code restructures without changing external behavior
- `style`: Formatting, CSS, design system, or layout adjustments
- `chore`: Tooling, build config, dependencies, or repository maintenance
- `test`: Adding or modifying automated tests or verification scripts

### Scope Guidelines:
- Reference the `Phases.md` phase when relevant: e.g., `(phase-0)`, `(phase-1)`, `(phase-2)`, `(phase-3)`, `(phase-4)`, `(phase-5)`, `(phase-6)`.
- Or reference the specific system domain: e.g., `(auth)`, `(workspace)`, `(editor)`, `(evaluate)`, `(sandbox)`, `(billing)`, `(landing)`.

### Examples:
- `feat(phase-2): add Monaco editor with HTML/CSS/JS tabs`
- `fix(evaluate): correct attempt_count check order before Groq call`
- `docs: update Memory.md with phase 2 completion notes`
- `style(landing): apply GSAP hero stagger per Design.md`
- `chore(deps): add @groq/groq-sdk and monaco-editor dependencies`

## 4. Safety & Integrity Boundaries
- **Zero Secrets in Git:** Never commit secrets, `.env` files, API keys, or tokens under any circumstances, even if pasted into the chat.
- **Working State Guarantee:** If a change breaks the working state (e.g., code does not run, compile errors), fix it before committing. If an intermediate state must be preserved, use a clear `wip:` prefix (e.g., `wip(phase-2): partial Monaco integration`) and state it explicitly.
- **Phase Discipline:** When completing a milestone in `Phases.md`, verify the "Done When" checklist, update `Phases.md` / `Memory.md`, and commit the checkpoint.
