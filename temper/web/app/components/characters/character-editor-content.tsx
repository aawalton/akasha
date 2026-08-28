"use client"

import { BadgeToggleGroup } from "@shared/design-badges/components/badge-toggle-group"
import { PageLayout } from "@shared/design-layout/components/page-layout"
import { PageTabHeader } from "@shared/design-layout/components/page-tab-header"
import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import { useColumnCount } from "@shared/design-layout/components/use-column-count"
import { COLUMN_WIDTH } from "@shared/design-layout/components/layout-data"
import { editorPageSkeleton } from "@shared/design-layout/components/skeleton-presets"
import { FilterButton } from "@shared/design-patterns/components/filter-button"
import { SearchButton } from "@shared/design-patterns/components/search-button"
import { SearchSortFilterRow } from "@shared/design-patterns/components/search-sort-filter-row"
import { Tabs } from "@shared/design-patterns/components/tabs"
import { usePagesUIRouter } from "@shared/pages-ui/router-context"
import { extractCharacterMetadata } from "@temper/game-characters/build-metadata"
import { useCharacterLifecycle, useCharacterList } from "@temper/game-characters-character-ui/use-characters"
import { encodeBuild } from "@temper/game-codec/character/build-codec"
import { useCompletionCharacters } from "@temper/player-completion-ui/use-completion"
import { usePlayer } from "@temper/player-profile/use-player"
import { characterUrl } from "@temper/shared-engine/utils/slug"
import { BuildId } from "@temper/shared-formula-framework/branded"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { ClassChangeConfirmationDialog } from "@/components/character/class-change-confirmation-dialog"
import { EDITOR_TAB_LABELS } from "@/components/characters/character-editor-content/editor-tab-labels"
import { EditorTabPanels } from "@/components/characters/character-editor-content/editor-tab-panels"
import { CharacterEditorHeader } from "@/components/characters/character-editor-header"
import { CharacterEditorTabsList } from "@/components/characters/character-editor-tabs-list"
import {
  useCharacter,
  useCharacterActions,
  useCharacterMetadata,
} from "@/components/characters/context/use-character"
import { useStatChangeNotifications } from "@/components/characters/context/use-stat-change-notifications"
import { useClassChangeWithContext } from "@/components/characters/use-class-change"
import { usePartnerBuildUrl } from "@/components/characters/use-partner-build-url"
import {
  PASSIVE_CATEGORY_FILTER_ITEMS,
  usePassiveFilter,
} from "@/components/characters/use-passive-filter"
import { useSetTargetEntities } from "@/components/characters/use-set-target-entities"
import { GlobalSetBulkEditTags } from "@/components/equipment/global-set-bulk-edit-tags"
import { StatsPanel } from "@/components/stats/stats-panel"
import { SetTargetConfirmDialog } from "@/components/ui/set-target-confirm-dialog"
import { SetTargetDialog } from "@/components/ui/set-target-dialog"
import { UnderConstructionDialog } from "@/components/under-construction-dialog"

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
      router.push(`${characterUrl(BuildId(newId), remixedBuild.name)}?tab=general`)
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
