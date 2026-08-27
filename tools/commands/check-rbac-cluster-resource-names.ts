export const summary =
  "Rule that the engine may patch every ClusterRole and ClusterRoleBinding name the synths emit"

import type { CommandHelp } from "../ops/surface.ts"
import { errorMessage } from "../lib/check-workflow/error-message.ts"
import { examinePopulation } from "../lib/check-workflow/population.ts"
import {
  exitOnResult,
  exitOnToolError,
  type Violation,
} from "../lib/check-workflow/violation-reporter.ts"
import { patchRuleWhitelist } from "../lib/cluster-rbac/permissions.ts"
import { clusterRoleRules } from "../lib/cluster-rbac/rules.ts"
import { type LoadedSynths, loadEverySynth } from "../lib/cluster-rbac/synth.ts"
import { extractClusterResourceNames } from "../lib/cluster-rbac/yaml-read.ts"
import { parseArgs } from "../lib/parse-args.ts"
import { SURFACE_ROOT_FLAGS, surfaceRoots } from "../lib/workflow-surface/roots.ts"

export const help: CommandHelp = {
  flags: SURFACE_ROOT_FLAGS,
  exits: [
    { code: 0, meaning: "every emitted cluster-scoped RBAC name is covered" },
    { code: 1, meaning: "a name is covered by neither the whitelist nor the admin allowlist" },
    { code: 2, meaning: "no synth could be reached, so nothing was ruled on" },
  ],
  examples: [
    "ops check-rbac-cluster-resource-names",
    "ops check-rbac-cluster-resource-names --code-root ~/repos/akasha",
  ],
}

const PREFIX = "[rbac-cluster-resource-names]"

export const ADMIN_APPLIED_CLUSTER_RESOURCE_NAMES: ReadonlySet<string> = new Set<string>([])

interface ClusterResourceNameFinding extends Violation {
  readonly synthSource: string
}

export default async function checkRbacClusterResourceNames(
  args: readonly string[]
): Promise<void> {
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

  const whitelist = patchRuleWhitelist(clusterRoleRules)

  const { population, violations } = examinePopulation<string, ClusterResourceNameFinding>({
    members: [...loaded.keys()],
    unit: "synth.ts sources",
    labelOf: (synthPath) => synthPath,
    siteOf: (synthPath) => synthPath,
    examine: (synthPath) => {
      const outputs = loaded.get(synthPath)
      if (outputs === undefined || outputs instanceof Error) {
        throw outputs ?? new Error(`${synthPath}: no load result recorded`)
      }
      const found: ClusterResourceNameFinding[] = []
      for (const output of outputs) {
        for (const one of extractClusterResourceNames(synthPath, output.yaml)) {
          if (whitelist.has(one.name)) continue
          if (ADMIN_APPLIED_CLUSTER_RESOURCE_NAMES.has(one.name)) continue
          found.push({
            synthSource: synthPath,
            file: synthPath,
            message: `${one.kind} "${one.name}"`,
          })
        }
      }
      return found
    },
    membership: {
      kind: "enumerated",
      because:
        "the members are every `synth.ts` the discovery globs matched under this tree, and a " +
        "synth that would not import or whose outputs do not parse is held as its error and " +
        "raised when it is examined rather than dropped from the list",
    },
  })

  exitOnResult<ClusterResourceNameFinding>({
    violations,
    options: {
      population,
      prefix: PREFIX,
      header:
        "a synth emits cluster-scoped RBAC whose name the pipeline-engine " +
        "clusterroles/clusterrolebindings patch rule does not list, so the next server-side " +
        "apply would be forbidden at the cluster scope",
      footer: (count) =>
        `${PREFIX} ${count} cluster-scoped RBAC coverage gap(s). Fix: add each name to the ` +
        "clusterroles/clusterrolebindings patch-rule `resourceNames` whitelist in " +
        "`tools/lib/cluster-rbac/rules.ts`, or to `ADMIN_APPLIED_CLUSTER_RESOURCE_NAMES` in this " +
        "command if the resource is applied outside pipeline-engine.",
      successMessage:
        `OK — every cluster-scoped RBAC name emitted by ${loaded.size} synth(s) under ` +
        `${roots.codeRoot} is covered by the patch-rule whitelist.`,
      groupBy: (gap) => gap.synthSource,
    },
  })
}
