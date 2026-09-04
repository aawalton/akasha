import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readdirSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { codeRoot } from "@akasha/pages-system/code-root"
import { temperAddonTypecheck } from "./temper-addon-typecheck.command.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const BASE_SETTINGS = {
  compilerOptions: {
    module: "esnext",
    moduleResolution: "bundler",
    lib: ["ESNext"],
    types: [],
    noEmit: false,
    rewriteRelativeImportExtensions: true,
    isolatedModules: true,
    strict: true,
    skipLibCheck: true,
  },
}

function manifestFor(name: string): string {
  return JSON.stringify({
    name,
    title: name,
    description: `${name} for a test`,
    author: "test",
    version: "1.0.0",
    addonVersion: 100,
    apiVersion: ["101041"],
    savedVariables: [],
    dependsOn: [],
  })
}

function rootFor(): string {
  const root = scratch.rootFor("temper-addon-typecheck-")
  writeFileSync(
    join(root, "package.json"),
    JSON.stringify({
      name: "scratch",
      private: true,
      type: "module",
      workspaces: ["akasha/temper/*"],
    })
  )
  writeFileSync(join(root, "tsconfig.base.json"), JSON.stringify(BASE_SETTINGS, null, 2))
  symlinkSync(join(codeRoot(), "node_modules"), join(root, "node_modules"))
  return root
}

type Held = {
  readonly folder: string
  readonly entry: string | null
  readonly body: string
  readonly declares?: string
}

function addonIn(root: string, name: string, held: Held): string {
  const dir = join(root, "akasha/temper", held.folder)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, "addon.json"), manifestFor(name))
  writeFileSync(
    join(dir, "package.json"),
    JSON.stringify({ name: `@akasha/${held.folder}`, dependencies: {} })
  )
  const names = held.entry === null ? "" : `  bundleEntrySlug: "${held.entry}",\n`
  writeFileSync(
    join(dir, `${held.folder}.eso-addon.ts`),
    `export const page = {\n  pageTypeSlug: "eso-addon",\n  slug: "${held.folder}",\n${names}}\n`
  )
  if (held.declares !== undefined) {
    writeFileSync(join(dir, `${held.folder}-globals.d.ts`), held.declares)
  }
  if (held.entry !== null && held.body !== "") {
    mkdirSync(join(dir, held.entry), { recursive: true })
    writeFileSync(join(dir, held.entry, `${held.entry}.module.code.ts`), held.body)
  }
  return dir
}

function alphaIn(root: string): string {
  return addonIn(root, "AlphaAddon", {
    folder: "temper-alpha-addon",
    entry: "alpha-entry",
    body: "export const alphaValue = ALPHA_ONLY_GLOBAL + 1\n",
    declares: "declare const ALPHA_ONLY_GLOBAL: number\n",
  })
}

test("an addon's own compiler settings say which game globals the addon may name", async () => {
  const root = rootFor()
  alphaIn(root)
  const said = await temperAddonTypecheck(["--code-root", root])
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("AlphaAddon: 0 error(s)")
})

test("a declaration a sibling addon holds is out of scope for the addon compiled", async () => {
  const root = rootFor()
  alphaIn(root)
  addonIn(root, "BetaAddon", {
    folder: "temper-beta-addon",
    entry: "beta-entry",
    body: "export const betaValue = ALPHA_ONLY_GLOBAL + 2\n",
  })
  const said = await temperAddonTypecheck(["--code-root", root])
  expect(said.code).not.toBe(0)
  expect(said.report.join("\n")).toContain("ALPHA_ONLY_GLOBAL")
  expect(said.refusals.join("\n")).toContain("BetaAddon")
})

test("the compiler is run once per addon", async () => {
  const root = rootFor()
  alphaIn(root)
  addonIn(root, "DeltaAddon", {
    folder: "temper-delta-addon",
    entry: "delta-entry",
    body: "export const deltaValue = 2\n",
  })
  const said = await temperAddonTypecheck(["--code-root", root])
  expect(said.code).toBe(0)
  const rows = said.report.filter((one) => one.includes("own file(s) of"))
  expect(rows.length).toBe(2)
  expect(said.report.join("\n")).toContain("typechecked 2 addon(s) of the 2")
})

