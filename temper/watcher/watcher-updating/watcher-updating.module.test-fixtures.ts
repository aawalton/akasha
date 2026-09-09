import type {
  FetchingBytes,
  SourceRepo,
  VersionResponseObservation,
} from "./watcher-updating.module.code.ts"

export const RUNNING = "3f3a986e34583abb8d0112cd8be450eb309bc779"
export const DEPLOYED = "c5ea83760f1e4a9b8d3c2f5e7a1b9d4c6e8f0a2b"
export const EXE = "/opt/temper/temper-watcher-worker.exe"
export const NEXT_EXE = "/opt/temper/temper-watcher-worker.new.exe"
export const PREVIOUS_EXE = "/opt/temper/temper-watcher-worker.old.exe"

export function liveJson(version: string): VersionResponseObservation {
  return {
    ok: true,
    status: 200,
    contentType: "application/json;charset=utf-8",
    body: JSON.stringify({ version, downloadUrl: "/api/watcher/worker/download" }),
    runningVersion: RUNNING,
  }
}

const htmlPage = `<!DOCTYPE html>\n<html>\n  <head>\n    <title>502 Bad Gateway</title>\n  </head>\n  <body>\n    ${"x".repeat(5000)}\n  </body>\n</html>`

export function badGateway(): VersionResponseObservation {
  return {
    ok: false,
    status: 502,
    contentType: "text/html",
    body: htmlPage,
    runningVersion: RUNNING,
  }
}

export interface SwapDeps {
  readonly sourceRuntime: () => boolean
  readonly execPath: string
  readonly fetchBytes: FetchingBytes
  readonly writeFile: (path: string, body: Uint8Array) => undefined
  readonly rename: (from: string, to: string) => undefined
  readonly exit: (code: number) => undefined
}

export function swapRecorder(): { steps: string[]; deps: SwapDeps } {
  const steps: string[] = []
  return {
    steps,
    deps: {
      sourceRuntime: () => false,
      execPath: EXE,
      fetchBytes: async (url) => {
        steps.push(`fetch ${url}`)
        return { ok: true, status: 200, body: new Uint8Array([77, 90]) }
      },
      writeFile: (path, body) => {
        steps.push(`write ${path} ${String(body.length)}`)
        return undefined
      },
      rename: (from, to) => {
        steps.push(`rename ${from} -> ${to}`)
        return undefined
      },
      exit: (code) => {
        steps.push(`exit ${String(code)}`)
        return undefined
      },
    },
  }
}

export function repoStub(over: Partial<SourceRepo>, calls: string[] = []): SourceRepo {
  return {
    headSha: () => {
      calls.push("headSha")
      return RUNNING
    },
    fetchOrigin: () => {
      calls.push("fetchOrigin")
      return true
    },
    holdsCommit: () => {
      calls.push("holdsCommit")
      return true
    },
    isAncestor: (earlier, later) => {
      calls.push(`isAncestor ${earlier.slice(0, 4)} ${later.slice(0, 4)}`)
      return earlier === RUNNING
    },
    fastForwardTo: () => {
      calls.push("fastForwardTo")
      return true
    },
    ...over,
  }
}

export function cleanupRecorder(): {
  looked: string[]
  removed: string[]
  deps: {
    sourceRuntime: () => boolean
    execPath: string
    present: (path: string) => boolean
    remove: (path: string) => undefined
  }
} {
  const looked: string[] = []
  const removed: string[] = []
  return {
    looked,
    removed,
    deps: {
      sourceRuntime: () => false,
      execPath: EXE,
      present: (path) => {
        looked.push(path)
        return true
      },
      remove: (path) => {
        removed.push(path)
        return undefined
      },
    },
  }
}
