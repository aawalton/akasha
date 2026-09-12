import { expect, test } from "bun:test"
import type { CompiledOrderedRule } from "akasha/temper/items-rules-core/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import { checkPotionEffects } from "akasha/temper/items-rules-eval/check-potion-effects/check-potion-effects.module.code.ts"
import type { EvalContext } from "akasha/temper/items-rules-eval/eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "akasha/temper/items-rules-eval/item-facts/item-facts.module.code.ts"

const CTX = {} as EvalContext

const AN_ITEM: ItemFacts = {
  itemId: 45332,
  itemName: "Essence of Health",
  itemLink: "|H1:item:45332:30:1:0:0|h|h",
  potionEffectMetricIds: ["Restore Health"],
}

const NOTHING_GRANTED: ItemFacts = {
  itemId: 45332,
  itemName: "Essence of Health",
  itemLink: "|H1:item:45332:30:1:0:0|h|h",
}

function ruleHolding(potionEffects: unknown): CompiledOrderedRule {
  const rule: CompiledOrderedRule = { categoryId: "consumables", action: "nothing" }
  return Object.assign(rule, { potionEffects })
}

test("a rule stating no potion effects is skipped", () => {
  expect(checkPotionEffects(ruleHolding(undefined), AN_ITEM, CTX).kind).toBe("skip")
})

test("one effect the item grants is matched under the default mode", () => {
  expect(checkPotionEffects(ruleHolding(["Restore Health"]), AN_ITEM, CTX).kind).toBe("pass")
})

test("bare text where a list belongs names the rule's fault rather than reading the text", () => {
  const said = checkPotionEffects(ruleHolding("Restore Health"), AN_ITEM, CTX)
  expect(said.kind).toBe("misshapen")
  if (said.kind !== "misshapen") return
  expect(said.conditionKind).toBe("potion-effects")
  expect(said.held).toBe('"Restore Health"')
  expect(said.why).toBe(
    "potion-effects is a list of ids, and this rule states one value that is no list"
  )
})

test("bare text is named even where the item grants nothing to compare against", () => {
  expect(checkPotionEffects(ruleHolding("Restore Health"), NOTHING_GRANTED, CTX).kind).toBe(
    "misshapen"
  )
})
