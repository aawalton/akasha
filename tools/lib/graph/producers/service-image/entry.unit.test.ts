import { describe, expect, test } from "bun:test"
import { entryOf } from "./entry.ts"

const NAMED = "some-service"

const DIR = "packages/infra/auth-proxy"

const refusalFrom = (run: () => string): string => {
  try {
    run()
  } catch (error) {
    return (error as Error).message
  }
  return ""
}

describe("which file a bun service image starts", () => {
  test("an image stating no runtime command starts src/server.ts under its own directory", () => {
    expect(entryOf(NAMED, DIR, undefined)).toBe("packages/infra/auth-proxy/src/server.ts")
  })

  test("a runtime command wrapped in an init process still answers with the script bun runs", () => {
    const cmd = ["/sbin/tini", "--", "bun", "run", "packages/infra/gfs/src/main.ts"]
    expect(entryOf(NAMED, DIR, cmd)).toBe("packages/infra/gfs/src/main.ts")
  })

  test("a runtime command naming a working directory resolves its script against that directory", () => {
    const cmd = ["bun", "run", "--cwd", "packages/alanwalton/calendar/sync", "src/run-sync.ts"]
    expect(entryOf(NAMED, DIR, cmd)).toBe("packages/alanwalton/calendar/sync/src/run-sync.ts")
  })

  test("a runtime command never reaching bun run is refused rather than answered with the default", () => {
    const cmd = ["sh", "-c", "sleep infinity"]
    expect(refusalFrom(() => entryOf(NAMED, DIR, cmd))).toContain("never reaches bun run")
  })

  test("a runtime command starting something that is not TypeScript is refused", () => {
    const cmd = ["bun", "run", "packages/infra/auth-proxy/start.sh"]
    expect(refusalFrom(() => entryOf(NAMED, DIR, cmd))).toContain("starting no TypeScript file")
  })

  test("a runtime command naming no script after bun run is refused", () => {
    const cmd = ["bun", "run"]
    expect(refusalFrom(() => entryOf(NAMED, DIR, cmd))).toContain("naming no script after bun run")
  })

  test("a working directory flag with nothing after it is refused rather than read as a script", () => {
    const cmd = ["bun", "run", "--cwd"]
    expect(refusalFrom(() => entryOf(NAMED, DIR, cmd))).toContain("naming no script after bun run")
  })

  test("the answer is one file, not the directory the image copies in", () => {
    const answered = entryOf(NAMED, DIR, undefined)
    expect(answered.startsWith(`${DIR}/`)).toBe(true)
    expect(answered).not.toBe(DIR)
  })
})
