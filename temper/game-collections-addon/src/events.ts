import { initDungeonChampions } from "./dungeon-champions/init"
import { initItemBrowser } from "./item-browser/init"
import { initLoreBooks } from "./lorebooks/init"
import { initLostTreasure } from "./losttreasure/init"
import { initSkyShards } from "./skyshards/init"

export function OnAddOnLoaded(this: void): undefined {
  initSkyShards()
  initLoreBooks()
  initLostTreasure()
  initDungeonChampions()
  initItemBrowser()
  return undefined
}
