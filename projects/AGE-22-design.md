# AGE-22: Playwright E2E Tests Setup - Design Document

## Objective
Set up Playwright E2E test suite for the web app and integrate into GitHub Actions CI.

## Acceptance Criteria
- [ ] Playwright config created at `apps/web/playwright.config.ts`
- [ ] At least 5 critical path E2E tests (login, dashboard, portal, continuity, settings)
- [ ] Tests run in CI workflow (new job in `.github/workflows/ci.yml`)
- [ ] Tests pass against local dev server
- [ ] All changes committed

## Architecture Overview

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + React Router + TanStack Query
- **Backend**: Fastify API on port 3000
- **E2E Testing**: Playwright 1.64+
- **CI**: GitHub Actions

### Test Strategy
The web app has 5 critical user paths that map to existing pages:
1. **Login** (`/login`) - Authentication flow (login/register)
2. **Dashboard** (`/dashboard`) - Main landing page with workspaces/agents overview
3. **Portal** (`/workspaces/:id`) - Workspace detail view (agent management portal)
4. **Continuity** (`/sessions/:id`) - Session detail with run history (execution continuity)
5. **Settings** (`/agents/:id`) - Agent detail/configuration (settings-like page)

### Playwright Configuration
- **Config location**: `apps/web/playwright.config.ts`
- **Base URL**: `http://localhost:5173` (Vite dev server)
- **API Base**: `http://localhost:3000` (Fastify API)
- **Browsers**: Chromium (CI), optional Firefox/WebKit for local
- **Test directory**: `apps/web/tests/e2e/`
- **Parallel execution**: Enabled for CI speed
- **Retries**: 2 on CI, 0 locally
- **Trace**: On failure
- **Video**: On failure

### CI Integration
- **Workflow file**: `.github/workflows/ci.yml` (new file)
- **Jobs**:
  1. `lint-typecheck-test` - Existing verification (lint, typecheck, unit tests)
  2. `e2e-tests` - New Playwright E2E job
- **E2E job steps**:
  1. Setup Node.js + pnpm
  2. Install dependencies
  3. Build packages
  4. Start API server (background)
  5. Start Vite dev server (background)
  6. Wait for servers ready
  7. Run Playwright tests
  8. Upload artifacts (traces, videos, screenshots) on failure
  9. Cleanup servers

### Test Data Strategy
- Use API calls for test setup/teardown (via `request` fixture)
- Create test user via `/v1/auth/register`
- Login via `/v1/auth/login` to get token
- Use token for authenticated API calls in tests
- Clean up test data after each test

### Dependencies
- AGE-4.3: GitHub Actions CI workflow (will be created as part of this task)
- AGE-4.2: GitHub remote exists (assumed)

## Implementation Plan

### Phase 1: Playwright Config & Test Infrastructure
1. Create `apps/web/playwright.config.ts`
2. Create `apps/web/tests/e2e/` directory
3. Create test utilities: `test-helpers.ts`, `fixtures.ts`
4. Install Playwright browsers if needed

### Phase 2: Critical Path Tests (5 tests)
1. `login.spec.ts` - Login/register flow
2. `dashboard.spec.ts` - Dashboard load and navigation
3. `workspace-portal.spec.ts` - Workspace detail (portal)
4. `session-continuity.spec.ts` - Session detail (continuity)
5. `agent-settings.spec.ts` - Agent detail (settings)

### Phase 3: CI Workflow
1. Create `.github/workflows/ci.yml`
2. Add `e2e-tests` job with proper server orchestration
3. Configure artifact upload for debugging

### Phase 4: Local Verification
1. Run `pnpm install` in web app
2. Run `pnpm test:e2e` against local servers
3. Verify all 5 tests pass

### Phase 5: Commit & Push
1. Stage all changes
2. Commit with descriptive message
3. Verify CI would pass

## Risk Mitigation
- **Flaky tests**: Use proper wait conditions, avoid hardcoded timeouts
- **Server startup**: Health check endpoints before test execution
- **Test isolation**: Unique test data per test, cleanup in `afterEach`
- **CI timeout**: Set reasonable timeouts (5 min per test, 15 min job)

## Approval Request
This design is submitted for Lead Architect review. Please approve before implementation begins.