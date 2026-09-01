import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"

export class ImessageImportError extends Error {}

function imessageRoot(): string {
  return process.env.OPS_IMESSAGE_ROOT ?? rootFor(resolveRoots(), AKASHA)
}

async function akashaModule<T>(ref: string): Promise<T> {
  const root = imessageRoot()
  let file: string
  try {
    file = Bun.resolveSync(ref, root)
  } catch {
    throw new ImessageImportError(
      `\`${ref}\` resolves to nothing from ${root} — a subpath is read through the package's own \`exports\` map, never as a file path`
    )
  }
  try {
    return (await import(file)) as T
  } catch (err) {
    throw new ImessageImportError(
      `\`${ref}\` could not be loaded from ${root}: ${err instanceof Error ? err.message : String(err)}`
    )
  }
}

export type ImessageRemote = typeof import("@akasha/imessage/remote")

export function imessageRemote(): Promise<ImessageRemote> {
  return akashaModule<ImessageRemote>("@akasha/imessage/remote")
}

export type ImessageContactsDb = typeof import("@akasha/imessage/contacts-db")

export function imessageContactsDb(): Promise<ImessageContactsDb> {
  return akashaModule<ImessageContactsDb>("@akasha/imessage/contacts-db")
}

export type ImessageChatDb = typeof import("@akasha/imessage/chat-db")

export function imessageChatDb(): Promise<ImessageChatDb> {
  return akashaModule<ImessageChatDb>("@akasha/imessage/chat-db")
}

export type ImessageHost = typeof import("@akasha/imessage/host")

export function imessageHost(): Promise<ImessageHost> {
  return akashaModule<ImessageHost>("@akasha/imessage/host")
}

export type SshReach = typeof import("@akasha/ssh-access/ssh-reach")

export function sshReach(): Promise<SshReach> {
  return akashaModule<SshReach>("@akasha/ssh-access/ssh-reach")
}

export type ImessageSend = typeof import("@akasha/imessage/send")

export function imessageSendScript(): Promise<ImessageSend> {
  return akashaModule<ImessageSend>("@akasha/imessage/send")
}
