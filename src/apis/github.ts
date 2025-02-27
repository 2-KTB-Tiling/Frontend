import instance from "./@core/instance";

export const setRepoUrl = async (url: string) => {
  const data = await instance.post("/parse/github-url", {
    repository_url: url,
  });

  return data;
};
