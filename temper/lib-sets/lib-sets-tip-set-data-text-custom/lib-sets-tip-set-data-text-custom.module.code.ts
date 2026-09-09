import { asPresent, asString } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  addLineBreakIfNotEmpty,
  checkNonNeededLineBreak,
} from "../lib-sets-tip-helpers/lib-sets-tip-helpers.module.code.ts"
import { STATE } from "../lib-sets-tip-state/lib-sets-tip-state.module.code.ts"

const lib = LibSets

function gsub(this: void, s: string, pattern: string, repl: string): string {
  return string.gsub(s, pattern, repl)[0]
}

export interface CustomTooltipCtx {
  isReconstructableSet: boolean
  forTooltipResolved: boolean

  reconstructionCostText: string | undefined
  reconstructionCostTextClean: string | undefined
  setTypeText: string | undefined
  setTypeTexture: string | undefined
  setTypeTextClean: string | undefined
  setNeededTraitsText: string | undefined
  setNeededTraitsTextClean: string | undefined
  setDropZoneStr: string | undefined
  setDropZoneStrClean: string | undefined
  setDropMechanicText: string | undefined
  setDropMechanicTextClean: string | undefined
  setDropLocationsText: string | undefined
  setDropLocationsTextClean: string | undefined
  setDLCText: string | undefined
  setDLCTextClean: string | undefined
  setSearchFavoritesText: string | undefined
  setSearchFavoritesTextClean: string | undefined

  setInfoText: string | undefined
  setInfoTextNoTextures: string | undefined
}

