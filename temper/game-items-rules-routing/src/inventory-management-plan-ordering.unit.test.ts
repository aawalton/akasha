import { describe, expect, it } from "bun:test"
import { requireFirst } from "../../../shared/utils-narrow/src/require-first"
import { compileCategoryRuleToOrdered } from "@temper/game-items-rules-core/inventory-rule-compiler"
import type { RuleMatcherContext } from "@temper/game-items-rules-core/rule-matcher-context-types"
import { buildManagementPlan } from "./inventory-management-plan"
import {
  ESO_BAG_BACKPACK,
  makeAffected,
  makeInventory,
  makeItem,
  makeLocation,
  makeRule,
} from "./inventory-management-plan.test-utils"

function requireAt<T>(arr: readonly T[], i: number, label?: string): T {
  return requireFirst(arr.slice(i, i + 1), label ?? `index ${i}`)
}

const TOP = "1001"
const MID = "1002"
const BOT = "1003"

function makeRosterContext(): RuleMatcherContext {
  return {
    wantedEquipment: [],
    wantedCompanionEquipment: [],
    wantedConsumables: new Map(),
    consumableStock: new Map(),
    bankStock: new Map(),
    characterLevels: new Map(),
    knownRecipesByCharacter: new Map(),
    knownMotifsByCharacter: new Map(),
    knownMotifsByStyleIdByCharacter: new Map(),
    knownScriptsByCharacter: new Map(),
    researchedTraitsByCharacter: new Map(),
    characterPriority: [TOP, MID, BOT],
    craftingLevels: new Map(),
    openCooldowns: new Map(),
    transmuteCrystalCap: undefined,
    transmuteCrystalAmount: undefined,
  }
}

describe("buildManagementPlan – roster-direction ordering", () => {
  it("drains source characters bottom-to-top (descending roster index)", () => {
    const topItem = makeItem("Top Deposit")
    const midItem = makeItem("Mid Deposit")
    const botItem = makeItem("Bot Deposit")
    const rule = makeRule("r-deposit", "move-to", "bank")
    const map = new Map([
      [
        "r-deposit",
        [
          makeAffected(topItem, TOP, "Top", ESO_BAG_BACKPACK),
          makeAffected(midItem, MID, "Mid", ESO_BAG_BACKPACK),
          makeAffected(botItem, BOT, "Bot", ESO_BAG_BACKPACK),
        ],
      ],
    ])
    const inventory = makeInventory(
      {
        [TOP]: makeLocation(
          "Top",
          { [ESO_BAG_BACKPACK]: { 0: topItem } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        [MID]: makeLocation(
          "Mid",
          { [ESO_BAG_BACKPACK]: { 0: midItem } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        [BOT]: makeLocation(
          "Bot",
          { [ESO_BAG_BACKPACK]: { 0: botItem } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: {} }, { 6: 200 }),
      },
      {
        [TOP]: { displayName: "Top" },
        [MID]: { displayName: "Mid" },
        [BOT]: { displayName: "Bot" },
      }
    )

    const plan = buildManagementPlan(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory,
      makeRosterContext()
    )
    const order = plan.sessions.map((s) => s.characterId)
    expect(order).toEqual([BOT, MID, TOP])
  })

  it("fills destination characters top-to-bottom (ascending roster index)", () => {
    const topItem = makeItem("For Top")
    const midItem = makeItem("For Mid")
    const botItem = makeItem("For Bot")
    const rTop = makeRule("r-top", "move-to", `character:${TOP}`)
    const rMid = makeRule("r-mid", "move-to", `character:${MID}`)
    const rBot = makeRule("r-bot", "move-to", `character:${BOT}`)
    const map = new Map([
      ["r-top", [makeAffected(topItem, "Bank", "Bank", 6)]],
      ["r-mid", [makeAffected(midItem, "Bank", "Bank", 6)]],
      ["r-bot", [makeAffected(botItem, "Bank", "Bank", 6)]],
    ])
    const inventory = makeInventory(
      {
        [TOP]: makeLocation("Top", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        [MID]: makeLocation("Mid", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        [BOT]: makeLocation("Bot", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        Bank: makeLocation("Bank", { 6: { 0: topItem, 1: midItem, 2: botItem } }, { 6: 200 }),
      },
      {
        [TOP]: { displayName: "Top" },
        [MID]: { displayName: "Mid" },
        [BOT]: { displayName: "Bot" },
      }
    )

    const plan = buildManagementPlan(
      [rBot, rMid, rTop].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory,
      makeRosterContext()
    )
    const order = plan.sessions.map((s) => s.characterId)
    expect(order).toEqual([TOP, MID, BOT])
  })

  it("keeps drain-sources before fill-destinations even against roster direction", () => {
    const botItem = makeItem("Bot Deposit")
    const topItem = makeItem("For Top")
    const rDeposit = makeRule("r-deposit", "move-to", "bank")
    const rWithdraw = makeRule("r-withdraw", "move-to", `character:${TOP}`)
    const map = new Map([
      ["r-withdraw", [makeAffected(topItem, "Bank", "Bank", 6)]],
      ["r-deposit", [makeAffected(botItem, BOT, "Bot", ESO_BAG_BACKPACK)]],
    ])
    const inventory = makeInventory(
      {
        [TOP]: makeLocation("Top", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        [BOT]: makeLocation(
          "Bot",
          { [ESO_BAG_BACKPACK]: { 0: botItem } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: { 0: topItem } }, { 6: 200 }),
      },
      { [TOP]: { displayName: "Top" }, [BOT]: { displayName: "Bot" } }
    )

    const plan = buildManagementPlan(
      [rWithdraw, rDeposit].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory,
      makeRosterContext()
    )
    const order = plan.sessions.map((s) => s.characterId)
    expect(requireAt(order, 0)).toBe(BOT)
    expect(order.indexOf(BOT)).toBeLessThan(order.indexOf(TOP))
  })
})
