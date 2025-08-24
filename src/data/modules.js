import { bonuses } from "@/data/bonuses";

const MODULES_COUNT_FOR_MAX = 18;
const SUBSTAT_SLOTS = 8;

const modules = {
  cannons: {
    "Astral Deliverance": { icon: "astral_deliverance.webp", description: "Bounce shot's range is increased by 3% of tower's total range. Each bounce increases the projectile's damage by :val%", values: [20, 40, 60, 80] },
    "Being Annihilator": { icon: "being_annihilator.webp", description: "When you super crit, your next :val hits are guaranteed super crit", values: [3, 4, 5, 6] },
    "Death Penalty": { icon: "death_penalty.webp", description: "Change of :val% to mark an enemy for death on spawn, causing the first hit to destroy it", values: [5, 8, 11, 15] },
    "Havoc Bringer": { icon: "havoc_bringer.webp", description: ":val% chance for rend armor to instantly go to max", values: [10, 13, 15, 20] },
    "Shrink Ray": { icon: "shrink_ray.png", description: "Attacks have a 1% chance to apply a non-stacking effect that decreases the enemy's mass by :val%", values: [10, 20, 30, 40] },
    // "Amplifying Strike": { icon: "amplifying_strike.png", description: "Killing a boss or elite enemy increases damage from tower attacks by x:val for 5 seconds", values: [2, 0, 0, 0] },
  },
  armors: {
    "Anti-Cube Portal": { icon: "anti_cube_portal.webp", description: "Enemies take x:val damage for 7s after they are hit by shockwave", values: [10, 15, 20, 25] },
    "Negative Mass Projector": { icon: "negative_mass_projector.webp", description: "If an orb doesn't kill the enemy it will apply a stacking debuff, reducing damage and speed by :val% per hit, to max reduction of 50%", values: [1, 1.5, 2, 2.5] },
    "Wormhole Redirector": { icon: "wormhole_redirector.webp", description: "Health regen can heal up to :val% of package max recovery", values: [25, 50, 75, 100] },
    "Space Displacer": { icon: "space_displacer.webp", description: "Landmines have a :val% chance to spawn as inner land mine (20 max) instead of normal mine. These mines autonomously move and organize around the tower", values: [15, 20, 25, 30] },
    "Sharp Fortitude": { icon: "sharp_fortitude.png", description: "Increase the Wall's health and regen by x:val. Enemies take +1% increased damage from wall thorns per subsequent hit.", values: [1.25, 1.5, 2, 2.5] },
    // "Orbital Augment": { icon: "orbital_augment.png", description: "Increase maximum orbs by 1. Increase rotation of all orbs by :val% for 20 seconds (120 seconds cooldown)", values: [15, 0, 0, 0] },
  },
  generators: {
    "Singularity Harness": { icon: "singularity_harness.webp", description: "Increases the range of each bot by +:valm. Enemies hit by flame bot receive double damage", values: [5, 8, 11, 15] },
    "Galaxy Compressor": { icon: "galaxy_compressor.webp", description: "Collecting a recovery package reduces the cooldown of all ultimate weapons except poison swamp by :vals", values: [10, 13, 17, 20] },
    "Pulsar Harvester": { icon: "pulsar_harvester.webp", description: "Each time a projectile hits an enemy, there's a :val% chance that it will reduce enemy's health and attack level by 1", values: [1, 1.5, 2, 2.5] },
    "Black Hole Digestor": { icon: "black_hole_digestor.webp", description: "Temporarily get :val% extra coins / kill bonus for each free upgrade you get on the current wave. Free upgrades can not increase tower range", values: [3, 5, 7, 10] },
    "Project Funding": { icon: "project_funding.png", description: "Tower damage is multiplied by :val% of the number of digits in your current cash", values: [12.5, 25, 50, 100] },
    // "Restorative Bonus": { icon: "restorative_bonus.png", description: "Packages grant a temporary attack speed boost for :val seconds", values: [5, 0, 0, 0] },
  },
  cores: {
    "Om Chip": { icon: "om_chip.webp", description: "Spotlight will rotate to focus a boss. Boss reflects the light around it to nearby enemies, increasing by x:val the damage they receive.", values: [2, 4, 7, 15] },
    "Harmony Conductor": { icon: "harmony_conductor.webp", description: ":val% chance of poisoned enemies to miss attack. Boss chance is halved", values: [15, 20, 25, 30] },
    "Dimension Core": { icon: "dimension_core.webp", description: "Chain lightning have 60% chance of hitting the initial target. Shock chance and multiplier is doubled. If the shock is applied to the same enemy the shock multiplier will add up to a max stack of :val", values: [5, 10, 15, 20] },
    "Multiverse Nexus": { icon: "multiverse_nexus.webp", description: "Death wave, golden tower and black hole will always activate at the same time but the cooldown will be the average of those :val", values: ["+20", "+10", "+1", "-10"] },
    "Magnetic Hook": { icon: "magnetic_hook.png", description: ":val Inner Land Mine(s) are fired at bosses as they enter tower range. 25% of elites have inner land mine(s) fired at them as they enter tower range.", values: [1, 2, 3, 4] },
    "Primordial Collapse": { icon: "primordial_collapse.png", description: "Spawns one additional Black Hole. Damage from enemies within a Black Hole is decreased by :val%", values: [50, 55, 65, 80] },
  },
};

