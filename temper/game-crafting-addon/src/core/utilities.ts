import { CB_UPDATE_PLAYER } from "../constants"
import { Sets } from "../data/sets-data"
import { state } from "../state"
import * as Characters from "./characters"

const defined = <T>(value: T | undefined): T =>
  value ?? error("TemperCrafting: unexpected nil value")

interface TimerEntry {
  id: string
  info: string
  time: number
}

let TIMER: TimerEntry[] = []
let LAST_QUEUE_TIME = 0
let CSLOOT: ObjectPool<InspirationContainer> | undefined

export function ScrollText(): undefined {
  function DrawControl(pool: ObjectPool<InspirationContainer>): InspirationContainer {
    const container = TemperCrafting_QuestFrame.CreateControl(
      `TemperCrafting_Inspiration${pool.GetNextControlId()}`,
      CT_CONTROL
    )
    const c = container.CreateControl("$(parent)Loot", CT_LABEL)
    c.SetFont("TemperCraftingInsp")
    c.SetColor(1, 1, 1, 1)
    c.SetAnchor(1, container, 1, 0, 0)
    container.c = c
    return container
  }
  function ClearControl(c: InspirationContainer): undefined {
    c.SetHidden(true)
    c.ClearAnchors()
  }
  CSLOOT = ZO_ObjectPool.New(DrawControl, ClearControl)
}

export function Slide(
  c: Control,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  duration: number
): undefined {
  const a = ANIMATION_MANAGER.CreateTimeline()
  const s = a.InsertAnimation(ANIMATION_TRANSLATE, c)
  const fi = a.InsertAnimation(ANIMATION_ALPHA, c)
  const fo = a.InsertAnimation(ANIMATION_ALPHA, c, duration - 500)
  fi.SetAlphaValues(0, 1)
  fi.SetDuration(10)
  s.SetStartOffsetX(x1)
  s.SetStartOffsetY(y1)
  s.SetEndOffsetX(x2)
  s.SetEndOffsetY(y2)
  s.SetDuration(duration)
  fo.SetAlphaValues(1, 0)
  fo.SetDuration(500)
  a.PlayFromStart()
}

function is_PerfectPixel_enabled(): boolean {
  const addonManager = GetAddOnManager()
  const numAddOns = addonManager.GetNumAddOns()
  for (let i = 1; i <= numAddOns; i++) {
    const [name, , addOnState] = addonManager.GetAddOnInfo(i)
    if (name === "PerfectPixel" && addOnState === "enabled") {
      return true
    }
  }
  return false
}

export function Queue(): undefined {
  if (state.Init === true) {
    const currentTime = GetTimeStamp()
    if (currentTime - LAST_QUEUE_TIME < 5) {
      return
    }
    LAST_QUEUE_TIME = currentTime

    if (
      state.Account.options.timeralarm !== 4 ||
      state.Account.options.mountalarm !== 4 ||
      state.Account.options.researchalarm !== 4
    ) {
      for (const [x, project] of ipairs(TIMER)) {
        if (GetDiffBetweenTimeStamps(project.time, GetTimeStamp()) <= 0) {
          let alarm: "mount" | "research" | "timer" | undefined
          const [isMount] = string.find(project.id, "^%$M")
          if (isMount !== undefined) {
            alarm = "mount"
          } else {
            const [isResearch] = string.find(project.id, "^%$R")
            if (isResearch !== undefined) {
              alarm = "research"
            } else if (project.id === "AccountTimer12" || project.id === "AccountTimer24") {
              alarm = "timer"
            }
          }

          if (
            (alarm === "timer" &&
              (state.Account.options.timeralarm === 2 || state.Account.options.timeralarm === 3)) ||
            (alarm === "mount" &&
              (state.Account.options.mountalarm === 2 || state.Account.options.mountalarm === 3)) ||
            (alarm === "research" &&
              (state.Account.options.researchalarm === 2 ||
                state.Account.options.researchalarm === 3))
          ) {
            state.Chat.Print(project.info)
          }

          if (
            (alarm === "timer" &&
              (state.Account.options.timeralarm === 1 || state.Account.options.timeralarm === 3)) ||
            (alarm === "mount" &&
              (state.Account.options.mountalarm === 1 || state.Account.options.mountalarm === 3)) ||
            (alarm === "research" &&
              (state.Account.options.researchalarm === 1 ||
                state.Account.options.researchalarm === 3))
          ) {
            PlaySound("Smithing_Finish_Research")
            TemperCrafting_Alarm.AddMessage(project.info, 1, 0.66, 0.2, 1)
            TemperCrafting_Alarm.AddMessage("|t10:10:x.dds|t", 0, 0, 0, 1)
          }

          if (
            (alarm === "timer" && state.Account.options.timeralarm !== 4) ||
            (alarm === "mount" && state.Account.options.mountalarm !== 4) ||
            (alarm === "research" && state.Account.options.researchalarm !== 4)
          ) {
            state.Account.announce[project.id] = GetTimeStamp()
          }

          TIMER.splice(x - 1, 1)
        }
      }
    }

    if (ZO_Provisioner_IsSceneShowing() && state.Account.options.usecook === true) {
      ZO_ProvisionerTopLevelTooltip.SetHidden(true)
      if (is_PerfectPixel_enabled() === true) {
        ZO_ProvisionerTopLevel.SetHidden(true)
        ZO_ProvisionerTopLevelDetailsDivider.SetHidden(false)
        ZO_ProvisionerTopLevelDetails.SetHidden(false)
      }
    }

    if (state.Inspiration !== "") {
      if (
        state.Account.options.inspirationgain === true ||
        state.Account.options.inspirationgain === undefined
      ) {
        const pool = CSLOOT
        if (pool !== undefined) {
          const [c, x] = pool.AcquireObject()
          c.SetHidden(false)
          c.SetAnchor(128, TemperCrafting_QuestFrame, 128, 0, 0)
          const loot = defined(c.GetChild<LabelControl>(1))
          loot.SetText(state.Inspiration)
          Slide(c, 0, 20, 0, GuiRoot.GetHeight() / 2 - 180, 3500)
          zo_callLater(() => pool.ReleaseObject(x), 3510)
        }
      }
      state.Inspiration = ""
    }
  }
}

