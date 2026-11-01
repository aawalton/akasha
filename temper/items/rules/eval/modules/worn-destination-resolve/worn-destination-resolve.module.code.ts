import { buildWantedEquipmentFacts } from "akasha/temper/items/rules/eval/modules/check-equip-target/check-equip-target.module.code.ts"
import type { EvalContext } from "akasha/temper/items/rules/eval/modules/eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "akasha/temper/items/rules/eval/modules/item-facts/item-facts.module.code.ts"

export type DestinationResolution =
  | {
      readonly kind: "resolved"
      readonly concrete: string
      readonly targetQuantity?: number
      readonly action?: "move-to"
    }
  | { readonly kind: "no-eligible-target"; readonly detail?: string }
  | { readonly kind: "indeterminate"; readonly detail?: string }

const UNWANTED_FACTS: DestinationResolution = {
  kind: "no-eligible-target",
  detail: "item is missing equipType / traitType / quality",
}

function backpackHolder(facts: ItemFacts, ctx: EvalContext): string | undefined {
  if (facts.location !== "backpack") return undefined
  const current = ctx.env.getCurrentCharacter()
  return current === "unknown" ? undefined : current
}

export function resolveCharacterWornByPriority(
  facts: ItemFacts,
  ctx: EvalContext
): DestinationResolution {
  const wanted = buildWantedEquipmentFacts(facts)
  if (wanted === undefined) return UNWANTED_FACTS
  const result = ctx.env.findCharacterForWantedEquipment(wanted, backpackHolder(facts, ctx))
  if (result === "unknown") {
    return { kind: "indeterminate", detail: "wanted-equipment match unknown" }
  }
  if (result === undefined) {
    return { kind: "no-eligible-target", detail: "no character wants this equipment" }
  }
  if (result.worn) return { kind: "resolved", concrete: `character-worn:${result.esoCharId}` }
  return { kind: "resolved", concrete: `character:${result.esoCharId}`, action: "move-to" }
}

export function resolveCompanionWornByPriority(
  facts: ItemFacts,
  ctx: EvalContext
): DestinationResolution {
  const wanted = buildWantedEquipmentFacts(facts)
  if (wanted === undefined) return UNWANTED_FACTS
  const result = ctx.env.findCompanionForWantedEquipment(wanted)
  if (result === "unknown") {
    return { kind: "indeterminate", detail: "companion wanted-equipment match unknown" }
  }
  if (result === undefined) {
    return { kind: "no-eligible-target", detail: "no companion wants this equipment" }
  }
  return { kind: "resolved", concrete: `companion-worn:${result}` }
}
