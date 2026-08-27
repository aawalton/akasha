import {
  buildStepCompleteReport,
  buildStepStartedReport,
  buildStepStartedReportFallback,
  isoEpoch,
  type StepTerminalStatus,
} from "./report-payload.ts"

const PLACEHOLDER_POD_NAME = ""
const TERMINAL_STATUS_SENTINEL: StepTerminalStatus = "passed"
const EXIT_CODE_SENTINEL = -987654321

export function buildStartedBodyTemplate(): string {
  const placeholderTimestamp = isoEpoch()
  return JSON.stringify(
    buildStepStartedReport({
      podName: PLACEHOLDER_POD_NAME,
      startedAt: placeholderTimestamp,
    })
  )
    .replace('"container-name":""', '"container-name":"@@POD_NAME@@"')
    .replace(`"started-at":"${placeholderTimestamp}"`, '"started-at":"@@STARTED_AT@@"')
}

export function buildStartedBodyTemplateFallback(): string {
  const placeholderTimestamp = isoEpoch()
  return JSON.stringify(
    buildStepStartedReportFallback({
      podName: PLACEHOLDER_POD_NAME,
      startedAt: placeholderTimestamp,
    })
  )
    .replace('"container-name":""', '"container-name":"@@POD_NAME@@"')
    .replace(`"started-at":"${placeholderTimestamp}"`, '"started-at":"@@STARTED_AT@@"')
}

export function buildCompleteBodyTemplate(): string {
  const placeholderTimestamp = isoEpoch()
  return JSON.stringify(
    buildStepCompleteReport({
      status: TERMINAL_STATUS_SENTINEL,
      exitCode: EXIT_CODE_SENTINEL,
      completedAt: placeholderTimestamp,
    })
  )
    .replace(`"status":"${TERMINAL_STATUS_SENTINEL}"`, '"status":"@@TERMINAL_STATUS@@"')
    .replace(`"exit-code":${EXIT_CODE_SENTINEL}`, '"exit-code":@@EXIT_CODE@@')
    .replace(`"completed-at":"${placeholderTimestamp}"`, '"completed-at":"@@COMPLETED_AT@@"')
}
