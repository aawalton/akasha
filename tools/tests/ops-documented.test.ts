
import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { commandDocuments } from "../ops/documented.ts"

let root = ""

beforeAll(() => {
  root = mkdtempSync("/var/tmp/ops-documented-")
  mkdirSync(`${root}/pages/ops-command`, { recursive: true })
  const put = (name: string, body: string): void => {
    writeFileSync(`${root}/pages/ops-command/${name}`, body)
  }
  put(
    "ops-instructions-write.md",
    "---\npage-type-slug: ops-command\nslug: ops-instructions-write\ndomain-parent-slug:\n  - ops-instructions\n  - ops-command\ncommand-path: tools/write.ts\npath: instructions write\n---\n\n# Definition\n\n- **Ops instructions write** — whole files, gated.\n"
  )
  put(
    "ops-memory-write.md",
    "---\npage-type-slug: ops-command\nslug: ops-memory-write\ncommand-path: tools/write.ts\npath: memory write\n---\n\n# Definition\n\n- **Ops memory write** — whole files, gated.\n"
  )
  put(
    "ops-instructions-turn-end-reading-cases.md",
    "---\npage-type-slug: ops-command\nslug: ops-instructions-turn-end-reading-cases\ncommand-path: tools/commands/instructions/turn-end-reading-cases.ts\npath: instructions turn-end-reading-cases\n---\n\n# Definition\n\n- **Ops instructions turn-end-reading-cases** — the cases.\n"
  )
  put(
    "ops-nothing-stated.md",
    "---\npage-type-slug: ops-command\nslug: ops-nothing-stated\ncommand-path: tools/commands/nothing/stated.ts\n---\n\n# Definition\n\n- **Ops nothing stated** — no path.\n"
  )
})

afterAll(() => {
  if (root !== "") rmSync(root, { recursive: true, force: true })
})

describe("commandDocuments", () => {
  test("the stated path is the invocation, whatever hyphens the command carries", () => {
    const cases = commandDocuments(root).find((one) => one.slug.endsWith("reading-cases"))
    expect(cases?.path).toEqual(["instructions", "turn-end-reading-cases"])
  })

  test("two documents naming one entry file are two invocations", () => {
    const both = commandDocuments(root).filter((one) => one.entryFile === "tools/write.ts")
    expect(both.map((one) => one.path.join(" ")).sort()).toEqual(["instructions write", "memory write"])
  })

  test("the entry file is the one the document names", () => {
    const cases = commandDocuments(root).find((one) => one.slug.endsWith("reading-cases"))
    expect(cases?.entryFile).toBe("tools/commands/instructions/turn-end-reading-cases.ts")
  })

  test("a document stating no path names no invocation and is left out", () => {
    expect(commandDocuments(root).some((one) => one.slug === "ops-nothing-stated")).toBe(false)
  })

  test("a root with no command documents yields none rather than throwing", () => {
    expect(commandDocuments(`${root}/nothing-here`)).toEqual([])
  })
})
