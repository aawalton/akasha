"use client"

import { BadgeToggleGroup } from "@akasha/design-badges/badge-toggle-group"
import { COLUMN_WIDTH } from "@akasha/design-layout/layout-data"
import { PageLayout } from "@akasha/design-layout/page-layout"
import { PageTabHeader } from "@akasha/design-layout/page-tab-header"
import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { editorPageSkeleton } from "@akasha/design-layout/skeleton-presets"
import { useColumnCount } from "@akasha/design-layout/use-column-count"
import { FilterButton } from "@akasha/design-patterns/filter-button"
import { SearchButton } from "@akasha/design-patterns/search-button"
import { SearchSortFilterRow } from "@akasha/design-patterns/search-sort-filter-row"
import { Tabs } from "@akasha/design-patterns/tabs"
import { usePagesUIRouter } from "@akasha/pages-ui/navigation-context"
import { encodeBuild } from "@akasha/temper-build-codec/build-codec"
import { extractCharacterMetadata } from "@akasha/temper-build-metadata/build-metadata"
import { characterUrl } from "@akasha/temper-build-support/build-url"
import {
  useCharacterLifecycle,
  useCharacterList,
} from "@akasha/temper-characters-character-ui/use-characters"
import { buildId as toBuildId } from "@akasha/temper-formula-framework/branded-id"
import { useCompletionCharacters } from "@akasha/temper-player-completion-ui/use-completion"
import { usePlayer } from "@akasha/temper-player-profile/use-player"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { CharacterEditorHeader } from "../character-editor-header/character-editor-header.module.code.tsx"
import { CharacterEditorTabsList } from "../character-editor-tabs-list/character-editor-tabs-list.module.code.tsx"
import { ClassChangeConfirmationDialog } from "../class-change-confirmation-dialog/class-change-confirmation-dialog.module.code.tsx"
import { EDITOR_TAB_LABELS } from "../editor-tab-labels/editor-tab-labels.module.code.ts"
import { EditorTabPanels } from "../editor-tab-panels/editor-tab-panels.module.code.tsx"
import { GlobalSetBulkEditTags } from "../global-set-bulk-edit-tags/global-set-bulk-edit-tags.module.code.tsx"
import { SetTargetConfirmDialog } from "../set-target-confirm-dialog/set-target-confirm-dialog.module.code.tsx"
import { SetTargetDialog } from "../set-target-dialog/set-target-dialog.module.code.tsx"
import { StatsPanel } from "../stats-panel/stats-panel.module.code.tsx"
import { UnderConstructionDialog } from "../under-construction-dialog/under-construction-dialog.module.code.tsx"
import {
  useCharacter,
  useCharacterActions,
  useCharacterMetadata,
} from "../use-character/use-character.module.code.ts"
import { useClassChangeWithContext } from "../use-class-change/use-class-change.module.code.ts"
import { usePartnerBuildUrl } from "../use-partner-build-url/use-partner-build-url.module.code.ts"
import {
  PASSIVE_CATEGORY_FILTER_ITEMS,
  usePassiveFilter,
} from "../use-passive-filter/use-passive-filter.module.code.ts"
import { useSetTargetEntities } from "../use-set-target-entities/use-set-target-entities.module.code.ts"
import { useStatChangeNotifications } from "../use-stat-change-notifications/use-stat-change-notifications.module.code.tsx"

interface BuildEditorContentProps {
  initialTab?: string
}

