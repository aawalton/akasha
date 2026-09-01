import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"

const PACKAGE = "@akasha/imessage"

export class ImessageImportError extends Error {}

function imessageRoot(): string {
  return process.env.OPS_IMESSAGE_ROOT ?? rootFor(resolveRoots(), AKASHA)
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


export type ImessageRemote = typeof import("@akasha/imessage/remote")

export function imessageRemote(): Promise<ImessageRemote> {
  return imessageModule<ImessageRemote>("remote")
}

export type ImessageContactsDb = typeof import("@akasha/imessage/contacts-db")

export function imessageContactsDb(): Promise<ImessageContactsDb> {
  return imessageModule<ImessageContactsDb>("contacts-db")
}

export type ImessageChatDb = typeof import("@akasha/imessage/chat-db")

export function imessageChatDb(): Promise<ImessageChatDb> {
  return imessageModule<ImessageChatDb>("chat-db")
}

export type ImessageHost = typeof import("@akasha/imessage/host")

export function imessageHost(): Promise<ImessageHost> {
  return imessageModule<ImessageHost>("host")
}

export type ImessageSsh = typeof import("@akasha/imessage/ssh")

export function imessageSsh(): Promise<ImessageSsh> {
  return imessageModule<ImessageSsh>("ssh")
}

export type ImessageSend = typeof import("@akasha/imessage/send")

export function imessageSendScript(): Promise<ImessageSend> {
  return imessageModule<ImessageSend>("send")
}
