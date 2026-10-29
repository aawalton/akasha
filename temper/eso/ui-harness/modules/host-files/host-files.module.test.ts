import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  builtFromPages,
  hostFileFromPages,
  hostFilesOf,
  liveHostFileAt,
} from "akasha/temper/eso/ui-harness/modules/host-files/host-files.module.code.ts"

const ROOT = mkdtempSync("/var/tmp/host-files-")

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

const TREE = join(ROOT, "tree")

const LIVE = join(ROOT, "live")

function manifested(folder: string, said: Record<string, unknown>): undefined {
  const at = join(TREE, "temper/addons", folder)
  mkdirSync(at, { recursive: true })
  writeFileSync(join(at, "addon.json"), JSON.stringify(said))
}

const MANIFEST = {
  title: "t",
  description: "d",
  author: "a",
  version: "1",
  addonVersion: 1,
  savedVariables: [],
  dependsOn: [],
}

manifested("hosting", { ...MANIFEST, name: "Hosting", additionalLuaFiles: ["HostingConfig.lua"] })

manifested("plain", { ...MANIFEST, name: "Plain" })

manifested("garbled", { ...MANIFEST, name: "Garbled", additionalLuaFiles: "HostingConfig.lua" })

mkdirSync(join(LIVE, "AddOns", "Hosting"), { recursive: true })

writeFileSync(join(LIVE, "AddOns", "Hosting", "HostingConfig.lua"), "HostingConfig = {}")

test("an addon's host files are the extra Lua files its manifest lists", () => {
  expect(hostFilesOf(TREE, "Hosting")).toEqual(["HostingConfig.lua"])
})

test("an addon whose manifest lists no extra Lua file has no host file", () => {
  expect(hostFilesOf(TREE, "Plain")).toEqual([])
})

test("an addon no manifest in the tree names has no host file", () => {
  expect(hostFilesOf(TREE, "Absent")).toEqual([])
})

test("a manifest whose extra Lua files go unread is refused rather than read as none", () => {
  expect(() => hostFilesOf(TREE, "Garbled")).toThrow("additionalLuaFiles")
})

test("a host file's live copy is found in the game's addons folder", () => {
  expect(liveHostFileAt("Hosting", "HostingConfig.lua", [LIVE])).toBe(
    join(LIVE, "AddOns", "Hosting", "HostingConfig.lua")
  )
})

test("a host file the game's addons folder lacks has no live copy", () => {
  expect(liveHostFileAt("Hosting", "Other.lua", [LIVE])).toBe(null)
})

const BUILT = { Hosting: { "HostingConfig.lua": async () => "HostingConfig = { built = true }" } }

test("a host file the pages build is answered with what they build", async () => {
  expect(await hostFileFromPages("Hosting", "HostingConfig.lua", BUILT)).toBe(
    "HostingConfig = { built = true }"
  )
})

test("a host file no page builds is answered with nothing", async () => {
  expect(await hostFileFromPages("Hosting", "Other.lua", BUILT)).toBe(null)
  expect(await hostFileFromPages("Plain", "HostingConfig.lua", BUILT)).toBe(null)
})

const collectFromCheckout = async (args: { pageTypeSlug?: string; pageSize?: number }) => {
  const pageTypeSlug = args.pageTypeSlug
  if (pageTypeSlug === undefined) throw new Error("a page type is needed to read pages")
  const answered = asking(akashaRoot(), { pageTypeSlug, limit: args.pageSize } as never)
  if ("refused" in answered) throw new Error(answered.refused)
  return answered.rows.map(asPage)
}

test("Temper's core config is built from the HUD pages", async () => {
  const built =
    (await hostFileFromPages("Temper", "TemperConfig.lua", builtFromPages(collectFromCheckout))) ??
    ""
  expect(built).toContain("TemperConfig =")
  expect(built).toContain('["hudLayout"] =')
  expect(built).toContain('["panels"] =')
})