export function GetTotalSpentSkillPoints(): number {
  let count = 0
  for (const [, skillTypeData] of SKILLS_DATA_MANAGER.SkillTypeIterator()) {
    for (const [, skillLineData] of skillTypeData.SkillLineIterator()) {
      count = count + SKILL_POINT_ALLOCATION_MANAGER.GetNumPointsAllocatedInSkillLine(skillLineData)
    }
  }
  return count
}

export function GetSkyShards(asString: true): LuaMultiReturn<[text: string]>
export function GetSkyShards(asString?: false): LuaMultiReturn<[acquired: number, total: number]>
export function GetSkyShards(
  asString?: boolean
): LuaMultiReturn<[acquiredOrText: number | string, total?: number]> {
  let acquired = 0
  let total = 0
  let zoneId = GetNextZoneStoryZoneId(undefined)
  while (zoneId !== undefined) {
    const [acquired2, total2] = ZONE_STORIES_MANAGER.GetActivityCompletionProgressValues(
      zoneId,
      ZONE_COMPLETION_TYPE_SKYSHARDS
    )
    total = total + total2
    acquired = acquired + acquired2
    zoneId = GetNextZoneStoryZoneId(zoneId)
  }

  const [, coldharbourCompleted] = GetAchievementCriterion(993, 1)
  acquired = acquired + coldharbourCompleted
  total = total + 1

  if (asString === true) {
    return $multi(`${acquired}/${total}`)
  }
  return $multi(acquired, total)
}

export function GetQuest(): undefined {
  function GetQuestCraft(qName: string): number | false {
    const craftString: Record<number, string[]> = {
      [CRAFTING_TYPE_BLACKSMITHING]: [
        "blacksmith",
        "schmied",
        "forge",
        "forgeron",
        "ferraria",
        "кузнецов",
      ],
      [CRAFTING_TYPE_CLOTHIER]: ["cloth", "schneider", "tailleur", "alfaiataria", "портных"],
      [CRAFTING_TYPE_ENCHANTING]: [
        "enchant",
        "verzauber",
        "enchantement",
        "enchanteur",
        "encantador",
        "зачарователей",
      ],
      [CRAFTING_TYPE_ALCHEMY]: [
        "alchemist",
        "alchemie",
        "alchimie",
        "alchimiste",
        "alquimista",
        "алхимиков",
      ],
      [CRAFTING_TYPE_PROVISIONING]: [
        "provision",
        "versorg",
        "cuisine",
        "cuisinier",
        "culinária",
        "снабженцев",
      ],
      [CRAFTING_TYPE_WOODWORKING]: [
        "woodwork",
        "schreiner",
        "travail du bois",
        "marcenaria",
        "столяров",
      ],
      [CRAFTING_TYPE_JEWELRYCRAFTING]: [
        "jewelry crafting",
        "schmuckhandwerks",
        "joaillerie",
        "joalheria",
        "ювелиру",
        "ювелиров",
      ],
    }
    for (const [x, craft] of pairs(craftString)) {
      for (const s of craft) {
        const [found] = string.find(string.lower(qName), s)
        if (found !== undefined) {
          return x
        }
      }
    }
    return false
  }
  state.Quest = {}
  for (let qId = 1; qId <= MAX_JOURNAL_QUESTS; qId++) {
    if (IsValidQuestIndex(qId)) {
      if (GetJournalQuestType(qId) === QUEST_TYPE_CRAFTING) {
        const [qName, , activeText, , , completed] = GetJournalQuestInfo(qId)
        const craft = GetQuestCraft(qName)
        if (craft !== false && !completed) {
          state.Quest[craft] = {
            id: qId,
            name: zo_strformat("|cFFFFFF<<C:1>>|r", qName),
            work: {},
          }
          const numConditions = GetJournalQuestNumConditions(qId, 1)
          for (let cId = 1; cId <= numConditions; cId++) {
            let [text, current, maximum, , complete] = GetJournalQuestConditionInfo(qId, 1, cId)
            if (text !== undefined && text !== "" && !complete) {
              if (current === maximum) {
                text = `|c00FF00${text}|r`
              }
              state.Quest[craft].work[cId] = text
            }
          }
        } else if (craft !== false) {
          state.Quest[craft] = {
            id: qId,
            name: `|cFFFFFF${qName}|r`,
            work: { [1]: activeText },
          }
        }
      }
    }
  }
}

