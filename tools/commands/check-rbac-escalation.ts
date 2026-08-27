export const summary =
  "Rule that the deploy ClusterRole holds every apiGroup, resource and verb any namespace Role grants"

import type { CommandHelp } from "../ops/surface.ts"
import { errorMessage } from "../lib/check-workflow/error-message.ts"
import { examinePopulation } from "../lib/check-workflow/population.ts"
import {
  exitOnResult,
  exitOnToolError,
  type Violation,
} from "../lib/check-workflow/violation-reporter.ts"
import { tupleOf, tupleSet } from "../lib/cluster-rbac/permissions.ts"
import { profileSources, type RbacProfileSource } from "../lib/cluster-rbac/profiles.ts"
import { clusterRoleRules } from "../lib/cluster-rbac/rules.ts"
import { parseArgs } from "../lib/parse-args.ts"
import { AKASHA_ROOT_FLAG, surfaceRoots } from "../lib/workflow-surface/roots.ts"

export const help: CommandHelp = {
  flags: [AKASHA_ROOT_FLAG],
  exits: [
    { code: 0, meaning: "every namespace Role permission is covered by the ClusterRole" },
    { code: 1, meaning: "one or more granted permissions are uncovered" },
    { code: 2, meaning: "no profile could be read, so nothing was ruled on" },
  ],
  examples: ["ops check-rbac-escalation"],
}

const PREFIX = "[rbac-escalation]"

interface EscalationGap extends Violation {
  readonly namespace: string
}

export default async function checkRbacEscalation(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const roots = surfaceRoots({ instructionsRoot: parsed.string("--akasha-root") })

  let sources: readonly RbacProfileSource[]
  try {
    sources = await profileSources(roots.instructionsRoot)
  } catch (err) {
    exitOnToolError({ error: new Error(errorMessage(err)), prefix: PREFIX })
  }

  const covered = tupleSet(clusterRoleRules, { skipNamed: true })

  const { population, violations } = examinePopulation<RbacProfileSource, EscalationGap>({
    members: sources,
    unit: "RBAC profile sources",
    labelOf: (source) => source.path,
    siteOf: (source) => source.path,
    examine: (source) => {
      const gaps: EscalationGap[] = []
      for (const profile of source.profiles) {
        for (const rule of profile.rules) {
          for (const apiGroup of rule.apiGroups) {
            for (const resource of rule.resources) {
              for (const verb of rule.verbs) {
                if (covered.has(tupleOf(apiGroup, resource, verb))) continue
                gaps.push({
                  namespace: profile.namespace,
                  file: source.path,
                  message: `${profile.namespace}: { apiGroup: "${apiGroup}", resource: "${resource}", verb: "${verb}" }`,
                })
              }
            }
          }
        }
      }
      return gaps
    },
    membership: {
      kind: "enumerated",
      because:
        "the members are every RBAC profile source standing under `tools/lib/rbac` in the " +
        "instructions tree, and that listing raises rather than returning a short one — a " +
        "directory that will not open, a file exporting no profiles, and a file naming no " +
        "package each stop the run above",
    },
  })

  exitOnResult<EscalationGap>({
    violations,
    options: {
      population,
      prefix: PREFIX,
      header: "the ClusterRole is missing escalation coverage for these namespace Role permissions",
      footer: (count) =>
        `${PREFIX} ${count} uncovered permission(s). The ClusterRole must hold every permission ` +
        "the namespace Roles grant (K8s RBAC escalation prevention); an admin with cluster-admin " +
        "applies the ClusterRole update first.",
      successMessage:
        `OK — every permission granted by ${sources.length} RBAC profile source(s) under ` +
        `${roots.instructionsRoot} is covered by the ClusterRole.`,
      groupBy: (gap) => gap.namespace,
    },
  })
}
