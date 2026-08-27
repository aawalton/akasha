import { initLeads } from "./leads/init"

export function OnAddOnLoaded(this: void): undefined {
  initLeads()
  return undefined
}
