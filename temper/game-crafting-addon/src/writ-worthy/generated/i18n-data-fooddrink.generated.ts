// Functional id->name maps ported 1:1 from WritWorthy lang/en_forced.lua via
// scripts/port-i18n-data.ts. These are matched at runtime against
// server-localized values (data, not display localization — English-only-locales rule exception),
// so the English table is the lookup source. Do not hand-edit; re-run the
// converter to refresh.
export const fooddrink: Record<number, string> = {
  [64221]: "Psijic Ambrosia",
  [68251]: "Capon Tomato-Beet Casserole",
  [68252]: "Jugged Rabbit in Preserves",
  [68253]: "Longfin Pasty with Melon Sauce",
  [68254]: "Withered Tree Inn Venison Pot Roast",
  [68273]: "Senche-Tiger Single Malt",
  [68274]: "Velothi View Vintage Malbec",
  [68275]: "Orcrest Agony Pale Ale",
  [68276]: "Lusty Argonian Maid Mazte",
  [71056]: "Orzorga's Red Frothgar",
  [71057]: "Orzorga's Tripe Trifle Pocket",
  [71058]: "Orzorga's Blood Price Pie",
  [71059]: "Orzorga's Smoked Bear Haunch",
}
