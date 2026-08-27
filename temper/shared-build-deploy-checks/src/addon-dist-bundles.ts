import { readdirSync, statSync } from "node:fs"
import { join, resolve } from "node:path"
import { renderPopulationBound } from "./population-bound"

export const ADDON_DIST_REL = "packages/temper/addons/dist"

export const ADDON_BUNDLE_UNIT = "addon bundles"

export const ADDON_BUILD_COMMAND = "ops temper addon build --all"

function walkLua(dir: string): readonly string[] {
  const out: string[] = []
  let entries: readonly string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const entry of entries) {
    const path = join(dir, entry)
    let st: ReturnType<typeof statSync>
    try {
      st = statSync(path)
    } catch {
      continue
    }
    if (st.isDirectory()) out.push(...walkLua(path))
    else if (st.isFile() && path.endsWith(".lua")) out.push(path)
  }
  return out
}

export interface AddonDistBundles {
  readonly distRoot: string
  readonly files: readonly string[]
}

export function collectAddonDistBundles(cwd: string = process.cwd()): AddonDistBundles {
  const distRoot = resolve(cwd, ADDON_DIST_REL)
  let isDir = false
  try {
    isDir = statSync(distRoot).isDirectory()
  } catch {
    isDir = false
  }
  return { distRoot, files: isDir ? [...walkLua(distRoot)].sort() : [] }
}

export function addonDistRefusalLine(
  gate: string,
  bundles: AddonDistBundles,
  examined: number
): string {
  const bound = renderPopulationBound(examined, bundles.files.length, ADDON_BUNDLE_UNIT)
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
