import { expect, test } from "bun:test"
import { worldLegerdemain } from "akasha/temper/catalog/skill/line/pages/world-legerdemain.temper-skill-line.ts"
import { temperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.ts"
import type {
  HeldRule,
  RulePage,
} from "akasha/temper/items/rules/core/modules/inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import {
  heldFromRow,
  heldFromRows,
  ruleFromPage,
  rulesFromPages,
} from "akasha/temper/items/rules/core/modules/inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import { canLevelMorphs } from "akasha/temper/player/progress/temper-character-condition-field/pages/can-level-morphs.temper-character-condition-field.ts"
import { requiredCurseState } from "akasha/temper/player/progress/temper-character-condition-field/pages/required-curse-state.temper-character-condition-field.ts"
import { requiredSkillLines } from "akasha/temper/player/progress/temper-character-condition-field/pages/required-skill-lines.temper-character-condition-field.ts"
import { temperCharacterConditionField } from "akasha/temper/player/progress/temper-character-condition-field/temper-character-condition-field.page-type.ts"
import { atLeast } from "akasha/temper/player/progress/temper-comparison-op/pages/at-least.temper-comparison-op.ts"
import { temperComparisonOp } from "akasha/temper/player/progress/temper-comparison-op/temper-comparison-op.page-type.ts"
import { sell } from "akasha/temper/player/progress/temper-item-action/pages/sell.temper-item-action.ts"
import { stock } from "akasha/temper/player/progress/temper-item-action/pages/stock.temper-item-action.ts"
import { temperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.ts"

const PAGE: RulePage = {
  slug: "rule-gold-stock",
  categoryId: "currency-gold",
  displayOrder: 5,
  action: `${temperItemAction.slug}/${stock.slug}` as const,
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
}

const SKILL_LINES_TEST = `${temperCharacterConditionField.slug}/${requiredSkillLines.slug}`

const CURSE_STATE_TEST = `${temperCharacterConditionField.slug}/${requiredCurseState.slug}`

const MORPHS_TEST = `${temperCharacterConditionField.slug}/${canLevelMorphs.slug}`

test("a rule's id is its slug without the leading `rule-`", () => {
  expect(ruleFromPage({ page: PAGE }).id).toBe("gold-stock")
})

test("a slug carrying no such opening is the id unchanged", () => {
  expect(ruleFromPage({ page: { ...PAGE, slug: "90d1aa3b" } }).id).toBe("90d1aa3b")
})

test("an instant is read back as the milliseconds the game is told", () => {
  expect(ruleFromPage({ page: PAGE }).updatedAt).toBe(1777910671132)
})

test("an updated-at that is no instant refuses rather than reading as nothing", () => {
  expect(() => ruleFromPage({ page: { ...PAGE, updatedAt: "the fourth of May" } })).toThrow()
})

test("a property the page leaves unsaid is left off the rule", () => {
  const held = ruleFromPage({ page: PAGE })
  expect("title" in held).toBe(false)
  expect("notes" in held).toBe(false)
  expect("goal" in held).toBe(false)
  expect("locked" in held).toBe(false)
  expect("conditions" in held).toBe(false)
  expect("destinationChain" in held).toBe(false)
})

test("a description is what the game reads as notes", () => {
  expect(ruleFromPage({ page: { ...PAGE, description: "Keeps gold" } }).notes).toBe("Keeps gold")
})

test("a condition field is read under the key the engine reads", () => {
  const held = ruleFromPage({
    page: PAGE,
    conditions: [{ conditionField: "max-quality", conditionValue: "1" }],
  })
  expect(held.conditions).toEqual({ maxQuality: 1 })
})

test("a comparison naming a comparison op page is read as the operator the engine reads", () => {
  const held = ruleFromPage({
    page: PAGE,
    conditions: [
      { conditionField: "max-quality", conditionValue: "3" },
      {
        conditionField: "quality-op",
        conditionValue: `${temperComparisonOp.slug}/${atLeast.slug}`,
      },
    ],
  })
  expect(held.conditions).toEqual({ maxQuality: 3, qualityOp: ">=" })
})

test("a comparison naming no comparison op page stops the read", () => {
  expect(() =>
    ruleFromPage({
      page: PAGE,
      conditions: [{ conditionField: "quality-op", conditionValue: "~" }],
    })
  ).toThrow("a comparison holds `~`, which names no temper-comparison-op page")
})

test("a condition value that is JSON is read as JSON", () => {
  const held = ruleFromPage({
    page: PAGE,
    conditions: [{ conditionField: "traits", conditionValue: '["intricate","ornate"]' }],
  })
  expect(held.conditions).toEqual({ traits: ["intricate", "ornate"] })
})

test("a condition value that is no JSON is read as the text it is", () => {
  const held = ruleFromPage({
    page: PAGE,
    conditions: [{ conditionField: "stolen", conditionValue: "not-stolen" }],
  })
  expect(held.conditions).toEqual({ stolen: "not-stolen" })
})

test("a condition value the field's shape refuses names the rule, the field and what it held", () => {
  expect(() =>
    ruleFromPage({
      page: PAGE,
      conditions: [{ conditionField: "potion-effects", conditionValue: "Restore Health" }],
    })
  ).toThrow(
    'inventoryRuleFromPages: rule `rule-gold-stock` is unread — `potionEffects` holds "Restore Health", and the shape that field declares refuses it: Invalid input: expected array, received string'
  )
})

test("one effect id written as a list of one is read", () => {
  const held = ruleFromPage({
    page: PAGE,
    conditions: [{ conditionField: "potion-effects", conditionValue: '["Restore Health"]' }],
  })
  expect(held.conditions).toEqual({ potionEffects: ["Restore Health"] })
})

test("a chain is read leg by leg, and a leg says only what it carries", () => {
  const held = ruleFromPage({
    page: PAGE,
    chain: [{ destination: "character:by-priority", targetQuantity: 200 }, { destination: "bank" }],
  })
  expect(held.destinationChain).toEqual([
    { destination: "character:by-priority", targetQuantity: 200 },
    { destination: "bank" },
  ])
})

test("a leg's character test is read back as the shape the matcher reads", () => {
  const held = ruleFromPage({
    page: PAGE,
    chain: [
      {
        destination: "bank",
        characterConditions: [
          {
            characterConditionField: SKILL_LINES_TEST,
            conditionValue: "any-not-maxed",
            skillLines: [`${temperSkillLine.slug}/${worldLegerdemain.slug}`],
          },
          { characterConditionField: CURSE_STATE_TEST, conditionValue: "vampire" },
        ],
      },
    ],
  })
  expect(held.destinationChain?.[0]?.charEligibility).toEqual({
    requiredSkillLines: { mode: "any-not-maxed", skillLineIds: ["world-legerdemain"] },
    requiredCurseState: { state: "vampire" },
  })
})

test("a character test naming no field a character has stops the read", () => {
  expect(() =>
    ruleFromPage({
      page: PAGE,
      chain: [
        {
          destination: "bank",
          characterConditions: [{ characterConditionField: "max-quality", conditionValue: "1" }],
        },
      ],
    })
  ).toThrow("which tests nothing a character has")
})

test("a character test holding a value its field refuses stops the read", () => {
  expect(() =>
    ruleFromPage({
      page: PAGE,
      chain: [
        {
          destination: "bank",
          characterConditions: [
            { characterConditionField: "required-curse-state", conditionValue: "lich" },
          ],
        },
      ],
    })
  ).toThrow("which no character test is")
})

test("a test other than a skill line test naming skill lines stops the read", () => {
  expect(() =>
    ruleFromPage({
      page: PAGE,
      chain: [
        {
          destination: "bank",
          characterConditions: [
            {
              characterConditionField: "can-level-morphs",
              conditionValue: "can-level",
              skillLines: ["world-legerdemain"],
            },
          ],
        },
      ],
    })
  ).toThrow("which only a skill line test names")
})

test("a leg's character tests beside the page come back as rows of their own", () => {
  const tested = [{ characterConditionField: MORPHS_TEST, conditionValue: "can-level" }]
  const held = heldFromRow({
    ...A_ROW,
    destinationChain: [{ destination: "bank", characterConditions: tested }],
  })
  expect(held.chain).toEqual([{ destination: "bank", characterConditions: tested }])
})

test("a character test short of its value stops the read", () => {
  expect(() =>
    heldFromRow({
      ...A_ROW,
      destinationChain: [
        { destination: "bank", characterConditions: [{ characterConditionField: "x" }] },
      ],
    })
  ).toThrow("states no `conditionValue`")
})

test("rules come back in display order however they arrived", () => {
  const held: readonly HeldRule[] = [
    { page: { ...PAGE, slug: "rule-c", displayOrder: 2 } },
    { page: { ...PAGE, slug: "rule-a", displayOrder: 0 } },
    { page: { ...PAGE, slug: "rule-b", displayOrder: 1 } },
  ]
  expect(rulesFromPages(held).map((one) => one.id)).toEqual(["a", "b", "c"])
})

test("reading rules leaves what the caller handed over unchanged", () => {
  const held: readonly HeldRule[] = [
    { page: { ...PAGE, slug: "rule-b", displayOrder: 1 } },
    { page: { ...PAGE, slug: "rule-a", displayOrder: 0 } },
  ]
  rulesFromPages(held)
  expect(held.map((one) => one.page.slug)).toEqual(["rule-b", "rule-a"])
})

const A_ROW = {
  slug: "rule-one",
  categoryId: "scripts",
  displayOrder: 3,
  action: `${temperItemAction.slug}/${sell.slug}` as const,
  active: true,
  updatedAt: "1970-01-01T00:00:00.000Z",
}

test("a row carrying every key a rule needs becomes a held rule", () => {
  const held = heldFromRow({ ...A_ROW, title: "a title" })
  expect(held.page.slug).toBe("rule-one")
  expect(held.page.displayOrder).toBe(3)
  expect(held.page.title).toBe("a title")
})

test("a row short of a key every rule carries stops the read naming the rule and the key", () => {
  expect(() => heldFromRow({ ...A_ROW, categoryId: undefined })).toThrow(
    "rule `rule-one` is unread — the page states no `categoryId`"
  )
  expect(() => heldFromRow({ ...A_ROW, action: undefined })).toThrow("states no `action`")
  expect(() => heldFromRow({ ...A_ROW, updatedAt: undefined })).toThrow("states no `updatedAt`")
  expect(() => heldFromRow({ ...A_ROW, displayOrder: "3" })).toThrow("states no `displayOrder`")
})

test("a row saying nothing about being switched on is read as switched on", () => {
  expect(heldFromRow(A_ROW).page.active).toBe(true)
  expect(heldFromRow({ ...A_ROW, active: false }).page.active).toBe(false)
})

test("the rows beside a page come back under their own keys", () => {
  const held = heldFromRow({
    ...A_ROW,
    conditions: [{ id: "an-id", conditionField: "known", conditionValue: "known" }],
    destinationChain: [{ destination: "bank", targetQuantity: 2 }],
  })
  expect(held.conditions).toEqual([{ conditionField: "known", conditionValue: "known" }])
  expect(held.chain).toEqual([{ destination: "bank", targetQuantity: 2 }])
})

test("a rule keeps none of its action where a condition beside it is short of a field", () => {
  expect(() => heldFromRow({ ...A_ROW, conditions: [{ conditionField: "known" }] })).toThrow(
    "states no `conditionValue`"
  )
  expect(() => heldFromRow({ ...A_ROW, conditions: [{ conditionValue: "known" }] })).toThrow(
    "states no `conditionField`"
  )
})

test("dropping a condition would widen the rule, and the refusal says so", () => {
  expect(() => heldFromRow({ ...A_ROW, conditions: [{ conditionField: "known" }] })).toThrow(
    "the rule would match more than it says"
  )
})

test("a tier of the chain short of a destination stops the read", () => {
  expect(() =>
    heldFromRow({ ...A_ROW, destinationChain: [{ destination: "bank" }, { targetQuantity: 2 }] })
  ).toThrow("states no `destination`")
})

test("rows beside the page that are no rows at all stop the read", () => {
  expect(() => heldFromRow({ ...A_ROW, conditions: "known" })).toThrow(
    "`conditions` is a string rather than the rows beside the page"
  )
  expect(() => heldFromRow({ ...A_ROW, conditions: ["known"] })).toThrow(
    "a row under `conditions` is a string rather than a row"
  )
})

test("a row that is no rule stops the read of the many rather than going missing from them", () => {
  expect(() => heldFromRows([A_ROW, { slug: "rule-two" }])).toThrow(
    "rule `rule-two` is unread — the page states no `categoryId`"
  )
})

test("a row naming no rule at all stops the read", () => {
  expect(() => heldFromRows([{ categoryId: "scripts" }])).toThrow("a rule row states no `slug`")
})

test("every rule a read carries comes back, so a count is the count", () => {
  const rows = [A_ROW, { ...A_ROW, slug: "rule-two" }, { ...A_ROW, slug: "rule-three" }]
  expect(heldFromRows(rows).map((one) => one.page.slug)).toEqual([
    "rule-one",
    "rule-two",
    "rule-three",
  ])
})
