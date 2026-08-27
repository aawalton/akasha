import { readFileSync, rmSync } from "node:fs"
import { VECTORS } from "./model-gateway-main-vectors.ts"

const HERE = new URL(".", import.meta.url).pathname

export const ARM = `${HERE}model-gateway-main-arm.ts`

export const PORTED_DIR = `${HERE}../lib/model-gateway`

export interface Event {
  readonly e: string
  readonly [field: string]: unknown
}

export interface Shared {
  readonly label: string
  readonly events: readonly Event[]
  readonly lines: readonly string[]
  readonly exitCode: number
}

export async function drive(
  dir: string,
  subject: string,
  scratch: string
): Promise<readonly Shared[]> {
  return await Promise.all(
    VECTORS.map(async (v) => {
      const out = `${scratch}/${v.label}.json`
      rmSync(out, { force: true })
      const run = Bun.spawn({
        cmd: [process.execPath, ARM, v.label, out, dir, subject],
        stdout: "pipe",
        stderr: "pipe",
      })
      const stderr = await new Response(run.stderr).text()
      const code = await run.exited
      try {
        return (JSON.parse(readFileSync(out, "utf8")) as { shared: Shared }).shared
      } catch {
        throw new Error(
          `BROKEN: the ${v.label} vector produced no row (exit ${code}): ${stderr.slice(0, 400)}`
        )
      }
    })
  )
}

export function namesOf(row: Shared | undefined): readonly string[] {
  return (row?.events ?? []).map((one) => one.e)
}
