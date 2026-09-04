import { inputError } from "@akasha/errors-core/exit-code"

export async function readStdinOrFile(path: string): Promise<string> {
  if (path === "-") return await readStdin()
  try {
    return await Bun.file(path).text()
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw inputError(`failed to read ${path}: ${reason}`)
  }
}

export async function readStdin(): Promise<string> {
  return await new Response(Bun.stdin.stream()).text()
}
