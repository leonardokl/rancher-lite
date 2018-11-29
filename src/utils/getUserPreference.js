function getUserPreference(userPreferences, name) {
  const userPreference = userPreferences.data.find(i => i.name === name);

  try {
    return JSON.parse(userPreference.value);
  } catch (ex) {
    return undefined;
  }
}

export default getUserPreference;