const tiers = new Map();
tiers.set(16, "Ancestral 4*");
tiers.set(14, "Ancestral 3*");
tiers.set(12, "Ancestral 2*");
tiers.set(10, "Ancestral 1*");
tiers.set(8, "Ancestral");
tiers.set(4, "Mythic+");
tiers.set(2, "Legendary");
tiers.set(1, "Epic");

const loadModules = () => {
  const mods = {};

  Object.keys(modules).forEach((k) => {
    Object.keys(modules[k]).forEach((m) => {
      mods[m] = 0;
    });
  });

  localStorage.setItem("modules", JSON.stringify(mods));
};

const getOwnershipInfo = (moduleName) => {
  const moduleCount = JSON.parse(localStorage.getItem("modules"))[moduleName];

  if (moduleCount >= MODULES_COUNT_FOR_MAX) {
    const maxedCount = Math.floor(moduleCount / MODULES_COUNT_FOR_MAX);

    return [
      ["Ancestral 5*", maxedCount],
      ["Epic", moduleCount - maxedCount * MODULES_COUNT_FOR_MAX],
    ];
  }

  const tiersKeys = Array.from(tiers.keys());
  if (tiersKeys.includes(moduleCount)) {
    return [[tiers.get(moduleCount), 1]];
  }

  const getHighestTierValue = tiersKeys.filter((k) => k < moduleCount)[0];

  return getHighestTierValue
    ? [
        [tiers.get(getHighestTierValue), 1],
        ["Epic", moduleCount - getHighestTierValue],
      ]
    : null;
};

const updateStorageContent = () => {
  const stored = JSON.parse(localStorage.getItem("modules"));

  ["Primordial Collapse"].forEach((m) => {
    if (!Object.keys(stored).includes(m)) {
      stored[m] = 0;
    }
  });

  localStorage.setItem("modules", JSON.stringify(stored));
};

const getFirstEntrySubs = (type) => {
  const list = bonuses[type];
  const t = [];

  Object.entries(list).some(([item, data]) => {
    if (data.v[2] !== null) {
      t.push(`${item}_${2}`);
    }

    return t.length === 2;
  });

  return [...t, ...new Array(6).fill(null)];
};

const getFirstEntryForNewPreviewItem = (type) => {
  const module = Object.keys(modules[`${type}s`])[0];

  return {
    name: module,
    icon: modules[`${type}s`][module].icon,
    rank: "Ancestral",
    subs: getFirstEntrySubs(type),
    usedSubs: getFirstEntrySubs(type)
      .filter((item) => item !== null)
      .map((item) => item.split("_")[0]),
  };
};

export { MODULES_COUNT_FOR_MAX, SUBSTAT_SLOTS, modules, loadModules, getOwnershipInfo, updateStorageContent, getFirstEntryForNewPreviewItem };
