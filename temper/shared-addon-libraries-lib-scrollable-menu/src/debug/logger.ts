import { asLibDebugLoggerInstance } from "../casts-1a"
import { asLsmCastThisVoidArgsUnknownUndefined } from "../casts-3a"
import { asString } from "../casts-4"
import { lib } from "../lib-state"
import { debugLogMessagePatterns } from "./log-message-patterns"

const MAJOR = lib.name

let LDL: LibDebugLoggerGlobal = LibDebugLogger

const sfor = string.format

const libDebug = lib.Debug

let logger: LibDebugLoggerInstance | undefined
const debugPrefix = lib.Debug.prefix

const LSM_LOGTYPE_DEBUG = libDebug.LSM_LOGTYPE_DEBUG
const LSM_LOGTYPE_VERBOSE = libDebug.LSM_LOGTYPE_VERBOSE
const LSM_LOGTYPE_DEBUG_CALLBACK = libDebug.LSM_LOGTYPE_DEBUG_CALLBACK
const LSM_LOGTYPE_INFO = libDebug.LSM_LOGTYPE_INFO
const LSM_LOGTYPE_ERROR = libDebug.LSM_LOGTYPE_ERROR

const loggerTypeToName = libDebug.loggerTypeToName

function loadLogger(this: void): undefined {
  LDL = LDL ?? LibDebugLogger
  if (lib.logger === undefined && LDL !== undefined) {
    logger = LDL(MAJOR)
    logger.SetEnabled(true)
    logger.Debug("Library loaded")
    logger.verbose = logger.Create("Verbose")
    logger.verbose.SetEnabled(false)

    logger.callbacksFired = logger.Create("Callbacks")

    lib.Debug.logger = logger
  }
}
libDebug.LoadLogger = loadLogger

loadLogger()

export function dlog(
  this: void,
  debugType: number | undefined,
  textId: number | undefined,
  ...args: unknown[]
): undefined {
  if (lib.doDebug === undefined || lib.doDebug === false || textId === undefined) {
    return
  }
  debugType = debugType ?? LSM_LOGTYPE_DEBUG

  let debugText: string | undefined = debugLogMessagePatterns[textId]
  const [packedArgs] = select(1, args)
  if (args[0] !== undefined && packedArgs !== undefined) {
    debugText = sfor(asString(debugText), ...args)
  }
  if (debugText === undefined || debugText === "") {
    return
  }

  if (LDL !== undefined) {
    if (debugType === LSM_LOGTYPE_DEBUG_CALLBACK) {
      asLibDebugLoggerInstance(logger).callbacksFired.Debug(debugText)
    } else if (debugType === LSM_LOGTYPE_DEBUG) {
      asLibDebugLoggerInstance(logger).Debug(debugText)
    } else if (debugType === LSM_LOGTYPE_VERBOSE) {
      if (lib.doVerboseDebug === true) {
        const loggerVerbose = asLibDebugLoggerInstance(logger).verbose
        if (loggerVerbose !== undefined && loggerVerbose.isEnabled === true) {
          loggerVerbose.Verbose(debugText)
        }
      }
    } else if (debugType === LSM_LOGTYPE_INFO) {
      asLibDebugLoggerInstance(logger).Info(debugText)
    } else if (debugType === LSM_LOGTYPE_ERROR) {
      asLibDebugLoggerInstance(logger).Error(debugText)
    }
  } else {
    if (debugType !== LSM_LOGTYPE_VERBOSE) {
      const debugTypePrefix = loggerTypeToName[debugType] ?? ""
      d(debugPrefix + debugTypePrefix + debugText)
    }
  }
}
libDebug.DebugLog = asLsmCastThisVoidArgsUnknownUndefined(dlog)
