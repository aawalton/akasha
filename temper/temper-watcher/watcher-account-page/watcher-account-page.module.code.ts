import { upsertPage } from "@akasha/pages-access/upsert"

export const ACCOUNT_PAGE_TYPE_SLUG = "temper-account"

export type AccountPageUpsert = typeof upsertPage

export async function resolveAccountPageId(
  userId: string,
  upsert: AccountPageUpsert = upsertPage
): Promise<string> {
  const row = await upsert({
    pageTypeSlug: ACCOUNT_PAGE_TYPE_SLUG,
    where: [{ key: "title", eq: userId }],
    set: { title: userId },
    select: ["id"],
  })
  const id = row.id
  if (typeof id !== "string") {
    throw new Error(`the ${ACCOUNT_PAGE_TYPE_SLUG} page for ${userId} came back with no id`)
  }
  return id
}
