import { BGHUDMoveable, BGHUDReset } from "../battleground"
import type { AddonSettings } from "../types"

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
        BGHUDMoveable()
      },
      default: defaults.enableBGHUDMoveable === true,
      width: "full",
    },
    {
      type: "button",
      name: "Reset x & y",
      tooltip: "Reset the x & y coordinates of the battleground HUD to their default values",
      func: () => {
        BGHUDReset()
      },
      isDangerous: true,
      width: "full",
      warning: "Do you really want to reset the x & y coordinates?",
    },
  ]
}
