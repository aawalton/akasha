import { asObjectRecord } from "@akasha/utils-narrow/as-object-record"
import { onTemperInventoryExplainBuyCommand } from "../inventory-buy-explain-slash-command/inventory-buy-explain-slash-command.module.code.ts"
import { buildSkillGateEval } from "../inventory-explain-skill-gate-eval/inventory-explain-skill-gate-eval.module.code.ts"
import { buildExplainTrace } from "../inventory-explain-trace-builder/inventory-explain-trace-builder.module.code.ts"
import { captureOrNull } from "../inventory-match-capture/inventory-match-capture.module.code.ts"
import { getSavedVariables } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import type { ExplainTrace } from "../inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
import type { SkillGateEval } from "../inventory-skill-gate-eval-types/inventory-skill-gate-eval-types.module.code.ts"
import { getTemperCharactersData } from "../inventory-temper-characters-data/inventory-temper-characters-data.module.code.ts"

const PREFIX = "[TemperExplain]"
const TEMPER_USAGE = "Usage: /temper inventory explain [item link]"
const MAX_REJECTIONS_DISPLAYED = 3

function getCharNameById(
  characters: Record<string, unknown> | undefined,
  charId: string
): string | undefined {
  if (!characters) return undefined
  const charData = asObjectRecord(characters[charId])
  if (!charData) return undefined
  const name = charData["name"]
  return typeof name === "string" ? name : undefined
}

function describeChar(characters: Record<string, unknown> | undefined, charId: string): string {
  const name = getCharNameById(characters, charId)
  if (name === undefined) return charId
  return `${name} (${charId})`
}

function printExplainSummary(trace: ExplainTrace, gateEval: SkillGateEval | undefined): undefined {
  const characters = getTemperCharactersData()
  d(`${PREFIX} ${trace.itemLink}`)
  d(
    `${PREFIX} ItemId=${trace.itemId}, name="${trace.itemName}", itemType=${trace.signals.itemType}, specialized=${trace.signals.specializedItemType ?? 0}`
  )
  d(`${PREFIX} Category: ${trace.classification.categoryPath}`)

  if (trace.motifLookup !== undefined) {
    if (trace.motifLookup.lookupHit && trace.motifLookup.coords) {
      const chapter =
        trace.motifLookup.coords.chapterId === null
          ? "master"
          : `${trace.motifLookup.coords.chapterId}`
      d(
        `${PREFIX} Motif: styleId=${trace.motifLookup.coords.styleId}, chapterId=${chapter} (name parse hit)`
      )
    } else {
      d(
        `${PREFIX} Motif: NAME PARSE MISS for "${trace.motifLookup.cleanName}" — parseMotifBookName returned undefined (unknown suffix or non-motif shape)`
      )
    }
  }

  d(
    `${PREFIX} ItemKey: kind=${trace.itemKey.kind}${trace.itemKey.kind === "none" ? " (no claimable kind resolved)" : ""}`
  )

  if (trace.unlockWalk !== undefined) {
    let knownCount = 0
    let noDataCount = 0
    for (const e of trace.unlockWalk.priority) {
      if (e.knows === true) knownCount++
      else if (e.knows === "no-data-treated-as-knows") noDataCount++
    }
    const noDataNote = noDataCount > 0 ? ` (${noDataCount} skipped: no SV data)` : ""
    if (trace.unlockWalk.chosen !== undefined) {
      d(
        `${PREFIX} Unlock order: ${knownCount}/${trace.unlockWalk.priority.length} know it${noDataNote}; chosen=${describeChar(characters, trace.unlockWalk.chosen)}`
      )
    } else {
      d(
        `${PREFIX} Unlock order: ${knownCount}/${trace.unlockWalk.priority.length} know it${noDataNote}; no candidate (everyone knows or no SV data)`
      )
    }
  }

  if (trace.itemRulesMatch !== undefined) {
    d(
      `${PREFIX} Matched item rule: action=${trace.itemRulesMatch.action}, destination=${trace.itemRulesMatch.destination ?? "nil"}`
    )
  } else if (trace.orderedWalk.matched !== undefined) {
    const m = trace.orderedWalk.matched
    d(
      `${PREFIX} → Rule #${m.index} (${m.categoryId}): action=${m.action}, destination=${m.destination}`
    )
    if (m.conditions !== "") d(`${PREFIX}   Conditions: ${m.conditions}`)
  } else {
    d(
      `${PREFIX} No rule matched (${trace.orderedWalk.rulesEvaluated} rule(s) evaluated in category)`
    )
    const lastN = trace.orderedWalk.rejections.slice(-MAX_REJECTIONS_DISPLAYED)
    for (const r of lastN) {
      const detail = r.detail !== undefined && r.detail !== "" ? `: ${r.detail}` : ""
      d(`${PREFIX}   Rule #${r.index} (${r.categoryId} ${r.action}) → ${r.reason}${detail}`)
    }
  }

  d(`${PREFIX} Outcome: ${trace.outcome.action} → ${trace.outcome.destination}`)

  for (const note of trace.notes) {
    d(`${PREFIX} Note: ${note}`)
  }

  if (gateEval !== undefined) printGateEvalSummary(gateEval, characters)

  d(`${PREFIX} Full trace written to TemperInventory_SavedVariables.diagnostics.lastExplain`)
}

