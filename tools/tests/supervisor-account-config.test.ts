import { expect, it } from "bun:test"
import {
  type AgentEffortLevelDeps,
  type AutoCompactWindowDeps,
  resolveAgentEffortLevel,
  resolveAutoCompactWindow,
  resolveWorkerModel,
  type WorkerModelDeps,
} from "../lib/supervisor-account-config.ts"
import { holdAgainstStanding, type Scenario } from "./claude-launch-args-arm.ts"

const scenarios: Scenario[] = []

function depsReturning(worker: string | null, extendedAvailable = false): WorkerModelDeps {
  return {
    getWorkerModel: async () => worker,
    getExtendedContextAvailable: async () => extendedAvailable,
  }
}

async function model(name: string, deps: WorkerModelDeps, standing: string): Promise<void> {
  const answer = { model: await resolveWorkerModel(deps) }
  scenarios.push({ name, ported: () => answer, standing: { model: standing } })
}

const unreadable = (): never => {
  throw new Error("seat conditions unreadable")
}

const throwingModelDeps: WorkerModelDeps = {
  getWorkerModel: async () => unreadable(),
  getExtendedContextAvailable: async () => false,
}

await model("a logical value stays logical", depsReturning("fable"), "fable")
await model("a wire id normalizes to its alias", depsReturning("claude-opus-4-8"), "opus")
await model("extended context off: stored fable[1m] normalizes to fable", depsReturning("fable[1m]"), "fable")
await model("extended context on: stored fable[1m] is honored", depsReturning("fable[1m]", true), "fable[1m]")
await model(
  "extended context on: a stored extended wire id is honored",
  depsReturning("claude-opus-4-8[1m]", true),
  "opus[1m]"
)
await model("extended context on: bare opus composes [1m]", depsReturning("opus", true), "opus[1m]")
await model("extended context on: bare fable composes [1m]", depsReturning("fable", true), "fable[1m]")
await model(
  "extended context on: a bare wire id composes [1m]",
  depsReturning("claude-opus-4-8", true),
  "opus[1m]"
)
await model("extended context on: haiku never composes [1m]", depsReturning("haiku", true), "haiku")
holdAgainstStanding(scenarios)

it("a model nobody stated stops the boot rather than standing in a guess", async () => {
  await expect(resolveWorkerModel(depsReturning(null))).rejects.toThrow(/state no model/)
})

it("a blank model stops the boot rather than standing in a guess", async () => {
  await expect(resolveWorkerModel(depsReturning("   "))).rejects.toThrow(/state no model/)
})

it("a model naming nothing this system knows stops the boot", async () => {
  await expect(resolveWorkerModel(depsReturning("gpt-4o"))).rejects.toThrow(/gpt-4o/)
})

it("an unreadable page stops the boot rather than substituting a model", async () => {
  await expect(resolveWorkerModel(throwingModelDeps)).rejects.toThrow(/unreadable/)
})

const windowDeps = (value: string | null): AutoCompactWindowDeps => ({
  getAutoCompactWindow: async () => value,
})

const effortDeps = (value: string | null): AgentEffortLevelDeps => ({
  getEffortLevel: async () => value,
})

it("a stated auto compact window reaches the caller unchanged", async () => {
  expect(await resolveAutoCompactWindow(windowDeps("500000"))).toBe("500000")
})

it("none for the auto compact window leaves the caller nothing to set", async () => {
  expect(await resolveAutoCompactWindow(windowDeps(null))).toBeNull()
})

it("an unreadable auto compact window leaves the caller nothing to set", async () => {
  expect(
    await resolveAutoCompactWindow({ getAutoCompactWindow: async () => unreadable() })
  ).toBeNull()
})

it("a stated effort level reaches the caller unchanged", async () => {
  expect(await resolveAgentEffortLevel(effortDeps("xhigh"))).toBe("xhigh")
})

it("none for the effort level leaves the caller nothing to set", async () => {
  expect(await resolveAgentEffortLevel(effortDeps(null))).toBeNull()
})

it("an unreadable effort level leaves the caller nothing to set", async () => {
  expect(await resolveAgentEffortLevel({ getEffortLevel: async () => unreadable() })).toBeNull()
})
