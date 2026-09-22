import type {
  BankTraceBracket,
  BankTraceSettling,
  BankTraceStacking,
} from "akasha/temper/command/modules/bank-trace-reading/bank-trace-reading.module.code.ts"

export function msSaid(value: number | undefined): string {
  return value === undefined ? "nil" : `${value}ms`
}

function bracketSaid(one: BankTraceBracket): string {
  return `n=${one.count} total=${one.totalMs}ms max=${one.maxMs}ms`
}

function optBracketSaid(one: BankTraceBracket | undefined): string {
  return one === undefined ? "nil (pre-v3 trace)" : bracketSaid(one)
}

function nestedBracketSaid(one: BankTraceBracket | undefined): string {
  return one === undefined ? "nil (pre-v6 trace)" : bracketSaid(one)
}

export function settlingSaid(settling: BankTraceSettling | undefined): readonly string[] {
  if (settling === undefined) {
    return ["settling: nil (v1 trace — bank once more to capture settling brackets)"]
  }
  const crafting =
    settling.crafting === undefined
      ? "crafting slot-handlers: nil (TemperItemsCrafting absent)"
      : `crafting slot-handlers: n=${settling.crafting.count} total=${settling.crafting.totalMs}ms`
  return [
    `settling: evaluateRules ${bracketSaid(settling.evaluateRules)}; ` +
      `actions-changed ${bracketSaid(settling.actionsChanged)}; ` +
      `bank-panel-refresh ${bracketSaid(settling.bankPanelRefresh)}`,
    `  slot-update ${optBracketSaid(settling.slotUpdate)}; ` +
      `full-update ${optBracketSaid(settling.fullUpdate)}; ` +
      `scan-craft-bag ${optBracketSaid(settling.scanCraftBag)}`,
    crafting,
    `  of that judging: build-facts ${nestedBracketSaid(settling.buildFacts)}; ` +
      `walk-rules ${nestedBracketSaid(settling.walkRules)}`,
    `unattributed remainder: ${msSaid(settling.unattributedMs)}`,
  ]
}

export function stackingSaid(stacking: BankTraceStacking | undefined): string {
  if (stacking === undefined) {
    return "stacking: nil (pre-v7 trace — bank once more to capture it)"
  }
  if (!stacking.ran) {
    return `stacking: did not run — ${stacking.skipped ?? "no reason was recorded"}`
  }
  const bags = stacking.bags ?? []
  if (bags.length === 0) return "stacking: ran over no bags"
  const counts = stacking.counts ?? []
  if (counts.length === 0) return `stacking: ran over bags ${bags.join(", ")}`
  const each = counts.map(
    (one) =>
      `${one.bag}: ${one.partialsBefore}→` +
      `${one.partialsAfter === undefined ? "unsettled" : one.partialsAfter}`
  )
  return `stacking: ran over bags ${bags.join(", ")} (partial stacks ${each.join(", ")})`
}

export function handlerSaid(handler: BankTraceSettling | undefined): readonly string[] {
  if (handler === undefined) {
    return ["in open handler: nil (pre-v6 trace — bank once more to capture it)"]
  }
  return [
    `in open handler: evaluateRules ${bracketSaid(handler.evaluateRules)}; ` +
      `bank-panel-refresh ${bracketSaid(handler.bankPanelRefresh)}`,
    `  of that judging: build-facts ${nestedBracketSaid(handler.buildFacts)}; ` +
      `walk-rules ${nestedBracketSaid(handler.walkRules)}`,
  ]
}
