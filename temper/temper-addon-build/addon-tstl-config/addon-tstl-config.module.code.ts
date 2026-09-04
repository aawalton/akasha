import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from "node:fs"
import { join } from "node:path"

export const TSCONFIG_NAME = "tsconfig.json"

export const ESO_ADDON_PAGE_SUFFIX = ".eso-addon.ts"

const CODE_SUFFIX = ".module.code.ts"

const ADDONS_REL_ROOT = "temper/addons"

const ROOT_BASE_NAME = "tsconfig.base.json"

const HELD_AT = "dist/.tstl"

const CODE_UNDER = `**/*${CODE_SUFFIX}`

const OWN_DECLARATIONS_UNDER = "**/*.d.ts"

const DECLARATIONS_UNDER = [
  "akasha/temper/temper-eso-types/**/*.d.ts",
  "akasha/temper/temper-addon-library-types/**/*.d.ts",
] as const

const WORKSPACE_MARK = "workspace:"

const AKASHA_SCOPE = "@akasha/"

const LINKED_UNDER = "node_modules"

const MANIFEST_NAME = "package.json"

function workspaceDependenciesIn(manifestPath: string): readonly string[] {
  if (!existsSync(manifestPath)) return []
  const said = JSON.parse(readFileSync(manifestPath, "utf-8")) as {
    dependencies?: Record<string, string>
  }
  const held = said.dependencies ?? {}
  return Object.keys(held).filter(
    (name) => name.startsWith(AKASHA_SCOPE) && held[name]?.startsWith(WORKSPACE_MARK) === true
  )
}

export function reachedPackageDirs(repoRoot: string, addonDir: string): readonly string[] {
  const found = new Set<string>()
  const asked = new Set<string>()
  const owed = [...workspaceDependenciesIn(join(addonDir, MANIFEST_NAME))]
  for (;;) {
    const name = owed.pop()
    if (name === undefined) break
    if (asked.has(name)) continue
    asked.add(name)
    const linked = join(repoRoot, LINKED_UNDER, name)
    if (!existsSync(linked)) {
      throw new Error(
        `reachedPackageDirs: ${addonDir} reaches "${name}", and ${linked} is not there, so every declaration that package holds would be left out of the compile`
      )
    }
    const dir = realpathSync(linked)
    found.add(dir)
    owed.push(...workspaceDependenciesIn(join(dir, MANIFEST_NAME)))
  }
  return [...found].sort()
}

export type EsoAddonPage = {
  readonly slug: string
  readonly bundleEntrySlug: string | null
  readonly bindings: string | null
  readonly luaModuleSlugs: readonly string[]
}

export function esoAddonPagePathIn(dir: string): string | null {
  let entries: readonly string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return null
  }
  const named = entries.filter((one) => one.endsWith(ESO_ADDON_PAGE_SUFFIX)).sort()
  const first = named[0]
  return first === undefined ? null : join(dir, first)
}

export async function readEsoAddonPage(dir: string): Promise<EsoAddonPage | null> {
  const path = esoAddonPagePathIn(dir)
  if (path === null) return null
  const loaded = (await import(path)) as Record<string, unknown>
  for (const value of Object.values(loaded)) {
    if (typeof value !== "object" || value === null) continue
    const said = value as {
      slug?: unknown
      pageTypeSlug?: unknown
      bundleEntrySlug?: unknown
      bindings?: unknown
      luaModuleSlugs?: unknown
    }
    if (said.pageTypeSlug !== "eso-addon" || typeof said.slug !== "string") continue
    const entry = said.bundleEntrySlug
    const bound = said.bindings
    const luaSaid: readonly unknown[] = Array.isArray(said.luaModuleSlugs)
      ? said.luaModuleSlugs
      : []
    return {
      slug: said.slug,
      bundleEntrySlug: typeof entry === "string" ? entry : null,
      bindings: typeof bound === "string" ? bound : null,
      luaModuleSlugs: luaSaid.filter((one) => typeof one === "string"),
    }
  }
  return null
}

export function slugBareOf(slug: string): string {
  const mark = slug.lastIndexOf("/")
  return mark === -1 ? slug : slug.slice(mark + 1)
}

export function bundleEntryPathIn(addonDir: string, entrySlug: string): string {
  const bare = slugBareOf(entrySlug)
  return join(addonDir, bare, `${bare}${CODE_SUFFIX}`)
}

export type TstlConfigAsked = {
  readonly repoRoot: string
  readonly addonDir: string
  readonly canonicalName: string
  readonly entryPath: string
  readonly reachedDirs: readonly string[]
}

export function tstlConfigBody(asked: TstlConfigAsked): string {
  const addonsRoot = join(asked.repoRoot, ADDONS_REL_ROOT)
  const body = {
    extends: join(asked.repoRoot, ROOT_BASE_NAME),
    compilerOptions: {
      module: "esnext",
      moduleResolution: "bundler",
      lib: ["ESNext"],
      jsx: "react",
      noEmit: false,
      isolatedModules: true,
      rewriteRelativeImportExtensions: true,
      rootDir: asked.repoRoot,
      outDir: join(addonsRoot, "dist", asked.canonicalName),
      target: "ESNext",
      strict: true,
      types: [],
    },
    tstl: {
      luaTarget: "5.1",
      luaBundle: `${asked.canonicalName}.lua`,
      luaBundleEntry: asked.entryPath,
      luaLibImport: "require-minimal",
      noResolvePaths: [],
      noImplicitSelf: true,
    },
    include: [
      join(asked.addonDir, CODE_UNDER),
      join(asked.addonDir, OWN_DECLARATIONS_UNDER),
      ...asked.reachedDirs.map((one) => join(one, OWN_DECLARATIONS_UNDER)),
      ...DECLARATIONS_UNDER.map((one) => join(asked.repoRoot, one)),
    ],
  }
  return `${JSON.stringify(body, null, 2)}\n`
}

export async function tstlConfigPathFor(
  repoRoot: string,
  addonDir: string,
  canonicalName: string
): Promise<string | null> {
  const beside = join(addonDir, TSCONFIG_NAME)
  if (existsSync(beside)) return beside
  const page = await readEsoAddonPage(addonDir)
  if (page === null || page.bundleEntrySlug === null) return null
  const entryPath = bundleEntryPathIn(addonDir, page.bundleEntrySlug)
  if (!existsSync(entryPath)) {
    throw new Error(
      `tstlConfigPathFor: the page in ${addonDir} names "${page.bundleEntrySlug}" as the bundle entry, and ${entryPath} is not there`
    )
  }
  const heldAt = join(repoRoot, ADDONS_REL_ROOT, HELD_AT)
  mkdirSync(heldAt, { recursive: true })
  const path = join(heldAt, `${canonicalName}.${TSCONFIG_NAME}`)
  const reachedDirs = reachedPackageDirs(repoRoot, addonDir)
  writeFileSync(path, tstlConfigBody({ repoRoot, addonDir, canonicalName, entryPath, reachedDirs }))
  return path
}
