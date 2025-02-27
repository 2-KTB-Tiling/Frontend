import instance from "./@core/instance";

export const login = (code: string) => {
  return instance.post("/auth/github", {
    code,
  });
};
