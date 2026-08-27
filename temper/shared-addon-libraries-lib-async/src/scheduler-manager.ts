import { INIT_DELAY_MS, MAJOR } from "./constants"
import { initSavedVar } from "./saved-vars"
import { doMeasure } from "./scheduler"
import { EM, lib } from "./state"

interface SchedulerManagerState {
  schedulerId: string | undefined
  measureId: string | undefined
  initId: string | undefined
}

const SM: SchedulerManagerState = {
  schedulerId: undefined,
  measureId: undefined,
  initId: undefined,
}

function stopScheduler(this: void): undefined {
  if (SM.schedulerId !== undefined) {
    EM.UnregisterForUpdate(SM.schedulerId)
    SM.schedulerId = undefined
  }
  if (SM.measureId !== undefined) {
    EM.UnregisterForUpdate(SM.measureId)
    SM.measureId = undefined
  }
}

function startScheduler(this: void): undefined {
  stopScheduler()
  SM.measureId = "AsyncSchedulerMeasure"
  EM.RegisterForUpdate(SM.measureId, 100, doMeasure)
  SM.schedulerId = "AsyncScheduler"
  EM.RegisterForUpdate(SM.schedulerId, 0, lib.Scheduler)
}

function initialize(this: void, delay?: number): undefined {
  if (SM.initId !== undefined) {
    EM.UnregisterForUpdate(SM.initId)
  }
  SM.initId = "AsyncInit"
  EM.RegisterForUpdate(SM.initId, delay ?? INIT_DELAY_MS, (): undefined => {
    if (SM.initId !== undefined) {
      EM.UnregisterForUpdate(SM.initId)
    }
    SM.initId = undefined
    startScheduler()
  })
}

const identifier = "ASYNCTASKS_JOBS"

EM.RegisterForEvent(identifier, EVENT_PLAYER_ACTIVATED, (): undefined => {
  EM.UnregisterForEvent(identifier, EVENT_PLAYER_ACTIVATED)
  initialize()
})

SLASH_COMMANDS["/async"] = (command: string): undefined => {
  lib.Slash(command)
}

startScheduler()

function onAddonLoaded(this: void, _event: number, name: string): undefined {
  if (name !== MAJOR) {
    return
  }
  EM.UnregisterForEvent(MAJOR, EVENT_ADD_ON_LOADED)
  initSavedVar()
}

EM.RegisterForEvent(MAJOR, EVENT_ADD_ON_LOADED, onAddonLoaded)
