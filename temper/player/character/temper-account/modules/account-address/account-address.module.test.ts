import { expect, test } from "bun:test"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type { AccountRead } from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import {
  ACCOUNT_PAGE_TYPE,
  accountAddressOf,
  accountKeyOf,
  addressOfSlug,
  findAccountAddress,
  slugOfAddress,
} from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"

import { alanarre } from "akasha/temper/player/character/temper-account/pages/alanarre/alanarre.temper-account.ts"

type Page = Record<string, unknown>

function answering(rows: readonly Page[]): { read: AccountRead; seen: unknown[] } {
  const seen: unknown[] = []
  const read = (async (args: unknown) => {
    seen.push(args)
    return { rows: rows.map(asPage), nextCursor: null, count: null }
  }) as AccountRead
  return { read, seen }
}

const USER_ID = alanarre.key

const SLUG = alanarre.slug

const ADDRESS = `${ACCOUNT_PAGE_TYPE}/${alanarre.slug}`

test("a user's account address is the account page found by its key", async () => {
  const { read, seen } = answering([{ slug: SLUG }])
  expect(await accountAddressOf(USER_ID, read)).toBe(ADDRESS)
  expect(seen).toEqual([
    {
      pageTypeSlug: ACCOUNT_PAGE_TYPE,
      where: [{ key: "key", eq: USER_ID }],
      select: ["slug"],
      limit: 1,
    },
  ])
})

test("a user with no account page is refused, and the refusal names the user", async () => {
  const { read } = answering([])
  await expect(accountAddressOf(USER_ID, read)).rejects.toThrow(USER_ID)
})

test("a user with no account page is found to have no address rather than refused", async () => {
  expect(await findAccountAddress(USER_ID, answering([]).read)).toBeNull()
  expect(await findAccountAddress(USER_ID, answering([{ slug: SLUG }]).read)).toBe(ADDRESS)
})

test("an address's user is the key of the account page at that slug", async () => {
  const { read, seen } = answering([{ key: USER_ID }])
  expect(await accountKeyOf(ADDRESS, read)).toBe(USER_ID)
  expect(seen).toEqual([
    {
      pageTypeSlug: ACCOUNT_PAGE_TYPE,
      where: [{ key: "slug", eq: SLUG }],
      select: ["key"],
      limit: 1,
    },
  ])
})

test("an address naming no account page is refused", async () => {
  const { read } = answering([])
  await expect(accountKeyOf("temper-account/nobody", read)).rejects.toThrow("temper-account/nobody")
})

test("a user id handed in as an address is refused before any read", async () => {
  const { read, seen } = answering([{ key: USER_ID }])
  await expect(accountKeyOf(USER_ID, read)).rejects.toThrow("is no address")
  expect(seen).toEqual([])
})

test("an address and its slug turn into each other", () => {
  expect(addressOfSlug(SLUG)).toBe(ADDRESS)
  expect(slugOfAddress(ADDRESS)).toBe(SLUG)
  expect(() => slugOfAddress(`character-build/${SLUG}`)).toThrow("is no address")
})

test("an answer through a handed-in read is never kept", async () => {
  expect(await accountAddressOf(USER_ID, answering([{ slug: "first" }]).read)).toBe(
    "temper-account/first"
  )
  expect(await accountAddressOf(USER_ID, answering([{ slug: "second" }]).read)).toBe(
    "temper-account/second"
  )
})
