import { asFuncOfTask, asTaskInstance } from "../async-casts/async-casts.module.code.ts"
import {
  DEBUG_FREEZE_THRESHOLD_MS,
  DEBUG_TIME_MULTIPLIER,
  VSYNC_FRAME_TIME_MS,
} from "../async-constants/async-constants.module.code.ts"
import { JOBS, lib, S, Warn } from "../async-state/async-state.module.code.ts"
import type { TaskInstance } from "../async-types/async-types.module.code.ts"

function removeCall(job: TaskInstance, callstackIndex: number): undefined {
  job.callstack.splice(callstackIndex - 1, 1)
  job.lastCallIndex = job.callstack.length
}

function safeCall(this: void): unknown {
  return asFuncOfTask(S.call)(asTaskInstance(S.current))
}

function doCallback(job: TaskInstance, callstackIndex: number): undefined {
  S.currentStackIndex = callstackIndex
  const [success, shouldContinue] = pcall(safeCall)
  if (success) {
    if (shouldContinue !== true) {
      removeCall(job, callstackIndex)
    }
  } else {
    job.Error = shouldContinue
    removeCall(job, callstackIndex)

    S.call = job.onError
    if (S.call !== undefined) {
      const [errSuccess, msg] = pcall(safeCall)
      if (!errSuccess) {
        Warn(msg as string)
      }
      ZO_ClearNumericallyIndexedTable(job.callstack)
      job.lastCallIndex = 0
    } else {
      job.Suspend()
      error(job.Error)
    }
  }
}

function doJob(job: TaskInstance): undefined {
  S.current = job
  const index = job.callstack.length
  S.call = job.callstack[index - 1]
  if (S.call !== undefined) {
    doCallback(job, index)
  } else {
    JOBS[job.name] = undefined
    S.call = job.finally
    if (S.call !== undefined) {
      pcall(safeCall)
    }
  }
  S.current = undefined
  S.call = undefined
}

let getConsoleRemainingBudgetSeconds: (this: void) => number
if (ZO_IsConsoleOrGameCoreUI()) {
  const availableMs = GetTotalUserAddOnCPUTimeAvailableEachFrameMS() - 5
  getConsoleRemainingBudgetSeconds = () => {
    const usedNowMs = GetTotalUserAddOnCPUTimeUsedNowMS()
    return zo_max(0, availableMs - usedNowMs) / 1000
  }
} else {
  getConsoleRemainingBudgetSeconds = () => 1
}

export function doMeasure(this: void): undefined {
  let framerate = GetFramerate()
  if (S.jobsDone) {
    framerate = framerate * 1.5
  }
  if (framerate > 65) {
    S.frameTimeTarget = VSYNC_FRAME_TIME_MS
  } else if (framerate > 45) {
    S.frameTimeTarget = 2 * VSYNC_FRAME_TIME_MS
  } else if (framerate > 30) {
    S.frameTimeTarget = 3 * VSYNC_FRAME_TIME_MS
  } else {
    S.frameTimeTarget = 4 * VSYNC_FRAME_TIME_MS
  }
  if (HUD_SCENE.IsShowing() || HUD_UI_SCENE.IsShowing()) {
    S.frameTimeTarget = S.frameTimeTarget * 0.91
  } else {
    S.frameTimeTarget = S.frameTimeTarget * 1.21429
  }
  S.frameTimeTarget = zo_min(1 / S.asyncStallThreshold, S.frameTimeTarget)
  S.spendTime = S.spendTime * 0.8 + S.frameTimeTarget * 0.2
}

interface JobCursor {
  key: unknown
  job: TaskInstance | undefined
}

function advance(key: unknown): JobCursor {
  const [k, j] = next(JOBS, key)
  return { key: k, job: j !== undefined ? asTaskInstance(j) : undefined }
}

function scheduler(this: void): undefined {
  const start = GetFrameTimeSeconds()
  let now = GetGameTimeSeconds()
  lib.frameTimeSeconds = start

  if (!S.running) {
    S.cpuLoad = now - start
    return
  }

  let job: TaskInstance | undefined
  let name: unknown
  let runTime = start

  S.jobsDone = false
  const frameSpendTime = zo_min(S.spendTime - S.nextFrameReduce, getConsoleRemainingBudgetSeconds())

  while (now - start <= frameSpendTime) {
    const cursor = advance(name)
    name = cursor.key
    job = cursor.job
    if (job !== undefined) {
      runTime = now
      doJob(job)
      now = GetGameTimeSeconds()
    } else {
      S.jobsDone = true
      break
    }
  }

  let allOnlyOnce = true
  while (now - start <= frameSpendTime) {
    let cursor = advance(name)
    name = cursor.key
    job = cursor.job
    if (job === undefined) {
      if (allOnlyOnce) {
        S.jobsDone = true
        break
      }
      cursor = advance(undefined)
      name = cursor.key
      job = cursor.job
      allOnlyOnce = true
    }
    if (job !== undefined) {
      if (job.oncePerFrame !== true) {
        allOnlyOnce = false
        runTime = now
        doJob(job)
        now = GetGameTimeSeconds()
      }
    } else {
      const [firstKey] = next(JOBS)
      S.running = firstKey !== undefined
      S.jobsDone = true
      break
    }
  }

  const freezeTime = now - start
  const realFrameTime = start - S.lastStart
  S.nextFrameReduce = zo_min(
    S.frameTimeTarget,
    (S.nextFrameReduce +
      zo_max(
        0,
        freezeTime - frameSpendTime,
        realFrameTime - S.frameTimeTarget,
        1 / GetFramerate() - S.frameTimeTarget
      )) *
      0.5
  )
  if (S.debug && job !== undefined) {
    if (freezeTime >= DEBUG_FREEZE_THRESHOLD_MS) {
      const msg = string.format(
        "%s freeze. allowed: %.3fms, used %.3fms starting at %.3fms, resulting fps %i.",
        job.name,
        frameSpendTime * DEBUG_TIME_MULTIPLIER,
        (now - runTime) * DEBUG_TIME_MULTIPLIER,
        (runTime - start) * DEBUG_TIME_MULTIPLIER,
        1 / freezeTime
      )
      Warn(msg)
    }
  }
  S.lastStart = start
  S.cpuLoad = now - start
}

lib.Scheduler = scheduler
