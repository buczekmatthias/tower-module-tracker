const modules = {
  cannons: [
    { name: "Astral Deliverance", icon: "ad.webp" },
    { name: "Being Annihilator", icon: "ba.webp" },
    { name: "Death Penalty", icon: "dp.webp" },
    { name: "Havoc Bringer", icon: "hb.webp" },
  ],
  armors: [
    { name: "Anti-Cube Portal", icon: "acp.webp" },
    { name: "Negative Mass Projector", icon: "nmp.webp" },
    { name: "Wormhole Redirector", icon: "whr.webp" },
    { name: "Space Displacer", icon: "sd.webp" },
  ],
  generators: [
    { name: "Singularity Harness", icon: "sh.webp" },
    { name: "Galaxy Compressor", icon: "gc.webp" },
    { name: "Pulsar Harvester", icon: "ph.webp" },
    { name: "Black Hole Digestor", icon: "bhd.webp" },
  ],
  cores: [
    { name: "Om Chip", icon: "om.webp" },
    { name: "Harmony Conductor", icon: "hc.webp" },
    { name: "Dimension Core", icon: "dc.webp" },
    { name: "Multiverse Nexus", icon: "mvn.webp" },
  ],
};

const loadModules = () => {
  const mods = {};

  Object.keys(modules).forEach((k) => {
    modules[k].forEach((m) => {
      mods[m.name] = 0;
    });
  });

  localStorage.setItem("modules", JSON.stringify(mods));
};

export { modules, loadModules };
