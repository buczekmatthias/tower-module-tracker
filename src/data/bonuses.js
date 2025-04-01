const odds = {
  common: 46.2,
  rare: 40,
  epic: 30,
  legendary: 2.5,
  mythic: 1,
  ancestral: 0.3,
};

const bonuses = {
  cannon: {
    "Attack speed": {
      s: "+:val",
      v: [0.3, 0.5, 0.7, 1, 3, 5],
    },
    "Critical chance": {
      s: "+:val%",
      v: [2, 3, 4, 6, 8, 10],
    },
    "Critical factor": {
      s: "+:valx",
      v: [2, 4, 6, 8, 12, 15],
    },
    "Attack range": {
      s: "+:valm",
      v: [2, 4, 8, 12, 20, 30],
    },
    "Damage / meter": {
      s: "+:valx",
      v: [0.005, 0.01, 0.025, 0.04, 0.075, 0.15],
    },
    "Multishot chance": {
      s: "+:val%",
      v: [null, 3, 5, 7, 10, 13],
    },
    "Multishot targets": {
      s: "+:val",
      v: [null, null, 1, 2, 3, 4],
    },
    "Rapidfire chance": {
      s: "+:val%",
      v: [null, 2, 4, 6, 9, 12],
    },
    "Rapidfire duration": {
      s: "+:vals",
      v: [null, 0.4, 0.8, 1.4, 2.5, 3.5],
    },
    "Bounce shot chance": {
      s: "+:val%",
      v: [null, 2, 3, 5, 9, 12],
    },
    "Bounce shot targets": {
      s: "+:val",
      v: [null, null, 1, 2, 3, 4],
    },
    "Bounce shot range": {
      s: "+:valm",
      v: [null, 0.5, 0.8, 1.2, 1.8, 2],
    },
    "Super crit chance": {
      s: "+:val%",
      v: [null, null, 3, 5, 7, 10],
    },
    "Super crit multiplier": {
      s: "+:valx",
      v: [null, null, 2, 3, 5, 7],
    },
    "Rend armor chance": {
      s: "+:val%",
      v: [null, null, null, 2, 5, 8],
    },
    "Rend armor multiplier": {
      s: "+:val%",
      v: [null, null, null, 2, 5, 8],
    },
    "Rend armor maximum": {
      s: "+:valx",
      v: [null, null, null, 0.2, 0.3, 0.5],
    },
  },
  armor: {
    "Health regen": {
      s: "+:val%",
      v: [20, 40, 60, 100, 200, 400],
    },
    "Defense %": {
      s: "+:val%",
      v: [1, 2, 3, 5, 6, 8],
    },
    "Defense absolute": {
      s: "+:val%",
      v: [15, 25, 40, 100, 500, 1000],
    },
    "Thorns damage": {
      s: "+:val%",
      v: [null, null, 2, 4, 7, 10],
    },
    Lifesteal: {
      s: "+:val%",
      v: [null, null, 0.3, 0.5, 1.5, 2],
    },
    "Knockback chance": {
      s: "+:val%",
      v: [null, null, 2, 4, 6, 9],
    },
    "Knockback force": {
      s: "+:val",
      v: [null, null, 0.1, 0.4, 0.9, 1.5],
    },
    "Orb speed": {
      s: "+:val",
      v: [null, null, 1, 1.5, 2, 3],
    },
    Orbs: {
      s: "+:val",
      v: [null, null, null, null, 1, 2],
    },
    "Shockwave size": {
      s: "+:val",
      v: [null, null, 0.1, 0.3, 0.7, 1],
    },
    "Shockwave frequency": {
      s: "-:vals",
      v: [null, null, 1, 2, 3, 4],
    },
    "Land mine damage": {
      s: "+:val%",
      v: [null, 30, 50, 150, 500, 800],
    },
    "Land mine chance": {
      s: "+:val%",
      v: [null, 2, 3, 6, 9, 12],
    },
    "Land mine radius": {
      s: "+:val",
      v: [null, 0.1, 0.2, 0.3, 0.8, 1],
    },
    "Death defy": {
      s: "+:val%",
      v: [null, null, null, 1.5, 3.5, 5],
    },
    "Wall health": {
      s: "+:val%",
      v: [null, null, 20, 40, 90, 120],
    },
    "Wall rebuild": {
      s: "-:vals",
      v: [null, null, 20, 40, 80, 100],
    },
  },
  generator: {
    "Cash bonus": {
      s: "+:valx",
      v: [0.1, 0.2, 0.3, 0.5, 1.2, 2.5],
    },
    "Cash / wave": {
      s: "+:val",
      v: [30, 50, 100, 200, 500, 1000],
    },
    "Coins / kill bonus": {
      s: "+:valx",
      v: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
    },
    "Coins / wave": {
      s: "+:val",
      v: [20, 35, 60, 120, 200, 350],
    },
    "Free attack upgrade": {
      s: "+:val%",
      v: [2, 4, 6, 8, 10, 12],
    },
    "Free defense upgrade": {
      s: "+:val%",
      v: [2, 4, 6, 8, 10, 12],
    },
    "Free utility upgrade": {
      s: "+:val%",
      v: [2, 4, 6, 8, 10, 12],
    },
    "Interest / wave": {
      s: "+:val%",
      v: [null, null, 2, 4, 6, 8],
    },
    "Recovery amount": {
      s: "+:val%",
      v: [null, null, 3, 5, 7, 10],
    },
    "Max recovery": {
      s: "+:valx",
      v: [null, null, 0.4, 0.7, 1, 1.5],
    },
    "Package chance": {
      s: "+:val%",
      v: [null, null, 5, 8, 11, 15],
    },
    "Enemy health level skip": {
      s: "+:val%",
      v: [null, null, 2, 4, 6, 8],
    },
    "Enemy attack level skip": {
      s: "+:val%",
      v: [null, null, 2, 4, 6, 8],
    },
  },
  core: {
    "Golden tower - Bonus": {
      s: "+:valx",
      v: [null, null, 1, 2, 3, 4],
    },
    "Golden tower - Duration": {
      s: "+:vals",
      v: [null, null, null, 2, 4, 7],
    },
    "Golden tower - Cooldown": {
      s: "-:vals",
      v: [null, null, null, 5, 8, 12],
    },
    "Black hole - Size": {
      s: "+:valm",
      v: [2, 4, 6, 8, 10, 12],
    },
    "Black hole - Duration": {
      s: "+:vals",
      v: [null, null, null, 2, 3, 4],
    },
    "Black hole - Cooldown": {
      s: "-:vals",
      v: [null, null, null, 2, 3, 4],
    },
    "Spotlight - Bonus": {
      s: "+:valx",
      v: [1.2, 2.5, 3.5, 10, 15, 20],
    },
    "Spotlight - Angle": {
      s: "+:val°",
      v: [null, null, 3, 6, 11, 15],
    },
    "Chrono field - Duration": {
      s: "+:vals",
      v: [null, null, null, 4, 7, 10],
    },
    "Chrono field - Speed reduction": {
      s: "+:val%",
      v: [null, null, 3, 8, 11, 15],
    },
    "Chrono field - Cooldown": {
      s: "-:vals",
      v: [null, null, null, 4, 7, 10],
    },
    "Death wave - Damage": {
      s: "+:valx",
      v: [8, 15, 25, 50, 100, 250],
    },
    "Death wave - Quantity": {
      s: "+:val",
      v: [null, null, null, 1, 2, 3],
    },
    "Death wave - Cooldown": {
      s: "-:vals",
      v: [null, null, null, 6, 10, 13],
    },
    "Smart missiles - Damage": {
      s: "+:valx",
      v: [8, 15, 25, 50, 100, 25],
    },
    "Smart missiles - Quantity": {
      s: "+:val",
      v: [null, null, 1, 2, 4, 5],
    },
    "Smart missiles - Cooldown": {
      s: "-:vals",
      v: [null, null, null, 2, 4, 6],
    },
    "Inner land mines - Damage": {
      s: "+:valx",
      v: [2, 5, 15, 40, 100, 150],
    },
    "Inner land mines - Quantity": {
      s: "+:val",
      v: [null, null, null, 1, 2, 3],
    },
    "Inner land mines - Cooldown": {
      s: "-:vals",
      v: [null, null, 5, 8, 10, 13],
    },
    "Poison swamp - Damage": {
      s: "+:valx",
      v: [8, 15, 25, 50, 100, 250],
    },
    "Poison swamp - Duration": {
      s: "+:vals",
      v: [null, null, null, 2, 5, 10],
    },
    "Poison swamp - Cooldown": {
      s: "-:vals",
      v: [null, 2, 4, 6, 8, 10],
    },
    "Chain lightning - Damage": {
      s: "+:valx",
      v: [8, 15, 25, 50, 100, 250],
    },
    "Chain lightning - Quantity": {
      s: "+:val",
      v: [null, null, 1, 2, 3, 4],
    },
    "Chain lightning - Chance": {
      s: "+:val%",
      v: [2, 4, 6, 9, 12, 15],
    },
  },
};

export { odds, bonuses };