function printGateEvalSummary(
  gate: SkillGateEval,
  characters: Record<string, unknown> | undefined
): undefined {
  d(`${PREFIX} Skill gate (rule #${gate.ruleIndex}, ${gate.mode}: ${gate.skillLineIds.join(", ")})`)
  d(
    `${PREFIX}   TemperCharacters data: present=${gate.tcDataPresent}, chars=${gate.tcCharCount}; current=${describeChar(characters, gate.currentCharId)}`
  )
  const realDest =
    gate.firstEligible !== undefined
      ? `stock → ${describeChar(characters, gate.firstEligible)}`
      : "NO ACTION (no eligible character)"
  d(`${PREFIX}   Gate-only first eligible: ${realDest}`)
  if (gate.realDispatch !== undefined) {
    const rd = gate.realDispatch
    const act = rd.currentCharEligible
      ? `KEEP ${rd.resolvedTargetQuantity} → surplus to ${rd.resolvedDestination ?? "nil"}`
      : `INELIGIBLE → keep 0, bank all (surplus to ${rd.resolvedDestination ?? "nil"})`
    d(
      `${PREFIX}   Real per-visit resolve (bag=${rd.bagId} slot=${rd.slotIndex}): stack=${rd.stackCount} ⇒ ${act}`
    )
    const fm = rd.findMatched
      ? `matched rule #${rd.findMatchedRuleIndex ?? -1}: ${rd.findMatchedAction ?? "?"} → ${rd.findMatchedDestination ?? "nil"}`
      : "NO MATCH (findMatchedRule returned nil — pre-gate evaluation)"
    d(`${PREFIX}   Real findMatchedRule: ${fm}`)
  }
  for (const e of gate.evals) {
    const lineSummary: string[] = []
    for (const l of e.lines) lineSummary.push(`${l.skillLineId}=${l.resolved}`)
    const flag = e.eligible ? "ELIGIBLE" : "excluded"
    const cur = e.isCurrent ? " *current*" : ""
    d(`${PREFIX}   ${flag}${cur} ${describeChar(characters, e.charId)}: ${lineSummary.join(" ")}`)
  }
}

export function onTemperInventoryExplainCommand(this: void, args: string): undefined {
  const [captured] = string.match(args, "(|H.-|h.-|h)")
  const matched = captureOrNull(captured)
  if (matched === null) {
    d(
      `${PREFIX} Usage: /temper inventory explain [item link] — shift-click an item to insert its link`
    )
    return
  }
  const itemLink: string = matched
  const trace = buildExplainTrace(itemLink)
  if (trace === undefined) {
    d(`${PREFIX} No compiled rules config found. Export settings from Temper first.`)
    return
  }
  const sv = getSavedVariables()
  if (!sv.diagnostics) sv.diagnostics = {}
  sv.diagnostics.lastExplain = trace
  let gateEval: SkillGateEval | undefined
  if (trace.orderedWalk.matched !== undefined) {
    const slot =
      trace.inventory.found &&
      trace.inventory.bagId !== undefined &&
      trace.inventory.slotIndex !== undefined
        ? {
            bagId: trace.inventory.bagId,
            slotIndex: trace.inventory.slotIndex,
            itemId: trace.itemId,
          }
        : undefined
    gateEval = buildSkillGateEval(trace.orderedWalk.matched.index, trace.timestamp, slot)
    if (gateEval !== undefined) sv.diagnostics.lastGateEval = gateEval
  }
  printExplainSummary(trace, gateEval)
}

export function onTemperInventorySubcommand(this: void, args: string): undefined {
  const rest = args !== undefined ? args : ""
  const [capturedExplainBuy] = string.match(rest, "^%s*explain%-buy%s*(.*)$")
  const restAfterExplainBuy = captureOrNull(capturedExplainBuy)
  if (restAfterExplainBuy !== null) {
    onTemperInventoryExplainBuyCommand(restAfterExplainBuy)
    return
  }
  const [capturedExplain] = string.match(rest, "^%s*explain%s+(.*)$")
  const restAfterExplain = captureOrNull(capturedExplain)
  if (restAfterExplain === null) {
    d(`${PREFIX} ${TEMPER_USAGE}`)
    return
  }
  onTemperInventoryExplainCommand(restAfterExplain)
}
