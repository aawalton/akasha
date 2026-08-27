import { z } from "zod"

export interface PathOpts {
  readonly platform?: string
  readonly env?: Record<string, string | undefined>
}

interface Resolved {
  readonly platform: string
  readonly env: Record<string, string | undefined>
}

function resolve(opts?: PathOpts): Resolved {
  return {
    platform: opts?.platform ?? process.platform,
    env: opts?.env ?? process.env,
  }
}

function optional(env: Record<string, string | undefined>, key: string): string | undefined {
  const value = env[key]
  return value !== undefined && value !== "" ? value : undefined
}

function required(env: Record<string, string | undefined>, key: string): string {
  return z
    .string()
    .min(1, `${key} env var is required to resolve ESO filesystem paths`)
    .parse(optional(env, key))
}

const ESO_UNDER_DOCUMENTS = "Documents/Elder Scrolls Online/live"

const ESO_UNDER_PROTON_PREFIX = `.steam/steam/steamapps/compatdata/306130/pfx/drive_c/users/steamuser/${ESO_UNDER_DOCUMENTS}`

export function esoLiveDirCandidates(opts?: PathOpts): readonly [string, ...(readonly string[])] {
  const { platform, env } = resolve(opts)
  const override = optional(env, "ESO_LIVE_DIR")
  if (override !== undefined) return [override]
  if (platform === "win32") {
    const profile = required(env, "USERPROFILE")
    return [`${profile}/OneDrive/${ESO_UNDER_DOCUMENTS}`, `${profile}/${ESO_UNDER_DOCUMENTS}`]
  }
  return [`${required(env, "HOME")}/${ESO_UNDER_PROTON_PREFIX}`]
}

export function esouiDir(opts?: PathOpts): string {
  const { platform, env } = resolve(opts)
  const override = optional(env, "ESOUI_SRC_DIR")
  if (override !== undefined) return override
  const home = platform === "win32" ? required(env, "USERPROFILE") : required(env, "HOME")
  return `${home}/esoui`
}

export function esouiSourceDir(opts?: PathOpts): string {
  return `${esouiDir(opts)}/esoui`
}

export function esouiDocPath(opts?: PathOpts): string {
  return `${esouiDir(opts)}/ESOUIDocumentation.txt`
}

export function addonUpstreamDir(opts?: PathOpts): string {
  const { platform, env } = resolve(opts)
  const override = optional(env, "ESO_UPSTREAM_DIR")
  if (override !== undefined) return override
  const home = platform === "win32" ? required(env, "USERPROFILE") : required(env, "HOME")
  return `${home}/eso-upstream`
}

export function watcherLogDir(opts?: PathOpts): string {
  const { platform, env } = resolve(opts)
  const override = optional(env, "WATCHER_LOG_DIR")
  if (override !== undefined) return override
  if (platform === "win32") {
    return `${required(env, "LOCALAPPDATA")}/TemperWatcher`
  }
  const base = optional(env, "XDG_STATE_HOME") ?? `${required(env, "HOME")}/.local/state`
  return `${base}/temper-watcher`
}

export function watcherConfigDir(opts?: PathOpts): string {
  const { platform, env } = resolve(opts)
  const override = optional(env, "WATCHER_CONFIG_DIR")
  if (override !== undefined) return override
  if (platform === "win32") {
    return `${required(env, "APPDATA")}/temper`
  }
  const base = optional(env, "XDG_CONFIG_HOME") ?? `${required(env, "HOME")}/.config`
  return `${base}/temper`
}
