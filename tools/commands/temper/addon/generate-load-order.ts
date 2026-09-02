
export const summary =
  "Write one addon's ESO load-order manifest and build-id stamp into this repository's addon dist tree"

import { existsSync } from "node:fs"
import { mkdir, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { z } from "zod"
import { readTstlLuaBundle } from "../../../lib/addon-load-order-graph.ts"
import {
  buildManifestLines,
  readAdditionalLuaFiles,
  readMetadataHeader,
  readXmlFiles,
} from "../../../lib/addon-load-order-metadata.ts"
import { codeRoot } from "../../../lib/code-root.ts"
import { dataError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { addonsResolve } from "../../../lib/temper-addon-code.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

const ADDONS_REL_ROOT = "temper/addons"

const BUILD_ID_FILE = "build-id.lua"

export const help: CommandHelp = {
  description:
    "Read one addon's `addon.json` and `tsconfig.json` out of a checkout, and write `<name>.txt` — the manifest ESO reads to decide what to load and in what order — plus `build-id.lua` into that checkout's `temper/addons/dist/<name>/`.\n" +
    "\n" +
    "Both written files are build output, untracked, and this is the rule they are made by; it stands here, where no deploy has to carry it. The checkout is taken as an argument rather than derived from this file's own location, so the output lands in the tree it belongs to whichever checkout this runs from.\n" +
    "\n" +
    "`TemperCatalog` alone takes its `## APIVersion:` from the pages system rather than from its `addon.json`, as the lowest version any active catalog domain declares its generator last ran for.",
  flags: [
    {
      name: "--addon",
      argLabel: "<name>",
      valueShape: "token",
      description: "The addon to write a load order for. Defaults to TemperCharacters.",
    },
    {
      name: "--code-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The checkout read and written (defaults to $CODE_ROOT, else this repository). The addon resolver this reads is loaded from the main checkout either way.",
    },
  ],
  examples: ["ops temper addon generate-load-order --addon TemperCharacters"],
}

const shaSchema = z.string().optional()

async function gitHead(cwd: string): Promise<string> {
  try {
    const proc = Bun.spawn(["git", "rev-parse", "HEAD"], { cwd, stdout: "pipe", stderr: "ignore" })
    const out = (await new Response(proc.stdout).text()).trim()
    await proc.exited
    return proc.exitCode === 0 ? out : ""
  } catch {
    return ""
  }
}

async function resolveBuildId(cwd: string): Promise<string> {
  const fromEnv = shaSchema.parse(process.env.CI_COMMIT_SHA)
  const raw = fromEnv !== undefined && fromEnv.length > 0 ? fromEnv : await gitHead(cwd)
  const hex = raw.toLowerCase().replace(/[^0-9a-f]/g, "")
  return hex.length >= 8 ? hex.slice(0, 8) : "unknown"
}

function buildIdLua(name: string, sha: string): string {
  return `TemperBuildIds = TemperBuildIds or {}\nTemperBuildIds["${name}"] = "${sha}"\n`
}

export default async function temperAddonGenerateLoadOrder(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const addonName = parsed.string("--addon") ?? "TemperCharacters"
  const codeCheckout = resolve(parsed.string("--code-root") ?? codeRoot())

  const { resolveAddon } = await addonsResolve()
  const { dir: addonDir } = resolveAddon(addonName, { repoRoot: codeCheckout })

  const addonsRoot = join(codeCheckout, ADDONS_REL_ROOT)
  const distDir = join(addonsRoot, "dist", addonName)

  const metadataHeader = await readMetadataHeader(addonName, addonDir)
  const generatedTsconfig = join(addonsRoot, "dist/.tstl", `${addonName}.tsconfig.json`)
  const luaBundle = readTstlLuaBundle(addonDir, generatedTsconfig)
  if (luaBundle == null) {
    throw dataError(
      `${addonName}: no tstl.luaBundle declared in ${join(addonDir, "tsconfig.json")} nor in ${generatedTsconfig} — every Temper addon must declare tstl.luaBundle`
    )
  }
  const additionalLuaFiles = await readAdditionalLuaFiles(addonDir)
  const xmlFiles = await readXmlFiles(addonDir)

  const metadataDir = join(addonDir, "metadata")
  const nameXmlExists = existsSync(join(metadataDir, `${addonName}.xml`))
  const bindingsXmlExists = existsSync(join(metadataDir, "Bindings.xml"))

  const bundleFileName = luaBundle.split("/").pop() ?? luaBundle
  const luaPaths: readonly string[] = [bundleFileName]

  const buildId = await resolveBuildId(addonDir)

  const outputLines = buildManifestLines({
    metadataHeader,
    buildIdFile: BUILD_ID_FILE,
    additionalLuaFiles,
    xmlBeforeBundle: xmlFiles.beforeBundle,
    xmlAfterBundle: xmlFiles.afterBundle,
    luaPaths,
    addonName,
    nameXmlExists,
    bindingsXmlExists,
  })
  const luaCount = luaPaths.length + additionalLuaFiles.length

  const outputTxtPath = join(distDir, `${addonName}.txt`)
  await mkdir(distDir, { recursive: true })
  await writeFile(join(distDir, BUILD_ID_FILE), buildIdLua(addonName, buildId))
  await writeFile(outputTxtPath, outputLines.join("\n") + "\n")

  process.stdout.write(
    `wrote ${addonName} load order over ${luaCount} Lua file(s) from ${addonDir} → ${outputTxtPath}\n`
  )
}
