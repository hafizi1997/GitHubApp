
const getDate10DaysAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 10);

  return date.toISOString().split("T")[0]; 
};
const DATE_10_DAYS_AGO = getDate10DaysAgo(); // Format: YYYY-MM-DD and get the date 10 days ago
const BASE_URL = 'https://api.github.com/search/repositories';

/**
 * Fetches the most starred Github repositories created in the last 10 days.
 * @param {number} page The page number to fetch.
 * @returns {Promise<{items: Array<Object>, total_count: number}>}
 */
export const fetchRepos = async (page = 1) => {
  const query = `created:>${DATE_10_DAYS_AGO}`;
  const url = `${BASE_URL}?q=${query}&sort=stars&order=desc&page=${page}&per_page=30`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ message: 'No body' }));
      throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorBody.message || response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
};
