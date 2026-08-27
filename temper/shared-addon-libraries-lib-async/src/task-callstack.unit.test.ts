import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test"
import { asFuncOfTask, asTaskInstance } from "./casts"
import type { FuncOfTask, TaskInstance } from "./types"

let taskProto: { Call: TaskInstance["Call"]; Then: TaskInstance["Then"] }
let S: {
  current: TaskInstance | undefined
  currentStackIndex: number
}

beforeAll(async () => {
  Reflect.set(globalThis, "EVENT_MANAGER", {})
  Reflect.set(globalThis, "LibDebugLogger", undefined)
  Reflect.set(globalThis, "df", () => {})
  Reflect.set(globalThis, "GetFrameTimeSeconds", () => 0)
  Reflect.set(globalThis, "ZO_InitializingCallbackObject", {
    Subclass: () => ({}),
    New: (self: object) => self,
  })

  const state = await import("./state")
  S = state.S
  const taskClass = await import("./task-class")
  taskProto = taskClass.taskProto
  await import("./task-callstack")
})

afterAll(() => {
  for (const key of [
    "EVENT_MANAGER",
    "LibDebugLogger",
    "df",
    "GetFrameTimeSeconds",
    "ZO_InitializingCallbackObject",
  ]) {
    Reflect.deleteProperty(globalThis, key)
  }
})

afterEach(() => {
  S.current = undefined
  S.currentStackIndex = 0
})

function entry(this: void): undefined {}

function makeTask(callstack: FuncOfTask[], lastCallIndex: number): TaskInstance {
  return asTaskInstance({
    name: "T",
    callstack,
    lastCallIndex,
    Call: taskProto.Call,
    Then: taskProto.Then,
    Resume(this: TaskInstance): TaskInstance {
      return this
    },
  })
}

describe("task:Call (table.insert → splice / unshift)", () => {
  test("current task: inserts before the incremented 1-based lastCallIndex", () => {
    const e0 = asFuncOfTask(entry)
    const e1 = asFuncOfTask(entry)
    const f = asFuncOfTask(entry)
    const self = makeTask([e0, e1], 1)
    S.current = self

    self.Call(f)

    expect(self.lastCallIndex).toBe(2)
    expect(self.callstack).toEqual([e0, f, e1])
  })

  test("other task: prepends at the front and still increments lastCallIndex", () => {
    const e0 = asFuncOfTask(entry)
    const e1 = asFuncOfTask(entry)
    const f = asFuncOfTask(entry)
    const self = makeTask([e0, e1], 5)
    S.current = makeTask([], 0)

    self.Call(f)

    expect(self.lastCallIndex).toBe(6)
    expect(self.callstack).toEqual([f, e0, e1])
  })
})

describe("task:Then (table.insert → splice / unshift)", () => {
  test("current task, non-degrade: inserts before the 1-based lastCallIndex", () => {
    const e0 = asFuncOfTask(entry)
    const e1 = asFuncOfTask(entry)
    const f = asFuncOfTask(entry)
    const self = makeTask([e0, e1], 2)
    S.current = self
    S.currentStackIndex = 1

    self.Then(f)

    expect(self.lastCallIndex).toBe(2)
    expect(self.callstack).toEqual([e0, f, e1])
  })

  test("current task, first Then degrades to Call", () => {
    const e0 = asFuncOfTask(entry)
    const f = asFuncOfTask(entry)
    const self = makeTask([e0], 0)
    S.current = self
    S.currentStackIndex = 0

    self.Then(f)

    expect(self.lastCallIndex).toBe(1)
    expect(self.callstack).toEqual([f, e0])
  })

  test("other task, non-degrade: prepends and increments lastCallIndex", () => {
    const e0 = asFuncOfTask(entry)
    const e1 = asFuncOfTask(entry)
    const f = asFuncOfTask(entry)
    const self = makeTask([e0, e1], 3)
    S.current = makeTask([], 0)

    self.Then(f)

    expect(self.lastCallIndex).toBe(4)
    expect(self.callstack).toEqual([f, e0, e1])
  })

  test("other task, first Then (lastCallIndex 0) degrades to Call", () => {
    const f = asFuncOfTask(entry)
    const self = makeTask([], 0)
    S.current = makeTask([], 0)

    self.Then(f)

    expect(self.lastCallIndex).toBe(1)
    expect(self.callstack).toEqual([f])
  })
})
