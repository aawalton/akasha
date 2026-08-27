import { describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { answer } from "../holds.ts"
import { installRepos } from "./fixture.ts"

const SCRATCH = "/var/tmp"

const COMMAND = `${import.meta.dir}/../holds.ts`

const COMMENTS = { pattern: "//[^\\n]*", flags: "g" }

interface Ask {
  readonly views: Readonly<Record<string, readonly { readonly pattern: string; readonly flags: string }[]>>
  readonly needles: readonly { readonly id: string; readonly view: string; readonly text: string }[]
  readonly paths: readonly string[]
}

function tree(files: Readonly<Record<string, string>>): string {
  const root = mkdtempSync(`${SCRATCH}/holds-`)
  for (const [relPath, body] of Object.entries(files)) {
    const at = `${root}/${relPath}`
    mkdirSync(at.split("/").slice(0, -1).join("/"), { recursive: true })
    writeFileSync(at, body)
  }
  // THE REPO PAGES SAY WHICH REPOSITORIES THERE ARE, read out of the root `AKASHA_ROOT` names, so a
  // temp tree without them makes `roots.ts` throw before `holds.ts` reads its request.
  installRepos(root)
  // A ROOT IS NAMED ONLY WHERE IT IS CLONED — `resolveRoots` skips a directory holding no `.git` —
  // so an un-inited tree is answered as no akasha at all and `rootFor` throws.
  Bun.spawnSync(["git", "init", "-q"], { cwd: root })
  return root
}

function asked(request: Ask, bodies: Readonly<Record<string, string>>): unknown {
  const text = answer(request, (relPath) => {
    const body = bodies[relPath]
    if (body === undefined) throw new Error(`the test handed no body for ${relPath}`)
    return body
  })
  return JSON.parse(text).paths
}

async function spawned(root: string, request: Ask): Promise<{ code: number; stderr: string }> {
  const run = Bun.spawn(["bun", COMMAND], {
    // `AKASHA_ROOT` IS WHAT NAMES THE TEMP TREE: `holds.ts` takes its paths against
    // `rootFor(resolveRoots(), AKASHA)`, so a case that left this alone would run against the live
    // checkout, where `tools/commands/there.ts` does not exist.
    env: { ...process.env, AKASHA_ROOT: root },
    stdin: new TextEncoder().encode(JSON.stringify(request)),
    stdout: "pipe",
    stderr: "pipe",
  })
  const stderr = await new Response(run.stderr).text()
  return { code: await run.exited, stderr }
}

describe("ops instructions holds — the request carries the predicate and this only looks", () => {
  test("a needle present is found and one absent is not, per path, in request order", () => {
    const request: Ask = {
      views: { whole: [] },
      needles: [
        { id: "first", view: "whole", text: "AWAITING" },
        { id: "second", view: "whole", text: "DISPATCHABLE" },
      ],
      paths: ["a.ts", "b.ts"],
    }

    expect(asked(request, { "a.ts": "const S = AWAITING\n", "b.ts": "const S = DISPATCHABLE\n" })).toEqual([
      { path: "a.ts", found: ["first"] },
      { path: "b.ts", found: ["second"] },
    ])
  })

  test("a view deletes before the look — and the same needle without the view is found, so the empty answer is the deletion rather than a look that never happened", () => {
    const needles = [{ id: "only-in-a-comment", view: "code", text: "AWAITING" }]
    const body = { "a.ts": "// AWAITING\n" }

    expect(asked({ views: { code: [] }, needles, paths: ["a.ts"] }, body)).toEqual([
      { path: "a.ts", found: ["only-in-a-comment"] },
    ])
    expect(asked({ views: { code: [COMMENTS] }, needles, paths: ["a.ts"] }, body)).toEqual([
      { path: "a.ts", found: [] },
    ])
  })

  test("every path asked about comes back, spelled and ordered as it was asked about", () => {
    const request: Ask = {
      views: { whole: [] },
      needles: [{ id: "n", view: "whole", text: "nowhere" }],
      paths: ["./b.ts", "a.ts"],
    }

    expect(asked(request, { "./b.ts": "", "a.ts": "" })).toEqual([
      { path: "./b.ts", found: [] },
      { path: "a.ts", found: [] },
    ])
  })

  test("a path that cannot be read exits 1 naming it — and the same call without it exits 0, so the refusal is the missing path rather than the command", async () => {
    const root = tree({ "tools/commands/there.ts": "AWAITING\n" })
    const views = { whole: [] }
    const needles = [{ id: "n", view: "whole", text: "AWAITING" }]
    try {
      const ok = await spawned(root, { views, needles, paths: ["tools/commands/there.ts"] })
      expect(ok.code).toBe(0)

      const bad = await spawned(root, {
        views,
        needles,
        paths: ["tools/commands/there.ts", "tools/commands/gone.ts"],
      })
      expect(bad.code).toBe(1)
      expect(bad.stderr).toContain("tools/commands/gone.ts")
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("a needle naming a view the request does not define exits 1 naming both", async () => {
    const root = tree({ "tools/commands/there.ts": "AWAITING\n" })
    try {
      const bad = await spawned(root, {
        views: { code: [] },
        needles: [{ id: "stray", view: "prose", text: "AWAITING" }],
        paths: ["tools/commands/there.ts"],
      })

      expect(bad.code).toBe(1)
      expect(bad.stderr).toContain("stray")
      expect(bad.stderr).toContain("prose")
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("a path leaving this repository is refused before anything is read", async () => {
    const root = tree({ "tools/commands/there.ts": "AWAITING\n" })
    try {
      const bad = await spawned(root, {
        views: { whole: [] },
        needles: [{ id: "n", view: "whole", text: "AWAITING" }],
        paths: ["../outside.ts"],
      })

      expect(bad.code).toBe(1)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})
