export interface MapPinsState {
  pinManager: WorldMapPinManager | undefined
  updatingMapPin: Record<number, boolean | number>
  updatingCompassPin: Record<number, boolean>
  pinId: Record<number, number>
  chestsRange: number
  chestsLooted: number
  lastAchivement: number
  psijicSkillLine: number
}

export const state: MapPinsState = {
  pinManager: undefined,
  updatingMapPin: {},
  updatingCompassPin: {},
  pinId: {},
  chestsRange: 0.08,
  chestsLooted: 0,
  lastAchivement: 0,
  psijicSkillLine: 4,
}

export function getPinManager(this: void): WorldMapPinManager {
  const pm = state.pinManager
  if (pm === undefined) {
    throw new Error("TemperMapPins: pin manager accessed before OnLoad")
  }
  return pm
}

export function getPinTypeId(this: void, i: number): number {
  const id = state.pinId[i]
  if (id === undefined) {
    throw new Error("TemperMapPins: pin-type id read before OnLoad registration")
  }
  return id
}
