import { initIcTheNextBoss } from "./ic-the-next-boss/init"

export function OnAddOnLoaded(this: void): undefined {
  initIcTheNextBoss()
  return undefined
}
