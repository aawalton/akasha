
export interface Fold<Out> {
  readonly outcome: "value"
  readonly value: Out
  readonly because: string
}

export interface Refusal {
  readonly outcome: "refuse"
  readonly because: string
}

export type Choice<Out> = Fold<Out> | Refusal

export const folds = <Out>(value: Out, because: string): Fold<Out> => ({
  outcome: "value",
  value,
  because,
})

export const refuses = (because: string): Refusal => ({ outcome: "refuse", because })

export type CollapseTable<K extends string, Out> = { readonly [P in K]: Choice<Out> }

export interface Sealed<K extends string> {
  readonly fold: <Out>(table: CollapseTable<K, Out>) => Out
}

export class CollapseRefused extends Error {
  override readonly name = "CollapseRefused"
}

function apply<K extends string, Out>(reading: K, table: CollapseTable<K, Out>, cause: unknown): Out {
  const choice = table[reading]
  if (choice.outcome === "value") return choice.value
  if (cause !== undefined) throw cause
  throw new CollapseRefused(`refused to collapse \`${reading}\` — ${choice.because}`)
}

export const seal = <K extends string>(reading: K, cause: unknown): Sealed<K> => ({
  fold: <Out>(table: CollapseTable<K, Out>): Out => apply(reading, table, cause),
})

export function collapse<K extends string, Out>(
  reading: K | Sealed<K>,
  table: CollapseTable<K, Out>
): Out {
  return typeof reading === "string" ? apply(reading, table, undefined) : reading.fold(table)
}

export type PidReading = "signalable" | "no-such-process" | "exists-not-permitted" | "unknown"

export function errnoCode(err: unknown): string | undefined {
  if (err === null || typeof err !== "object" || !("code" in err)) return undefined
  const { code } = err
  return typeof code === "string" ? code : undefined
}

export function classifyPidSignalError(err: unknown): Sealed<PidReading> {
  const errno = errnoCode(err)
  if (errno === "ESRCH") return seal("no-such-process", undefined)
  if (errno === "EPERM") return seal("exists-not-permitted", err)
  return seal("unknown", err)
}

export function readPidSignal(pid: number): Sealed<PidReading> {
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
