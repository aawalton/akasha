import type { BrowserWindowHandle } from "../inventory-browser-window/inventory-browser-window.module.code.ts"

const DOCKED_SCENES: readonly string[] = [
  "inventory",
  "bank",
  "guildBank",
  "tradinghouse",
  "smithing",
  "alchemy",
  "stables",
  "trade",
]

export function registerBrowserScene(
  handle: BrowserWindowHandle,
  refresh: () => undefined
): undefined {
  for (const sceneName of DOCKED_SCENES) {
    const scene: Scene | undefined = SCENE_MANAGER.GetScene(sceneName)
    if (scene === undefined) {
      continue
    }
    scene.RegisterCallback("StateChange", (_oldState: number, newState: number): undefined => {
      if (newState === SCENE_SHOWN) {
        handle.showDocked()
        refresh()
      } else if (newState === SCENE_HIDDEN) {
        handle.hide()
      }
    })
  }
}
