let playername = ""
let inCombat = false

export function getPlayername(): string {
  return playername
}

export function setPlayername(value: string): undefined {
  playername = value
  return undefined
}

export function isInCombat(): boolean {
  return inCombat
}

export function setInCombat(value: boolean): undefined {
  inCombat = value
  return undefined
}

let initialized = false

export function isInitialized(): boolean {
  return initialized
}

export function setInitialized(value: boolean): undefined {
  initialized = value
  return undefined
}
