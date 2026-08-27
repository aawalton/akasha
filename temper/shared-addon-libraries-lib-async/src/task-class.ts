import { asTaskInstance } from "./casts"
import { jobs, lib, S } from "./state"
import type { FuncOfTask, TaskClass, TaskInstance } from "./types"

export const taskProto: TaskClass = ZO_InitializingCallbackObject.Subclass<TaskClass>()
lib.task = taskProto

taskProto.New = function (this: TaskClass, name?: string): TaskInstance {
  const instance = asTaskInstance(ZO_InitializingCallbackObject.New<TaskInstance>(this))
  instance.name = name ?? tostring(instance)
  instance.Initialize()
  return instance
}

taskProto.Initialize = function (this: TaskInstance): undefined {
  this.callstack = []
  this.lastCallIndex = 0
}

taskProto.Resume = function (this: TaskInstance): TaskInstance {
  S.running = true
  jobs[this.name] = this
  return this
}

taskProto.Suspend = function (this: TaskInstance): TaskInstance {
  jobs[this.name] = undefined
  return this
}

taskProto.Cancel = function (this: TaskInstance): TaskInstance {
  ZO_ClearNumericallyIndexedTable(this.callstack)
  this.lastCallIndex = 0
  if (jobs[this.name] !== undefined) {
    if (this.finally === undefined) {
      jobs[this.name] = undefined
    }
  }
  return this
}

taskProto.Finally = function (this: TaskInstance, funcOfTask: FuncOfTask): TaskInstance {
  this.finally = funcOfTask
  return this
}

taskProto.OnError = function (this: TaskInstance, funcOfTask: FuncOfTask): TaskInstance {
  this.onError = funcOfTask
  return this
}
