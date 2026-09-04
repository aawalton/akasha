import { expect, test } from "bun:test"
import {
  checkForUpdate,
  classifyGitRelation,
  classifyVersionResponse,
  cleanupOldExe,
  exeSwapPaths,
  type FetchingBytes,
  type FetchingText,
  gitRepoAt,
  performSourceUpdate,
  performUpdate,
  resolveSourceHeadSha,
  SOURCE_UPDATE_EXIT_CODE,
} from "./watcher-updating.module.code.ts"
import {
  badGateway,
  cleanupRecorder,
  DEPLOYED,
  EXE,
  liveJson,
  NEXT_EXE,
  PREVIOUS_EXE,
  RUNNING,
  repoStub,
  swapRecorder,
} from "./watcher-updating.module.test-fixtures.ts"

const SCRATCH_AT = "/var/tmp"

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

test("unknown extra fields are tolerated", () => {
  expect(
    classifyVersionResponse({
      ...liveJson(DEPLOYED),
      body: JSON.stringify({ version: DEPLOYED, downloadUrl: "/x", sha256: "…", releasedAt: "…" }),
    })
  ).toEqual({ kind: "update-available", version: DEPLOYED })
})

test("an HTTP error is check-failed, never current", () => {
  expect(
    classifyVersionResponse({
      ok: false,
      status: 404,
      contentType: "text/html",
      body: "<!DOCTYPE html><html><head><title>Temper</title></head></html>",
      runningVersion: RUNNING,
    })
  ).toEqual({
    kind: "check-failed",
    reason: "http-error",
    detail: expect.stringContaining("404"),
  })
})

test("a text/plain 500 is http-error", () => {
  expect(
    classifyVersionResponse({
      ok: false,
      status: 500,
      contentType: "text/plain",
      body: "Internal Server Error",
      runningVersion: RUNNING,
    })
  ).toMatchObject({ kind: "check-failed", reason: "http-error" })
})

test("a 2xx carrying a non-JSON body is non-json", () => {
  expect(
    classifyVersionResponse({
      ok: true,
      status: 200,
      contentType: "text/html",
      body: "<html><body>Sign in to continue</body></html>",
      runningVersion: RUNNING,
    })
  ).toMatchObject({ kind: "check-failed", reason: "non-json" })
})

test("JSON without a version field is malformed-body", () => {
  expect(classifyVersionResponse({ ...liveJson(DEPLOYED), body: "{}" })).toMatchObject({
    kind: "check-failed",
    reason: "malformed-body",
  })
})

test("a non-string version is malformed-body", () => {
  expect(classifyVersionResponse({ ...liveJson(DEPLOYED), body: '{"version":123}' })).toMatchObject(
    { kind: "check-failed", reason: "malformed-body" }
  )
})

test("an unparseable body naming JSON is malformed-body, not a throw", () => {
  expect(classifyVersionResponse({ ...liveJson(DEPLOYED), body: "not json at all" })).toMatchObject(
    { kind: "check-failed", reason: "malformed-body" }
  )
})

test("an empty version string is malformed-body and never an update", () => {
  const result = classifyVersionResponse({ ...liveJson(""), body: '{"version":""}' })
  expect(result).toMatchObject({ kind: "check-failed", reason: "malformed-body" })
  expect(result.kind).not.toBe("update-available")
})

test("a whitespace-only version string is malformed-body", () => {
  expect(
    classifyVersionResponse({ ...liveJson(DEPLOYED), body: '{"version":"   "}' })
  ).toMatchObject({ kind: "check-failed", reason: "malformed-body" })
})

test("a padded version string is trimmed before it is compared", () => {
  expect(
    classifyVersionResponse({
      ok: true,
      status: 200,
      contentType: "application/json",
      body: '{"version":" 2.0.0 ","extra":1}',
      runningVersion: "1.0.0",
    })
  ).toEqual({ kind: "update-available", version: "2.0.0" })
})

test("a full HTML error page is truncated, never carried whole", () => {
  const result = classifyVersionResponse(badGateway())
  if (result.kind !== "check-failed") throw new Error("expected check-failed")
  expect(result.detail.length).toBeLessThan(320)
})

test("the detail is one line", () => {
  const result = classifyVersionResponse(badGateway())
  if (result.kind !== "check-failed") throw new Error("expected check-failed")
  expect(result.detail).not.toContain("\n")
})

