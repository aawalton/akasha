
import { afterAll, describe, expect, it } from "bun:test"
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { decided, hold } from "../lib/digest-harness.ts"
import { shape } from "../lib/shape.ts"
import {
  AGENT_SETTINGS_COMMAND,
  type AskAgentSettings,
  composeSpawnSettings,
  materializeSpawnSettings,
  parseAgentSettings,
  readAgentSettingsBase,
} from "../lib/supervisor-spawn-settings.ts"

const SCRATCH_ROOT = "/var/tmp"

const SETTINGS_FILE = shape.record(shape.string(), shape.unknown())

const created: string[] = []

function scratch(): string {
  const dir = mkdtempSync(join(SCRATCH_ROOT, "spawn-settings-"))
  created.push(dir)
  return dir
}

afterAll(() => {
  for (const dir of created) rmSync(dir, { recursive: true, force: true })
})

function answering(settings: unknown): AskAgentSettings {
  return async () => ({ stdout: JSON.stringify(settings), stderr: "", code: 0 })
}

function refusing(code: number, stderr: string): AskAgentSettings {
  return async () => ({ stdout: "", stderr, code })
}

const HOOKS = { PostToolUse: [{ matcher: "Read", hooks: [] }] }

interface Case {
  readonly name: string
  readonly run: () => Promise<Record<string, unknown>> | Record<string, unknown>
  readonly standing: Record<string, unknown>
}

const CASES: readonly Case[] = [
  {
    name: "composeSpawnSettings: the per-spawn override beats the file on the key they share",
    run: () => ({
      remoteControlAtStartup: composeSpawnSettings(
        { remoteControlAtStartup: true, fastMode: true },
        { remoteControlAtStartup: false }
      ).remoteControlAtStartup,
    }),
    standing: { remoteControlAtStartup: false },
  },
  {
    name: "composeSpawnSettings: every key the override does not name survives untouched",
    run: () => {
      const payload = composeSpawnSettings(
        { hooks: HOOKS, fastMode: true, env: { A: "1" } },
        { remoteControlAtStartup: false }
      )
      return { hooks: payload.hooks, fastMode: payload.fastMode, env: payload.env }
    },
    standing: { hooks: HOOKS, fastMode: true, env: { A: "1" } },
  },
  {
    name: "composeSpawnSettings: a null base yields the overrides alone — the pre-#17353 payload exactly",
    run: () => ({ payload: composeSpawnSettings(null, { remoteControlAtStartup: false }) }),
    standing: { payload: { remoteControlAtStartup: false } },
  },
  {
    name: "parseAgentSettings: malformed JSON is absent-with-a-reason, never a throw",
    run: () => {
      const base = parseAgentSettings("{ not json")
      return {
        kind: base.kind,
        reasonNamesInvalidJson: base.kind === "absent" && base.reason.includes("invalid JSON"),
      }
    },
    standing: { kind: "absent", reasonNamesInvalidJson: true },
  },
  {
    name: "parseAgentSettings: a well-formed but non-object top level is absent, not silently spread",
    run: () => ({ kind: parseAgentSettings(JSON.stringify([1, 2])).kind }),
    standing: { kind: "absent" },
  },
  {
    name: "readAgentSettingsBase: an asker that throws is absent-with-a-reason, never a throw of its own",
    run: async () => {
      const base = await readAgentSettingsBase(async () => {
        throw new Error("no instructions root")
      })
      return {
        kind: base.kind,
        reasonNamesTheThrow: base.kind === "absent" && base.reason.includes("no instructions root"),
      }
    },
    standing: { kind: "absent", reasonNamesTheThrow: true },
  },
  {
    name: "readAgentSettingsBase: a refusal carries its own stderr into the reason, not a rewording",
    run: async () => {
      const base = await readAgentSettingsBase(refusing(2, "settings/agents.json is absent"))
      return {
        kind: base.kind,
        reasonNamesTheDocument:
          base.kind === "absent" && base.reason.includes("settings/agents.json is absent"),
        reasonNamesTheCommand: base.kind === "absent" && base.reason.includes(AGENT_SETTINGS_COMMAND),
      }
    },
    standing: { kind: "absent", reasonNamesTheDocument: true, reasonNamesTheCommand: true },
  },
  {
    name: "readAgentSettingsBase: an answer that parses is loaded, carrying every key it printed",
    run: async () => {
      const base = await readAgentSettingsBase(answering({ fastMode: true, env: { A: "1" } }))
      return { kind: base.kind, settings: base.kind === "loaded" ? base.settings : null }
    },
    standing: { kind: "loaded", settings: { fastMode: true, env: { A: "1" } } },
  },
  {
    name: "materializeSpawnSettings: writes the composed payload and returns the path handed to --settings",
    run: async () => {
      const dir = scratch()
      const path = await materializeSpawnSettings(
        { remoteControlAtStartup: false },
        { ask: answering({ remoteControlAtStartup: true, fastMode: true }), tmpDir: dir }
      )
      return { written: SETTINGS_FILE.parse(JSON.parse(readFileSync(path, "utf8"))) }
    },
    standing: { written: { remoteControlAtStartup: false, fastMode: true } },
  },
  {
    name: "materializeSpawnSettings: the filename is the content hash, so identical spawns share one file",
    run: async () => {
      const dir = scratch()
      const ask = answering({ remoteControlAtStartup: true })
      const a = await materializeSpawnSettings({ remoteControlAtStartup: false }, { ask, tmpDir: dir })
      const b = await materializeSpawnSettings({ remoteControlAtStartup: false }, { ask, tmpDir: dir })
      const differing = await materializeSpawnSettings(
        { remoteControlAtStartup: true },
        { ask, tmpDir: dir }
      )
      return {
        samePayloadSamePath: b === a,
        differingPayloadDiffers: differing !== a,
        firstExists: existsSync(a),
        differingExists: existsSync(differing),
      }
    },
    standing: {
      samePayloadSamePath: true,
      differingPayloadDiffers: true,
      firstExists: true,
      differingExists: true,
    },
  },
  {
    name: "materializeSpawnSettings: an unreachable settings document still yields a spawnable payload",
    run: async () => {
      const dir = scratch()
      const path = await materializeSpawnSettings(
        { remoteControlAtStartup: false },
        {
          ask: async () => {
            throw new Error("no instructions root")
          },
          tmpDir: dir,
        }
      )
      return { written: SETTINGS_FILE.parse(JSON.parse(readFileSync(path, "utf8"))) }
    },
    standing: { written: { remoteControlAtStartup: false } },
  },
]

function projected(
  answered: Record<string, unknown>,
  standing: Record<string, unknown>
): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(standing)) picked[key] = answered[key]
  return picked
}

describe("the spawn-settings payload, held against what the code repository asserts", () => {
  for (const one of CASES) {
    it(one.name, async () => {
      const answered = decided("ported", { value: await one.run(), notice: null })
      const verdict = hold(one.name, one.standing, projected(answered, one.standing))
      expect(verdict.matches).toBe(true)
    })
  }

  it("compares something in every case, so none passes on an empty projection", () => {
    for (const one of CASES) {
      expect(Object.keys(one.standing).length).toBeGreaterThan(0)
    }
  })
})
