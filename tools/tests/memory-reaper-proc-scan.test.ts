
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import {
  isContainerCgroup,
  REDACTED,
  redactArgv,
  redactProcCmdline,
  SAFE_VALUE_FLAGS,
  UNCLASSIFIED,
} from "../lib/memory-reaper-proc-scan.ts"

const SECRET = "sk-test-DO-NOT-LOG"

const CREDENTIAL_SHAPE = /token|secret|password|credential|bearer|api-?key|url/i

const DEEP_PATH = `/tmp/${Array.from({ length: 80 }, () => "nested").join("/")}/x.ts`

const LONG_ARGV = ["/usr/bin/bun", ...Array.from({ length: 100 }, () => "ops")]

interface Case {
  readonly name: string
  readonly run: () => Record<string, unknown>
  readonly standing: Record<string, unknown>
}

const CASES: readonly Case[] = [
  {
    name: "redacts a spawn auth token while keeping the flag name",
    run: () => {
      const out = redactArgv(["/usr/bin/bun", "ops", "agent", "spawn", "--anthropic-auth-token", SECRET])
      return { out, leaksSecret: out.join(" ").includes(SECRET) }
    },
    standing: {
      out: ["/usr/bin/bun", "ops", "agent", "spawn", "--anthropic-auth-token", "[REDACTED]"],
      leaksSecret: false,
    },
  },
  {
    name: "redacts the `--flag=value` form too",
    run: () => ({ out: redactArgv(["/usr/bin/bun", `--anthropic-auth-token=${SECRET}`]) }),
    standing: { out: ["/usr/bin/bun", "--anthropic-auth-token=[REDACTED]"] },
  },
  {
    name: "withholds an unknown flag's value — a flag invented after this code was written",
    run: () => {
      const out = redactArgv(["/usr/bin/bun", "--some-flag-invented-tomorrow", SECRET])
      return { out, leaksSecret: out.join(" ").includes(SECRET) }
    },
    standing: {
      out: ["/usr/bin/bun", "--some-flag-invented-tomorrow", "[UNCLASSIFIED]"],
      leaksSecret: false,
    },
  },
  {
    name: "withholds a secret passed as a bare positional",
    run: () => ({ out: redactArgv(["/usr/bin/bun", "/tmp/x.ts", SECRET]) }),
    standing: { out: ["/usr/bin/bun", "/tmp/x.ts", "[UNCLASSIFIED]"] },
  },
  {
    name: "distinguishes a known secret from an unknown — they are different facts",
    run: () => {
      const out = redactArgv(["/usr/bin/bun", "--anthropic-auth-token", SECRET, "--mystery", "xyzzy"])
      return { hasRedacted: out.includes(REDACTED), hasUnclassified: out.includes(UNCLASSIFIED) }
    },
    standing: { hasRedacted: true, hasUnclassified: true },
  },
  {
    name: "no allow-listed flag names a credential",
    run: () => ({
      credentialShapedFlags: [...SAFE_VALUE_FLAGS].filter((flag) => CREDENTIAL_SHAPE.test(flag)),
    }),
    standing: { credentialShapedFlags: [] },
  },

  {
    name: "keeps the program path and the subcommand words",
    run: () => ({ out: redactArgv(["/usr/bin/bun", "ops", "project", "move-to"]) }),
    standing: { out: ["/usr/bin/bun", "ops", "project", "move-to"] },
  },
  {
    name: "keeps a log destination — a path is not a secret, and it says where to look next",
    run: () => ({
      out: redactArgv(["/usr/bin/bun", "--log", "/home/walton/agents/worker-1/spawn.log"]),
    }),
    standing: { out: ["/usr/bin/bun", "--log", "/home/walton/agents/worker-1/spawn.log"] },
  },
  {
    name: "keeps the post-`--` nested command — the single most valuable token",
    run: () => ({
      out: redactArgv([
        "/home/walton/.bun/bin/bun",
        "run",
        "/repo/packages/agents/supervisor/src/spawn-headless.ts",
        "--",
        "/home/walton/.bun/bin/bun",
        "run",
        "/repo/packages/agents/supervisor/src/supervisor.ts",
        "--headless",
      ]),
    }),
    standing: {
      out: [
        "/home/walton/.bun/bin/bun",
        "run",
        "/repo/packages/agents/supervisor/src/spawn-headless.ts",
        "--",
        "/home/walton/.bun/bin/bun",
        "run",
        "/repo/packages/agents/supervisor/src/supervisor.ts",
        "--headless",
      ],
    },
  },
  {
    name: "a credential inside the post-`--` segment is still redacted — the token, not the segment",
    run: () => ({
      out: redactArgv(["/usr/bin/bun", "--", "/usr/bin/bun", "--anthropic-auth-token", SECRET]),
    }),
    standing: {
      out: ["/usr/bin/bun", "--", "/usr/bin/bun", "--anthropic-auth-token", "[REDACTED]"],
    },
  },
  {
    name: "keeps ids, accounts and models",
    run: () => ({
      out: redactArgv(["/bin/claude", "--model", "opus", "--agent-id", "abc-123", "-a", "aawalton"]),
    }),
    standing: {
      out: ["/bin/claude", "--model", "opus", "--agent-id", "abc-123", "-a", "aawalton"],
    },
  },
  {
    name: "keeps source paths — the which-file-was-in-flight datum",
    run: () => ({
      out: redactArgv(["/usr/bin/bun", "test", "packages/agents/shared/agent-liveness.ts"]),
    }),
    standing: { out: ["/usr/bin/bun", "test", "packages/agents/shared/agent-liveness.ts"] },
  },
  {
    name: "a blob wearing a slash is not a path",
    run: () => ({ out: redactArgv(["/usr/bin/bun", "aGVsbG8/d29ybGRz"]) }),
    standing: { out: ["/usr/bin/bun", "[UNCLASSIFIED]"] },
  },

  {
    name: "truncates an over-long kept token",
    run: () => {
      const [, kept] = redactArgv(["/usr/bin/bun", DEEP_PATH])
      return { keptLength: kept?.length, endsWithEllipsis: kept?.endsWith("…") }
    },
    standing: { keptLength: 201, endsWithEllipsis: true },
  },
  {
    name: "caps token count and records how many were dropped",
    run: () => {
      const out = redactArgv(LONG_ARGV)
      return { length: out.length, last: out.at(-1) }
    },
    standing: { length: 65, last: "+37 more" },
  },

  {
    name: "splits NUL-separated cmdline and redacts in one step",
    run: () => ({
      out: redactProcCmdline(`/usr/bin/bun\0ops\0agent\0spawn\0--anthropic-auth-token\0${SECRET}\0`),
    }),
    standing: {
      out: ["/usr/bin/bun", "ops", "agent", "spawn", "--anthropic-auth-token", "[REDACTED]"],
    },
  },
  {
    name: "an exited-mid-read / kernel-thread empty cmdline yields no argv",
    run: () => ({ empty: redactProcCmdline(""), allNul: redactProcCmdline("\0\0") }),
    standing: { empty: [], allNul: [] },
  },

  {
    name: "true for a rootless-podman container cgroup v2 path",
    run: () => ({
      contained: isContainerCgroup(
        "0::/user.slice/user-1000.slice/user@1000.service/user.slice/libpod-3f9a1b2c4d.scope/container\n"
      ),
    }),
    standing: { contained: true },
  },
  {
    name: "true for the conmon monitor scope",
    run: () => ({
      contained: isContainerCgroup(
        "0::/user.slice/user-1000.slice/user@1000.service/libpod-conmon-3f9a1b2c4d.scope\n"
      ),
    }),
    standing: { contained: true },
  },
  {
    name: "false for a normal user-session process (no container)",
    run: () => ({ contained: isContainerCgroup("0::/user.slice/user-1000.slice/session-3.scope\n") }),
    standing: { contained: false },
  },
  {
    name: "false for a supervisor/agent app.slice process",
    run: () => ({
      contained: isContainerCgroup(
        "0::/user.slice/user-1000.slice/user@1000.service/app.slice/app-bun.scope\n"
      ),
    }),
    standing: { contained: false },
  },
]

function projected(answered: Record<string, unknown>, shape: Record<string, unknown>): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(shape)) picked[key] = answered[key]
  return picked
}

describe("the reaper's /proc scanners, held against what the code repository asserts", () => {
  for (const one of CASES) {
    it(one.name, () => {
      const answered = decided("ported", { value: one.run(), notice: null })
      const verdict = hold(one.name, one.standing, projected(answered, one.standing))
      expect(verdict.matches).toBe(true)
    })
  }

  it("carries both standing suites' whole population, and compares something in every case", () => {
    for (const one of CASES) expect(Object.keys(one.standing).length).toBeGreaterThan(0)
    expect(CASES.length).toBe(21)
  })
})
