import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import {
  danglingOver,
  reaches,
  statedIn,
  targetOf,
  tsconfigsIn,
  withoutStated,
} from "./tsconfig-references.module.code.ts"

const SCRATCH = scratchWorld()

afterAll(SCRATCH.sweep)

function rootWith(workspaces: readonly string[]): string {
  const root = SCRATCH.rootFor("tsconfig-references-")
  writeFileSync(join(root, "package.json"), JSON.stringify({ workspaces }))
  return root
}

function packageAt(root: string, rel: string): undefined {
  mkdirSync(join(root, rel), { recursive: true })
  writeFileSync(join(root, rel, "package.json"), "{}")
  return undefined
}

function tsconfigAt(root: string, rel: string, body: unknown): undefined {
  writeFileSync(join(root, rel), JSON.stringify(body, null, 2))
  return undefined
}

test("a reference is read against the folder the tsconfig stating it stands in", () => {
  expect(targetOf("infra/one/tsconfig.json", "../two")).toBe("infra/two")
  expect(targetOf("tsconfig.json", "./infra/one")).toBe("infra/one")
})

test("a reference climbing out of the repository reaches nothing", () => {
  expect(targetOf("tsconfig.json", "../elsewhere")).toBeNull()
})

test("a reference naming a folder reaches it where that folder holds a manifest", () => {
  const root = rootWith([])
  packageAt(root, "infra/one")
  tsconfigAt(root, "infra/one/tsconfig.json", {})
  expect(reaches(root, "infra/one")).toBe(true)
  expect(reaches(root, "infra/two")).toBe(false)
})

test("the tsconfig files looked at are the root ones and one per workspace folder", () => {
  const root = rootWith(["infra/*"])
  packageAt(root, "infra/one")
  packageAt(root, "infra/two")
  tsconfigAt(root, "tsconfig.json", { references: [] })
  tsconfigAt(root, "tsconfig.base.json", {})
  tsconfigAt(root, "infra/one/tsconfig.json", {})
  expect(tsconfigsIn(root)).toEqual([
    "tsconfig.json",
    "tsconfig.base.json",
    "infra/one/tsconfig.json",
  ])
})

test("a reference whose folder went is named, and one that stands is not", () => {
  const root = rootWith([])
  packageAt(root, "infra/one")
  tsconfigAt(root, "infra/one/tsconfig.json", {})
  tsconfigAt(root, "tsconfig.json", {
    references: [{ path: "./infra/one" }, { path: "./infra/gone" }],
  })
  expect(danglingOver(root)).toEqual([
    { at: "tsconfig.json", stated: "./infra/gone", target: "infra/gone" },
  ])
})

test("a tsconfig is read through comments and a trailing comma", () => {
  const text = '{\n  // what this builds\n  "references": [\n    { "path": "./one" },\n  ],\n}\n'
  expect(statedIn("tsconfig.json", text)).toEqual(["./one"])
})

test("a tsconfig stating no references list is passed over", () => {
  expect(statedIn("tsconfig.json", '{ "files": [] }')).toBeNull()
})

test("the last reference dropped takes the comma before it and leaves the rest as written", () => {
  const text = `{
  "references": [
    {
      "path": "./infra/one"
    },
    {
      "path": "./infra/gone"
    }
  ],
  "files": []
}
`
  expect(withoutStated("tsconfig.json", text, new Set(["./infra/gone"]))).toBe(`{
  "references": [
    {
      "path": "./infra/one"
    }
  ],
  "files": []
}
`)
})

test("dropping every reference leaves the list empty rather than gone", () => {
  const text = '{\n  "references": [\n    { "path": "./gone" }\n  ]\n}\n'
  expect(withoutStated("tsconfig.json", text, new Set(["./gone"]))).toBe(
    '{\n  "references": [\n  ]\n}\n'
  )
})

test("two dropped at the tail take one comma each rather than one twice", () => {
  const text =
    '{\n  "references": [\n    { "path": "./a" },\n    { "path": "./b" },\n    { "path": "./c" }\n  ]\n}\n'
  expect(withoutStated("tsconfig.json", text, new Set(["./b", "./c"]))).toBe(
    '{\n  "references": [\n    { "path": "./a" }\n  ]\n}\n'
  )
})

test("a middle reference dropped leaves the ones around it whole", () => {
  const text =
    '{\n  "references": [\n    { "path": "./a" },\n    { "path": "./b" },\n    { "path": "./c" }\n  ]\n}\n'
  expect(withoutStated("tsconfig.json", text, new Set(["./b"]))).toBe(
    '{\n  "references": [\n    { "path": "./a" },\n    { "path": "./c" }\n  ]\n}\n'
  )
})

test("a name no reference states drops nothing", () => {
  const text = '{\n  "references": [\n    { "path": "./one" }\n  ]\n}\n'
  expect(withoutStated("tsconfig.json", text, new Set(["./two"]))).toBe(text)
})
