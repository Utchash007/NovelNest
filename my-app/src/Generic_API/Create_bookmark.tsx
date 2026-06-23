import api from "../api";

export const Create_bookmark = async (user_id: number, novel_id: string): Promise<boolean> => {
  try {
    const response = await api.post("/api/bookmarks", {
      novelId: novel_id,
      chapterNo: 1, // Fallback starting chapter
    });
    return response.status === 201 || response.status === 200;
  } catch {
    return false;
  }
};
