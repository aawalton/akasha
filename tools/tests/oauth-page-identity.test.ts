import { afterAll, describe, expect, test } from "bun:test"
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { readCredentialFromPage } from "../lib/oauth-page-credential.ts"
import { type IdentityPin, pinIdentityOnPage } from "../lib/oauth-page-identity.ts"
import { EXPIRES_KEY } from "../lib/oauth-page-push.ts"
import { accountStateFromPage, accountUuidsFromPages } from "../lib/oauth-page-state.ts"
import { looksEncrypted } from "../lib/page-secret.ts"

const ROOT = `/var/tmp/oauth-page-identity-test-${process.pid}`

const HOUR = 3_600_000

const OLD_UUID = "849f42fd-b12a-4cb1-ad94-4d53103160a1"

const NEW_UUID = "80a42386-26f2-4457-9581-639fc99fac18"

const HELD_UNTIL = Date.parse("2026-09-01T12:00:00.000Z")

const OFFERED_AT = HELD_UNTIL - 2 * HOUR

const BOOKKEEPING = [
  "retry-after: 2026-08-19T02:34:39.875Z",
  "terminal-at: 2026-08-17T09:00:00.000Z",
  "terminal-alerted-at: 2026-08-17T09:05:00.000Z",
  "subscription-disabled-reason: subscription_expired",
  "last-window-trigger-at: 2026-08-18T20:00:00.000Z",
]

const PACING =
  "{five-hour-percent-used: 41,seven-day-percent-used: 63," +
  "five-hour-resets-at: 2026-09-01T13:00:00.000Z," +
  "seven-day-resets-at: 2026-09-05T13:00:00.000Z," +
  "usage-read-at: 2026-09-01T07:00:00.000Z," +
  `${EXPIRES_KEY}: ${new Date(HELD_UNTIL).toISOString()}}`

function page(lines: readonly string[]): string {
  return `---\ntitle: Fixture\n${lines.join("\n")}${lines.length === 0 ? "" : "\n"}---\n`
}

function git(args: readonly string[]): void {
  Bun.spawnSync(["git", ...args], { cwd: ROOT, stdout: "pipe", stderr: "pipe" })
}

rmSync(ROOT, { recursive: true, force: true })
mkdirSync(`${ROOT}/pages/claude-account`, { recursive: true })
writeFileSync(`${ROOT}/.sops.yaml`, readFileSync(`${import.meta.dir}/../../.sops.yaml`, "utf8"))
writeFileSync(`${ROOT}/.gitignore`, "*.uncommitted.yaml\n")
writeFileSync(`${ROOT}/pages/claude-account/fresh.claude-account.md`, page([]))
writeFileSync(`${ROOT}/pages/claude-account/bound.claude-account.md`, page([`account-uuid: ${OLD_UUID}`, ...BOOKKEEPING]))
writeFileSync(`${ROOT}/pages/claude-account/bound.claude-account.uncommitted.yaml`, `${PACING}\n`)
writeFileSync(`${ROOT}/pages/claude-account/keeper.claude-account.md`, page(BOOKKEEPING))
writeFileSync(`${ROOT}/pages/claude-account/keeper.claude-account.uncommitted.yaml`, `${PACING}\n`)
writeFileSync(`${ROOT}/pages/claude-account/unsealed.claude-account.md`, page([]))
git(["init", "-q"])
git(["add", "-A"])
git(["commit", "-qm", "fixture"])

const FIRST_PIN = pinIdentityOnPage({
  account: "fresh",
  accountUuid: NEW_UUID,
  accessToken: "at-fresh",
  refreshToken: "rt-fresh",
  expiresAt: OFFERED_AT,
  previousUuid: null,
  root: ROOT,
})

const REBIND = pinIdentityOnPage({
  account: "bound",
  accountUuid: NEW_UUID,
  accessToken: "at-rebound",
  refreshToken: "rt-rebound",
  expiresAt: OFFERED_AT,
  previousUuid: OLD_UUID,
  root: ROOT,
})

const KEPT = pinIdentityOnPage({
  account: "keeper",
  accountUuid: NEW_UUID,
  accessToken: "at-keeper",
  refreshToken: "rt-keeper",
  expiresAt: HELD_UNTIL + HOUR,
  previousUuid: null,
  root: ROOT,
})

afterAll(() => {
  rmSync(ROOT, { recursive: true, force: true })
})

function held(account: string): { accessToken: string; refreshToken: string; expiresAt: number } {
  const read = readCredentialFromPage(ROOT, account)
  if (read.kind !== "read") throw new Error(`${account} does not read back: ${read.why}`)
  const { accessToken, refreshToken, expiresAt } = read.credential
  return { accessToken, refreshToken, expiresAt }
}

function refusalOf(out: IdentityPin): { at: string; why: string } {
  if (out.kind !== "refused") throw new Error(`expected a refusal, got ${out.kind}`)
  return { at: out.at, why: out.why }
}

