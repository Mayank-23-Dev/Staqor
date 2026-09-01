# Project Log & Maintenance

## Command Execution Rules

### Allowed Commands
- Basic development & repository commands can be run directly:
  - `npx tsc --noEmit` (safe type-checking without corrupting `.next` dev server cache)
  - `npx eslint .` / `npm run lint`
  - `git status`, `git diff`, `git add`, `git commit`

### Critical Dev Server Protection Rule (`npm run build` Policy)
- **Do NOT run `npm run build`** while `npm run dev` is active in another terminal.
  - *Reason*: Running `next build` overwrites the `.next` directory with production build output, which corrupts the active dev server cache and causes `MODULE_NOT_FOUND` errors on chunk files.
  - *Verification Protocol*: Use `npx tsc --noEmit` and/or `npx eslint .` to verify code correctness without modifying `.next`.
  - *Production Build Exception*: Only run `npm run build` if explicitly asked by the user, and confirm first that the dev server is stopped.
  - *Default Assumption*: Assume `npm run dev` is running in a separate terminal at all times.

### Command & Commit Execution Policy
- **No Direct Terminal Command Execution**:
  - Do NOT run terminal commands directly. Write/edit files directly and output exact commands for the user to run in their terminal.
- **Commit Policy**:
  - Do NOT commit changes or ask to commit until the user explicitly says to commit.

---

## Suggested Commit Messages
- `feat: build premium interactive ABTalks landing page`
- `fix: resolve missing error components dev server loop`
- `style: apply design.md token system to landing page`
