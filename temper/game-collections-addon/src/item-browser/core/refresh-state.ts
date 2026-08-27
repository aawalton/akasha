let initialized = 0
let dirtiness = 0
let alwaysRefreshOnShow = false

export function getInitialized(this: void): number {
  return initialized
}

export function setInitialized(this: void, value: number): undefined {
  initialized = value
  return undefined
}

export function getDirtiness(this: void): number {
  return dirtiness
}

export function setDirtiness(this: void, value: number): undefined {
  dirtiness = value
  return undefined
}

export function getAlwaysRefreshOnShow(this: void): boolean {
  return alwaysRefreshOnShow
}

export function setAlwaysRefreshOnShow(this: void, value: boolean): undefined {
  alwaysRefreshOnShow = value
  return undefined
}
