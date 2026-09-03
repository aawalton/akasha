export const summary =
  "Rebuild the base-game colon-method name census from the ~/esoui clone, divided to fit akasha"

import { mkdirSync, mkdtempSync, readFileSync, realpathSync, statSync } from "node:fs"
import { join, resolve } from "node:path"
import {
  byteLength,
  renderSeries,
  type SeriesSpec,
  stageSeries,
} from "../../lib/akasha-name-series.ts"
import { codeRoot } from "@akasha/pages-system/code-root"
import { collectLuaFiles, esoDocApiVersion, esoPaths } from "../../lib/eso-clone-code.ts"
import { extractColonMethodNames } from "../../lib/eso-colon-methods.ts"
import { dataError, inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const SELF = "ops eso generate-colon-methods"

const GENERATED_DIR_REL = "akasha/temper/temper-build-deploy-checks/generated"

const STEM = "eso-colon-methods"

const BINDING = "ESO_COLON_METHOD_NAMES"

const SCRATCH_PARENT = "/var/tmp"

const STAGE_PREFIX = "ops-eso-colon-methods-stage-"

export const help: CommandHelp = {
  description:
    "Scan every Lua file under the ESO UI source clone for `function <Class>:<Method>(` definitions and stage the distinct method names as a divided census.\n" +
    "\n" +
    "Nothing reads this census today, and that is why it does not stand in akasha. It answered receiver provenance for `check-tstl-this-void-colon-method` — a `this: void` function-typed property decl of an ESO colon-method name is a self-drop bug only where the object it sits on is a base-game global — and for `check-tstl-colon-dot-self-shift`'s reserved set. Both are TSTL checks that did not cross, so the census was not recreated when the string-id one was. This command is the rule it would be made by, kept standing so that a check reaching for it again has one.\n" +
    "\n" +
    "One file of the whole census is over 20 times the 15,000 byte akasha ceiling, so it is written as numbered runs with an aggregate composing them. How many digits a run's ordinal carries is derived from how many runs there are rather than stated.\n" +
    "\n" +
    "Nothing lands here. The bodies are staged outside `akasha/` and the `akasha write` call that lands them is printed, because that call is what judges them against the checks and commits them. Landing them puts about 12,000 method names into the tree that nothing asks a question of, so land them when a consumer arrives rather than before.\n" +
    "\n" +
    "The clone is read and never written. Where it holds no colon-method the run fails rather than staging an empty census, because an empty set reads to every consumer as a clean answer.",
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
        "The checkout the census is staged against — where the page ids already in use and the bodies already standing are read from. Defaults to $CODE_ROOT, else this repository.",
    },
    {
      name: "--stage",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The directory the bodies are staged in. Defaults to a fresh directory under /var/tmp, which is left standing for the `akasha write` call to read.",
    },
  ],
  envVars: [
    { name: "CODE_ROOT", description: "The checkout to work in, when --code-root is absent." },
  ],
  exits: [
    { code: 1, meaning: "the ESO source root named does not exist, or is no directory" },
    {
      code: 2,
      meaning: "the clone holds no colon-method, or a run would exceed the akasha ceiling",
    },
  ],
  examples: ["ops eso generate-colon-methods --code-root ~/repos/akasha"],
}

function stagingAt(named: string | undefined): string {
  if (named === undefined) return mkdtempSync(join(realpathSync(SCRATCH_PARENT), STAGE_PREFIX))
  mkdirSync(named, { recursive: true })
  return realpathSync(named)
}

export default async function esoGenerateColonMethods(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const codeCheckout = realpathSync(parsed.string("--code-root") ?? codeRoot())
  const stage = stagingAt(parsed.string("--stage"))

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
      `no colon-method found in ${String(luaFiles.length)} Lua file(s) under ${esoRoot} — an empty census reads to every consumer as a clean answer, so nothing was staged`
    )
  }

  const apiVersion = paths.parseEsoDocApiVersion(
    readFileSync(docApi.esoDocPathForLuaRoot(esoRoot), "utf8")
  )

  const spec: SeriesSpec = {
    generatedDirRel: GENERATED_DIR_REL,
    stem: STEM,
    binding: BINDING,
    names: [...names].sort(),
    runDefinition:
      "one run of the colon-method names the base game defines, in the whole census's order",
    aggregateDefinition:
      "every colon-method name the base game defines, gathered from the runs holding them",
    provenance: [...paths.esoCloneHeaderLines(SELF, apiVersion)],
  }

  const pages = renderSeries(codeCheckout, spec)
  const runs = pages.length - 1
  const staged = stageSeries(
    codeCheckout,
    spec,
    pages,
    stage,
    `regenerate the base-game colon-method census from the ~/esoui clone at API ${String(apiVersion)}`
  )

  process.stdout.write(
    `${SELF} read ${String(luaFiles.length)} Lua file(s) under ${esoRoot} (API ${String(apiVersion)}) ` +
      `and kept ${String(spec.names.length)} colon-method name(s) divided into ${String(runs)} run(s)\n`
  )
  for (const page of pages) {
    process.stdout.write(`  ${String(byteLength(page.code))}\t${page.codeRel}\n`)
  }
  for (const rel of staged.goneRels) process.stdout.write(`  gone\t${rel}\n`)

  if (staged.landAt === null) {
    process.stdout.write(
      `\nEvery body above already stands with the body this run rendered, so there is nothing to land.\n` +
        `That is the round trip: the ${String(runs)} runs compose back to the ${String(spec.names.length)} names one file would have held.\n`
    )
    return
  }

  process.stdout.write(
    `\nNothing has landed. ${String(staged.changed.length)} file(s) differ from what stands. To land them, run:\n  bash ${staged.landAt}\n`
  )
  process.stdout.write(
    `\nNothing in the tree reads ${BINDING} today, so landing this adds an authority with no\n` +
      `consumer. The temper-build-deploy-checks package manifest would want a\n` +
      `\`./${STEM}\` entry pointing at the aggregate's code, and the workspace-package\n` +
      `page would want every run's slug in \`partSlugs\`. Nothing here writes either.\n`
  )
}
