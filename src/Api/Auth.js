// auth.js
export const fetchToken = async () => {
    const response = await fetch("https://sandbox.techembryo.com/users/api/user/v1/token", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "X-Channel-Id": "WEB",
        "Project": "TEST",
      },
      body: JSON.stringify({
        name: "harish baby",
        clientId: "Lzf1wrUP24U1IPJYYlhfBBwPikl7y6sX",
        clientSecret: "Ll10zxNhUfChJ65YrEMe6WJagU5QDljD",
        currentTimeMillis: Date.now(),
      }),
    });
    const result = await response.json();
    return result.response.token;
  };

  