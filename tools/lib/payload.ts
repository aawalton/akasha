import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import type { Repo } from "../../page/document/types.ts"
import { type Repo as Addressable } from "../../page/document/types"
import { type Roots } from "../../page/page"
import {
  AKASHA,
  ADDRESSABLE_NAMED,
  isAddressable,
  locate,
  resolveRoots,
} from "../../repo/roots/roots"
import { fail } from "./command.ts"
import { decodeUtf8 } from "../../utf8-body/utf8-body.ts"
import { notUtf8 } from "./utf8-body.ts"

const STANDALONE = [
  "--dry-run",
  "--mechanical",
  "--replace-all",
  "--remove",
  "--force",
  "--json",
  "--quiet",
  "--set",
  "--clear",
  "--reveal",
]

const FILE_PATH = "--file-path"

const CONTENT_FILE = "--content-file"

export interface ContentPair {
  readonly filePath: string
  readonly contentFile: string
}

export interface PairsRefused {
  readonly refusal: string
}

export function filePathPairs(
  argv: readonly string[],
  takesValue: readonly string[]
): readonly ContentPair[] | PairsRefused {
  const pairs: ContentPair[] = []
  let open: string | null = null
  for (let at = 0; at < argv.length; at += 1) {
    const token = argv[at]
    if (token === undefined) continue
    if (token === FILE_PATH) {
      if (open !== null) {
        return {
          refusal:
            `${FILE_PATH} ${open} is given no ${CONTENT_FILE} before the next ${FILE_PATH}, so no ` +
            "body is named for it — every path this call writes carries one",
        }
      }
      const value = argv[at + 1]
      if (value === undefined) return { refusal: `${FILE_PATH} needs a value` }
      open = value
      at += 1
      continue
    }
    if (token === CONTENT_FILE) {
      const value = argv[at + 1]
      if (value === undefined) return { refusal: `${CONTENT_FILE} needs a value` }
      if (open === null) {
        return {
          refusal: `${CONTENT_FILE} ${value} follows no ${FILE_PATH}, so nothing says where that body lands`,
        }
      }
      pairs.push({ filePath: open, contentFile: value })
      open = null
      at += 1
      continue
    }
    if (takesValue.includes(token)) at += 1
  }
  if (open !== null) return { refusal: `${FILE_PATH} needs ${CONTENT_FILE}` }
  return pairs
}

export function candidatePaths(argv: readonly string[]): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const token = argv[at]
    if (token === undefined) continue
    if (!token.startsWith("--")) {
      found.push(token)
      continue
    }
    if (STANDALONE.includes(token)) continue
    const value = argv[at + 1]
    at += 1
    if (token === FILE_PATH && value !== undefined) found.push(value)
  }
  return found
}

export function repoNamed(argv: readonly string[]): Addressable | null {
  const at = argv.indexOf("--repo")
  if (at === -1) return null
  const value = argv[at + 1]
  if (value === undefined) fail("--repo needs a value")
  if (!isAddressable(value)) {
    fail(`--repo ${value} names no repo a command addresses; it takes ${ADDRESSABLE_NAMED}`)
  }
  return value
}

export function repoFlag(argv: readonly string[]): Addressable {
  return repoNamed(argv) ?? AKASHA
}

export interface Addressed {
  readonly repo: Addressable
  readonly absolute: string
}

export function addressOf(argv: readonly string[], also: readonly string[] = []): Addressed {
  const roots = resolveRoots()
  const stated = [...candidatePaths(argv), ...also].map((one) => resolve(process.cwd(), one))
  const looked = stated.length === 0 ? [process.cwd()] : stated
  const where = new Map<Repo, string>()
  for (const absolute of looked) {
    const found = locate(absolute, roots)
    if (found === null || where.has(found.repo)) continue
    where.set(found.repo, absolute)
  }
  if (where.size === 0) {
    fail(
      `${looked.join(", ")} ${looked.length === 1 ? "is" : "are"} inside no repo, so nothing here ` +
        `says which repo this call addresses — the working directory it tried is ${process.cwd()}`
    )
  }
  if (where.size > 1) {
    fail(
      "the paths named here stand in more than one repo, and a call addresses one: " +
        [...where].map(([repo, absolute]) => `${absolute} is inside ${repo}`).join(", ")
    )
  }
  const [repo, absolute] = [...where][0] as [Repo, string]
  if (!isAddressable(repo)) {
    fail(`${absolute} is inside no repo this reaches — it reaches ${ADDRESSABLE_NAMED}`)
  }
  const named = repoNamed(argv)
  if (named !== null && named !== repo) {
    fail(`--repo ${named} names ${named}, and ${absolute} is inside ${repo} — the path settles it`)
  }
  return { repo, absolute }
}

