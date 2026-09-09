import type { AddonSettings } from "../fco-types/fco-types.module.code.ts"

export function buildLootControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  return [
    { type: "header", name: "Loot" },
    {
      type: "checkbox",
      name: "Snap cursor to loot window",
      tooltip: "Snap the cursor automatically to the loot window as it is shown.",
      getFunc: () => settings.snapCursorToLootWindow === true,
      setFunc: (value) => {
        settings.snapCursorToLootWindow = value
      },
      default: defaults.snapCursorToLootWindow === true,
      width: "full",
    },
  ]
}
