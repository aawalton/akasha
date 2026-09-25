import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { TEMPER_ADDON } from "akasha/command/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import { treeIn } from "akasha/command/pages/deploy/modules/tree-pinning/deploy-tree-pinning.module.code.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import {
  addonTreesIn,
  builtDirIn,
  builtIn,
} from "akasha/temper/eso/ui-harness/modules/ui-staging/ui-staging.module.code.ts"

const BUILT_UNDER = "temper/addon/build/dist"

const ROOT = mkdtempSync("/var/tmp/ui-staging-")

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

said(["git", "init", "-q", "-b", "main"], { cwd: ROOT })

function filed(slug: string, at: number): undefined {
  const path = `temper/addon/pages/${slug}/${slug}.temper-addon.ts`
  listedFiled(ROOT, TEMPER_ADDON, slug, [{ path, id: `01a05f90-0000-7000-8000-00000000000${at}` }])
}

function builtUnder(slug: string, addon: string): string {
  const tree = treeIn(ROOT, slug)
  if (tree === null) throw new Error(`git names no folder under ${ROOT}`)
  const at = join(tree, BUILT_UNDER, addon)
  mkdirSync(at, { recursive: true })
  writeFileSync(join(at, `${addon}.lua`), "-- built")
  writeFileSync(join(at, `${addon}.txt`), "## Title: built")
  return tree
}

filed("one-addon", 1)

filed("two-addon", 2)

const ONE = builtUnder("one-addon", "One")

const TWO = builtUnder("two-addon", "Two")

builtUnder("two-addon", "Lib")

builtUnder("one-addon", "Shared")

builtUnder("two-addon", "Shared")

test("the tree of every addon deploy is looked in, each named for that deploy's slug", () => {
  expect(addonTreesIn(ROOT)).toEqual([ONE, TWO])
})

test("an addon's build is found in whichever addon deploy's tree holds that build", () => {
  expect(builtIn(addonTreesIn(ROOT), "Two")).toEqual({
    bundle: join(TWO, BUILT_UNDER, "Two", "Two.lua"),
    tree: TWO,
  })
})

test("an addon no tree holds a build of is found nowhere", () => {
  expect(builtIn(addonTreesIn(ROOT), "Absent")).toBe(null)
})

test("a dependency is found in another addon deploy's tree where the addon's own holds none", () => {
  expect(builtDirIn([ONE, TWO], "Lib")).toBe(join(TWO, BUILT_UNDER, "Lib"))
})

test("a dependency built in more than one tree is taken from the first tree named", () => {
  expect(builtDirIn([ONE, TWO], "Shared")).toBe(join(ONE, BUILT_UNDER, "Shared"))
  expect(builtDirIn([TWO, ONE], "Shared")).toBe(join(TWO, BUILT_UNDER, "Shared"))
})

test("a dependency no tree holds a build of is found nowhere", () => {
  expect(builtDirIn([ONE, TWO], "Absent")).toBe(null)
})
