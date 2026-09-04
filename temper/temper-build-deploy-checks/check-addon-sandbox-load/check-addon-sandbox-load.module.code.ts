import { readdirSync, readFileSync, statSync } from "node:fs"
import { basename, dirname, join, relative, resolve, sep } from "node:path"
import { makeSandboxedLuaVm } from "@akasha/temper-lua-runner/sandboxed-lua-vm"
import {
  ADDON_BUILD_COMMAND,
  ADDON_BUNDLE_UNIT,
  type AddonDistBundles,
  collectAddonDistBundles,
  refuseAddonDistPopulation,
} from "../addon-dist-bundles/addon-dist-bundles.module.code.ts"
import {
  assertStringIdsRegistered,
  extractOnInitializedGetStringIds,
  filterAddonOwnedStringIds,
  formatLoadError,
  formatLoadFailureGuidance,
  type LoadResult,
  loadBundleUnderSandbox,
  type SandboxVm,
  STRING_ID_RECORDING_PRELUDE,
  summarizeBundle,
} from "../addon-sandbox-load/addon-sandbox-load.module.code.ts"
import { parseArgs as parseCliArgs } from "../cli-args/cli-args.module.code.ts"
import { errnoCode, errorMessage } from "../error-message/error-message.module.code.ts"
import { ESO_BASE_GAME_STRING_IDS } from "../generated/eso-base-game-string-ids/eso-base-game-string-ids.module.code.ts"
import { renderPopulationBound } from "../population-bound/population-bound.module.code.ts"

const ESO_BANNED_GLOBALS = [
  "debug",
  "io",
  "os",
  "package",
  "require",
  "module",
  "dofile",
  "loadfile",
  "load",
  "loadstring",
] as const

function parseArgs(argv: readonly string[]): { singleFile: string | null } {
  try {
    const { flags } = parseCliArgs(argv, { file: { kind: "string" } }, { passthrough: true })
    return { singleFile: flags.file ?? null }
  } catch {
    return { singleFile: null }
  }
}

const GATE = "addon-sandbox-load"

async function createSandboxedVm(): Promise<{
  vm: SandboxVm
  dispose: () => Promise<void>
}> {
  const sandboxed = await makeSandboxedLuaVm({ bannedGlobals: ESO_BANNED_GLOBALS })
  const vm: SandboxVm = {
    setGlobal(name, value): undefined {
      sandboxed.setGlobal(name, value)
    },
    async doString(source): Promise<unknown> {
      return sandboxed.doString(source)
    },
  }
  const dispose = async (): Promise<void> => {
    try {
      await sandboxed.close()
    } catch {}
  }
  return { vm, dispose }
}

function xmlFilesUnder(dir: string): readonly string[] {
  const out: string[] = []
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const entry of entries) {
    const path = join(dir, entry)
    let entryStat: ReturnType<typeof statSync>
    try {
      entryStat = statSync(path)
    } catch {
      continue
    }
    if (entryStat.isDirectory()) {
      out.push(...xmlFilesUnder(path))
    } else if (entryStat.isFile() && path.endsWith(".xml") && basename(path) !== "Bindings.xml") {
      out.push(path)
    }
  }
  return out
}

function collectConsumedStringIds(addonDir: string): readonly string[] {
  const ids = new Set<string>()
  for (const xmlFile of xmlFilesUnder(addonDir)) {
    let xml: string
    try {
      xml = readFileSync(xmlFile, "utf8")
    } catch {
      continue
    }
    for (const id of extractOnInitializedGetStringIds(xml)) ids.add(id)
  }
  return [...ids].sort()
}

interface StringIdAssertion {
  readonly displayName: string
  readonly consumedIds: readonly string[]
}

