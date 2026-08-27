export const summary = "Rule that every check the composed CI workflows invoke is reached through run-check.ts rather than run directly"

import { existsSync } from "node:fs"
import { join } from "node:path"
import type { CommandHelp } from "../ops/surface.ts"
import { errorMessage } from "../lib/check-workflow/error-message.ts"
import { examinePopulation, type Population } from "../lib/check-workflow/population.ts"
import {
  DECLARED_UNEXAMINED_SOURCES,
  findCheckInvocations,
  findRoutingViolations,
  findUnjudgedScriptPaths,
  ROUTING_EXEMPTIONS,
  type RoutingViolation,
  RUN_CHECK_PATH,
  type ScannedCommand,
  unjudgedDeclarations,
} from "../lib/check-workflow/run-check-routing.ts"
import { exitOnResult, exitOnToolError } from "../lib/check-workflow/violation-reporter.ts"
import { buildWorkflowSurface } from "../lib/workflow-surface/build"
import { commandsFor, PROBE_CONTEXT_IDS } from "../lib/workflow-surface/surface"
import {
  readUnder,
  SURFACE_ROOT_FLAGS,
  surfaceRoots,
  type SurfaceRoots,
} from "../lib/workflow-surface/roots.ts"
import { parseArgs } from "../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    ...SURFACE_ROOT_FLAGS,
    {
      name: "--json",
      description: "Emit one JSON object per violation instead of prose.",
    },
  ],
  exits: [
    { code: 0, meaning: "every check invocation is routed through the runner" },
    { code: 1, meaning: "one or more invocations bypass the runner, or name a missing script" },
    { code: 2, meaning: "the scan certified nothing, or a tree could not be read" },
  ],
  examples: [
    "ops check-run-check-routing",
    "ops check-run-check-routing --code-root ~/repos/code",
  ],
}

const PREFIX = "[run-check-routing]"

const BYPASS_FIXTURE: readonly ScannedCommand[] = [
  {
    sourcePath: "pages/workflow-template/workflow-preparation.workflow-template.declaration.attachment.ts",
    workflow: "preparation",
    step: "preparation-build-graph",
    command:
      "cd /workspace && bun packages/infra/checks/src/checks/check-build-graph.ts --tree-sha 0000",
  },
]

interface Scanned {
  readonly commands: readonly ScannedCommand[]
  readonly population: Population
  readonly scannedSources: readonly string[]
  readonly unexaminedSources: readonly string[]
  readonly workflowCount: number
  readonly stepCount: number
  readonly invocationCount: number
  readonly unjudgedScriptCount: number
}

async function scanCommands(roots: SurfaceRoots): Promise<Scanned> {
  const surface = await buildWorkflowSurface(roots.instructionsRoot, {
    codeRoot: roots.codeRoot,
  })
  const scannedSources = surface.files.map((file) => file.sourcePath)
  const loaded = surface.workflows
  const examined = new Set(loaded.map((one) => one.sourcePath))

  const seen = new Set<string>()
  const commands: ScannedCommand[] = []
  let stepCount = 0

  for (const workflow of loaded) {
    for (const step of workflow.steps) {
      stepCount += 1
      for (const contextId of PROBE_CONTEXT_IDS) {
        let resolved: readonly string[]
        try {
          resolved = commandsFor(step, contextId)
        } catch (err) {
          throw new Error(
            `could not resolve commands for ${workflow.name} → ${step.name} ` +
              `(${workflow.sourcePath}): ${errorMessage(err)}`
          )
        }
        for (const command of resolved) {
          const key = `${workflow.sourcePath} ${step.name} ${command}`
          if (seen.has(key)) continue
          seen.add(key)
          commands.push({
            sourcePath: workflow.sourcePath,
            workflow: workflow.name,
            step: step.name,
            command,
          })
        }
      }
    }
  }

  const { population } = examinePopulation<ScannedCommand, never>({
    members: commands,
    unit: "commands",
    membership: {
      kind: "enumerated",
      because:
        "`buildWorkflowSurface` parses what it emits through its own schema, and a workflow " +
        "page that yields no workflow throws out of discovery rather than being skipped, so " +
        "this command reports a tool error instead of a short list; every step of every " +
        "workflow it did return is resolved under both probe contexts here, and a step whose " +
        "commands will not resolve throws too, so nothing leaves this list quietly",
    },
    labelOf: (one) => `${one.workflow} → ${one.step}: ${one.command}`,
    siteOf: (one) => join(roots.instructionsRoot, one.sourcePath),
    examine: () => [],
  })

  return {
    commands,
    population,
    scannedSources,
    unexaminedSources: scannedSources.filter((path) => !examined.has(path)).sort(),
    workflowCount: loaded.length,
    stepCount,
    invocationCount: commands.reduce(
      (count, one) => count + findCheckInvocations(one.command).length,
      0
    ),
    unjudgedScriptCount: new Set(
      commands.flatMap((one) => findUnjudgedScriptPaths(one.command))
    ).size,
  }
}

