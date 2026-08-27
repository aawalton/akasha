import { describe, expect, test } from "bun:test"
import { classifyGitRelation, classifyVersionResponse } from "./updater"

const RUNNING = "3f3a986e34583abb8d0112cd8be450eb309bc779"
const DEPLOYED = "c5ea83760f1e4a9b8d3c2f5e7a1b9d4c6e8f0a2b"

function liveJson(version: string): Parameters<typeof classifyVersionResponse>[0] {
  return {
    ok: true,
    status: 200,
    contentType: "application/json;charset=utf-8",
    body: JSON.stringify({ version, downloadUrl: "/api/watcher/worker/download" }),
    runningVersion: RUNNING,
  }
}

describe("classifyVersionResponse — only up-to-date may mean current", () => {
  test("a different non-empty version is an available update", () => {
    expect(classifyVersionResponse(liveJson(DEPLOYED))).toEqual({
      kind: "update-available",
      version: DEPLOYED,
    })
  })

  test("the same version is the one arm that means current", () => {
    expect(classifyVersionResponse(liveJson(RUNNING))).toEqual({ kind: "up-to-date" })
  })

  test("the live charset-suffixed content-type is accepted as JSON", () => {
    expect(classifyVersionResponse(liveJson(DEPLOYED)).kind).toBe("update-available")
  })

  test("unknown extra fields are tolerated, so a server-side field addition cannot break the check", () => {
    const result = classifyVersionResponse({
      ...liveJson(DEPLOYED),
      body: JSON.stringify({ version: DEPLOYED, downloadUrl: "/x", sha256: "…", releasedAt: "…" }),
    })
    expect(result).toEqual({ kind: "update-available", version: DEPLOYED })
  })

  test("an HTTP error is check-failed, never current", () => {
    const result = classifyVersionResponse({
      ok: false,
      status: 404,
      contentType: "text/html",
      body: "<!DOCTYPE html><html><head><title>Temper</title></head></html>",
      runningVersion: RUNNING,
    })
    expect(result).toEqual({
      kind: "check-failed",
      reason: "http-error",
      detail: expect.stringContaining("404"),
    })
  })

  test("a text/plain 500 — React Router's real last-resort shape — is http-error", () => {
    const result = classifyVersionResponse({
      ok: false,
      status: 500,
      contentType: "text/plain",
      body: "Internal Server Error",
      runningVersion: RUNNING,
    })
    expect(result.kind).toBe("check-failed")
    expect(result).toMatchObject({ reason: "http-error" })
  })

  test("a 2xx carrying a non-JSON body is non-json", () => {
    const result = classifyVersionResponse({
      ok: true,
      status: 200,
      contentType: "text/html",
      body: "<html><body>Sign in to continue</body></html>",
      runningVersion: RUNNING,
    })
    expect(result).toMatchObject({ kind: "check-failed", reason: "non-json" })
  })

  test("JSON without a version field is malformed-body", () => {
    const result = classifyVersionResponse({ ...liveJson(DEPLOYED), body: JSON.stringify({}) })
    expect(result).toMatchObject({ kind: "check-failed", reason: "malformed-body" })
  })

  test("a non-string version is malformed-body", () => {
    const result = classifyVersionResponse({
      ...liveJson(DEPLOYED),
      body: JSON.stringify({ version: 123 }),
    })
    expect(result).toMatchObject({ kind: "check-failed", reason: "malformed-body" })
  })

  test("an unparseable body that claims JSON is malformed-body, not a throw", () => {
    const result = classifyVersionResponse({ ...liveJson(DEPLOYED), body: "not json at all" })
    expect(result).toMatchObject({ kind: "check-failed", reason: "malformed-body" })
  })

  test("an EMPTY version string is malformed-body — it must never read as an update", () => {
    const result = classifyVersionResponse({
      ...liveJson(""),
      body: JSON.stringify({ version: "", downloadUrl: "/api/watcher/worker/download" }),
    })
    expect(result).toMatchObject({ kind: "check-failed", reason: "malformed-body" })
    expect(result.kind).not.toBe("update-available")
  })

  test("a whitespace-only version string is malformed-body", () => {
    const result = classifyVersionResponse({
      ...liveJson(DEPLOYED),
      body: JSON.stringify({ version: "   " }),
    })
    expect(result).toMatchObject({ kind: "check-failed", reason: "malformed-body" })
  })
})

describe("classifyVersionResponse — error-body hygiene on the detail", () => {
  const htmlPage = `<!DOCTYPE html>\n<html>\n  <head>\n    <title>502 Bad Gateway</title>\n  </head>\n  <body>\n    ${"x".repeat(5000)}\n  </body>\n</html>`

  test("a full HTML error page is truncated, never carried whole", () => {
    const result = classifyVersionResponse({
      ok: false,
      status: 502,
      contentType: "text/html",
      body: htmlPage,
      runningVersion: RUNNING,
    })
    if (result.kind !== "check-failed") throw new Error("expected check-failed")
    expect(result.detail.length).toBeLessThan(320)
  })

  test("the detail is one line — no raw newlines to break the log format", () => {
    const result = classifyVersionResponse({
      ok: false,
      status: 502,
      contentType: "text/html",
      body: htmlPage,
      runningVersion: RUNNING,
    })
    if (result.kind !== "check-failed") throw new Error("expected check-failed")
    expect(result.detail).not.toContain("\n")
  })

  test("the detail names the status and the content-type, which is what identifies the mode", () => {
    const result = classifyVersionResponse({
      ok: false,
      status: 502,
      contentType: "text/html",
      body: htmlPage,
      runningVersion: RUNNING,
    })
    if (result.kind !== "check-failed") throw new Error("expected check-failed")
    expect(result.detail).toContain("502")
    expect(result.detail).toContain("text/html")
  })

  test("a missing content-type is reported as absent rather than blank", () => {
    const result = classifyVersionResponse({
      ok: true,
      status: 200,
      contentType: "",
      body: "whatever",
      runningVersion: RUNNING,
    })
    if (result.kind !== "check-failed") throw new Error("expected check-failed")
    expect(result.reason).toBe("non-json")
    expect(result.detail).toContain("no content-type")
  })
})

describe("classifyGitRelation — source-update decision core", () => {
  test("equal HEAD/target is up-to-date (no fast-forward)", () => {
    expect(
      classifyGitRelation({
        equal: true,
        headIsAncestorOfTarget: true,
        targetIsAncestorOfHead: true,
      })
    ).toBe("equal")
  })

  test("HEAD strictly behind the deployed SHA → behind (the only relation we ff)", () => {
    expect(
      classifyGitRelation({
        equal: false,
        headIsAncestorOfTarget: true,
        targetIsAncestorOfHead: false,
      })
    ).toBe("behind")
  })

  test("checkout pulled past the deploy → ahead (left alone)", () => {
    expect(
      classifyGitRelation({
        equal: false,
        headIsAncestorOfTarget: false,
        targetIsAncestorOfHead: true,
      })
    ).toBe("ahead")
  })

  test("local commits not on the deploy line → diverged (left alone)", () => {
    expect(
      classifyGitRelation({
        equal: false,
        headIsAncestorOfTarget: false,
        targetIsAncestorOfHead: false,
      })
    ).toBe("diverged")
  })

  test("equal takes precedence over the ancestor flags", () => {
    expect(
      classifyGitRelation({
        equal: true,
        headIsAncestorOfTarget: false,
        targetIsAncestorOfHead: false,
      })
    ).toBe("equal")
  })
})
