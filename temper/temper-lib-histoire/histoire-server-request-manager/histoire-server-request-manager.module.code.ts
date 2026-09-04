import type { GuildHistoryServerRequestInstance } from "../histoire-server-request/histoire-server-request.module.code.ts"
import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger

const WATCHDOG_INTERVAL = 30 * 1000

type CallLaterFn = (cb: () => void, ms: number) => number
function asCallLaterFn(value: unknown): CallLaterFn {
  return value as CallLaterFn
}

interface ManagedRequest extends GuildHistoryServerRequestInstance {
  requestId?: number
}

export interface GuildHistoryServerRequestManagerInstance {
  saveData: unknown
  requestQueue: ManagedRequest[]
  cleanUpQueue: ManagedRequest[]
  watchdog?: string
  handle?: number
  lastRequestSendTime?: number

  Initialize: (this: GuildHistoryServerRequestManagerInstance, saveData: unknown) => void
  StartWatchdog: (this: GuildHistoryServerRequestManagerInstance) => void
  StopWatchdog: (this: GuildHistoryServerRequestManagerInstance) => void
  QueueRequest: (
    this: GuildHistoryServerRequestManagerInstance,
    request: ManagedRequest | undefined,
    skipRequestSendNext?: boolean
  ) => void
  RemoveRequest: (this: GuildHistoryServerRequestManagerInstance, request: ManagedRequest) => void
  RequestSendNext: (this: GuildHistoryServerRequestManagerInstance) => void
  SendNext: (this: GuildHistoryServerRequestManagerInstance) => boolean
  LogTimeSinceLastRequest: (
    this: GuildHistoryServerRequestManagerInstance,
    wasSent: boolean
  ) => void
  HasPendingRequests: (this: GuildHistoryServerRequestManagerInstance) => boolean
  CleanUp: (this: GuildHistoryServerRequestManagerInstance) => void
  Shutdown: (this: GuildHistoryServerRequestManagerInstance) => void
  GetDebugInfo: (this: GuildHistoryServerRequestManagerInstance) => Record<string, unknown>
}

export interface GuildHistoryServerRequestManagerClass
  extends GuildHistoryServerRequestManagerInstance {
  New: (
    this: GuildHistoryServerRequestManagerClass,
    saveData: unknown
  ) => GuildHistoryServerRequestManagerInstance
}

const GuildHistoryServerRequestManager =
  ZO_InitializingObject.Subclass<GuildHistoryServerRequestManagerClass>()
internal.class.GuildHistoryServerRequestManager = GuildHistoryServerRequestManager

GuildHistoryServerRequestManager.Initialize = function (this, saveData) {
  this.saveData = saveData
  this.requestQueue = []
  this.cleanUpQueue = []
}

GuildHistoryServerRequestManager.StartWatchdog = function (this) {
  if (this.watchdog != null) {
    return
  }
  logger.Debug("Start Watchdog")

  this.watchdog = internal.RegisterForUpdate(WATCHDOG_INTERVAL, () => {
    logger.Debug("Request Watchdog")
    this.RequestSendNext()
  })
}

GuildHistoryServerRequestManager.StopWatchdog = function (this) {
  if (this.watchdog == null) {
    return
  }
  logger.Debug("Stop Watchdog")
  internal.UnregisterForUpdate(this.watchdog)
  this.watchdog = undefined
}

GuildHistoryServerRequestManager.QueueRequest = function (this, request, skipRequestSendNext) {
  if (request == null || internal.IsGuildHistorySystemDisabled()) {
    return
  }

  if (request.IsDestroyed()) {
    logger.Warn("Attempted to queue destroyed request")
    return
  }

  logger.Debug(
    "Queue request",
    request.cache.key,
    request.GetRequestId(),
    request.newestTime,
    request.oldestTime
  )
  this.requestQueue.push(request)
  request.SetQueued(true)

  this.StartWatchdog()

  if (!skipRequestSendNext) {
    this.RequestSendNext()
  }
}

GuildHistoryServerRequestManager.RemoveRequest = function (this, request) {
  for (const i of $range(1, this.requestQueue.length)) {
    if (this.requestQueue[i - 1] === request) {
      this.requestQueue.splice(i - 1, 1)
      request.SetQueued(false)
      return
    }
  }
}

function removeObsoleteAndGetNextRequest(
  this: void,
  self: GuildHistoryServerRequestManagerInstance
): ManagedRequest | undefined {
  const requests = self.requestQueue
  if (requests.length === 0) {
    return undefined
  }

  for (const i of $range(requests.length, 1, -1)) {
    const request = requests[i - 1]
    if (request == null) {
      continue
    }
    if (!request.ShouldSend()) {
      requests.splice(i - 1, 1)
      self.cleanUpQueue[self.cleanUpQueue.length] = request
    }
  }

  table.sort(requests, (a: ManagedRequest, b: ManagedRequest) => a.GetPriority() < b.GetPriority())

  const request = requests.pop()
  if (request != null) {
    request.SetQueued(false)
    return request
  }
  return undefined
}

