
export const fetchGames = async () => {
  try {
    const response = await fetch('./data/games.json');
    if (!response.ok) throw new Error('Failed to load games data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};
