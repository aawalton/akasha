import { asPresent } from "akasha/temper/lib-sets/lib-sets-casts/lib-sets-casts.module.code.ts"
import { applyDefaultLayout } from "akasha/temper/lib-sets/lib-sets-set-text-default-layout/lib-sets-set-text-default-layout.module.code.ts"
import { fillSetInfoParts } from "akasha/temper/lib-sets/lib-sets-set-text-set-info-parts/lib-sets-set-text-set-info-parts.module.code.ts"
import { collectSetTextFields } from "akasha/temper/lib-sets/lib-sets-set-text-set-text-fields/lib-sets-set-text-set-text-fields.module.code.ts"
import { asSetInfoPartMap } from "akasha/temper/lib-sets/lib-sets-tip-casts/lib-sets-tip-casts.module.code.ts"
import { applyCustomTooltipPattern } from "akasha/temper/lib-sets/lib-sets-tip-set-data-text-custom/lib-sets-tip-set-data-text-custom.module.code.ts"
import { STATE } from "akasha/temper/lib-sets/lib-sets-tip-state/lib-sets-tip-state.module.code.ts"

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

  if (STATE.useCustomTooltip === true) {
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
