import * as Knowledge from "../craft-knowledge/craft-knowledge.module.code.ts"
import { STYLES } from "../craft-styles/craft-styles.module.code.ts"
import { createStyleTables } from "../craft-styles-data-tables/craft-styles-data-tables.module.code.ts"
import {
  isPublishedAchievement,
  isPublishedItem,
} from "../crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

function parseLuaCapture(captured: string | undefined): string | undefined {
  return captured
}

export type StylePopup = [number, string | undefined, string | undefined]

export interface StyleApi {
  RemoveUnpublishedStyles: (this: void) => undefined
  compileStyles: (this: void) => undefined
  compilePartialStyles: (
    this: void,
    excludedStyles: Record<number, boolean | undefined>
  ) => undefined
  styleMotifNumber: (this: void, style: number) => number
  isSimpleStyle: (this: void, style: number) => boolean
  isCrownStyle: (this: void, style: number) => boolean
  styleBookId: (this: void, style: number) => number | false
  isPerfectedStyle: (this: void, style: number) => boolean
  isUnknownStyle: (this: void, style: number) => boolean
  isKnownStyle: (this: void, style: number, chapter: number) => boolean
  getLoreBookIndicesForStyle: (
    this: void,
    style: number
  ) => LuaMultiReturn<[number | undefined, number | undefined]>
  updatePreview: (this: void, preview: number | string | undefined) => undefined
  getChapterId: (this: void, style: number, chapter: number) => number
  getIconAndLink: (this: void, style: number, chapter: number) => LuaMultiReturn<[string, string]>
  checkStyle: (this: void, style: number) => boolean
  getHeadline: (
    this: void,
    style: number
  ) => LuaMultiReturn<[string, string, string, string, string | undefined, StylePopup]>
}

