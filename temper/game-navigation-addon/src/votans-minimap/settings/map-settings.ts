import { type FontSizeItem, type FrameStyleItem, holder, type VotansMiniMap } from "../holder"

interface FontItem {
  name: string
  data: string
}

export interface Lookup {
  frameStyles: FrameStyleItem[]
  fonts: FontItem[]
  fontSizes: FontSizeItem[]
  frameToFile: Record<string, FrameStyleItem | undefined>
  nameToFont: Record<string, FontItem | undefined>
  nameToFontSize: Record<string | number, FontSizeItem | undefined>
}

export const lookup: Lookup = {
  frameStyles: [],
  fonts: [],
  fontSizes: [],
  frameToFile: {},
  nameToFont: {},
  nameToFontSize: {},
}

holder.GetFontSizeBySizeName = function (
  this: VotansMiniMap,
  sizeName: string | number
): FontSizeItem | undefined {
  return lookup.nameToFontSize[sizeName]
}

holder.GetStyleByName = function (this: VotansMiniMap, name: string): FrameStyleItem | undefined {
  return lookup.frameToFile[name]
}

holder.AddBorderStyle = function (
  this: VotansMiniMap,
  name: string,
  displayText: string,
  setupFunction: (this: void, ...args: unknown[]) => unknown,
  resetFunction: ((this: void, ...args: unknown[]) => unknown) | undefined
): undefined {
  lookup.frameStyles.push({
    name: displayText,
    data: { value: name, setup: setupFunction, reset: resetFunction },
  })
}

holder.AddFont = function (this: VotansMiniMap, font: string, displayText: string): undefined {
  if (zo_plainstrfind(font, "/")) {
    this.fontFaces[font] = font
  } else {
    if (this.fontFaces[font] == null) {
      this.fontFaces[font] = "$(" + font + ")"
    }
  }
  lookup.fonts.push({ name: displayText, data: font })
}

holder.AddFontSize = function (
  this: VotansMiniMap,
  fontSize: number,
  displayText: string,
  offsetY: number
): undefined {
  lookup.fontSizes.push({
    name: displayText,
    data: { size: fontSize, offsetY },
  })
}

holder.InitMapSettings = function (this: VotansMiniMap): undefined {
  lookup.frameToFile = {}
  for (const item of lookup.frameStyles) {
    lookup.frameToFile[item.data.value] = item
  }
  if (lookup.frameToFile[this.account.frameStyle] == null) {
    this.account.frameStyle = "Default"
  }

  lookup.nameToFont = {}
  for (const item of lookup.fonts) {
    lookup.nameToFont[item.data] = item
  }
  if (lookup.nameToFont[this.account.titleFont] == null) {
    this.account.titleFont = "BOLD_FONT"
  }

  lookup.nameToFontSize = {}
  for (const item of lookup.fontSizes) {
    lookup.nameToFontSize[item.data.size] = item
  }
  if (type(this.account.titleFontSize) === "string") {
    VOTAN_MINIMAP_FONT = CreateFont(
      "VOTAN_MINIMAP_FONT",
      "$(MEDIUM_FONT)|" + tostring(this.account.titleFontSize)
    )
    const [, fontSize] = VOTAN_MINIMAP_FONT.GetFontInfo()
    this.account.titleFontSize = fontSize
  }
  if (lookup.nameToFontSize[this.account.titleFontSize] == null) {
    this.account.titleFontSize = 16
  }
}
