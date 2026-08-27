
import { describe, expect, test } from "bun:test"
import { resolveRoots } from "../../repo/roots/roots"

const root = resolveRoots().instructions

const NAMED: readonly (readonly [string, string])[] = [
  ["tools/commands/reminder/set.ts", "ops reminder set"],
  ["tools/commands/check-addon-removed-refs.ts", "ops check-addon-removed-refs"],
  ["tools/commands/check-addon-sandbox-load.ts", "ops check-addon-sandbox-load"],
  ["tools/commands/check-addon-sandbox-safety.ts", "ops check-addon-sandbox-safety"],
  ["tools/commands/inference/segment.ts", "ops inference segment"],
  ["tools/commands/tests/triage-fanout.ts", "ops tests triage-fanout"],
]

async function ranAsAFile(relPath: string): Promise<{ readonly code: number; readonly stderr: string }> {
  const run = Bun.spawn(["bun", `${root}/${relPath}`], {
    stdin: "ignore",
    stdout: "pipe",
    stderr: "pipe",
  })
  const stderr = await new Response(run.stderr).text()
  return { code: await run.exited, stderr }
}

describe("an ops command run as a file", () => {
  for (const [relPath, invocation] of NAMED) {
    test(`${relPath} refuses rather than exiting 0 having done nothing`, async () => {
      const ran = await ranAsAFile(relPath)
      expect(ran.code).not.toBe(0)
      expect(ran.stderr).toContain("refused:")
      expect(ran.stderr).toContain(invocation)
    })
  }
})