export function styleApi(this: void): StyleApi {
  const tables = createStyleTables()
  const previewItems = tables.previewItems
  const styles = tables.styles
  const styleMap = tables.styleMap
  let item: number[] = previewItems[0]

  for (const [, data] of pairs(styles)) {
    const styleName = GetItemLinkName(
      string.format("|H1:item:%u:6:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h", data[2])
    )
    const [styleVisualIdRaw] = string.match(styleName, "%d+")
    const styleVisualId = parseLuaCapture(styleVisualIdRaw)
    data[3] = styleVisualId !== undefined ? (tonumber(styleVisualId) ?? 0) : 0
  }

  function removeUnpublishedStyles(this: void): undefined {
    const unpublishedStyles: number[] = []
    for (const [style, data] of pairs(styles)) {
      if (!isPublishedItem(data[2])) {
        unpublishedStyles.push(style)
      }
      if (!isCrownStyle(style) && !isPublishedAchievement(data[1])) {
        unpublishedStyles.push(style)
      }
    }

    for (const style of unpublishedStyles) {
      delete styles[style]
      delete styleMap[style]
    }
  }

  function compileStyles(this: void): undefined {
    STYLES.list = []
    for (const [, data] of pairs(styleMap)) {
      if (data[0] !== 0) {
        STYLES.list.push(data[0])
      }
      if (data[1] !== 0) {
        for (let chapter = 0; chapter <= 13; chapter++) {
          STYLES.list.push(data[1] + chapter)
        }
      }
      if (data[2] !== 0) {
        STYLES.list.push(data[2])
      }
      if (data[3] !== 0) {
        for (let chapter = 0; chapter <= 13; chapter++) {
          STYLES.list.push(data[3] + chapter)
        }
      }
    }
  }

  function compilePartialStyles(
    this: void,
    excludedStyles: Record<number, boolean | undefined>
  ): undefined {
    STYLES.oldlist = []
    for (const [style, data] of pairs(styleMap)) {
      if (excludedStyles[style] === undefined) {
        if (data[0] !== 0) {
          STYLES.oldlist.push(data[0])
        }
        if (data[1] !== 0) {
          for (let chapter = 0; chapter <= 13; chapter++) {
            STYLES.oldlist.push(data[1] + chapter)
          }
        }
        if (data[2] !== 0) {
          STYLES.oldlist.push(data[2])
        }
        if (data[3] !== 0) {
          for (let chapter = 0; chapter <= 13; chapter++) {
            STYLES.oldlist.push(data[3] + chapter)
          }
        }
      }
    }
  }

  function styleMotifNumber(this: void, style: number): number {
    const data = styles[style]
    if (data === undefined) {
      error(string.format("TemperCrafting: StyleMotifNumber for unknown style %d", style))
    }
    const visualId = data[3]
    if (visualId !== undefined) {
      return visualId
    }
    return 0
  }

  function isSimpleStyle(this: void, style: number): boolean {
    const data = styles[style]
    if (data === undefined) {
      return false
    }
    if (data[0] === 1) {
      return true
    }
    return false
  }

  function isCrownStyle(this: void, style: number): boolean {
    const data = styles[style]
    if (data === undefined) {
      return false
    }
    if (data[0] === 3) {
      return true
    }
    return false
  }

  function styleBookId(this: void, style: number): number | false {
    const data = styles[style]
    if (data === undefined) {
      return false
    }
    if (isSimpleStyle(style) || isCrownStyle(style)) {
      return data[2]
    }
    return data[2] - 1
  }

  function isPerfectedStyle(this: void, style: number): boolean {
    const data = styles[style]
    if (data === undefined) {
      return false
    }
    if (STATE.SelectedPlayer === STATE.CurrentPlayer) {
      if (isSimpleStyle(style)) {
        return IsSmithingStyleKnown(style)
      }
      if (isCrownStyle(style)) {
        return IsItemLinkBookKnown(
          string.format("|H1:item:%u:6:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h", data[2])
        )
      }
      for (let chapter = 1; chapter <= 14; chapter++) {
        const known = isKnownStyle(style, chapter)
        if (!known) {
          return false
        }
      }
      return true
    }
    let result = true
    for (let chapter = 1; chapter <= 14; chapter++) {
      result =
        result && Knowledge.isItemKnownById(STATE.SelectedPlayer, getChapterId(style, chapter))
    }
    return result
  }

  function isUnknownStyle(this: void, style: number): boolean {
    const data = styles[style]
    if (data === undefined) {
      return false
    }
    if (STATE.SelectedPlayer === STATE.CurrentPlayer) {
      if (isSimpleStyle(style)) {
        return !IsSmithingStyleKnown(style)
      }
      if (isCrownStyle(style)) {
        return !IsItemLinkBookKnown(
          string.format("|H1:item:%u:6:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h", data[2])
        )
      }
      for (let chapter = 1; chapter <= 14; chapter++) {
        const known = isKnownStyle(style, chapter)
        if (known) {
          return false
        }
      }
      return true
    }
    let result = true
    for (let chapter = 1; chapter <= 14; chapter++) {
      result =
        result && !Knowledge.isItemKnownById(STATE.SelectedPlayer, getChapterId(style, chapter))
    }
    return result
  }

  function isKnownStyle(this: void, style: number, chapter: number): boolean {
    const data = styles[style]
    if (data === undefined) {
      return false
    }
    if (isSimpleStyle(style)) {
      return IsSmithingStyleKnown(style)
    }
    if (isCrownStyle(style)) {
      return IsItemLinkBookKnown(
        string.format("|H1:item:%u:6:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h", data[2])
      )
    }
    const [categoryIndex, collectionIndex] = getLoreBookIndicesForStyle(style)
    const [, , known] = GetLoreBookInfo(categoryIndex, collectionIndex, chapter)
    return known
  }

  function getLoreBookIndicesForStyle(
    this: void,
    style: number
  ): LuaMultiReturn<[number | undefined, number | undefined]> {
    const data = styles[style]
    if (data === undefined) {
      error(string.format("TemperCrafting: GetLoreBookIndicesForStyle for unknown style %d", style))
    }
    const achievementId = data[1]
    const collectionId = GetAchievementLinkedBookCollectionId(achievementId)
    return GetLoreBookCollectionIndicesFromCollectionId(collectionId)
  }

  function updatePreview(this: void, preview: number | string | undefined): undefined {
    let index: number
    if (typeof preview === "string" || preview === undefined) {
      index = 1
    } else {
      index = preview
    }
    const selected = previewItems[index - 1]
    if (selected !== undefined) {
      item = selected
    }
  }

  function getChapterId(this: void, style: number, chapter: number): number {
    let data = styles[style]
    if (data === undefined) {
      data = [1, 1028, 63026]
      styles[style] = data
    }
    if (isSimpleStyle(style) || isCrownStyle(style)) {
      return data[2]
    }
    return data[2] + (chapter - 1)
  }

  function getIconAndLink(
    this: void,
    style: number,
    chapter: number
  ): LuaMultiReturn<[string, string]> {
    let data = styles[style]
    if (data === undefined) {
      data = [1, 1028, 63026]
      styles[style] = data
    }
    let link = string.format(
      "|H1:item:%u:370:50:0:0:0:0:0:0:0:0:0:0:0:0:%u:0:0:0:10000:0|h|h",
      item[chapter - 1],
      style
    )
    const [icon] = GetItemLinkInfo(link)
    if (isSimpleStyle(style) || isCrownStyle(style)) {
      link = string.format("|H1:item:%u:5:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h", data[2])
    } else {
      link = string.format(
        "|H1:item:%u:6:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
        data[2] + (chapter - 1)
      )
    }
    return $multi(icon, link)
  }

  function checkStyle(this: void, style: number): boolean {
    if (STATE.Debug !== true) {
      const data = styles[style]
      if (data === undefined) {
        return false
      }
      if (data[1] === 1028) {
        return false
      }
      if (data[0] === 0) {
        return false
      }
    } else if (styles[style] === undefined) {
      const name = zo_strformat("<<C:1>>", GetItemStyleName(style))
      if (name !== "None" && name !== "") {
        return true
      }
      return false
    }
    return true
  }

  function getHeadline(
    this: void,
    style: number
  ): LuaMultiReturn<[string, string, string, string, string | undefined, StylePopup]> {
    let data = styles[style]
    if (data === undefined) {
      data = [1, 1028, 63026]
      styles[style] = data
    }
    const link = GetItemStyleMaterialLink(style)
    const [icon] = GetItemLinkInfo(link)
    let name = zo_strformat("<<C:1>>", GetItemStyleName(style))
    const [unusedPos] = string.find(name, "Unused")
    if (unusedPos !== undefined) {
      for (const [index, locName] of pairs<Record<string, string>>(STATE.Loc.styleNames)) {
        if (string.lower(index) === string.lower(name)) {
          name = zo_strformat("<<C:1>>", locName)
        }
      }
    }
    if (STATE.Debug === true) {
      name = name + zo_strformat("<<C:1>>", style)
    }
    let aName: string
    let aLink: string | undefined
    if (data[0] !== 3) {
      aLink = GetAchievementLink(data[1], LINK_STYLE_BRACKETS)
      const [achievementName] = GetAchievementInfo(data[1])
      aName = zo_strformat("<<C:1>>", achievementName)
    } else {
      aName = "crown"
    }
    const [, , , , progress, ts] = ZO_LinkHandler_ParseLink(aLink ?? "")
    const popup: StylePopup = [data[1], progress, ts]
    return $multi(icon, link, name, aName, aLink, popup)
  }

  return {
    RemoveUnpublishedStyles: removeUnpublishedStyles,
    compileStyles,
    compilePartialStyles,
    styleMotifNumber,
    isSimpleStyle,
    isCrownStyle,
    styleBookId,
    isPerfectedStyle,
    isUnknownStyle,
    isKnownStyle,
    getLoreBookIndicesForStyle,
    updatePreview,
    getChapterId,
    getIconAndLink,
    checkStyle,
    getHeadline,
  }
}
