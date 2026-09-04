import {
  type CollapseTable,
  collapse,
  folds,
  refuses,
  type Sealed,
  seal,
} from "@akasha/utils-narrow/collapse"

export type PidReading = "signalable" | "no-such-process" | "exists-not-permitted" | "unknown"

export type PidSignalReading = Sealed<PidReading>

export type PidSignalFailure = Exclude<PidReading, "signalable">

export function errnoCodeOf(err: unknown): string | undefined {
  if (err === null || typeof err !== "object" || !("code" in err)) return undefined
  const { code } = err
  return typeof code === "string" ? code : undefined
}

export function classifyPidSignalError(err: unknown): Sealed<PidSignalFailure> {
  const errno = errnoCodeOf(err)
  if (errno === "ESRCH") return seal("no-such-process", undefined)
  if (errno === "EPERM") return seal("exists-not-permitted", err)
  return seal("unknown", err)
}

export function readPidSignal(pid: number): PidSignalReading {
  try {
    process.kill(pid, 0)
    return seal("signalable", undefined)
  } catch (err) {
    return classifyPidSignalError(err)
  }
}

const PID_ALIVE_READINGS: Omit<CollapseTable<PidReading, boolean>, "unknown"> = {
  signalable: folds(true, "the pid answers signal 0"),
  "exists-not-permitted": folds(
    true,
    "the pid exists and is merely another uid's, so the process is there whoever owns it"
  ),
  "no-such-process": folds(false, "the only reading that proves the process is gone"),
}

export function pidAliveOrRefuse(pid: number): boolean {
  return collapse(readPidSignal(pid), {
    ...PID_ALIVE_READINGS,
    unknown: refuses(
      "this is a liveness verdict, where a false `dead` flips a live row, releases its claim, and reports a crash that did not happen; a failed observation must not reach the caller wearing the same `false` a real ESRCH does"
    ),
  })
}

export function pidAliveOrAssumeAlive(pid: number): boolean {
  return collapse(readPidSignal(pid), {
    ...PID_ALIVE_READINGS,
    unknown: folds(
      true,
      "this collapse folds toward ALIVE, and it is right here: the caller is an escalating terminate loop, where reading a live process as dead abandons the SIGKILL and leaves the runaway alive, while reading a dead one as alive costs one tolerated ESRCH on a signal that no longer lands. The asymmetry runs the opposite way to the liveness decider's because the consequence does"
    ),
  })
}

export function pidAliveOrAssumeDead(pid: number): boolean {
  return collapse(readPidSignal(pid), {
    ...PID_ALIVE_READINGS,
    unknown: folds(
      false,
      "PRESERVED, not endorsed: an unreadable probe presents as a stopped daemon, so `start` would boot a second one, and at a lock it presents as a dead holder, so the lock is stolen and a second run stacks on the first. That is a policy question for each caller's owner and deliberately not settled here"
    ),
  })
}
