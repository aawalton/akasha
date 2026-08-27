// Duplicated from @infra/checks, which is leaving this repository.
//
// The temper build-deploy checks read temper addon source, which stays here, so these
// checks stay here too and need these helpers where they can reach them. The instructions
// repo already carries its own equivalents (tools/lib/parse-args.ts, suggest-closest.ts,
// check-workflow/error-message.ts, code-root.ts), so nothing is shared across the seam:
// each side holds the copy it reads.

export function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  if (typeof err === "string") return err
  try {
    return String(err)
  } catch {
    return "<unrenderable error>"
  }
}

export function errnoCode(err: unknown): string | undefined {
  if (err === null || typeof err !== "object" || !("code" in err)) return undefined
  const { code } = err
  return typeof code === "string" ? code : undefined
}
