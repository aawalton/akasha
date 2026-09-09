import { initDungeonChampions } from "akasha/temper/dungeon-champions/dungeon-champion-start/dungeon-champion-start.module.code.ts"
import { initItemBrowser } from "akasha/temper/item-browser/item-browser-start/item-browser-start.module.code.ts"
import { initLoreBooks } from "akasha/temper/lorebooks/lorebooks-init/lorebooks-init.module.code.ts"
import { initLostTreasure } from "akasha/temper/lost-treasure/lost-treasure-start/lost-treasure-start.module.code.ts"
import { initSkyShards } from "akasha/temper/temper-skyshards/skyshards-start/skyshards-start.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  initSkyShards()
  initLoreBooks()
  initLostTreasure()
  initDungeonChampions()
  initItemBrowser()
  return undefined
}
