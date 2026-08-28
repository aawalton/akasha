import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { shape } from "../lib/shape.ts"
import {
  disallowedToolsForLaunch,
  renderSubagentDefinitions,
  resolveSubagentDefinitions,
} from "../lib/supervisor-spawn-agents.ts"

interface RenderCase {
  readonly name: string
  readonly raw: string
  readonly standing: string | null
}

const RENDERED: readonly RenderCase[] = [
  {
    name: "compacts the source, which is pretty-printed for whoever edits it",
    raw: '{\n  "a": {\n    "description": "d"\n  }\n}\n',
    standing: '{"a":{"description":"d"}}',
  },
  {
    name: "preserves every definition and every key of one",
    raw: '{"a":{"description":"d","prompt":"p","model":"haiku"},"b":{"description":"e"}}',
    standing: '{"a":{"description":"d","prompt":"p","model":"haiku"},"b":{"description":"e"}}',
  },
  {
    name: "refuses an empty object, which the client accepts and which defines nobody",
    raw: "{}",
    standing: null,
  },
  {
    name: "refuses an array, which is not an object of definitions",
    raw: "[]",
    standing: null,
  },
  {
    name: "refuses a null, which is not an object of definitions",
    raw: "null",
    standing: null,
  },
  {
    name: "refuses a bare string, which is not an object of definitions",
    raw: '"a"',
    standing: null,
  },
  {
    name: "refuses malformed JSON rather than throwing into the spawn",
    raw: "{",
    standing: null,
  },
  {
    name: "refuses an empty document rather than throwing into the spawn",
    raw: "",
    standing: null,
  },
]

describe("rendering the --agents payload, held against the standing its port was taken from", () => {
  for (const one of RENDERED) {
    it(one.name, () => {
      const answer = decided("ported", { value: renderSubagentDefinitions(one.raw), notice: null })
      expect(hold(one.name, one.standing, answer).matches).toBe(true)
    })
  }

  it("holds at least one case whose standing answer is not null", () => {
    expect(RENDERED.some((one) => one.standing !== null)).toBe(true)
  })
})

async function withEnv(
  vars: Readonly<Record<string, string | undefined>>,
  body: () => Promise<void>
): Promise<void> {
  const put = (values: Readonly<Record<string, string | undefined>>): undefined => {
    for (const [name, value] of Object.entries(values)) {
      if (value === undefined) delete process.env[name]
      else process.env[name] = value
    }
  }
  const before = Object.fromEntries(
    Object.keys(vars).map((name) => [name, shape.string().optional().parse(process.env[name])])
  )
  put(vars)
  try {
    await body()
  } finally {
    put(before)
  }
}

interface LaunchCase {
  readonly name: string
  readonly env: Readonly<Record<string, string | undefined>>
  readonly standing: string | null
}

const LAUNCHED: readonly LaunchCase[] = [
  {
    name: "resolves to no flag rather than throwing into the launch",
    env: { AKASHA_ROOT: "/var/tmp/no-akasha-tree-18360" },
    standing: null,
  },
]

describe("a tree the command cannot be run from", () => {
  for (const one of LAUNCHED) {
    it(one.name, async () => {
      await withEnv(one.env, async () => {
        const answer = decided("ported", { value: await resolveSubagentDefinitions(), notice: null })
        expect(hold(one.name, one.standing, answer).matches).toBe(true)
      })
    })
  }
})

interface GuardCase {
  readonly name: string
  readonly declared: readonly string[]
  readonly agentsJson: string | null
  readonly standing: readonly string[]
}

const COMPOSED = '{"a":{"description":"d","prompt":"p"}}'

const GUARDED: readonly GuardCase[] = [
  {
    name: "leaves the declared list alone where the definitions composed",
    declared: ["Read", "CronCreate"],
    agentsJson: COMPOSED,
    standing: ["Read", "CronCreate"],
  },
  {
    name: "disallows the delegation tool where the definitions did not compose",
    declared: ["Read", "CronCreate"],
    agentsJson: null,
    standing: ["Read", "CronCreate", "Agent"],
  },
  {
    name: "disallows delegation where the seat declared nothing else",
    declared: [],
    agentsJson: null,
    standing: ["Agent"],
  },
]

describe("the disallowed-tools list one launch goes out with", () => {
  for (const one of GUARDED) {
    it(one.name, () => {
      const answer = decided("ported", {
        value: disallowedToolsForLaunch(one.declared, one.agentsJson),
        notice: null,
      })
      expect(hold(one.name, one.standing, answer).matches).toBe(true)
    })
  }
})
