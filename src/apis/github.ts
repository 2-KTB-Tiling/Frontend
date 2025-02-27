import instance from "./@core/instance";

export const setRepoUrl = async (url: string) => {
  const data = await instance.post("/parse/github-url", {
    repository_url: url,
  });

  return data;
};

export const deployTIL = async (content: string, commit_message: string) => {
  const data = await instance.post("/upload/github", {
    content,
    commit_message,
  });

  return data;
};
