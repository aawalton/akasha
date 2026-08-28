
const TOKEN_URL = "https://oauth2.googleapis.com/token"
const API = "https://gmail.googleapis.com/gmail/v1/users/me"

const WANTED_HEADERS = ["From", "To", "Subject", "List-Id", "List-Unsubscribe", "List-Unsubscribe-Post"]

export interface Message {
  readonly id: string
  readonly threadId: string
  readonly from: string
  readonly fromAddress: string
  readonly to: string
  readonly subject: string
  readonly listId: string
  readonly labelIds: readonly string[]
  readonly arrivedAt: Date
  readonly unsubscribe: string
  readonly oneClickUnsubscribe: boolean
}

export interface Mailbox {
  profile: () => Promise<{ readonly emailAddress: string; readonly historyId: string }>
  addedSince: (historyId: string) => Promise<{ readonly ids: readonly string[]; readonly historyId: string } | null>
  inboxIds: () => Promise<readonly string[]>
  message: (id: string) => Promise<Message>
  rawOf: (id: string) => Promise<Buffer>
  modify: (id: string, change: { readonly add?: readonly string[]; readonly remove?: readonly string[] }) => Promise<void>
  send: (message: Buffer) => Promise<void>
}

function required(name: string): string {
  const value = process.env[name]
  if (value === undefined || value === "") throw new Error(`${name} is not set — source ~/.secrets.env`)
  return value
}

function addressOf(header: string): string {
  const angled = /<([^<>]+)>/.exec(header)
  const bare = angled === null ? header : angled[1]
  return bare.trim().toLowerCase()
}

function decodeBase64Url(data: string): Buffer {
  return Buffer.from(data.replace(/-/g, "+").replace(/_/g, "/"), "base64")
}

function encodeBase64Url(bytes: Buffer): string {
  return bytes.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

export async function mailbox(): Promise<Mailbox> {
  let token = ""
  let expiresAt = 0

  async function refresh(): Promise<void> {
    const body = new URLSearchParams({
      client_id: required("GOOGLE_GMAIL_OAUTH_CLIENT_ID"),
      client_secret: required("GOOGLE_GMAIL_OAUTH_CLIENT_SECRET"),
      refresh_token: required("GOOGLE_GMAIL_OAUTH_REFRESH_TOKEN"),
      grant_type: "refresh_token",
    })
    const res = await fetch(TOKEN_URL, { method: "POST", body })
    if (!res.ok) throw new Error(`token refresh: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`)
    const json = (await res.json()) as { access_token?: unknown; expires_in?: unknown }
    if (typeof json.access_token !== "string") throw new Error("token refresh: the body carried no access_token")
    token = json.access_token
    expiresAt = Date.now() + (typeof json.expires_in === "number" ? json.expires_in - 60 : 0) * 1000
  }

  async function call(path: string, init?: RequestInit): Promise<unknown | "not-found"> {
    if (Date.now() >= expiresAt) await refresh()
    const res = await fetch(`${API}${path}`, {
      ...init,
      headers: { ...(init?.headers ?? {}), Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    })
    if (res.status === 404) return "not-found"
    if (!res.ok) throw new Error(`${path}: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`)
    return res.status === 204 ? {} : await res.json()
  }

  return {
    async profile() {
      const got = (await call("/profile")) as { emailAddress?: string; historyId?: string }
      return { emailAddress: got.emailAddress ?? "", historyId: String(got.historyId ?? "") }
    },

    async addedSince(historyId) {
      const ids: string[] = []
      let latest = historyId
      let pageToken: string | undefined
      do {
        const query = new URLSearchParams({ startHistoryId: historyId, historyTypes: "messageAdded", labelId: "INBOX" })
        if (pageToken !== undefined) query.set("pageToken", pageToken)
        const got = await call(`/history?${query.toString()}`)
        if (got === "not-found") return null
        const page = got as {
          history?: readonly { messagesAdded?: readonly { message?: { id?: string } }[] }[]
          historyId?: string
          nextPageToken?: string
        }
        for (const record of page.history ?? [])
          for (const added of record.messagesAdded ?? [])
            if (typeof added.message?.id === "string") ids.push(added.message.id)
        latest = String(page.historyId ?? latest)
        pageToken = page.nextPageToken
      } while (pageToken !== undefined)
      return { ids: [...new Set(ids)], historyId: latest }
    },

    async inboxIds() {
      const ids: string[] = []
      let pageToken: string | undefined
      do {
        const query = new URLSearchParams({ labelIds: "INBOX", maxResults: "100" })
        if (pageToken !== undefined) query.set("pageToken", pageToken)
        const got = (await call(`/messages?${query.toString()}`)) as {
          messages?: readonly { id?: string }[]
          nextPageToken?: string
        }
        for (const one of got.messages ?? []) if (typeof one.id === "string") ids.push(one.id)
        pageToken = got.nextPageToken
      } while (pageToken !== undefined)
      return ids
    },

    async message(id) {
      const query = new URLSearchParams({ format: "metadata" })
      for (const name of WANTED_HEADERS) query.append("metadataHeaders", name)
      const got = await call(`/messages/${id}?${query.toString()}`)
      if (got === "not-found") throw new Error(`message ${id}: gone from the mailbox`)
      const raw = got as {
        threadId?: string
        labelIds?: readonly string[]
        internalDate?: string
        payload?: { headers?: readonly { name?: string; value?: string }[] }
      }
      const header = (name: string): string =>
        raw.payload?.headers?.find((one) => (one.name ?? "").toLowerCase() === name)?.value ?? ""
      return {
        id,
        threadId: raw.threadId ?? "",
        from: header("from"),
        fromAddress: addressOf(header("from")),
        to: header("to"),
        subject: header("subject"),
        listId: header("list-id"),
        labelIds: raw.labelIds ?? [],
        arrivedAt: new Date(Number(raw.internalDate ?? 0)),
        unsubscribe: header("list-unsubscribe"),
        oneClickUnsubscribe: header("list-unsubscribe-post") !== "",
      }
    },

    async rawOf(id) {
      const got = await call(`/messages/${id}?format=raw`)
      if (got === "not-found") throw new Error(`message ${id}: gone from the mailbox`)
      return decodeBase64Url(String((got as { raw?: unknown }).raw ?? ""))
    },

    async modify(id, change) {
      await call(`/messages/${id}/modify`, {
        method: "POST",
        body: JSON.stringify({ addLabelIds: change.add ?? [], removeLabelIds: change.remove ?? [] }),
      })
    },

    async send(message) {
      const got = await call("/messages/send", { method: "POST", body: JSON.stringify({ raw: encodeBase64Url(message) }) })
      if (got === "not-found") throw new Error("send: Gmail answered 404, so nothing was sent")
    },
  }
}
