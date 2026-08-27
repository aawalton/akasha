import * as outputPathModule from "./inference/cli/output-path.ts"
import * as runRecordModule from "./inference/inference-run-record.ts"
import * as runStoreModule from "./inference/inference-run-store.ts"


export function formatCommandLine(command: string, args: readonly string[]): string {
  const quoted = args.map((a) => (/\s/.test(a) ? `'${a}'` : a))
  return `ops inference ${command} ${quoted.join(" ")}`.trim()
}

export async function inferenceRunRecord(): Promise<typeof runRecordModule> {
  return runRecordModule
}

export async function inferenceRunStore(): Promise<typeof runStoreModule> {
  return runStoreModule
}

export async function inferenceOutputPath(): Promise<typeof outputPathModule> {
  return outputPathModule
}
