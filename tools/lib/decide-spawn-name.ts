
export type SeatNameComposition =
  | { readonly kind: "composed"; readonly name: string }
  | { readonly kind: "none" }
  | { readonly kind: "failed"; readonly reason: string }

export const SPAWN_NAME_DECISIONS = ["composed", "reject"] as const

export type SpawnNameDecisionKind = (typeof SPAWN_NAME_DECISIONS)[number]

export type SpawnNameDecision =
  | { readonly kind: "composed"; readonly name: string }
  | { readonly kind: "reject"; readonly reason: string }

export interface SpawnNameInput {
  readonly composed: SeatNameComposition
}

export interface SpelledName {
  readonly spelled: string | null
  readonly role: string | null
  readonly roleIsDefault: boolean
}

export function compositionOf(input: SpelledName): SeatNameComposition {
  if (input.spelled === null) return { kind: "none" }
  if (input.roleIsDefault && input.spelled === input.role) return { kind: "none" }
  return { kind: "composed", name: input.spelled }
}

export function decideSpawnName(input: SpawnNameInput): SpawnNameDecision {
  const composed = input.composed

  if (composed.kind === "failed") {
    return {
      kind: "reject",
      reason:
        `${composed.reason}. A seat whose attributes name nothing and a composition that ` +
        "FAILED are different facts, and neither is a licence to mint under a name nothing has " +
        "agreed to — so this start is refused. Run it again; if the reason above keeps coming " +
        "back, that is the fault to fix.",
    }
  }

  if (composed.kind === "composed") return { kind: "composed", name: composed.name }

  return {
    kind: "reject",
    reason:
      "nothing to name this seat: nothing was stated for a name to be spelled from. A seat's " +
      "name is spelled from --persona, --domain, --role, --flex and " +
      "and the role a seat takes when none is stated spells nothing on its own. State " +
      "--domain for a seat working on a domain, or --persona with --principal for a seat one " +
      "person addresses.",
  }
}
