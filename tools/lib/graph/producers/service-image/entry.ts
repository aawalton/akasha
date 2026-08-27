const BUN_COMMAND = "bun"

const RUN_SUBCOMMAND = "run"

const CWD_FLAG = "--cwd"

const DEFAULT_ENTRY = "src/server.ts"

const TYPESCRIPT_SUFFIXES: readonly string[] = [".ts", ".tsx"]

const isTypeScript = (path: string): boolean =>
  TYPESCRIPT_SUFFIXES.some((suffix) => path.endsWith(suffix))

export const entryOf = (
  name: string,
  dir: string,
  runtimeCmd: readonly string[] | undefined
): string => {
  if (runtimeCmd === undefined) return `${dir}/${DEFAULT_ENTRY}`
  const spelled = runtimeCmd.join(" ")
  const at = runtimeCmd.indexOf(BUN_COMMAND)
  if (at === -1 || runtimeCmd[at + 1] !== RUN_SUBCOMMAND) {
    throw new Error(`graph: service image ${name} runs \`${spelled}\`, which never reaches bun run`)
  }
  let cwd = ""
  let step = at + 2
  while (step < runtimeCmd.length) {
    const token = runtimeCmd[step]
    if (token === undefined) break
    if (token === CWD_FLAG) {
      const next = runtimeCmd[step + 1]
      if (next === undefined) break
      cwd = next
      step += 2
      continue
    }
    if (token.startsWith("-")) {
      step += 1
      continue
    }
    const path = cwd === "" ? token : `${cwd}/${token}`
    if (!isTypeScript(path)) {
      throw new Error(`graph: service image ${name} runs \`${spelled}\`, starting no TypeScript file`)
    }
    return path
  }
  throw new Error(`graph: service image ${name} runs \`${spelled}\`, naming no script after bun run`)
}
