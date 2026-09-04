import { realpathSync } from "node:fs"
import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { codeRoot } from "@akasha/pages-system/code-root"
import { port as portHousing } from "@akasha/temper-upstream-data/housing-upstream-port"
import { port as portMapData } from "@akasha/temper-upstream-data/map-data-upstream-port"
import { port as portTreasure } from "@akasha/temper-upstream-data/treasure-upstream-port"
import type { UpstreamLibrary } from "@akasha/temper-upstream-data/upstream-libraries"
import { libraryNamed, UPSTREAM_LIBRARIES } from "@akasha/temper-upstream-data/upstream-libraries"
import { port as portZone } from "@akasha/temper-upstream-data/zone-upstream-port"

const SAID_WRONG = 1

const DATA = 2

const FAILED = 3

const CODE_ROOT_FLAG = "--code-root"

const CODE_ROOT_ENV = "CODE_ROOT"

const TAKING_A_VALUE = [CODE_ROOT_FLAG]

const PORTED_BY: Record<UpstreamLibrary, (codeRoot: string) => Promise<void>> = {
  housing: portHousing,
  "lib-map-data": portMapData,
  "lib-treasure": portTreasure,
  "lib-zone": portZone,
}

function valuesOf(argv: readonly string[], flag: string): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const value = argv[at + 1]
    if (argv[at] === flag && value !== undefined) found.push(value)
  }
  return found
}

function namesIn(argv: readonly string[]): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (TAKING_A_VALUE.includes(one)) {
      at += 1
      continue
    }
    if (one.startsWith("-")) continue
    found.push(one)
  }
  return found
}

function messageOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

function carried(): string {
  return UPSTREAM_LIBRARIES.join(", ")
}

export async function temperUpstreamDataPort(argv: readonly string[] = []): Promise<Answer> {
  const names = namesIn(argv)
  if (names.length === 0) {
    return refused(`name the upstream library ported — this carries ${carried()}`, SAID_WRONG)
  }
  if (names.length > 1) {
    return refused(
      `one call ports one library, and ${names.join(", ")} names ${String(names.length)}`,
      SAID_WRONG
    )
  }

  const named = names[0] as string
  const library = libraryNamed(named)
  if (library === undefined) {
    return refused(
      `${named} is no upstream library this ports — it carries ${carried()}`,
      SAID_WRONG
    )
  }

  const askedRoot = valuesOf(argv, CODE_ROOT_FLAG)[0]
  let root: string
  try {
    root = realpathSync(askedRoot ?? codeRoot())
  } catch (thrown) {
    return refused(
      `${askedRoot ?? codeRoot()} is no checkout on this disk, so nothing was ported into it: ${messageOf(thrown)}`,
      DATA
    )
  }

  process.env[CODE_ROOT_ENV] = root

  try {
    await PORTED_BY[library](root)
  } catch (thrown) {
    return refused(`${library} was not ported whole into ${root}: ${messageOf(thrown)}`, FAILED)
  }

  return {
    report: [`ported ${library} into ${root}, writing each emitted file whole`],
    refusals: [],
    code: 0,
  }
}
