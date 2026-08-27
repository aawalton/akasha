import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"

const HERE = new URL(".", import.meta.url).pathname

export interface Mutation {
  readonly label: string
  readonly from: string
  readonly to: string
  readonly survives?: true
  readonly because?: string
}

export type Namespace = Record<string, unknown>

export interface Rig {
  readonly occurrences: (from: string) => number
  readonly control: () => Promise<Namespace>
  readonly mutant: (from: string, to: string) => Promise<Namespace>
  readonly release: () => void
}

export function rigFor(libRelPath: string): Rig {
  const source = resolve(HERE, "..", "lib", libRelPath)
  const sourceDir = dirname(source)
  const parentDir = resolve(sourceDir, "..")
  const original = readFileSync(source, "utf8")
  const scratch = mkdtempSync("/var/tmp/model-gateway-mutant-")
  let minted = 0

  const reachable = (body: string): string =>
    body.replaceAll('from "./', `from "${sourceDir}/`).replaceAll('from "../', `from "${parentDir}/`)

  const occurrences = (from: string): number => original.split(from).length - 1

  const loaded = async (body: string, kind: string): Promise<Namespace> => {
    minted += 1
    const path = `${scratch}/${kind}-${minted}.ts`
    writeFileSync(path, reachable(body))
    return (await import(path)) as Namespace
  }

  return {
    occurrences,
    control: () => loaded(original, "control"),
    async mutant(from, to) {
      const count = occurrences(from)
      if (count !== 1) {
        throw new Error(`BROKEN: the mutation target occurs ${count} times, not once: ${from}`)
      }
      return loaded(original.replace(from, to), "mutant")
    },
    release: () => rmSync(scratch, { recursive: true, force: true }),
  }
}
