import { expect, test } from "bun:test"
import { characterBuild } from "akasha/temper/player/character/character-build/character-build.page-type.ts"
import { characterBuildVersion } from "akasha/temper/player/character/character-build/version/character-build-version.page-type.ts"
import { characterBuildVersionBuild } from "akasha/temper/player/character/character-build/version/properties/character-build-version-build.relation-property.ts"
import { companionBuild } from "akasha/temper/player/character/companion-build/companion-build.page-type.ts"
import { companionBuildVersion } from "akasha/temper/player/character/companion-build/version/companion-build-version.page-type.ts"
import { companionBuildVersionBuild } from "akasha/temper/player/character/companion-build/version/properties/companion-build-version-build.relation-property.ts"
import {
  buildAddressOf,
  buildVersionPageTypeOf,
} from "akasha/temper/web/modules/build-version-page-type/build-version-page-type.module.code.ts"

function requires(
  declared: readonly { readonly pageProperty: string; readonly required: boolean }[],
  pageProperty: string
): boolean {
  return declared.some((one) => one.pageProperty === pageProperty && one.required)
}

test("a character build and a companion build keep their versions as two page types", () => {
  expect(buildVersionPageTypeOf("character-build")).toBe(characterBuildVersion.slug)
  expect(buildVersionPageTypeOf("companion-build")).toBe(companionBuildVersion.slug)
})

test("a version's build reaches only the kind of build its page type holds versions of", () => {
  expect(characterBuildVersionBuild.propertySlug).toBe("build")
  expect(companionBuildVersionBuild.propertySlug).toBe("build")
  expect(characterBuildVersionBuild.targetPageType).toBe(`page-type/${characterBuild.slug}`)
  expect(companionBuildVersionBuild.targetPageType).toBe(`page-type/${companionBuild.slug}`)
  expect(
    requires(
      characterBuildVersion.properties,
      `relation-property/${characterBuildVersionBuild.slug}`
    )
  ).toBe(true)
  expect(
    requires(
      companionBuildVersion.properties,
      `relation-property/${companionBuildVersionBuild.slug}`
    )
  ).toBe(true)
})

test("a version names its build by the build's page type and slug", () => {
  const slug = "night-blade-0123456789ab"
  expect(buildAddressOf("character-build", slug)).toBe(`${characterBuild.slug}/${slug}`)
  expect(buildAddressOf("companion-build", slug)).toBe(`${companionBuild.slug}/${slug}`)
})
