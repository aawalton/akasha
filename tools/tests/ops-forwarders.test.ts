
import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { forwarderCommands } from "../ops/forwarders.ts"

let root = ""

const declaring = (summary: string, repos: readonly string[]): string => {
  const named = repos.map((one) => `"${one}"`).join(", ")
  return `export const tool = {\n  summary: "${summary}",\n  repos: [${named}],\n} as const\n`
}

const collapsing = (summary: string, repos: readonly string[]): string => {
  const named = repos.map((one) => `"${one}"`).join(", ")
  return `export const tool = {\n  summary: "${summary}",\n  repos: [${named}],\n  collapsed: true,\n} as const\n`
}

const standing = (summary: string, path: string): string =>
  `export const tool = {\n  summary: "${summary}",\n  path: "${path}",\n} as const\n`

beforeAll(() => {
  root = mkdtempSync("/var/tmp/ops-forwarders-")
  mkdirSync(`${root}/tools/lib`, { recursive: true })
  const put = (rel: string, body: string): void => {
    writeFileSync(`${root}/tools/${rel}`, body)
  }
  put("write.ts", collapsing("Write whole files", ["instructions", "memory", "books", "stories"]))
  put("champions.ts", declaring("Print who is answerable", ["instructions"]))
  put("work-tree.ts", declaring("Print the work tree", ["memory"]))
  put("elsewhere.ts", declaring("Serving books and stories alone", ["books", "stories"]))
  put("nowhere.ts", declaring("Naming a repository nothing addresses", ["nowhere"]))
  put("search.ts", standing("Standing at a path of its own", "search"))
  put("hook-bench.ts", "interface Entry {\n  readonly summary: string\n}\n")
  put("compose-notices.ts", "/**\n * An internal tool, declaring nothing.\n */\n")
  put("retired.ts", "/**\n * command: The header form, which declares nothing now\n * repos: instructions\n */\n")
  put("lib/roots.ts", declaring("Below the top level, so no command", ["instructions"]))
  put("statusline.sh", "#!/usr/bin/env bash\n")
})

afterAll(() => {
  if (root !== "") rmSync(root, { recursive: true, force: true })
})

describe("which commands the tool declarations yield", () => {
  test("a declaring tool becomes one command per namespace it names, and nothing else becomes one", () => {
    expect(forwarderCommands(root).map((one) => one.path.join(" ")).sort()).toEqual([
      "books elsewhere",
      "instructions champions",
      "memory work-tree",
      "search",
      "stories elsewhere",
      "write",
    ])
  })

  test("a tool declaring itself collapsed stands at its bare name, under no repository", () => {
    const found = forwarderCommands(root).filter((one) => one.path.includes("write"))
    expect(found.map((one) => one.path.join(" "))).toEqual(["write"])
  })

  test("every addressable repository a tool declares becomes a namespace, not just the two the dispatcher started with", () => {
    expect(forwarderCommands(root).some((one) => one.path.join(" ") === "books elsewhere")).toBe(true)
    expect(forwarderCommands(root).some((one) => one.path.join(" ") === "stories elsewhere")).toBe(true)
  })

  test("a repository nothing addresses names no namespace, whatever a tool declares", () => {
    expect(forwarderCommands(root).some((one) => one.path.includes("nowhere"))).toBe(false)
    expect(forwarderCommands(root).some((one) => one.path[0] === "nowhere")).toBe(false)
  })

  test("the header comment the export replaced yields nothing on its own", () => {
    expect(forwarderCommands(root).some((one) => one.path.includes("retired"))).toBe(false)
  })

  test("the summary is the one the tool declared", () => {
    const write = forwarderCommands(root).find((one) => one.path.join(" ") === "write")
    expect(write?.summary).toBe("Write whole files")
  })

  test("a tool declaring a path stands at that path alone, under no repository", () => {
    const found = forwarderCommands(root).filter((one) => one.path.includes("search"))
    expect(found.map((one) => one.path.join(" "))).toEqual(["search"])
    expect(found[0]?.summary).toBe("Standing at a path of its own")
  })
})

describe("what the walk does with a tree it cannot read", () => {
  test("a repository holding no tools forwards none, rather than stopping the dispatcher", () => {
    expect(forwarderCommands(`${root}/nothing-here`)).toEqual([])
  })

  test("a tools folder it cannot read throws rather than answering with an empty set", () => {
    const flat = mkdtempSync("/var/tmp/ops-forwarders-flat-")
    writeFileSync(`${flat}/tools`, "")
    try {
      expect(() => forwarderCommands(flat)).toThrow()
    } finally {
      rmSync(flat, { recursive: true, force: true })
    }
  })
})
