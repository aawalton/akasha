import { resolveRoots } from "../../repo/roots/roots"

const PACKAGE = "@alanwalton/imessage"

export class ImessageImportError extends Error {}

function imessageRoot(): string {
  return process.env.OPS_IMESSAGE_ROOT ?? resolveRoots().instructions
}

async function imessageModule<T>(subpath: string): Promise<T> {
  const ref = `${PACKAGE}/${subpath}`
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


export type ImessageRemote = typeof import("@alanwalton/imessage/lib/remote")

export function imessageRemote(): Promise<ImessageRemote> {
  return imessageModule<ImessageRemote>("lib/remote")
}

export type ImessageContactsDb = typeof import("@alanwalton/imessage/lib/contacts-db")

export function imessageContactsDb(): Promise<ImessageContactsDb> {
  return imessageModule<ImessageContactsDb>("lib/contacts-db")
}

export type ImessageChatDb = typeof import("@alanwalton/imessage/lib/chat-db")

export function imessageChatDb(): Promise<ImessageChatDb> {
  return imessageModule<ImessageChatDb>("lib/chat-db")
}

export type ImessageHost = typeof import("@alanwalton/imessage/lib/host")

export function imessageHost(): Promise<ImessageHost> {
  return imessageModule<ImessageHost>("lib/host")
}

export type ImessageSsh = typeof import("@alanwalton/imessage/lib/ssh")

export function imessageSsh(): Promise<ImessageSsh> {
  return imessageModule<ImessageSsh>("lib/ssh")
}

export type ImessageSend = typeof import("@alanwalton/imessage/imessage/send")

export function imessageSendScript(): Promise<ImessageSend> {
  return imessageModule<ImessageSend>("imessage/send")
}
