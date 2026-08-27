import { setTypeArenaName, undauntedStr } from "./game-strings"
import { langJP } from "./language-codes"

export const jp = {
  de: "ドイツ語",
  en: "英語",
  fr: "フランス語",
  jp: "日本語",
  ru: "ロシア",
  pl: "ポーランド語",
  es: "スペイン語",
  zh: "中国語",
  dlc: "チャプター/ DLC",
  dropZones: "ドロップゾーン",
  dropZoneArena: setTypeArenaName[langJP],
  dropZoneImperialSewers: "インペリアルシティ下水道",
  droppedBy: "によってドロップ",
  setType: "セットの種類",
  dropMechanic: "ドロップメカニック",
  undauntedChest: undauntedStr + " 胸",
  modifyTooltip: "アイテムセット情報によるツールチップの強化",
  slashCommandDescription: "セット名の翻訳を検索",
  slashCommandDescriptionClient: "セット名の検索 (ゲーム言語)",
}
