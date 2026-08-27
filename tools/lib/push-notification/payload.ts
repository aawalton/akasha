import { buildPageHref, PageTypeSlug } from "@shared/pages-url"
import type { ApnsPayload } from "./apns.ts"

export const NOTIFICATION_PAGE_TYPE_SLUG = "notification"

export const ASK_ALAN_KIND = "ask-alan"

export const SURPLUS_FALL_KIND = "surplus-fall"

export const DEEP_LINK_PATH_KEY = "path"

export function notificationRoute(args: {
  readonly slug: string | null
  readonly title: string | null
  readonly id: string
}): string {
  return buildPageHref({
    pageTypeSlug: PageTypeSlug(NOTIFICATION_PAGE_TYPE_SLUG),
    slug: args.slug,
    fallbackSlugSource: args.title,
    id: args.id,
  })
}

export function resolvePushRoute(args: {
  readonly kind: string | null
  readonly link: string | null
  readonly ownRoute: string
}): string {
  if (args.kind === ASK_ALAN_KIND && args.link !== null && args.link !== "") return args.link
  return args.ownRoute
}

export function buildApnsPayload(content: {
  readonly title: string
  readonly body: string
  readonly route: string
  readonly badge: number | null
}): ApnsPayload {
  const aps: Record<string, unknown> = {
    alert: { title: content.title, body: content.body },
    sound: "default",
  }
  if (content.badge !== null) aps.badge = content.badge
  return { aps, [DEEP_LINK_PATH_KEY]: content.route }
}

export function buildSharedApnsPayload(content: {
  readonly title: string
  readonly body: string
}): ApnsPayload {
  return { aps: { alert: { title: content.title, body: content.body }, sound: "default" } }
}

export function buildBadgeRefreshPayload(badge: number): ApnsPayload {
  return { aps: { badge } }
}

export interface PushApp {
  readonly bundleId: string
  readonly userId: string
}

export const SMILINGJENNY_PUSH_APP: PushApp = {
  bundleId: "me.smilingjenny.app",
  userId: "9bc63b11-d301-4a51-8839-7371336262c7",
}

export interface Recipient {
  readonly userId: string
  readonly ownsNotification: boolean
}

export function recipientsFor(args: {
  readonly ownerUserId: string
  readonly kind: string | null
}): readonly Recipient[] {
  const owner: Recipient = { userId: args.ownerUserId, ownsNotification: true }
  if (args.kind !== SURPLUS_FALL_KIND) return [owner]
  if (SMILINGJENNY_PUSH_APP.userId === args.ownerUserId) return [owner]
  return [owner, { userId: SMILINGJENNY_PUSH_APP.userId, ownsNotification: false }]
}
