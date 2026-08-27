export type UpdateCallback = (this: void, now: number) => undefined

const updateCallbacks: UpdateCallback[] = []

export function onEngineUpdate(callback: UpdateCallback): undefined {
  updateCallbacks.push(callback)
}

export function fireEngineUpdate(now: number): undefined {
  for (const callback of updateCallbacks) {
    callback(now)
  }
}
