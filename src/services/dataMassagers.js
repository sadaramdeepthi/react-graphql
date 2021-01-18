export const topLanguages = (repositories) => {
  const langObject = repositories.nodes.reduce((langs, { languages }) => {
    return languages.nodes.reduce((repLangs, { name, color }) => {
      if (!repLangs[name]) {
        repLangs[name] = { count: 0, color };
      }
      repLangs[name].count += 1;
      return repLangs;
    }, langs);
  }, {});

  const langArray = formatLanguagesForChart(langObject);

  return langArray.sort((a, b) => b.value - a.value).slice(0, 5);
};

const entries = (object) =>
  Object.keys(object).map((key) => [key, object[key]]);

const formatLanguagesForChart = (langObject) =>
  entries(langObject)
    .map(([key, { count, color }]) => ({
      id: key,
      label: key,
      value: count,
      color,
    }))
    .filter((data) => data.color && data.value > 1);
