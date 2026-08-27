const lib = LibSets

import { asNumber, asNumberOpt, asString } from "../casts"
import { asControlWidthFunc, asNumberOrStringOpt } from "./casts"
import { searchUI } from "./shared-state"

const searchUIKeyboardVars = searchUI.KeyboardVars
const TLC_SEARCH_UI_MIN_WIDTH = searchUIKeyboardVars.minWidth

lib.XMLGetDynamicWidth = function (
  this: void,
  XMLcontrol: SearchUIControl | undefined,
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
  if (XMLcontrol === undefined) {
    return undefined
  }

  let newWidth: number | string = 0

  const tlcOfXMLControl = XMLcontrol.GetOwningWindow()
  if (tlcOfXMLControl === undefined) {
    return undefined
  }

  let minWidthValue: number | string | undefined
  let maxWidthValue: number | string | undefined

  const factorMultiplier = asNumberOpt(XMLcontrol.factorMultiplier) ?? 1

  let minWidth = minWidthIn
  let maxWidth = maxWidthIn
  if (minWidth === undefined) {
    minWidth = asNumberOrStringOpt(XMLcontrol.minX)
    if (minWidth === undefined) {
      return undefined
    }
  }
  if (maxWidth === undefined) {
    maxWidth = asNumberOrStringOpt(XMLcontrol.maxX)
  }

  const minWidthType = type(minWidth)
  if (minWidthType === "function") {
    minWidthValue = asControlWidthFunc(minWidth)(XMLcontrol)
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
      maxWidthValue = asControlWidthFunc(maxWidth)(XMLcontrol)
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
    if (XMLcontrol.SetDimensionConstraints !== undefined) {
      XMLcontrol.SetDimensionConstraints(
        asNumber(newWidth),
        minHeight,
        !forceMaxWidth ? asNumber(newWidth) : maxWidthValue,
        maxHeight
      )
    }
  }
  return newWidth
}