test("the detail names the status and the content-type", () => {
  const result = classifyVersionResponse(badGateway())
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

test("the detail on a collapsed html body is byte for byte the legacy answer", () => {
  expect(
    classifyVersionResponse({
      ok: false,
      status: 502,
      contentType: "text/html",
      body: "<html>  bad\n gateway </html>",
      runningVersion: "1.0.0",
    })
  ).toEqual({
    kind: "check-failed",
    reason: "http-error",
    detail: "HTTP 502, text/html: <html> bad gateway </html>",
  })
})

test("the detail on an empty body with no content-type is byte for byte the legacy answer", () => {
  expect(
    classifyVersionResponse({
      ok: false,
      status: 500,
      contentType: "",
      body: "",
      runningVersion: "1.0.0",
    })
  ).toEqual({
    kind: "check-failed",
    reason: "http-error",
    detail: "HTTP 500, no content-type: ",
  })
})

test("a body over the ceiling is shortened to 200 characters and an ellipsis", () => {
  const result = classifyVersionResponse({
    ok: false,
    status: 404,
    contentType: "application/json",
    body: "x".repeat(250),
    runningVersion: "1.0.0",
  })
  if (result.kind !== "check-failed") throw new Error("expected check-failed")
  expect(result.detail).toBe(`HTTP 404, application/json: ${"x".repeat(200)}…`)
})

test("the whole eight-row relation table answers what the legacy answered", () => {
  const rows: string[] = []
  for (const equal of [true, false])
    for (const headIsAncestorOfTarget of [true, false])
      for (const targetIsAncestorOfHead of [true, false])
        rows.push(classifyGitRelation({ equal, headIsAncestorOfTarget, targetIsAncestorOfHead }))
  expect(rows).toEqual([
    "equal",
    "equal",
    "equal",
    "equal",
    "behind",
    "behind",
    "ahead",
    "diverged",
  ])
})

test("equal takes precedence over both ancestor flags being false", () => {
  expect(
    classifyGitRelation({
      equal: true,
      headIsAncestorOfTarget: false,
      targetIsAncestorOfHead: false,
    })
  ).toBe("equal")
})

test("the exit code a source update asks for is 75", () => {
  expect(SOURCE_UPDATE_EXIT_CODE).toBe(75)
})

test("the version check reaches the worker version address", async () => {
  const asked: string[] = []
  const fetchText: FetchingText = async (url) => {
    asked.push(url)
    return { ok: true, status: 200, contentType: "application/json", body: '{"version":"9"}' }
  }
  expect(await checkForUpdate("https://temper.test", "8", { fetchText })).toEqual({
    kind: "update-available",
    version: "9",
  })
  expect(asked).toEqual(["https://temper.test/api/watcher/worker/version"])
})

test("a network reach that throws is unreachable carrying the message", async () => {
  const fetchText: FetchingText = async () => {
    throw new Error("connect ECONNREFUSED")
  }
  expect(await checkForUpdate("https://temper.test", "8", { fetchText })).toEqual({
    kind: "check-failed",
    reason: "unreachable",
    detail: "connect ECONNREFUSED",
  })
})

test("a thrown value that is no error is unreachable carrying its text", async () => {
  const fetchText: FetchingText = async () => {
    throw "socket hang up"
  }
  expect(await checkForUpdate("https://temper.test", "8", { fetchText })).toEqual({
    kind: "check-failed",
    reason: "unreachable",
    detail: "socket hang up",
  })
})

test("the swap paths sit beside the running executable", () => {
  expect(exeSwapPaths(EXE)).toEqual({ current: EXE, next: NEXT_EXE, previous: PREVIOUS_EXE })
})

test("the executable is downloaded, written beside, swapped in and the worker exits zero", async () => {
  const r = swapRecorder()
  await performUpdate("https://temper.test", r.deps)
  expect(r.steps).toEqual([
    "fetch https://temper.test/api/watcher/worker/download",
    `write ${NEXT_EXE} 2`,
    `rename ${EXE} -> ${PREVIOUS_EXE}`,
    `rename ${NEXT_EXE} -> ${EXE}`,
    "exit 0",
  ])
})

test("under the source runtime nothing is downloaded and nothing is swapped", async () => {
  const r = swapRecorder()
  await performUpdate("https://temper.test", { ...r.deps, sourceRuntime: () => true })
  expect(r.steps).toEqual([])
})

test("a download the server refused throws naming the status and swaps nothing", async () => {
  const r = swapRecorder()
  const refused: FetchingBytes = async () => ({ ok: false, status: 503, body: new Uint8Array() })
  await expect(
    performUpdate("https://temper.test", { ...r.deps, fetchBytes: refused })
  ).rejects.toThrow("Download failed: HTTP 503")
  expect(r.steps).toEqual([])
})

test("the superseded executable is deleted when it is there", () => {
  const r = cleanupRecorder()
  cleanupOldExe(r.deps)
  expect(r.removed).toEqual([PREVIOUS_EXE])
})

test("no superseded executable means nothing is deleted", () => {
  const r = cleanupRecorder()
  cleanupOldExe({ ...r.deps, present: () => false })
  expect(r.removed).toEqual([])
})

test("a deletion the operating system refuses is swallowed", () => {
  const r = cleanupRecorder()
  expect(() =>
    cleanupOldExe({
      ...r.deps,
      remove: () => {
        throw new Error("EPERM")
      },
    })
  ).not.toThrow()
})

test("under the source runtime no superseded executable is looked for", () => {
  const r = cleanupRecorder()
  cleanupOldExe({ ...r.deps, sourceRuntime: () => true })
  expect(r.looked).toEqual([])
})

test("the head sha is answered through the repository handed in", () => {
  expect(resolveSourceHeadSha("/nowhere", { repo: repoStub({}) })).toBe(RUNNING)
})

test("a directory git cannot read answers no head sha rather than throwing", () => {
  expect(gitRepoAt(`${SCRATCH_AT}/watcher-updating-absent-repo`).headSha()).toBeNull()
})

test("a checkout git cannot read is not a git checkout", () => {
  expect(
    performSourceUpdate("/nowhere", DEPLOYED, { repo: repoStub({ headSha: () => null }) })
  ).toEqual({ advanced: false, relation: "unknown", reason: "not-a-git-checkout" })
})

test("a head already at the target is up to date without any fetch", () => {
  const calls: string[] = []
  expect(performSourceUpdate("/nowhere", RUNNING, { repo: repoStub({}, calls) })).toEqual({
    advanced: false,
    relation: "equal",
    reason: "up-to-date",
  })
  expect(calls).toEqual(["headSha"])
})

test("a fetch git refused stops the update", () => {
  expect(
    performSourceUpdate("/nowhere", DEPLOYED, { repo: repoStub({ fetchOrigin: () => false }) })
  ).toEqual({ advanced: false, relation: "unknown", reason: "fetch-failed" })
})

test("a target sha the fetch did not bring stops the update", () => {
  expect(
    performSourceUpdate("/nowhere", DEPLOYED, { repo: repoStub({ holdsCommit: () => false }) })
  ).toEqual({ advanced: false, relation: "unknown", reason: "target-not-fetched" })
})

test("a checkout behind the target is fast-forwarded onto it", () => {
  const calls: string[] = []
  expect(performSourceUpdate("/nowhere", DEPLOYED, { repo: repoStub({}, calls) })).toEqual({
    advanced: true,
    relation: "behind",
    reason: "advanced",
  })
  expect(calls).toEqual([
    "headSha",
    "fetchOrigin",
    "holdsCommit",
    "isAncestor 3f3a c5ea",
    "isAncestor c5ea 3f3a",
    "fastForwardTo",
  ])
})

test("a checkout ahead of the target is left alone", () => {
  const calls: string[] = []
  expect(
    performSourceUpdate("/nowhere", DEPLOYED, {
      repo: repoStub({ isAncestor: (earlier) => earlier === DEPLOYED }, calls),
    })
  ).toEqual({ advanced: false, relation: "ahead", reason: "no-ff-ahead" })
  expect(calls).not.toContain("fastForwardTo")
})

test("a checkout diverged from the target is left alone", () => {
  expect(
    performSourceUpdate("/nowhere", DEPLOYED, { repo: repoStub({ isAncestor: () => false }) })
  ).toEqual({ advanced: false, relation: "diverged", reason: "no-ff-diverged" })
})

test("a fast-forward git refused is reported as a failed merge", () => {
  expect(
    performSourceUpdate("/nowhere", DEPLOYED, { repo: repoStub({ fastForwardTo: () => false }) })
  ).toEqual({ advanced: false, relation: "behind", reason: "ff-merge-failed" })
})
