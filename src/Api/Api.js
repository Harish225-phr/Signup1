export const makePostRequest = async (url, data, token) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // Corrected
      "X-Channel-Id": "WEB",
      "Project": "TEST",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};
