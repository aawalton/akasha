import { asPresent } from "../../casts"
import { asSetInfoPartMap } from "../casts"
import { applyCustomTooltipPattern } from "../set-data-text-custom"
import { state } from "../state"
import { applyDefaultLayout } from "./default-layout"
import { fillSetInfoParts } from "./set-info-parts"
import { collectSetTextFields } from "./set-text-fields"

const lib = LibSets

export function buildSetDataText(
  this: void,
  setData: { [key: string]: unknown },
  itemLink: string | undefined,
  forTooltip?: boolean
): LuaMultiReturn<[string, { [part: string]: LibSetsSetInfoPart }, string]> {
  if (setData === undefined) {
    return $multi(
      asPresent<string>(undefined),
      asPresent<{ [part: string]: LibSetsSetInfoPart }>(undefined),
      asPresent<string>(undefined)
    )
  }
  if (setData["setId"] === undefined) {
    d("[ERROR - LibSets]buildSetDataText - setId missing: " + tostring(itemLink))
    return $multi(
      asPresent<string>(undefined),
      asPresent<{ [part: string]: LibSetsSetInfoPart }>(undefined),
      asPresent<string>(undefined)
    )
  }
  const forTooltipResolved = forTooltip ?? false

  let setInfoParts: { [key: string]: unknown } | undefined = {}
  if (forTooltipResolved === true) {
    setInfoParts = undefined
  }

  const fields = collectSetTextFields(setData, itemLink, forTooltipResolved)

  if (state.useCustomTooltip === true) {
    applyCustomTooltipPattern(fields)
  } else {
    applyDefaultLayout(fields)
  }

  if (!forTooltipResolved) {
    fillSetInfoParts(setData, fields, setInfoParts)
  }

  return $multi(
    asPresent(fields.setInfoText),
    asSetInfoPartMap(asPresent(setInfoParts)),
    asPresent(fields.setInfoTextNoTextures)
  )
}
lib.BuildSetDataText = buildSetDataText
