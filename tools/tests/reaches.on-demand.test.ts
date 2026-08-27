import { describe, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { SEAM, tree } from "./reaches-tree.ts"

describe("bun tools/reaches.ts — what the run itself reports", () => {
  const run = async (
    root: string,
    flags: readonly string[] = ["--json"]
  ): Promise<{ code: number; out: string; err: string }> => {
    const child = Bun.spawn([process.execPath, `${import.meta.dir}/../reaches.ts`, ...flags], {
      // `AKASHA_ROOT` IS WHAT NAMES THE TEMP TREE. This set `INSTRUCTIONS_ROOT`, which nothing reads:
      // `reaches.ts` scans `rootFor(resolveRoots(), AKASHA)`, so each case below scanned the live
      // checkout and read back its several hundred refs rather than the one file it had written.
      env: { ...process.env, AKASHA_ROOT: root },
      stdout: "pipe",
      stderr: "pipe",
    })
    const [out, err] = await Promise.all([new Response(child.stdout).text(), new Response(child.stderr).text()])
    return { code: await child.exited, out, err }
  }

  test("it refuses on a population of zero rather than publishing an empty set", async () => {
    const root = tree({ "domains/thing.md": "# Thing\n" })
    try {
      const ran = await run(root)
      expect(ran.code).toBe(2)
      expect(ran.out).toBe("")
      expect(ran.err).toContain("no population")
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("it writes one JSON object to stdout, and its population to stderr", async () => {
    const body = `${SEAM}const A = "@a/pkg"\nawait codeModule(A)\n`
    const root = tree({ "tools/commands/a.ts": body })
    try {
      const ran = await run(root)
      expect(ran.code).toBe(0)
      expect(JSON.parse(ran.out)).toEqual({
        scanned: 1,
        reaches: [
          {
            ref: "@a/pkg",
            kind: "specifier",
            sites: ["tools/commands/a.ts"],
            handed: ["tools/commands/a.ts"],
          },
        ],
        ambiguous: [],
        unfollowed: [],
      })
      expect(ran.err).toContain("1 file(s) read")
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("without --json it prints each ref with the sites naming it, not a count alone", async () => {
    const body = `${SEAM}const A = "packages/a/src/a.ts"\nawait codeModule(A)\n`
    const root = tree({ "tools/commands/a.ts": body })
    try {
      const ran = await run(root, [])
      expect(ran.code).toBe(0)
      expect(ran.out).toBe("path\tpackages/a/src/a.ts\t1 site(s): tools/commands/a.ts\n")
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})
