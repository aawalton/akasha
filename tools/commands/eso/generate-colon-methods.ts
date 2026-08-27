
export const summary =
  "Rebuild the base-game colon-method name authority in the code repo from the ~/esoui clone"

import { readFileSync, realpathSync, statSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { codeRoot } from "../../lib/code-root.ts"
import { collectLuaFiles, esoDocApiVersion, esoPaths } from "../../lib/eso-clone-code.ts"
import { extractColonMethodNames } from "../../lib/eso-colon-methods.ts"
import { dataError, inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const SELF = "ops eso generate-colon-methods"

const OUT_REL = "packages/temper/shared/build-deploy/checks/src/eso-colon-methods.generated.ts"

export const help: CommandHelp = {
  description:
    "Scan every Lua file under the ESO UI source clone for `function <Class>:<Method>(` definitions, and write the distinct method names into the code repo as a sorted authority.\n" +
    "\n" +
    "The written file is a tracked artefact of the code repo, which two addon gates read; this command is the rule it is made by and stands here, where no deploy has to carry it. The output path is taken from the code checkout named rather than from this file's own location, so the artefact lands in the tree it belongs to whichever checkout this runs from.\n" +
    "\n" +
    "The clone is read and never written. Where it holds no colon-method the run fails rather than writing an empty authority, because an empty set reads to every consumer as a clean answer.",
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
        "The code checkout the artefact is written into. Defaults to CODE_ROOT, or the sibling `code`. The domain logic this reads is loaded from the main checkout either way.",
    },
  ],
  envVars: [{ name: "CODE_ROOT", description: "The code checkout, when --code-root is absent." }],
  examples: ["ops eso generate-colon-methods --code-root ~/repos/code"],
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
 * Comprehensive base-game colon-method NAME authority (#12883): the set of every
 * distinct method name defined as a \`function <Class>:<Method>(\` colon-method in
 * the ESO UI source. Consumed by \`check-tstl-this-void-colon-method\` (flags a
 * \`this: void\` ambient decl whose name is a real ESO colon-method — the
 * self-dropping dot-call footgun) and by \`check-tstl-colon-dot-self-shift\`'s
 * reserved set (a real ESO colon-method can no longer be subtracted from the
 * colon-set by an addon-local \`this: void\` shim).
 *
 * Regenerate with: \`ops eso generate-colon-methods\`
 * (run locally, where the \`~/esoui\` peer clone exists). The gate itself never
 * reads \`~/esoui\` — only this committed file.
 *
${header}
 *
 * ${names.length} distinct colon-method name(s), sorted for stable diffs.
 */

export const ESO_COLON_METHOD_NAMES: ReadonlySet<string> = new Set<string>([
${lines}
])
`
}

export default async function esoGenerateColonMethods(args: readonly string[]): Promise<void> {
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
    for (const name of extractColonMethodNames(text)) names.add(name)
  }
  if (names.size === 0) {
    throw dataError(
      `no colon-method found in ${luaFiles.length} Lua file(s) under ${esoRoot} — an empty authority reads to every consumer as a clean answer, so nothing was written`
    )
  }

  const apiVersion = paths.parseEsoDocApiVersion(
    readFileSync(docApi.esoDocPathForLuaRoot(esoRoot), "utf8")
  )
  const sorted = [...names].sort()
  const outPath = resolve(codeCheckout, OUT_REL)
  writeFileSync(outPath, renderManifest(sorted, paths.esoCloneHeaderLines(SELF, apiVersion)), "utf8")
  process.stdout.write(
    `wrote ${sorted.length} colon-method name(s) from ${luaFiles.length} Lua file(s) under ${esoRoot} → ${outPath}\n`
  )
}
