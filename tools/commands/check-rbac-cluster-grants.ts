export const summary =
  "Rule that the deploy ClusterRole grants create and patch on every cluster-scoped kind the synths emit"

import type { CommandHelp } from "../ops/surface.ts"
import { errorMessage } from "../lib/check-workflow/error-message.ts"
import { examinePopulation } from "../lib/check-workflow/population.ts"
import {
  exitOnResult,
  exitOnToolError,
  type Violation,
} from "../lib/check-workflow/violation-reporter.ts"
import { APPLY_VERBS, KIND_SCOPE_REGISTRY } from "../lib/cluster-rbac/kinds.ts"
import { tupleOf, tupleSet } from "../lib/cluster-rbac/permissions.ts"
import { clusterRoleRules } from "../lib/cluster-rbac/rules.ts"
import { type LoadedSynths, loadEverySynth } from "../lib/cluster-rbac/synth.ts"
import { extractResourceKinds } from "../lib/cluster-rbac/yaml-read.ts"
import { parseArgs } from "../lib/parse-args.ts"
import { SURFACE_ROOT_FLAGS, surfaceRoots } from "../lib/workflow-surface/roots.ts"

export const help: CommandHelp = {
  flags: SURFACE_ROOT_FLAGS,
  exits: [
    { code: 0, meaning: "every emitted kind is classified and every cluster-scoped one granted" },
    { code: 1, meaning: "a kind is unclassified, or a cluster-scoped kind is missing a verb" },
    { code: 2, meaning: "no synth could be reached, so nothing was ruled on" },
  ],
  examples: [
    "ops check-rbac-cluster-grants",
    "ops check-rbac-cluster-grants --code-root ~/repos/akasha",
  ],
}

const PREFIX = "[rbac-cluster-grants]"

interface ClusterGrantViolation extends Violation {
  readonly synthSource: string
  readonly kind: string
}

export default async function checkRbacClusterGrants(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const roots = surfaceRoots({
    instructionsRoot: parsed.string("--instructions-root"),
    codeRoot: parsed.string("--code-root"),
  })

  let loaded: LoadedSynths
  try {
    loaded = await loadEverySynth(roots.codeRoot)
  } catch (err) {
    exitOnToolError({ error: new Error(errorMessage(err)), prefix: PREFIX })
  }

  const clusterPerms = tupleSet(clusterRoleRules, { skipNamed: false })

  const { population, violations } = examinePopulation<string, ClusterGrantViolation>({
    members: [...loaded.keys()],
    unit: "synth.ts sources",
    labelOf: (synthPath) => synthPath,
    siteOf: (synthPath) => synthPath,
    examine: (synthPath) => {
      const outputs = loaded.get(synthPath)
      if (outputs === undefined || outputs instanceof Error) {
        throw outputs ?? new Error(`${synthPath}: no load result recorded`)
      }
      const violations: ClusterGrantViolation[] = []
      const unclassified = new Set<string>()
      for (const output of outputs) {
        for (const finding of extractResourceKinds(synthPath, output.yaml)) {
          const entry = KIND_SCOPE_REGISTRY[finding.kind]
          if (entry === undefined) {
            if (unclassified.has(finding.kind)) continue
            unclassified.add(finding.kind)
            violations.push({
              synthSource: synthPath,
              kind: finding.kind,
              file: synthPath,
              message:
                `${finding.kind} is not classified in KIND_SCOPE_REGISTRY. Scope is not derivable ` +
                "from manifest text, so an unclassified cluster-scoped kind would silently " +
                "reintroduce the missing-grant class; add it to " +
                "`tools/lib/cluster-rbac/kinds.ts` with its scope, and for a cluster-scoped kind " +
                "the apiGroup/resource the ClusterRole must grant create+patch on.",
            })
            continue
          }
          if (entry.scope === "namespaced") continue
          const missing = APPLY_VERBS.filter(
            (verb) => !clusterPerms.has(tupleOf(entry.apiGroup, entry.resource, verb))
          )
          if (missing.length === 0) continue
          violations.push({
            synthSource: synthPath,
            kind: finding.kind,
            file: synthPath,
            message:
              `${finding.kind} (apiGroup="${entry.apiGroup}" resource="${entry.resource}" ` +
              `missing="${missing.join(",")}") — add a rule granting create+patch on that ` +
              "(apiGroup, resource) to `clusterRoleRules` in `tools/lib/cluster-rbac/rules.ts`.",
          })
        }
      }
      return violations
    },
    membership: {
      kind: "enumerated",
      because:
        "the members are every `synth.ts` the discovery globs matched under this tree, and a " +
        "synth that would not import or whose outputs do not parse is held as its error and " +
        "raised when it is examined rather than dropped from the list",
    },
  })

  exitOnResult<ClusterGrantViolation>({
    violations,
    options: {
      population,
      prefix: PREFIX,
      header:
        "a synth emits a kind the registry does not classify, or applies a cluster-scoped " +
        "resource whose (apiGroup, resource) the pipeline-engine ClusterRole does not grant " +
        "create+patch on — the server-side apply would be forbidden at the cluster scope",
      footer: (count) => `${PREFIX} ${count} cluster-scoped grant finding(s).`,
      successMessage:
        `OK — every kind emitted by ${loaded.size} synth(s) under ${roots.codeRoot} is ` +
        "classified, and every cluster-scoped one is granted create+patch.",
      groupBy: (violation) => violation.synthSource,
    },
  })
}
