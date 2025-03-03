export default () => {
  const stats = {
    gems_spent: 0,
    mods: {
      common: 0,
      rare: 0,
      epic: 0,
    },
  };

  localStorage.setItem("stats", JSON.stringify(stats));
};
