import { expect, test } from "bun:test"
import { landingQueueOf } from "akasha/temper/eso/saved-variable/modules/landing-queue/landing-queue.module.code.ts"

function quiet(): undefined {
  return undefined
}

test("what is added while a landing runs lands after it, so nothing added is lost", async () => {
  const landed: number[][] = []
  let entered = (): undefined => undefined
  let release = (): undefined => undefined
  const inFirst = new Promise<undefined>((resolve) => {
    entered = () => {
      resolve(undefined)
      return undefined
    }
  })
  const first = new Promise<undefined>((resolve) => {
    release = () => {
      resolve(undefined)
      return undefined
    }
  })
  let calls = 0
  const queue = landingQueueOf<number>(async (items) => {
    calls += 1
    if (calls === 1) {
      entered()
      await first
    }
    landed.push([...items])
  }, quiet)
  queue.add([1])
  await inFirst
  queue.add([2])
  queue.add([3])
  release()
  await queue.drained()
  expect(landed).toEqual([[1], [2, 3]])
})

test("what a failed landing held waits and lands with what is added next", async () => {
  const landed: number[][] = []
  const said: string[] = []
  let failing = true
  const queue = landingQueueOf<number>(
    async (items) => {
      await Promise.resolve()
      if (failing) {
        failing = false
        throw new Error("page-service is down")
      }
      landed.push([...items])
    },
    (line) => {
      said.push(line)
      return undefined
    }
  )
  queue.add([1])
  await queue.drained()
  expect(landed).toEqual([])
  queue.add([2])
  await queue.drained()
  expect(landed).toEqual([[1, 2]])
  expect(said).toHaveLength(1)
})

test("adding nothing while nothing waits starts no landing", async () => {
  let calls = 0
  const queue = landingQueueOf<number>(async () => {
    calls += 1
    await Promise.resolve()
  }, quiet)
  queue.add([])
  await queue.drained()
  expect(calls).toBe(0)
})
