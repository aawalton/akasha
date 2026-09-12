let INITIALIZED = 0
let DIRTINESS = 0
let ALWAYS_REFRESH_ON_SHOW = false

export function getInitialized(this: void): number {
  return INITIALIZED
}

export function setInitialized(this: void, value: number): undefined {
  INITIALIZED = value
  return undefined
}

export function getDirtiness(this: void): number {
  return DIRTINESS
}

export function setDirtiness(this: void, value: number): undefined {
  DIRTINESS = value
  return undefined
}

export function getAlwaysRefreshOnShow(this: void): boolean {
  return ALWAYS_REFRESH_ON_SHOW
}

export function setAlwaysRefreshOnShow(this: void, value: boolean): undefined {
  ALWAYS_REFRESH_ON_SHOW = value
  return undefined
}
