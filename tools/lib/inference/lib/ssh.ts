import { spawn } from "node:child_process"
import { OperationalError } from "@akasha/errors-core/exit-code"
import { expandTilde } from "@akasha/utils-fs/expand-tilde"

export interface SshTarget {
  readonly user: string
  readonly host: string
  readonly keyPath: string
}

function sshArgs(target: SshTarget): readonly string[] {
  return [
    "-i",
    expandTilde(target.keyPath),
    "-o",
    "StrictHostKeyChecking=no",
    "-o",
    "UserKnownHostsFile=/dev/null",
    "-o",
    "ConnectTimeout=10",
    `${target.user}@${target.host}`,
  ]
}

interface RunResult {
  readonly stdout: string
}

function runSshInner(target: SshTarget, script: string, capture: boolean): Promise<RunResult> {
  return new Promise<RunResult>((resolve, reject) => {
    const child = spawn("ssh", [...sshArgs(target), "bash -s"], {
      stdio: ["pipe", capture ? "pipe" : "inherit", "inherit"],
    })
    let stdout = ""
    if (capture && child.stdout) {
      child.stdout.on("data", (chunk: Buffer) => {
        stdout += chunk.toString()
      })
    }
    child.on("error", (err: Error & { code?: string }) => {
      if (err.code === "ENOENT") {
        reject(new OperationalError("ssh not found on PATH"))
        return
      }
      reject(new OperationalError(`ssh spawn failed: ${err.message}`))
    })
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout })
        return
      }
      reject(new OperationalError(`ssh exited ${code} (host: ${target.user}@${target.host})`))
    })
    if (child.stdin) {
      child.stdin.write(script)
      child.stdin.end()
    }
  })
}

export async function runSsh(target: SshTarget, script: string): Promise<void> {
  await runSshInner(target, script, false)
}

export async function runSshCapture(target: SshTarget, script: string): Promise<string> {
  const result = await runSshInner(target, script, true)
  return result.stdout
}

function scpOpts(target: SshTarget): readonly string[] {
  return [
    "-i",
    expandTilde(target.keyPath),
    "-o",
    "StrictHostKeyChecking=no",
    "-o",
    "UserKnownHostsFile=/dev/null",
    "-o",
    "ConnectTimeout=10",
  ]
}

function runScp(from: string, to: string, opts: readonly string[]): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const child = spawn("scp", [...opts, from, to], { stdio: ["ignore", "inherit", "inherit"] })
    child.on("error", (err: Error & { code?: string }) => {
      reject(
        new OperationalError(
          err.code === "ENOENT" ? "scp not found on PATH" : `scp spawn failed: ${err.message}`
        )
      )
    })
    child.on("close", (code) => {
      if (code === 0) resolve()
      else reject(new OperationalError(`scp exited ${code} (${from} -> ${to})`))
    })
  })
}

export async function scpUpload(
  target: SshTarget,
  localPath: string,
  remotePath: string
): Promise<void> {
  await runScp(localPath, `${target.user}@${target.host}:${remotePath}`, scpOpts(target))
}

export async function scpDownload(
  target: SshTarget,
  remotePath: string,
  localPath: string
): Promise<void> {
  await runScp(`${target.user}@${target.host}:${remotePath}`, localPath, scpOpts(target))
}

export async function syncDir(args: {
  target: SshTarget
  localDir: string
  remoteDir: string
}): Promise<void> {
  const { target, localDir, remoteDir } = args
  const quotedRemote = `'${remoteDir.replaceAll("'", "'\\''")}'`
  const remoteCmd = `mkdir -p ${quotedRemote} && tar xzf - -C ${quotedRemote}`
  return new Promise<void>((resolve, reject) => {
    const tar = spawn("tar", ["czf", "-", "-C", localDir, "."], {
      stdio: ["ignore", "pipe", "inherit"],
    })
    const ssh = spawn("ssh", [...sshArgs(target), remoteCmd], {
      stdio: ["pipe", "inherit", "inherit"],
    })
    let settled = false
    const fail = (err: Error): undefined => {
      if (settled) return
      settled = true
      reject(new OperationalError(`syncDir failed for ${remoteDir}: ${err.message}`))
    }
    tar.on("error", fail)
    ssh.on("error", fail)
    if (tar.stdout && ssh.stdin) {
      tar.stdout.pipe(ssh.stdin)
    }
    ssh.on("close", (code) => {
      if (settled) return
      settled = true
      if (code === 0) {
        resolve()
        return
      }
      reject(new OperationalError(`syncDir failed (ssh exit ${code}) for ${remoteDir}`))
    })
  })
}
