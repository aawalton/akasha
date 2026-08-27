export const summary =
  "Rule that every CI check's dispatch population selects fewer files than the whole repo, or declares its breadth"

import { resolve } from "node:path"
import type { CommandHelp, HelpFlag } from "../ops/surface.ts"
import {
  findPopulationSeedFindings,
  type PopulationSeedFinding,
  type PopulationSeedSubject,
} from "../lib/check-workflow/bare-ts-population-seeds.ts"
import { checkWorkflow } from "../lib/check-workflow/index.ts"
import {
  DECLARED_TABLE_DIRECTORY,
  declaredCheckNames,
} from "../lib/check-workflow/declared-check-configs.ts"
import { examinePopulation } from "../lib/check-workflow/population.ts"
import { ALLOWLISTED_REPO_WIDE_TS_SCANNERS } from "../lib/check-workflow/repo-wide-ts-scanners.ts"
import { exitOnResult, exitOnToolError } from "../lib/check-workflow/violation-reporter.ts"
import { codeRoot } from "../lib/code-root.ts"
import { parseArgs } from "../lib/parse-args.ts"
import { repoFilesAt } from "../lib/repo-files-at.ts"
import { canonicalize, normalizeAbsolute } from "../../repo/path/path"
import { ownRepoRoot } from "../../repo/roots/roots"

const CODE_ROOT_FLAG: HelpFlag = {
  name: "--code-root",
  argLabel: "<dir>",
  valueShape: "token",
  path: true,
  description:
    "The checkout the check workflow is composed over and whose files are measured (defaults to $CODE_ROOT, else this repository).",
}

const REGISTRY_PATH = "tools/lib/check-workflow/index.ts"

export const help: CommandHelp = {
  flags: [
    CODE_ROOT_FLAG,
    { name: "--json", description: "Emit one JSON object per violation instead of prose." },
  ],
  exits: [
    { code: 0, meaning: "every population seed narrows or declares its breadth" },
    { code: 1, meaning: "one or more seeds over-cover without declaring it" },
    { code: 2, meaning: "fewer checks arrived than are declared, or a tree could not be read" },
  ],
  examples: [
    "ops check-bare-ts-population-seeds",
    "ops check-bare-ts-population-seeds --code-root ~/repos/akasha",
  ],
}

const PREFIX = "[bare-ts-population-seeds]"

interface CheckMember {
  readonly name: string
  readonly config: PopulationSeedSubject | undefined
}

export default async function checkBareTsPopulationSeeds(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const root = canonicalize(normalizeAbsolute(parsed.string("--code-root") ?? codeRoot()))

  let files: readonly string[]
  try {
    files = repoFilesAt(root, { includeFixtures: true, includeGenerated: true })
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  let liveConfigs: readonly PopulationSeedSubject[]
  try {
    liveConfigs = (checkWorkflow(root).steps ?? []).map((step) => ({
      name: step.name.replace(/^check-/, ""),
      dispatchNodeTypes: step.dispatchNodeTypes,
    }))
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  let declared: Awaited<ReturnType<typeof declaredCheckNames>>
  try {
    declared = await declaredCheckNames(root)
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  if (declared.modules === 0) {
    exitOnToolError({
      error: new Error(
        `no check-config table module found under ${DECLARED_TABLE_DIRECTORY}, so the checks this run would certify have no least count under them`
      ),
      prefix: PREFIX,
    })
  }

  const live = new Map(liveConfigs.map((config) => [config.name, config]))
  const members: readonly CheckMember[] = [
    ...liveConfigs.map((config) => ({ name: config.name, config })),
    ...[...declared.names]
      .filter((name) => !live.has(name))
      .map((name) => ({ name, config: undefined })),
  ]

  const { population } = examinePopulation({
    members,
    unit: "check configs",
    membership: {
      kind: "atLeast",
      members: declared.names.size,
      from: `the ${declared.modules} check-config table modules under ${DECLARED_TABLE_DIRECTORY}, enumerated on disk and imported by \`declaredCheckNames\``,
    },
    labelOf: (member) => member.name,
    siteOf: () => resolve(ownRepoRoot(), REGISTRY_PATH),
    examine: (member) => {
      if (member.config === undefined) {
        throw new Error(
          "declared in a check-config table and composed into no workflow step, so this run saw no population seed for it"
        )
      }
      return []
    },
  })

  exitOnResult<PopulationSeedFinding>({
    violations: findPopulationSeedFindings(liveConfigs, files, ALLOWLISTED_REPO_WIDE_TS_SCANNERS),
    options: {
      population,
      format: parsed.boolean("--json") ? "json" : "human",
      prefix: PREFIX,
      header: "CheckConfig population seeds over-cover without declaring it",
      successMessage:
        `Every population seed either selects fewer files than the unscoped population or declares its breadth. ` +
        `Measured over ${files.length} file(s) in the tree at ${root}.`,
      formatViolation: (v) => v.message,
    },
  })
}
