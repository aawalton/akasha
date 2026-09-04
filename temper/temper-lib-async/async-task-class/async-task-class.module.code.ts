import { asTaskInstance } from "../async-casts/async-casts.module.code.ts"
import { JOBS, lib, S } from "../async-state/async-state.module.code.ts"
import type { FuncOfTask, TaskClass, TaskInstance } from "../async-types/async-types.module.code.ts"

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
  JOBS[this.name] = this
  return this
}

taskProto.Suspend = function (this: TaskInstance): TaskInstance {
  JOBS[this.name] = undefined
  return this
}

taskProto.Cancel = function (this: TaskInstance): TaskInstance {
  ZO_ClearNumericallyIndexedTable(this.callstack)
  this.lastCallIndex = 0
  if (JOBS[this.name] !== undefined) {
    if (this.finally === undefined) {
      JOBS[this.name] = undefined
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
