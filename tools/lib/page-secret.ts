
import { existsSync } from "node:fs"

export const PAGE_SUFFIX = ".md"

export const SIDECAR_SUFFIX = ".sops.yaml"

export const SOPS_CONFIG = ".sops.yaml"

const SOPS = "sops"

const STDIN = "/dev/stdin"

const CEILING_MS = 10_000

export type Values = ReadonlyMap<string, string>

export type Decrypted =
  | { readonly values: Values; readonly why: null }
  | { readonly values: null; readonly why: string }

export type Encrypted =
  | { readonly text: string; readonly why: null }
  | { readonly text: null; readonly why: string }

type Ran = { readonly out: string; readonly why: null } | { readonly out: null; readonly why: string }

function nameOf(relPath: string): string {
  return relPath.split("/").at(-1) ?? ""
}

export function sidecarFor(relPath: string): string | null {
  const name = nameOf(relPath)
  if (!name.endsWith(PAGE_SUFFIX) || name === PAGE_SUFFIX) return null
  return `${relPath.slice(0, -PAGE_SUFFIX.length)}${SIDECAR_SUFFIX}`
}

export function keysIn(text: string): readonly string[] {
  return [...text.matchAll(/^([A-Za-z0-9_-]+): ENC\[/gm)].map((one) => one[1] as string).sort()
}

export function looksEncrypted(text: string): boolean {
  return /^sops:$/m.test(text) && /^\s+mac: ENC\[/m.test(text)
}

function yamlOf(values: Values): string {
  const lines = [...values.keys()].sort().map((key) => `${key}: ${JSON.stringify(values.get(key))}`)
  return `${lines.join("\n")}\n`
}

function ran(root: string, args: readonly string[], input: string, waitingFor: string): Ran {
  try {
    const result = Bun.spawnSync([SOPS, ...args], {
      cwd: root,
      stdin: new TextEncoder().encode(input),
      stdout: "pipe",
      stderr: "pipe",
      timeout: CEILING_MS,
    })
    if (result.exitCode === null) {
      return {
        out: null,
        why: `\`${SOPS}\` was killed with ${result.signalCode ?? "no signal"} while ${waitingFor}, which is the ${CEILING_MS}ms ceiling a run here is held to`,
      }
    }
    if (result.exitCode !== 0) {
      const said = result.stderr.toString().trim()
      return { out: null, why: `\`${SOPS}\` exited ${result.exitCode} while ${waitingFor}${said === "" ? "" : `: ${said}`}` }
    }
    return { out: result.stdout.toString(), why: null }
  } catch (err) {
    const said = err instanceof Error ? err.message : String(err)
    return { out: null, why: `\`${SOPS}\` could not be run while ${waitingFor}: ${said}` }
  }
}

export function valuesIn(root: string, sidecar: string, ciphertext: string): Decrypted {
  const said = ran(
    root,
    ["decrypt", "--filename-override", sidecar, "--input-type", "yaml", "--output-type", "json", STDIN],
    ciphertext,
    `decrypting ${sidecar}`
  )
  if (said.out === null) return { values: null, why: said.why }
  let parsed: unknown
  try {
    parsed = JSON.parse(said.out)
  } catch (err) {
    const broke = err instanceof Error ? err.message : String(err)
    return { values: null, why: `what came back for ${sidecar} is not JSON: ${broke}` }
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    const held = Array.isArray(parsed) ? "a list" : parsed === null ? "nothing" : typeof parsed
    return { values: null, why: `${sidecar} holds ${held}, and a page's sops file holds keys to values` }
  }
  const values = new Map<string, string>()
  for (const [key, held] of Object.entries(parsed)) {
    if (typeof held !== "string") {
      const shape = held === null ? "nothing" : Array.isArray(held) ? "a list" : typeof held
      return { values: null, why: `\`${key}\` in ${sidecar} holds ${shape}, and a secret's value is text` }
    }
    values.set(key, held)
  }
  return { values, why: null }
}

export function cipherFor(root: string, sidecar: string, values: Values): Encrypted {
  if (values.size === 0) {
    return { text: null, why: `${sidecar} would hold no key, and a sops file holding nothing is removed rather than written` }
  }
  const config = `${root}/${SOPS_CONFIG}`
  if (!existsSync(config)) {
    return {
      text: null,
      why: `no \`${SOPS_CONFIG}\` stands at ${config}, so nothing says which key this repo's secrets are encrypted to`,
    }
  }
  const said = ran(
    root,
    [
      "--config",
      config,
      "encrypt",
      "--filename-override",
      sidecar,
      "--input-type",
      "yaml",
      "--output-type",
      "yaml",
      STDIN,
    ],
    yamlOf(values),
    `encrypting ${sidecar}`
  )
  if (said.out === null) return { text: null, why: said.why }
  if (!looksEncrypted(said.out)) {
    return {
      text: null,
      why: `what came back for ${sidecar} carries no \`sops:\` block with a mac, so nothing here can say the values were encrypted`,
    }
  }
  return { text: said.out, why: null }
}
