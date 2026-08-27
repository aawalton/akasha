import type { NodeId } from "../graph/types.ts"
import type { PopulationEntry, ScopedPopulation } from "../graph/queries/membership.ts"
import type { CheckConfig } from "./check-configs-types.ts"

export const ADDON_BUILD_CHECK_NAME = "addon-build"

type DispatchNodeTypeSeed = PopulationEntry | ScopedPopulation

export function addonBuildDependents(checks: readonly CheckConfig[]): readonly CheckConfig[] {
  return checks.filter((check) => (check.dependsOn ?? []).includes(ADDON_BUILD_CHECK_NAME))
}

export function withAddonBuildCoDep(checks: readonly CheckConfig[]): readonly CheckConfig[] {
  const build = checks.find((check) => check.name === ADDON_BUILD_CHECK_NAME)
  if (build === undefined) {
    throw new Error(
      `withAddonBuildCoDep: no \`${ADDON_BUILD_CHECK_NAME}\` entry among the ${checks.length} check(s) given — there is nothing to make a co-dependency of.`
    )
  }
  const dependents = addonBuildDependents(checks)
  if (dependents.length === 0) {
    throw new Error(
      `withAddonBuildCoDep: no check among the ${checks.length} given declares \`dependsOn: ["${ADDON_BUILD_CHECK_NAME}"]\` — the wrapper is watching an empty set and would certify a co-dependency it never established.`
    )
  }
  for (const dependent of dependents) {
    if (dependent.closurePolicy !== build.closurePolicy) {
      throw new Error(
        `withAddonBuildCoDep: \`${dependent.name}\` walks its seeds under closurePolicy \`${dependent.closurePolicy ?? "pkg-depends"}\` and \`${ADDON_BUILD_CHECK_NAME}\` under \`${build.closurePolicy ?? "pkg-depends"}\`. Unioning seeds across two policies does not give a superset closure, so the co-dependency would not hold. Put both on one policy.`
      )
    }
  }

  const nodes = new Set<NodeId>(build.dispatchNodes ?? [])
  const types = new Map<string, DispatchNodeTypeSeed>()
  for (const seed of build.dispatchNodeTypes ?? []) types.set(JSON.stringify(seed), seed)
  for (const dependent of dependents) {
    for (const node of dependent.dispatchNodes ?? []) nodes.add(node)
    for (const seed of dependent.dispatchNodeTypes ?? []) types.set(JSON.stringify(seed), seed)
  }

  const dispatchNodes = [...nodes].sort()
  const dispatchNodeTypes = [...types.values()]
  return checks.map((check) => {
    if (check !== build) return check
    return dispatchNodeTypes.length > 0
      ? { ...check, dispatchNodes, dispatchNodeTypes }
      : { ...check, dispatchNodes }
  })
}
