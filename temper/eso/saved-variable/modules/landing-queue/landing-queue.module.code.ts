import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"

export type Landing<Item> = (items: readonly Item[]) => Promise<unknown>

export type LandingQueue<Item> = {
  readonly add: (items: readonly Item[]) => undefined
  readonly drained: () => Promise<undefined>
}

export function landingQueueOf<Item>(
  land: Landing<Item>,
  report: (line: string) => undefined
): LandingQueue<Item> {
  const waiting: Item[] = []
  let running: Promise<undefined> | null = null
  async function drain(): Promise<undefined> {
    await Promise.resolve()
    while (waiting.length > 0) {
      const taken = waiting.splice(0)
      try {
        await land(taken)
      } catch (thrown) {
        waiting.unshift(...taken)
        report(`a landing failed, and its ${taken.length} wait for the next: ${saidBy(thrown)}`)
        break
      }
    }
    running = null
    return undefined
  }
  return {
    add: (items) => {
      waiting.push(...items)
      if (running === null && waiting.length > 0) running = drain()
      return undefined
    },
    drained: () => running ?? Promise.resolve(undefined),
  }
}
