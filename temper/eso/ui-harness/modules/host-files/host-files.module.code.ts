import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { addonManifestSchema } from "akasha/temper/addon/build/resolve/modules/addon-json/addon-json.module.code.ts"
import { addonManifestPathIn } from "akasha/temper/addon/build/resolve/modules/addon-manifest-file/addon-manifest-file.module.code.ts"
import { listAllAddons } from "akasha/temper/addon/build/resolve/modules/addon-roster/addon-roster.module.code.ts"
import { esoLiveDirCandidates } from "akasha/temper/eso/path/modules/eso-paths/eso-paths.module.code.ts"
import { coreConfigFromPages } from "akasha/temper/watcher/modules/watcher-export-hud-layout/watcher-export-hud-layout.module.code.ts"

const ADDONS_UNDER = "AddOns"

type BuiltFromPages = Readonly<Record<string, Readonly<Record<string, () => Promise<string>>>>>

const BUILT_FROM_PAGES: BuiltFromPages = {
  Temper: { "TemperConfig.lua": () => coreConfigFromPages() },
}

export async function hostFileFromPages(
  addon: string,
  rel: string,
  built: BuiltFromPages = BUILT_FROM_PAGES
): Promise<string | null> {
  const build = built[addon]?.[rel]
  return build === undefined ? null : build()
}

const HOSTED = addonManifestSchema.pick({ additionalLuaFiles: true }).passthrough()

export function hostFilesOf(tree: string, addon: string): readonly string[] {
  const found = listAllAddons({ repoRoot: tree }).find((one) => one.canonicalName === addon)
  if (found === undefined) return []
  const path = addonManifestPathIn(tree, found.dir)
  if (path === null) return []
  const parsed = HOSTED.safeParse(JSON.parse(readFileSync(path, "utf8")))
  if (!parsed.success) {
    throw new Error(
      `${path} states no readable \`additionalLuaFiles\`, so which of \`${addon}\`'s files the` +
        ` watcher writes cannot be told — ${parsed.error.message}`
    )
  }
  return parsed.data.additionalLuaFiles ?? []
}

export function liveHostFileAt(
  addon: string,
  rel: string,
  lives: readonly string[] = esoLiveDirCandidates()
): string | null {
  for (const live of lives) {
    const at = join(live, ADDONS_UNDER, addon, rel)
    if (existsSync(at)) return at
  }
  return null
}
