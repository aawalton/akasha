
import { type NotifyInput, writeNotification } from "./push-notification/feed.ts"

const NOTIFY_WRITER = "notify"

export const ALAN_PERSON = "alan"

export type { NotifyInput }

export async function notify(personSlug: string, input: NotifyInput): Promise<void> {
  await writeNotification(personSlug, input, input.source ?? NOTIFY_WRITER)
}
