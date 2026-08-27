export type Act = "boot" | "refresh" | "terminal-check" | "signal"

export interface Vector {
  readonly label: string
  readonly act: Act
  readonly envRefuses: boolean
  readonly account: string
  readonly outcomeOk: boolean
  readonly outcomeTerminal: boolean
  readonly outcomeHasError: boolean
  readonly clearAnswers: boolean
  readonly markAnswers: boolean
  readonly healthRejects: boolean
  readonly signal: "SIGTERM" | "SIGINT"
  readonly signalTwice: boolean
  readonly flushRefuses: boolean
  readonly stopRefuses: boolean
  readonly removeRefuses: boolean
}

export const REGISTRATION_ACCOUNT = "acct-registration"

const base = {
  act: "boot" as Act,
  envRefuses: false,
  account: REGISTRATION_ACCOUNT,
  outcomeOk: true,
  outcomeTerminal: false,
  outcomeHasError: true,
  clearAnswers: true,
  markAnswers: true,
  healthRejects: false,
  signal: "SIGTERM" as const,
  signalTwice: false,
  flushRefuses: false,
  stopRefuses: false,
  removeRefuses: false,
}

export const VECTORS: readonly Vector[] = [
  { ...base, label: "boot" },
  { ...base, label: "boot-when-the-env-refuses", envRefuses: true },

  { ...base, label: "refresh-ok-clearing-terminal-on-the-registration-account", act: "refresh" },
  {
    ...base,
    label: "refresh-ok-clearing-nothing-on-the-registration-account",
    act: "refresh",
    clearAnswers: false,
  },
  {
    ...base,
    label: "refresh-ok-on-an-account-that-is-not-the-registration-one",
    act: "refresh",
    account: "acct-other",
  },
  {
    ...base,
    label: "refresh-refused-without-going-terminal",
    act: "refresh",
    outcomeOk: false,
  },
  {
    ...base,
    label: "refresh-refused-terminal-and-the-mark-took",
    act: "refresh",
    outcomeOk: false,
    outcomeTerminal: true,
  },
  {
    ...base,
    label: "refresh-refused-terminal-but-the-mark-was-already-set",
    act: "refresh",
    outcomeOk: false,
    outcomeTerminal: true,
    markAnswers: false,
  },
  {
    ...base,
    label: "refresh-refused-terminal-on-an-account-that-is-not-the-registration-one",
    act: "refresh",
    account: "acct-other",
    outcomeOk: false,
    outcomeTerminal: true,
  },
  {
    ...base,
    label: "refresh-refused-carrying-no-error-of-its-own",
    act: "refresh",
    outcomeOk: false,
    outcomeHasError: false,
  },
  {
    ...base,
    label: "refresh-ok-where-every-health-write-refuses",
    act: "refresh",
    healthRejects: true,
  },
  {
    ...base,
    label: "refresh-refused-terminal-where-every-health-write-refuses",
    act: "refresh",
    outcomeOk: false,
    outcomeTerminal: true,
    healthRejects: true,
  },

  { ...base, label: "the-terminal-check-reaches-the-account-set", act: "terminal-check" },

  { ...base, label: "sigterm", act: "signal" },
  { ...base, label: "sigint", act: "signal", signal: "SIGINT" },
  { ...base, label: "sigterm-twice", act: "signal", signalTwice: true },
  { ...base, label: "sigterm-where-the-flush-refuses", act: "signal", flushRefuses: true },
  { ...base, label: "sigterm-where-the-stop-refuses", act: "signal", stopRefuses: true },
  {
    ...base,
    label: "sigterm-where-removing-the-state-file-refuses",
    act: "signal",
    removeRefuses: true,
  },
]

export function vectorNamed(label: string): Vector {
  const found = VECTORS.find((one) => one.label === label)
  if (found === undefined) {
    throw new Error(
      `no vector is called ${label}; the ${VECTORS.length} are ${VECTORS.map((v) => v.label).join(", ")}`
    )
  }
  return found
}
