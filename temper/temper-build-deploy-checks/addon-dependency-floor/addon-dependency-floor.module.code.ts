import { assertNever } from "@akasha/utils-narrow/assert-never"
import { stripVersionSuffix } from "../addon-dependency-cycle/addon-dependency-cycle.module.code.ts"

export type DependencyDirective = "dependsOn" | "optionalDependsOn"

export interface AddonFloorInput {
  readonly addonName: string
  readonly addonVersion: number
  readonly dependsOn: readonly string[]
  readonly optionalDependsOn: readonly string[]
}

export type DependencyToken =
  | { readonly kind: "bare"; readonly provider: string }
  | { readonly kind: "floor"; readonly provider: string; readonly floor: number }
  | {
      readonly kind: "unevaluable"
      readonly provider: string
      readonly constraint: string
      readonly reason: "comparator" | "version"
    }

export type DependencyFloorEdgeStatus =
  | "satisfied"
  | "violated"
  | "unverifiable-external"
  | "unverifiable-constraint"
  | "no-floor"

export type DependencyFloorEdge =
  | {
      readonly status: "satisfied"
      readonly consumer: string
      readonly provider: string
      readonly directive: DependencyDirective
      readonly raw: string
      readonly floor: number
      readonly shippedVersion: number
    }
  | {
      readonly status: "violated"
      readonly consumer: string
      readonly provider: string
      readonly directive: DependencyDirective
      readonly raw: string
      readonly floor: number
      readonly shippedVersion: number
    }
  | {
      readonly status: "unverifiable-external"
      readonly consumer: string
      readonly provider: string
      readonly directive: DependencyDirective
      readonly raw: string
      readonly floor: number
    }
  | {
      readonly status: "unverifiable-constraint"
      readonly consumer: string
      readonly provider: string
      readonly directive: DependencyDirective
      readonly raw: string
      readonly constraint: string
      readonly reason: "comparator" | "version"
    }
  | {
      readonly status: "no-floor"
      readonly consumer: string
      readonly provider: string
      readonly directive: DependencyDirective
      readonly raw: string
    }

export interface DependencyFloorViolation {
  readonly message: string
  readonly consumer: string
  readonly provider: string
  readonly directive: DependencyDirective
  readonly floor: number
  readonly shippedVersion: number
}

export interface DependencyFloorAudit {
  readonly edges: readonly DependencyFloorEdge[]
  readonly violations: readonly DependencyFloorViolation[]
  readonly counts: Readonly<Record<DependencyFloorEdgeStatus, number>>
}

const COMPARATORS = [">=", "<=", ">", "<", "="] as const

export function parseDependencyToken(dep: string): DependencyToken | null {
  const trimmed = dep.trim()
  const provider = stripVersionSuffix(trimmed)
  if (provider.length === 0) return null

  const constraint = trimmed.slice(provider.length).trim()
  if (constraint.length === 0) return { kind: "bare", provider }

  const comparator = COMPARATORS.find((c) => constraint.startsWith(c))
  if (comparator === undefined || comparator !== ">=") {
    return { kind: "unevaluable", provider, constraint, reason: "comparator" }
  }

  const version = constraint.slice(comparator.length).trim()
  if (!/^\d+$/.test(version)) {
    return { kind: "unevaluable", provider, constraint, reason: "version" }
  }
  return { kind: "floor", provider, floor: Number(version) }
}

function classifyEdge(
  consumer: string,
  raw: string,
  directive: DependencyDirective,
  token: DependencyToken,
  shipped: ReadonlyMap<string, number>
): DependencyFloorEdge {
  const provider = token.provider
  switch (token.kind) {
    case "bare":
      return { status: "no-floor", consumer, provider, directive, raw }
    case "unevaluable":
      return {
        status: "unverifiable-constraint",
        consumer,
        provider,
        directive,
        raw,
        constraint: token.constraint,
        reason: token.reason,
      }
    case "floor": {
      const shippedVersion = shipped.get(provider)
      if (shippedVersion === undefined) {
        return {
          status: "unverifiable-external",
          consumer,
          provider,
          directive,
          raw,
          floor: token.floor,
        }
      }
      const status = token.floor > shippedVersion ? "violated" : "satisfied"
      return { status, consumer, provider, directive, raw, floor: token.floor, shippedVersion }
    }
    default:
      return assertNever(token)
  }
}

function violationConsequence(consumer: string, directive: DependencyDirective): string {
  return directive === "dependsOn"
    ? `ESO refuses to load ${consumer} when a \`## DependsOn\` minimum exceeds the provider's \`## AddOnVersion\``
    : "ESO's documented load refusal covers `## DependsOn` only, and what it does with an unmet `## OptionalDependsOn` floor is not established here, so no load-time consequence is claimed"
}

function violationMessage(edge: {
  consumer: string
  provider: string
  directive: DependencyDirective
  floor: number
  shippedVersion: number
}): string {
  return (
    `unsatisfiable addon dependency floor: ${edge.consumer} requires ` +
    `${edge.provider}>=${edge.floor} via \`${edge.directive}\` but ${edge.provider} ` +
    `ships AddOnVersion ${edge.shippedVersion} — ` +
    `${violationConsequence(edge.consumer, edge.directive)}; raise ` +
    `${edge.provider}'s addonVersion or lower the declared floor`
  )
}

export function auditDependencyFloors(inputs: readonly AddonFloorInput[]): DependencyFloorAudit {
  const shipped = new Map<string, number>()
  for (const input of inputs) shipped.set(input.addonName, input.addonVersion)

  const edges: DependencyFloorEdge[] = []
  const violations: DependencyFloorViolation[] = []
  const counts: Record<DependencyFloorEdgeStatus, number> = {
    satisfied: 0,
    violated: 0,
    "unverifiable-external": 0,
    "unverifiable-constraint": 0,
    "no-floor": 0,
  }

  for (const input of inputs) {
    const declared: readonly (readonly [DependencyDirective, readonly string[]])[] = [
      ["dependsOn", input.dependsOn],
      ["optionalDependsOn", input.optionalDependsOn],
    ]
    for (const [directive, deps] of declared) {
      for (const raw of deps) {
        const token = parseDependencyToken(raw)
        if (token === null) continue
        const edge = classifyEdge(input.addonName, raw, directive, token, shipped)
        edges.push(edge)
        counts[edge.status]++
        if (edge.status === "violated") {
          violations.push({
            message: violationMessage(edge),
            consumer: edge.consumer,
            provider: edge.provider,
            directive: edge.directive,
            floor: edge.floor,
            shippedVersion: edge.shippedVersion,
          })
        }
      }
    }
  }

  violations.sort((a, b) =>
    a.consumer === b.consumer
      ? a.provider.localeCompare(b.provider)
      : a.consumer.localeCompare(b.consumer)
  )
  return { edges, violations, counts }
}
