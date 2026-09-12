import { expect, test } from "bun:test"
import {
  armedTimer,
  type Timers,
} from "akasha/utils/timing/modules/armed-timer/armed-timer.module.code.ts"

const SPAN_MS = 3500

const NEVER_MS = 2_147_483_647

type Clock = {
  readonly timers: Timers
  readonly spans: readonly number[]
  readonly fire: () => undefined
  readonly pending: () => boolean
  readonly cleared: () => number
}

function heldClock(): Clock {
  let held: (() => void) | null = null
  let handle: ReturnType<typeof setTimeout> | null = null
  let cleared = 0
  const spans: number[] = []
  const timers: Timers = {
    set: (fn, ms) => {
      held = fn
      spans.push(ms)
      handle = setTimeout(() => undefined, NEVER_MS)
      return handle
    },
    clear: (given) => {
      cleared += 1
      clearTimeout(given)
      held = null
      handle = null
    },
  }
  return {
    timers,
    spans,
    fire: (): undefined => {
      const run = held
      if (handle != null) clearTimeout(handle)
      held = null
      handle = null
      run?.()
    },
    pending: () => held !== null,
    cleared: () => cleared,
  }
}

test("nothing is pending until the timer is armed", () => {
  const clock = heldClock()
  armedTimer(SPAN_MS, () => undefined, clock.timers)
  expect(clock.pending()).toBe(false)
})

test("a reset restarts the whole span", () => {
  const clock = heldClock()
  const timer = armedTimer(SPAN_MS, () => undefined, clock.timers)
  timer.reset()
  timer.reset()
  expect(clock.spans).toEqual([SPAN_MS, SPAN_MS])
})

test("arming again clears the timeout pending rather than adding a second one", () => {
  const clock = heldClock()
  const timer = armedTimer(SPAN_MS, () => undefined, clock.timers)
  timer.reset()
  timer.reset()
  expect(clock.cleared()).toBe(1)
  expect(clock.pending()).toBe(true)
})

test("a timeout that fires is no longer pending before the caller's act runs", () => {
  const clock = heldClock()
  let sawPending = true
  const timer = armedTimer(
    SPAN_MS,
    () => {
      sawPending = clock.pending()
    },
    clock.timers
  )
  timer.reset()
  clock.fire()
  expect(sawPending).toBe(false)
})

test("arming again after a fire is the caller's own act", () => {
  const clock = heldClock()
  let ran = 0
  const timer = armedTimer(SPAN_MS, () => (ran += 1), clock.timers)
  timer.reset()
  clock.fire()
  expect(ran).toBe(1)
  expect(clock.pending()).toBe(false)
  timer.arm()
  expect(clock.pending()).toBe(true)
})

test("stopping clears the timeout pending", () => {
  const clock = heldClock()
  const timer = armedTimer(SPAN_MS, () => undefined, clock.timers)
  timer.reset()
  timer.stop()
  expect(clock.pending()).toBe(false)
  expect(clock.cleared()).toBe(1)
})

test("a reset after a stop arms nothing", () => {
  const clock = heldClock()
  const timer = armedTimer(SPAN_MS, () => undefined, clock.timers)
  timer.stop()
  timer.reset()
  expect(clock.pending()).toBe(false)
  expect(clock.spans).toEqual([])
})

test("whether a timer is stopped is answered to the caller", () => {
  const clock = heldClock()
  const timer = armedTimer(SPAN_MS, () => undefined, clock.timers)
  expect(timer.isStopped()).toBe(false)
  timer.stop()
  expect(timer.isStopped()).toBe(true)
})

test("a timer stopped while its act runs arms nothing further", () => {
  const clock = heldClock()
  let ran = 0
  const timer = armedTimer(
    SPAN_MS,
    () => {
      ran += 1
      timer.stop()
      if (!timer.isStopped()) timer.arm()
    },
    clock.timers
  )
  timer.reset()
  clock.fire()
  expect(ran).toBe(1)
  expect(clock.pending()).toBe(false)
})
