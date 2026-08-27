export const summary = "Rule that no checksum/* annotation is stamped from a live cluster object inside a step a content-hash gate can skip"

import type { CommandHelp } from "../ops/surface.ts"
import {
  type ChecksumSubstitutionReachabilityViolation,
  type ChecksumSubstitutionStep,
  isChecksumSubstitutionStep,
  scanChecksumSubstitutionReachability,
} from "../lib/check-workflow/checksum-substitution-reachability.ts"
import { errorMessage } from "../lib/check-workflow/error-message.ts"
import { examinePopulation } from "../lib/check-workflow/population.ts"
import { exitOnResult, exitOnToolError } from "../lib/check-workflow/violation-reporter.ts"
import { buildWorkflowSurface } from "../lib/workflow-surface/build"
import { commandsFor, type ProbeContextId, type SurfaceStep } from "../lib/workflow-surface/surface"
import { readUnder, SURFACE_ROOT_FLAGS, surfaceRoots } from "../lib/workflow-surface/roots.ts"
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
    { code: 0, meaning: "no checksum stamp is stranded behind a skip gate" },
    { code: 1, meaning: "one or more checksum stamps cannot run on the event they exist for" },
    { code: 2, meaning: "the detector no longer bites, or a tree could not be read" },
  ],
  examples: [
    "ops check-checksum-substitution-reachability",
    "ops check-checksum-substitution-reachability --code-root ~/repos/code",
  ],
}

const PREFIX = "[checksum-substitution-reachability]"

const CONTEXT: ProbeContextId = "main-no-diff"

const SKIP_GATED_LIVE_HASH_FIXTURE: readonly ChecksumSubstitutionStep[] = [
  {
    workflow: "loki",
    sourcePath: "pages/workflow-template/workflow-loki.workflow-template.declaration.attachment.ts",
    step: "loki-apply-deployment",
    commands: [
      "set -e",
      'CONTENT_HASH="abc123456789"',
      "CURRENT_HASH=$(kubectl get configmap loki-pipeline-state -n loki -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || echo \"\")",
      'if [ "$CURRENT_HASH" = "$CONTENT_HASH" ]; then echo "Content hash unchanged, skipping"; exit 0; fi',
      "S3_CREDS_HASH=$(kubectl get secret loki-s3-creds -n loki -o jsonpath='{.data.access_key}{.data.secret_key}' | md5sum | cut -d' ' -f1)",
      'sed "s|checksum/s3-creds:.*|checksum/s3-creds: \\"${S3_CREDS_HASH}\\"|" packages/infra/loki/service/k8s/generated/deployment.generated.yaml | kubectl apply -n loki -f -',
    ],
  },
]

interface DeclaredStep {
  readonly workflow: string
  readonly sourcePath: string
  readonly name: string
  readonly step: SurfaceStep
}

export default async function checkChecksumSubstitutionReachability(
  args: readonly string[]
): Promise<void> {
  const parsed = parseArgs(help, args)
  const roots = surfaceRoots({
    instructionsRoot: parsed.string("--instructions-root"),
    codeRoot: parsed.string("--code-root"),
  })

  if (scanChecksumSubstitutionReachability(SKIP_GATED_LIVE_HASH_FIXTURE).length === 0) {
    exitOnToolError({
      error: new Error(
        "gate-integrity failure: the detector did NOT flag the known loki-shaped defect — a " +
          "`checksum/s3-creds` stamped from a live Secret inside a content-hash-skip-gated step. " +
          "It has degraded into a no-op and would let a substitution that can never run ship, " +
          "which is the exact failure this gate exists to prevent."
      ),
      prefix: PREFIX,
    })
  }

  let declared: readonly DeclaredStep[]
  let workflowCount: number
  try {
    const surface = await buildWorkflowSurface(roots.instructionsRoot, {
      codeRoot: roots.codeRoot,
    })
    workflowCount = surface.workflows.length
    declared = surface.workflows.flatMap((workflow) =>
      workflow.steps.map((step) => ({
        workflow: workflow.name,
        sourcePath: workflow.sourcePath,
        name: step.name,
        step,
      }))
    )
  } catch (err) {
    exitOnToolError({ error: new Error(errorMessage(err)), prefix: PREFIX })
  }

  const stamping: ChecksumSubstitutionStep[] = []
  const { population, violations } = examinePopulation<
    DeclaredStep,
    ChecksumSubstitutionReachabilityViolation
  >({
    members: declared,
    unit: "workflow steps",
    membership: {
      kind: "enumerated",
      because:
        "`buildWorkflowSurface` parses what it emits through its own schema, and a workflow " +
        "page that yields no workflow throws out of discovery rather than being skipped, so a " +
        "short list is reported as a tool error above instead of scanned; the members are every " +
        "`steps` entry of every workflow it returned, flattened with nothing dropped",
    },
    labelOf: (member) => `${member.workflow} → ${member.name}`,
    siteOf: (member) => `${roots.instructionsRoot}/${member.sourcePath}`,
    examine: (member) => {
      let commands: readonly string[]
      try {
        commands = commandsFor(member.step, CONTEXT)
      } catch (err) {
        throw new Error(
          `could not resolve commands for ${member.workflow} → ${member.name} ` +
            `(${member.sourcePath}): ${errorMessage(err)}`
        )
      }
      const step: ChecksumSubstitutionStep = {
        workflow: member.workflow,
        sourcePath: member.sourcePath,
        step: member.name,
        commands,
      }
      stamping.push(step)
      return scanChecksumSubstitutionReachability([step])
    },
  })

  if (stamping.length === 0) {
    exitOnToolError({
      error: new Error(
        `gate-integrity failure: composing ${roots.instructionsRoot} over ${roots.codeRoot} ` +
          `resolved no step at all (${workflowCount} workflow(s)). An empty population would ` +
          "report clean having scanned nothing."
      ),
      prefix: PREFIX,
    })
  }

  const found =
    `${stamping.filter(isChecksumSubstitutionStep).length} checksum-stamping step(s) of ` +
    `${stamping.length} resolved across ${workflowCount} workflow(s)`

  exitOnResult({
    violations,
    options: {
      population,
      format: parsed.boolean("--json") ? "json" : "human",
      prefix: PREFIX,
      header:
        "a checksum/* substitution hashing a LIVE cluster object inside a " +
        "content-hash-skip-gated step — it cannot run on the one event it exists for",
      successMessage: `OK — ${found}, none stranded behind a skip gate.\n  ${readUnder(roots)}`,
      footer: (count) =>
        `${PREFIX} ${count} of ${found} skip-gated\n${PREFIX} ${readUnder(roots)}`,
      formatViolation: (one) => `${one.file} ${one.workflow} → ${one.step}: ${one.message}`,
    },
  })
}
