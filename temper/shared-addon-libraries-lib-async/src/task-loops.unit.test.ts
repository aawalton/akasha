import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test"
import { asFuncOfTask, asTaskInstance } from "./casts"
import type { FuncOfTask, LoopBodyFunc, TaskInstance } from "./types"

let taskProto: { Do: TaskInstance["Do"] }
let S: { current: TaskInstance | undefined }

beforeAll(async () => {
  Reflect.set(globalThis, "EVENT_MANAGER", {})
  Reflect.set(globalThis, "LibDebugLogger", undefined)
  Reflect.set(globalThis, "df", () => {})
  Reflect.set(globalThis, "GetFrameTimeSeconds", () => 0)
  Reflect.set(globalThis, "ZO_InitializingCallbackObject", {
    Subclass: () => ({}),
    New: (self: object) => self,
  })
  Reflect.set(globalThis, "error", (msg: string) => {
    throw new Error(msg)
  })
  Reflect.set(globalThis, "type", (v: unknown) =>
    typeof v === "number" ? "number" : typeof v === "function" ? "function" : "table"
  )

  const state = await import("./state")
  S = state.S
  const taskClass = await import("./task-class")
  taskProto = taskClass.taskProto
  await import("./task-loops")
})

afterAll(() => {
  for (const key of [
    "EVENT_MANAGER",
    "LibDebugLogger",
    "df",
    "GetFrameTimeSeconds",
    "ZO_InitializingCallbackObject",
    "error",
    "type",
  ]) {
    Reflect.deleteProperty(globalThis, key)
  }
})

afterEach(() => {
  S.current = undefined
})

function entry(this: void): undefined {}

function whileMarker(this: void): FuncOfTask {
  const condition = asFuncOfTask(() => true)
  return asFuncOfTask((): unknown[] => [false, condition, "while", undefined])
}

function makeTask(
  callstack: FuncOfTask[],
  lastCallIndex: number,
  captured: { arg?: unknown }
): TaskInstance {
  return asTaskInstance({
    name: "T",
    callstack,
    lastCallIndex,
    Do: taskProto.Do,
    Call(this: TaskInstance, fn: FuncOfTask): TaskInstance {
      captured.arg = fn
      return this
    },
  })
}

const body: LoopBodyFunc = () => undefined

describe("task:Do (table.remove → splice)", () => {
  test("current task: removes the marker at lastCallIndex, decrements lastCallIndex", () => {
    const e0 = asFuncOfTask(entry)
    const marker = whileMarker()
    const captured: { arg?: unknown } = {}
    const self = makeTask([e0, marker], 2, captured)
    S.current = self

    self.Do(body)

    expect(self.callstack).toEqual([e0])
    expect(self.lastCallIndex).toBe(1)
    expect(typeof captured.arg).toBe("function")
  })

  test("other task: removes the marker at index 1, decrements lastCallIndex", () => {
    const e1 = asFuncOfTask(entry)
    const marker = whileMarker()
    const captured: { arg?: unknown } = {}
    const self = makeTask([marker, e1], 7, captured)
    S.current = makeTask([], 0, {})

    self.Do(body)

    expect(self.callstack).toEqual([e1])
    expect(self.lastCallIndex).toBe(6)
    expect(typeof captured.arg).toBe("function")
  })
})
