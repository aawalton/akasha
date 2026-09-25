import { z } from "zod"

export type PathOpts = {
  readonly platform?: string
  readonly env?: Record<string, string | undefined>
}

type Resolved = {
  readonly platform: string
  readonly env: Record<string, string | undefined>
}

function resolved(opts?: PathOpts): Resolved {
  return {
    platform: opts?.platform ?? process.platform,
    env: opts?.env ?? process.env,
  }
}

function stated(env: Record<string, string | undefined>, key: string): string | undefined {
  const held = env[key]
  return held !== undefined && held !== "" ? held : undefined
}

function demanded(env: Record<string, string | undefined>, key: string): string {
  return z
    .string()
    .min(1, `${key} is unset, so where the game keeps its files is unknown`)
    .parse(stated(env, key))
}

const WINDOWS = "win32"

const ESO_UNDER_DOCUMENTS = "Documents/Elder Scrolls Online/live"

const ESO_UNDER_PROTON_PREFIX = `.steam/steam/steamapps/compatdata/306130/pfx/drive_c/users/steamuser/${ESO_UNDER_DOCUMENTS}`

function homeOf(said: Resolved): string {
  return said.platform === WINDOWS ? demanded(said.env, "USERPROFILE") : demanded(said.env, "HOME")
}

export function esoLiveDirCandidates(opts?: PathOpts): readonly [string, ...(readonly string[])] {
  const said = resolved(opts)
  const named = stated(said.env, "ESO_LIVE_DIR")
  if (named !== undefined) return [named]
  if (said.platform === WINDOWS) {
    const profile = demanded(said.env, "USERPROFILE")
    return [`${profile}/OneDrive/${ESO_UNDER_DOCUMENTS}`, `${profile}/${ESO_UNDER_DOCUMENTS}`]
  }
  return [`${demanded(said.env, "HOME")}/${ESO_UNDER_PROTON_PREFIX}`]
}

export function esouiDir(opts?: PathOpts): string {
  const said = resolved(opts)
  const named = stated(said.env, "ESOUI_SRC_DIR")
  if (named !== undefined) return named
  return `${homeOf(said)}/esoui`
}

export function esouiSourceDir(opts?: PathOpts): string {
  return `${esouiDir(opts)}/esoui`
}

export function esouiDocPath(opts?: PathOpts): string {
  return `${esouiDir(opts)}/ESOUIDocumentation.txt`
}

const CLIENT_UNDER_STEAM = "steamapps/common/Zenimax Online/The Elder Scrolls Online/game/client"

export function esoClientDir(opts?: PathOpts): string {
  const said = resolved(opts)
  const named = stated(said.env, "ESO_CLIENT_DIR")
  if (named !== undefined) return named
  if (said.platform === WINDOWS) return `C:/Program Files (x86)/Steam/${CLIENT_UNDER_STEAM}`
  return `${demanded(said.env, "HOME")}/.steam/steam/${CLIENT_UNDER_STEAM}`
}

export function esoArtDir(opts?: PathOpts): string {
  const said = resolved(opts)
  const named = stated(said.env, "ESO_ART_DIR")
  if (named !== undefined) return named
  if (said.platform === WINDOWS) return `${homeOf(said)}/AppData/Local/akasha/eso-art`
  const cache = stated(said.env, "XDG_CACHE_HOME") ?? `${homeOf(said)}/.cache`
  return `${cache}/akasha/eso-art`
}
