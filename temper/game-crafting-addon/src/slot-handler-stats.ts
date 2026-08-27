let count = 0
let totalMs = 0

export interface SlotHandlerStats {
  count: number
  totalMs: number
}

function getSlotHandlerStats(this: void): SlotHandlerStats {
  return { count, totalMs }
}

export function timed<A extends unknown[]>(
  fn: (this: void, ...args: A) => undefined
): (this: void, ...args: A) => undefined {
  return function (this: void, ...args: A): undefined {
    const start = GetGameTimeMilliseconds()
    fn(...args)
    count = count + 1
    totalMs = totalMs + (GetGameTimeMilliseconds() - start)
  }
}

const g: Record<string, unknown> = globalThis
g["TemperCrafting_GetSlotHandlerStats"] = getSlotHandlerStats
