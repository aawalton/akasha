import type { AccountOptions } from "../craft-account-init/craft-account-init.module.code.ts"
import type { LangSuboptions } from "../craft-lang-lang-table/craft-lang-lang-table.module.code.ts"
import { repairStored } from "../craft-player-state/craft-player-state.module.code.ts"
import { updatePanelIcon } from "../craft-research-grid/craft-research-grid.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

type DropdownOptionName =
  | "overviewstyle"
  | "timeralarm"
  | "mountalarm"
  | "researchalarm"
  | "sortsets"
  | "sortstyles"

export function updateGridPerSettings(): undefined {
  for (const [craft, storeCraft] of pairs(STATE.Account.crafting.stored)) {
    for (const [line, storeLine] of pairs(storeCraft)) {
      for (const [trait] of pairs(storeLine)) {
        updatePanelIcon(craft, line, trait)
      }
    }
  }
  repairStored()
}

export function settingsUpdate<K extends keyof AccountOptions>(
  setname: K,
  setval: AccountOptions[K]
): undefined {
  STATE.Account.options[setname] = setval
}

export function settingFromIndex(setname: keyof LangSuboptions, setval: number): string {
  return (
    STATE.Loc.suboptions[setname][setval - 1] ?? error("TemperCrafting: unknown suboption index")
  )
}

export function dropdownSettingsUpdate(
  setname: DropdownOptionName,
  setval: string,
  subname?: keyof LangSuboptions
): undefined {
  if (subname === undefined) {
    if (setname === "overviewstyle" || setname === "sortsets" || setname === "sortstyles") {
      subname = setname
    } else {
      error("TemperCrafting: no suboptions table named " + setname)
    }
  }
  const index: Record<string, number> = {}
  for (const [k, v] of ipairs(STATE.Loc.suboptions[subname])) {
    index[v] = k
  }
  STATE.Account.options[setname] = index[setval] ?? error("TemperCrafting: unknown dropdown choice")
}
