
export interface AdoptVector {
  readonly name: string
  readonly standing: unknown
}

export const DEAD_PID = 0x7fff_ffff

export const VALID_CLAUDE_FIELDS = {
  processId: "abcd1234",
  account: "aawalton",
  configDir: "/d",
  agentId: "aaaa1111-2222-3333-4444-555555555555",
  sessionId: "bbbb6666-7777-8888-9999-000000000000",
} as const

const SELF_HANDOFF = { pid: "<self>", ...VALID_CLAUDE_FIELDS }

export const ADOPT_VECTORS: readonly AdoptVector[] = [
  {
    name: "resolve/default-undefined-alive",
    standing: { returned: SELF_HANDOFF },
  },
  {
    name: "resolve/default-empty-string-alive",
    standing: { returned: SELF_HANDOFF },
  },
  {
    name: "resolve/escape-hatch-zero",
    standing: { returned: null },
  },
  {
    name: "resolve/no-claude",
    standing: { returned: null },
  },
  {
    name: "resolve/explicit-one-alive",
    standing: { returned: SELF_HANDOFF },
  },
  {
    name: "resolve/dead-pid-warns",
    standing: { returned: null, warned: true },
  },
  {
    name: "resolve/non-zero-values-enable",
    standing: { returned: [SELF_HANDOFF, SELF_HANDOFF, SELF_HANDOFF, SELF_HANDOFF] },
  },
  {
    name: "adopt/dead-pid-throws",
    standing: { threw: "InheritedPidDeadError" },
  },
  {
    name: "adopt/alive-pid-shape",
    standing: {
      pidType: "number",
      pidIsSelf: true,
      killType: "function",
      exitedIsPromise: true,
    },
  },
  {
    name: "adopt/exit-status-pair",
    standing: {
      exitStatusType: "function",
      exitStatus: { exitCode: null, signal: null },
    },
  },
  {
    name: "adopt/kill-idempotent",
    standing: { exitedCodeType: "number" },
  },
]
