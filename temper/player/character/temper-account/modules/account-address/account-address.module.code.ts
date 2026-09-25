import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"

export const ACCOUNT_PAGE_TYPE = "temper-account"

export type AccountRead = typeof getPages

const addressByKey = new Map<string, string>()
const keyByAddress = new Map<string, string>()

export function addressOfSlug(slug: string): string {
  return `${ACCOUNT_PAGE_TYPE}/${slug}`
}

export function slugOfAddress(address: string): string {
  const [pageType, slug, ...rest] = address.split("/")
  if (pageType !== ACCOUNT_PAGE_TYPE || !slug || rest.length > 0) {
    throw new Error(
      `${address} is no address of a ${ACCOUNT_PAGE_TYPE} page, which reads ${ACCOUNT_PAGE_TYPE}/<slug>`
    )
  }
  return slug
}

export function accountScopedSlug(stem: string, address: string): string {
  return `${stem}-${slugOfAddress(address)}`
}

export async function findAccountAddress(
  userId: string,
  read: AccountRead = getPages
): Promise<string | null> {
  const cached = read === getPages ? addressByKey.get(userId) : undefined
  if (cached !== undefined) return cached
  const { rows } = await read({
    pageTypeSlug: ACCOUNT_PAGE_TYPE,
    where: [{ key: "key", eq: userId }],
    select: ["slug"],
    limit: 1,
  })
  const slug = rows[0]?.slug
  if (typeof slug !== "string" || slug === "") return null
  const address = addressOfSlug(slug)
  if (read === getPages) addressByKey.set(userId, address)
  return address
}

export async function accountAddressOf(
  userId: string,
  read: AccountRead = getPages
): Promise<string> {
  const address = await findAccountAddress(userId, read)
  if (address === null) {
    throw new Error(
      `no ${ACCOUNT_PAGE_TYPE} page has the key ${userId}, so the account of user ${userId} has no address`
    )
  }
  return address
}

export async function accountKeyOf(address: string, read: AccountRead = getPages): Promise<string> {
  const cached = read === getPages ? keyByAddress.get(address) : undefined
  if (cached !== undefined) return cached
  const slug = slugOfAddress(address)
  const { rows } = await read({
    pageTypeSlug: ACCOUNT_PAGE_TYPE,
    where: [{ key: "slug", eq: slug }],
    select: ["key"],
    limit: 1,
  })
  const key = rows[0]?.key
  if (typeof key !== "string" || key === "") {
    throw new Error(`the ${ACCOUNT_PAGE_TYPE} page at ${address} is absent or states no key`)
  }
  if (read === getPages) keyByAddress.set(address, key)
  return key
}
