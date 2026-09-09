import {
  asConditionFunc,
  asForMarkerFunc,
  asFuncOfTask,
  asPairsIter,
} from "../async-casts/async-casts.module.code.ts"
import { luaTruthy } from "../async-lua-truthy/async-lua-truthy.module.code.ts"
import { lib, S } from "../async-state/async-state.module.code.ts"
import { taskProto } from "../async-task-class/async-task-class.module.code.ts"
import type {
  ConditionFunc,
  FuncOfTask,
  LoopBodyFunc,
  PairsIter,
  TaskInstance,
} from "../async-types/async-types.module.code.ts"

taskProto.For = function (
  this: TaskInstance,
  p1: unknown,
  p2?: unknown,
  p3?: unknown
): TaskInstance {
  this.Call(
    asFuncOfTask((): LuaMultiReturn<[boolean, unknown, unknown, unknown]> => {
      return $multi(false, p1, p2, p3)
    })
  )
  return this
}

taskProto.While = function (this: TaskInstance, func: ConditionFunc): TaskInstance {
  this.Call(
    asFuncOfTask((): LuaMultiReturn<[boolean, unknown, unknown, unknown]> => {
      return $multi(false, func, "while", undefined)
    })
  )
  return this
}

function forConditionAlreadyFalse(this: void): undefined {}

function continueForward(this: void, index: number, endIndex: number): boolean {
  return index <= endIndex
}

function continueBackward(this: void, index: number, endIndex: number): boolean {
  return index >= endIndex
}

function asyncForWithStep(
  this: void,
  func: LoopBodyFunc,
  index: number,
  endIndex: number,
  step: number | undefined
): FuncOfTask {
  const stepValue = step ?? 1
  if (stepValue === 0) {
    error("step is zero")
  }
  let shouldContinue: (this: void, index: number, endIndex: number) => boolean
  let i = index
  if (stepValue > 0) {
    if (i > endIndex) {
      return asFuncOfTask(forConditionAlreadyFalse)
    }
    shouldContinue = continueForward
  } else {
    if (i < endIndex) {
      return asFuncOfTask(forConditionAlreadyFalse)
    }
    shouldContinue = continueBackward
  }
  return asFuncOfTask((): boolean | undefined => {
    if (func(i) !== lib.BREAK) {
      i = i + stepValue
      return shouldContinue(i, endIndex)
    }
    return undefined
  })
}

function asyncForPairs(
  this: void,
  func: LoopBodyFunc,
  iter: PairsIter,
  list: unknown,
  key: unknown
): FuncOfTask {
  let currentKey = key
  return asFuncOfTask((): boolean => {
    const [nextKey, value] = iter(list, currentKey)
    currentKey = nextKey
    return luaTruthy(nextKey) && func(nextKey, value) !== lib.BREAK
  })
}

function asyncWhile(this: void, bodyFunc: LoopBodyFunc, conditionFunc: ConditionFunc): FuncOfTask {
  return asFuncOfTask((): boolean => {
    if (luaTruthy(conditionFunc())) {
      return bodyFunc() !== lib.BREAK
    }
    return false
  })
}

taskProto.Do = function (this: TaskInstance, func: LoopBodyFunc): TaskInstance {
  const callstackIndex = S.current === this ? this.lastCallIndex : 1
  const [shouldBeFalse, p1, p2, p3] = asForMarkerFunc(this.callstack[callstackIndex - 1])()
  if (!(shouldBeFalse === false && luaTruthy(p1))) {
    error("Do without For")
  }
  this.callstack.splice(callstackIndex - 1, 1)

  let doLoop: FuncOfTask
  if (p2 === "while") {
    doLoop = asyncWhile(func, asConditionFunc(p1))
  } else if (type(p1) === "number") {
    doLoop = asyncForWithStep(
      func,
      p1 as number,
      p2 as number,
      p3 === undefined ? undefined : (p3 as number)
    )
  } else {
    doLoop = asyncForPairs(func, asPairsIter(p1), p2, p3)
  }

  this.lastCallIndex = this.lastCallIndex - 1
  return this.Call(doLoop)
}
