import { LCCC } from "./lccc"

const defaults: ReadonlyArray<[string, string]> = [
  ["SI_LEJ_NAME", "Extended Journal"],
  ["SI_LEJ_SEARCH", "Search Filter:"],
  ["SI_LEJ_SERVER", "Server:"],
  ["SI_LEJ_ACCOUNT", "Account:"],
  ["SI_LEJ_CHARACTER", "Character:"],
  ["SI_LEJ_CHANGE", "(|c336699|l0:1:1:1:1:336699|lChange|l|r)"],
]

const de: ReadonlyArray<[string, string]> = [
  ["SI_LEJ_NAME", "Ausführliches Tagebuch"],
  ["SI_LEJ_SEARCH", "Suchfilter:"],
  ["SI_LEJ_SERVER", "Server:"],
  ["SI_LEJ_ACCOUNT", "Konto:"],
  ["SI_LEJ_CHARACTER", "Charakter:"],
  ["SI_LEJ_CHANGE", "(|c336699|l0:1:1:1:1:336699|lÄndern|l|r)"],
]

const es: ReadonlyArray<[string, string]> = [
  ["SI_LEJ_NAME", "Diario extendido"],
  ["SI_LEJ_SEARCH", "Filtro de búsqueda:"],
  ["SI_LEJ_SERVER", "Servidor:"],
  ["SI_LEJ_ACCOUNT", "Cuenta:"],
  ["SI_LEJ_CHARACTER", "Personaje:"],
  ["SI_LEJ_CHANGE", "(|c336699|l0:1:1:1:1:336699|lCambiar|l|r)"],
]

const fr: ReadonlyArray<[string, string]> = [
  ["SI_LEJ_NAME", "Journal étendu"],
  ["SI_LEJ_SEARCH", "Filtre de recherche:"],
  ["SI_LEJ_SERVER", "Serveur:"],
  ["SI_LEJ_ACCOUNT", "Compte:"],
  ["SI_LEJ_CHARACTER", "Personnage:"],
  ["SI_LEJ_CHANGE", "(|c336699|l0:1:1:1:1:336699|lChanger|l|r)"],
]

const ru: ReadonlyArray<[string, string]> = [
  ["SI_LEJ_NAME", "Расширенный журнал"],
  ["SI_LEJ_SEARCH", "Найти в списке:"],
  ["SI_LEJ_SERVER", "Сервер:"],
  ["SI_LEJ_ACCOUNT", "Учетная запись:"],
  ["SI_LEJ_CHARACTER", "Персонаж:"],
  ["SI_LEJ_CHANGE", "(|c336699|l0:1:1:1:1:336699|lИзменить|l|r)"],
]

const zh: ReadonlyArray<[string, string]> = [
  ["SI_LEJ_NAME", "扩展日志"],
  ["SI_LEJ_SEARCH", "搜索过滤器:"],
  ["SI_LEJ_SERVER", "服务器:"],
  ["SI_LEJ_ACCOUNT", "账户:"],
  ["SI_LEJ_CHARACTER", "角色:"],
  ["SI_LEJ_CHANGE", "(|c336699|l0:1:1:1:1:336699|l更改|l|r)"],
]

const byLang: Record<string, ReadonlyArray<[string, string]>> = {
  de,
  es,
  fr,
  ru,
  zh,
}

for (const [id, text] of defaults) {
  LCCC.RegisterString(id, text)
}
const lang = GetCVar("Language.2")
const overrides = byLang[lang]
if (overrides !== undefined) {
  for (const [id, text] of overrides) {
    LCCC.RegisterString(id, text)
  }
}
