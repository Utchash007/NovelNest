import api from "../api";

export const Del_bookmark = async (bookmark_id: number): Promise<boolean> => {
  try {
    const response = await api.delete(`/api/bookmarks/${bookmark_id}`);
    return response.status === 200;
  } catch {
    return false;
  }
};
