import { setTypeArenaName, undauntedStr } from "./game-strings"
import { langRU } from "./language-codes"

export const ru = {
  de: "Нeмeцкий",
  en: "Aнглийcкий",
  fr: "Фpaнцузcкий",
  jp: "Япoнcкий",
  ru: "Pуccкий",
  pl: "польский",
  es: "испанский",
  zh: "Китайский",
  dlc: "Глава/DLC",
  dropZones: "Зоны сброса",
  dropZoneArena: setTypeArenaName[langRU],
  dropZoneImperialSewers: "Канализация Имперского города",
  droppedBy: "Снизился на",
  setType: "Тип набора",
  dropMechanic: "Механика падения",
  undauntedChest: undauntedStr + " грудь",
  modifyTooltip: "Улучшить всплывающую подсказку с помощью информации о наборе элементов",
  slashCommandDescription: "Найти переводы названий наборов",
  slashCommandDescriptionClient: "Поиск по названию набора (язык игры)",
}
