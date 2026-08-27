
import { describe, expect, test } from "bun:test"
import { readdirSync, readFileSync } from "node:fs"
import { declarationIn, declaresCommand } from "../lib/tool-declaration.ts"

const ONE = 'export const tool = {\n  summary: "Do the thing",\n  repos: ["instructions"],\n} as const\n'

const STANDING = 'export const tool = {\n  summary: "Do the thing",\n  path: "search",\n} as const\n'

describe("what counts as declaring a command", () => {
  test("the export is required, so prose and ordinary TypeScript declare nothing", () => {
    expect(declaresCommand(ONE)).toBe(true)
    expect(declaresCommand("function run(args: {\n  summary: string,\n}) {}\n")).toBe(false)
    expect(declaresCommand("/**\n * command: Do the thing\n * repos: instructions\n */\n")).toBe(false)
  })

  test("a declaration reaching no repo in the vocabulary declares nothing", () => {
    expect(declaresCommand('export const tool = {\n  summary: "Do it",\n  repos: ["nowhere"],\n} as const\n')).toBe(
      false
    )
    expect(declaresCommand('export const tool = {\n  summary: "Do it",\n  repos: [],\n} as const\n')).toBe(false)
  })

  test("a summary of nothing but space declares nothing", () => {
    expect(declaresCommand('export const tool = {\n  summary: "   ",\n  repos: ["instructions"],\n} as const\n')).toBe(
      false
    )
    expect(declaresCommand('export const tool = {\n  summary: "   ",\n  path: "search",\n} as const\n')).toBe(false)
  })

  test("a path of nothing but space declares nothing", () => {
    expect(declaresCommand('export const tool = {\n  summary: "Do it",\n  path: "   ",\n} as const\n')).toBe(false)
  })
})

describe("what the declaration says", () => {
  test("the summary and the repos are what the export holds", () => {
    expect(declarationIn(ONE)).toEqual({ summary: "Do the thing", repos: ["instructions"] })
  })

  test("a repo outside the vocabulary is dropped rather than carried through", () => {
    const mixed = 'export const tool = {\n  summary: "Do it",\n  repos: ["instructions", "nowhere"],\n} as const\n'
    expect(declarationIn(mixed)?.repos).toEqual(["instructions"])
  })

  test("the first declaration settles it, so a stray second export below is never read", () => {
    const twice =
      'export const tool = {\n  summary: "The one that counts",\n  repos: ["memory"],\n} as const\n\n' +
      'export const tool = {\n  summary: "The stray copy",\n  repos: ["instructions"],\n} as const\n'
    expect(declarationIn(twice)).toEqual({ summary: "The one that counts", repos: ["memory"] })
  })

  test("a summary carrying a quote survives being read", () => {
    const quoted =
      'export const tool = {\n  summary: "The one they call \\"it\\"",\n  repos: ["instructions"],\n} as const\n'
    expect(declarationIn(quoted)?.summary).toBe('The one they call "it"')
  })
})

describe("a tool standing at a path of its own rather than under a repo", () => {
  test("the path it declares is the one it is typed as", () => {
    expect(declarationIn(STANDING)).toEqual({ summary: "Do the thing", path: ["search"] })
  })

  test("a path of several words is the several tokens it is typed as", () => {
    const deeper = 'export const tool = {\n  summary: "Do it",\n  path: "down there",\n} as const\n'
    expect(declarationIn(deeper)?.path).toEqual(["down", "there"])
  })

  test("naming repos and naming a path are two forms, and neither is read as the other", () => {
    expect(declarationIn(ONE)?.path).toBeUndefined()
    expect(declarationIn(STANDING)?.repos).toBeUndefined()
  })
})

describe("against the tools as they actually stand", () => {
  const dir = `${import.meta.dir}/..`
  const declaring = readdirSync(dir)
    .filter((name) => name.endsWith(".ts"))
    .map((name) => ({ name, source: readFileSync(`${dir}/${name}`, "utf8") }))
    .filter((one) => /^export const tool = \{/m.test(one.source))

  test("every tool exporting a declaration is read as declaring one", () => {
    expect(declaring.length).toBeGreaterThan(0)
    expect(declaring.filter((one) => declarationIn(one.source) === null).map((one) => one.name)).toEqual([])
  })
})
