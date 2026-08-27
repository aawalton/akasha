import type { PortToFriendMenuHolder } from "./state-types"

function asPortToFriendMenuHolder(value: unknown): PortToFriendMenuHolder {
  return value as PortToFriendMenuHolder
}

export const PortToFriendMenu: PortToFriendMenuHolder = asPortToFriendMenuHolder({
  name: "PortToFriendMenu",
  lam: {
    panel: undefined,
    panelData: {
      type: "panel",
      name: "|c4592FFPort to Friend's House|r",
      registerForRefresh: true,
      registerForDefaults: false,
    },
  },
})
