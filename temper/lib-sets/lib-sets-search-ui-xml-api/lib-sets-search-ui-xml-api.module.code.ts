const lib = LibSets

import { asNumber, asNumberOpt, asString } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asControlWidthFunc,
  asNumberOrStringOpt,
} from "../lib-sets-search-ui-casts/lib-sets-search-ui-casts.module.code.ts"
import { searchUI } from "../lib-sets-search-ui-shared-state/lib-sets-search-ui-shared-state.module.code.ts"

const searchUIKeyboardVars = searchUI.KeyboardVars
const TLC_SEARCH_UI_MIN_WIDTH = searchUIKeyboardVars.minWidth

lib.XMLGetDynamicWidth = function (
  this: void,
  xmlControl: SearchUIControl | undefined,
  minWidthIn?: number | string | ((this: void, control: SearchUIControl) => number),
  maxWidthIn?: number | string | ((this: void, control: SearchUIControl) => number),
  applyValuesIn?: boolean,
  minHeightIn?: number,
  maxHeightIn?: number,
  forceMaxWidthIn?: boolean
): number | string | undefined {
  const minHeight = minHeightIn ?? 10
  const maxHeight = maxHeightIn ?? 30
  const applyValues = applyValuesIn ?? false
  const forceMaxWidth = forceMaxWidthIn ?? false
  if (xmlControl === undefined) {
    return undefined
  }

  let newWidth: number | string = 0

  const tlcOfXMLControl = xmlControl.GetOwningWindow()
  if (tlcOfXMLControl === undefined) {
    return undefined
  }

  let minWidthValue: number | string | undefined
  let maxWidthValue: number | string | undefined

  const factorMultiplier = asNumberOpt(xmlControl.factorMultiplier) ?? 1

  let minWidth = minWidthIn
  let maxWidth = maxWidthIn
  if (minWidth === undefined) {
    minWidth = asNumberOrStringOpt(xmlControl.minX)
    if (minWidth === undefined) {
      return undefined
    }
  }
  if (maxWidth === undefined) {
    maxWidth = asNumberOrStringOpt(xmlControl.maxX)
  }

  const minWidthType = type(minWidth)
  if (minWidthType === "function") {
    minWidthValue = asControlWidthFunc(minWidth)(xmlControl)
  } else if (minWidthType === "string") {
    minWidthValue = asString(minWidth)
  } else if (minWidthType === "number") {
    minWidthValue = asNumber(minWidth)
  }

  const tlcWidth = tlcOfXMLControl.GetWidth()
  if (tlcWidth === undefined || tlcWidth <= 0) {
    return minWidthValue
  }

  if (minWidthValue !== undefined) {
    if (minWidthType === "string") {
      newWidth = minWidthValue
    } else {
      let minWidthNum = asNumber(minWidthValue)
      if (minWidthNum < 0) {
        minWidthNum = 0
      }
      minWidthValue = minWidthNum
      if (tlcWidth > TLC_SEARCH_UI_MIN_WIDTH) {
        const calculationFactor =
          zo_clamp(tlcWidth / TLC_SEARCH_UI_MIN_WIDTH, 1, 10) * factorMultiplier
        newWidth = zo_clamp(minWidthNum * calculationFactor, minWidthNum, tlcWidth)
      } else {
        newWidth = minWidthNum
      }
    }
  }

  if (maxWidth !== undefined) {
    let maxWidthType = type(maxWidth)
    if (maxWidthType === "function") {
      maxWidthValue = asControlWidthFunc(maxWidth)(xmlControl)
    } else if (maxWidthType === "string") {
      maxWidthValue = asString(maxWidth)
      if (zo_plainstrfind(maxWidthValue, "calcByTLCWidth,") !== undefined) {
        const value = tonumber(string.sub(maxWidthValue, 16))
        if (type(value) === "number" && value !== undefined) {
          maxWidthValue = tlcWidth + value
          maxWidthType = "number"
        }
      }
    } else if (maxWidthType === "number") {
      maxWidthValue = asNumber(maxWidth)
    }
    if (maxWidthValue !== undefined && maxWidthType !== "string") {
      newWidth = zo_clamp(asNumber(newWidth), asNumber(minWidthValue), asNumber(maxWidthValue))
    }
  }

  if (applyValues) {
    if (xmlControl.SetDimensionConstraints !== undefined) {
      xmlControl.SetDimensionConstraints(
        asNumber(newWidth),
        minHeight,
        !forceMaxWidth ? asNumber(newWidth) : maxWidthValue,
        maxHeight
      )
    }
  }
  return newWidth
}
