import { Chat } from "../types/chat";

export const getAllChats = () => {
  return JSON.parse(localStorage.getItem("chats") || "[]");
};

export const addChat = (newChat: Chat) => {
  const allChats = JSON.parse(localStorage.getItem("chats") || "[]");
  const updatedChats = [...allChats, newChat];

  localStorage.setItem("chats", JSON.stringify(updatedChats));
};
