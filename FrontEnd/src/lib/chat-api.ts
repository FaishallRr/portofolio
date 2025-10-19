export interface Chatroom {
  id: string;
  name: string;
  members: string[];
}

export const getChatrooms = async (): Promise<Chatroom[]> => {
  const res = await fetch("/api/chatrooms");
  if (!res.ok) throw new Error("Gagal ambil chatrooms");
  return res.json();
};

export const createChatroom = async (
  name: string,
  members: string[]
): Promise<Chatroom> => {
  const res = await fetch("/api/chatrooms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, members }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Response error:", errText);
    throw new Error("Gagal buat chatroom");
  }

  return res.json();
};
