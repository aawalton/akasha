export const summary =
  "Rule that every manifest the pipeline applies has an RBAC rule granting create and patch on its kinds"

import { dirname } from "node:path"
import type { CommandHelp } from "../ops/surface.ts"
import { errorMessage } from "../lib/check-workflow/error-message.ts"
import { examinePopulation } from "../lib/check-workflow/population.ts"
import {
  exitOnResult,
  exitOnToolError,
  type Violation,
} from "../lib/check-workflow/violation-reporter.ts"
import { type OpaqueApply, type ResolvedApply, resolveApplies } from "../lib/cluster-rbac/applies.ts"
import { engineSurface } from "../lib/cluster-rbac/engine-steps.ts"
import { APPLY_VERBS, KIND_SCOPE_REGISTRY, NAMESPACED_KIND_TO_RESOURCE } from "../lib/cluster-rbac/kinds.ts"
import { tupleOf, tupleSet } from "../lib/cluster-rbac/permissions.ts"
import { allProfiles } from "../lib/cluster-rbac/profiles.ts"
import { clusterRoleRules } from "../lib/cluster-rbac/rules.ts"
import { generatedPathOf, loadEverySynth } from "../lib/cluster-rbac/synth.ts"
import { parseManifestDocuments } from "../lib/cluster-rbac/yaml-read.ts"
import { parseArgs } from "../lib/parse-args.ts"
import { SURFACE_ROOT_FLAGS, surfaceRoots } from "../lib/workflow-surface/roots.ts"

export const help: CommandHelp = {
  flags: SURFACE_ROOT_FLAGS,
  exits: [
    { code: 0, meaning: "every applied manifest's resource types are covered" },
    { code: 1, meaning: "one or more manifest coverage faults" },
    { code: 2, meaning: "the workflows or the synths did not load, so nothing was ruled on" },
  ],
  examples: [
    "ops check-rbac-manifests",
    "ops check-rbac-manifests --code-root ~/repos/akasha",
  ],
}

const PREFIX = "[rbac-manifests]"

const SEALED_SUFFIX = ".sops.yaml"

interface ManifestViolation extends Violation {
  readonly fault: string
}

const FAULT_REPAIRS: Readonly<Record<string, string>> = {
  "applies a manifest no synth.ts emits":
    "point the apply step at a path a `synth.ts` writes, or teach `tools/lib/cluster-rbac/applies.ts` the shape that produces it.",
  "holds a kind KIND_SCOPE_REGISTRY does not classify":
    "add the kind to `KIND_SCOPE_REGISTRY` in `tools/lib/cluster-rbac/kinds.ts` with its scope. Scope is not readable from the manifest text, so an unclassified kind cannot be judged.",
  "holds a namespaced kind with no RBAC coordinates":
    "add the kind to `NAMESPACED_KIND_TO_RESOURCE` with the (apiGroup, resource) a namespace Role must grant.",
  "holds a namespaced document nothing places":
    "pass `-n <namespace>` on the apply step, or set `metadata.namespace` in the synth — otherwise it lands in whatever namespace the account's context happens to hold.",
  "applies a resource type RBAC does not cover":
    "update the per-package profile under `tools/lib/rbac`, or `clusterRoleRules` in `tools/lib/cluster-rbac/rules.ts`, to grant it.",
}

