
export const summary =
  "Rebuild the base-game global-name authority in this repository from the ~/esoui clone"

import { readFileSync, realpathSync, statSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { codeRoot } from "../../lib/code-root.ts"
import {
  extractGlobalNames,
  extractStringIdNames,
} from "../../lib/eso-base-game-globals.ts"
import { collectLuaFiles, esoDocApiVersion, esoPaths } from "../../lib/eso-clone-code.ts"
import { dataError, inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const SELF = "ops eso generate-base-game-globals"

const OUT_REL = "temper/shared-build-deploy-checks/src/eso-base-game-globals.generated.ts"

export const help: CommandHelp = {
  description:
    "Scan every Lua file under the ESO UI source clone for top-level global assignments matching the ESO naming convention, union every `SI_*` string id the source mentions, and write the result into this repository as a sorted authority.\n" +
    "\n" +
    "A string id is declared by `SafeAddString` rather than assigned, so the mention scan is what reaches it; an assignment scan alone misses hundreds.\n" +
    "\n" +
    "The written file is a tracked artefact of this repository, which two addon gates read; this command is the rule it is made by and stands here, where no deploy has to carry it. The output path is taken from the checkout named rather than from this file's own location, so the artefact lands in the tree it belongs to whichever checkout this runs from.\n" +
    "\n" +
    "The clone is read and never written. Where it holds no global the run fails rather than writing an empty authority, because an empty set reads to every consumer as a clean answer.",
  flags: [
    {
      name: "--eso-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description: "The ESO UI Lua source root. Defaults to the ~/esoui clone.",
    },
    {
      name: "--code-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The checkout the artefact is written into. Defaults to $CODE_ROOT, else this repository. The domain logic this reads is loaded from the main checkout either way.",
    },
  ],
  envVars: [{ name: "CODE_ROOT", description: "The checkout to work in, when --code-root is absent." }],
  examples: ["ops eso generate-base-game-globals --code-root ~/repos/akasha"],
}

function renderManifest(
  names: readonly string[],
  headerLines: readonly [string, string]
): string {
  const lines = names.map((n) => `  ${JSON.stringify(n)},`).join("\n")
  const header = headerLines.map((line) => ` * ${line}`).join("\n")
  return `/**
 * AUTO-GENERATED — do not edit by hand.
 *
 * Base-game GLOBAL-NAME authority (#13325): every base-game ESO global name bound
 * by a top-level assignment in the ESO UI source and matching the ESO
 * global-naming convention (\`ZO_\`-prefixed, or ALL-CAPS/underscore/digit), UNION
 * every \`SI_*\` string-id name that source mentions (#18397 — a client-registered
 * string id is declared by \`SafeAddString\`, never assigned, so the assignment
 * scan alone missed 440 of them).
 *
 * Two consumers, each asking the same question of a name:
 *   - \`check-tstl-this-void-colon-method\` — RECEIVER PROVENANCE: a \`this: void\`
 *     function-typed property decl of an ESO colon-method name is a self-drop bug
 *     only when the object it sits on is a base-game global; a third-party-library
 *     receiver reuses the method NAME but is absent from this set.
 *   - \`addon-sandbox-load\` — STRING-ID PROVENANCE: an \`SI_*\` id an addon's XML
 *     consumes at parse time is exempt from the registration assertion only
 *     because the base game provides it, and absence here is what says it does
 *     not. Silence in the addon's own bundle used to stand in for that, which
 *     exempted the addon's own unregistered ids.
 *
 * Regenerate with: \`ops eso generate-base-game-globals\`
 * (run locally, where the \`~/esoui\` peer clone exists). The gate itself never
 * reads \`~/esoui\` — only this committed file.
 *
${header}
 *
 * ${names.length} distinct base-game global name(s), sorted for stable diffs.
 */

export const ESO_BASE_GAME_GLOBALS: ReadonlySet<string> = new Set<string>([
${lines}
])
`
}

export default async function esoGenerateBaseGameGlobals(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const codeCheckout = realpathSync(parsed.string("--code-root") ?? codeRoot())


  const paths = await esoPaths()
  const docApi = await esoDocApiVersion()

  const namedRoot = parsed.string("--eso-root")
  const esoRoot = namedRoot === undefined ? paths.esouiSourceDir() : resolve(namedRoot)

  let rootStat: ReturnType<typeof statSync>
  try {
    rootStat = statSync(esoRoot)
  } catch {
    throw inputError(`ESO source root ${esoRoot} not found — clone esoui or pass --eso-root`)
  }
  if (!rootStat.isDirectory()) {
    throw inputError(`${esoRoot} is not a directory`)
  }

  const names = new Set<string>()
  const luaFiles = collectLuaFiles(esoRoot)
  for (const file of luaFiles) {
    let text: string
    try {
      text = readFileSync(file, "utf8")
    } catch {
      continue
    }
    for (const name of extractGlobalNames(text)) names.add(name)
    for (const name of extractStringIdNames(text)) names.add(name)
  }
  if (names.size === 0) {
    throw dataError(
      `no global found in ${luaFiles.length} Lua file(s) under ${esoRoot} — an empty authority reads to every consumer as a clean answer, so nothing was written`
    )
  }

  const apiVersion = paths.parseEsoDocApiVersion(
    readFileSync(docApi.esoDocPathForLuaRoot(esoRoot), "utf8")
  )
  const sorted = [...names].sort()
  const outPath = resolve(codeCheckout, OUT_REL)
  writeFileSync(outPath, renderManifest(sorted, paths.esoCloneHeaderLines(SELF, apiVersion)), "utf8")
  process.stdout.write(
    `wrote ${sorted.length} base-game global name(s) from ${luaFiles.length} Lua file(s) under ${esoRoot} → ${outPath}\n`
  )
}
