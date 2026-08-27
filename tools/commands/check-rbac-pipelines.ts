export const summary =
  "Rule that every kubectl command a pipeline-engine step runs is covered by a permission the engine holds"

import type { CommandHelp } from "../ops/surface.ts"
import { errorMessage } from "../lib/check-workflow/error-message.ts"
import { examinePopulation } from "../lib/check-workflow/population.ts"
import {
  exitOnResult,
  exitOnToolError,
  type Violation,
} from "../lib/check-workflow/violation-reporter.ts"
import { type EngineStep, type EngineSurface, engineSurface } from "../lib/cluster-rbac/engine-steps.ts"
import { parseKubectlCommands } from "../lib/cluster-rbac/kubectl.ts"
import {
  buildPermissions,
  isCovered,
  isResourceRule,
  type PermissionSet,
} from "../lib/cluster-rbac/permissions.ts"
import { allProfiles } from "../lib/cluster-rbac/profiles.ts"
import { clusterRoleRules } from "../lib/cluster-rbac/rules.ts"
import { parseArgs } from "../lib/parse-args.ts"
import type { Rule } from "../lib/workflow-dsl/rbac-types.ts"
import { SURFACE_ROOT_FLAGS, surfaceRoots } from "../lib/workflow-surface/roots.ts"

export const help: CommandHelp = {
  flags: SURFACE_ROOT_FLAGS,
  exits: [
    { code: 0, meaning: "every kubectl command is covered and modelled" },
    { code: 1, meaning: "a command is uncovered, or names a kind the parser cannot model" },
    { code: 2, meaning: "the workflows did not load, or none ran under the engine account" },
  ],
  examples: [
    "ops check-rbac-pipelines",
    "ops check-rbac-pipelines --code-root ~/repos/code",
  ],
}

const PREFIX = "[rbac-pipelines]"

const UNKNOWN_NAMESPACE = "(unknown — shell variable namespace)"

const DYNAMIC_NAMESPACE_SCRIPT = "deploy-functions.sh"

interface PipelineViolation extends Violation {
  readonly fault: "uncovered grant" | "unmodelled resource"
}

export default async function checkRbacPipelines(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const roots = surfaceRoots({
    instructionsRoot: parsed.string("--instructions-root"),
    codeRoot: parsed.string("--code-root"),
  })

  let surface: EngineSurface
  try {
    surface = await engineSurface(roots)
  } catch (err) {
    exitOnToolError({ error: new Error(errorMessage(err)), prefix: PREFIX })
  }

  if (surface.steps.length === 0) {
    exitOnToolError({
      error: new Error(
        `composing ${roots.instructionsRoot} over ${roots.codeRoot} found no step running as ` +
          `pipeline-engine at all (${surface.workflowCount} workflow(s), ${surface.stepCount} ` +
          'step(s)). "Every kubectl command is covered" is vacuously true over an empty set, so ' +
          "this reports nothing rather than clean."
      ),
      prefix: PREFIX,
    })
  }

  const nsRules = new Map<string, Rule[]>()
  for (const profile of await allProfiles(roots.instructionsRoot)) {
    const held = nsRules.get(profile.namespace) ?? []
    held.push(...profile.rules)
    nsRules.set(profile.namespace, held)
  }
  const nsPerms = new Map<string, PermissionSet>()
  for (const [namespace, rules] of nsRules) nsPerms.set(namespace, buildPermissions(rules))

  const clusterPerms = buildPermissions(clusterRoleRules.filter(isResourceRule))

  const { population, violations } = examinePopulation<EngineStep, PipelineViolation>({
    members: surface.steps,
    unit: "pipeline-engine steps",
    labelOf: (one) => one.site,
    siteOf: (one) => `${roots.instructionsRoot}/${one.workflow.sourcePath}`,
    membership: {
      kind: "enumerated",
      because:
        "the members are every `pipeline-engine` step of every workflow `discoverWorkflows` " +
        "loaded, and a page that will not import or exports no workflow throws out of discovery " +
        "rather than being skipped, so this command reports a tool error instead of a short list",
    },
    examine: (one) => {
      if (one.commandText.includes(DYNAMIC_NAMESPACE_SCRIPT)) return []
      const gaps: PipelineViolation[] = []
      const unmodelled: PipelineViolation[] = []

      for (const parsedCommand of parseKubectlCommands(one.commandText)) {
        for (const entry of parsedCommand.unmodelled) {
          unmodelled.push({
            fault: "unmodelled resource",
            message:
              `${one.site}: kubectl ${entry.subcommand} "${entry.resourceToken}" — Fix: add the ` +
              "kind to `KUBECTL_RESOURCE_MAP` in `tools/lib/cluster-rbac/kubectl.ts` with the " +
              "(apiGroup, resource) the API server uses for it, so the command is judged rather " +
              "than skipped.",
          })
        }

        for (const req of parsedCommand.reqs) {
          const namespace = parsedCommand.namespace
          let covered: boolean
          if (namespace !== null) {
            const perms = nsPerms.get(namespace)
            covered = (perms !== undefined && isCovered(perms, req)) || isCovered(clusterPerms, req)
          } else {
            covered = isCovered(clusterPerms, req)
            if (!covered) {
              for (const perms of nsPerms.values()) {
                if (!isCovered(perms, req)) continue
                covered = true
                break
              }
            }
          }
          if (covered) continue
          const named = req.resourceName === undefined ? "" : ` name="${req.resourceName}"`
          gaps.push({
            fault: "uncovered grant",
            message:
              `${one.site} (ns=${namespace ?? UNKNOWN_NAMESPACE}) apiGroup="${req.apiGroup}" ` +
              `resource="${req.resource}" verb="${req.verb}"${named} — Fix: update the per-package ` +
              "profile under `tools/lib/rbac`, or `clusterRoleRules` in " +
              "`tools/lib/cluster-rbac/rules.ts`. A gap naming an object means the only matching " +
              "grant is `resourceNames`-scoped and does not list that object, so widen the " +
              "`resourceNames` list or grant the tuple unscoped.",
          })
        }
      }

      return [...gaps, ...unmodelled]
    },
  })

  const unjudged = surface.steps.filter((one) =>
    one.commandText.includes(DYNAMIC_NAMESPACE_SCRIPT)
  ).length

  exitOnResult<PipelineViolation>({
    violations,
    options: {
      population,
      prefix: PREFIX,
      header:
        "pipeline steps run kubectl commands the RBAC does not cover, or against kinds this " +
        "check cannot model — an unmodelled one was judged by nobody",
      footer: (count) =>
        `${PREFIX} ${count} pipeline RBAC finding(s), over ${surface.steps.length - unjudged} of ` +
        `${surface.steps.length} pipeline-engine step(s); the other ${unjudged} reach ` +
        `${DYNAMIC_NAMESPACE_SCRIPT} and name their namespaces at run time.`,
      successMessage:
        `OK — every kubectl command run by ${surface.steps.length} pipeline-engine step(s), of ` +
        `${surface.stepCount} step(s) across ${surface.workflowCount} workflow(s), is covered by ` +
        `the RBAC and modelled by the parser. ${unjudged} of those step(s) reach ` +
        `${DYNAMIC_NAMESPACE_SCRIPT} and were counted rather than judged.`,
      groupBy: (violation) => violation.fault,
    },
  })
}