export default async function checkRbacManifests(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const roots = surfaceRoots({
    instructionsRoot: parsed.string("--akasha-root"),
    codeRoot: parsed.string("--code-root"),
  })

  let applies: readonly ResolvedApply[] = []
  let opaque: readonly OpaqueApply[] = []
  let emitted: ReadonlyMap<string, string> = new Map()
  let nsPerms: ReadonlyMap<string, ReadonlySet<string>> = new Map()
  let workflowCount = 0
  try {
    const surface = await engineSurface(roots)
    workflowCount = surface.workflowCount
    const resolvedApplies: ResolvedApply[] = []
    const resolvedOpaque: OpaqueApply[] = []
    for (const one of surface.steps) {
      if (!one.commandText.includes("kubectl apply")) continue
      const resolved = resolveApplies(one.commandText, one.site)
      resolvedApplies.push(...resolved.applies)
      resolvedOpaque.push(...resolved.opaque)
    }
    applies = resolvedApplies
    opaque = resolvedOpaque

    const held = new Map<string, string>()
    for (const [synthPath, outputs] of await loadEverySynth(roots.codeRoot)) {
      if (outputs instanceof Error) throw outputs
      for (const output of outputs) {
        held.set(generatedPathOf(roots.codeRoot, dirname(synthPath), output.name), output.yaml)
      }
    }
    emitted = held

    const perNamespace = new Map<string, Set<string>>()
    for (const profile of await allProfiles(roots.instructionsRoot)) {
      const perms = perNamespace.get(profile.namespace) ?? new Set<string>()
      for (const tuple of tupleSet(profile.rules, { skipNamed: false })) perms.add(tuple)
      perNamespace.set(profile.namespace, perms)
    }
    nsPerms = perNamespace
  } catch (err) {
    exitOnToolError({ error: new Error(errorMessage(err)), prefix: PREFIX })
  }

  const clusterPerms = tupleSet(clusterRoleRules, { skipNamed: false })

  const readable = applies.filter((apply) => !apply.manifestPath.endsWith(SEALED_SUFFIX))

  if (readable.length === 0) {
    exitOnToolError({
      error: new Error(
        `composing ${roots.instructionsRoot} over ${roots.codeRoot} resolved no apply to a repo ` +
          `manifest at all (${workflowCount} workflow(s), ${applies.length} apply(s), ` +
          `${opaque.length} of them unreachable). "Every applied manifest is covered" is ` +
          "vacuously true over an empty set, so this reports nothing rather than clean."
      ),
      prefix: PREFIX,
    })
  }

  const { population, violations } = examinePopulation<ResolvedApply, ManifestViolation>({
    members: readable,
    unit: "applied manifests",
    labelOf: (apply) => `${apply.manifestPath} [${apply.site}]`,
    siteOf: (apply) => apply.manifestPath,
    membership: {
      kind: "enumerated",
      because:
        "the members are every apply that `resolveApplies` read out of a `pipeline-engine` " +
        "step's commands and resolved to a repo manifest; an apply whose target it cannot read " +
        "is held as an unreachable one and named in the report rather than dropped, and a " +
        "workflow page that will not load throws out of discovery above",
    },
    examine: (apply) => {
      const found: ManifestViolation[] = []
      const fault = (name: string, line: string): undefined => {
        found.push({ fault: name, message: `${line} — Fix: ${FAULT_REPAIRS[name]}` })
      }

      const yaml = emitted.get(apply.manifestPath)
      if (yaml === undefined) {
        fault("applies a manifest no synth.ts emits", `${apply.manifestPath} [${apply.site}]`)
        return found
      }

      for (const doc of parseManifestDocuments(yaml)) {
        const scope = KIND_SCOPE_REGISTRY[doc.kind]
        if (scope === undefined) {
          fault(
            "holds a kind KIND_SCOPE_REGISTRY does not classify",
            `${apply.manifestPath} → ${doc.kind} [${apply.site}]`
          )
          continue
        }
        if (scope.scope === "cluster") continue

        const mapping = NAMESPACED_KIND_TO_RESOURCE[doc.kind]
        if (mapping === undefined) {
          fault(
            "holds a namespaced kind with no RBAC coordinates",
            `${apply.manifestPath} → ${doc.kind} [${apply.site}]`
          )
          continue
        }

        const namespace = doc.namespace ?? apply.namespace
        if (namespace === null || namespace === undefined) {
          fault(
            "holds a namespaced document nothing places",
            `${apply.manifestPath} → ${doc.kind} [${apply.site}]`
          )
          continue
        }

        for (const verb of APPLY_VERBS) {
          const tuple = tupleOf(mapping.apiGroup, mapping.resource, verb)
          if (nsPerms.get(namespace)?.has(tuple) === true) continue
          if (clusterPerms.has(tuple)) continue
          fault(
            "applies a resource type RBAC does not cover",
            `${apply.manifestPath} (${doc.kind}) → ns=${namespace} ` +
              `apiGroup="${mapping.apiGroup}" resource="${mapping.resource}" verb="${verb}"`
          )
        }
      }

      return found
    },
  })

  exitOnResult<ManifestViolation>({
    violations,
    options: {
      population,
      prefix: PREFIX,
      header: "the manifests the pipeline applies are not fully covered",
      footer: (count) =>
        `${PREFIX} ${count} manifest coverage fault(s), over the ${readable.length} apply(s) ` +
        `naming a repo manifest. ${opaque.length} further apply(s) build their content at run ` +
        "time and no reader of the repository can reach them.",
      successMessage:
        `OK — every resource type in ${readable.length} applied manifest(s), across ` +
        `${workflowCount} workflow(s), is covered by RBAC. ${opaque.length} further apply(s) ` +
        "build their content at run time and were not read.",
      groupBy: (violation) => violation.fault,
    },
  })
}
