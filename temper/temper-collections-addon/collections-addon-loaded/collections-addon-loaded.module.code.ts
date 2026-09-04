import { initDungeonChampions } from "@akasha/temper-dungeon-champions/dungeon-champion-start"
import { initItemBrowser } from "@akasha/temper-item-browser/start"
import { initLoreBooks } from "@akasha/temper-lorebooks/init"
import { initLostTreasure } from "@akasha/temper-lost-treasure/start"
import { initSkyShards } from "@akasha/temper-skyshards/start"

export function onAddOnLoaded(this: void): undefined {
  initSkyShards()
  initLoreBooks()
  initLostTreasure()
  initDungeonChampions()
  initItemBrowser()
  return undefined
}
