import { LoginResponse } from "../types/auth";
import instance from "./@core/instance";

export const login = async (code: string): Promise<LoginResponse> => {
  const data = await instance.post("/auth/github", {
    code,
  });

  return data.data;
};
