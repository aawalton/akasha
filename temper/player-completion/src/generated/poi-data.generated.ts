/**
 * Points of Interest Static Data (Generated)
 *
 * 42 zones, 280 POI type groups, 2077 POIs
 *
 * apiVersion: eso.live.12.0.6.3274791
 * DO NOT EDIT — regenerate with: ops temper catalog generate poi
 */

interface PoiEntry {
  poiIndex: number
  name: string
  poiType: number
}

interface PoiTypeGroup {
  poiType: number
  label: string
  pois: readonly PoiEntry[]
}

interface PoiZoneEntry {
  zoneId: number
  name: string
  poiTypes: readonly PoiTypeGroup[]
}

export const poiData: PoiZoneEntry[] = [
  {
    "zoneId": 104,
    "name": "Alik'r Desert",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Sentinel Docks",
            "poiType": 0
          },
          {
            "poiIndex": 2,
            "name": "Ancestor's Landing",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Rain Catcher Fields",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Morwha's Bounty",
            "poiType": 0
          },
          {
            "poiIndex": 5,
            "name": "Tu'whacca's Throne",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "Kulati Mines",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Leki's Blade",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Sep's Spine",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Bergama",
            "poiType": 0
          },
          {
            "poiIndex": 10,
            "name": "Tava's Blessing",
            "poiType": 0
          },
          {
            "poiIndex": 11,
            "name": "HoonDing's Watch",
            "poiType": 0
          },
          {
            "poiIndex": 12,
            "name": "Satakalaam",
            "poiType": 0
          },
          {
            "poiIndex": 13,
            "name": "Kozanset",
            "poiType": 0
          },
          {
            "poiIndex": 14,
            "name": "Sentinel",
            "poiType": 0
          },
          {
            "poiIndex": 15,
            "name": "Salas En",
            "poiType": 0
          },
          {
            "poiIndex": 16,
            "name": "Motalion Necropolis",
            "poiType": 0
          },
          {
            "poiIndex": 33,
            "name": "Ogre's Bluff",
            "poiType": 0
          },
          {
            "poiIndex": 52,
            "name": "Tears of the Dishonored",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 17,
            "name": "Morwha's Bounty Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 18,
            "name": "Sentinel Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 19,
            "name": "Bergama Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 20,
            "name": "Leki's Blade Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 21,
            "name": "Satakalaam Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 29,
            "name": "Divad's Chagrin Mine Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 30,
            "name": "Kulati Mines Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 31,
            "name": "Aswala Stables Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 32,
            "name": "Sep's Spine Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 34,
            "name": "Shrikes' Aerie Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 35,
            "name": "HoonDing's Watch Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 43,
            "name": "Goat's Head Oasis Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 39,
            "name": "The Warrior",
            "poiType": 2
          },
          {
            "poiIndex": 40,
            "name": "The Ritual",
            "poiType": 2
          },
          {
            "poiIndex": 41,
            "name": "The Thief",
            "poiType": 2
          },
          {
            "poiIndex": 50,
            "name": "Saltwalker Militia Camp",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Aswala's Remembrance",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Ragnthar",
            "poiType": 2
          },
          {
            "poiIndex": 54,
            "name": "Rkulftzel",
            "poiType": 2
          },
          {
            "poiIndex": 55,
            "name": "Alezer Kotu",
            "poiType": 2
          },
          {
            "poiIndex": 56,
            "name": "Easterly Aerie",
            "poiType": 2
          },
          {
            "poiIndex": 57,
            "name": "Hatiha's Camp",
            "poiType": 2
          },
          {
            "poiIndex": 58,
            "name": "Na-Totambu's Landing",
            "poiType": 2
          },
          {
            "poiIndex": 59,
            "name": "Artisan's Oasis",
            "poiType": 2
          },
          {
            "poiIndex": 60,
            "name": "Duneripper Downs",
            "poiType": 2
          },
          {
            "poiIndex": 61,
            "name": "Wayfarer's Wharf",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 22,
            "name": "Santaki",
            "poiType": 3
          },
          {
            "poiIndex": 23,
            "name": "Divad's Chagrin Mine",
            "poiType": 3
          },
          {
            "poiIndex": 24,
            "name": "Aldunz",
            "poiType": 3
          },
          {
            "poiIndex": 25,
            "name": "Coldrock Diggings",
            "poiType": 3
          },
          {
            "poiIndex": 26,
            "name": "Sandblown Mine",
            "poiType": 3
          },
          {
            "poiIndex": 27,
            "name": "Yldzuun",
            "poiType": 3
          },
          {
            "poiIndex": 44,
            "name": "Lost Caravan",
            "poiType": 3
          },
          {
            "poiIndex": 45,
            "name": "Lesser Circle",
            "poiType": 3
          },
          {
            "poiIndex": 46,
            "name": "Giant Camp",
            "poiType": 3
          },
          {
            "poiIndex": 47,
            "name": "Forsaken Hearts Cave",
            "poiType": 3
          },
          {
            "poiIndex": 48,
            "name": "Hag Camp",
            "poiType": 3
          },
          {
            "poiIndex": 49,
            "name": "King's Rest",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 36,
            "name": "Myrkwasa Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 37,
            "name": "Hollow Waste Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 38,
            "name": "Tigonus Dolmen",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 28,
            "name": "Lost City of the Na-Totambu",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 42,
            "name": "Dungeon: Volenfell",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 62,
            "name": "Sisters of the Sands Apartment",
            "poiType": 7
          },
          {
            "poiIndex": 63,
            "name": "House of the Silent Magnifico",
            "poiType": 7
          },
          {
            "poiIndex": 64,
            "name": "Sword-Singer's Redoubt",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1413,
    "name": "Apocrypha",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Portal to Necrom",
            "poiType": 0
          },
          {
            "poiIndex": 2,
            "name": "Portal to Necrom",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Rectory Corporea",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "The Feral Gallery",
            "poiType": 0
          },
          {
            "poiIndex": 5,
            "name": "Cenotaph of the Remnants",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "Cipher's Midden",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "The Sidereal Cloisters",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "The Ravening Morass",
            "poiType": 0
          },
          {
            "poiIndex": 20,
            "name": "The Tranquil Catalog",
            "poiType": 0
          },
          {
            "poiIndex": 22,
            "name": "Chthonic Landing",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 26,
            "name": "Still Shallows Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 27,
            "name": "Soundless Bight Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 28,
            "name": "Cipher's Midden Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 29,
            "name": "Speiran Tarn Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 30,
            "name": "Writhing Wastes Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 31,
            "name": "Tranquil Catalog Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 32,
            "name": "Apogee Nadir Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 33,
            "name": "Forlorn Palisades Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 34,
            "name": "Feral Gallery Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 18,
            "name": "Versicolor Carrels",
            "poiType": 2
          },
          {
            "poiIndex": 19,
            "name": "Artisan's Hermitage",
            "poiType": 2
          },
          {
            "poiIndex": 21,
            "name": "Fractured Monolith",
            "poiType": 2
          },
          {
            "poiIndex": 23,
            "name": "Writhing Wastes Edifice",
            "poiType": 2
          },
          {
            "poiIndex": 24,
            "name": "Fallen Hues Edifice",
            "poiType": 2
          },
          {
            "poiIndex": 37,
            "name": "Syzygial Rostrum",
            "poiType": 2
          },
          {
            "poiIndex": 38,
            "name": "Study of the Lost Cipher",
            "poiType": 2
          },
          {
            "poiIndex": 39,
            "name": "Altar of the One Who Knows",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 9,
            "name": "Quires Wind",
            "poiType": 3
          },
          {
            "poiIndex": 10,
            "name": "The Disquiet Study",
            "poiType": 3
          },
          {
            "poiIndex": 12,
            "name": "Apogee of the Tormenting Eye",
            "poiType": 3
          },
          {
            "poiIndex": 13,
            "name": "Fathoms Drift",
            "poiType": 3
          },
          {
            "poiIndex": 14,
            "name": "Libram Cathedral",
            "poiType": 3
          },
          {
            "poiIndex": 15,
            "name": "Deepreave Quag",
            "poiType": 3
          },
          {
            "poiIndex": 16,
            "name": "Runemaster's Acropolis",
            "poiType": 3
          },
          {
            "poiIndex": 17,
            "name": "Chthon Plaza",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 11,
            "name": "The Underweave",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 36,
            "name": "Infinite Archive",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 40,
            "name": "Tower of Unutterable Truths",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 381,
    "name": "Auridon",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Ezduiin",
            "poiType": 0
          },
          {
            "poiIndex": 2,
            "name": "Tanzelwil",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "South Beacon",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Glister Vale",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Silsailen",
            "poiType": 0
          },
          {
            "poiIndex": 13,
            "name": "Firsthold",
            "poiType": 0
          },
          {
            "poiIndex": 14,
            "name": "Phaer",
            "poiType": 0
          },
          {
            "poiIndex": 15,
            "name": "Shattered Grove",
            "poiType": 0
          },
          {
            "poiIndex": 16,
            "name": "North Beacon",
            "poiType": 0
          },
          {
            "poiIndex": 17,
            "name": "Vulkhel Guard",
            "poiType": 0
          },
          {
            "poiIndex": 18,
            "name": "Torinaan",
            "poiType": 0
          },
          {
            "poiIndex": 19,
            "name": "Mathiisen",
            "poiType": 0
          },
          {
            "poiIndex": 21,
            "name": "Greenwater Cove",
            "poiType": 0
          },
          {
            "poiIndex": 31,
            "name": "Quendeluun",
            "poiType": 0
          },
          {
            "poiIndex": 32,
            "name": "College of Aldmeri Propriety",
            "poiType": 0
          },
          {
            "poiIndex": 34,
            "name": "Dawnbreak",
            "poiType": 0
          },
          {
            "poiIndex": 35,
            "name": "Castle Rilis",
            "poiType": 0
          },
          {
            "poiIndex": 36,
            "name": "Skywatch",
            "poiType": 0
          },
          {
            "poiIndex": 66,
            "name": "Shrine of Lamae Bal",
            "poiType": 0
          },
          {
            "poiIndex": 67,
            "name": "Shrine of Hircine",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 20,
            "name": "Vulkhel Guard Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 23,
            "name": "Phaer Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 24,
            "name": "Tanzelwil Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 25,
            "name": "Firsthold Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 26,
            "name": "Mathiisen Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 27,
            "name": "Skywatch Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 28,
            "name": "Quendeluun Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 29,
            "name": "College Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 30,
            "name": "Greenwater Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 33,
            "name": "Windy Glade Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 42,
            "name": "The Harborage",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 12,
            "name": "The Lady",
            "poiType": 2
          },
          {
            "poiIndex": 22,
            "name": "The Lover",
            "poiType": 2
          },
          {
            "poiIndex": 49,
            "name": "Maormer Invasion Camp",
            "poiType": 2
          },
          {
            "poiIndex": 50,
            "name": "Hightide Keep",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Buraniim Isle",
            "poiType": 2
          },
          {
            "poiIndex": 52,
            "name": "Errinorne Isle",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Nine-Prow Landing",
            "poiType": 2
          },
          {
            "poiIndex": 54,
            "name": "Isle of Contemplation",
            "poiType": 2
          },
          {
            "poiIndex": 55,
            "name": "Beacon Falls",
            "poiType": 2
          },
          {
            "poiIndex": 56,
            "name": "Eastshore Islets Camp",
            "poiType": 2
          },
          {
            "poiIndex": 57,
            "name": "Monkey's Rest",
            "poiType": 2
          },
          {
            "poiIndex": 58,
            "name": "Smuggler's Cove",
            "poiType": 2
          },
          {
            "poiIndex": 68,
            "name": "Freerunner's Post Board",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 5,
            "name": "Del's Claim",
            "poiType": 3
          },
          {
            "poiIndex": 6,
            "name": "Ondil",
            "poiType": 3
          },
          {
            "poiIndex": 7,
            "name": "Entila's Folly",
            "poiType": 3
          },
          {
            "poiIndex": 8,
            "name": "Wansalen",
            "poiType": 3
          },
          {
            "poiIndex": 10,
            "name": "Mehrunes' Spite",
            "poiType": 3
          },
          {
            "poiIndex": 11,
            "name": "Bewan",
            "poiType": 3
          },
          {
            "poiIndex": 43,
            "name": "Soulfire Plateau",
            "poiType": 3
          },
          {
            "poiIndex": 44,
            "name": "Seaside Scarp Camp",
            "poiType": 3
          },
          {
            "poiIndex": 45,
            "name": "Wreck of the Raptor",
            "poiType": 3
          },
          {
            "poiIndex": 46,
            "name": "Heretic's Summons",
            "poiType": 3
          },
          {
            "poiIndex": 47,
            "name": "Nestmother's Den",
            "poiType": 3
          },
          {
            "poiIndex": 48,
            "name": "Heritance Proving Ground",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 37,
            "name": "Iluvamir Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 38,
            "name": "Calambar Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 39,
            "name": "Vafe Dolmen",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 40,
            "name": "Toothmaul Gully",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 41,
            "name": "Dungeon: The Banished Cells I",
            "poiType": 6
          },
          {
            "poiIndex": 61,
            "name": "Dungeon: The Banished Cells II",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 62,
            "name": "Barbed Hook Private Room",
            "poiType": 7
          },
          {
            "poiIndex": 63,
            "name": "Mara's Kiss Public House",
            "poiType": 7
          },
          {
            "poiIndex": 64,
            "name": "Mathiisen Manor",
            "poiType": 7
          },
          {
            "poiIndex": 65,
            "name": "Seabloom Villa",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 281,
    "name": "Bal Foyen",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Dhalmora",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 2,
            "name": "Dhalmora Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 3,
            "name": "Fort Zeren Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 4,
            "name": "Foyen Docks Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 5,
            "name": "Bal Foyen Dockyards",
            "poiType": 2
          },
          {
            "poiIndex": 6,
            "name": "Fort Zeren",
            "poiType": 2
          },
          {
            "poiIndex": 7,
            "name": "Hidden Dagger Landing Site",
            "poiType": 2
          },
          {
            "poiIndex": 8,
            "name": "Plantation Point Overlook",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 9,
            "name": "Humblemud",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 92,
    "name": "Bangkorai",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Jackdaw Cove",
            "poiType": 0
          },
          {
            "poiIndex": 2,
            "name": "Northglen",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Halcyon Lake",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Pelin Graveyard",
            "poiType": 0
          },
          {
            "poiIndex": 5,
            "name": "Fallen Grotto",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "Nilata Ruins",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Hall of Heroes",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Kerbol's Hollow",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Hallin's Stand",
            "poiType": 0
          },
          {
            "poiIndex": 10,
            "name": "Onsi's Breath",
            "poiType": 0
          },
          {
            "poiIndex": 11,
            "name": "Qharroa Ruins",
            "poiType": 0
          },
          {
            "poiIndex": 12,
            "name": "Bangkorai Garrison",
            "poiType": 0
          },
          {
            "poiIndex": 13,
            "name": "Martyr's Crossing",
            "poiType": 0
          },
          {
            "poiIndex": 14,
            "name": "Evermore",
            "poiType": 0
          },
          {
            "poiIndex": 15,
            "name": "Viridian Woods",
            "poiType": 0
          },
          {
            "poiIndex": 28,
            "name": "Old Tower",
            "poiType": 0
          },
          {
            "poiIndex": 29,
            "name": "Murcien's Hamlet",
            "poiType": 0
          },
          {
            "poiIndex": 48,
            "name": "Damar Farmstead",
            "poiType": 0
          },
          {
            "poiIndex": 50,
            "name": "Sunken Road",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 19,
            "name": "Evermore Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 20,
            "name": "Troll's Toothpick Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 21,
            "name": "Viridian Woods Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 22,
            "name": "Bangkorai Pass Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 23,
            "name": "Nilata Ruins Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 24,
            "name": "Hallin's Stand Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 25,
            "name": "Old Tower Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 26,
            "name": "Onsi's Breath Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 27,
            "name": "Sunken Road Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 40,
            "name": "Eastern Evermore Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 41,
            "name": "Halcyon Lake Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 17,
            "name": "The Steed",
            "poiType": 2
          },
          {
            "poiIndex": 18,
            "name": "The Apprentice",
            "poiType": 2
          },
          {
            "poiIndex": 49,
            "name": "Silaseli Ruins",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Yanurah's Respite",
            "poiType": 2
          },
          {
            "poiIndex": 52,
            "name": "Ash'abahs' Oasis",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Gjarma's Rock",
            "poiType": 2
          },
          {
            "poiIndex": 54,
            "name": "Strastnoc's Landing",
            "poiType": 2
          },
          {
            "poiIndex": 55,
            "name": "Viridian Hideaway",
            "poiType": 2
          },
          {
            "poiIndex": 56,
            "name": "Basking Grounds",
            "poiType": 2
          },
          {
            "poiIndex": 57,
            "name": "Wethers' Cleft",
            "poiType": 2
          },
          {
            "poiIndex": 58,
            "name": "Sacred Springs",
            "poiType": 2
          },
          {
            "poiIndex": 59,
            "name": "Howlers' Nook",
            "poiType": 2
          },
          {
            "poiIndex": 60,
            "name": "Merchant's Gate",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 30,
            "name": "Torog's Spite",
            "poiType": 3
          },
          {
            "poiIndex": 31,
            "name": "Troll's Toothpick",
            "poiType": 3
          },
          {
            "poiIndex": 32,
            "name": "Viridian Watch",
            "poiType": 3
          },
          {
            "poiIndex": 33,
            "name": "Crypt of the Exiles",
            "poiType": 3
          },
          {
            "poiIndex": 34,
            "name": "Klathzgar",
            "poiType": 3
          },
          {
            "poiIndex": 35,
            "name": "Rubble Butte",
            "poiType": 3
          },
          {
            "poiIndex": 42,
            "name": "Blighted Isle",
            "poiType": 3
          },
          {
            "poiIndex": 43,
            "name": "Lakewatch Tower",
            "poiType": 3
          },
          {
            "poiIndex": 44,
            "name": "Arlimahera's Sanctum",
            "poiType": 3
          },
          {
            "poiIndex": 45,
            "name": "Summoner's Camp",
            "poiType": 3
          },
          {
            "poiIndex": 46,
            "name": "Nilata Falls",
            "poiType": 3
          },
          {
            "poiIndex": 47,
            "name": "Telesubi Ruins",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 37,
            "name": "Mournoth Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 38,
            "name": "Ephesus Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 39,
            "name": "Fallen Wastes Dolmen",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 16,
            "name": "Razak's Wheel",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 36,
            "name": "Dungeon: Blackheart Haven",
            "poiType": 6
          },
          {
            "poiIndex": 64,
            "name": "Dungeon: Fang Lair",
            "poiType": 6
          },
          {
            "poiIndex": 65,
            "name": "Dungeon: Unhallowed Grave",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 61,
            "name": "Forsaken Stronghold",
            "poiType": 7
          },
          {
            "poiIndex": 62,
            "name": "Mournoth Keep",
            "poiType": 7
          },
          {
            "poiIndex": 63,
            "name": "Twin Arches",
            "poiType": 7
          },
          {
            "poiIndex": 66,
            "name": "Thieves' Oasis",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 535,
    "name": "Betnikh",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Grimfield",
            "poiType": 0
          },
          {
            "poiIndex": 2,
            "name": "Carved Hills",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "Moriseli",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Carzog's Demise",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 3,
            "name": "Stonetooth Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 4,
            "name": "Grimfield Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 5,
            "name": "Carved Hills Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 8,
            "name": "Gilbard's Nook",
            "poiType": 2
          },
          {
            "poiIndex": 9,
            "name": "Eyearata",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 10,
            "name": "Seaveil Spire",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1261,
    "name": "Blackwood",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Borderwatch",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Leyawiin",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Tidewater Cave",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Deepscorn Hollow",
            "poiType": 0
          },
          {
            "poiIndex": 12,
            "name": "Veyond",
            "poiType": 0
          },
          {
            "poiIndex": 14,
            "name": "Fort Redmane",
            "poiType": 0
          },
          {
            "poiIndex": 15,
            "name": "Doomvault Vulpinaz",
            "poiType": 0
          },
          {
            "poiIndex": 21,
            "name": "Welke",
            "poiType": 0
          },
          {
            "poiIndex": 24,
            "name": "Farmer's Nook",
            "poiType": 0
          },
          {
            "poiIndex": 28,
            "name": "Hutan-Tzel",
            "poiType": 0
          },
          {
            "poiIndex": 31,
            "name": "Gideon",
            "poiType": 0
          },
          {
            "poiIndex": 33,
            "name": "Glenbridge",
            "poiType": 0
          },
          {
            "poiIndex": 40,
            "name": "Stonewastes",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 23,
            "name": "Bloodrun Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 43,
            "name": "Leyawiin Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 44,
            "name": "Gideon Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 45,
            "name": "Borderwatch Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 46,
            "name": "Fort Redmane Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 47,
            "name": "Blueblood Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 48,
            "name": "Stonewastes Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 49,
            "name": "Leyawiin Outskirts Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 73,
            "name": "Doomvault Vulpinaz Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 74,
            "name": "Blackwood Crossroads Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 75,
            "name": "Hutan-Tzel Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 76,
            "name": "Vunalk Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 2,
            "name": "White Stallion Inn",
            "poiType": 2
          },
          {
            "poiIndex": 6,
            "name": "Plateau of the Traveler",
            "poiType": 2
          },
          {
            "poiIndex": 10,
            "name": "Fort Blueblood",
            "poiType": 2
          },
          {
            "poiIndex": 18,
            "name": "Shrine to Nocturnal",
            "poiType": 2
          },
          {
            "poiIndex": 26,
            "name": "Salvitto Estate",
            "poiType": 2
          },
          {
            "poiIndex": 39,
            "name": "Ojel-Bak",
            "poiType": 2
          },
          {
            "poiIndex": 50,
            "name": "Pentric Run",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Sariellen's Sword",
            "poiType": 2
          },
          {
            "poiIndex": 52,
            "name": "Withered Root",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 3,
            "name": "Undertow Cavern",
            "poiType": 3
          },
          {
            "poiIndex": 9,
            "name": "Shardius's Excavation",
            "poiType": 3
          },
          {
            "poiIndex": 16,
            "name": "Toad-Tongue War Camp",
            "poiType": 3
          },
          {
            "poiIndex": 17,
            "name": "Arpenia",
            "poiType": 3
          },
          {
            "poiIndex": 20,
            "name": "Sul-Xan Ritual Site",
            "poiType": 3
          },
          {
            "poiIndex": 22,
            "name": "Bloodrun Cave",
            "poiType": 3
          },
          {
            "poiIndex": 25,
            "name": "Old Deathwart's Pond",
            "poiType": 3
          },
          {
            "poiIndex": 29,
            "name": "Doomvault Porcixid",
            "poiType": 3
          },
          {
            "poiIndex": 34,
            "name": "Vunalk",
            "poiType": 3
          },
          {
            "poiIndex": 35,
            "name": "Xeemhok's Lagoon",
            "poiType": 3
          },
          {
            "poiIndex": 38,
            "name": "Trial: Rockgrove",
            "poiType": 3
          },
          {
            "poiIndex": 41,
            "name": "The Shattered Xanmeer",
            "poiType": 3
          },
          {
            "poiIndex": 42,
            "name": "Xi-Tsei",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 68,
            "name": "Ayleid Well",
            "poiType": 4
          },
          {
            "poiIndex": 69,
            "name": "Ayleid Well",
            "poiType": 4
          },
          {
            "poiIndex": 70,
            "name": "Ayleid Well",
            "poiType": 4
          },
          {
            "poiIndex": 71,
            "name": "Ayleid Well",
            "poiType": 4
          },
          {
            "poiIndex": 72,
            "name": "Ayleid Well",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 19,
            "name": "Zenithar's Abbey",
            "poiType": 5
          },
          {
            "poiIndex": 32,
            "name": "The Silent Halls",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 67,
            "name": "Dungeon: The Dread Cellar",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 53,
            "name": "Pilgrim's Rest",
            "poiType": 7
          },
          {
            "poiIndex": 54,
            "name": "Water's Edge",
            "poiType": 7
          },
          {
            "poiIndex": 55,
            "name": "Pantherfang Chapel",
            "poiType": 7
          },
          {
            "poiIndex": 77,
            "name": "Sweetwater Cascades",
            "poiType": 7
          },
          {
            "poiIndex": 78,
            "name": "Willowpond Haven",
            "poiType": 7
          },
          {
            "poiIndex": 79,
            "name": "Theater of the Ancestors",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 280,
    "name": "Bleakrock Isle",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Orkey's Hollow",
            "poiType": 0
          },
          {
            "poiIndex": 2,
            "name": "Skyshroud Barrow",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Hozzin's Folly",
            "poiType": 0
          },
          {
            "poiIndex": 5,
            "name": "Bleakrock Village",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "Frostedge Camp",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Hunter's Camp",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Halmaera's House",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 3,
            "name": "Bleakrock Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 9,
            "name": "Companions Point",
            "poiType": 2
          },
          {
            "poiIndex": 10,
            "name": "Paddlefloe Fishing Camp",
            "poiType": 2
          },
          {
            "poiIndex": 11,
            "name": "Deathclaw's Lair",
            "poiType": 2
          }
        ]
      }
    ]
  },
  {
    "zoneId": 980,
    "name": "Clockwork City",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 6,
            "name": "Everwound Wellspring",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Mnemonic Planisphere",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 4,
            "name": "Clockwork Crossroads Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 5,
            "name": "Mire Mechanica Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 18,
            "name": "Sanctuary Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 9,
            "name": "Elegiac Replication",
            "poiType": 2
          },
          {
            "poiIndex": 10,
            "name": "Insalubrious Effluvium",
            "poiType": 2
          },
          {
            "poiIndex": 11,
            "name": "Vale of Tiers",
            "poiType": 2
          },
          {
            "poiIndex": 12,
            "name": "Ventral Terminus",
            "poiType": 2
          },
          {
            "poiIndex": 16,
            "name": "Mire Mechanica",
            "poiType": 2
          },
          {
            "poiIndex": 17,
            "name": "The Brass Fortress",
            "poiType": 2
          },
          {
            "poiIndex": 19,
            "name": "The Refurbishing Yard",
            "poiType": 2
          },
          {
            "poiIndex": 20,
            "name": "Pavilion of Artifice",
            "poiType": 2
          },
          {
            "poiIndex": 21,
            "name": "Barilzar's Eighth Laboratory",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Halls of Regulation",
            "poiType": 3
          },
          {
            "poiIndex": 2,
            "name": "The Shadow Cleft",
            "poiType": 3
          },
          {
            "poiIndex": 14,
            "name": "Sanctuary of Verification",
            "poiType": 3
          },
          {
            "poiIndex": 15,
            "name": "Exarchs' Egress",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 8,
            "name": "The Orbservatory Prior",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 347,
    "name": "Coldharbour",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "The Everfull Flagon",
            "poiType": 0
          },
          {
            "poiIndex": 2,
            "name": "The Lost Fleet",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Cliffs of Failure",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "The Moonless Walk",
            "poiType": 0
          },
          {
            "poiIndex": 22,
            "name": "Tower of Lies",
            "poiType": 0
          },
          {
            "poiIndex": 23,
            "name": "Haj Uxith",
            "poiType": 0
          },
          {
            "poiIndex": 24,
            "name": "Court of Contempt",
            "poiType": 0
          },
          {
            "poiIndex": 25,
            "name": "The Chasm",
            "poiType": 0
          },
          {
            "poiIndex": 26,
            "name": "The Orchard",
            "poiType": 0
          },
          {
            "poiIndex": 28,
            "name": "The Black Forge",
            "poiType": 0
          },
          {
            "poiIndex": 30,
            "name": "The Vile Laboratory",
            "poiType": 0
          },
          {
            "poiIndex": 31,
            "name": "Library of Dusk",
            "poiType": 0
          },
          {
            "poiIndex": 32,
            "name": "Spurned Peak",
            "poiType": 0
          },
          {
            "poiIndex": 33,
            "name": "The Lightless Oubliette",
            "poiType": 0
          },
          {
            "poiIndex": 34,
            "name": "The Manor of Revelry",
            "poiType": 0
          },
          {
            "poiIndex": 35,
            "name": "The Reaver Citadel",
            "poiType": 0
          },
          {
            "poiIndex": 36,
            "name": "The Hollow City",
            "poiType": 0
          },
          {
            "poiIndex": 37,
            "name": "The Great Shackle",
            "poiType": 0
          },
          {
            "poiIndex": 38,
            "name": "The Endless Stair",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 5,
            "name": "Library of Dusk Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 6,
            "name": "Great Shackle Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 7,
            "name": "The Chasm Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 8,
            "name": "Hollow City Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 9,
            "name": "Endless Stair Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 10,
            "name": "Everfull Flagon Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 11,
            "name": "Moonless Walk Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 12,
            "name": "Haj Uxith Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 13,
            "name": "Manor of Revelry Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 14,
            "name": "Reaver Citadel Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 15,
            "name": "The Orchard Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 27,
            "name": "Shrouded Plains Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 29,
            "name": "Court of Contempt Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 47,
            "name": "Deathspinner's Lair",
            "poiType": 2
          },
          {
            "poiIndex": 48,
            "name": "Cadwell's Hovel",
            "poiType": 2
          },
          {
            "poiIndex": 49,
            "name": "Shrine of Kyne",
            "poiType": 2
          },
          {
            "poiIndex": 50,
            "name": "Endless Overlook",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Forsaken Village",
            "poiType": 2
          },
          {
            "poiIndex": 52,
            "name": "Survivor's Camp",
            "poiType": 2
          },
          {
            "poiIndex": 54,
            "name": "Mages Guildhall",
            "poiType": 2
          },
          {
            "poiIndex": 55,
            "name": "Fighters Guildhall",
            "poiType": 2
          },
          {
            "poiIndex": 56,
            "name": "Font of Schemes",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 16,
            "name": "Aba-Loria",
            "poiType": 3
          },
          {
            "poiIndex": 17,
            "name": "The Grotto of Depravity",
            "poiType": 3
          },
          {
            "poiIndex": 18,
            "name": "The Cave of Trophies",
            "poiType": 3
          },
          {
            "poiIndex": 19,
            "name": "Vault of Haman Forgefire",
            "poiType": 3
          },
          {
            "poiIndex": 20,
            "name": "Mal Sorra's Tomb",
            "poiType": 3
          },
          {
            "poiIndex": 21,
            "name": "The Wailing Maw",
            "poiType": 3
          },
          {
            "poiIndex": 41,
            "name": "Aba-Darre",
            "poiType": 3
          },
          {
            "poiIndex": 42,
            "name": "Duriatundur's Killing Field",
            "poiType": 3
          },
          {
            "poiIndex": 43,
            "name": "Zemarek's Hollow",
            "poiType": 3
          },
          {
            "poiIndex": 44,
            "name": "Daedroth Larder",
            "poiType": 3
          },
          {
            "poiIndex": 45,
            "name": "Risen Court",
            "poiType": 3
          },
          {
            "poiIndex": 46,
            "name": "Cynhamoth's Grove",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 40,
            "name": "Village of the Lost",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 39,
            "name": "Dungeon: Vaults of Madness",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 57,
            "name": "Coldharbour Surreal Estate",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 888,
    "name": "Craglorn",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 5,
            "name": "Rahni'Za, School of Warriors",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "The Seeker's Archive",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Shada's Tear",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Elinhir",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Spellscar",
            "poiType": 0
          },
          {
            "poiIndex": 34,
            "name": "Skyreach Pinnacle",
            "poiType": 0
          },
          {
            "poiIndex": 35,
            "name": "Skyreach Catacombs",
            "poiType": 0
          },
          {
            "poiIndex": 36,
            "name": "Skyreach Hold",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 61,
            "name": "Seeker's Archive Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 62,
            "name": "Sandy Path Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 63,
            "name": "Shada's Tear Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 64,
            "name": "Belkarth Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 65,
            "name": "Elinhir Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 66,
            "name": "Spellscar Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 67,
            "name": "Mountain Overlook Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 68,
            "name": "Inazzur's Hold Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 69,
            "name": "Dragonstar Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 70,
            "name": "Skyreach Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 71,
            "name": "Valley of Scars Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Belkarth",
            "poiType": 2
          },
          {
            "poiIndex": 2,
            "name": "Bangkorai Gate",
            "poiType": 2
          },
          {
            "poiIndex": 3,
            "name": "Proving Grounds Dolmen",
            "poiType": 2
          },
          {
            "poiIndex": 4,
            "name": "Crossroads Encampment",
            "poiType": 2
          },
          {
            "poiIndex": 10,
            "name": "Dragonstar",
            "poiType": 2
          },
          {
            "poiIndex": 11,
            "name": "Dragonstar Arena",
            "poiType": 2
          },
          {
            "poiIndex": 12,
            "name": "Atelier of the Twice-Born Star",
            "poiType": 2
          },
          {
            "poiIndex": 37,
            "name": "Taborra's Camp",
            "poiType": 2
          },
          {
            "poiIndex": 38,
            "name": "Inazzur's Hold",
            "poiType": 2
          },
          {
            "poiIndex": 39,
            "name": "Thunder Falls Camp",
            "poiType": 2
          },
          {
            "poiIndex": 40,
            "name": "Scorpion Ravine",
            "poiType": 2
          },
          {
            "poiIndex": 41,
            "name": "Lake of Teeth",
            "poiType": 2
          },
          {
            "poiIndex": 42,
            "name": "Ogondar's Winery",
            "poiType": 2
          },
          {
            "poiIndex": 43,
            "name": "Lanista's Waystation",
            "poiType": 2
          },
          {
            "poiIndex": 44,
            "name": "Sunken Lair",
            "poiType": 2
          },
          {
            "poiIndex": 45,
            "name": "Skyreach Overlook",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 13,
            "name": "Molavar",
            "poiType": 3
          },
          {
            "poiIndex": 14,
            "name": "Rkundzelft",
            "poiType": 3
          },
          {
            "poiIndex": 15,
            "name": "Serpent's Nest",
            "poiType": 3
          },
          {
            "poiIndex": 16,
            "name": "Ruins of Kardala",
            "poiType": 3
          },
          {
            "poiIndex": 17,
            "name": "Ilthag's Undertower",
            "poiType": 3
          },
          {
            "poiIndex": 18,
            "name": "Loth'Na Caverns",
            "poiType": 3
          },
          {
            "poiIndex": 19,
            "name": "Rkhardahrk",
            "poiType": 3
          },
          {
            "poiIndex": 20,
            "name": "Haddock's Market",
            "poiType": 3
          },
          {
            "poiIndex": 21,
            "name": "Chiselshriek Mine",
            "poiType": 3
          },
          {
            "poiIndex": 22,
            "name": "Buried Sands",
            "poiType": 3
          },
          {
            "poiIndex": 23,
            "name": "Mtharnaz",
            "poiType": 3
          },
          {
            "poiIndex": 24,
            "name": "The Howling Sepulchers",
            "poiType": 3
          },
          {
            "poiIndex": 25,
            "name": "Balamath",
            "poiType": 3
          },
          {
            "poiIndex": 26,
            "name": "Fearfangs Cavern",
            "poiType": 3
          },
          {
            "poiIndex": 27,
            "name": "Exarch's Stronghold",
            "poiType": 3
          },
          {
            "poiIndex": 28,
            "name": "Zalgaz's Den",
            "poiType": 3
          },
          {
            "poiIndex": 29,
            "name": "Tombs of the Na-Totambu",
            "poiType": 3
          },
          {
            "poiIndex": 30,
            "name": "Hircine's Haunt",
            "poiType": 3
          },
          {
            "poiIndex": 31,
            "name": "Trial: Hel Ra Citadel",
            "poiType": 3
          },
          {
            "poiIndex": 32,
            "name": "Trial: Aetherian Archive",
            "poiType": 3
          },
          {
            "poiIndex": 33,
            "name": "Trial: Sanctum Ophidia",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 46,
            "name": "Conflagrant Anomaly",
            "poiType": 4
          },
          {
            "poiIndex": 47,
            "name": "Fulminant Anomaly",
            "poiType": 4
          },
          {
            "poiIndex": 48,
            "name": "Adamant Anomaly",
            "poiType": 4
          },
          {
            "poiIndex": 49,
            "name": "Cyclonic Anomaly",
            "poiType": 4
          },
          {
            "poiIndex": 50,
            "name": "Boreal Anomaly",
            "poiType": 4
          },
          {
            "poiIndex": 51,
            "name": "Anka-Ra's Vigil",
            "poiType": 4
          },
          {
            "poiIndex": 52,
            "name": "Anka-Ra's Plight",
            "poiType": 4
          },
          {
            "poiIndex": 53,
            "name": "Anka-Ra's Avowal",
            "poiType": 4
          },
          {
            "poiIndex": 54,
            "name": "Anka-Ra's Crucible",
            "poiType": 4
          },
          {
            "poiIndex": 55,
            "name": "Anka-Ra's Mettle",
            "poiType": 4
          },
          {
            "poiIndex": 56,
            "name": "Defunct Nirncrux Mine",
            "poiType": 4
          },
          {
            "poiIndex": 57,
            "name": "Overrun Nirncrux Mine",
            "poiType": 4
          },
          {
            "poiIndex": 58,
            "name": "Neglected Nirncrux Mine",
            "poiType": 4
          },
          {
            "poiIndex": 59,
            "name": "Secluded Nirncrux Mine",
            "poiType": 4
          },
          {
            "poiIndex": 60,
            "name": "Pillaged Nirncrux Mine",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 74,
            "name": "Dungeon: Bloodroot Forge",
            "poiType": 6
          },
          {
            "poiIndex": 75,
            "name": "Dungeon: Falkreath Hold",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 72,
            "name": "Domus Phrasticus",
            "poiType": 7
          },
          {
            "poiIndex": 73,
            "name": "Earthtear Cavern",
            "poiType": 7
          },
          {
            "poiIndex": 76,
            "name": "Hakkvild's High Hall",
            "poiType": 7
          },
          {
            "poiIndex": 77,
            "name": "Elinhir Private Arena",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 181,
    "name": "Cyrodiil",
    "poiTypes": [
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 52,
            "name": "North High Rock Gate Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 53,
            "name": "South High Rock Gate Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 54,
            "name": "Eastern Elsweyr Gate Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 55,
            "name": "Western Elsweyr Gate Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 56,
            "name": "North Morrowind Gate Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 57,
            "name": "South Morrowind Gate Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Sardavar Leed",
            "poiType": 2
          },
          {
            "poiIndex": 2,
            "name": "Gray Viper Outpost",
            "poiType": 2
          },
          {
            "poiIndex": 3,
            "name": "Homestead Ruins",
            "poiType": 2
          },
          {
            "poiIndex": 4,
            "name": "Culotte",
            "poiType": 2
          },
          {
            "poiIndex": 5,
            "name": "Juras Falls",
            "poiType": 2
          },
          {
            "poiIndex": 7,
            "name": "Howling Cave",
            "poiType": 2
          },
          {
            "poiIndex": 8,
            "name": "Ceyatatar",
            "poiType": 2
          },
          {
            "poiIndex": 10,
            "name": "Lunar Fang Docks",
            "poiType": 2
          },
          {
            "poiIndex": 13,
            "name": "Abbey of the Eight",
            "poiType": 2
          },
          {
            "poiIndex": 14,
            "name": "Nornalhorst",
            "poiType": 2
          },
          {
            "poiIndex": 16,
            "name": "Narsinfel",
            "poiType": 2
          },
          {
            "poiIndex": 17,
            "name": "Wooden Hand Outlook",
            "poiType": 2
          },
          {
            "poiIndex": 18,
            "name": "Fanacasecul",
            "poiType": 2
          },
          {
            "poiIndex": 19,
            "name": "Hackdirt",
            "poiType": 2
          },
          {
            "poiIndex": 20,
            "name": "Wenyandawik",
            "poiType": 2
          },
          {
            "poiIndex": 22,
            "name": "Chorrol",
            "poiType": 2
          },
          {
            "poiIndex": 25,
            "name": "Ninendava",
            "poiType": 2
          },
          {
            "poiIndex": 26,
            "name": "Moranda",
            "poiType": 2
          },
          {
            "poiIndex": 27,
            "name": "Piukanda",
            "poiType": 2
          },
          {
            "poiIndex": 28,
            "name": "Sercen",
            "poiType": 2
          },
          {
            "poiIndex": 29,
            "name": "Anga",
            "poiType": 2
          },
          {
            "poiIndex": 30,
            "name": "Hrotanda Vale",
            "poiType": 2
          },
          {
            "poiIndex": 32,
            "name": "Lindai",
            "poiType": 2
          },
          {
            "poiIndex": 33,
            "name": "Empire Tower",
            "poiType": 2
          },
          {
            "poiIndex": 34,
            "name": "Lake Mist Ruins",
            "poiType": 2
          },
          {
            "poiIndex": 35,
            "name": "Waterside Mine",
            "poiType": 2
          },
          {
            "poiIndex": 44,
            "name": "Nornal",
            "poiType": 2
          },
          {
            "poiIndex": 45,
            "name": "Cheydinhal",
            "poiType": 2
          },
          {
            "poiIndex": 46,
            "name": "Harlun's Watch",
            "poiType": 2
          },
          {
            "poiIndex": 47,
            "name": "Belda",
            "poiType": 2
          },
          {
            "poiIndex": 48,
            "name": "Burned Estate",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Temple of the Ancestor Moths",
            "poiType": 2
          },
          {
            "poiIndex": 67,
            "name": "The Apprentice",
            "poiType": 2
          },
          {
            "poiIndex": 68,
            "name": "The Atronach",
            "poiType": 2
          },
          {
            "poiIndex": 69,
            "name": "The Lady",
            "poiType": 2
          },
          {
            "poiIndex": 70,
            "name": "The Warrior",
            "poiType": 2
          },
          {
            "poiIndex": 71,
            "name": "The Mage",
            "poiType": 2
          },
          {
            "poiIndex": 72,
            "name": "The Thief",
            "poiType": 2
          },
          {
            "poiIndex": 73,
            "name": "The Lover",
            "poiType": 2
          },
          {
            "poiIndex": 74,
            "name": "The Serpent",
            "poiType": 2
          },
          {
            "poiIndex": 75,
            "name": "The Ritual",
            "poiType": 2
          },
          {
            "poiIndex": 76,
            "name": "The Tower",
            "poiType": 2
          },
          {
            "poiIndex": 77,
            "name": "The Steed",
            "poiType": 2
          },
          {
            "poiIndex": 78,
            "name": "The Shadow",
            "poiType": 2
          },
          {
            "poiIndex": 79,
            "name": "Cloud Ruler Temple",
            "poiType": 2
          },
          {
            "poiIndex": 80,
            "name": "Riverwatch",
            "poiType": 2
          },
          {
            "poiIndex": 81,
            "name": "Zimar's Winery",
            "poiType": 2
          },
          {
            "poiIndex": 82,
            "name": "Thalara's Winery",
            "poiType": 2
          },
          {
            "poiIndex": 83,
            "name": "Wilminn's Winery",
            "poiType": 2
          },
          {
            "poiIndex": 84,
            "name": "Sedor",
            "poiType": 2
          },
          {
            "poiIndex": 85,
            "name": "Coldcorn Ruin",
            "poiType": 2
          },
          {
            "poiIndex": 86,
            "name": "Fanacas",
            "poiType": 2
          },
          {
            "poiIndex": 87,
            "name": "Hedoran Estate",
            "poiType": 2
          },
          {
            "poiIndex": 88,
            "name": "Weynon Priory",
            "poiType": 2
          },
          {
            "poiIndex": 89,
            "name": "Crooked Finger Redoubt",
            "poiType": 2
          },
          {
            "poiIndex": 91,
            "name": "Highlander Camp",
            "poiType": 2
          },
          {
            "poiIndex": 92,
            "name": "Ice-Heart Home",
            "poiType": 2
          },
          {
            "poiIndex": 93,
            "name": "Weye",
            "poiType": 2
          },
          {
            "poiIndex": 94,
            "name": "Shurgak Clan Estate",
            "poiType": 2
          },
          {
            "poiIndex": 96,
            "name": "Abandoned Orchard",
            "poiType": 2
          },
          {
            "poiIndex": 97,
            "name": "Nagastani",
            "poiType": 2
          },
          {
            "poiIndex": 98,
            "name": "Barren Cave",
            "poiType": 2
          },
          {
            "poiIndex": 99,
            "name": "Moffka's Lament",
            "poiType": 2
          },
          {
            "poiIndex": 100,
            "name": "White Fall Mountain",
            "poiType": 2
          },
          {
            "poiIndex": 107,
            "name": "Cropsford Armory",
            "poiType": 2
          },
          {
            "poiIndex": 108,
            "name": "Vlastarus Armory",
            "poiType": 2
          },
          {
            "poiIndex": 109,
            "name": "Bruma Armory",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 9,
            "name": "Haynote Cave",
            "poiType": 3
          },
          {
            "poiIndex": 11,
            "name": "Pothole Caverns",
            "poiType": 3
          },
          {
            "poiIndex": 12,
            "name": "Newt Cave",
            "poiType": 3
          },
          {
            "poiIndex": 15,
            "name": "Nisin Cave",
            "poiType": 3
          },
          {
            "poiIndex": 21,
            "name": "Bloodmayne Cave",
            "poiType": 3
          },
          {
            "poiIndex": 23,
            "name": "Red Ruby Cave",
            "poiType": 3
          },
          {
            "poiIndex": 24,
            "name": "Capstone Cave",
            "poiType": 3
          },
          {
            "poiIndex": 31,
            "name": "Echo Cave",
            "poiType": 3
          },
          {
            "poiIndex": 36,
            "name": "Lipsand Tarn",
            "poiType": 3
          },
          {
            "poiIndex": 37,
            "name": "Cracked Wood Cave",
            "poiType": 3
          },
          {
            "poiIndex": 38,
            "name": "Kingscrest Cavern",
            "poiType": 3
          },
          {
            "poiIndex": 39,
            "name": "Muck Valley Cavern",
            "poiType": 3
          },
          {
            "poiIndex": 40,
            "name": "Quickwater Cave",
            "poiType": 3
          },
          {
            "poiIndex": 41,
            "name": "Vahtacen",
            "poiType": 3
          },
          {
            "poiIndex": 42,
            "name": "Breakneck Cave",
            "poiType": 3
          },
          {
            "poiIndex": 43,
            "name": "Serpent Hollow Cave",
            "poiType": 3
          },
          {
            "poiIndex": 90,
            "name": "Underpall Cave",
            "poiType": 3
          },
          {
            "poiIndex": 95,
            "name": "Toadstool Hollow",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 58,
            "name": "Greenmead Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 59,
            "name": "Great Forest Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 60,
            "name": "Nibenay Valley Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 61,
            "name": "Applewatch Wood Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 62,
            "name": "Winter's Reach Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 63,
            "name": "Northwestern Shore Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 64,
            "name": "Eastern Shore Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 65,
            "name": "Niben Basin Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 66,
            "name": "Cheydinhal Foothills Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 106,
            "name": "Bruma",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 104,
            "name": "Dungeon: Imperial City Prison",
            "poiType": 6
          },
          {
            "poiIndex": 105,
            "name": "Dungeon: White-Gold Tower",
            "poiType": 6
          }
        ]
      }
    ]
  },
  {
    "zoneId": 57,
    "name": "Deshaan",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Malak's Maw",
            "poiType": 0
          },
          {
            "poiIndex": 2,
            "name": "Silent Mire",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Muth Gnaar",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Deepcrag Den",
            "poiType": 0
          },
          {
            "poiIndex": 5,
            "name": "Quarantine Serk",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "Narsis",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Tal'Deic Fortress",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Mzithumz",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Vale of the Ghost Snake",
            "poiType": 0
          },
          {
            "poiIndex": 10,
            "name": "Obsidian Gorge",
            "poiType": 0
          },
          {
            "poiIndex": 11,
            "name": "Eidolon's Hollow",
            "poiType": 0
          },
          {
            "poiIndex": 12,
            "name": "Mournhold",
            "poiType": 0
          },
          {
            "poiIndex": 13,
            "name": "Tribunal Temple",
            "poiType": 0
          },
          {
            "poiIndex": 17,
            "name": "Shrine of Saint Veloth",
            "poiType": 0
          },
          {
            "poiIndex": 18,
            "name": "Shad Astula",
            "poiType": 0
          },
          {
            "poiIndex": 19,
            "name": "Selfora",
            "poiType": 0
          },
          {
            "poiIndex": 39,
            "name": "Bthanual",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 22,
            "name": "West Narsis Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 23,
            "name": "Muth Gnaar Hills Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 24,
            "name": "Quarantine Serk Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 25,
            "name": "Ghost Snake Vale Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 26,
            "name": "Mournhold Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 27,
            "name": "Tal'Deic Grounds Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 28,
            "name": "Obsidian Gorge Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 29,
            "name": "Mzithumz Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 30,
            "name": "Selfora Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 31,
            "name": "Silent Mire Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 32,
            "name": "Eidolon's Hollow Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 43,
            "name": "Shad Astula Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 14,
            "name": "The Tower",
            "poiType": 2
          },
          {
            "poiIndex": 15,
            "name": "The Mage",
            "poiType": 2
          },
          {
            "poiIndex": 16,
            "name": "The Lord",
            "poiType": 2
          },
          {
            "poiIndex": 50,
            "name": "House Dres Farmstead",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Avayan's Farm",
            "poiType": 2
          },
          {
            "poiIndex": 52,
            "name": "Lake Hlaalu Retreat",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Berezan's Mine",
            "poiType": 2
          },
          {
            "poiIndex": 54,
            "name": "Old Ida's Cottage",
            "poiType": 2
          },
          {
            "poiIndex": 55,
            "name": "Shrine to Saint Rilms",
            "poiType": 2
          },
          {
            "poiIndex": 56,
            "name": "Coiled Path Landing",
            "poiType": 2
          },
          {
            "poiIndex": 57,
            "name": "Smuggler's Slip",
            "poiType": 2
          },
          {
            "poiIndex": 58,
            "name": "Redoran Pier",
            "poiType": 2
          },
          {
            "poiIndex": 59,
            "name": "Hlanii's Hovel",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 33,
            "name": "Lady Llarel's Shelter",
            "poiType": 3
          },
          {
            "poiIndex": 34,
            "name": "Lower Bthanual",
            "poiType": 3
          },
          {
            "poiIndex": 35,
            "name": "Triple Circle Mine",
            "poiType": 3
          },
          {
            "poiIndex": 36,
            "name": "Taleon's Crag",
            "poiType": 3
          },
          {
            "poiIndex": 37,
            "name": "Knife Ear Grotto",
            "poiType": 3
          },
          {
            "poiIndex": 38,
            "name": "The Corpse Garden",
            "poiType": 3
          },
          {
            "poiIndex": 44,
            "name": "Short-Tusk's Hillock",
            "poiType": 3
          },
          {
            "poiIndex": 45,
            "name": "Grove of the Abomination",
            "poiType": 3
          },
          {
            "poiIndex": 46,
            "name": "Dire Bramblepatch",
            "poiType": 3
          },
          {
            "poiIndex": 47,
            "name": "Mabrigash Burial Circle",
            "poiType": 3
          },
          {
            "poiIndex": 48,
            "name": "Druitularg's Ritual Altar",
            "poiType": 3
          },
          {
            "poiIndex": 49,
            "name": "Caravan Crest",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 40,
            "name": "Redolent Loam Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 41,
            "name": "Lagomere Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 42,
            "name": "Siltreen Dolmen",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 20,
            "name": "Forgotten Crypts",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 21,
            "name": "Dungeon: Darkshade Caverns I",
            "poiType": 6
          },
          {
            "poiIndex": 60,
            "name": "Dungeon: Darkshade Caverns I",
            "poiType": 6
          },
          {
            "poiIndex": 64,
            "name": "Dungeon: The Cauldron",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 61,
            "name": "Quondam Indorilia",
            "poiType": 7
          },
          {
            "poiIndex": 62,
            "name": "Velothi Reverie",
            "poiType": 7
          },
          {
            "poiIndex": 63,
            "name": "Flaming Nix Deluxe Garret",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 101,
    "name": "Eastmarch",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Thulvald's Logging Camp",
            "poiType": 0
          },
          {
            "poiIndex": 5,
            "name": "Lower Yorgrim",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "Kynesgrove",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Windhelm",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Fort Morvunskar",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Cradlecrush",
            "poiType": 0
          },
          {
            "poiIndex": 10,
            "name": "Mzulft",
            "poiType": 0
          },
          {
            "poiIndex": 11,
            "name": "Wittestadr",
            "poiType": 0
          },
          {
            "poiIndex": 12,
            "name": "Bonestrewn Crest",
            "poiType": 0
          },
          {
            "poiIndex": 13,
            "name": "Fort Amol",
            "poiType": 0
          },
          {
            "poiIndex": 25,
            "name": "Mistwatch",
            "poiType": 0
          },
          {
            "poiIndex": 32,
            "name": "Voljar's Meadery",
            "poiType": 0
          },
          {
            "poiIndex": 33,
            "name": "Lost Knife Cave",
            "poiType": 0
          },
          {
            "poiIndex": 34,
            "name": "Cragwallow",
            "poiType": 0
          },
          {
            "poiIndex": 35,
            "name": "Jorunn's Stand",
            "poiType": 0
          },
          {
            "poiIndex": 36,
            "name": "Skuldafn",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 14,
            "name": "Windhelm Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 15,
            "name": "Fort Morvunskar Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 16,
            "name": "Kynesgrove Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 17,
            "name": "Voljar Meadery Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 18,
            "name": "Cradlecrush Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 19,
            "name": "Fort Amol Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 20,
            "name": "Wittestadr Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 21,
            "name": "Mistwatch Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 22,
            "name": "Jorunn's Stand Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 23,
            "name": "Logging Camp Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 24,
            "name": "Skuldafn Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 2,
            "name": "The Thief",
            "poiType": 2
          },
          {
            "poiIndex": 3,
            "name": "The Warrior",
            "poiType": 2
          },
          {
            "poiIndex": 4,
            "name": "The Ritual",
            "poiType": 2
          },
          {
            "poiIndex": 48,
            "name": "Darkwater Crossing",
            "poiType": 2
          },
          {
            "poiIndex": 49,
            "name": "Giant's Heart",
            "poiType": 2
          },
          {
            "poiIndex": 50,
            "name": "Ragnthar",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Cragwallow Cave",
            "poiType": 2
          },
          {
            "poiIndex": 52,
            "name": "Hammerhome",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Bitterblade's Camp",
            "poiType": 2
          },
          {
            "poiIndex": 54,
            "name": "Tinkerer Tobin's Workshop",
            "poiType": 2
          },
          {
            "poiIndex": 55,
            "name": "Crimson Kada's Crafting Cavern",
            "poiType": 2
          },
          {
            "poiIndex": 56,
            "name": "Hermit's Hideout",
            "poiType": 2
          },
          {
            "poiIndex": 57,
            "name": "Thane Jeggi's Drinking Hole",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 26,
            "name": "The Chill Hollow",
            "poiType": 3
          },
          {
            "poiIndex": 27,
            "name": "Icehammer's Vault",
            "poiType": 3
          },
          {
            "poiIndex": 28,
            "name": "Old Sord's Cave",
            "poiType": 3
          },
          {
            "poiIndex": 29,
            "name": "The Frigid Grotto",
            "poiType": 3
          },
          {
            "poiIndex": 30,
            "name": "Stormcrag Crypt",
            "poiType": 3
          },
          {
            "poiIndex": 31,
            "name": "The Bastard's Tomb",
            "poiType": 3
          },
          {
            "poiIndex": 42,
            "name": "Rageclaw's Den",
            "poiType": 3
          },
          {
            "poiIndex": 43,
            "name": "Dragon Mound",
            "poiType": 3
          },
          {
            "poiIndex": 44,
            "name": "Ratmaster's Prowl",
            "poiType": 3
          },
          {
            "poiIndex": 45,
            "name": "Dragon's Hallow",
            "poiType": 3
          },
          {
            "poiIndex": 46,
            "name": "Ammabani's Pride",
            "poiType": 3
          },
          {
            "poiIndex": 47,
            "name": "Swiftblade's Camp",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 38,
            "name": "Giant's Run Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 39,
            "name": "Frostwater Tundra Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 40,
            "name": "Icewind Peaks Dolmen",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 37,
            "name": "Hall of the Dead",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 41,
            "name": "Dungeon: Direfrost Keep",
            "poiType": 6
          },
          {
            "poiIndex": 60,
            "name": "Dungeon: Frostvault",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 58,
            "name": "Grymharth's Woe",
            "poiType": 7
          },
          {
            "poiIndex": 59,
            "name": "Enchanted Snow Globe Home",
            "poiType": 7
          },
          {
            "poiIndex": 61,
            "name": "Frostvault Chasm",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1383,
    "name": "Galen",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Vastyr",
            "poiType": 0
          },
          {
            "poiIndex": 2,
            "name": "Y'ffre's Path",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Llanshara",
            "poiType": 0
          },
          {
            "poiIndex": 17,
            "name": "Tuinh",
            "poiType": 0
          },
          {
            "poiIndex": 18,
            "name": "Suncleft Grotto",
            "poiType": 0
          },
          {
            "poiIndex": 22,
            "name": "Westport",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 26,
            "name": "Vastyr Outskirts Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 27,
            "name": "Glimmertarn Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 28,
            "name": "Embervine Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 29,
            "name": "Llanshara Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 30,
            "name": "Y'ffre's Path Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 31,
            "name": "Vastyr Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 32,
            "name": "Eastern Shores Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 8,
            "name": "Old Port Mornard",
            "poiType": 2
          },
          {
            "poiIndex": 9,
            "name": "Fort Avrippe",
            "poiType": 2
          },
          {
            "poiIndex": 10,
            "name": "Oaken Forge",
            "poiType": 2
          },
          {
            "poiIndex": 16,
            "name": "Windwrack Fort",
            "poiType": 2
          },
          {
            "poiIndex": 19,
            "name": "Castle Tonnere",
            "poiType": 2
          },
          {
            "poiIndex": 20,
            "name": "Glimmertarn",
            "poiType": 2
          },
          {
            "poiIndex": 21,
            "name": "Clohaigh",
            "poiType": 2
          },
          {
            "poiIndex": 23,
            "name": "Ivyhame",
            "poiType": 2
          },
          {
            "poiIndex": 25,
            "name": "The Telling Stone",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 4,
            "name": "Embervine",
            "poiType": 3
          },
          {
            "poiIndex": 5,
            "name": "Fauns' Thicket",
            "poiType": 3
          },
          {
            "poiIndex": 6,
            "name": "Valley of the Watcher",
            "poiType": 3
          },
          {
            "poiIndex": 7,
            "name": "Grove of the Chimera",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 11,
            "name": "Vastyr Outskirts Volcanic Vent",
            "poiType": 4
          },
          {
            "poiIndex": 12,
            "name": "Farpoint Volcanic Vent",
            "poiType": 4
          },
          {
            "poiIndex": 13,
            "name": "Llanshara Volcanic Vent",
            "poiType": 4
          },
          {
            "poiIndex": 14,
            "name": "Telling Stone Volcanic Vent",
            "poiType": 4
          },
          {
            "poiIndex": 15,
            "name": "Eastern Shores Volcanic Vent",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 33,
            "name": "The Fair Winds",
            "poiType": 7
          },
          {
            "poiIndex": 34,
            "name": "Gladesong Arboretum",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 3,
    "name": "Glenumbra",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Red Rook Camp",
            "poiType": 0
          },
          {
            "poiIndex": 2,
            "name": "Hag Fen",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Burial Mounds",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Daggerfall",
            "poiType": 0
          },
          {
            "poiIndex": 5,
            "name": "Deleyn's Mill",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "Aldcroft",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Shrieking Scar",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Glenumbra Moors",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Westtry",
            "poiType": 0
          },
          {
            "poiIndex": 10,
            "name": "Lion Guard Redoubt",
            "poiType": 0
          },
          {
            "poiIndex": 11,
            "name": "Vale of the Guardians",
            "poiType": 0
          },
          {
            "poiIndex": 12,
            "name": "Eagle's Brook",
            "poiType": 0
          },
          {
            "poiIndex": 13,
            "name": "Camlorn",
            "poiType": 0
          },
          {
            "poiIndex": 14,
            "name": "Beldama Wyrd Tree",
            "poiType": 0
          },
          {
            "poiIndex": 15,
            "name": "Tomb of Lost Kings",
            "poiType": 0
          },
          {
            "poiIndex": 16,
            "name": "Crosswych",
            "poiType": 0
          },
          {
            "poiIndex": 17,
            "name": "Cath Bedraud",
            "poiType": 0
          },
          {
            "poiIndex": 18,
            "name": "Dresan Keep",
            "poiType": 0
          },
          {
            "poiIndex": 19,
            "name": "Baelborne Rock",
            "poiType": 0
          },
          {
            "poiIndex": 39,
            "name": "Dwynnarth Ruins",
            "poiType": 0
          },
          {
            "poiIndex": 72,
            "name": "Shrine of Hircine",
            "poiType": 0
          },
          {
            "poiIndex": 73,
            "name": "Shrine of Lamae Bal",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 26,
            "name": "Wyrd Tree Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 27,
            "name": "Aldcroft Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 28,
            "name": "Deleyn's Mill Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 29,
            "name": "Eagle's Brook Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 30,
            "name": "North Hag Fen Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 31,
            "name": "Lion Guard Redoubt Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 32,
            "name": "Crosswych Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 33,
            "name": "Farwatch Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 34,
            "name": "Baelborne Rock Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 35,
            "name": "Daggerfall Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 36,
            "name": "Burial Tombs Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 46,
            "name": "The Harborage",
            "poiType": 1
          },
          {
            "poiIndex": 65,
            "name": "Hag Fen Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 37,
            "name": "The Lover",
            "poiType": 2
          },
          {
            "poiIndex": 38,
            "name": "The Lady",
            "poiType": 2
          },
          {
            "poiIndex": 40,
            "name": "Cambray Pass",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Valewatch Tower",
            "poiType": 2
          },
          {
            "poiIndex": 54,
            "name": "Merovec's Folly",
            "poiType": 2
          },
          {
            "poiIndex": 55,
            "name": "Tangle Rock",
            "poiType": 2
          },
          {
            "poiIndex": 56,
            "name": "Mesanthano's Tower",
            "poiType": 2
          },
          {
            "poiIndex": 57,
            "name": "Mire Falls",
            "poiType": 2
          },
          {
            "poiIndex": 58,
            "name": "Miltrin's Fishing Cabin",
            "poiType": 2
          },
          {
            "poiIndex": 59,
            "name": "Gaudet Farm",
            "poiType": 2
          },
          {
            "poiIndex": 60,
            "name": "Chill House",
            "poiType": 2
          },
          {
            "poiIndex": 61,
            "name": "Par Molag",
            "poiType": 2
          },
          {
            "poiIndex": 62,
            "name": "Dourstone Island",
            "poiType": 2
          },
          {
            "poiIndex": 75,
            "name": "Freerunner's Post Board",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 20,
            "name": "Ilessan Tower",
            "poiType": 3
          },
          {
            "poiIndex": 21,
            "name": "Silumm",
            "poiType": 3
          },
          {
            "poiIndex": 22,
            "name": "Mines of Khuras",
            "poiType": 3
          },
          {
            "poiIndex": 23,
            "name": "Enduum",
            "poiType": 3
          },
          {
            "poiIndex": 24,
            "name": "Ebon Crypt",
            "poiType": 3
          },
          {
            "poiIndex": 25,
            "name": "Cryptwatch Fort",
            "poiType": 3
          },
          {
            "poiIndex": 47,
            "name": "Seaview Point",
            "poiType": 3
          },
          {
            "poiIndex": 48,
            "name": "Western Overlook",
            "poiType": 3
          },
          {
            "poiIndex": 49,
            "name": "The Wolf's Camp",
            "poiType": 3
          },
          {
            "poiIndex": 50,
            "name": "North Shore Point",
            "poiType": 3
          },
          {
            "poiIndex": 51,
            "name": "Trapjaw's Cove",
            "poiType": 3
          },
          {
            "poiIndex": 52,
            "name": "Balefire Island",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 43,
            "name": "Daenia Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 44,
            "name": "Cambray Hills Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 45,
            "name": "King's Guard Dolmen",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 41,
            "name": "Bad Man's Hallows",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 42,
            "name": "Dungeon: Spindleclutch I",
            "poiType": 6
          },
          {
            "poiIndex": 66,
            "name": "Dungeon: Spindleclutch II",
            "poiType": 6
          },
          {
            "poiIndex": 71,
            "name": "Dungeon: Red Petal Bastion",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 67,
            "name": "Captain Margaux's Place",
            "poiType": 7
          },
          {
            "poiIndex": 68,
            "name": "The Rosy Lion",
            "poiType": 7
          },
          {
            "poiIndex": 69,
            "name": "Daggerfall Overlook",
            "poiType": 7
          },
          {
            "poiIndex": 70,
            "name": "Exorcised Coven Cottage",
            "poiType": 7
          },
          {
            "poiIndex": 74,
            "name": "Rogue's Refuge",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 823,
    "name": "Gold Coast",
    "poiTypes": [
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Anvil Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 2,
            "name": "Kvatch Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 3,
            "name": "Strid River Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 4,
            "name": "Gold Coast Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 5,
            "name": "Kvatch",
            "poiType": 2
          },
          {
            "poiIndex": 6,
            "name": "Anvil",
            "poiType": 2
          },
          {
            "poiIndex": 9,
            "name": "Knightsgrave",
            "poiType": 2
          },
          {
            "poiIndex": 11,
            "name": "At-Himah Family Estate",
            "poiType": 2
          },
          {
            "poiIndex": 12,
            "name": "Beldaburo",
            "poiType": 2
          },
          {
            "poiIndex": 13,
            "name": "Enclave of the Hourglass",
            "poiType": 2
          },
          {
            "poiIndex": 14,
            "name": "Jarol Estate",
            "poiType": 2
          },
          {
            "poiIndex": 15,
            "name": "Anvil Lighthouse",
            "poiType": 2
          },
          {
            "poiIndex": 16,
            "name": "Varen's Wall Gatehouse",
            "poiType": 2
          },
          {
            "poiIndex": 17,
            "name": "Garlas Malatar",
            "poiType": 2
          },
          {
            "poiIndex": 18,
            "name": "Marja's Mill",
            "poiType": 2
          },
          {
            "poiIndex": 19,
            "name": "Strid River Artisans Camp",
            "poiType": 2
          },
          {
            "poiIndex": 20,
            "name": "Colovian Revolt Forge Yard",
            "poiType": 2
          },
          {
            "poiIndex": 22,
            "name": "Dark Brotherhood Sanctuary",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 7,
            "name": "Hrota Cave",
            "poiType": 3
          },
          {
            "poiIndex": 8,
            "name": "Garlas Agea",
            "poiType": 3
          },
          {
            "poiIndex": 10,
            "name": "Tribune's Folly",
            "poiType": 3
          },
          {
            "poiIndex": 21,
            "name": "Kvatch Arena",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 25,
            "name": "Dungeon: Depths of Malatar",
            "poiType": 6
          },
          {
            "poiIndex": 26,
            "name": "Dungeon: Black Drake Villa",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 23,
            "name": "Linchal Grand Manor",
            "poiType": 7
          },
          {
            "poiIndex": 24,
            "name": "The Erstwhile Sanctuary",
            "poiType": 7
          },
          {
            "poiIndex": 27,
            "name": "Varlaisvea Ayleid Ruins",
            "poiType": 7
          },
          {
            "poiIndex": 28,
            "name": "Hiddenspring Cottage",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 383,
    "name": "Grahtwood",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Reliquary of Stars",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Haven",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Reman's Bluff",
            "poiType": 0
          },
          {
            "poiIndex": 5,
            "name": "Bone Orchard",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "Gil-Var-Delle",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Cave of Broken Sails",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "The Gray Mire",
            "poiType": 0
          },
          {
            "poiIndex": 10,
            "name": "Brackenleaf",
            "poiType": 0
          },
          {
            "poiIndex": 11,
            "name": "Ossuary of Telacar",
            "poiType": 0
          },
          {
            "poiIndex": 23,
            "name": "Laeloria",
            "poiType": 0
          },
          {
            "poiIndex": 24,
            "name": "Elden Root",
            "poiType": 0
          },
          {
            "poiIndex": 25,
            "name": "Southpoint",
            "poiType": 0
          },
          {
            "poiIndex": 29,
            "name": "Falinesti Winter Site",
            "poiType": 0
          },
          {
            "poiIndex": 30,
            "name": "Karthdar",
            "poiType": 0
          },
          {
            "poiIndex": 31,
            "name": "Cormount",
            "poiType": 0
          },
          {
            "poiIndex": 32,
            "name": "Redfur Trading Post",
            "poiType": 0
          },
          {
            "poiIndex": 33,
            "name": "Goldfolly",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 15,
            "name": "Elden Root Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 16,
            "name": "Gil-Var-Delle Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 17,
            "name": "Elden Root Temple Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 18,
            "name": "Haven Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 19,
            "name": "Redfur Trading Post Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 20,
            "name": "Southpoint Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 21,
            "name": "Cormount Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 22,
            "name": "Ossuary Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 40,
            "name": "Gray Mire Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 41,
            "name": "Falinesti Winter Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 12,
            "name": "The Tower",
            "poiType": 2
          },
          {
            "poiIndex": 13,
            "name": "The Mage",
            "poiType": 2
          },
          {
            "poiIndex": 14,
            "name": "The Lord",
            "poiType": 2
          },
          {
            "poiIndex": 48,
            "name": "Tarlain Bandit Camp",
            "poiType": 2
          },
          {
            "poiIndex": 49,
            "name": "Vineshade Lodge",
            "poiType": 2
          },
          {
            "poiIndex": 50,
            "name": "Boar's Run Overlook",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Battle of Cormount Memorial",
            "poiType": 2
          },
          {
            "poiIndex": 52,
            "name": "Temple of the Eight",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Sweetbreeze Cottage",
            "poiType": 2
          },
          {
            "poiIndex": 54,
            "name": "Sacred Leap Grotto",
            "poiType": 2
          },
          {
            "poiIndex": 55,
            "name": "Fisherman's Isle",
            "poiType": 2
          },
          {
            "poiIndex": 56,
            "name": "Forked Root Camp",
            "poiType": 2
          },
          {
            "poiIndex": 57,
            "name": "Faltonia's Mine",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 34,
            "name": "Ne Salas",
            "poiType": 3
          },
          {
            "poiIndex": 35,
            "name": "The Scuttle Pit",
            "poiType": 3
          },
          {
            "poiIndex": 36,
            "name": "Vinedeath Cave",
            "poiType": 3
          },
          {
            "poiIndex": 37,
            "name": "Burroot Kwama Mine",
            "poiType": 3
          },
          {
            "poiIndex": 38,
            "name": "Wormroot Depths",
            "poiType": 3
          },
          {
            "poiIndex": 39,
            "name": "Mobar Mine",
            "poiType": 3
          },
          {
            "poiIndex": 42,
            "name": "Hircine's Henge",
            "poiType": 3
          },
          {
            "poiIndex": 43,
            "name": "Nindaeril's Perch",
            "poiType": 3
          },
          {
            "poiIndex": 44,
            "name": "Lady Solace's Fen",
            "poiType": 3
          },
          {
            "poiIndex": 45,
            "name": "Poacher Camp",
            "poiType": 3
          },
          {
            "poiIndex": 46,
            "name": "Thugrub's Cave",
            "poiType": 3
          },
          {
            "poiIndex": 47,
            "name": "Valanir's Rest",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 26,
            "name": "Long Coast Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 27,
            "name": "Green Hall Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 28,
            "name": "Tarlain Heights Dolmen",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 2,
            "name": "Root Sunder Ruins",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 8,
            "name": "Dungeon: Elden Hollow I",
            "poiType": 6
          },
          {
            "poiIndex": 58,
            "name": "Dungeon: Elden Hollow II",
            "poiType": 6
          },
          {
            "poiIndex": 62,
            "name": "Dungeon: Lair of Maarselok",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 59,
            "name": "The Gorinir Estate",
            "poiType": 7
          },
          {
            "poiIndex": 60,
            "name": "Snugpod",
            "poiType": 7
          },
          {
            "poiIndex": 61,
            "name": "Grand Topal Hideaway",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 108,
    "name": "Greenshade",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 2,
            "name": "Bramblebreach",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Woodhearth",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Rootwater Grove",
            "poiType": 0
          },
          {
            "poiIndex": 5,
            "name": "Verrant Morass",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "Shademist Moors",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Moonhenge",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Shadows Crawl",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Driladan Pass",
            "poiType": 0
          },
          {
            "poiIndex": 10,
            "name": "Shrouded Vale",
            "poiType": 0
          },
          {
            "poiIndex": 11,
            "name": "Serpent's Grotto",
            "poiType": 0
          },
          {
            "poiIndex": 12,
            "name": "Spinner's Cottage",
            "poiType": 0
          },
          {
            "poiIndex": 13,
            "name": "Seaside Sanctuary",
            "poiType": 0
          },
          {
            "poiIndex": 14,
            "name": "Greenheart",
            "poiType": 0
          },
          {
            "poiIndex": 15,
            "name": "Dread Vullain",
            "poiType": 0
          },
          {
            "poiIndex": 16,
            "name": "Hectahame",
            "poiType": 0
          },
          {
            "poiIndex": 46,
            "name": "Falinesti Spring Site",
            "poiType": 0
          },
          {
            "poiIndex": 57,
            "name": "Labyrinth",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 17,
            "name": "Greenheart Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 18,
            "name": "Marbruk Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 19,
            "name": "Labyrinth Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 20,
            "name": "Falinesti Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 21,
            "name": "Seaside Sanctuary Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 22,
            "name": "Verrant Morass Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 23,
            "name": "Woodhearth Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 24,
            "name": "Moonhenge Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 25,
            "name": "Serpent's Grotto Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 26,
            "name": "The Atronach",
            "poiType": 2
          },
          {
            "poiIndex": 27,
            "name": "The Serpent",
            "poiType": 2
          },
          {
            "poiIndex": 28,
            "name": "The Shadow",
            "poiType": 2
          },
          {
            "poiIndex": 32,
            "name": "Marbruk",
            "poiType": 2
          },
          {
            "poiIndex": 47,
            "name": "Seaside Overlook",
            "poiType": 2
          },
          {
            "poiIndex": 48,
            "name": "Twin Falls Rest",
            "poiType": 2
          },
          {
            "poiIndex": 49,
            "name": "Echo Pond",
            "poiType": 2
          },
          {
            "poiIndex": 50,
            "name": "Lanalda Pond",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Hollow Den",
            "poiType": 2
          },
          {
            "poiIndex": 52,
            "name": "Arananga",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Tower Rocks Vale",
            "poiType": 2
          },
          {
            "poiIndex": 54,
            "name": "Camp Gushnukbur",
            "poiType": 2
          },
          {
            "poiIndex": 55,
            "name": "Rootwatch Tower",
            "poiType": 2
          },
          {
            "poiIndex": 56,
            "name": "Fisherman's Rest",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 33,
            "name": "Gurzag's Mine",
            "poiType": 3
          },
          {
            "poiIndex": 34,
            "name": "Carac Dena",
            "poiType": 3
          },
          {
            "poiIndex": 35,
            "name": "Naril Nagaia",
            "poiType": 3
          },
          {
            "poiIndex": 36,
            "name": "The Underroot",
            "poiType": 3
          },
          {
            "poiIndex": 37,
            "name": "Harridan's Lair",
            "poiType": 3
          },
          {
            "poiIndex": 38,
            "name": "Barrow Trench",
            "poiType": 3
          },
          {
            "poiIndex": 40,
            "name": "Reconnaissance Camp",
            "poiType": 3
          },
          {
            "poiIndex": 41,
            "name": "Pelda Tarn",
            "poiType": 3
          },
          {
            "poiIndex": 42,
            "name": "Gathongor's Mire",
            "poiType": 3
          },
          {
            "poiIndex": 43,
            "name": "Rootwater Spring",
            "poiType": 3
          },
          {
            "poiIndex": 44,
            "name": "Thodundor's View",
            "poiType": 3
          },
          {
            "poiIndex": 45,
            "name": "Maormer Camp",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 29,
            "name": "Green's Marrow Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 30,
            "name": "Drowned Coast Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 31,
            "name": "Wilderking Court Dolmen",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Rulanyil's Fall",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 39,
            "name": "Dungeon: City of Ash I",
            "poiType": 6
          },
          {
            "poiIndex": 58,
            "name": "Dungeon: City of Ash II",
            "poiType": 6
          },
          {
            "poiIndex": 61,
            "name": "Dungeon: March of Sacrifices",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 59,
            "name": "Cliffshade",
            "poiType": 7
          },
          {
            "poiIndex": 60,
            "name": "Bouldertree Refuge",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 816,
    "name": "Hew's Bane",
    "poiTypes": [
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 14,
            "name": "Abah's Landing Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 15,
            "name": "Zeht's Displeasure Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 16,
            "name": "No Shira Citadel Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 6,
            "name": "Tava's Beak",
            "poiType": 2
          },
          {
            "poiIndex": 7,
            "name": "Hubalajad's Reflection",
            "poiType": 2
          },
          {
            "poiIndex": 8,
            "name": "Prince Hew's Shuttered Tomb",
            "poiType": 2
          },
          {
            "poiIndex": 9,
            "name": "Abah's Landing",
            "poiType": 2
          },
          {
            "poiIndex": 11,
            "name": "No Shira Citadel",
            "poiType": 2
          },
          {
            "poiIndex": 17,
            "name": "Placations of Zeht",
            "poiType": 2
          },
          {
            "poiIndex": 19,
            "name": "The Lost Pavilion",
            "poiType": 2
          },
          {
            "poiIndex": 21,
            "name": "Forebear's Junction",
            "poiType": 2
          },
          {
            "poiIndex": 24,
            "name": "No Shira Workshop",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Shark's Teeth Grotto",
            "poiType": 3
          },
          {
            "poiIndex": 2,
            "name": "Bahraha's Gloom",
            "poiType": 3
          },
          {
            "poiIndex": 4,
            "name": "Thrall Cove",
            "poiType": 3
          },
          {
            "poiIndex": 5,
            "name": "Ko Estaran",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 26,
            "name": "Dungeon: Lep Seclusa",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 25,
            "name": "Princely Dawnlight Palace",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1318,
    "name": "High Isle",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 2,
            "name": "Castle Navire",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Steadfast Manor",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Stonelore Grove",
            "poiType": 0
          },
          {
            "poiIndex": 5,
            "name": "Garick's Rest",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "All Flags Islet",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Tor Draioch",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Amenos Station",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Brokerock Mine",
            "poiType": 0
          },
          {
            "poiIndex": 10,
            "name": "Skulltooth Coast",
            "poiType": 0
          },
          {
            "poiIndex": 50,
            "name": "Port Navire",
            "poiType": 0
          },
          {
            "poiIndex": 52,
            "name": "Druid's Gate",
            "poiType": 0
          },
          {
            "poiIndex": 53,
            "name": "Gonfalon Head Lighthouse",
            "poiType": 0
          },
          {
            "poiIndex": 56,
            "name": "Abhain Chapel",
            "poiType": 0
          },
          {
            "poiIndex": 63,
            "name": "Jheury's Cove",
            "poiType": 0
          },
          {
            "poiIndex": 66,
            "name": "Dufort Shipyards",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 26,
            "name": "Coral Road Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 27,
            "name": "Tor Draioch Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 28,
            "name": "Steadfast Manor Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 29,
            "name": "Castle Navire Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 30,
            "name": "Garick's Rest Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 31,
            "name": "Stonelore Grove Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 32,
            "name": "Dufort Shipyards Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 33,
            "name": "Amenos Station Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 34,
            "name": "Brokerock Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 39,
            "name": "All Flags Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 48,
            "name": "Trappers Peak Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 54,
            "name": "Westbay Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 68,
            "name": "Gonfalon Square Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 72,
            "name": "Serpents Hollow Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 73,
            "name": "Flooded Coast Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Gonfalon Bay",
            "poiType": 2
          },
          {
            "poiIndex": 36,
            "name": "Stonelore Forge and Craft",
            "poiType": 2
          },
          {
            "poiIndex": 37,
            "name": "Steadfast Hammer and Saw",
            "poiType": 2
          },
          {
            "poiIndex": 38,
            "name": "Hidden Foundry",
            "poiType": 2
          },
          {
            "poiIndex": 49,
            "name": "Spriggan's Crown",
            "poiType": 2
          },
          {
            "poiIndex": 61,
            "name": "Augury Monoliths",
            "poiType": 2
          },
          {
            "poiIndex": 78,
            "name": "Green Serpent Getaway",
            "poiType": 2
          },
          {
            "poiIndex": 79,
            "name": "Banished Refuge",
            "poiType": 2
          },
          {
            "poiIndex": 80,
            "name": "Albatross Leap",
            "poiType": 2
          },
          {
            "poiIndex": 81,
            "name": "Colossus View Lighthouse",
            "poiType": 2
          },
          {
            "poiIndex": 84,
            "name": "Stonelore Falls",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 13,
            "name": "Breakwater Cave",
            "poiType": 3
          },
          {
            "poiIndex": 14,
            "name": "The Firepot",
            "poiType": 3
          },
          {
            "poiIndex": 15,
            "name": "Death's Valor Keep",
            "poiType": 3
          },
          {
            "poiIndex": 16,
            "name": "Shipwreck Shoals",
            "poiType": 3
          },
          {
            "poiIndex": 17,
            "name": "Whalefall",
            "poiType": 3
          },
          {
            "poiIndex": 18,
            "name": "Coral Cliffs",
            "poiType": 3
          },
          {
            "poiIndex": 19,
            "name": "Y'ffre's Cauldron",
            "poiType": 3
          },
          {
            "poiIndex": 20,
            "name": "Serpent Bog",
            "poiType": 3
          },
          {
            "poiIndex": 21,
            "name": "Faun Falls",
            "poiType": 3
          },
          {
            "poiIndex": 22,
            "name": "Dark Stone Hollow",
            "poiType": 3
          },
          {
            "poiIndex": 23,
            "name": "Amenos Basin",
            "poiType": 3
          },
          {
            "poiIndex": 24,
            "name": "Mornard Falls",
            "poiType": 3
          },
          {
            "poiIndex": 40,
            "name": "Trial: Dreadsail Reef",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 41,
            "name": "Sapphire Point Volcanic Vent",
            "poiType": 4
          },
          {
            "poiIndex": 42,
            "name": "Navire Volcanic Vent",
            "poiType": 4
          },
          {
            "poiIndex": 43,
            "name": "Feywatch Isle Volcanic Vent",
            "poiType": 4
          },
          {
            "poiIndex": 44,
            "name": "Garick's Rise Volcanic Vent",
            "poiType": 4
          },
          {
            "poiIndex": 45,
            "name": "Serpents Hollow Volcanic Vent",
            "poiType": 4
          },
          {
            "poiIndex": 46,
            "name": "Haunted Coast Volcanic Vent",
            "poiType": 4
          },
          {
            "poiIndex": 47,
            "name": "Flooded Coast Volcanic Vent",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 11,
            "name": "Spire of the Crimson Coin",
            "poiType": 5
          },
          {
            "poiIndex": 12,
            "name": "Ghost Haven Bay",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 74,
            "name": "Dungeon: Earthen Root Enclave",
            "poiType": 6
          },
          {
            "poiIndex": 75,
            "name": "Dungeon: Graven Deep",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 76,
            "name": "Ancient Anchor Berth",
            "poiType": 7
          },
          {
            "poiIndex": 77,
            "name": "Highhallow Hold",
            "poiType": 7
          },
          {
            "poiIndex": 85,
            "name": "Fogbreak Lighthouse",
            "poiType": 7
          },
          {
            "poiIndex": 86,
            "name": "Druidspring Conservatory",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 584,
    "name": "Imperial City",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 25,
            "name": "Arboretum",
            "poiType": 0
          },
          {
            "poiIndex": 26,
            "name": "Arena District",
            "poiType": 0
          },
          {
            "poiIndex": 27,
            "name": "Elven Gardens District",
            "poiType": 0
          },
          {
            "poiIndex": 28,
            "name": "Memorial District",
            "poiType": 0
          },
          {
            "poiIndex": 29,
            "name": "Nobles District",
            "poiType": 0
          },
          {
            "poiIndex": 30,
            "name": "Temple District",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 3,
            "name": "Sewer Entrance",
            "poiType": 2
          },
          {
            "poiIndex": 4,
            "name": "Sewer Entrance",
            "poiType": 2
          },
          {
            "poiIndex": 5,
            "name": "Sewer Entrance",
            "poiType": 2
          },
          {
            "poiIndex": 6,
            "name": "Sewer Entrance",
            "poiType": 2
          },
          {
            "poiIndex": 8,
            "name": "Sewer Entrance",
            "poiType": 2
          },
          {
            "poiIndex": 9,
            "name": "Sewer Entrance",
            "poiType": 2
          },
          {
            "poiIndex": 22,
            "name": "Arboretum Armory",
            "poiType": 2
          },
          {
            "poiIndex": 23,
            "name": "Nobles Armory",
            "poiType": 2
          },
          {
            "poiIndex": 24,
            "name": "Memorial Armory",
            "poiType": 2
          },
          {
            "poiIndex": 32,
            "name": "Legionary Trophy Vault",
            "poiType": 2
          },
          {
            "poiIndex": 33,
            "name": "Planar Armor Trophy Vault",
            "poiType": 2
          },
          {
            "poiIndex": 34,
            "name": "Bone Shard Trophy Vault",
            "poiType": 2
          },
          {
            "poiIndex": 35,
            "name": "Ethereal Trophy Vault",
            "poiType": 2
          },
          {
            "poiIndex": 36,
            "name": "Clawed Trophy Vault",
            "poiType": 2
          },
          {
            "poiIndex": 37,
            "name": "Monstrous Tooth Trophy Vault",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 31,
            "name": "Dungeon: Imperial City Prison",
            "poiType": 3
          }
        ]
      }
    ]
  },
  {
    "zoneId": 537,
    "name": "Khenarthi's Roost",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 2,
            "name": "Temple of the Mourning Springs",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Shattered Shoals",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Mistral",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Hazak's Hollow",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Cat's Eye Quay",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Windcatcher Plantation",
            "poiType": 0
          },
          {
            "poiIndex": 10,
            "name": "Speckled Shell Plantation",
            "poiType": 0
          },
          {
            "poiIndex": 11,
            "name": "Laughing Moons Plantation",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 5,
            "name": "Khenarthi's Roost Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 6,
            "name": "Mistral Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Eagle's Strand",
            "poiType": 2
          },
          {
            "poiIndex": 12,
            "name": "Bolga's Hunting Camp",
            "poiType": 2
          },
          {
            "poiIndex": 13,
            "name": "Temple of the Crescent Moons",
            "poiType": 2
          },
          {
            "poiIndex": 14,
            "name": "Temple of Two-Moons Dance",
            "poiType": 2
          },
          {
            "poiIndex": 15,
            "name": "Temple of the Dark Moon",
            "poiType": 2
          },
          {
            "poiIndex": 16,
            "name": "Rid-Thar's Solace",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 17,
            "name": "Moonmirth House",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 58,
    "name": "Malabal Tor",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Ouze",
            "poiType": 0
          },
          {
            "poiIndex": 14,
            "name": "Jathsogur",
            "poiType": 0
          },
          {
            "poiIndex": 15,
            "name": "Bloodtoil Valley",
            "poiType": 0
          },
          {
            "poiIndex": 16,
            "name": "Wilding Run",
            "poiType": 0
          },
          {
            "poiIndex": 17,
            "name": "Vulkwasten",
            "poiType": 0
          },
          {
            "poiIndex": 18,
            "name": "Fuller's Break",
            "poiType": 0
          },
          {
            "poiIndex": 19,
            "name": "Jode's Pocket",
            "poiType": 0
          },
          {
            "poiIndex": 20,
            "name": "Silvenar",
            "poiType": 0
          },
          {
            "poiIndex": 21,
            "name": "Ilayas Ruins",
            "poiType": 0
          },
          {
            "poiIndex": 22,
            "name": "Abamath",
            "poiType": 0
          },
          {
            "poiIndex": 23,
            "name": "Dra'bul",
            "poiType": 0
          },
          {
            "poiIndex": 24,
            "name": "Treehenge",
            "poiType": 0
          },
          {
            "poiIndex": 25,
            "name": "Valeguard",
            "poiType": 0
          },
          {
            "poiIndex": 26,
            "name": "Velyn Harbor",
            "poiType": 0
          },
          {
            "poiIndex": 27,
            "name": "Baandari Trading Post",
            "poiType": 0
          },
          {
            "poiIndex": 28,
            "name": "Deepwoods",
            "poiType": 0
          },
          {
            "poiIndex": 36,
            "name": "Belarata",
            "poiType": 0
          },
          {
            "poiIndex": 51,
            "name": "Tanglehaven",
            "poiType": 0
          },
          {
            "poiIndex": 52,
            "name": "Falinesti Summer Site",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 2,
            "name": "Dra'bul Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 3,
            "name": "Ilayas Ruins Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 4,
            "name": "Velyn Harbor Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 5,
            "name": "Vulkwasten Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 6,
            "name": "Abamath Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 7,
            "name": "Wilding Run Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 8,
            "name": "Baandari Market Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 9,
            "name": "Bloodtoil Valley Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 10,
            "name": "Valeguard Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 11,
            "name": "The Thief",
            "poiType": 2
          },
          {
            "poiIndex": 12,
            "name": "The Ritual",
            "poiType": 2
          },
          {
            "poiIndex": 13,
            "name": "The Warrior",
            "poiType": 2
          },
          {
            "poiIndex": 48,
            "name": "Horseshoe Island",
            "poiType": 2
          },
          {
            "poiIndex": 49,
            "name": "Supplication House",
            "poiType": 2
          },
          {
            "poiIndex": 50,
            "name": "Ogrim's Yawn",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Sleepy Senche Overlook",
            "poiType": 2
          },
          {
            "poiIndex": 54,
            "name": "Stranglewatch",
            "poiType": 2
          },
          {
            "poiIndex": 55,
            "name": "Ragnthar",
            "poiType": 2
          },
          {
            "poiIndex": 56,
            "name": "Chancel of Divine Entreaty",
            "poiType": 2
          },
          {
            "poiIndex": 57,
            "name": "Starwalk Cavern",
            "poiType": 2
          },
          {
            "poiIndex": 58,
            "name": "Matthild's Last Venture",
            "poiType": 2
          },
          {
            "poiIndex": 59,
            "name": "Four Quarry Islet",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 29,
            "name": "Dead Man's Drop",
            "poiType": 3
          },
          {
            "poiIndex": 30,
            "name": "Black Vine Ruins",
            "poiType": 3
          },
          {
            "poiIndex": 31,
            "name": "Roots of Silvenar",
            "poiType": 3
          },
          {
            "poiIndex": 32,
            "name": "Shael Ruins",
            "poiType": 3
          },
          {
            "poiIndex": 34,
            "name": "Hoarvor Pit",
            "poiType": 3
          },
          {
            "poiIndex": 35,
            "name": "Tomb of the Apostates",
            "poiType": 3
          },
          {
            "poiIndex": 42,
            "name": "Bone Grappler's Nest",
            "poiType": 3
          },
          {
            "poiIndex": 43,
            "name": "Bitterpoint Strand",
            "poiType": 3
          },
          {
            "poiIndex": 44,
            "name": "Dugan's Knoll",
            "poiType": 3
          },
          {
            "poiIndex": 45,
            "name": "River Edge",
            "poiType": 3
          },
          {
            "poiIndex": 46,
            "name": "Jagged Grotto",
            "poiType": 3
          },
          {
            "poiIndex": 47,
            "name": "Windshriek Strand",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 38,
            "name": "Broken Coast Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 39,
            "name": "Xylo River Basin Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 40,
            "name": "Silvenar Vale Dolmen",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 37,
            "name": "Crimson Cove",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 41,
            "name": "Dungeon: Tempest Island",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 60,
            "name": "Black Vine Villa",
            "poiType": 7
          },
          {
            "poiIndex": 61,
            "name": "Cyrodilic Jungle House",
            "poiType": 7
          },
          {
            "poiIndex": 62,
            "name": "Doomchar Plateau",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 726,
    "name": "Murkmire",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 2,
            "name": "Bright-Throat Village",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Dead-Water Village",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 5,
            "name": "Lilmoth Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 6,
            "name": "Bright-Throat Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 7,
            "name": "Dead-Water Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 15,
            "name": "Root-Whisper Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 23,
            "name": "Blackrose Prison Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Lilmoth",
            "poiType": 2
          },
          {
            "poiIndex": 4,
            "name": "Alten Meerhleel",
            "poiType": 2
          },
          {
            "poiIndex": 13,
            "name": "The Dominus Fatum",
            "poiType": 2
          },
          {
            "poiIndex": 14,
            "name": "Ruined Guardhouse",
            "poiType": 2
          },
          {
            "poiIndex": 16,
            "name": "Root-Whisper Village",
            "poiType": 2
          },
          {
            "poiIndex": 17,
            "name": "Ruined Village",
            "poiType": 2
          },
          {
            "poiIndex": 18,
            "name": "Deep Swamp Forge",
            "poiType": 2
          },
          {
            "poiIndex": 19,
            "name": "Sweet Breeze Overlook",
            "poiType": 2
          },
          {
            "poiIndex": 20,
            "name": "Xinchei-Konu Monument",
            "poiType": 2
          },
          {
            "poiIndex": 22,
            "name": "Path of the Lily",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 9,
            "name": "Echoing Hollow",
            "poiType": 3
          },
          {
            "poiIndex": 10,
            "name": "Bok-Xul",
            "poiType": 3
          },
          {
            "poiIndex": 11,
            "name": "Tsofeer Cavern",
            "poiType": 3
          },
          {
            "poiIndex": 12,
            "name": "Teeth of Sithis",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 8,
            "name": "Arena: Blackrose Prison",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 24,
            "name": "Lakemire Xanmeer Manor",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1086,
    "name": "Northern Elsweyr",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 15,
            "name": "Riverhold",
            "poiType": 0
          },
          {
            "poiIndex": 17,
            "name": "Hakoshae",
            "poiType": 0
          },
          {
            "poiIndex": 18,
            "name": "The Prowl",
            "poiType": 0
          },
          {
            "poiIndex": 19,
            "name": "Anequina Aqueduct",
            "poiType": 0
          },
          {
            "poiIndex": 20,
            "name": "Weeping Scar",
            "poiType": 0
          },
          {
            "poiIndex": 21,
            "name": "Cicatrice",
            "poiType": 0
          },
          {
            "poiIndex": 22,
            "name": "Ashen Scar",
            "poiType": 0
          },
          {
            "poiIndex": 23,
            "name": "The Stitches",
            "poiType": 0
          },
          {
            "poiIndex": 24,
            "name": "Two Moons at Tenmar Temple",
            "poiType": 0
          },
          {
            "poiIndex": 25,
            "name": "Merryvale Farms",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 38,
            "name": "Riverhold Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 39,
            "name": "Rimmen Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 40,
            "name": "The Stitches Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 41,
            "name": "Tenmar Temple Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 43,
            "name": "Scar's End Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 44,
            "name": "Hakoshae Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 52,
            "name": "Star Haven Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 16,
            "name": "Rimmen",
            "poiType": 2
          },
          {
            "poiIndex": 26,
            "name": "Starlight Adeptorium",
            "poiType": 2
          },
          {
            "poiIndex": 27,
            "name": "Valenwood Border Artisan Camp",
            "poiType": 2
          },
          {
            "poiIndex": 28,
            "name": "Rimmen Masterworks",
            "poiType": 2
          },
          {
            "poiIndex": 32,
            "name": "Star Haven Adeptorium",
            "poiType": 2
          },
          {
            "poiIndex": 33,
            "name": "Shadow Dance Ruins",
            "poiType": 2
          },
          {
            "poiIndex": 34,
            "name": "Moon Gate of Anequina",
            "poiType": 2
          },
          {
            "poiIndex": 35,
            "name": "Sleepy Senche Mine",
            "poiType": 2
          },
          {
            "poiIndex": 36,
            "name": "Defense Force Outpost",
            "poiType": 2
          },
          {
            "poiIndex": 37,
            "name": "Sandswirl Manor",
            "poiType": 2
          },
          {
            "poiIndex": 46,
            "name": "Valenwood Gate",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 1,
            "name": "The Bone Pit",
            "poiType": 3
          },
          {
            "poiIndex": 2,
            "name": "Scar's Edge",
            "poiType": 3
          },
          {
            "poiIndex": 3,
            "name": "Red Hands Run",
            "poiType": 3
          },
          {
            "poiIndex": 4,
            "name": "Hill of Shattered Swords",
            "poiType": 3
          },
          {
            "poiIndex": 5,
            "name": "Talon Gulch",
            "poiType": 3
          },
          {
            "poiIndex": 6,
            "name": "Nightmare Plateau",
            "poiType": 3
          },
          {
            "poiIndex": 7,
            "name": "Abode of Ignominy",
            "poiType": 3
          },
          {
            "poiIndex": 8,
            "name": "Predator Mesa",
            "poiType": 3
          },
          {
            "poiIndex": 10,
            "name": "Tomb of the Serpents",
            "poiType": 3
          },
          {
            "poiIndex": 11,
            "name": "Darkpool Mine",
            "poiType": 3
          },
          {
            "poiIndex": 12,
            "name": "The Tangle",
            "poiType": 3
          },
          {
            "poiIndex": 45,
            "name": "Desert Wind Caverns",
            "poiType": 3
          },
          {
            "poiIndex": 47,
            "name": "Trial: Sunspire",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 13,
            "name": "Rimmen Necropolis",
            "poiType": 5
          },
          {
            "poiIndex": 14,
            "name": "Orcrest",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 48,
            "name": "Dungeon: Moongrave Fane",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 49,
            "name": "Sugar Bowl Suite",
            "poiType": 7
          },
          {
            "poiIndex": 50,
            "name": "Jode's Embrace",
            "poiType": 7
          },
          {
            "poiIndex": 51,
            "name": "Hall of the Lunar Champion",
            "poiType": 7
          },
          {
            "poiIndex": 53,
            "name": "Moon-Sugar Meadow",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 382,
    "name": "Reaper's March",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Thormar",
            "poiType": 0
          },
          {
            "poiIndex": 2,
            "name": "Fort Grimwatch",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Moonmont",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Vinedusk Village",
            "poiType": 0
          },
          {
            "poiIndex": 5,
            "name": "Senalana",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "Falinesti Autumn Site",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "S'ren-ja",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Do'Krin Monastery",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Dune",
            "poiType": 0
          },
          {
            "poiIndex": 10,
            "name": "Hadran's Caravan",
            "poiType": 0
          },
          {
            "poiIndex": 11,
            "name": "Greenhill",
            "poiType": 0
          },
          {
            "poiIndex": 12,
            "name": "Pa'alat",
            "poiType": 0
          },
          {
            "poiIndex": 13,
            "name": "Arenthia",
            "poiType": 0
          },
          {
            "poiIndex": 14,
            "name": "Thizzrini Arena",
            "poiType": 0
          },
          {
            "poiIndex": 21,
            "name": "Two Moons Path",
            "poiType": 0
          },
          {
            "poiIndex": 22,
            "name": "Willowgrove",
            "poiType": 0
          },
          {
            "poiIndex": 33,
            "name": "Rawl'kha",
            "poiType": 0
          },
          {
            "poiIndex": 40,
            "name": "Fort Sphinxmoth",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 30,
            "name": "Vinedusk Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 31,
            "name": "Fort Grimwatch Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 32,
            "name": "Fort Sphinxmoth Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 34,
            "name": "Arenthia Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 35,
            "name": "Dune Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 36,
            "name": "Willowgrove Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 37,
            "name": "Moonmont Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 38,
            "name": "Rawl'kha Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 39,
            "name": "S'ren-ja Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 27,
            "name": "The Steed",
            "poiType": 2
          },
          {
            "poiIndex": 28,
            "name": "The Apprentice",
            "poiType": 2
          },
          {
            "poiIndex": 47,
            "name": "Willowgrove Cavern",
            "poiType": 2
          },
          {
            "poiIndex": 48,
            "name": "Old Town Cavern",
            "poiType": 2
          },
          {
            "poiIndex": 49,
            "name": "Researcher's Camp",
            "poiType": 2
          },
          {
            "poiIndex": 50,
            "name": "Crescent River Camp",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Broken Arch",
            "poiType": 2
          },
          {
            "poiIndex": 52,
            "name": "Greenspeaker's Grove",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Dawnmead Brigand Camp",
            "poiType": 2
          },
          {
            "poiIndex": 54,
            "name": "Little Ozur's Camp",
            "poiType": 2
          },
          {
            "poiIndex": 55,
            "name": "Fishing Dock",
            "poiType": 2
          },
          {
            "poiIndex": 56,
            "name": "Dawnmead Ruin Camp",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 15,
            "name": "Kuna's Delve",
            "poiType": 3
          },
          {
            "poiIndex": 16,
            "name": "Thibaut's Cairn",
            "poiType": 3
          },
          {
            "poiIndex": 17,
            "name": "Weeping Wind Cave",
            "poiType": 3
          },
          {
            "poiIndex": 18,
            "name": "Claw's Strike",
            "poiType": 3
          },
          {
            "poiIndex": 19,
            "name": "Fardir's Folly",
            "poiType": 3
          },
          {
            "poiIndex": 20,
            "name": "Jode's Light",
            "poiType": 3
          },
          {
            "poiIndex": 41,
            "name": "Deathsong Cleft",
            "poiType": 3
          },
          {
            "poiIndex": 42,
            "name": "Big Ozur's Valley",
            "poiType": 3
          },
          {
            "poiIndex": 43,
            "name": "Waterdancer Falls",
            "poiType": 3
          },
          {
            "poiIndex": 44,
            "name": "Reaper's Henge",
            "poiType": 3
          },
          {
            "poiIndex": 45,
            "name": "Old S'ren-ja Docks",
            "poiType": 3
          },
          {
            "poiIndex": 46,
            "name": "Ushmal's Rest",
            "poiType": 3
          },
          {
            "poiIndex": 57,
            "name": "Trial: Maw of Lorkhaj",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 24,
            "name": "Northern Woods Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 25,
            "name": "Jodewood Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 26,
            "name": "Dawnmead Dolmen",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 23,
            "name": "The Vile Manse",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 29,
            "name": "Dungeon: Selene's Web",
            "poiType": 6
          },
          {
            "poiIndex": 62,
            "name": "Dungeon: Moon Hunter Keep",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 58,
            "name": "Serenity Falls Estate",
            "poiType": 7
          },
          {
            "poiIndex": 59,
            "name": "Strident Springs Demesne",
            "poiType": 7
          },
          {
            "poiIndex": 60,
            "name": "Dawnshadow",
            "poiType": 7
          },
          {
            "poiIndex": 61,
            "name": "Sleek Creek House",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 20,
    "name": "Rivenspire",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Hinault Farm",
            "poiType": 0
          },
          {
            "poiIndex": 2,
            "name": "Moira's Hope",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Silverhoof Vale",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Northpoint",
            "poiType": 0
          },
          {
            "poiIndex": 5,
            "name": "Crestshade",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "Camp Tamrith",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Fell's Run",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Traitor's Tor",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Sanguine Barrows",
            "poiType": 0
          },
          {
            "poiIndex": 10,
            "name": "Shornhelm",
            "poiType": 0
          },
          {
            "poiIndex": 11,
            "name": "Edrald Estate",
            "poiType": 0
          },
          {
            "poiIndex": 12,
            "name": "Breagha-Fin",
            "poiType": 0
          },
          {
            "poiIndex": 13,
            "name": "Ravenwatch Castle",
            "poiType": 0
          },
          {
            "poiIndex": 14,
            "name": "The Doomcrag",
            "poiType": 0
          },
          {
            "poiIndex": 15,
            "name": "Lorkrata Hills",
            "poiType": 0
          },
          {
            "poiIndex": 21,
            "name": "Hoarfrost Downs",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 18,
            "name": "Oldgate Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 19,
            "name": "Crestshade Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 20,
            "name": "Camp Tamrith Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 22,
            "name": "Boralis Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 23,
            "name": "Staging Grounds Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 24,
            "name": "Northpoint Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 25,
            "name": "Fell's Run Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 26,
            "name": "Hoarfrost Downs Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 27,
            "name": "Shornhelm Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 37,
            "name": "Sanguine Barrows Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 41,
            "name": "Shrouded Pass Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 28,
            "name": "The Atronach",
            "poiType": 2
          },
          {
            "poiIndex": 29,
            "name": "The Shadow",
            "poiType": 2
          },
          {
            "poiIndex": 30,
            "name": "The Serpent",
            "poiType": 2
          },
          {
            "poiIndex": 48,
            "name": "Shadowfate Cavern",
            "poiType": 2
          },
          {
            "poiIndex": 49,
            "name": "Old Fell's Fort",
            "poiType": 2
          },
          {
            "poiIndex": 50,
            "name": "Lagra's Pearl",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Northsalt Village",
            "poiType": 2
          },
          {
            "poiIndex": 52,
            "name": "Veawend Ede",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Westwind Lighthouse",
            "poiType": 2
          },
          {
            "poiIndex": 54,
            "name": "Dorell Farmhouse",
            "poiType": 2
          },
          {
            "poiIndex": 55,
            "name": "Southgard Tower",
            "poiType": 2
          },
          {
            "poiIndex": 56,
            "name": "Old Shornhelm Ruins",
            "poiType": 2
          },
          {
            "poiIndex": 57,
            "name": "Trader's Rest",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 31,
            "name": "Crestshade Mine",
            "poiType": 3
          },
          {
            "poiIndex": 32,
            "name": "Flyleaf Catacombs",
            "poiType": 3
          },
          {
            "poiIndex": 33,
            "name": "Tribulation Crypt",
            "poiType": 3
          },
          {
            "poiIndex": 34,
            "name": "Orc's Finger Ruins",
            "poiType": 3
          },
          {
            "poiIndex": 35,
            "name": "Erokii Ruins",
            "poiType": 3
          },
          {
            "poiIndex": 36,
            "name": "Hildune's Secret Refuge",
            "poiType": 3
          },
          {
            "poiIndex": 42,
            "name": "Aesar's Web",
            "poiType": 3
          },
          {
            "poiIndex": 43,
            "name": "Valeguard Tower",
            "poiType": 3
          },
          {
            "poiIndex": 44,
            "name": "Old Kalgon's Keep",
            "poiType": 3
          },
          {
            "poiIndex": 45,
            "name": "Magdelena's Haunt",
            "poiType": 3
          },
          {
            "poiIndex": 46,
            "name": "East-Rock Landing",
            "poiType": 3
          },
          {
            "poiIndex": 47,
            "name": "Siren's Cove",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 38,
            "name": "Eyebright Feld Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 39,
            "name": "Westmark Moor Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 40,
            "name": "Boralis Dolmen",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 16,
            "name": "Obsidian Scar",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 17,
            "name": "Dungeon: Crypt of Hearts I",
            "poiType": 6
          },
          {
            "poiIndex": 58,
            "name": "Dungeon: Crypt of Hearts II",
            "poiType": 6
          },
          {
            "poiIndex": 61,
            "name": "Dungeon: Shipwright's Regret",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 59,
            "name": "Ravenhurst",
            "poiType": 7
          },
          {
            "poiIndex": 60,
            "name": "Wraithhome",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 117,
    "name": "Shadowfen",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Alten Corimont",
            "poiType": 0
          },
          {
            "poiIndex": 2,
            "name": "Stormhold",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Stillrise Village",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Zuuk",
            "poiType": 0
          },
          {
            "poiIndex": 5,
            "name": "Hissmir",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "Xal Ithix",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Deep Graves",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Ten-Maur-Wolk",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Murkwater",
            "poiType": 0
          },
          {
            "poiIndex": 11,
            "name": "Bogmother",
            "poiType": 0
          },
          {
            "poiIndex": 12,
            "name": "Forsaken Hamlet",
            "poiType": 0
          },
          {
            "poiIndex": 13,
            "name": "Hatching Pools",
            "poiType": 0
          },
          {
            "poiIndex": 14,
            "name": "Sunscale Strand",
            "poiType": 0
          },
          {
            "poiIndex": 15,
            "name": "Mud Tree Village",
            "poiType": 0
          },
          {
            "poiIndex": 16,
            "name": "Percolating Mire",
            "poiType": 0
          },
          {
            "poiIndex": 25,
            "name": "White Rose Prison",
            "poiType": 0
          },
          {
            "poiIndex": 32,
            "name": "Loriasel",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 20,
            "name": "Stillrise Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 21,
            "name": "Stormhold Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 22,
            "name": "Hatching Pools Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 23,
            "name": "Bogmother Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 24,
            "name": "Alten Corimont Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 26,
            "name": "Percolating Mire Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 27,
            "name": "Hissmir Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 28,
            "name": "Loriasel Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 30,
            "name": "Venomous Fens Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 31,
            "name": "Forsaken Hamlet Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 17,
            "name": "The Atronach",
            "poiType": 2
          },
          {
            "poiIndex": 18,
            "name": "The Shadow",
            "poiType": 2
          },
          {
            "poiIndex": 19,
            "name": "The Serpent",
            "poiType": 2
          },
          {
            "poiIndex": 50,
            "name": "Xal Haj-Ei Shrine",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Camp Silken Snare",
            "poiType": 2
          },
          {
            "poiIndex": 52,
            "name": "The Vile Pavilion",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Camp Merciful Reduction",
            "poiType": 2
          },
          {
            "poiIndex": 54,
            "name": "Tsonashap Mine",
            "poiType": 2
          },
          {
            "poiIndex": 55,
            "name": "The Graceful Dominator",
            "poiType": 2
          },
          {
            "poiIndex": 56,
            "name": "Camp Crystal Abattoir",
            "poiType": 2
          },
          {
            "poiIndex": 57,
            "name": "Hatchling's Crown",
            "poiType": 2
          },
          {
            "poiIndex": 58,
            "name": "Telvanni Acquisition Camp",
            "poiType": 2
          },
          {
            "poiIndex": 59,
            "name": "Weeping Wamasu Falls",
            "poiType": 2
          },
          {
            "poiIndex": 60,
            "name": "Hei-Halai",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 33,
            "name": "Shrine of the Black Maw",
            "poiType": 3
          },
          {
            "poiIndex": 34,
            "name": "Broken Tusk",
            "poiType": 3
          },
          {
            "poiIndex": 35,
            "name": "Atanaz Ruins",
            "poiType": 3
          },
          {
            "poiIndex": 36,
            "name": "Onkobra Kwama Mine",
            "poiType": 3
          },
          {
            "poiIndex": 37,
            "name": "Chid-Moska Ruins",
            "poiType": 3
          },
          {
            "poiIndex": 38,
            "name": "Gandranen Ruins",
            "poiType": 3
          },
          {
            "poiIndex": 44,
            "name": "Haynekhtnamet's Lair",
            "poiType": 3
          },
          {
            "poiIndex": 45,
            "name": "Captain Bones' Ship",
            "poiType": 3
          },
          {
            "poiIndex": 46,
            "name": "Bitterroot Cave",
            "poiType": 3
          },
          {
            "poiIndex": 47,
            "name": "Nen Ria",
            "poiType": 3
          },
          {
            "poiIndex": 48,
            "name": "Xal Thak",
            "poiType": 3
          },
          {
            "poiIndex": 49,
            "name": "Slaver Camp",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 41,
            "name": "Reticulated Spine Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 42,
            "name": "Leafwater Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 43,
            "name": "Venomous Fens Dolmen",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 40,
            "name": "Sanguine's Demesne",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 39,
            "name": "Dungeon: Arx Corinium",
            "poiType": 6
          },
          {
            "poiIndex": 61,
            "name": "Dungeon: Cradle of Shadows",
            "poiType": 6
          },
          {
            "poiIndex": 62,
            "name": "Dungeon: Ruins of Mazzatun",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 63,
            "name": "Stay-Moist Mansion",
            "poiType": 7
          },
          {
            "poiIndex": 64,
            "name": "The Ample Domicile",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1502,
    "name": "Solstice",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 8,
            "name": "Broken Light Temple",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Shor's Stand",
            "poiType": 0
          },
          {
            "poiIndex": 10,
            "name": "Corelanya Manor",
            "poiType": 0
          },
          {
            "poiIndex": 11,
            "name": "Everlasting Fair",
            "poiType": 0
          },
          {
            "poiIndex": 12,
            "name": "Shell-Tide Village",
            "poiType": 0
          },
          {
            "poiIndex": 23,
            "name": "Caterwaul Cove",
            "poiType": 0
          },
          {
            "poiIndex": 24,
            "name": "Ashbound Hall",
            "poiType": 0
          },
          {
            "poiIndex": 25,
            "name": "Aldwilne Citadel",
            "poiType": 0
          },
          {
            "poiIndex": 27,
            "name": "Xor-Hist",
            "poiType": 0
          },
          {
            "poiIndex": 73,
            "name": "Sunport Rampart Camp",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 44,
            "name": "Sunport Docks Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 45,
            "name": "Western Bay Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 46,
            "name": "Shor's Stand Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 47,
            "name": "Vale of Revelry Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 48,
            "name": "Corelanya Manor Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 49,
            "name": "Shell-Tide Village Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 50,
            "name": "Sunport Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 65,
            "name": "Gristmung Hold Camp Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 66,
            "name": "Mor Naril Camp Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 68,
            "name": "Xor-Hist Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 69,
            "name": "Caterwaul Cove Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 70,
            "name": "Grand Juncture Pass Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 71,
            "name": "Stone Cove Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 81,
            "name": "Rampart Camp Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Sunport",
            "poiType": 2
          },
          {
            "poiIndex": 2,
            "name": "Warm-Stone Village",
            "poiType": 2
          },
          {
            "poiIndex": 4,
            "name": "Li-Xal Pass",
            "poiType": 2
          },
          {
            "poiIndex": 5,
            "name": "Tarnur Mine",
            "poiType": 2
          },
          {
            "poiIndex": 6,
            "name": "Vosgah Shrine",
            "poiType": 2
          },
          {
            "poiIndex": 33,
            "name": "Gristmung Hold",
            "poiType": 2
          },
          {
            "poiIndex": 38,
            "name": "Xul-Haj",
            "poiType": 2
          },
          {
            "poiIndex": 39,
            "name": "The Gates of Mor Naril",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Tide-Born Foundry",
            "poiType": 2
          },
          {
            "poiIndex": 52,
            "name": "Swencoast Cottage",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Tidal Fishing Camp",
            "poiType": 2
          },
          {
            "poiIndex": 54,
            "name": "Xi-Tak Ruins",
            "poiType": 2
          },
          {
            "poiIndex": 55,
            "name": "Sanguine Islet",
            "poiType": 2
          },
          {
            "poiIndex": 74,
            "name": "Salt-Air Station",
            "poiType": 2
          },
          {
            "poiIndex": 75,
            "name": "Fellowship Forge",
            "poiType": 2
          },
          {
            "poiIndex": 76,
            "name": "Coldharbour's Shattered Jaws",
            "poiType": 2
          },
          {
            "poiIndex": 77,
            "name": "Leviathan's End",
            "poiType": 2
          },
          {
            "poiIndex": 78,
            "name": "Bismuth Grotto",
            "poiType": 2
          },
          {
            "poiIndex": 79,
            "name": "Xaht Jeel Pier",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 14,
            "name": "Carapace Cavern",
            "poiType": 3
          },
          {
            "poiIndex": 15,
            "name": "Tainted Leel",
            "poiType": 3
          },
          {
            "poiIndex": 16,
            "name": "Vale of Revelry",
            "poiType": 3
          },
          {
            "poiIndex": 17,
            "name": "Shrine of Vakkan",
            "poiType": 3
          },
          {
            "poiIndex": 18,
            "name": "Ruins of Tuniria",
            "poiType": 3
          },
          {
            "poiIndex": 19,
            "name": "Tidewash Strand",
            "poiType": 3
          },
          {
            "poiIndex": 20,
            "name": "Soulcaller's Haunt",
            "poiType": 3
          },
          {
            "poiIndex": 21,
            "name": "Lair of Wo-Xeeth",
            "poiType": 3
          },
          {
            "poiIndex": 22,
            "name": "Zyv-Elehk Ritual Site",
            "poiType": 3
          },
          {
            "poiIndex": 29,
            "name": "Lair of the Black Worm",
            "poiType": 3
          },
          {
            "poiIndex": 30,
            "name": "Sea and Sword Lodge",
            "poiType": 3
          },
          {
            "poiIndex": 31,
            "name": "Xul-Katama",
            "poiType": 3
          },
          {
            "poiIndex": 43,
            "name": "Trial: Ossein Cage",
            "poiType": 3
          },
          {
            "poiIndex": 72,
            "name": "Ghishzor",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 58,
            "name": "North Siege Camp",
            "poiType": 4
          },
          {
            "poiIndex": 59,
            "name": "Sunport Siege Camp",
            "poiType": 4
          },
          {
            "poiIndex": 60,
            "name": "Central Siege Camp",
            "poiType": 4
          },
          {
            "poiIndex": 61,
            "name": "Warm-Stone Siege Camp",
            "poiType": 4
          },
          {
            "poiIndex": 62,
            "name": "South Siege Camp",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 13,
            "name": "Deetra Grotto",
            "poiType": 5
          },
          {
            "poiIndex": 28,
            "name": "Calindvale Gardens",
            "poiType": 5
          },
          {
            "poiIndex": 83,
            "name": "Writhing Fortress",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 63,
            "name": "Dungeon: Naj-Caldeesh",
            "poiType": 6
          },
          {
            "poiIndex": 64,
            "name": "Dungeon: Black Gem Foundry",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 56,
            "name": "The Sleepy Sloth",
            "poiType": 7
          },
          {
            "poiIndex": 57,
            "name": "Bismuth Steam Baths",
            "poiType": 7
          },
          {
            "poiIndex": 80,
            "name": "Cradle of the Worm Colossus",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1133,
    "name": "Southern Elsweyr",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 7,
            "name": "South Guard Ruins",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Black Heights",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Senchal Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 2,
            "name": "South Guard Ruins Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 3,
            "name": "Western Plains Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 4,
            "name": "Black Heights Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 5,
            "name": "Pridehome Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 6,
            "name": "Senchal",
            "poiType": 2
          },
          {
            "poiIndex": 11,
            "name": "Fur-Forge Cove",
            "poiType": 2
          },
          {
            "poiIndex": 12,
            "name": "Cat's-Claw Station",
            "poiType": 2
          },
          {
            "poiIndex": 16,
            "name": "Zazaradi's Quarry and Mine",
            "poiType": 2
          },
          {
            "poiIndex": 17,
            "name": "Pridehome",
            "poiType": 2
          },
          {
            "poiIndex": 18,
            "name": "Doomstone Keep",
            "poiType": 2
          },
          {
            "poiIndex": 19,
            "name": "The Forgotten Mane",
            "poiType": 2
          },
          {
            "poiIndex": 21,
            "name": "Purring Rock",
            "poiType": 2
          },
          {
            "poiIndex": 22,
            "name": "Khenarthi's Arch",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 9,
            "name": "Moonlit Cove",
            "poiType": 3
          },
          {
            "poiIndex": 10,
            "name": "Forsaken Citadel",
            "poiType": 3
          },
          {
            "poiIndex": 14,
            "name": "Shrine of the Reforged",
            "poiType": 3
          },
          {
            "poiIndex": 15,
            "name": "Ri'Atahrashi's Training Ground",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 23,
            "name": "Lucky Cat Landing",
            "poiType": 7
          },
          {
            "poiIndex": 24,
            "name": "Potentate's Retreat",
            "poiType": 7
          },
          {
            "poiIndex": 25,
            "name": "Zhan Khaj Crest",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 41,
    "name": "Stonefalls",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Fort Arand",
            "poiType": 0
          },
          {
            "poiIndex": 2,
            "name": "Vivec's Antlers",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Starved Plain",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Davon's Watch",
            "poiType": 0
          },
          {
            "poiIndex": 5,
            "name": "Hrogar's Hold",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "Othrenis",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Sathram Plantation",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Brothers of Strife",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Heimlyn Keep",
            "poiType": 0
          },
          {
            "poiIndex": 10,
            "name": "Kragenmoor",
            "poiType": 0
          },
          {
            "poiIndex": 11,
            "name": "Lukiul Uxith",
            "poiType": 0
          },
          {
            "poiIndex": 12,
            "name": "Senie",
            "poiType": 0
          },
          {
            "poiIndex": 13,
            "name": "Sulfur Pools",
            "poiType": 0
          },
          {
            "poiIndex": 14,
            "name": "Iliath Temple",
            "poiType": 0
          },
          {
            "poiIndex": 15,
            "name": "Ebonheart",
            "poiType": 0
          },
          {
            "poiIndex": 16,
            "name": "Tormented Spire",
            "poiType": 0
          },
          {
            "poiIndex": 17,
            "name": "Ash Mountain",
            "poiType": 0
          },
          {
            "poiIndex": 19,
            "name": "Fort Virak",
            "poiType": 0
          },
          {
            "poiIndex": 71,
            "name": "Shrine of Hircine",
            "poiType": 0
          },
          {
            "poiIndex": 72,
            "name": "Shrine of Lamae Bal",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 20,
            "name": "Davon's Watch Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 21,
            "name": "Othrenis Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 22,
            "name": "Fort Arand Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 23,
            "name": "Ebonheart Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 24,
            "name": "Vivec's Antlers Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 25,
            "name": "Brothers of Strife Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 26,
            "name": "Hrogar's Hold Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 27,
            "name": "Fort Virak Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 28,
            "name": "Iliath Temple Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 29,
            "name": "Sathram Plantation Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 30,
            "name": "Kragenmoor Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 31,
            "name": "Ashen Road Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 39,
            "name": "Sulfur Pools Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 40,
            "name": "Senie Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 46,
            "name": "The Harborage",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 32,
            "name": "The Lady",
            "poiType": 2
          },
          {
            "poiIndex": 33,
            "name": "The Lover",
            "poiType": 2
          },
          {
            "poiIndex": 52,
            "name": "Still-Water's Camp",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Strifeswarm Kwama Mine",
            "poiType": 2
          },
          {
            "poiIndex": 54,
            "name": "Armature's Upheaval",
            "poiType": 2
          },
          {
            "poiIndex": 55,
            "name": "Stonefang Isle",
            "poiType": 2
          },
          {
            "poiIndex": 56,
            "name": "Steamfont Cavern",
            "poiType": 2
          },
          {
            "poiIndex": 57,
            "name": "Dagger's Point Invasion Camp",
            "poiType": 2
          },
          {
            "poiIndex": 58,
            "name": "Davenas Farm",
            "poiType": 2
          },
          {
            "poiIndex": 59,
            "name": "Magmaflow Overlook",
            "poiType": 2
          },
          {
            "poiIndex": 60,
            "name": "Greymist Falls",
            "poiType": 2
          },
          {
            "poiIndex": 61,
            "name": "Steamlake Encampment",
            "poiType": 2
          },
          {
            "poiIndex": 73,
            "name": "Freerunner's Post Board",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 35,
            "name": "Inner Sea Armature",
            "poiType": 3
          },
          {
            "poiIndex": 36,
            "name": "Mephala's Nest",
            "poiType": 3
          },
          {
            "poiIndex": 37,
            "name": "Softloam Cavern",
            "poiType": 3
          },
          {
            "poiIndex": 38,
            "name": "Emberflint Mine",
            "poiType": 3
          },
          {
            "poiIndex": 41,
            "name": "Hightide Hollow",
            "poiType": 3
          },
          {
            "poiIndex": 42,
            "name": "Sheogorath's Tongue",
            "poiType": 3
          },
          {
            "poiIndex": 47,
            "name": "Strifeswarm Hive",
            "poiType": 3
          },
          {
            "poiIndex": 48,
            "name": "The Matron's Clutch",
            "poiType": 3
          },
          {
            "poiIndex": 49,
            "name": "Shivering Shrine",
            "poiType": 3
          },
          {
            "poiIndex": 50,
            "name": "Cave of Memories",
            "poiType": 3
          },
          {
            "poiIndex": 51,
            "name": "Shipwreck Strand",
            "poiType": 3
          },
          {
            "poiIndex": 62,
            "name": "The Brahma's Grove",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 43,
            "name": "Daen Seeth Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 44,
            "name": "Zabamat Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 45,
            "name": "Varanis Dolmen",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 18,
            "name": "Crow's Wood",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 34,
            "name": "Dungeon: Fungal Grotto I",
            "poiType": 6
          },
          {
            "poiIndex": 66,
            "name": "Dungeon: Fungal Grotto II",
            "poiType": 6
          },
          {
            "poiIndex": 70,
            "name": "Dungeon: Bal Sunnar",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 67,
            "name": "Kragenhome",
            "poiType": 7
          },
          {
            "poiIndex": 68,
            "name": "The Ebony Flask Inn Room",
            "poiType": 7
          },
          {
            "poiIndex": 69,
            "name": "Ebonheart Chateau",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 19,
    "name": "Stormhaven",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Aphren's Hold",
            "poiType": 0
          },
          {
            "poiIndex": 2,
            "name": "Shinji's Scarp",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Dro-Dara Plantation",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Soulshriven Tower",
            "poiType": 0
          },
          {
            "poiIndex": 5,
            "name": "Farangel's Landing",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "Pariah Abbey",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Wind Keep",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Dreughside",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Cumberland's Watch",
            "poiType": 0
          },
          {
            "poiIndex": 10,
            "name": "at-Tura Estate",
            "poiType": 0
          },
          {
            "poiIndex": 11,
            "name": "Koeglin Lighthouse",
            "poiType": 0
          },
          {
            "poiIndex": 12,
            "name": "Steelheart Moorings",
            "poiType": 0
          },
          {
            "poiIndex": 13,
            "name": "Firebrand Keep",
            "poiType": 0
          },
          {
            "poiIndex": 14,
            "name": "Moonlit Maw",
            "poiType": 0
          },
          {
            "poiIndex": 15,
            "name": "Nurin Farm",
            "poiType": 0
          },
          {
            "poiIndex": 16,
            "name": "Vanne Farm",
            "poiType": 0
          },
          {
            "poiIndex": 17,
            "name": "Alcaire Keep",
            "poiType": 0
          },
          {
            "poiIndex": 18,
            "name": "Koeglin Village",
            "poiType": 0
          },
          {
            "poiIndex": 19,
            "name": "Windridge Cave",
            "poiType": 0
          },
          {
            "poiIndex": 60,
            "name": "Weeping Giant",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 22,
            "name": "Koeglin Village Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 23,
            "name": "Alcaire Castle Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 24,
            "name": "Firebrand Keep Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 25,
            "name": "Wind Keep Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 26,
            "name": "Dro-Dara Plantation Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 27,
            "name": "Soulshriven Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 28,
            "name": "Pariah Abbey Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 35,
            "name": "Weeping Giant Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 42,
            "name": "Wayrest Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 43,
            "name": "Bonesnap Ruins Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 36,
            "name": "The Tower",
            "poiType": 2
          },
          {
            "poiIndex": 37,
            "name": "The Mage",
            "poiType": 2
          },
          {
            "poiIndex": 38,
            "name": "The Lord",
            "poiType": 2
          },
          {
            "poiIndex": 50,
            "name": "Supernal Dreamers Camp",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Nightmare Crag",
            "poiType": 2
          },
          {
            "poiIndex": 52,
            "name": "Cave of Dreams",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Shrine to Azura",
            "poiType": 2
          },
          {
            "poiIndex": 54,
            "name": "Cumberland Falls",
            "poiType": 2
          },
          {
            "poiIndex": 55,
            "name": "Stonechewer Goblin Camp",
            "poiType": 2
          },
          {
            "poiIndex": 56,
            "name": "Hammerdeath Workshop",
            "poiType": 2
          },
          {
            "poiIndex": 57,
            "name": "Fisherman's Island",
            "poiType": 2
          },
          {
            "poiIndex": 58,
            "name": "Travelers' Rest",
            "poiType": 2
          },
          {
            "poiIndex": 59,
            "name": "Windridge Warehouse",
            "poiType": 2
          },
          {
            "poiIndex": 61,
            "name": "Friendship Gate",
            "poiType": 2
          },
          {
            "poiIndex": 63,
            "name": "Hammerdeath Arena",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 29,
            "name": "Portdun Watch",
            "poiType": 3
          },
          {
            "poiIndex": 30,
            "name": "Koeglin Mine",
            "poiType": 3
          },
          {
            "poiIndex": 31,
            "name": "Pariah Catacombs",
            "poiType": 3
          },
          {
            "poiIndex": 32,
            "name": "Farangel's Delve",
            "poiType": 3
          },
          {
            "poiIndex": 33,
            "name": "Bearclaw Mine",
            "poiType": 3
          },
          {
            "poiIndex": 34,
            "name": "Norvulk Ruins",
            "poiType": 3
          },
          {
            "poiIndex": 44,
            "name": "Spider Nest",
            "poiType": 3
          },
          {
            "poiIndex": 45,
            "name": "Mudcrab Beach",
            "poiType": 3
          },
          {
            "poiIndex": 46,
            "name": "Dreugh Waters",
            "poiType": 3
          },
          {
            "poiIndex": 47,
            "name": "Abandoned Farm",
            "poiType": 3
          },
          {
            "poiIndex": 48,
            "name": "Scrag's Larder",
            "poiType": 3
          },
          {
            "poiIndex": 49,
            "name": "Ancient Altar",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 39,
            "name": "Gavaudon Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 40,
            "name": "Alcaire Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 41,
            "name": "Menevia Dolmen",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 21,
            "name": "Bonesnap Ruins",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 20,
            "name": "Dungeon: Wayrest Sewers I",
            "poiType": 6
          },
          {
            "poiIndex": 62,
            "name": "Dungeon: Wayrest Sewers II",
            "poiType": 6
          },
          {
            "poiIndex": 66,
            "name": "Dungeon: Scalecaller Peak",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 64,
            "name": "Gardner House",
            "poiType": 7
          },
          {
            "poiIndex": 65,
            "name": "Hammerdeath Bungalow",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 534,
    "name": "Stros M'Kai",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Saintsport",
            "poiType": 0
          },
          {
            "poiIndex": 2,
            "name": "Bthzark",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Port Hunding",
            "poiType": 0
          },
          {
            "poiIndex": 5,
            "name": "The Grave",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 4,
            "name": "Port Hunding Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 6,
            "name": "Sandy Grotto Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 7,
            "name": "Saintsport Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 8,
            "name": "Rash Merchant's Plummet",
            "poiType": 2
          },
          {
            "poiIndex": 9,
            "name": "Dogeater Goblin Camp",
            "poiType": 2
          },
          {
            "poiIndex": 10,
            "name": "Pillar of the Singing Sun",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 11,
            "name": "Hunding's Palatial Hall",
            "poiType": 7
          },
          {
            "poiIndex": 12,
            "name": "Buccaneer Bay",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1011,
    "name": "Summerset",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 8,
            "name": "Shimmerene",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Lillandril",
            "poiType": 0
          },
          {
            "poiIndex": 10,
            "name": "Direnni Acropolis",
            "poiType": 0
          },
          {
            "poiIndex": 11,
            "name": "Russafeld",
            "poiType": 0
          },
          {
            "poiIndex": 12,
            "name": "Sil-Var-Woad",
            "poiType": 0
          },
          {
            "poiIndex": 13,
            "name": "Rellenthil",
            "poiType": 0
          },
          {
            "poiIndex": 14,
            "name": "Cey-Tarn Keep",
            "poiType": 0
          },
          {
            "poiIndex": 15,
            "name": "Ebon Stadmont",
            "poiType": 0
          },
          {
            "poiIndex": 16,
            "name": "Sea Keep",
            "poiType": 0
          },
          {
            "poiIndex": 17,
            "name": "Illumination Academy",
            "poiType": 0
          },
          {
            "poiIndex": 18,
            "name": "Corgrad Wastes",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 1,
            "name": "King's Haven Pass Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 2,
            "name": "Shimmerene Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 3,
            "name": "Sil-Var-Woad Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 4,
            "name": "Russafeld Heights Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 5,
            "name": "Cey-Tarn Keep Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 6,
            "name": "Ebon Stadmont Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 41,
            "name": "Alinor Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 42,
            "name": "Lillandril Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 43,
            "name": "Eastern Pass Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 45,
            "name": "The Crystal Tower Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 47,
            "name": "Eldbur Ruins Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 55,
            "name": "Sunhold Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 57,
            "name": "Veyond Wyte Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 7,
            "name": "Alinor",
            "poiType": 2
          },
          {
            "poiIndex": 33,
            "name": "Shimmerene Dockworks",
            "poiType": 2
          },
          {
            "poiIndex": 34,
            "name": "Augury Basin",
            "poiType": 2
          },
          {
            "poiIndex": 35,
            "name": "Cathedral of Webs",
            "poiType": 2
          },
          {
            "poiIndex": 36,
            "name": "Alinor Docks",
            "poiType": 2
          },
          {
            "poiIndex": 37,
            "name": "Ald Mora Ruins",
            "poiType": 2
          },
          {
            "poiIndex": 38,
            "name": "Gryphon Aerie",
            "poiType": 2
          },
          {
            "poiIndex": 39,
            "name": "Keep of the Eleven Forces",
            "poiType": 2
          },
          {
            "poiIndex": 40,
            "name": "Garden of the Sacred Numbers",
            "poiType": 2
          },
          {
            "poiIndex": 50,
            "name": "Eldbur Ruins",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Dusk Keep",
            "poiType": 2
          },
          {
            "poiIndex": 56,
            "name": "Alaxon'ald",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 19,
            "name": "King's Haven Pass",
            "poiType": 3
          },
          {
            "poiIndex": 20,
            "name": "King's Haven Pass",
            "poiType": 3
          },
          {
            "poiIndex": 21,
            "name": "Eton Nir Grotto",
            "poiType": 3
          },
          {
            "poiIndex": 22,
            "name": "Archon's Grove",
            "poiType": 3
          },
          {
            "poiIndex": 23,
            "name": "Tor-Hame-Khard",
            "poiType": 3
          },
          {
            "poiIndex": 24,
            "name": "Wasten Coraldale",
            "poiType": 3
          },
          {
            "poiIndex": 27,
            "name": "Graveld's Hideaway",
            "poiType": 3
          },
          {
            "poiIndex": 28,
            "name": "Keelsplitter's Nest",
            "poiType": 3
          },
          {
            "poiIndex": 29,
            "name": "Gryphon Run",
            "poiType": 3
          },
          {
            "poiIndex": 30,
            "name": "The Queen's Hatchery",
            "poiType": 3
          },
          {
            "poiIndex": 31,
            "name": "Welenkin Cove",
            "poiType": 3
          },
          {
            "poiIndex": 32,
            "name": "Indrik Frolic",
            "poiType": 3
          },
          {
            "poiIndex": 54,
            "name": "Trial: Cloudrest",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 44,
            "name": "Direnni Abyssal Geyser",
            "poiType": 4
          },
          {
            "poiIndex": 46,
            "name": "Sil-Var-Woad Abyssal Geyser",
            "poiType": 4
          },
          {
            "poiIndex": 49,
            "name": "Rellenthil Abyssal Geyser",
            "poiType": 4
          },
          {
            "poiIndex": 51,
            "name": "Corgrad Abyssal Geyser",
            "poiType": 4
          },
          {
            "poiIndex": 52,
            "name": "Welenkin Abyssal Geyser",
            "poiType": 4
          },
          {
            "poiIndex": 58,
            "name": "Sunhold Abyssal Geyser",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 25,
            "name": "Sunhold",
            "poiType": 5
          },
          {
            "poiIndex": 26,
            "name": "Karnwasten",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 62,
            "name": "Dungeon: Coral Aerie",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 59,
            "name": "Golden Gryphon Garret",
            "poiType": 7
          },
          {
            "poiIndex": 60,
            "name": "Alinor Crest Townhouse",
            "poiType": 7
          },
          {
            "poiIndex": 61,
            "name": "Colossal Aldmeri Grotto",
            "poiType": 7
          },
          {
            "poiIndex": 63,
            "name": "Dancing Waters Wellspring",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1286,
    "name": "The Deadlands",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 7,
            "name": "The Blood Pit",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Burning Gyre Keep",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Ardent Hope",
            "poiType": 0
          },
          {
            "poiIndex": 12,
            "name": "Destruction's Solace",
            "poiType": 0
          },
          {
            "poiIndex": 16,
            "name": "Wretched Spire",
            "poiType": 0
          },
          {
            "poiIndex": 27,
            "name": "Zynoahz's Gaol",
            "poiType": 0
          },
          {
            "poiIndex": 28,
            "name": "Jynd's Foundry",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Raging Coast Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 2,
            "name": "The Blood Pit Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 3,
            "name": "Ardent Hope Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 4,
            "name": "Wretched Spire Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 5,
            "name": "False Martyrs' Folly Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 6,
            "name": "Annihilarch's Summit Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 29,
            "name": "Wounded Crossing Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 30,
            "name": "The Scourshales Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 14,
            "name": "Annihilarch's Summit",
            "poiType": 2
          },
          {
            "poiIndex": 17,
            "name": "Portal to Fargrave",
            "poiType": 2
          },
          {
            "poiIndex": 18,
            "name": "Portal to Fargrave",
            "poiType": 2
          },
          {
            "poiIndex": 19,
            "name": "Stormwright's Cleft",
            "poiType": 2
          },
          {
            "poiIndex": 20,
            "name": "The Razorworks",
            "poiType": 2
          },
          {
            "poiIndex": 22,
            "name": "The Tempest Engine",
            "poiType": 2
          },
          {
            "poiIndex": 23,
            "name": "Traitor's Ascent",
            "poiType": 2
          },
          {
            "poiIndex": 24,
            "name": "Charnel Pulpit",
            "poiType": 2
          },
          {
            "poiIndex": 25,
            "name": "Chantry of the Moon Reiver",
            "poiType": 2
          },
          {
            "poiIndex": 26,
            "name": "Ravaged Crossing",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 11,
            "name": "The Brandfire Reformatory",
            "poiType": 3
          },
          {
            "poiIndex": 13,
            "name": "The Abomination Cradle",
            "poiType": 3
          },
          {
            "poiIndex": 15,
            "name": "False Martyrs' Folly",
            "poiType": 3
          },
          {
            "poiIndex": 31,
            "name": "Den of the Unmaker",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 21,
            "name": "Agony's Ascent",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1207,
    "name": "The Reach",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 2,
            "name": "Karthwasten",
            "poiType": 0
          },
          {
            "poiIndex": 18,
            "name": "Reachwind Depths",
            "poiType": 0
          },
          {
            "poiIndex": 19,
            "name": "Arena: Vateshran Hollows",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 25,
            "name": "North Markarth Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 26,
            "name": "Karthwasten Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 27,
            "name": "Briar Rock Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 28,
            "name": "Rebel's Retreat Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 29,
            "name": "Lost Valley Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 33,
            "name": "Druadach Mountains Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 34,
            "name": "Markarth Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Markarth",
            "poiType": 2
          },
          {
            "poiIndex": 4,
            "name": "Druadach Redoubt",
            "poiType": 2
          },
          {
            "poiIndex": 6,
            "name": "Arkthzand Great Lift",
            "poiType": 2
          },
          {
            "poiIndex": 10,
            "name": "Deep Folk Crossing",
            "poiType": 2
          },
          {
            "poiIndex": 11,
            "name": "Rebel's Retreat",
            "poiType": 2
          },
          {
            "poiIndex": 12,
            "name": "Nalzthdbar Great Lift",
            "poiType": 2
          },
          {
            "poiIndex": 15,
            "name": "Understone Keep",
            "poiType": 2
          },
          {
            "poiIndex": 16,
            "name": "Bthardamz",
            "poiType": 2
          },
          {
            "poiIndex": 17,
            "name": "Red Eagle Redoubt",
            "poiType": 2
          },
          {
            "poiIndex": 21,
            "name": "Valthume",
            "poiType": 2
          },
          {
            "poiIndex": 22,
            "name": "Lost Valley Redoubt",
            "poiType": 2
          },
          {
            "poiIndex": 32,
            "name": "Hroldan Ring",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 3,
            "name": "Briar Rock Ruins",
            "poiType": 3
          },
          {
            "poiIndex": 7,
            "name": "Four Skull Lookout",
            "poiType": 3
          },
          {
            "poiIndex": 23,
            "name": "Gloomreach",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 8,
            "name": "Ragnvald Ritual Site",
            "poiType": 4
          },
          {
            "poiIndex": 9,
            "name": "Witchborne Ritual Site",
            "poiType": 4
          },
          {
            "poiIndex": 13,
            "name": "Harrowed Haunt Ritual Site",
            "poiType": 4
          },
          {
            "poiIndex": 14,
            "name": "Reachwind Ritual Site",
            "poiType": 4
          },
          {
            "poiIndex": 20,
            "name": "Wildspear Clan Camp",
            "poiType": 4
          },
          {
            "poiIndex": 24,
            "name": "Cinder-Heart Clan Camp",
            "poiType": 4
          },
          {
            "poiIndex": 30,
            "name": "Shadefeather Clan Camp",
            "poiType": 4
          },
          {
            "poiIndex": 31,
            "name": "Black-Moon Clan Camp",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 36,
            "name": "Dungeon: Oathsworn Pit",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 35,
            "name": "Stone Eagle Aerie",
            "poiType": 7
          },
          {
            "poiIndex": 38,
            "name": "Star-Gazer's Vigil",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 103,
    "name": "The Rift",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Shor's Stone",
            "poiType": 0
          },
          {
            "poiIndex": 2,
            "name": "Vernim Woods",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Boulderfall Pass",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Pinepeak Cavern",
            "poiType": 0
          },
          {
            "poiIndex": 5,
            "name": "Nimalten",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "Fallowstone Hall",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Northwind Mine",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Honrich Tower",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Taarengrav",
            "poiType": 0
          },
          {
            "poiIndex": 10,
            "name": "Skald's Retreat",
            "poiType": 0
          },
          {
            "poiIndex": 11,
            "name": "Treva's Farm",
            "poiType": 0
          },
          {
            "poiIndex": 12,
            "name": "Trolhetta",
            "poiType": 0
          },
          {
            "poiIndex": 13,
            "name": "Forelhost",
            "poiType": 0
          },
          {
            "poiIndex": 18,
            "name": "Lost Prospect",
            "poiType": 0
          },
          {
            "poiIndex": 19,
            "name": "Geirmund's Hall",
            "poiType": 0
          },
          {
            "poiIndex": 21,
            "name": "Riften",
            "poiType": 0
          },
          {
            "poiIndex": 22,
            "name": "Fullhelm Fort",
            "poiType": 0
          },
          {
            "poiIndex": 60,
            "name": "Frostmoon Farmstead",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 14,
            "name": "Riften Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 15,
            "name": "Skald's Retreat Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 16,
            "name": "Trolhetta Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 17,
            "name": "Trolhetta Summit Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 23,
            "name": "Honrich Tower Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 24,
            "name": "Fallowstone Hall Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 25,
            "name": "Northwind Mine Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 26,
            "name": "Geirmund's Hall Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 27,
            "name": "Taarengrav Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 28,
            "name": "Nimalten Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 29,
            "name": "Ragged Hills Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 30,
            "name": "Fullhelm Fort Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 20,
            "name": "The Steed",
            "poiType": 2
          },
          {
            "poiIndex": 38,
            "name": "Ivarstead",
            "poiType": 2
          },
          {
            "poiIndex": 43,
            "name": "The Apprentice",
            "poiType": 2
          },
          {
            "poiIndex": 50,
            "name": "Linele Skullcarver's Camp",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Three Tribes Camp",
            "poiType": 2
          },
          {
            "poiIndex": 52,
            "name": "Autumnshade Clearing",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Smokefrost Vigil",
            "poiType": 2
          },
          {
            "poiIndex": 54,
            "name": "Mammoth Ridge",
            "poiType": 2
          },
          {
            "poiIndex": 55,
            "name": "Honeystrand Hill",
            "poiType": 2
          },
          {
            "poiIndex": 56,
            "name": "Grethel's Vigil",
            "poiType": 2
          },
          {
            "poiIndex": 57,
            "name": "Eldbjorg's Hideaway",
            "poiType": 2
          },
          {
            "poiIndex": 58,
            "name": "Jenedusil's Claw",
            "poiType": 2
          },
          {
            "poiIndex": 59,
            "name": "Trollslayer's Gully",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 32,
            "name": "Broken Helm Hollow",
            "poiType": 3
          },
          {
            "poiIndex": 33,
            "name": "Fort Greenwall",
            "poiType": 3
          },
          {
            "poiIndex": 34,
            "name": "Faldar's Tooth",
            "poiType": 3
          },
          {
            "poiIndex": 35,
            "name": "Avanchnzel",
            "poiType": 3
          },
          {
            "poiIndex": 36,
            "name": "Snapleg Cave",
            "poiType": 3
          },
          {
            "poiIndex": 37,
            "name": "Shroud Hearth Barrow",
            "poiType": 3
          },
          {
            "poiIndex": 44,
            "name": "Hunter Camp",
            "poiType": 3
          },
          {
            "poiIndex": 45,
            "name": "Troll Cave",
            "poiType": 3
          },
          {
            "poiIndex": 46,
            "name": "Frozen Ruins",
            "poiType": 3
          },
          {
            "poiIndex": 47,
            "name": "Angarvunde Mound",
            "poiType": 3
          },
          {
            "poiIndex": 48,
            "name": "Giant Camp",
            "poiType": 3
          },
          {
            "poiIndex": 49,
            "name": "Wisplight Glen",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 39,
            "name": "Ragged Hills Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 40,
            "name": "Stony Basin Dolmen",
            "poiType": 4
          },
          {
            "poiIndex": 41,
            "name": "Smokefrost Peaks Dolmen",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 31,
            "name": "Lion's Den",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 42,
            "name": "Dungeon: Blessed Crucible",
            "poiType": 6
          },
          {
            "poiIndex": 64,
            "name": "Dungeon: Scrivener's Hall",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 61,
            "name": "Old Mistveil Manor",
            "poiType": 7
          },
          {
            "poiIndex": 62,
            "name": "Autumn's-Gate",
            "poiType": 7
          },
          {
            "poiIndex": 63,
            "name": "Hunter's Glade",
            "poiType": 7
          },
          {
            "poiIndex": 65,
            "name": "Grand Gallery of Tamriel",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 849,
    "name": "Vvardenfell",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Gnisis",
            "poiType": 0
          },
          {
            "poiIndex": 8,
            "name": "Vos",
            "poiType": 0
          },
          {
            "poiIndex": 11,
            "name": "Sadrith Mora",
            "poiType": 0
          },
          {
            "poiIndex": 14,
            "name": "Suran",
            "poiType": 0
          },
          {
            "poiIndex": 15,
            "name": "Balmora",
            "poiType": 0
          },
          {
            "poiIndex": 33,
            "name": "Seyda Neen",
            "poiType": 0
          },
          {
            "poiIndex": 47,
            "name": "Vassir-Didanat Mine",
            "poiType": 0
          },
          {
            "poiIndex": 48,
            "name": "Ald'ruhn",
            "poiType": 0
          },
          {
            "poiIndex": 64,
            "name": "Veloth Ancestral Tomb",
            "poiType": 0
          },
          {
            "poiIndex": 74,
            "name": "Molag Mar",
            "poiType": 0
          },
          {
            "poiIndex": 75,
            "name": "Vivec City",
            "poiType": 0
          },
          {
            "poiIndex": 87,
            "name": "Ald Carac",
            "poiType": 0
          },
          {
            "poiIndex": 88,
            "name": "Ularra",
            "poiType": 0
          },
          {
            "poiIndex": 89,
            "name": "Foyada Quarry",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 9,
            "name": "West Gash Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 13,
            "name": "Urshilaku Camp Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 22,
            "name": "Gnisis Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 23,
            "name": "Ald'ruhn Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 24,
            "name": "Balmora Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 25,
            "name": "Seyda Neen Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 26,
            "name": "Suran Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 27,
            "name": "Molag Mar Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 28,
            "name": "Tel Branora Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 29,
            "name": "Vivec City Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 30,
            "name": "Nchuleftingth Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 31,
            "name": "Tel Mora Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 32,
            "name": "Sadrith Mora Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 72,
            "name": "Valley of the Wind Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 85,
            "name": "Vivec Temple Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 10,
            "name": "Tel Aruhn",
            "poiType": 2
          },
          {
            "poiIndex": 44,
            "name": "Marandus",
            "poiType": 2
          },
          {
            "poiIndex": 45,
            "name": "Randas Ancestral Tomb",
            "poiType": 2
          },
          {
            "poiIndex": 46,
            "name": "Zergonipal",
            "poiType": 2
          },
          {
            "poiIndex": 65,
            "name": "Urshilaku Camp",
            "poiType": 2
          },
          {
            "poiIndex": 66,
            "name": "Zainab Camp",
            "poiType": 2
          },
          {
            "poiIndex": 67,
            "name": "Erabenimsun Camp",
            "poiType": 2
          },
          {
            "poiIndex": 76,
            "name": "Yasammidin",
            "poiType": 2
          },
          {
            "poiIndex": 77,
            "name": "Ashalmimilkala",
            "poiType": 2
          },
          {
            "poiIndex": 78,
            "name": "Shrine of Azura",
            "poiType": 2
          },
          {
            "poiIndex": 79,
            "name": "Holamayan Monastery",
            "poiType": 2
          },
          {
            "poiIndex": 80,
            "name": "Ald Sotha",
            "poiType": 2
          },
          {
            "poiIndex": 81,
            "name": "Hanud Tower",
            "poiType": 2
          },
          {
            "poiIndex": 82,
            "name": "Ahemmusa Camp",
            "poiType": 2
          },
          {
            "poiIndex": 83,
            "name": "Aleft",
            "poiType": 2
          },
          {
            "poiIndex": 84,
            "name": "Falensarano Ruins",
            "poiType": 2
          },
          {
            "poiIndex": 86,
            "name": "Valenvaryon",
            "poiType": 2
          },
          {
            "poiIndex": 90,
            "name": "Dreloth Ancestral Tomb",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 2,
            "name": "Khartag Point",
            "poiType": 3
          },
          {
            "poiIndex": 3,
            "name": "Ashalmawia",
            "poiType": 3
          },
          {
            "poiIndex": 4,
            "name": "Zainsipilu",
            "poiType": 3
          },
          {
            "poiIndex": 5,
            "name": "Matus-Akin Egg Mine",
            "poiType": 3
          },
          {
            "poiIndex": 6,
            "name": "Pulk",
            "poiType": 3
          },
          {
            "poiIndex": 7,
            "name": "Nchuleft",
            "poiType": 3
          },
          {
            "poiIndex": 12,
            "name": "Trial: Halls of Fabrication",
            "poiType": 3
          },
          {
            "poiIndex": 16,
            "name": "Nilthog's Hollow",
            "poiType": 3
          },
          {
            "poiIndex": 17,
            "name": "Sulipund Grange",
            "poiType": 3
          },
          {
            "poiIndex": 18,
            "name": "Shipwreck Cove",
            "poiType": 3
          },
          {
            "poiIndex": 19,
            "name": "Missir-Dadalit Egg Mine",
            "poiType": 3
          },
          {
            "poiIndex": 20,
            "name": "Dubdil Alar Tower",
            "poiType": 3
          },
          {
            "poiIndex": 21,
            "name": "Salothan's Council",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 34,
            "name": "Nchuleftingth",
            "poiType": 5
          },
          {
            "poiIndex": 35,
            "name": "Forgotten Wastes",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 36,
            "name": "Saint Delyn Penthouse",
            "poiType": 7
          },
          {
            "poiIndex": 37,
            "name": "Amaya Lake Lodge",
            "poiType": 7
          },
          {
            "poiIndex": 38,
            "name": "Ald Velothi Harbor House",
            "poiType": 7
          },
          {
            "poiIndex": 68,
            "name": "Tel Galen",
            "poiType": 7
          },
          {
            "poiIndex": 91,
            "name": "Kushalit Sanctuary",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1443,
    "name": "West Weald",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 12,
            "name": "Vashabar",
            "poiType": 0
          },
          {
            "poiIndex": 15,
            "name": "Rustwall Estate",
            "poiType": 0
          },
          {
            "poiIndex": 17,
            "name": "The Outcast Inn",
            "poiType": 0
          },
          {
            "poiIndex": 19,
            "name": "Feldagard Keep",
            "poiType": 0
          },
          {
            "poiIndex": 20,
            "name": "Ontus",
            "poiType": 0
          },
          {
            "poiIndex": 21,
            "name": "Weatherleah Estate",
            "poiType": 0
          },
          {
            "poiIndex": 22,
            "name": "Valente Vineyards",
            "poiType": 0
          },
          {
            "poiIndex": 24,
            "name": "Sutch",
            "poiType": 0
          },
          {
            "poiIndex": 32,
            "name": "Hastrel Hollow",
            "poiType": 0
          },
          {
            "poiIndex": 33,
            "name": "Niryastare",
            "poiType": 0
          },
          {
            "poiIndex": 34,
            "name": "Elenglynn",
            "poiType": 0
          },
          {
            "poiIndex": 42,
            "name": "Broken Promises Cave",
            "poiType": 0
          },
          {
            "poiIndex": 43,
            "name": "Wendir",
            "poiType": 0
          },
          {
            "poiIndex": 65,
            "name": "Ostumir",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 53,
            "name": "Skingrad City Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 54,
            "name": "Skingrad Vineyards Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 55,
            "name": "Vashabar Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 56,
            "name": "Ontus Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 57,
            "name": "Sutch Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 58,
            "name": "North Hook Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 59,
            "name": "Trader's Luck Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 61,
            "name": "Fall's Path Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 68,
            "name": "Wildburn's Edge Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 69,
            "name": "Ostumir Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 70,
            "name": "Centurion's Watch Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 71,
            "name": "Valente Vineyards Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 73,
            "name": "Feldagard Keep Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 74,
            "name": "Three Points Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Skingrad",
            "poiType": 2
          },
          {
            "poiIndex": 3,
            "name": "Leftwheal Granary",
            "poiType": 2
          },
          {
            "poiIndex": 4,
            "name": "Singer's Outpost",
            "poiType": 2
          },
          {
            "poiIndex": 5,
            "name": "Deserter's Lagoon",
            "poiType": 2
          },
          {
            "poiIndex": 16,
            "name": "Gray's Hollow",
            "poiType": 2
          },
          {
            "poiIndex": 31,
            "name": "Hoperoot",
            "poiType": 2
          },
          {
            "poiIndex": 40,
            "name": "Rock Bottom Caverns",
            "poiType": 2
          },
          {
            "poiIndex": 41,
            "name": "Sanguine's Shrine",
            "poiType": 2
          },
          {
            "poiIndex": 48,
            "name": "Fort Hastrel",
            "poiType": 2
          },
          {
            "poiIndex": 50,
            "name": "Eaglerock Ruins",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Meridia's Shrine",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 6,
            "name": "Haldain Lumber Camp",
            "poiType": 3
          },
          {
            "poiIndex": 7,
            "name": "Fyrelight Cave",
            "poiType": 3
          },
          {
            "poiIndex": 8,
            "name": "Nonungalo",
            "poiType": 3
          },
          {
            "poiIndex": 9,
            "name": "Varen's Watch",
            "poiType": 3
          },
          {
            "poiIndex": 10,
            "name": "Legion's Rest",
            "poiType": 3
          },
          {
            "poiIndex": 11,
            "name": "Fort Colovia",
            "poiType": 3
          },
          {
            "poiIndex": 23,
            "name": "Trial: Lucent Citadel",
            "poiType": 3
          },
          {
            "poiIndex": 25,
            "name": "Fall's Glade",
            "poiType": 3
          },
          {
            "poiIndex": 26,
            "name": "Lake Olo",
            "poiType": 3
          },
          {
            "poiIndex": 27,
            "name": "Fortune's Bluff",
            "poiType": 3
          },
          {
            "poiIndex": 28,
            "name": "Centurion's Rise",
            "poiType": 3
          },
          {
            "poiIndex": 29,
            "name": "Broken Path Cave",
            "poiType": 3
          },
          {
            "poiIndex": 30,
            "name": "Frontier's Cradle",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 60,
            "name": "Ostumir Mirrormoor Mosaic",
            "poiType": 4
          },
          {
            "poiIndex": 62,
            "name": "Sutch Mirrormoor Mosaic",
            "poiType": 4
          },
          {
            "poiIndex": 63,
            "name": "Colovia Mirrormoor Mosaic",
            "poiType": 4
          },
          {
            "poiIndex": 64,
            "name": "Silorn Mirrormoor Mosaic",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 13,
            "name": "Silorn",
            "poiType": 5
          },
          {
            "poiIndex": 14,
            "name": "Leftwheal Trading Post",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 72,
            "name": "Dungeon: Exiled Redoubt",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 66,
            "name": "Merryvine Estate",
            "poiType": 7
          },
          {
            "poiIndex": 67,
            "name": "Rosewine Retreat",
            "poiType": 7
          },
          {
            "poiIndex": 75,
            "name": "Haven of the Five Companions",
            "poiType": 7
          },
          {
            "poiIndex": 76,
            "name": "Castle Skingrad",
            "poiType": 7
          },
          {
            "poiIndex": 77,
            "name": "Wildgrown Chapel of Julianos",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1160,
    "name": "Western Skyrim",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 2,
            "name": "Morthal",
            "poiType": 0
          },
          {
            "poiIndex": 3,
            "name": "Karthwatch",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Dragon Bridge",
            "poiType": 0
          },
          {
            "poiIndex": 5,
            "name": "Kilkreath Temple",
            "poiType": 0
          },
          {
            "poiIndex": 6,
            "name": "Mor Khazgur",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "The Silver Cormorant",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 17,
            "name": "Kilkreath Temple Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 18,
            "name": "Morthal Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 19,
            "name": "Mor Khazgur Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 20,
            "name": "Dragon Bridge Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 21,
            "name": "Southern Watch Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 22,
            "name": "Frozen Coast Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 23,
            "name": "Solitude Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 40,
            "name": "Solitude Docks Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 42,
            "name": "Deepwood Vale Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 58,
            "name": "Giant's Coast Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 59,
            "name": "Northern Watch Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Solitude",
            "poiType": 2
          },
          {
            "poiIndex": 13,
            "name": "Karthald Great Lift",
            "poiType": 2
          },
          {
            "poiIndex": 15,
            "name": "Hjaalmarch Great Lift",
            "poiType": 2
          },
          {
            "poiIndex": 16,
            "name": "Eastern Great Lift",
            "poiType": 2
          },
          {
            "poiIndex": 48,
            "name": "Hunter's House",
            "poiType": 2
          },
          {
            "poiIndex": 49,
            "name": "Dragon's Belly",
            "poiType": 2
          },
          {
            "poiIndex": 50,
            "name": "Lendoran Ruin",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Storm-Hawk's Altar",
            "poiType": 2
          },
          {
            "poiIndex": 52,
            "name": "Sword's Point Watchtower",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Wolf's Eye Lighthouse",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 8,
            "name": "Frozen Coast",
            "poiType": 3
          },
          {
            "poiIndex": 9,
            "name": "Shadowgreen",
            "poiType": 3
          },
          {
            "poiIndex": 10,
            "name": "Chillwind Depths",
            "poiType": 3
          },
          {
            "poiIndex": 11,
            "name": "Dragonhome",
            "poiType": 3
          },
          {
            "poiIndex": 24,
            "name": "Hordrek's Hunting Grounds",
            "poiType": 3
          },
          {
            "poiIndex": 26,
            "name": "Circle of Champions",
            "poiType": 3
          },
          {
            "poiIndex": 27,
            "name": "Ysmgar's Beach",
            "poiType": 3
          },
          {
            "poiIndex": 28,
            "name": "Shademother's Haven",
            "poiType": 3
          },
          {
            "poiIndex": 39,
            "name": "Trial: Kyne's Aegis",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 4,
        "label": "Objectives",
        "pois": [
          {
            "poiIndex": 29,
            "name": "Old Karth Ritual Site",
            "poiType": 4
          },
          {
            "poiIndex": 30,
            "name": "Black Morass Ritual Site",
            "poiType": 4
          },
          {
            "poiIndex": 31,
            "name": "Giant's Coast Ritual Site",
            "poiType": 4
          },
          {
            "poiIndex": 32,
            "name": "Chilblain Peak Ritual Site",
            "poiType": 4
          },
          {
            "poiIndex": 33,
            "name": "Hailstone Valley Ritual Site",
            "poiType": 4
          },
          {
            "poiIndex": 34,
            "name": "Northern Watch Ritual Site",
            "poiType": 4
          },
          {
            "poiIndex": 35,
            "name": "Coastal Giant Camp",
            "poiType": 4
          },
          {
            "poiIndex": 36,
            "name": "Karthald Giant Camp",
            "poiType": 4
          },
          {
            "poiIndex": 37,
            "name": "Kilkreath Giant Camp",
            "poiType": 4
          },
          {
            "poiIndex": 38,
            "name": "Highland Giant Camp",
            "poiType": 4
          },
          {
            "poiIndex": 43,
            "name": "Deepwood Giant Camp",
            "poiType": 4
          },
          {
            "poiIndex": 54,
            "name": "Mor Khazgur Giant Camp",
            "poiType": 4
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 12,
            "name": "Labyrinthian",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 57,
            "name": "Dungeon: Castle Thorn",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 55,
            "name": "Proudspire Manor",
            "poiType": 7
          },
          {
            "poiIndex": 56,
            "name": "Snowmelt Suite",
            "poiType": 7
          },
          {
            "poiIndex": 60,
            "name": "Antiquarian's Alpine Gallery",
            "poiType": 7
          },
          {
            "poiIndex": 61,
            "name": "Stillwaters Retreat",
            "poiType": 7
          },
          {
            "poiIndex": 62,
            "name": "Shalidor's Shrouded Realm",
            "poiType": 7
          }
        ]
      }
    ]
  },
  {
    "zoneId": 684,
    "name": "Wrothgar",
    "poiTypes": [
      {
        "poiType": 0,
        "label": "Standard",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Paragon's Remembrance",
            "poiType": 0
          },
          {
            "poiIndex": 4,
            "name": "Honor's Rest",
            "poiType": 0
          },
          {
            "poiIndex": 7,
            "name": "Sorrow",
            "poiType": 0
          },
          {
            "poiIndex": 9,
            "name": "Fharun Stronghold",
            "poiType": 0
          },
          {
            "poiIndex": 11,
            "name": "Frostbreak Fortress",
            "poiType": 0
          },
          {
            "poiIndex": 13,
            "name": "Graystone Quarry",
            "poiType": 0
          },
          {
            "poiIndex": 25,
            "name": "Bonerock Cavern",
            "poiType": 0
          },
          {
            "poiIndex": 26,
            "name": "Morkul Stronghold",
            "poiType": 0
          },
          {
            "poiIndex": 27,
            "name": "Shatul Range",
            "poiType": 0
          },
          {
            "poiIndex": 28,
            "name": "Exile's Barrow",
            "poiType": 0
          },
          {
            "poiIndex": 30,
            "name": "Frozen Fleet",
            "poiType": 0
          },
          {
            "poiIndex": 55,
            "name": "Arena: Maelstrom",
            "poiType": 0
          }
        ]
      },
      {
        "poiType": 1,
        "label": "Wayshrines",
        "pois": [
          {
            "poiIndex": 34,
            "name": "Siege Road Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 35,
            "name": "Frostbreak Ridge Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 36,
            "name": "Trader's Road Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 37,
            "name": "Orsinium Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 38,
            "name": "Shatul Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 39,
            "name": "Great Bay Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 40,
            "name": "Two Rivers Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 41,
            "name": "Icy Shore Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 42,
            "name": "Morkul Plain Wayshrine",
            "poiType": 1
          },
          {
            "poiIndex": 54,
            "name": "Merchant's Gate Wayshrine",
            "poiType": 1
          }
        ]
      },
      {
        "poiType": 2,
        "label": "Achievement Components",
        "pois": [
          {
            "poiIndex": 33,
            "name": "Orsinium",
            "poiType": 2
          },
          {
            "poiIndex": 43,
            "name": "Aqueduct Rock",
            "poiType": 2
          },
          {
            "poiIndex": 44,
            "name": "Grudge-Rock Falls",
            "poiType": 2
          },
          {
            "poiIndex": 45,
            "name": "Shipwreck Cove",
            "poiType": 2
          },
          {
            "poiIndex": 46,
            "name": "Forlorn Watchtower",
            "poiType": 2
          },
          {
            "poiIndex": 47,
            "name": "Jehanna Docks",
            "poiType": 2
          },
          {
            "poiIndex": 48,
            "name": "Torug's Arch",
            "poiType": 2
          },
          {
            "poiIndex": 49,
            "name": "Friendship Gate",
            "poiType": 2
          },
          {
            "poiIndex": 50,
            "name": "Merchant's Gate",
            "poiType": 2
          },
          {
            "poiIndex": 51,
            "name": "Malacath Statue",
            "poiType": 2
          },
          {
            "poiIndex": 52,
            "name": "Boreal Forge",
            "poiType": 2
          },
          {
            "poiIndex": 53,
            "name": "Morkuldin Forge",
            "poiType": 2
          }
        ]
      },
      {
        "poiType": 3,
        "label": "Achievements",
        "pois": [
          {
            "poiIndex": 3,
            "name": "Watcher's Hold",
            "poiType": 3
          },
          {
            "poiIndex": 6,
            "name": "Poacher's Encampment",
            "poiType": 3
          },
          {
            "poiIndex": 8,
            "name": "Thukhozod's Sanctum",
            "poiType": 3
          },
          {
            "poiIndex": 12,
            "name": "Unfinished Dolmen",
            "poiType": 3
          },
          {
            "poiIndex": 14,
            "name": "King-Chief's Throne",
            "poiType": 3
          },
          {
            "poiIndex": 15,
            "name": "The Accursed Nursery",
            "poiType": 3
          },
          {
            "poiIndex": 16,
            "name": "The Mad Ogre's Altar",
            "poiType": 3
          },
          {
            "poiIndex": 17,
            "name": "Nyzchaleft Falls",
            "poiType": 3
          },
          {
            "poiIndex": 19,
            "name": "Argent Mine",
            "poiType": 3
          },
          {
            "poiIndex": 21,
            "name": "Nikolvara's Kennel",
            "poiType": 3
          },
          {
            "poiIndex": 23,
            "name": "Zthenganaz",
            "poiType": 3
          },
          {
            "poiIndex": 24,
            "name": "Coldperch Cavern",
            "poiType": 3
          }
        ]
      },
      {
        "poiType": 5,
        "label": "Public Dungeons",
        "pois": [
          {
            "poiIndex": 2,
            "name": "Old Orsinium",
            "poiType": 5
          },
          {
            "poiIndex": 29,
            "name": "Rkindaleft",
            "poiType": 5
          }
        ]
      },
      {
        "poiType": 6,
        "label": "Group Dungeons",
        "pois": [
          {
            "poiIndex": 59,
            "name": "Dungeon: Icereach",
            "poiType": 6
          },
          {
            "poiIndex": 61,
            "name": "Dungeon: Bedlam Veil",
            "poiType": 6
          }
        ]
      },
      {
        "poiType": 7,
        "label": "Houses",
        "pois": [
          {
            "poiIndex": 58,
            "name": "Pariah's Pinnacle",
            "poiType": 7
          },
          {
            "poiIndex": 60,
            "name": "Forgemaster Falls",
            "poiType": 7
          }
        ]
      }
    ]
  }
]
