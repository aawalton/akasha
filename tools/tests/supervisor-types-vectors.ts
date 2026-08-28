
export interface Declaration {
  readonly name: string
  readonly lines: readonly string[]
}

export function surface(dts: string): readonly string[] {
  return dts
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => line !== "")
    .map((line) => line.replace(/(from "\.\/[^"]+)\.ts";$/, '$1";'))
}

export function declarations(lines: readonly string[]): readonly Declaration[] {
  const found: { name: string; lines: string[] }[] = []
  for (const line of lines) {
    if (!line.startsWith(" ") && !line.startsWith("\t") && !line.startsWith("}")) {
      const declared = /^(?:export )?(?:type|interface) (\w+)/.exec(line)
      const imported = /^import type \{ ([\w, ]+) \} from/.exec(line)
      found.push({ name: declared?.[1] ?? (imported === null ? line : `import ${imported[1]}`), lines: [line] })
      continue
    }
    const open = found.at(-1)
    if (open === undefined) throw new Error(`a line stood under no declaration: ${line}`)
    open.lines.push(line)
  }
  return found
}

export const STANDING: readonly Declaration[] = [
  {
    name: "import ChildExitStatus",
    lines: ['import type { ChildExitStatus } from "./supervisor-child-exit-rule";'],
  },
  {
    name: "PipedProc",
    lines: [
      "export type PipedProc = {",
      '    stdin: import("bun").FileSink;',
      "    stdout: ReadableStream<Uint8Array>;",
      "    stderr: ReadableStream<Uint8Array>;",
      "    exited: Promise<number>;",
      "    pid: number;",
      "    kill: (signal?: string | number) => void;",
      "};",
    ],
  },
  {
    name: "InheritedProc",
    lines: [
      "export type InheritedProc = {",
      "    exited: Promise<number>;",
      "    exitStatus: () => ChildExitStatus;",
      "    pid: number;",
      "    kill: (signal?: string | number) => void;",
      "};",
    ],
  },
  {
    name: "AgentProcess",
    lines: [
      "export type AgentProcess = {",
      "    process_id: string;",
      "    agent_id: string;",
      "    user_id: string;",
      "    session_id: string;",
      "    started_at: string;",
      "    proc: PipedProc | InheritedProc | null;",
      "    interactive: boolean;",
      "    currentAccount: string;",
      "    credentialRefreshTimer: ReturnType<typeof setInterval> | null;",
      "    heartbeatTimer: ReturnType<typeof setInterval> | null;",
      "    stopCredentialWatch: (() => void) | null;",
      "    proxyLivenessMonitor: {",
      "        stop: () => void;",
      "    } | null;",
      "    limitResumeMonitor: {",
      "        stop: () => void;",
      "    } | null;",
      "    waitResumeMonitor: {",
      "        stop: () => void;",
      "    } | null;",
      "    mcpConfigPath: string | null;",
      "    configDir: string | null;",
      "    stopSessionWatch?: () => void;",
      "    stopSessionRotatedWatch?: () => void;",
      "    idle?: boolean;",
      "    adopted?: boolean;",
      "};",
    ],
  },
]