export function applyCustomTooltipPattern(this: void, ctx: CustomTooltipCtx): undefined {
  const { isReconstructableSet, forTooltipResolved } = ctx

  if (!isReconstructableSet || !STATE.setReconstructionCostPlaceholder) {
    ctx.reconstructionCostText = ""
    ctx.reconstructionCostTextClean = ""
  }
  if (!STATE.setTypePlaceholder) {
    ctx.setTypeText = ""
    ctx.setTypeTexture = ""
    ctx.setTypeTextClean = ""
  } else {
    ctx.setTypeTextClean = ctx.setTypeText
    if (
      (STATE.tooltipTextures === true || !forTooltipResolved) &&
      ctx.setTypeTexture !== undefined &&
      ctx.setTypeTexture !== ""
    ) {
      ctx.setTypeText = zo_iconTextFormat(
        ctx.setTypeTexture,
        24,
        24,
        asPresent(ctx.setTypeText),
        undefined
      )
    }
  }
  if (isReconstructableSet || !STATE.neededTraitsPlaceholder) {
    ctx.setNeededTraitsText = ""
    ctx.setNeededTraitsTextClean = ""
  }
  if (!STATE.dlcNamePlaceHolder) {
    ctx.setDLCText = ""
    ctx.setDLCTextClean = ""
  }
  if (!STATE.dropZonesPlaceholder) {
    ctx.setDropZoneStr = ""
    ctx.setDropZoneStrClean = ""
  }
  if (!STATE.dropMechanicPlaceholder) {
    ctx.setDropMechanicText = ""
    ctx.setDropMechanicTextClean = ""
  }
  if (!STATE.bossNamePlaceholder) {
    ctx.setDropLocationsText = ""
    ctx.setDropLocationsTextClean = ""
  }
  if (
    isReconstructableSet &&
    ctx.reconstructionCostText !== undefined &&
    ctx.reconstructionCostText !== ""
  ) {
    ctx.setNeededTraitsText = ctx.reconstructionCostText
    ctx.setNeededTraitsTextClean = ctx.reconstructionCostTextClean
  }
  if (!STATE.setSearchFavoritesPlaceHolder) {
    ctx.setSearchFavoritesText = ""
    ctx.setSearchFavoritesTextClean = ""
  }

  let patternNew = asString(asPresent(lib.svData)["useCustomTooltipPattern"])

  const patternsEmpty = new LuaMap<string, boolean>()
  if (ctx.setTypeText === undefined || ctx.setTypeText === "") {
    patternNew = gsub(patternNew, "<<1>><br>", "")
    patternNew = gsub(patternNew, "<<1>>", "")
    patternsEmpty.set("setTypeText", true)
  }
  if (ctx.setDropMechanicText === undefined || ctx.setDropMechanicText === "") {
    patternNew = checkNonNeededLineBreak(patternNew, 2)
    patternNew = gsub(patternNew, "<<2>><br>", "")
    patternNew = gsub(patternNew, "<<2>>", "")
    patternsEmpty.set("setDropMechanicText", true)
  }
  if (ctx.setDropZoneStr === undefined || ctx.setDropZoneStr === "") {
    patternNew = checkNonNeededLineBreak(patternNew, 3)
    patternNew = gsub(patternNew, "<<3>><br>", "")
    patternNew = gsub(patternNew, "<<3>>", "")
    patternsEmpty.set("setDropZoneStr", true)
  }
  if (ctx.setDropLocationsText === undefined || ctx.setDropLocationsText === "") {
    patternNew = checkNonNeededLineBreak(patternNew, 4)
    patternNew = gsub(patternNew, "<<4>><br>", "")
    patternNew = gsub(patternNew, "<<4>>", "")
    patternsEmpty.set("setDropLocationsText", true)
  }
  if (ctx.setNeededTraitsText === undefined || ctx.setNeededTraitsText === "") {
    patternNew = checkNonNeededLineBreak(patternNew, 5)
    patternNew = gsub(patternNew, "%(<<5>>%)<br>", "")
    patternNew = gsub(patternNew, "<<5>><br>", "")
    patternNew = gsub(patternNew, "%(<<5>>%)", "")
    patternNew = gsub(patternNew, "<<5>>", "")
    patternsEmpty.set("setNeededTraitsText", true)
  }
  if (ctx.setDLCText === undefined || ctx.setDLCText === "") {
    patternNew = checkNonNeededLineBreak(patternNew, 6)
    patternNew = gsub(patternNew, "<<6>><br>", "")
    patternNew = gsub(patternNew, "<<6>>", "")
    patternsEmpty.set("setDLCText", true)
  }
  if (ctx.setSearchFavoritesText === undefined || ctx.setSearchFavoritesText === "") {
    patternNew = checkNonNeededLineBreak(patternNew, 7)
    patternNew = gsub(patternNew, "<<7>><br>", "")
    patternNew = gsub(patternNew, "<<7>>", "")
    patternsEmpty.set("setSearchFavoritesText", true)
  }

  patternNew = gsub(patternNew, "<br>", "\n")

  if (STATE.addLineBreakAfterNonEmptyParts === true) {
    if (!patternsEmpty.get("setTypeText")) {
      const [find1] = string.find(patternNew, "<<1>>", 1, true)
      const offset = asPresent(find1) + 5
      const nextCh = string.sub(patternNew, offset, offset)
      ctx.setTypeText = addLineBreakIfNotEmpty(ctx.setTypeText, nextCh, "setTypePlaceholder")
      ctx.setTypeTextClean = addLineBreakIfNotEmpty(
        ctx.setTypeTextClean,
        nextCh,
        "setTypePlaceholder"
      )
    }
    if (!patternsEmpty.get("setDropMechanicText")) {
      const [find2] = string.find(patternNew, "<<2>>", 1, true)
      const offset = asPresent(find2) + 5
      const nextCh = string.sub(patternNew, offset, offset)
      ctx.setDropMechanicText = addLineBreakIfNotEmpty(
        ctx.setDropMechanicText,
        nextCh,
        "dropMechanicPlaceholder"
      )
      ctx.setDropMechanicTextClean = addLineBreakIfNotEmpty(
        ctx.setDropMechanicTextClean,
        nextCh,
        "dropMechanicPlaceholder"
      )
    }
    if (!patternsEmpty.get("setDropZoneStr")) {
      const [find3] = string.find(patternNew, "<<3>>", 1, true)
      const offset = asPresent(find3) + 5
      const nextCh = string.sub(patternNew, offset, offset)
      ctx.setDropZoneStr = addLineBreakIfNotEmpty(
        ctx.setDropZoneStr,
        nextCh,
        "dropZonesPlaceholder"
      )
      ctx.setDropZoneStrClean = addLineBreakIfNotEmpty(
        ctx.setDropZoneStrClean,
        nextCh,
        "dropZonesPlaceholder"
      )
    }
    if (!patternsEmpty.get("setDropLocationsText")) {
      const [find4] = string.find(patternNew, "<<4>>", 1, true)
      const offset = asPresent(find4) + 5
      const nextCh = string.sub(patternNew, offset, offset)
      ctx.setDropLocationsText = addLineBreakIfNotEmpty(
        ctx.setDropLocationsText,
        nextCh,
        "bossNamePlaceholder"
      )
      ctx.setDropLocationsTextClean = addLineBreakIfNotEmpty(
        ctx.setDropLocationsTextClean,
        nextCh,
        "bossNamePlaceholder"
      )
    }
    if (!patternsEmpty.get("setNeededTraitsText")) {
      const [find5] = string.find(patternNew, "<<5>>", 1, true)
      const offset = asPresent(find5) + 5
      const nextCh = string.sub(patternNew, offset, offset)
      ctx.setNeededTraitsText = addLineBreakIfNotEmpty(
        ctx.setNeededTraitsText,
        nextCh,
        "neededTraitsPlaceholder"
      )
      ctx.setNeededTraitsTextClean = addLineBreakIfNotEmpty(
        ctx.setNeededTraitsTextClean,
        nextCh,
        "neededTraitsPlaceholder"
      )
    }
    if (!patternsEmpty.get("setDLCText")) {
      const [find6] = string.find(patternNew, "<<6>>", 1, true)
      const offset = asPresent(find6) + 5
      const nextCh = string.sub(patternNew, offset, offset)
      ctx.setDLCText = addLineBreakIfNotEmpty(ctx.setDLCText, nextCh, "dlcNamePlaceHolder")
      ctx.setDLCTextClean = addLineBreakIfNotEmpty(
        ctx.setDLCTextClean,
        nextCh,
        "dlcNamePlaceHolder"
      )
    }
    if (!patternsEmpty.get("setSearchFavoritesText")) {
      const [find7] = string.find(patternNew, "<<7>>", 1, true)
      const offset = asPresent(find7) + 5
      const nextCh = string.sub(patternNew, offset, offset)
      ctx.setSearchFavoritesText = addLineBreakIfNotEmpty(
        ctx.setSearchFavoritesText,
        nextCh,
        "setSearchFavoritesPlaceHolder"
      )
      ctx.setSearchFavoritesTextClean = addLineBreakIfNotEmpty(
        ctx.setSearchFavoritesTextClean,
        nextCh,
        "setSearchFavoritesPlaceHolder"
      )
    }
  }

  ctx.setInfoText = zo_strformat(
    patternNew,
    asPresent(ctx.setTypeText),
    asPresent(ctx.setDropMechanicText),
    asPresent(ctx.setDropZoneStr),
    asPresent(ctx.setDropLocationsText),
    asPresent(ctx.setNeededTraitsText),
    asPresent(ctx.setDLCText),
    asPresent(ctx.setSearchFavoritesText)
  )

  if (!forTooltipResolved) {
    ctx.setInfoTextNoTextures = zo_strformat(
      patternNew,
      asPresent(ctx.setTypeTextClean),
      asPresent(ctx.setDropMechanicTextClean),
      asPresent(ctx.setDropZoneStrClean),
      asPresent(ctx.setDropLocationsTextClean),
      asPresent(ctx.setNeededTraitsTextClean),
      asPresent(ctx.setDLCTextClean),
      asPresent(ctx.setSearchFavoritesTextClean)
    )
  }
}
