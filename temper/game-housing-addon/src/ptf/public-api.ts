import { PortToFriend as holder } from "./state"

declare global {
  var PortToFriend: import("./state").PortToFriendHolder
}

globalThis.PortToFriend = holder