test("the addons are taken in canonical-name order rather than in folder order", async () => {
  const root = rootFor()
  addonIn(root, "ZuluAddon", {
    folder: "temper-aaa-addon",
    entry: "aaa-entry",
    body: "export const aaaValue = 1\n",
  })
  addonIn(root, "AlphaAddon", {
    folder: "temper-zzz-addon",
    entry: "zzz-entry",
    body: "export const zzzValue = 1\n",
  })
  const said = await temperAddonTypecheck(["--code-root", root])
  expect(said.code).toBe(0)
  const rows = said.report.filter((one) => one.includes("own file(s) of"))
  expect(rows[0]).toContain("AlphaAddon")
  expect(rows[1]).toContain("ZuluAddon")
})

test("the first addon that does not typecheck ends the run", async () => {
  const root = rootFor()
  alphaIn(root)
  addonIn(root, "BetaAddon", {
    folder: "temper-beta-addon",
    entry: "beta-entry",
    body: 'export const betaValue: number = "not a number"\n',
  })
  addonIn(root, "ZuluAddon", {
    folder: "temper-zulu-addon",
    entry: "zulu-entry",
    body: "export const zuluValue = 1\n",
  })
  const said = await temperAddonTypecheck(["--code-root", root])
  expect(said.code).not.toBe(0)
  expect(said.report.join("\n")).toContain("AlphaAddon")
  expect(said.refusals.join("\n")).toContain("BetaAddon")
  expect(said.report.join("\n")).not.toContain("ZuluAddon")
  expect(said.refusals.join("\n")).toContain("left unread")
})

test("an addon whose compile reads none of its own files refuses the run", async () => {
  const root = rootFor()
  const dir = alphaIn(root)
  const elsewhere = join(root, "elsewhere")
  mkdirSync(elsewhere, { recursive: true })
  writeFileSync(join(elsewhere, "elsewhere.ts"), "export const elsewhereValue = 1\n")
  writeFileSync(
    join(dir, "tsconfig.json"),
    JSON.stringify({
      ...BASE_SETTINGS,
      compilerOptions: { ...BASE_SETTINGS.compilerOptions, noEmit: true },
      include: [join(elsewhere, "**/*.ts")],
    })
  )
  const said = await temperAddonTypecheck(["--code-root", root])
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("compiled none of its own")
  expect(said.refusals.join("\n")).toContain("AlphaAddon")
})

test("an addon naming no bundle entry is reported as compiled of nothing", async () => {
  const root = rootFor()
  alphaIn(root)
  addonIn(root, "MuteAddon", { folder: "temper-mute-addon", entry: null, body: "" })
  const said = await temperAddonTypecheck(["--code-root", root])
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("MuteAddon: no bundle entry is named")
  expect(said.report.join("\n")).toContain("typechecked 1 addon(s) of the 2")
})

test("an addon whose settings cannot be written refuses the run by name", async () => {
  const root = rootFor()
  addonIn(root, "GoneAddon", { folder: "temper-gone-addon", entry: "gone-entry", body: "" })
  const said = await temperAddonTypecheck(["--code-root", root])
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("GoneAddon")
  expect(said.refusals.join("\n")).toContain("gone-entry")
})

test("a checkout holding no addon is refused rather than reported clean", async () => {
  const root = rootFor()
  const said = await temperAddonTypecheck(["--code-root", root])
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("holds no addon folder")
})

test("nothing is emitted by the compiler here", async () => {
  const root = rootFor()
  alphaIn(root)
  const said = await temperAddonTypecheck(["--code-root", root])
  expect(said.code).toBe(0)
  const built = join(root, "temper/addons/dist/AlphaAddon")
  const left = existsSync(built) ? readdirSync(built) : []
  expect(left).toEqual([])
})
