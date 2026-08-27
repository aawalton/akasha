import * as sshModule from "./inference/lib/ssh.ts"


export async function inferenceSsh(): Promise<typeof sshModule> {
  return sshModule
}
