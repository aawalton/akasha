import { expect, test } from "bun:test"
import {
  formatExplainWalk,
  type JsonOutput,
  type RuleTraceRow,
  type TtcBreakdown,
} from "./explain-walk.module.code.ts"

function row(over: Partial<RuleTraceRow> = {}): RuleTraceRow {
  return {
    index: 0,
    ruleId: "rule-one",
    categoryId: "weapons",
    action: "keep",
    destination: null,
    verdict: "matched",
    verdictDetail: null,
    resolvedDestination: null,
    ...over,
  }
}

function output(over: Partial<JsonOutput> = {}): JsonOutput {
  return {
    itemId: 42,
    itemName: "Ancient Orc Axe",
    itemLink: "|H1:item:42|h|h",
    categoryNodeIds: ["weapon", "weapon/axe"],
    itemKey: "42:0",
    ttc: null,
    perRule: [],
    outcome: {
      kind: "matched",
      action: "keep",
      destination: "bank",
      label: "Keep in bank",
      indeterminateRules: [],
    },
    ...over,
  }
}

const TTC: TtcBreakdown = {
  saleAvg: 1200,
  minPrice: 900,
  amountCount: 40,
  saleAmountCount: 10,
  estimatedValue: 1150,
  merchantValue: 60,
  replacementCost: 1300,
}

function lineFor(text: string, key: string): string | undefined {
  return text.split("\n").find((line) => line.startsWith(`${key}\t`))
}

test("the head of the walk names the item", () => {
  const text = formatExplainWalk(output())

  expect(lineFor(text, "itemId")).toBe("itemId\t42")
  expect(lineFor(text, "itemName")).toBe("itemName\tAncient Orc Axe")
  expect(lineFor(text, "itemKey")).toBe("itemKey\t42:0")
})

test("a field carrying nothing is written as the empty string", () => {
  const text = formatExplainWalk(
    output({ itemName: null, itemLink: null, itemKey: null, categoryNodeIds: null })
  )

  expect(lineFor(text, "itemName")).toBe("itemName\t")
  expect(lineFor(text, "itemLink")).toBe("itemLink\t")
  expect(lineFor(text, "itemKey")).toBe("itemKey\t")
  expect(lineFor(text, "categoryNodeIds")).toBe("categoryNodeIds\t")
})

test("the category nodes are written as one comma-parted field", () => {
  const text = formatExplainWalk(output())

  expect(lineFor(text, "categoryNodeIds")).toBe("categoryNodeIds\tweapon,weapon/axe")
})

test("the rows keep the order the rules were met in", () => {
  const text = formatExplainWalk(
    output({
      perRule: [
        row({ index: 0, ruleId: "first", action: "skip" }),
        row({ index: 1, ruleId: "second", action: "keep" }),
      ],
    })
  )
  const rows = text.split("\n").filter((line) => /^\d\t/.test(line))

  expect(rows).toEqual([
    "0\tfirst\tweapons\tskip\t\tmatched\t\t",
    "1\tsecond\tweapons\tkeep\t\tmatched\t\t",
  ])
})

test("a row names the destination the rule resolved to", () => {
  const text = formatExplainWalk(
    output({
      perRule: [row({ destination: "bank", resolvedDestination: "bank:overflow" })],
    })
  )

  expect(text).toContain("0\trule-one\tweapons\tkeep\tbank\tmatched\t\tbank:overflow")
})

test("a rule carrying no id leaves that field empty", () => {
  const text = formatExplainWalk(output({ perRule: [row({ ruleId: null })] }))

  expect(text).toContain("0\t\tweapons\tkeep")
})

test("no pricing block is written where there is no pricing", () => {
  const text = formatExplainWalk(output())

  expect(text).not.toContain("# TTC pricing")
})

test("a sell-through rate is worked out from the counts beside it", () => {
  const text = formatExplainWalk(output({ ttc: TTC }))

  expect(lineFor(text, "ttc")).toBe("ttc\t1200\t900\t40\t10\t0.2500\t1150\t60\t1300")
})

test("a rate never rises above one", () => {
  const text = formatExplainWalk(output({ ttc: { ...TTC, amountCount: 4, saleAmountCount: 10 } }))

  expect(lineFor(text, "ttc")).toContain("\t1.0000\t")
})

test("a rate is worked out from no count that is missing", () => {
  const text = formatExplainWalk(output({ ttc: { ...TTC, amountCount: null } }))

  expect(lineFor(text, "ttc")).toBe("ttc\t1200\t900\t\t10\t\t1150\t60\t1300")
})

test("no rate is worked out where nothing sold", () => {
  const text = formatExplainWalk(output({ ttc: { ...TTC, saleAmountCount: 0 } }))

  expect(lineFor(text, "ttc")).toBe("ttc\t1200\t900\t40\t0\t\t1150\t60\t1300")
})

test("a rate is whole where no amount was counted and something sold", () => {
  const text = formatExplainWalk(output({ ttc: { ...TTC, amountCount: 0 } }))

  expect(lineFor(text, "ttc")).toContain("\t1.0000\t")
})

test("the outcome closes the walk", () => {
  const text = formatExplainWalk(output())

  expect(lineFor(text, "outcome")).toBe("outcome\tmatched")
  expect(lineFor(text, "outcomeAction")).toBe("outcomeAction\tkeep")
  expect(lineFor(text, "outcomeDestination")).toBe("outcomeDestination\tbank")
  expect(lineFor(text, "outcomeLabel")).toBe("outcomeLabel\tKeep in bank")
})

test("an outcome carrying nothing leaves its fields empty", () => {
  const text = formatExplainWalk(
    output({
      outcome: {
        kind: "indeterminate",
        action: null,
        destination: null,
        label: null,
        indeterminateRules: [],
      },
    })
  )

  expect(lineFor(text, "outcome")).toBe("outcome\tindeterminate")
  expect(lineFor(text, "outcomeAction")).toBe("outcomeAction\t")
  expect(lineFor(text, "outcomeLabel")).toBe("outcomeLabel\t")
})

test("a rule whose outcome could still turn is named again at the foot", () => {
  const held = row({ index: 3, verdict: "indeterminate", verdictDetail: "needs the bank count" })
  const text = formatExplainWalk(
    output({
      perRule: [held],
      outcome: {
        kind: "indeterminate",
        action: null,
        destination: null,
        label: null,
        indeterminateRules: [held],
      },
    })
  )

  expect(text).toContain("# indeterminate rules")
  expect(text).toContain("- #3 keep\tneeds the bank count")
})

test("nothing is named at the foot where every outcome is settled", () => {
  const text = formatExplainWalk(output({ perRule: [row()] }))

  expect(text).not.toContain("# indeterminate rules")
})

test("the walk ends in a newline", () => {
  expect(formatExplainWalk(output()).endsWith("\n")).toBe(true)
})
