const myMap = new Map();

const setMyToken = (key: string, data: { value: string; expiry: number }) => {
  const { value, expiry } = data;
  myMap.set(key, { value, expiry });
};

const isMyExpired = () => {
  const time = myMap.get("token")!;

  return time?.expiry <= Date.now();
};

const getMySessionToken = () => {
  const time = myMap.get("token")!;

  if (isMyExpired()) {
    myMap.clear();
    console.log("Token has expired");
    return undefined;
  }
  console.log("Token not yet expired");

  return time?.value;
};

setMyToken("token", { value: "kjfdvknkn", expiry: Date.now() + 5000 });

const res = setInterval(() => {
  const value = getMySessionToken();
  console.log(value);
  interceptor();

  if (!value) {
    clearInterval(res);
  }
}, 2000);

const interceptor = async () => {
  const value = getMySessionToken();

  if (value) {
    const res = await Promise.resolve("Hello, how are you?")
    console.log("Hey", res);
  } else {
    console.log("You are logout from app.");
  }
};
