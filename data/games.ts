// Logic to fetch games data from the static JSON file
export const fetchGames = async () => {
  try {
    const response = await fetch('./data/games.json');
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        return data;
      }
    }
  } catch (err) {
    console.error("Failed to fetch games data:", err);
  }
  
  // Return an empty array as fallback if fetch fails
  return [];
};
