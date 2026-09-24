"use client"

import { NEVER_MATCH_VALUE } from "akasha/page/access/modules/sentinels/sentinels.module.code.ts"
import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import {
  ACCOUNT_PAGE_TYPE,
  addressOfSlug,
} from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import { useMemo } from "react"

export function ownerOf(userId: string | null, address: string | null): string {
  if (userId == null) throw new Error("Not authenticated")
  if (address == null) throw new Error("The account page of the signed-in user is not read yet")
  return address
}

export function ownerIdOf(
  buildAccountPage: string,
  ownAccountPage: string | null,
  userId: string | null
): string {
  return userId != null && buildAccountPage === ownAccountPage ? userId : buildAccountPage
}

export interface AccountAddressRead {
  readonly address: string | null
  readonly isLoading: boolean
}

export function useAccountAddress(userId: string | null | undefined): AccountAddressRead {
  const signedIn = userId != null && userId !== ""
  const { rows, isLoading } = usePages({
    pageTypeSlug: ACCOUNT_PAGE_TYPE,
    where: [{ key: "key", eq: signedIn ? userId : NEVER_MATCH_VALUE }],
    select: ["slug"],
    limit: 1,
  })
  const slug = rows[0]?.slug
  return useMemo(
    () => ({
      address: signedIn && typeof slug === "string" && slug !== "" ? addressOfSlug(slug) : null,
      isLoading: signedIn && isLoading,
    }),
    [signedIn, slug, isLoading]
  )
}
