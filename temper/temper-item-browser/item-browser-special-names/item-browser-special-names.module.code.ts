export const UN_MAJ = -101
export const UN_GLI = -102
export const UN_URG = -103
export const CYRO_L = -201
export const CYRO_M = -202
export const CYRO_H = -203
export const TGUILD = -301

function mythicItemName(this: void, itemId: number): string {
  const itemLink = string.format("|H1:item:%d:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h", itemId)
  return zo_strformat(SI_LINK_FORMAT_ITEM_NAME, GetItemLinkName(itemLink))
}

function thievesGuildCategoryName(this: void): string {
  const [topLevelIndex] = GetCategoryInfoFromAchievementId(1371)
  const [categoryName] = GetAchievementCategoryInfo(topLevelIndex ?? 0)
  return categoryName
}

export function buildSpecialNames(this: void): { readonly [zoneId: number]: string | undefined } {
  return {
    [UN_MAJ]: mythicItemName(153513),
    [UN_GLI]: mythicItemName(153514),
    [UN_URG]: mythicItemName(153515),
    [CYRO_L]: zo_strformat(SI_TOOLTIP_KEEP_NAME, GetKeepName(152)),
    [CYRO_M]: zo_strformat(SI_TOOLTIP_KEEP_NAME, GetKeepName(151)),
    [CYRO_H]: zo_strformat(SI_TOOLTIP_KEEP_NAME, GetKeepName(149)),
    [TGUILD]: thievesGuildCategoryName(),
  }
}
