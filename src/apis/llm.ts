export const convertTIL = async (content: string) => {
  const res = await fetch("/api/v1/summation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
  });
  const data = await res.json();

  return data;
};
