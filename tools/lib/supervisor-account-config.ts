import { parseModel, toCliAlias } from "./model-vocab.ts"
import { readSeatConditions } from "./seat-conditions.ts"
import { LOG } from "./supervisor-config.ts"

export type WorkerModelDeps = {
  getWorkerModel: () => Promise<string | null>
  getExtendedContextAvailable: () => Promise<boolean>
}

// Whether the long context window may be asked for. This is one answer for the fleet: a seat's
// model alias is settled at spawn and the account carrying a call is chosen per call afterwards,
// so no account is known here to ask.
export async function getExtendedContextAvailable(): Promise<boolean> {
  return readSeatConditions().extendedContextAvailable
}

const defaultWorkerModelDeps: WorkerModelDeps = {
  getWorkerModel: async () => readSeatConditions().model,
  getExtendedContextAvailable,
}

function isUsableModel(value: string | null): value is string {
  return typeof value === "string" && value.trim() !== ""
}

export async function resolveWorkerModel(
  deps: WorkerModelDeps = defaultWorkerModelDeps
): Promise<string> {
  const extendedAvailable = await deps.getExtendedContextAvailable()
  const raw = await deps.getWorkerModel()
  if (!isUsableModel(raw)) {
    throw new Error("seat conditions state no model, and a seat runs on the model they state")
  }
  const spec = parseModel(raw)
  if (spec === null) {
    throw new Error(`seat conditions state \`${raw}\` as the model, which names none this system knows`)
  }
  return toCliAlias(spec, { extendedAvailable })
}

export type AutoCompactWindowDeps = {
  getAutoCompactWindow: () => Promise<string | null>
}

const defaultAutoCompactWindowDeps: AutoCompactWindowDeps = {
  getAutoCompactWindow: async () => readSeatConditions().autoCompactWindow,
}

export async function resolveAutoCompactWindow(
  deps: AutoCompactWindowDeps = defaultAutoCompactWindowDeps
): Promise<string | null> {
  try {
    return await deps.getAutoCompactWindow()
  } catch (err) {
    console.warn(`${LOG} resolveAutoCompactWindow: seat conditions unreadable, leaving unset:`, err)
    return null
  }
}

export type AgentEffortLevelDeps = {
  getEffortLevel: () => Promise<string | null>
}

const defaultAgentEffortLevelDeps: AgentEffortLevelDeps = {
  getEffortLevel: async () => readSeatConditions().effortLevel,
}

export async function resolveAgentEffortLevel(
  deps: AgentEffortLevelDeps = defaultAgentEffortLevelDeps
): Promise<string | null> {
  try {
    return await deps.getEffortLevel()
  } catch (err) {
    console.warn(`${LOG} resolveAgentEffortLevel: seat conditions unreadable, leaving unset:`, err)
    return null
  }
}

export type SubagentModelDeps = {
  getSubagentModel: () => Promise<string | null>
  getExtendedContextAvailable: () => Promise<boolean>
}

const defaultSubagentModelDeps: SubagentModelDeps = {
  getSubagentModel: async () => readSeatConditions().subagentModel,
  getExtendedContextAvailable,
}

export async function resolveSubagentModel(
  deps: SubagentModelDeps = defaultSubagentModelDeps
): Promise<string | null> {
  try {
    const raw = await deps.getSubagentModel()
    if (!isUsableModel(raw)) return null
    const spec = parseModel(raw)
    if (spec === null) {
      console.warn(`${LOG} resolveSubagentModel: ${raw} names no model, leaving subagents unset`)
      return null
    }
    const extendedAvailable = await deps.getExtendedContextAvailable()
    return toCliAlias(spec, { extendedAvailable })
  } catch (err) {
    console.warn(`${LOG} resolveSubagentModel: seat conditions unreadable, leaving unset:`, err)
    return null
  }
}

export type FallbackModelDeps = {
  getFallbackModel: () => Promise<string | null>
  getExtendedContextAvailable: () => Promise<boolean>
}

const defaultFallbackModelDeps: FallbackModelDeps = {
  getFallbackModel: async () => readSeatConditions().fallbackModel,
  getExtendedContextAvailable,
}

export async function resolveFallbackModel(
  deps: FallbackModelDeps = defaultFallbackModelDeps
): Promise<string | null> {
  try {
    const raw = await deps.getFallbackModel()
    if (!isUsableModel(raw)) return null
    const spec = parseModel(raw)
    if (spec === null) {
      console.warn(`${LOG} resolveFallbackModel: ${raw} names no model, leaving unset`)
      return null
    }
    const extendedAvailable = await deps.getExtendedContextAvailable()
    return toCliAlias(spec, { extendedAvailable })
  } catch (err) {
    console.warn(`${LOG} resolveFallbackModel: seat conditions unreadable, leaving unset:`, err)
    return null
  }
}

export type SubagentSpawnDepthDeps = {
  getSubagentSpawnDepth: () => Promise<string | null>
}

const defaultSubagentSpawnDepthDeps: SubagentSpawnDepthDeps = {
  getSubagentSpawnDepth: async () => readSeatConditions().subagentSpawnDepth,
}

export async function resolveSubagentSpawnDepth(
  deps: SubagentSpawnDepthDeps = defaultSubagentSpawnDepthDeps
): Promise<string> {
  const raw = await deps.getSubagentSpawnDepth()
  if (raw === null) {
    throw new Error("seat conditions state no subagent spawn depth, which its property defaults")
  }
  return raw
}

export type ToolTimeoutDeps = {
  getToolTimeout: () => Promise<string | null>
}

const defaultToolTimeoutDeps: ToolTimeoutDeps = {
  getToolTimeout: async () => readSeatConditions().toolTimeout,
}

export async function resolveToolTimeout(
  deps: ToolTimeoutDeps = defaultToolTimeoutDeps
): Promise<string> {
  const raw = await deps.getToolTimeout()
  if (raw === null) {
    throw new Error("seat conditions state no tool timeout, which its property defaults")
  }
  return raw
}

export type ResumeThresholdDeps = {
  getResumeThresholdMinutes: () => Promise<string | null>
  getResumeTokenThreshold: () => Promise<string | null>
}

const defaultResumeThresholdDeps: ResumeThresholdDeps = {
  getResumeThresholdMinutes: async () => readSeatConditions().resumeThresholdMinutes,
  getResumeTokenThreshold: async () => readSeatConditions().resumeTokenThreshold,
}

export interface ResumeThresholds {
  readonly minutes: string
  readonly tokens: string
}

export async function resolveResumeThresholds(
  deps: ResumeThresholdDeps = defaultResumeThresholdDeps
): Promise<ResumeThresholds> {
  const [minutes, tokens] = await Promise.all([
    deps.getResumeThresholdMinutes(),
    deps.getResumeTokenThreshold(),
  ])
  if (minutes === null || tokens === null) {
    throw new Error("seat conditions state no resume threshold, which its property defaults")
  }
  return { minutes, tokens }
}