export function repoOf(argv: readonly string[]): Addressable {
  return addressOf(argv).repo
}

export function rootsOf(argv: readonly string[], also: readonly string[] = []): Roots {
  const { repo, absolute } = addressOf(argv, also)
  return resolveRoots(repo)
}

export function rootsOfSide(flag: string, paths: readonly string[]): Roots {
  const roots = resolveRoots()
  const where = new Map<Repo, string>()
  for (const one of paths) {
    const absolute = resolve(process.cwd(), one)
    const found = locate(absolute, roots)
    if (found === null) {
      fail(
        `${absolute} is inside no repo, so nothing here says which repo ${flag} reaches — the ` +
          `working directory it tried is ${process.cwd()}`
      )
    }
    if (!where.has(found.repo)) where.set(found.repo, absolute)
  }
  if (where.size > 1) {
    fail(
      `the paths ${flag} names stand in more than one repo, and one side of a move addresses one: ` +
        [...where].map(([repo, absolute]) => `${absolute} is inside ${repo}`).join(", ")
    )
  }
  const first = [...where][0]
  if (first === undefined) fail(`${flag} names no path, so nothing says which repo it reaches`)
  const [repo, absolute] = first
  if (!isAddressable(repo)) {
    fail(`${absolute} is inside no repo this reaches — it reaches ${ADDRESSABLE_NAMED}`)
  }
  return resolveRoots(repo)
}

export function rejectUnknownFlags(
  argv: readonly string[],
  takesValue: readonly string[],
  standalone: readonly string[]
): void {
  for (let at = 0; at < argv.length; at += 1) {
    const token = argv[at]
    if (token === undefined || !token.startsWith("--")) continue
    if (takesValue.includes(token)) {
      at += 1
      continue
    }
    if (standalone.includes(token)) continue
    fail(`${token} is not a flag this command takes`)
  }
}

export function readsPayload(
  pairs: number,
  inputFile: string | null,
  takingAway: boolean
): boolean {
  if (pairs > 0) return false
  return inputFile !== null || !takingAway
}

export async function readPayloadIfAny(source: string): Promise<unknown | null> {
  const bytes = source === "-" ? await Bun.stdin.bytes() : readFileSync(source)
  if (bytes.length === 0) return null
  const text = decodeUtf8(bytes)
  if (text === null) fail(notUtf8(source === "-" ? "stdin" : source, bytes))
  if (text.trim() === "") return null
  try {
    return JSON.parse(text)
  } catch (err) {
    fail(`input is not JSON: ${err instanceof Error ? err.message : String(err)}`)
  }
}

export async function readPayload(source: string): Promise<unknown> {
  const bytes = source === "-" ? await Bun.stdin.bytes() : readFileSync(source)
  const text = decodeUtf8(bytes)
  if (text === null) fail(notUtf8(source === "-" ? "stdin" : source, bytes))
  try {
    return JSON.parse(text)
  } catch (err) {
    fail(`input is not JSON: ${err instanceof Error ? err.message : String(err)}`)
  }
}

export function record(value: unknown, where: string): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail(`${where} is not an object`)
  }
  return value as Record<string, unknown>
}

export function requiredString(
  source: Record<string, unknown>,
  key: string,
  where: string
): string {
  const value = source[key]
  if (typeof value !== "string") fail(`${where} needs a \`${key}\` string`)
  return value
}

export interface Declared {
  readonly source: Record<string, unknown>
  readonly filePath: string
  readonly where: string
}

export function declaredEntries(
  payload: unknown,
  verb: string,
  alsoTakingAway = false
): readonly Declared[] {
  const many = Array.isArray(payload)
  const list = many ? payload : [payload]
  if (list.length === 0 && !alsoTakingAway) {
    fail(`the payload declares no file, so it asks for no ${verb} at all`)
  }
  return list.map((one, i) => {
    const where = many ? `entry ${i + 1}` : "the payload"
    const source = record(one, where)
    return { source, filePath: requiredString(source, "file_path", where), where }
  })
}
