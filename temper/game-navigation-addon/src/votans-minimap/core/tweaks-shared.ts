import { asMiniMapPanAndZoom } from "../casts"
import { panZoom } from "./shared"

export function zoomDone(this: void): boolean {
  const pz = panZoom()
  return (
    pz.targetNormalizedZoom == null &&
    pz.pendingPanToPinZoomMode == null &&
    !!asMiniMapPanAndZoom(pz).CanInitializeMap()
  )
}

export interface WayshrineCell {
  node: number | undefined
}
