import { holder, type VotansMiniMap } from "./holder"

declare global {
  var TemperVotansMiniMap: VotansMiniMap
}

globalThis.TemperVotansMiniMap = holder
