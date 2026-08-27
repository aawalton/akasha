import { describe, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { codeReaches, type Reaches } from "../lib/code-reaches.ts"
import { SEAM, tree } from "./reaches-tree.ts"

const NOWHERE = "/var/tmp/reaches-no-code-tree"

function refs(found: Reaches): readonly string[] {
  return found.reaches.map((one) => one.ref)
}

function within(root: string, run: (found: Reaches) => void, there?: string): void {
  try {
    run(codeReaches(root, there ?? NOWHERE))
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

describe("ops instructions reaches — the answer is derived from the tree on the run", () => {
  test("a reach added appears, and a reach removed goes, with nothing else edited", () => {
    const one = `${SEAM}const FIRST = "packages/one/src/first.ts"\nawait codeModule(FIRST)\n`
    const two = `${SEAM}const SECOND = "@second/pkg"\nawait codeModule(SECOND)\n`
    const gone = `${SEAM}console.log("this one names no code")\n`

    within(tree({ "tools/commands/one.ts": one }), (found) => {
      expect(refs(found)).toEqual(["packages/one/src/first.ts"])
    })
    within(tree({ "tools/commands/one.ts": one, "tools/commands/two.ts": two }), (found) => {
      expect(refs(found)).toEqual(["@second/pkg", "packages/one/src/first.ts"])
    })
    within(tree({ "tools/commands/one.ts": gone, "tools/commands/two.ts": two }), (found) => {
      expect(refs(found)).toEqual(["@second/pkg"])
    })
  })

  test("a path named as a string is published, with no call to hand it to", () => {
    const seed = `${SEAM}const SEED = "ts-file:code:packages/one/src/first.ts"\nconsole.log(SEED)\n`
    within(tree({ "tools/lib/table.ts": seed }), (found) => {
      expect(refs(found)).toEqual(["packages/one/src/first.ts"])
      expect(found.reaches[0]?.handed).toEqual([])
    })
  })

  test("a node id's prefix says which repository the path names, and this one is left out", () => {
    // `akasha` IS THE REPOSITORY THIS COMMAND RUNS IN. The prefix was `instructions`, a repository
    // absorbed into akasha: `repoNamed` puts a prefix through `isAddressable`, which answers no for
    // a repo no `pages/repo` page names, so the node id read as a bare path and was published.
    const seed = `${SEAM}const SEED = "ts-file:akasha:packages/one/src/first.ts"\nconsole.log(SEED)\n`
    within(tree({ "tools/lib/table.ts": seed }), (found) => {
      expect(refs(found)).toEqual([])
      expect(found.ambiguous).toEqual([])
    })
  })

  test("a bare path only one tree holds names that tree, and is published rather than dropped", () => {
    const named = `${SEAM}const WHERE = "packages/one/src/first.ts"\nconsole.log(WHERE)\n`
    const held = { "tools/lib/named.ts": named, "packages/one/src/first.ts": "export const one = 1\n" }
    const away = tree({ "packages/two/src/second.ts": "export const two = 2\n" })
    try {
      within(tree(held), (found) => {
        expect(refs(found)).toEqual(["packages/one/src/first.ts"])
        expect(found.ambiguous).toEqual([])
      }, away)
    } finally {
      rmSync(away, { recursive: true, force: true })
    }
  })

  test("a bare path both trees hold is ambiguous, nothing in the text picking one of them", () => {
    const named = `${SEAM}const WHERE = "packages/one/src/first.ts"\nconsole.log(WHERE)\n`
    const held = { "tools/lib/named.ts": named, "packages/one/src/first.ts": "export const one = 1\n" }
    const away = tree({ "packages/one/src/first.ts": "export const one = 1\n" })
    try {
      within(tree(held), (found) => {
        expect(refs(found)).toEqual([])
        expect(found.ambiguous.map((one) => one.ref)).toEqual(["packages/one/src/first.ts"])
      }, away)
    } finally {
      rmSync(away, { recursive: true, force: true })
    }
  })

  test("a file naming the path it stands at is published with its site, never filtered away", () => {
    const own = `${SEAM}const PKG_REL = "packages/one/scripts/port.ts"\nconsole.log(PKG_REL)\n`
    within(tree({ "packages/one/scripts/port.ts": own }), (found) => {
      expect(found.reaches).toEqual([
        {
          ref: "packages/one/scripts/port.ts",
          kind: "path",
          sites: ["packages/one/scripts/port.ts"],
          handed: [],
        },
      ])
    })
  })

  test("a path named inside a shell command is published, quotes wrapping none of it", () => {
    const runs = `${SEAM}const STEP = \`cd \${root} && bun packages/one/src/first.ts || exit 1\`\nconsole.log(STEP)\n`
    within(tree({ "tools/lib/step.ts": runs }), (found) => {
      expect(refs(found)).toEqual(["packages/one/src/first.ts"])
    })
  })

  test("a path spelled relative to this tree names a file here, and is left out", () => {
    const own = `${SEAM}import first from "../../packages/one/src/first.ts"\nconsole.log(first)\n`
    within(tree({ "tools/lib/own.ts": own }), (found) => {
      expect(refs(found)).toEqual([])
    })
  })

  test("kind is the reading codeModule itself would take of the ref", () => {
    const body = `${SEAM}const A = "packages/a/src/a.ts"\nconst B = "@b/pkg"\nawait codeModule(A)\nawait codeModule(B)\n`
    within(tree({ "tools/commands/kinds.ts": body }), (found) => {
      expect(found.reaches).toEqual([
        {
          ref: "@b/pkg",
          kind: "specifier",
          sites: ["tools/commands/kinds.ts"],
          handed: ["tools/commands/kinds.ts"],
        },
        {
          ref: "packages/a/src/a.ts",
          kind: "path",
          sites: ["tools/commands/kinds.ts"],
          handed: ["tools/commands/kinds.ts"],
        },
      ])
    })
  })

  test("a site names the file naming the ref, deduplicated and sorted", () => {
    const body = `${SEAM}const A = "@a/pkg"\nawait codeModule(A)\nawait codeModule(A)\n`
    within(tree({ "tools/commands/b.ts": body, "tools/commands/a.ts": body }), (found) => {
      expect(found.reaches[0]?.sites).toEqual(["tools/commands/a.ts", "tools/commands/b.ts"])
    })
  })

  test("a const built from a template and a const imported from another file are both followed", () => {
    const held = 'export const SRC = "packages/held/src"\nexport const FAR = "@far/pkg"\n'
    const near = `${SEAM}import { SRC, FAR } from "./held.ts"\nconst NEAR = \`\${SRC}/near.ts\`\nawait codeModule(NEAR)\nawait codeModule(FAR)\n`
    within(tree({ "tools/lib/held.ts": held, "tools/lib/near.ts": near }), (found) => {
      expect(refs(found)).toEqual(["@far/pkg", "packages/held/src/near.ts"])
    })
  })

  test("which seam function a call went through does not change what is published", () => {
    const sync = 'import { codeModuleSync } from "../lib/code-import.ts"\n'
    const both = 'import { codeModule, codeModuleSync } from "../lib/code-import.ts"\n'
    const only = `${sync}const A = "@a/pkg"\nexport const a = codeModuleSync(A)\n`
    const mixed = `${both}const B = "@b/pkg"\nconst C = "@c/pkg"\nconst b = codeModuleSync<X>(B)\nawait codeModule(C)\n`
    within(tree({ "tools/lib/only-sync.ts": only, "tools/lib/mixed.ts": mixed }), (found) => {
      expect(refs(found)).toEqual(["@a/pkg", "@b/pkg", "@c/pkg"])
      expect(found.unfollowed).toEqual([])
    })
  })

  test("every element of an array whose map hands each one to the seam is followed", () => {
    const body = `${SEAM}const A = "@a/pkg"\nconst B = "@b/pkg"\nawait Promise.all([A, B].map((ref) => codeModule(ref)))\n`
    within(tree({ "tools/commands/many.ts": body }), (found) => {
      expect(refs(found)).toEqual(["@a/pkg", "@b/pkg"])
    })
  })

  test("a wrapper's request field is followed to the literal in the file that imports it", () => {
    const wrapper = `${SEAM}export async function wrap(request: { readonly api: string }) {\n  return codeModule(request.api)\n}\n`
    const caller = 'import { wrap } from "../lib/wrapper.ts"\nconst API = "@api/pkg"\nawait wrap({ api: API })\n'
    within(tree({ "tools/lib/wrapper.ts": wrapper, "tools/commands/caller.ts": caller }), (found) => {
      expect(found.reaches).toEqual([
        {
          ref: "@api/pkg",
          kind: "specifier",
          sites: ["tools/commands/caller.ts"],
          handed: ["tools/commands/caller.ts"],
        },
      ])
      expect(found.unfollowed).toEqual([])
    })
  })

  test("a call whose type argument holds parentheses is a call site rather than nothing", () => {
    const sync = 'import { codeModuleSync } from "../lib/code-import.ts"\n'
    const body = `${sync}const A = "@shared/workspace-paths"\nconst { one } = codeModuleSync<{\n  one: (two: readonly string[], three: string) => boolean\n}>(A)\n`
    within(tree({ "packages/infra/workspace/cli/src/lib/thing.ts": body }), (found) => {
      expect(refs(found)).toEqual(["@shared/workspace-paths"])
      expect(found.unfollowed).toEqual([])
    })
  })

  test("a call nothing can follow is published rather than dropped in silence", () => {
    const body = `${SEAM}export async function reach(named: string) {\n  return codeModule(named)\n}\n`
    within(tree({ "tools/lib/dynamic.ts": body }), (found) => {
      expect(refs(found)).toEqual([])
      expect(found.unfollowed).toEqual([{ site: "tools/lib/dynamic.ts", expression: "named" }])
    })
  })

  test("a node id whose key is a hole is published rather than passing for nothing named", () => {
    const table = 'const STEP = `ts-file:code:${app.configPath}`\nconsole.log(STEP)\n'
    within(tree({ "tools/lib/configs.ts": table }), (found) => {
      expect(refs(found)).toEqual([])
      expect(found.unfollowed).toEqual([
        { site: "tools/lib/configs.ts", expression: "`ts-file:code:${app.configPath}`" },
      ])
    })
  })

  test("a node id whose hole stands for a path named here is followed rather than published", () => {
    const named = 'const WHERE = "packages/one/src/first.ts"\n'
    const table = `${named}const STEP = \`ts-file:code:\${WHERE}\`\nconsole.log(STEP)\n`
    within(tree({ "tools/lib/named.ts": table }), (found) => {
      expect(refs(found)).toEqual(["packages/one/src/first.ts"])
      expect(found.unfollowed).toEqual([])
    })
  })

  test("prose naming the call is not a call site, a file that never imports the seam being unread", () => {
    const body = 'const HELP = `run codeModule(WHATEVER) to reach it`\nconst WHATEVER = "@whatever/pkg"\n'
    within(tree({ "tools/commands/help.ts": body }), (found) => {
      expect(refs(found)).toEqual([])
      expect(found.unfollowed).toEqual([])
    })
  })

  test("a file outside tools/ is read, the scan being the whole tree rather than one directory", () => {
    const probe = `${SEAM}const READING = "packages/outside/src/reading.ts"\nawait codeModule(READING)\n`
    within(tree({ "services/outside-tools.ts": probe }), (found) => {
      expect(refs(found)).toEqual(["packages/outside/src/reading.ts"])
      expect(found.reaches[0]?.sites).toEqual(["services/outside-tools.ts"])
    })
  })

  test("node_modules and a test file are left out wherever in the tree they stand", () => {
    const fake = `${SEAM}const FAKE = "packages/nowhere/src/fake.ts"\nawait codeModule(FAKE)\n`
    const real = `${SEAM}const REAL = "@real/pkg"\nawait codeModule(REAL)\n`
    within(
      tree({
        "node_modules/dep/src/dep.ts": fake,
        "packages/thing/src/thing.unit.test.ts": fake,
        "services/real.ts": real,
      }),
      (found) => {
        expect(found.scanned).toBe(1)
        expect(refs(found)).toEqual(["@real/pkg"])
      }
    )
  })

  test("tools/tests is not read, its fixtures naming refs that stand nowhere on purpose", () => {
    const body = `${SEAM}const FAKE = "packages/nowhere/src/fake.ts"\nawait codeModule(FAKE)\n`
    within(tree({ "tools/tests/fixture.test.ts": body }), (found) => {
      expect(found.scanned).toBe(0)
      expect(refs(found)).toEqual([])
    })
  })

  test("a tree with nothing to read reports a population of zero rather than an empty answer", () => {
    within(tree({ "domains/thing.md": "# Thing\n" }), (found) => {
      expect(found.scanned).toBe(0)
    })
  })
})
