import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import { requireAt } from "@akasha/utils-narrow/require-at"

interface BatchConfig<T> {
  items: T[]
  batchSize: number
  batchDelay: number
  process: (this: void, item: T) => void
  onComplete: (this: void) => void
}

export function runBatched<T>(config: BatchConfig<T>): undefined {
  let index = 0
  function processNextBatch(this: void): undefined {
    const end = math.min(index + config.batchSize, config.items.length)
    for (; index < end; index++) {
      config.process(requireAt(config.items, index, "batched item"))
    }
    if (index < config.items.length) {
      zo_callLater(processNextBatch, config.batchDelay)
    } else {
      config.onComplete()
    }
  }
  processNextBatch()
}
