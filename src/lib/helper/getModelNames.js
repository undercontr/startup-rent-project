export default function getModelNames(client) {
  const mappings = client._dmmf.mappingsMap;
  const keys = Object.keys(mappings);

  return {
    lower: keys.map((model) => model.toLowerCase()),
    regular: keys,
    plural: keys.map((e) => mappings[e].plural),
    search: function (modelName) {
      const lowerModel = modelName.toLowerCase();
      if (this.lower.includes(lowerModel)) {
        return {
          lower: lowerModel,
          regular: this.regular.find((e) => e.toLowerCase() == lowerModel),
          plural:
            mappings[
              Object.keys(mappings).find(
                (key) => key.toLowerCase() === lowerModel
              )
            ].plural,
        };
      } else {
        return { lower: "", regular: "", plural: "" };
      }
    },
    searchInPlural: function(pluralModelName) {
        const lowerModel = pluralModelName.toLowerCase();
        if (this.plural.includes(lowerModel)) {
            return {
                lower: keys.find((e) => mappings[e].plural == pluralModelName).toLowerCase(),
                regular: keys.find((e) => mappings[e].plural == pluralModelName),
                plural: lowerModel
            } 
        } else {
            return {lower: "", regular: "", plural: ""}
        }
    },
    isPlural: function(pluralModelName) {
        return !!this.plural.includes(pluralModelName.toLowerCase())
    }
  };
}
