import { PortToFriend as holder } from "./state"

declare global {
  var PortToFriend: import("./holder-types").PortToFriendHolder
}

globalThis.PortToFriend = holder
