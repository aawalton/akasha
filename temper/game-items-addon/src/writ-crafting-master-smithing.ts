import { ADDON_NAME } from "./constants"
import type { MasterWritSpec } from "./writ-crafting-master-decode"
import { findBestSpecMatch, resolveEquipPattern } from "./writ-crafting-master-match"
import type { MasterWritStepKind } from "./writ-crafting-master-plan"
import { selectConsolidatedSet } from "./writ-crafting-master-set-select"
import { clearWritCraftQueue, type WritCraftRequest } from "./writ-crafting-queue"
import { recordMasterCraftTrace } from "./writ-master-craft-trace"
import type { MasterCraftOutcome, MasterCraftTrace } from "./writ-master-craft-trace-types"

const SET_PATTERN_OFFSET: Record<number, number> = { [1]: 14, [2]: 15, [6]: 6, [7]: 2 }

interface SmithingPatternMatch {
  patternIndex: number
  materialIndex: number
  numMats: number
  styleId: number
  traitIndex: number
}

function resolveTraitIndex(this: void, traitType: number): number {
  return traitType + 1
}

export function findMasterSmithingMatch(
  this: void,
  spec: MasterWritSpec
): SmithingPatternMatch | undefined {
  const pattern = resolveEquipPattern(spec)
  if (pattern === undefined) return undefined

  const traitIndex = resolveTraitIndex(spec.traitType)
  return {
    patternIndex: pattern.patternIndex,
    materialIndex: pattern.materialIndex,
    numMats: pattern.numMats,
    styleId: pattern.styleId,
    traitIndex,
  }
}

function buildCraftRequest(
  this: void,
  spec: MasterWritSpec,
  questIndex: number,
  conditionIndex: number,
  match: SmithingPatternMatch
): WritCraftRequest {
  return {
    craftType: spec.craftType,
    questIndex,
    conditionIndex,
    execute: function (this: void): undefined {
      const mode = GetCraftingInteractionMode()
      const interactionType = GetCraftingInteractionType()
      const trace: MasterCraftTrace = {
        timestamp: GetTimeStamp(),
        craftType: spec.craftType,
        setId: spec.setId,
        templateId: spec.templateId,
        traitType: spec.traitType,
        mode,
        interactionType,
        atConsolidated: false,
        basePattern: match.patternIndex,
        resolvedPattern: match.patternIndex,
        materialIndex: match.materialIndex,
        numMats: match.numMats,
        styleId: match.styleId,
        traitIndex: match.traitIndex,
        outcome: "crafted",
      }
      const finish = (outcome: MasterCraftOutcome): undefined => {
        trace.outcome = outcome
        recordMasterCraftTrace(trace)
      }

      if (interactionType === 0) {
        finish("not-in-interaction")
        return
      }
      const existing = findBestSpecMatch(spec)
      if (existing !== undefined) {
        trace.existingMatchQuality = existing.quality
        trace.existingMatchLink = GetItemLink(existing.bag, existing.slot, LINK_STYLE_DEFAULT)
        finish("idempotency-skip")
        return
      }

      selectConsolidatedSet(spec.setId)
      const atConsolidated = mode === CRAFTING_INTERACTION_MODE_CONSOLIDATED_STATION
      const pattern =
        spec.setId !== 0 && atConsolidated
          ? match.patternIndex + (SET_PATTERN_OFFSET[spec.craftType] ?? 0)
          : match.patternIndex
      trace.atConsolidated = atConsolidated
      trace.resolvedPattern = pattern

      const resultLink = GetSmithingPatternResultLink(
        pattern,
        match.materialIndex,
        match.numMats,
        match.styleId,
        match.traitIndex,
        LINK_STYLE_DEFAULT
      )
      trace.resultLink = resultLink
      if (resultLink === "") {
        d(`[${ADDON_NAME}] master writ: no result link for resolved pattern; skipping craft`)
        clearWritCraftQueue()
        finish("no-result-link")
        return
      }
      const [, , , , , resultSetId] = GetItemLinkSetInfo(resultLink)
      const [resultTrait] = GetItemLinkTraitInfo(resultLink)
      trace.resultSetId = resultSetId
      trace.resultTrait = resultTrait
      if (spec.setId !== 0 && resultSetId !== spec.setId) {
        d(`[${ADDON_NAME}] master writ: station cannot produce the required set; skipping craft`)
        clearWritCraftQueue()
        finish("set-mismatch")
        return
      }
      if (spec.traitType !== 0 && resultTrait !== spec.traitType) {
        d(`[${ADDON_NAME}] master writ: resolved pattern trait mismatch; skipping craft`)
        clearWritCraftQueue()
        finish("trait-mismatch")
        return
      }

      const [maxIter] = GetMaxIterationsPossibleForSmithingItem(
        pattern,
        match.materialIndex,
        match.numMats,
        match.styleId,
        match.traitIndex,
        false
      )
      trace.maxIter = maxIter
      if (maxIter < 1) {
        d(`[${ADDON_NAME}] Not enough materials for master writ craft`)
        clearWritCraftQueue()
        finish("insufficient-mats")
        return
      }
      finish("crafted")
      CraftSmithingItem(
        pattern,
        match.materialIndex,
        match.numMats,
        match.styleId,
        match.traitIndex,
        false,
        1
      )
    },
  }
}

function buildImproveRequest(
  this: void,
  spec: MasterWritSpec,
  questIndex: number,
  conditionIndex: number
): WritCraftRequest {
  return {
    craftType: spec.craftType,
    questIndex,
    conditionIndex,
    execute: function (this: void): undefined {
      if (GetCraftingInteractionType() === 0) return

      const match = findBestSpecMatch(spec)
      if (match === undefined || match.quality >= spec.targetQuality) return

      const improvementIndex = match.quality
      const needed = GetSmithingGuaranteedImprovementItemAmount(spec.craftType, improvementIndex)
      const [, , currentStack] = GetSmithingImprovementItemInfo(spec.craftType, improvementIndex)
      if (needed < 1 || currentStack < needed) {
        d(`[${ADDON_NAME}] Not enough improvement materials for master writ`)
        clearWritCraftQueue()
        return
      }
      ImproveSmithingItem(match.bag, match.slot, needed)
    },
  }
}

export function buildMasterSmithingStep(
  this: void,
  step: MasterWritStepKind,
  spec: MasterWritSpec,
  questIndex: number,
  conditionIndex: number,
  match: SmithingPatternMatch
): WritCraftRequest {
  if (step === "craft") return buildCraftRequest(spec, questIndex, conditionIndex, match)
  return buildImproveRequest(spec, questIndex, conditionIndex)
}
