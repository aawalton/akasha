import { buildPageHref } from "@akasha/pages-url/page-href"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import type { ApnsPayload } from "./apns.ts"
import { type Feed, NOTIFICATION_FEED_PAGE_TYPE_SLUG } from "./feed.ts"

export const SURPLUS_FALL_KIND = "surplus-fall"

export const DEEP_LINK_PATH_KEY = "path"

// A PUSH DEEP-LINKS TO THE FEED, BECAUSE A NOTIFICATION HAS NO PAGE. This built
// `/notification/<title>-<row id>` from a `notification` page type that no longer exists. Nothing
// refused it: `toPageTypeSlug` is a bare cast, so the link composed, the push delivered, and only
// the tap failed, in Alan's hands, where no journal on this workstation would ever say so.
//
// A notification is a row in its feed's sidecar rather than a file, so there is no page for it to
// open. The feed page is the page it has, and its slug and id are the ones this takes.
export function notificationFeedRoute(feed: Feed): string {
  return buildPageHref({
    pageTypeSlug: toPageTypeSlug(NOTIFICATION_FEED_PAGE_TYPE_SLUG),
    slug: feed.slug,
    fallbackSlugSource: null,
    id: feed.id,
  })
}

// EVERY PUSH DEEP-LINKS THE SAME WAY. One kind used to route somewhere else: an `ask-alan` push
// carried the question page's answering surface as its link, and this chose that link over the
// notification. The questions system is gone, so the choice is gone with it and
// `notificationFeedRoute` is the whole answer. A notification's `link` reaches no reader here now.
export function buildApnsPayload(content: {
  readonly title: string
  readonly body: string
  readonly route: string
}): ApnsPayload {
  return {
    aps: { alert: { title: content.title, body: content.body }, sound: "default" },
    [DEEP_LINK_PATH_KEY]: content.route,
  }
}

export function buildSharedApnsPayload(content: {
  readonly title: string
  readonly body: string
}): ApnsPayload {
  return { aps: { alert: { title: content.title, body: content.body }, sound: "default" } }
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
