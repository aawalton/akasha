import { MIN_DELAY_FOR_ASYNC } from "./constants"
import { luaTruthy } from "./lua-truthy"
import { EM } from "./state"
import { taskProto } from "./task-class"
import type { FuncOfTask, TaskInstance, WaitFunc } from "./types"

taskProto.Delay = function (
  this: TaskInstance,
  delay: number,
  funcOfTask: FuncOfTask
): TaskInstance {
  this.StopTimer()
  if (delay < MIN_DELAY_FOR_ASYNC) {
    return this.Call(funcOfTask)
  }
  this.Suspend()

  const id = `AsyncDelay${tostring(this)}`
  this.currentCallLaterId = id

  EM.RegisterForUpdate(id, delay, (): undefined => {
    EM.UnregisterForUpdate(id)
    this.currentCallLaterId = undefined
    this.Call(funcOfTask)
  })
  return this
}

taskProto.ThenDelay = function (
  this: TaskInstance,
  delay: number,
  funcOfTask: FuncOfTask
): TaskInstance {
  this.Then((innerTask: TaskInstance): undefined => {
    innerTask.Delay(delay, funcOfTask)
  })
  return this
}

taskProto.WaitUntil = function (this: TaskInstance, funcOfTask: WaitFunc): TaskInstance {
  this.Then((innerTask: TaskInstance): boolean => {
    innerTask.oncePerFrame = !luaTruthy(funcOfTask(innerTask))
    return innerTask.oncePerFrame
  })
  return this.Resume()
}

taskProto.StopTimer = function (this: TaskInstance): TaskInstance {
  if (this.currentCallLaterId !== undefined) {
    EM.UnregisterForUpdate(this.currentCallLaterId)
    this.currentCallLaterId = undefined
  }
  return this
}