export function CharacterEditorContent({ initialTab }: BuildEditorContentProps) {
  const build = useCharacter()
  const router = usePagesUIRouter()
  const {
    buildId,
    isOwner,
    visibility,
    name,
    description,
    updateMeta,
    availableSkills,
    availableSets,
  } = useCharacterMetadata()
  const { remix } = useCharacterLifecycle()
  const [isRemixing, setIsRemixing] = useState(false)

  const handleRemix = async () => {
    if (isRemixing) return
    setIsRemixing(true)
    try {
      const remixedBuild = { ...build, name: `${build.name} (Copy)` }
      const newBuildHash = encodeBuild(remixedBuild)
      const newBuildMetadata = extractCharacterMetadata(remixedBuild)
      const newId = crypto.randomUUID()
      await remix({ sourceId: buildId, newId, newBuildHash, newBuildMetadata })
      router.push(`${characterUrl(toBuildId(newId), remixedBuild.name)}?tab=general`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to remix build")
    } finally {
      setIsRemixing(false)
    }
  }

  const readOnly = !isOwner || visibility === "live"
  const nameReadOnly = !isOwner
  const {
    updateBuild,
    updateCharacter,
    updateEquipment,
    updateSkills,
    updateChampionPoints,
    updateConsumables,
    updateTarget,
    updateAccount,
  } = useCharacterActions()

  const [activeTab, setActiveTab] = useState(initialTab ?? "general")
  const [underConstructionFeature, setUnderConstructionFeature] = useState<string | null>(null)
  const [activeStatsTab, setActiveStatsTab] = useState<"primary" | "backup">("primary")

  const {
    passiveSearch,
    setPassiveSearch,
    passiveCategory,
    hasActivePassiveFilters,
    handlePassiveReset,
    handlePassiveCategorySelect,
  } = usePassiveFilter()

  const { isAuthenticated } = usePlayer()
  const { characters: completionCharacters } = useCompletionCharacters()
  const { builds: characterBuilds } = useCharacterList()

  const esoCharacterId = completionCharacters.find(
    (entity) => entity.targetBuildId === buildId
  )?.esoCharacterId

  const {
    setTargetEntities,
    showSetTargetDialog,
    setShowSetTargetDialog,
    pendingConfirmEntity,
    setPendingConfirmEntity,
    isSettingTarget,
    handleSetTargetSelect,
    handleSetTargetConfirm,
  } = useSetTargetEntities({ buildId, buildClass: build.character.class })

  const screenColumnCount = useColumnCount()
  const cols = screenColumnCount ?? 1

  useEffect(() => {
    if (cols >= 2 && activeTab === "stats") {
      setActiveTab("general")
    }
  }, [cols, activeTab])

  useStatChangeNotifications(build, activeStatsTab)

  const {
    pendingClassChange,
    showClassChangeDialog,
    initiateClassChange,
    confirmClassChange,
    cancelClassChange,
  } = useClassChangeWithContext()

  const mainColumnCount: 1 | 2 = cols >= 3 ? 2 : 1

  const browseHref =
    visibility === "live" || visibility === "target"
      ? `/character-builds?tab=browse&class=${build.character.class}`
      : undefined

  const partnerBuildUrl = usePartnerBuildUrl(
    visibility,
    buildId,
    completionCharacters,
    characterBuilds
  )

  const handleUpdateCharacter = (updates: Partial<typeof build.character>) => {
    if (updates.class !== undefined && updates.class !== build.character.class) {
      const wasHandled = initiateClassChange(updates.class, build.character.class)
      if (wasHandled || build.character.class === "no-class") {
        return
      }
    }

    updateCharacter(updates)
  }

  return (
    <PageLayout skeleton={editorPageSkeleton({ initialTab })}>
      <PageLayout.Header>
        <CharacterEditorHeader
          name={name}
          nameReadOnly={nameReadOnly}
          visibility={visibility}
          partnerBuildUrl={partnerBuildUrl}
          isOwner={isOwner}
          readOnly={readOnly}
          browseHref={browseHref}
          isAuthenticated={isAuthenticated}
          isSettingTarget={isSettingTarget}
          onUpdateMeta={updateMeta}
          onSetTarget={() => setShowSetTargetDialog(true)}
          onRemix={handleRemix}
          remixDisabled={isRemixing}
        />
      </PageLayout.Header>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        syncUrl
        syncStorage="temper:character-editor:tab"
      >
        <PageLayout.Tabs>
          <CharacterEditorTabsList cols={cols} />
        </PageLayout.Tabs>

        <PageLayout.Content>
          <div className="flex flex-col gap-6">
            <PageTabHeader
              title={EDITOR_TAB_LABELS[activeTab] ?? activeTab}
              subtitle={
                activeTab === "equipment" && !readOnly ? (
                  <GlobalSetBulkEditTags
                    equipment={build.equipment}
                    onUpdate={updateEquipment}
                    availableSets={availableSets}
                    playerClass={build.character.class}
                  />
                ) : undefined
              }
            >
              {}
              {activeTab === "skills" ? (
                <SearchSortFilterRow
                  hasActiveFilters={hasActivePassiveFilters}
                  onReset={handlePassiveReset}
                >
                  <SearchButton
                    value={passiveSearch}
                    onChange={setPassiveSearch}
                    placeholder="Search passives..."
                  />
                  <FilterButton
                    hasActiveFilters={passiveCategory !== null}
                    popoverClassName="max-w-panel"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="font-medium text-sm">Category</div>
                      <BadgeToggleGroup
                        items={PASSIVE_CATEGORY_FILTER_ITEMS}
                        value={
                          passiveCategory != null ? [{ value: passiveCategory, label: "" }] : []
                        }
                        onSelect={handlePassiveCategorySelect}
                        unselectedVariant="elevation-muted"
                        wrap
                      />
                    </div>
                  </FilterButton>
                </SearchSortFilterRow>
              ) : undefined}
            </PageTabHeader>
            {(() => {
              const tabContent = (
                <EditorTabPanels
                  build={build}
                  buildId={buildId}
                  buildName={name}
                  buildDescription={description}
                  activeTab={activeTab}
                  readOnly={readOnly}
                  isOwner={isOwner}
                  mainColumnCount={mainColumnCount}
                  esoCharacterId={esoCharacterId}
                  availableSkills={availableSkills}
                  availableSets={availableSets}
                  passiveSearch={passiveSearch}
                  passiveCategory={passiveCategory}
                  onUpdateMeta={updateMeta}
                  onUpdateCharacter={handleUpdateCharacter}
                  onUpdateBuild={updateBuild}
                  onUpdateEquipment={updateEquipment}
                  onUpdateSkills={updateSkills}
                  onUpdateChampionPoints={updateChampionPoints}
                  onUpdateConsumables={updateConsumables}
                  onUpdateTarget={updateTarget}
                  onUpdateAccount={updateAccount}
                />
              )

              if (cols >= 2) {
                return (
                  <div className="flex gap-6">
                    <div className="min-w-0 flex-1">{tabContent}</div>
                    <div className="shrink-0" style={{ width: COLUMN_WIDTH }}>
                      <ResponsiveColumns columnCount={1}>
                        <StatsPanel
                          build={build}
                          activeStatsTab={activeStatsTab}
                          onActiveStatsTabChange={setActiveStatsTab}
                          columnCount={1}
                        />
                      </ResponsiveColumns>
                    </div>
                  </div>
                )
              }

              if (activeTab === "stats") {
                return (
                  <ResponsiveColumns columnCount={1}>
                    <StatsPanel
                      build={build}
                      activeStatsTab={activeStatsTab}
                      onActiveStatsTabChange={setActiveStatsTab}
                      columnCount={1}
                    />
                  </ResponsiveColumns>
                )
              }

              return tabContent
            })()}
          </div>
        </PageLayout.Content>
      </Tabs>

      <UnderConstructionDialog
        open={underConstructionFeature !== null}
        onOpenChange={(open) => !open && setUnderConstructionFeature(null)}
        featureName={underConstructionFeature ?? ""}
      />

      <ClassChangeConfirmationDialog
        open={showClassChangeDialog}
        onOpenChange={(open) => {
          if (!open) {
            cancelClassChange()
          }
        }}
        currentClass={build.character.class}
        newClass={pendingClassChange}
        currentEquippedSkillLineIds={build.character.skillLineIds}
        currentSkills={build.skills}
        availableSkills={availableSkills}
        onConfirm={confirmClassChange}
      />

      <SetTargetDialog
        open={showSetTargetDialog}
        onOpenChange={setShowSetTargetDialog}
        entities={setTargetEntities}
        onSelect={handleSetTargetSelect}
        buildType="character"
      />

      <SetTargetConfirmDialog
        open={pendingConfirmEntity !== null}
        onOpenChange={(open) => !open && setPendingConfirmEntity(null)}
        entityName={pendingConfirmEntity?.name ?? ""}
        onConfirm={handleSetTargetConfirm}
      />
    </PageLayout>
  )
}