async function loadOneBundle(
  file: string,
  stringIdAssertion: StringIdAssertion | null
): Promise<LoadResult> {
  let source: string
  let mtimeIso: string
  try {
    source = readFileSync(file, "utf8")
    mtimeIso = statSync(file).mtime.toISOString()
  } catch (err) {
    if (errnoCode(err) === "ENOENT") {
      return { ok: true, bundle: file }
    }
    return { ok: false, bundle: file, error: `read error: ${errorMessage(err)}` }
  }
  let vm: SandboxVm
  let dispose: () => Promise<void>
  try {
    ;({ vm, dispose } = await createSandboxedVm())
  } catch (err) {
    return {
      ok: false,
      bundle: file,
      error: `failed to instantiate sandbox VM: ${errorMessage(err)}`,
    }
  }
  const ownedIds =
    stringIdAssertion === null
      ? []
      : filterAddonOwnedStringIds(stringIdAssertion.consumedIds, ESO_BASE_GAME_STRING_IDS)
  const needsAssertion = stringIdAssertion !== null && ownedIds.length > 0
  try {
    const result = await loadBundleUnderSandbox(
      {
        source,
        bundle: file,
        ...(needsAssertion ? { prelude: STRING_ID_RECORDING_PRELUDE } : {}),
      },
      vm
    )
    if (!result.ok) return { ...result, diagnostics: { ...summarizeBundle(source), mtimeIso } }
    if (needsAssertion && stringIdAssertion !== null) {
      return await assertStringIdsRegistered(
        { bundle: stringIdAssertion.displayName, consumedIds: ownedIds },
        vm
      )
    }
    return result
  } finally {
    await dispose()
  }
}

function stringIdAssertionFor(file: string, distRoot: string | null): StringIdAssertion | null {
  if (distRoot === null) {
    const ids = collectConsumedStringIds(dirname(file))
    return ids.length === 0 ? null : { displayName: file, consumedIds: ids }
  }
  const addonName = relative(distRoot, file).split(sep)[0]
  if (addonName === undefined || addonName === "") return null
  const addonDir = join(distRoot, addonName)
  if (basename(file) !== `${addonName}.lua` || dirname(file) !== addonDir) return null
  const ids = collectConsumedStringIds(addonDir)
  return ids.length === 0 ? null : { displayName: addonName, consumedIds: ids }
}

const CHECK_SCRIPT =
  "temper/temper-build-deploy-checks/check-addon-sandbox-load/check-addon-sandbox-load.module.code.ts"

export interface AddonSandboxLoadOptions {
  readonly singleFile: string | null
}

export async function runAddonSandboxLoad({
  singleFile,
}: AddonSandboxLoadOptions): Promise<number> {
  if (ESO_BASE_GAME_STRING_IDS.size === 0) {
    console.error(
      `${GATE}: the base-game string-id census is empty, so no consumed string id can be` +
        " told from a base-game one and this run certifies nothing. Regenerate" +
        " the census from ~/esoui:\n" +
        "  ops eso generate-base-game-globals"
    )
    return 2
  }

  let files: readonly string[]
  let assertionDistRoot: string | null = null
  if (singleFile !== null) {
    files = [resolve(singleFile)]
  } else {
    const bundles: AddonDistBundles = collectAddonDistBundles()
    files = bundles.files
    if (files.length === 0) return refuseAddonDistPopulation(GATE, bundles, 0)
    assertionDistRoot = bundles.distRoot
  }

  const cwd = process.cwd()
  const failures: string[] = []
  let loaded = 0
  for (const file of files) {
    const result = await loadOneBundle(file, stringIdAssertionFor(file, assertionDistRoot))
    if (!result.ok) {
      const display = result.bundle.startsWith(cwd) ? relative(cwd, result.bundle) : result.bundle
      failures.push(formatLoadError({ ...result, bundle: display }))
    }
    loaded++
  }

  const bound = renderPopulationBound({
    examined: loaded,
    declared: files.length,
    unit: ADDON_BUNDLE_UNIT,
  })
  if (failures.length === 0) {
    console.log(`${GATE}: loaded clean under the ESO sandbox ${bound}`)
    return 0
  }

  for (const line of failures) console.error(line)
  console.error("")
  console.error(`${GATE}: ${failures.length} bundle(s) failed runtime load ${bound}`)
  console.error(formatLoadFailureGuidance(ADDON_BUILD_COMMAND, CHECK_SCRIPT))
  return 1
}

export async function main(argv: readonly string[] = process.argv.slice(2)): Promise<number> {
  return runAddonSandboxLoad(parseArgs(argv))
}

if (import.meta.main) {
  main()
    .then((code) => process.exit(code))
    .catch((err) => {
      console.error(
        `addon-sandbox-load: tool error — ${err instanceof Error ? (err.stack ?? err.message) : err}`
      )
      process.exit(2)
    })
}
