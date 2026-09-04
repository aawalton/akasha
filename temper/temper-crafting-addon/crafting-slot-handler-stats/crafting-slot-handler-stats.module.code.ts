let COUNT = 0
let TOTAL_MS = 0

export interface SlotHandlerStats {
  count: number
  totalMs: number
}

function getSlotHandlerStats(this: void): SlotHandlerStats {
  return { count: COUNT, totalMs: TOTAL_MS }
}

export function timed<A extends unknown[]>(
  fn: (this: void, ...args: A) => undefined
): (this: void, ...args: A) => undefined {
  return function (this: void, ...args: A): undefined {
    const start = GetGameTimeMilliseconds()
    fn(...args)
    COUNT = COUNT + 1
    TOTAL_MS = TOTAL_MS + (GetGameTimeMilliseconds() - start)
  }
}

const g: Record<string, unknown> = globalThis
g["TemperCrafting_GetSlotHandlerStats"] = getSlotHandlerStats