export function GetTime(seconds?: number): string {
  if (seconds !== undefined && seconds > 0) {
    const formatted = tostring(
      ZO_FormatTime(seconds, TIME_FORMAT_STYLE_COLONS, TIME_FORMAT_PRECISION_SECONDS)
    )
    const ts: Record<number, string> = {}
    let endtime = ""
    let y = 0
    for (const [x] of string.gmatch(formatted, "%d+")) {
      ts[y] = x ?? ""
      y = y + 1
    }
    if (y === 4) {
      const t1 = tonumber(ts[1])
      if (t1 !== undefined && t1 < 10) {
        ts[1] = `0${ts[1] ?? ""}`
      }
      endtime = `${ts[0] ?? ""}d ${ts[1] ?? ""}:${ts[2] ?? ""}h`
    }
    if (y === 3) {
      const t0 = tonumber(ts[0])
      if (t0 !== undefined && t0 < 10) {
        ts[0] = `0${ts[0] ?? ""}`
      }
      endtime = `${ts[0] ?? ""}:${ts[1] ?? ""}h`
    }
    if (y === 2) {
      endtime = `${ts[0] ?? ""}min`
    }
    return endtime
  }
  return `|cFF4020${state.Loc.finished}|r`
}

export function GetTimer(): undefined {
  if (
    state.Account.options.timeralarm === 4 &&
    state.Account.options.mountalarm === 4 &&
    state.Account.options.researchalarm === 4
  ) {
    return
  }
  CALLBACK_MANAGER.FireCallbacks(CB_UPDATE_PLAYER)
  TIMER = []
  for (const [, x] of pairs(state.Account.announce)) {
    if (x + 3600 > GetTimeStamp()) {
    }
  }
  if (defined(state.Account.timer[12]) > 0) {
    TIMER.push({
      id: "AccountTimer12",
      info: state.Loc.finish12,
      time: defined(state.Account.timer[12]),
    })
  }
  if (defined(state.Account.timer[24]) > 0) {
    TIMER.push({
      id: "AccountTimer24",
      info: state.Loc.finish24,
      time: defined(state.Account.timer[24]),
    })
  }
  const crafts = [
    CRAFTING_TYPE_BLACKSMITHING,
    CRAFTING_TYPE_CLOTHIER,
    CRAFTING_TYPE_WOODWORKING,
    CRAFTING_TYPE_JEWELRYCRAFTING,
  ]
  for (const char of Characters.GetCharacters()) {
    const player = state.Account.player[char]
    if (player === undefined) {
      continue
    }
    if (player.mount.time > 1) {
      TIMER.push({
        info: zo_strformat(state.Loc.finishMount, char),
        id: `$M${char}`,
        time: player.mount.time,
      })
    }
    for (const craft of crafts) {
      const numLines = GetNumSmithingResearchLines(craft)
      for (let line = 1; line <= numLines; line++) {
        for (let trait = 1; trait <= state.MaxTraits; trait++) {
          const researchTs = state.Data.crafting.researched[char]?.[craft]?.[line]?.[trait] ?? false
          if (researchTs !== true && researchTs !== false) {
            if (researchTs > 1) {
              const [traitType] = GetSmithingResearchLineTraitInfo(craft, line, trait)
              const [lineName] = GetSmithingResearchLineInfo(craft, line)
              TIMER.push({
                id: `$R${char}${craft}${line}${trait}`,
                info: zo_strformat(
                  state.Loc.finishResearch,
                  char,
                  GetString("SI_ITEMTRAITTYPE", traitType),
                  lineName
                ),
                time: researchTs,
              })
            }
          }
        }
      }
    }
  }
}

interface WayshrineButtonData {
  set: number
  travel: boolean
  info: string
}

export function TravelToNode(
  control: Control & { data?: WayshrineButtonData },
  node: number
): undefined {
  if (control.data !== undefined) {
    if (control.data.travel) {
      FastTravelToNode(defined(defined(Sets[control.data.set]).nodes[node]))
    } else {
      state.Chat.Print(state.Loc.unknownWayshrine)
    }
  } else {
    state.Chat.Print(state.Loc.unselectedWayshrine)
  }
}
