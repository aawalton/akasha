import { afterAll, describe, expect, test } from "bun:test"
import { chmodSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { pageCredentialStore } from "../lib/oauth-page-db.ts"
import { digestOf, EXPIRES_KEY, pushCredentialToPage } from "../lib/oauth-page-push.ts"
import { keysIn, looksEncrypted } from "../lib/page-secret.ts"

const ROOT = `/var/tmp/oauth-page-push-test-${process.pid}`

const SIDECAR = `${ROOT}/pages/claude-account/one.claude-account.sops.yaml`

const UNCOMMITTED = `${ROOT}/pages/claude-account/one.claude-account.uncommitted.yaml`

const MINUTE = 60_000

const HOUR = 3_600_000

const EXPIRES_AT = Date.parse("2026-08-18T18:00:00.000Z")

const CRED = {
  account: "one",
  accessToken: "sk-one",
  refreshToken: "rt-one",
  expiresAt: EXPIRES_AT,
  root: ROOT,
}

function git(args: readonly string[]): string {
  const ran = Bun.spawnSync(["git", ...args], { cwd: ROOT, stdout: "pipe", stderr: "pipe" })
  return new TextDecoder().decode(ran.stdout).trim()
}

rmSync(ROOT, { recursive: true, force: true })
mkdirSync(`${ROOT}/pages/claude-account`, { recursive: true })
writeFileSync(`${ROOT}/.sops.yaml`, readFileSync(`${import.meta.dir}/../../.sops.yaml`, "utf8"))
writeFileSync(`${ROOT}/pages/claude-account/one.claude-account.md`, "---\ntitle: One\n---\n")
writeFileSync(`${ROOT}/pages/claude-account/two.claude-account.md`, "---\ntitle: Two\n---\n")
writeFileSync(`${ROOT}/pages/claude-account/three.claude-account.md`, "---\ntitle: Three\n---\n")
writeFileSync(`${ROOT}/.gitignore`, "*.uncommitted.yaml\n")
git(["init", "-q"])
git(["add", "-A"])
git(["commit", "-qm", "fixture"])

afterAll(() => {
  rmSync(ROOT, { recursive: true, force: true })
})

function locksLeft(): readonly string[] {
  return readdirSync(`${ROOT}/.git`).filter((one) => one.includes("landing"))
}

describe("pushing a renewed credential into its page", () => {
  test("it encrypts both keys, commits, and leaves no cleartext token on disk", () => {
    const out = pushCredentialToPage(CRED)
    expect(out.kind).toBe("pushed")
    expect(keysIn(readFileSync(SIDECAR, "utf8"))).toEqual(["access-token", "refresh-token"])
    expect(looksEncrypted(readFileSync(SIDECAR, "utf8"))).toBe(true)
    expect(readFileSync(SIDECAR, "utf8")).not.toContain("sk-one")
    expect(git(["status", "--porcelain"])).toBe("")
  })

  test("it reports a hash prefix and never the value", () => {
    const out = pushCredentialToPage({
      ...CRED,
      accessToken: "sk-two",
      refreshToken: "rt-two",
      expiresAt: EXPIRES_AT + MINUTE,
    })
    if (out.kind !== "pushed") throw new Error(`expected a push, got ${out.kind}`)
    expect(out.digests.join(" ")).toContain(digestOf("sk-two"))
    expect(out.digests.join(" ")).not.toContain("sk-two")
  })

  test("the same credential again writes no second commit", () => {
    const before = git(["rev-parse", "HEAD"])
    const out = pushCredentialToPage({
      ...CRED,
      accessToken: "sk-two",
      refreshToken: "rt-two",
      expiresAt: EXPIRES_AT + 2 * MINUTE,
    })
    expect(out.kind).toBe("unchanged")
    expect(git(["rev-parse", "HEAD"])).toBe(before)
  })

  test("the expiry lands beside the page, outside git", () => {
    const at = EXPIRES_AT + 3 * MINUTE
    pushCredentialToPage({ ...CRED, accessToken: "sk-five", refreshToken: "rt-five", expiresAt: at })
    expect(readFileSync(UNCOMMITTED, "utf8")).toContain(new Date(at).toISOString())
    expect(git(["status", "--porcelain"])).toBe("")
  })

  test("an unchanged credential still moves the expiry on", () => {
    const later = EXPIRES_AT + HOUR
    const out = pushCredentialToPage({
      ...CRED,
      accessToken: "sk-five",
      refreshToken: "rt-five",
      expiresAt: later,
    })
    expect(out.kind).toBe("unchanged")
    expect(readFileSync(UNCOMMITTED, "utf8")).toContain(new Date(later).toISOString())
  })

  test("it keeps whatever else the uncommitted file already holds", () => {
    writeFileSync(UNCOMMITTED, "five-hour-percent-used: 12\n")
    pushCredentialToPage({ ...CRED, accessToken: "sk-six", refreshToken: "rt-six" })
    const held = readFileSync(UNCOMMITTED, "utf8")
    expect(held).toContain("five-hour-percent-used")
    expect(held).toContain(new Date(EXPIRES_AT).toISOString())
  })

  test("an account with no page is skipped rather than refused", () => {
    const out = pushCredentialToPage({ ...CRED, account: "nobody" })
    expect(out.kind).toBe("skipped")
  })

  test("an account name that would leave the tree is refused", () => {
    for (const account of ["../escape", "one/two", ""]) {
      expect(pushCredentialToPage({ ...CRED, account }).kind).toBe("refused")
    }
  })

  test("an empty or multi-line token never replaces a usable one, stale or fresh", () => {
    const before = readFileSync(SIDECAR, "utf8")
    expect(pushCredentialToPage({ ...CRED, accessToken: "", expiresAt: EXPIRES_AT - HOUR }).kind).toBe(
      "refused"
    )
    expect(pushCredentialToPage({ ...CRED, refreshToken: "a\nb", expiresAt: EXPIRES_AT + HOUR }).kind).toBe(
      "refused"
    )
    expect(readFileSync(SIDECAR, "utf8")).toBe(before)
  })

  test("a write it cannot make comes back refused rather than thrown, holding no landing lock", () => {
    const before = git(["rev-parse", "HEAD"])
    chmodSync(SIDECAR, 0o400)
    let threw: unknown = null
    let out: ReturnType<typeof pushCredentialToPage> | null = null
    try {
      out = pushCredentialToPage({
        ...CRED,
        accessToken: "sk-three",
        refreshToken: "rt-three",
        expiresAt: EXPIRES_AT + 2 * HOUR,
      })
    } catch (thrown) {
      threw = thrown
    }
    chmodSync(SIDECAR, 0o600)
    expect(threw).toBeNull()
    expect(out?.kind).toBe("refused")
    expect(locksLeft()).toEqual([])
    expect(git(["rev-parse", "HEAD"])).toBe(before)
  })

  test("nothing saying which key to encrypt to comes back refused rather than thrown", () => {
    const config = readFileSync(`${ROOT}/.sops.yaml`, "utf8")
    rmSync(`${ROOT}/.sops.yaml`)
    let threw: unknown = null
    let out: ReturnType<typeof pushCredentialToPage> | null = null
    try {
      out = pushCredentialToPage({
        ...CRED,
        accessToken: "sk-four",
        refreshToken: "rt-four",
        expiresAt: EXPIRES_AT + 3 * HOUR,
      })
    } catch (thrown) {
      threw = thrown
    }
    writeFileSync(`${ROOT}/.sops.yaml`, config)
    expect(threw).toBeNull()
    expect(out?.kind).toBe("refused")
    expect(existsSync(SIDECAR)).toBe(true)
  })
})

describe("the freshness gate — an older credential never displaces the one the page holds", () => {
  const TWO = { account: "two", accessToken: "sk-a", refreshToken: "rt-a", root: ROOT }

  const TWO_SIDECAR = `${ROOT}/pages/claude-account/two.claude-account.sops.yaml`

  const TWO_UNCOMMITTED = `${ROOT}/pages/claude-account/two.claude-account.uncommitted.yaml`

  const AT = Date.parse("2026-09-01T12:00:00.000Z")

  test("a page holding no expiry yet takes the push, as a null column did", () => {
    expect(existsSync(TWO_UNCOMMITTED)).toBe(false)
    expect(pushCredentialToPage({ ...TWO, expiresAt: AT }).kind).toBe("pushed")
    expect(readFileSync(TWO_UNCOMMITTED, "utf8")).toContain(new Date(AT).toISOString())
  })

  test("an expiry that does not read as an instant counts as none, so a corrupt one never wedges the account", () => {
    writeFileSync(TWO_UNCOMMITTED, `${EXPIRES_KEY}: whenever\n`)
    const out = pushCredentialToPage({
      ...TWO,
      accessToken: "sk-b",
      refreshToken: "rt-b",
      expiresAt: AT,
    })
    expect(out.kind).toBe("pushed")
    expect(readFileSync(TWO_UNCOMMITTED, "utf8")).toContain(new Date(AT).toISOString())
  })

  test("a push older than what the page holds is stale, and leaves the sops file byte for byte", () => {
    const before = readFileSync(TWO_SIDECAR, "utf8")
    const head = git(["rev-parse", "HEAD"])
    const out = pushCredentialToPage({
      ...TWO,
      accessToken: "sk-stale",
      refreshToken: "rt-stale",
      expiresAt: AT - HOUR,
    })
    expect(out.kind).toBe("stale")
    expect(readFileSync(TWO_SIDECAR, "utf8")).toBe(before)
    expect(readFileSync(TWO_UNCOMMITTED, "utf8")).toContain(new Date(AT).toISOString())
    expect(git(["rev-parse", "HEAD"])).toBe(head)
  })

  test("a push at the very same expiry is stale too, which is `lt` rather than `lte`", () => {
    const before = readFileSync(TWO_SIDECAR, "utf8")
    const out = pushCredentialToPage({
      ...TWO,
      accessToken: "sk-equal",
      refreshToken: "rt-equal",
      expiresAt: AT,
    })
    expect(out.kind).toBe("stale")
    expect(readFileSync(TWO_SIDECAR, "utf8")).toBe(before)
  })

  test("a push newer than what the page holds writes, and carries the expiry with it", () => {
    const before = readFileSync(TWO_SIDECAR, "utf8")
    const out = pushCredentialToPage({
      ...TWO,
      accessToken: "sk-fresh",
      refreshToken: "rt-fresh",
      expiresAt: AT + HOUR,
    })
    expect(out.kind).toBe("pushed")
    expect(readFileSync(TWO_SIDECAR, "utf8")).not.toBe(before)
    expect(readFileSync(TWO_UNCOMMITTED, "utf8")).toContain(new Date(AT + HOUR).toISOString())
  })

  test("the store lets a stale push pass in silence, and still throws on a real refusal", async () => {
    const store = pageCredentialStore(ROOT)
    await store.updateTokenIfNewer({
      account: "two",
      accessToken: "sk-late",
      refreshToken: "rt-late",
      expiresAt: AT,
    })
    expect(readFileSync(TWO_UNCOMMITTED, "utf8")).toContain(new Date(AT + HOUR).toISOString())
    await expect(
      store.updateTokenIfNewer({
        account: "two",
        accessToken: "",
        refreshToken: "rt-late",
        expiresAt: AT + 2 * HOUR,
      })
    ).rejects.toThrow()
  })
})

describe("the expiry marker — it records what landed, never what was attempted", () => {
  const THREE = { account: "three", accessToken: "sk-c", refreshToken: "rt-c", root: ROOT }

  const THREE_SIDECAR = `${ROOT}/pages/claude-account/three.claude-account.sops.yaml`

  const THREE_UNCOMMITTED = `${ROOT}/pages/claude-account/three.claude-account.uncommitted.yaml`

  const AT = Date.parse("2026-10-01T12:00:00.000Z")

  test("a sidecar that will not decrypt refuses, and moves the marker no further than the last landing", () => {
    expect(pushCredentialToPage({ ...THREE, expiresAt: AT }).kind).toBe("pushed")
    expect(readFileSync(THREE_UNCOMMITTED, "utf8")).toContain(new Date(AT).toISOString())

    const landed = readFileSync(THREE_SIDECAR, "utf8")
    writeFileSync(THREE_SIDECAR, "access-token: nothing-sops-wrote\n")
    const out = pushCredentialToPage({
      ...THREE,
      accessToken: "sk-d",
      refreshToken: "rt-d",
      expiresAt: AT + HOUR,
    })
    writeFileSync(THREE_SIDECAR, landed)

    expect(out.kind).toBe("refused")
    const held = readFileSync(THREE_UNCOMMITTED, "utf8")
    expect(held).toContain(new Date(AT).toISOString())
    expect(held).not.toContain(new Date(AT + HOUR).toISOString())
  })

  test("that refusal wedges nothing: the same expiry still lands once the sidecar reads again", () => {
    const out = pushCredentialToPage({
      ...THREE,
      accessToken: "sk-d",
      refreshToken: "rt-d",
      expiresAt: AT + HOUR,
    })
    expect(out.kind).toBe("pushed")
    expect(readFileSync(THREE_UNCOMMITTED, "utf8")).toContain(new Date(AT + HOUR).toISOString())
  })

  test("nothing saying which key to encrypt to refuses past the sidecar read, and moves the marker no further", () => {
    const config = readFileSync(`${ROOT}/.sops.yaml`, "utf8")
    rmSync(`${ROOT}/.sops.yaml`)
    const out = pushCredentialToPage({
      ...THREE,
      accessToken: "sk-e",
      refreshToken: "rt-e",
      expiresAt: AT + 2 * HOUR,
    })
    writeFileSync(`${ROOT}/.sops.yaml`, config)

    expect(out.kind).toBe("refused")
    const held = readFileSync(THREE_UNCOMMITTED, "utf8")
    expect(held).toContain(new Date(AT + HOUR).toISOString())
    expect(held).not.toContain(new Date(AT + 2 * HOUR).toISOString())
  })
})

