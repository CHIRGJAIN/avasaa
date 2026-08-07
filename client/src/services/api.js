const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

/**
 * Fetches the Instagram feed from our Express proxy.
 */
export const getInstagramPhotos = async () => {
  try {
    const response = await fetch(`${API_URL}/api/instagram/photos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to query Instagram photos endpoint:", error);
    throw error;
  }
};