GuildHistoryServerRequestManager.RequestSendNext = function (this) {
  if (this.handle != null) {
    return
  }

  const callLater = asCallLaterFn(zo_callLater)
  this.handle = callLater(() => {
    this.handle = undefined
    this.SendNext()
  }, 0)
}

GuildHistoryServerRequestManager.SendNext = function (this) {
  if (this.handle != null) {
    zo_removeCallLater(this.handle)
    this.handle = undefined
  }

  const request = removeObsoleteAndGetNextRequest(this)

  this.CleanUp()

  if (request == null) {
    logger.Debug("No more requests to send")
    this.StopWatchdog()
    return false
  }

  if (internal.IsGuildHistorySystemDisabled()) {
    logger.Warn("Guild history system is disabled - cannot send request")
    request.Destroy()
    return false
  }

  const state = request.Send()
  if (state === GUILD_HISTORY_DATA_READY_STATE_INVALID_REQUEST) {
    logger.Warn("Request is invalid")
    request.Destroy()
    return this.SendNext()
  } else if (state === GUILD_HISTORY_DATA_READY_STATE_ON_COOLDOWN) {
    logger.Debug("Cannot request while on cooldown")
    this.LogTimeSinceLastRequest(false)
    this.QueueRequest(request, true)
    return false
  } else if (state === GUILD_HISTORY_DATA_READY_STATE_READY) {
    logger.Debug("Request already complete")
    request.Destroy()
    return true
  } else if (state === GUILD_HISTORY_DATA_READY_STATE_RESPONSE_PENDING) {
    logger.Debug("Waiting for a response")
    this.LogTimeSinceLastRequest(true)

    if (request.ShouldContinue()) {
      this.QueueRequest(request, true)
    } else {
      this.cleanUpQueue[this.cleanUpQueue.length] = request
    }
    return true
  } else {
    logger.Warn("Unknown state", state)
    request.Destroy()
    return false
  }
}

GuildHistoryServerRequestManager.LogTimeSinceLastRequest = function (this, wasSent) {
  const now = GetTimeStamp()
  if (this.lastRequestSendTime != null) {
    const diff = now - this.lastRequestSendTime
    logger.Info(
      "Time since last automated request",
      diff,
      "seconds",
      diff > 240 ? "- is overdue" : ""
    )
  }
  if (wasSent) {
    this.lastRequestSendTime = now
  }
}

GuildHistoryServerRequestManager.HasPendingRequests = function (this) {
  return DoesGuildHistoryHaveOutstandingRequest()
}

GuildHistoryServerRequestManager.CleanUp = function (this) {
  const cleanUpQueue = this.cleanUpQueue
  this.cleanUpQueue = []
  for (const i of $range(1, cleanUpQueue.length)) {
    const request = cleanUpQueue[i - 1]
    if (request == null) {
      continue
    }
    if (!request.Destroy()) {
      logger.Warn("Failed to destroy request", request.requestId)
      this.cleanUpQueue[this.cleanUpQueue.length] = request
    }
  }
}

GuildHistoryServerRequestManager.Shutdown = function (this) {
  this.StopWatchdog()

  const requestQueue = this.requestQueue
  const cleanUpQueue = this.cleanUpQueue
  logger.Debug("Destroy all requests", requestQueue.length, cleanUpQueue.length)

  for (const i of $range(requestQueue.length, 1, -1)) {
    const request = requestQueue[i - 1]
    if (request == null) {
      continue
    }
    if (!request.Destroy()) {
      logger.Warn("Failed to destroy pending request", request.requestId)
    }
  }

  for (const i of $range(cleanUpQueue.length, 1, -1)) {
    const request = cleanUpQueue[i - 1]
    if (request == null) {
      continue
    }
    if (!request.Destroy()) {
      logger.Warn("Failed to destroy finished request", request.requestId)
    }
  }

  ZO_ClearTable(requestQueue)
  ZO_ClearTable(cleanUpQueue)
}

GuildHistoryServerRequestManager.GetDebugInfo = function (this) {
  const debugInfo: Record<string, unknown> = {}
  debugInfo.timeSinceLastRequest =
    this.lastRequestSendTime != null ? GetTimeStamp() - this.lastRequestSendTime : undefined

  const requests = this.requestQueue
  debugInfo.numRequests = requests.length
  const requestInfos: unknown[] = []
  debugInfo.requests = requestInfos
  table.sort(requests, (a: ManagedRequest, b: ManagedRequest) => a.GetPriority() < b.GetPriority())
  for (const i of $range(requests.length, 1, -1)) {
    const request = requests[i - 1]
    if (request != null) {
      requestInfos[requestInfos.length] = request.GetDebugInfo()
    }
  }

  debugInfo.numCleanUp = this.cleanUpQueue.length
  const cleanUpInfos: unknown[] = []
  debugInfo.cleanUp = cleanUpInfos
  for (const i of $range(1, this.cleanUpQueue.length)) {
    const request = this.cleanUpQueue[i - 1]
    if (request != null) {
      cleanUpInfos[i - 1] = request.GetDebugInfo()
    }
  }
  return debugInfo
}

export { GuildHistoryServerRequestManager }
