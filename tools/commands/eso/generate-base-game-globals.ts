export const summary =
  "Rebuild the base-game string-id census akasha carries from the ~/esoui clone, divided to fit"

import { mkdirSync, mkdtempSync, readFileSync, realpathSync, statSync } from "node:fs"
import { join, resolve } from "node:path"
import {
  byteLength,
  renderSeries,
  type SeriesSpec,
  stageSeries,
} from "../../lib/akasha-name-series.ts"
import { codeRoot } from "@akasha/pages-system/code-root"
import { extractGlobalNames, extractStringIdNames } from "../../lib/eso-base-game-globals.ts"
import { collectLuaFiles, esoDocApiVersion, esoPaths } from "../../lib/eso-clone-code.ts"
import { dataError, inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const SELF = "ops eso generate-base-game-globals"

const GENERATED_DIR_REL = "akasha/temper/temper-build-deploy-checks/generated"

const STEM = "eso-base-game-string-ids"

const BINDING = "ESO_BASE_GAME_STRING_IDS"

const SCRATCH_PARENT = "/var/tmp"

const STAGE_PREFIX = "ops-eso-base-game-string-ids-stage-"

export const help: CommandHelp = {
  description:
    "Scan every Lua file under the ESO UI source clone for top-level global assignments matching the ESO naming convention, union every `SI_*` string id the source mentions, keep the string ids, and stage the result as the divided census akasha carries.\n" +
    "\n" +
    "A string id is declared by `SafeAddString` rather than assigned, so the mention scan is what reaches it; an assignment scan alone misses hundreds.\n" +
    "\n" +
    "Only the string ids cross. The scan sees about 21,000 base-game names and akasha keeps the 13,000-odd `SI_*` ones, because the one live consumer asks the census one question: whether an `SI_*` id an add-on's XML consumes at parse time is provided by the base game. `check-addon-sandbox-load` asks it. Keeping the other 8,000 names would put a second, wider ESO name authority beside the curated one in `temper-eso-types`, and the two would contradict each other by construction.\n" +
    "\n" +
    "One file of the whole census is 52 times the 15,000 byte akasha ceiling, so it is written as numbered runs with an aggregate composing them. How many digits a run's ordinal carries is derived from how many runs there are rather than stated.\n" +
    "\n" +
    "Nothing lands here. The bodies are staged outside `akasha/` and the `akasha write` call that lands them is printed, because that call is what judges them against the checks and commits them. A run whose body already stands is not staged at all, so a scan finding the same names stages nothing.\n" +
    "\n" +
    "The clone is read and never written. Where it holds no string id the run fails rather than staging an empty census, because an empty set reads to every consumer as a clean answer.",
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
    { code: 2, meaning: "the clone holds no string id, or a run would exceed the akasha ceiling" },
  ],
  examples: ["ops eso generate-base-game-globals --code-root ~/repos/akasha"],
}

function stagingAt(named: string | undefined): string {
  if (named === undefined) return mkdtempSync(join(realpathSync(SCRATCH_PARENT), STAGE_PREFIX))
  mkdirSync(named, { recursive: true })
  return realpathSync(named)
}

export default async function esoGenerateBaseGameGlobals(args: readonly string[]): Promise<void> {
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

  const seen = new Set<string>()
  const stringIds = new Set<string>()
  const luaFiles = collectLuaFiles(esoRoot)
  for (const file of luaFiles) {
    let text: string
    try {
      text = readFileSync(file, "utf8")
    } catch {
      continue
    }
    for (const name of [...extractGlobalNames(text), ...extractStringIdNames(text)]) {
      seen.add(name)
      if (name.startsWith("SI_")) stringIds.add(name)
    }
  }
  if (stringIds.size === 0) {
    throw dataError(
      `no string id found among ${String(seen.size)} name(s) in ${String(luaFiles.length)} Lua file(s) under ${esoRoot} — an empty census reads to every consumer as a clean answer, so nothing was staged`
    )
  }

  const apiVersion = paths.parseEsoDocApiVersion(
    readFileSync(docApi.esoDocPathForLuaRoot(esoRoot), "utf8")
  )

  const spec: SeriesSpec = {
    generatedDirRel: GENERATED_DIR_REL,
    stem: STEM,
    binding: BINDING,
    names: [...stringIds].sort(),
    runDefinition: "one run of the string ids the base game provides, in the whole census's order",
    aggregateDefinition:
      "every string id the base game provides, gathered from the runs holding them",
    provenance: [...paths.esoCloneHeaderLines(SELF, apiVersion)],
  }

  const pages = renderSeries(codeCheckout, spec)
  const runs = pages.length - 1
  const staged = stageSeries(
    codeCheckout,
    spec,
    pages,
    stage,
    `regenerate the base-game string-id census from the ~/esoui clone at API ${String(apiVersion)}`
  )

  process.stdout.write(
    `${SELF} read ${String(luaFiles.length)} Lua file(s) under ${esoRoot} (API ${String(apiVersion)}), ` +
      `saw ${String(seen.size)} base-game name(s), and kept ${String(spec.names.length)} string id(s) ` +
      `divided into ${String(runs)} run(s)\n`
  )
  for (const page of pages) {
    process.stdout.write(`  ${String(byteLength(page.code))}\t${page.codeRel}\n`)
  }
  for (const rel of staged.goneRels) process.stdout.write(`  gone\t${rel}\n`)

  const heldPage = pages.find((one) => one.slug === STEM)
  const pageStands = staged.files.some((one) => one.rel === heldPage?.pageRel && one.standing)
  if (pageStands) {
    process.stdout.write(
      `\nThe aggregate's page stands and was not restaged, so what a hand put on it survives:\n` +
        `  ${String(heldPage?.pageRel)}\n`
    )
  }

  if (staged.landAt === null) {
    process.stdout.write(
      `\nEvery body above already stands with the body this run rendered, so there is nothing to land.\n` +
        `That is the round trip: the ${String(runs)} runs compose back to the ${String(spec.names.length)} string ids one file would have held.\n`
    )
    return
  }

  process.stdout.write(
    `\nNothing has landed. ${String(staged.changed.length)} file(s) differ from what stands. To land them, run:\n  bash ${staged.landAt}\n`
  )
  process.stdout.write(
    "\nakasha refuses a write over a body the read record does not show you read, so every\n" +
      "body above that already stands has to be read with `akasha read` first.\n"
  )

  // GAP: the temper-build-deploy-checks workspace-package page lists every module slug
  // beneath it in `partSlugs`, and nothing here writes that list. A run that changes how
  // many runs there are leaves that page naming runs that went and not naming runs that
  // came.
  const stood = new Set(staged.goneRels)
  const arrived = pages
    .filter((one) => one.slug !== STEM && staged.changed.includes(one.pageRel))
    .map((one) => one.slug)
  if (arrived.length > 0 || stood.size > 0) {
    process.stdout.write(
      "\nThe run count changed, so the temper-build-deploy-checks workspace-package page's\n" +
        "`partSlugs` no longer matches what stands. Nothing here writes that list; edit it by hand:\n"
    )
    for (const slug of arrived) process.stdout.write(`  add     module/${slug}\n`)
    for (const rel of staged.goneRels) process.stdout.write(`  remove  ${rel}\n`)
  }
}
