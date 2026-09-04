export interface RecentCache {
  bump: (this: void, key: string, now: number) => number
  count: (this: void, key: string, now: number) => number
}

export function createRecentCache(windowMs: number, buckets: number): RecentCache {
  const num = buckets
  const unit = Math.floor(windowMs / num)

  const data = new Map<number, Map<string, number>>()
  let offset = 0

  const roll = (now: number): undefined => {
    if (unit <= 0) {
      offset = now
      return undefined
    }
    const newOffset = Math.floor(now / unit)
    const shift = newOffset - offset
    if (shift > 0) {
      const next = new Map<number, Map<string, number>>()
      for (let i = num; i >= 1; i--) {
        const from = i - shift
        if (from > 0) {
          const src = data.get(from)
          if (src !== undefined) {
            next.set(i, src)
          }
        }
      }
      data.clear()
      for (const [i, slot] of next) {
        data.set(i, slot)
      }
      offset = newOffset
    }
    return undefined
  }

  const readCount = (key: string, now: number): number => {
    roll(now)
    let result = 0
    for (let index = 1; index <= num; index++) {
      const slot = data.get(index)
      if (slot !== undefined) {
        const v = slot.get(key)
        if (v !== undefined) {
          result += v
        }
      }
    }
    return result
  }

  const bump = (key: string, now: number): number => {
    roll(now)
    let slot = data.get(1)
    if (slot === undefined) {
      slot = new Map<string, number>()
      data.set(1, slot)
    }
    const existing = slot.get(key)
    slot.set(key, existing !== undefined ? existing + 1 : 1)
    let result = 0
    for (let index = 1; index <= num; index++) {
      const s = data.get(index)
      if (s !== undefined) {
        const v = s.get(key)
        if (v !== undefined) {
          result += v
        }
      }
    }
    return result
  }

  return {
    bump,
    count: readCount,
  }
}
