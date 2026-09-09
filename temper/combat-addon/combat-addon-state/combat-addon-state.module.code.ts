let PLAYER_NAME = ""
let IN_COMBAT = false

export function getPlayername(): string {
  return PLAYER_NAME
}

export function setPlayername(value: string): undefined {
  PLAYER_NAME = value
  return undefined
}

export function isInCombat(): boolean {
  return IN_COMBAT
}

export function setInCombat(value: boolean): undefined {
  IN_COMBAT = value
  return undefined
}

let INITIALIZED = false

export function isInitialized(): boolean {
  return INITIALIZED
}

export function setInitialized(value: boolean): undefined {
  INITIALIZED = value
  return undefined
}
