import { readdirSync, statSync } from "node:fs"
import { join, resolve } from "node:path"
import { renderPopulationBound } from "../population-bound/population-bound.module.code.ts"

export const ADDON_DIST_REL = "temper/addons/dist"

export const ADDON_BUNDLE_UNIT = "addon bundles"

export const ADDON_BUILD_COMMAND = "akasha temper-addon-build --all --build-only"

function luaFilesUnder(dir: string): readonly string[] {
  const out: string[] = []
  let entries: readonly string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const entry of entries) {
    const path = join(dir, entry)
    let found: ReturnType<typeof statSync>
    try {
      found = statSync(path)
    } catch {
      continue
    }
    if (found.isDirectory()) out.push(...luaFilesUnder(path))
    else if (found.isFile() && path.endsWith(".lua")) out.push(path)
  }
  return out
}

export type AddonDistBundles = {
  readonly distRoot: string
  readonly files: readonly string[]
}

export function collectAddonDistBundles(cwd: string = process.cwd()): AddonDistBundles {
  const distRoot = resolve(cwd, ADDON_DIST_REL)
  let holdsBundles = false
  try {
    holdsBundles = statSync(distRoot).isDirectory()
  } catch {
    holdsBundles = false
  }
  return { distRoot, files: holdsBundles ? [...luaFilesUnder(distRoot)].sort() : [] }
}

export function addonDistRefusalLine(
  gate: string,
  bundles: AddonDistBundles,
  examined: number
): string {
  const bound = renderPopulationBound({
    examined,
    declared: bundles.files.length,
    unit: ADDON_BUNDLE_UNIT,
  })
  return `${gate}: ${bound} under ${bundles.distRoot} — this gate certifies nothing without the emitted bundles. Run \`${ADDON_BUILD_COMMAND}\` first; in CI the \`addon-build\` step is a co-dependency and its own failure is the one to read.`
}

export function refuseAddonDistPopulation(
  gate: string,
  bundles: AddonDistBundles,
  examined: number
): 2 {
  process.stderr.write(`${addonDistRefusalLine(gate, bundles, examined)}\n`)
  return 2
}
