const map = new Map<string, number>();

const setToken = (key: string, expiry: number) => {
  map.set(key, expiry);
};

const isExpired = () => {
  const time = map.get("token")!;

  return time <= Date.now();
};

const getSessionToken = () => {
  const time = map.get("token")!;

  if (isExpired()) {
    map.clear();
    console.log("Token has expired");
    return undefined;
  }
  console.log("Token not yet expired");

  return time;
};

setToken("token", Date.now() + 5000);

const id = setInterval(() => {
  const time = getSessionToken();
  if (!time) {
    clearInterval(id);
  }
}, 2000);
