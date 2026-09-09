import { bGHUDMoveable, bGHUDReset } from "../fco-battleground/fco-battleground.module.code.ts"
import type { AddonSettings } from "../fco-types/fco-types.module.code.ts"

export function buildBattlegroundControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  return [
    { type: "header", name: "Battleground" },
    {
      type: "checkbox",
      name: "Make HUD movable",
      tooltip: "Enable the mouse drag&drop move of the battleground HUD",
      getFunc: () => settings.enableBGHUDMoveable === true,
      setFunc: (value) => {
        settings.enableBGHUDMoveable = value
        bGHUDMoveable()
      },
      default: defaults.enableBGHUDMoveable === true,
      width: "full",
    },
    {
      type: "button",
      name: "Reset x & y",
      tooltip: "Reset the x & y coordinates of the battleground HUD to their default values",
      func: () => {
        bGHUDReset()
      },
      isDangerous: true,
      width: "full",
      warning: "Do you really want to reset the x & y coordinates?",
    },
  ]
}
