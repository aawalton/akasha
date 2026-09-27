import { PageLayoutSkeleton } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { tabbedPageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import { temperLocationType } from "akasha/temper/catalog/world/temper-location-type/temper-location-type.page-type.ts"
import { temperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.ts"
import { temperInventoryCurrency } from "akasha/temper/player/holdings/temper-inventory-currency/temper-inventory-currency.page-type.ts"
import { CompanionCatalogGate } from "akasha/temper/web/modules/companion-catalog-gate/companion-catalog-gate.module.code.tsx"
import { ItemCategoryTreeGate } from "akasha/temper/web/modules/item-category-tree-gate/item-category-tree-gate.module.code.tsx"
import { KeyedTitlesGate } from "akasha/temper/web/modules/keyed-titles-gate/keyed-titles-gate.module.code.tsx"
import { RecipeCatalogGate } from "akasha/temper/web/modules/recipe-catalog-gate/recipe-catalog-gate.module.code.tsx"
import { RuleTemplatesGate } from "akasha/temper/web/modules/rule-templates-gate/rule-templates-gate.module.code.tsx"
import { SetCatalogGate } from "akasha/temper/web/modules/set-catalog-gate/set-catalog-gate.module.code.tsx"
import { SkillCatalogGate } from "akasha/temper/web/modules/skill-catalog-gate/skill-catalog-gate.module.code.tsx"
import { tabDefaultFor } from "akasha/temper/web/modules/tab-defaults/tab-defaults.module.code.ts"
import { InventoryPageContent } from "akasha/temper/web/player-inventory-management-ui/modules/inventory-page-content/inventory-page-content.module.code.tsx"
import { Suspense } from "react"
import { useSearchParams } from "react-router"

export function meta() {
  return [{ title: "Temper | Inventory" }]
}

export default function InventoryPage() {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab") ?? tabDefaultFor("/inventory") ?? "rules"
  const skeleton = (
    <PageLayoutSkeleton
      config={tabbedPageSkeleton({
        initialTab: tab,
        defaultTab: "rules",
        tabs: ["rules", "type", "location"],
        titleWidth: 144,
      })}
    />
  )
  return (
    <Suspense fallback={skeleton}>
      <KeyedTitlesGate pageTypeSlug={temperVenue.slug} fallback={skeleton}>
        <KeyedTitlesGate pageTypeSlug={temperLocationType.slug} fallback={skeleton}>
          <KeyedTitlesGate pageTypeSlug={temperInventoryCurrency.slug} fallback={skeleton}>
            <CompanionCatalogGate fallback={skeleton}>
              <RuleTemplatesGate fallback={skeleton}>
                <RecipeCatalogGate fallback={skeleton}>
                  {() => (
                    <SkillCatalogGate fallback={skeleton}>
                      {() => (
                        <ItemCategoryTreeGate fallback={skeleton}>
                          <SetCatalogGate fallback={skeleton}>
                            {() => (
                              <InventoryPageContent
                                initialTab={tab}
                                initialSearch={searchParams.get("q") ?? undefined}
                                initialSort={searchParams.get("sort") ?? undefined}
                                initialDirection={searchParams.get("dir") ?? undefined}
                                initialQuality={searchParams.get("quality") ?? undefined}
                                initialArmorTrait={searchParams.get("at") ?? undefined}
                                initialWeaponTrait={searchParams.get("wt") ?? undefined}
                                initialJewelryTrait={searchParams.get("jt") ?? undefined}
                                initialCompanionTrait={searchParams.get("ct") ?? undefined}
                                initialStatus={searchParams.get("status") ?? undefined}
                                initialLock={searchParams.get("lock") ?? undefined}
                                initialGoal={searchParams.get("goal") ?? undefined}
                                initialAction={searchParams.get("action") ?? undefined}
                                initialRuleCategory={searchParams.get("rcat") ?? undefined}
                                initialRuleSearch={searchParams.get("rq") ?? undefined}
                                initialRuleSort={searchParams.get("rsort") ?? undefined}
                                initialRuleDir={searchParams.get("rdir") ?? undefined}
                                initialRuleLocation={searchParams.get("rloc") ?? undefined}
                              />
                            )}
                          </SetCatalogGate>
                        </ItemCategoryTreeGate>
                      )}
                    </SkillCatalogGate>
                  )}
                </RecipeCatalogGate>
              </RuleTemplatesGate>
            </CompanionCatalogGate>
          </KeyedTitlesGate>
        </KeyedTitlesGate>
      </KeyedTitlesGate>
    </Suspense>
  )
}
