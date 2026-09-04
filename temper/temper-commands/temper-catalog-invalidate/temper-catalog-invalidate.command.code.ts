import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { CATALOG_DOMAIN_KEYS } from "@akasha/temper-catalog-core/domain-keys"
import { resolveSideFilePath } from "@akasha/temper-catalog-side-file/catalog-file-paths"
import {
  computeNextSideFile,
  parseSideFile,
  serializeSideFile,
} from "@akasha/temper-catalog-side-file/catalog-side-file"

const SAID_WRONG = 1

const FAILED = 3

const DOMAIN_FLAG = "--domain"

const ALL_FLAG = "--all"

const SIDE_FILE_FLAG = "--side-file"

const JSON_FLAG = "--json"

const SPACES = 2

function valuesOf(argv: readonly string[], flag: string): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const value = argv[at + 1]
    if (argv[at] === flag && value !== undefined) found.push(value)
  }
  return found
}

function messageOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

function saidWrongIn(argv: readonly string[], asked: readonly string[]): string | null {
  const all = argv.includes(ALL_FLAG)
  if (all && asked.length > 0) {
    return `${ALL_FLAG} asks for every domain, so it takes no ${DOMAIN_FLAG}, and ${asked.join(", ")} names ${String(asked.length)}`
  }
  if (!all && asked.length === 0) {
    return `name a domain with ${DOMAIN_FLAG}, or say ${ALL_FLAG} to ask for every one of them`
  }
  const known = new Set<string>(CATALOG_DOMAIN_KEYS)
  const stray = asked.filter((one) => !known.has(one))
  if (stray.length > 0) {
    return `${stray.join(", ")} is no domain the catalog addon registers, and the registry holds ${String(CATALOG_DOMAIN_KEYS.length)} of them`
  }
  return null
}

export function temperCatalogInvalidate(argv: readonly string[] = []): Answer {
  const asked = valuesOf(argv, DOMAIN_FLAG)
  const wrong = saidWrongIn(argv, asked)
  if (wrong !== null) return refused(wrong, SAID_WRONG)

  const sideFilePath = resolveSideFilePath(valuesOf(argv, SIDE_FILE_FLAG)[0])

  let next: ReturnType<typeof computeNextSideFile>
  try {
    const prior = existsSync(sideFilePath)
      ? parseSideFile(readFileSync(sideFilePath, "utf-8"))
      : undefined
    next = computeNextSideFile(prior, argv.includes(ALL_FLAG) ? [] : asked)
    mkdirSync(dirname(sideFilePath), { recursive: true })
    writeFileSync(sideFilePath, serializeSideFile(next), "utf-8")
  } catch (thrown) {
    return refused(
      `the request at ${sideFilePath} was not written, so the addon collects nothing again: ${messageOf(thrown)}`,
      FAILED
    )
  }

  if (argv.includes(JSON_FLAG)) {
    return { report: JSON.stringify(next, null, SPACES).split("\n"), refusals: [], code: 0 }
  }

  const named = next.invalidateDomains.length === 0 ? "all" : next.invalidateDomains.join(",")
  return {
    report: [
      `invalidateVersion=${String(next.invalidateVersion)} invalidateDomains=${named}`,
      `written to ${sideFilePath}, and the addon collects again when the game next reloads`,
    ],
    refusals: [],
    code: 0,
  }
}