function scanReport(scanned: Scanned, roots: SurfaceRoots): readonly string[] {
  const unjudged = unjudgedDeclarations({
    scannedSources: scanned.scannedSources,
    exemptions: ROUTING_EXEMPTIONS,
    declaredUnexamined: DECLARED_UNEXAMINED_SOURCES,
  })
  return [
    readUnder(roots),
    "LOOKED UNDER: a check body a step names is looked for in both of those trees. A body and " +
      "the tree it reads need not stand in the same repository, so one that has moved is found " +
      "where it now stands rather than reported missing.",
    `SCANNED: ${scanned.scannedSources.length} workflow page(s) in the instructions tree → ` +
      `${scanned.workflowCount} workflow(s) loaded, ${scanned.unexaminedSources.length} that ` +
      `yielded none; ${scanned.stepCount} step(s), ${scanned.commands.length} distinct ` +
      `command(s) resolved under ${PROBE_CONTEXT_IDS.length} CI context(s).`,
    `NOT JUDGED: ${scanned.unjudgedScriptCount} other .ts script(s) are invoked by those ` +
      "commands and are not checks by name — a check is any `check-*.ts` plus the declared " +
      "entrypoints in `DECLARED_CHECK_ENTRYPOINTS`, in any package. A check named outside that " +
      "convention is in this count rather than in the one above.",
    `DECLARATIONS: ${DECLARED_UNEXAMINED_SOURCES.length - unjudged.unexamined} of ` +
      `${DECLARED_UNEXAMINED_SOURCES.length} declared-unexaminable source(s) and ` +
      `${ROUTING_EXEMPTIONS.length - unjudged.exemptions} of ${ROUTING_EXEMPTIONS.length} ` +
      "exemption(s) name a page this scan met, and those are the ones judged for staleness. A " +
      "declaration naming a source this tree does not carry is a statement about a tree this " +
      "run did not look at, so it is left alone rather than refused.",
    "NOT EVALUATED: any carrier that is not the workflow DSL — a shell script, a package.json " +
      "script, a CronJob, a hand-run command. Those were not read, so nothing above is a claim " +
      "about them.",
  ]
}

export default async function checkRunCheckRouting(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const roots = surfaceRoots({
    instructionsRoot: parsed.string("--instructions-root"),
    codeRoot: parsed.string("--code-root"),
  })

  const fixtureCaught = findRoutingViolations({
    commands: BYPASS_FIXTURE,
    scannedSources: BYPASS_FIXTURE.map((one) => one.sourcePath),
    unexaminedSources: [],
    exemptions: [],
    declaredUnexamined: [],
    scriptExists: () => true,
  })
  if (fixtureCaught.length === 0) {
    exitOnToolError({
      error: new Error(
        "gate-integrity failure: the detector did NOT flag a check invoked directly, without " +
          `${RUN_CHECK_PATH}. It has degraded into a no-op, and a registration whose check dies ` +
          "at module resolution would report that death as a violation of the branch."
      ),
      prefix: PREFIX,
    })
  }

  let scanned: Scanned
  try {
    scanned = await scanCommands(roots)
  } catch (err) {
    exitOnToolError({ error: new Error(errorMessage(err)), prefix: PREFIX })
  }

  if (scanned.invocationCount === 0) {
    exitOnToolError({
      error: new Error(
        `gate-integrity failure: composing ${roots.instructionsRoot} over ${roots.codeRoot} ` +
          `found no check invocation at all (${scanned.scannedSources.length} page(s), ` +
          `${scanned.workflowCount} workflow(s), ${scanned.stepCount} step(s)). "Nothing ` +
          'bypasses the runner" is vacuously true over an empty set, so this reports nothing ' +
          "rather than clean."
      ),
      prefix: PREFIX,
    })
  }

  const violations: readonly RoutingViolation[] = findRoutingViolations({
    commands: scanned.commands,
    scannedSources: scanned.scannedSources,
    unexaminedSources: scanned.unexaminedSources,
    exemptions: ROUTING_EXEMPTIONS,
    declaredUnexamined: DECLARED_UNEXAMINED_SOURCES,
    scriptExists: (script) =>
      [roots.codeRoot, roots.instructionsRoot].some((root) => existsSync(join(root, script))),
  })

  exitOnResult({
    violations,
    options: {
      population: scanned.population,
      format: parsed.boolean("--json") ? "json" : "human",
      prefix: PREFIX,
      header: "a check reached without the runner reports its own death as a verdict",
      successMessage: [
        `OK — ${scanned.invocationCount} check invocation(s), all routed through ${RUN_CHECK_PATH}.`,
        ...scanReport(scanned, roots).map((line) => `  ${line}`),
      ].join("\n"),
      footer: (count) =>
        [
          `${PREFIX} ${count} violation(s)`,
          ...scanReport(scanned, roots).map((line) => `${PREFIX} ${line}`),
        ].join("\n"),
      formatViolation: (one) => `${one.sourcePath} ${one.message}`,
    },
  })
}