describe("a first pin — the page takes the uuid and the credential together", () => {
  test("the uuid reaches the map every later push is judged against", () => {
    expect(FIRST_PIN.kind).toBe("pinned")
    expect(accountUuidsFromPages(ROOT).get("fresh")).toBe(NEW_UUID)
  })

  test("the credential reaches the page, encrypted, and reads back as what was offered", () => {
    expect(held("fresh")).toEqual({
      accessToken: "at-fresh",
      refreshToken: "rt-fresh",
      expiresAt: OFFERED_AT,
    })
    const sidecar = readFileSync(`${ROOT}/pages/claude-account/fresh.claude-account.sops.yaml`, "utf8")
    expect(looksEncrypted(sidecar)).toBe(true)
    expect(sidecar).not.toContain("at-fresh")
  })

  test("it clears nothing: a page that never named another account holds nobody else's numbers", () => {
    expect(KEPT.kind).toBe("pinned")
    const state = accountStateFromPage("keeper", ROOT)
    expect(state?.fiveHourUtil).toBe(41)
    expect(state?.sevenDayUtil).toBe(63)
    expect(state?.retryAfterMs).toBe(Date.parse("2026-08-19T02:34:39.875Z"))
    expect(state?.subscriptionDisabled).toBe(true)
  })
})

describe("a rebind — the previous upstream account's bookkeeping never carries over", () => {
  test("the page names the new upstream account", () => {
    expect(REBIND.kind).toBe("pinned")
    expect(accountUuidsFromPages(ROOT).get("bound")).toBe(NEW_UUID)
  })

  test("the new credential lands even though it expires before the one the page held", () => {
    expect(held("bound")).toEqual({
      accessToken: "at-rebound",
      refreshToken: "rt-rebound",
      expiresAt: OFFERED_AT,
    })
  })

  test("every number the picker reads is the new account's, and none is the old account's", () => {
    const state = accountStateFromPage("bound", ROOT)
    expect(state).not.toBeNull()
    expect({
      fiveHourUtil: state?.fiveHourUtil,
      sevenDayUtil: state?.sevenDayUtil,
      fiveHourResetsAt: state?.fiveHourResetsAt,
      sevenDayResetsAt: state?.sevenDayResetsAt,
      retryAfterMs: state?.retryAfterMs,
      terminalAtMs: state?.terminalAtMs,
      terminalAlertedAtMs: state?.terminalAlertedAtMs,
      lastWindowTriggerAtMs: state?.lastWindowTriggerAtMs,
      subscriptionDisabled: state?.subscriptionDisabled,
      accessTokenExpiresAtMs: state?.accessTokenExpiresAtMs,
    }).toEqual({
      fiveHourUtil: 0,
      sevenDayUtil: 0,
      fiveHourResetsAt: null,
      sevenDayResetsAt: null,
      retryAfterMs: null,
      terminalAtMs: null,
      terminalAlertedAtMs: null,
      lastWindowTriggerAtMs: null,
      subscriptionDisabled: false,
      accessTokenExpiresAtMs: OFFERED_AT,
    })
  })
})

describe("what a page write can refuse, and what the page is left holding", () => {
  test("a pin whose credential cannot be sealed leaves the page naming no upstream account", () => {
    const config = readFileSync(`${ROOT}/.sops.yaml`, "utf8")
    rmSync(`${ROOT}/.sops.yaml`)
    const out = pinIdentityOnPage({
      account: "unsealed",
      accountUuid: NEW_UUID,
      accessToken: "at-unsealed",
      refreshToken: "rt-unsealed",
      expiresAt: OFFERED_AT,
      previousUuid: null,
      root: ROOT,
    })
    writeFileSync(`${ROOT}/.sops.yaml`, config)
    expect(refusalOf(out).at).toBe("credential")
    expect(accountUuidsFromPages(ROOT).has("unsealed")).toBe(false)
  })

  test("a blank token is refused before anything is written", () => {
    const out = pinIdentityOnPage({
      account: "fresh",
      accountUuid: OLD_UUID,
      accessToken: "",
      refreshToken: "rt-fresh",
      expiresAt: OFFERED_AT + HOUR,
      previousUuid: null,
      root: ROOT,
    })
    expect(refusalOf(out).at).toBe("credential")
    expect(accountUuidsFromPages(ROOT).get("fresh")).toBe(NEW_UUID)
  })

  test("an account with no page comes back refused rather than thrown", () => {
    const out = pinIdentityOnPage({
      account: "nobody",
      accountUuid: NEW_UUID,
      accessToken: "at-nobody",
      refreshToken: "rt-nobody",
      expiresAt: OFFERED_AT,
      previousUuid: null,
      root: ROOT,
    })
    expect(refusalOf(out).at).toBe("clear")
  })
})
