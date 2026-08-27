import { RepairStored } from "../core/player-state"
import { UpdatePanelIcon } from "../core/research-grid"
import type { AccountOptions } from "../data/account-init"
import type { LangSuboptions } from "../lang/lang-table"
import { state } from "../state"

type DropdownOptionName =
  | "overviewstyle"
  | "timeralarm"
  | "mountalarm"
  | "researchalarm"
  | "sortsets"
  | "sortstyles"

export function UpdateGridPerSettings(): undefined {
  for (const [craft, storeCraft] of pairs(state.Account.crafting.stored)) {
    for (const [line, storeLine] of pairs(storeCraft)) {
      for (const [trait] of pairs(storeLine)) {
        UpdatePanelIcon(craft, line, trait)
      }
    }
  }
  RepairStored()
}

export function SettingsUpdate<K extends keyof AccountOptions>(
  setname: K,
  setval: AccountOptions[K]
): undefined {
  state.Account.options[setname] = setval
}

export function SettingFromIndex(setname: keyof LangSuboptions, setval: number): string {
  return (
    state.Loc.suboptions[setname][setval - 1] ?? error("TemperCrafting: unknown suboption index")
  )
}

export function DropdownSettingsUpdate(
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
  for (const [k, v] of ipairs(state.Loc.suboptions[subname])) {
    index[v] = k
  }
  state.Account.options[setname] = index[setval] ?? error("TemperCrafting: unknown dropdown choice")
}
