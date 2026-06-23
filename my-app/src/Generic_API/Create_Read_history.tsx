import api from "../api";

export const create_read = async (
  novel_id: string,
  cpt_no: number
): Promise<boolean> => {
  try {
    const response = await api.post("/api/user_history", {
      novelId: novel_id,
      chapterNo: cpt_no,
    });
    return response.status === 201 || response.status === 200;
  } catch {
    return false;
  }
};
