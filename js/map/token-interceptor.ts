// const myMap = new Map();

// const setMyToken = (key: string, data: { value: string; expiry: number }) => {
//   const { value, expiry } = data;
//   myMap.set(key, { value, expiry });
// };

// const isMyExpired = () => {
//   const time = myMap.get("token")!;

//   return time?.expiry <= Date.now();
// };

// const getMySessionToken = () => {
//   const time = myMap.get("token")!;

//   if (isMyExpired()) {
//     myMap.clear();
//     console.log("Token has expired");
//     return undefined;
//   }
//   console.log("Token not yet expired");

//   return time?.value;
// };

// setMyToken("token", { value: "kjfdvknkn", expiry: Date.now() + 5000 });

// const res = setInterval(() => {
//   const value = getMySessionToken();
//   console.log(value);
//   interceptor();

//   if (!value) {
//     clearInterval(res);
//   }
// }, 2000);

// const interceptor = async () => {
//   const value = getMySessionToken();

//   if (value) {
//     const res = await Promise.resolve("Hello, how are you?")
//     console.log("Hey", res);
//   } else {
//     console.log("You are logout from app.");
//   }
// };

// GOOD CODE

// --------------------
// Types
// --------------------
type TokenEntry = {
  value: string;
  expiry: number;
};

// --------------------
// Internal Store
// --------------------
const tokenStore = new Map<string, TokenEntry>();
const TOKEN_KEY = "token";

// --------------------
// Token APIs
// --------------------
export const setToken = (value: string, expiresInMs: number): void => {
  tokenStore.set(TOKEN_KEY, {
    value,
    expiry: Date.now() + expiresInMs,
  });
};

const getTokenEntry = (): TokenEntry | undefined => {
  return tokenStore.get(TOKEN_KEY);
};

const isExpired = (entry?: TokenEntry): boolean => {
  if (!entry) return true;
  return Date.now() >= entry.expiry;
};

export const getSessionToken = (): string | undefined => {
  const entry = getTokenEntry();

  if (isExpired(entry)) {
    tokenStore.delete(TOKEN_KEY);
    console.log("Token expired");
    return undefined;
  }

  return entry?.value;
};

// --------------------
// Interceptor (Fetch / Axios style)
// --------------------
export const interceptor = async (): Promise<void> => {
  const token = getSessionToken();

  if (!token) {
    console.log("Logged out from app");
    return;
  }

  // simulate API call
  const response = await Promise.resolve("Hello, how are you?");
  console.log("Authorized:", response);
};

// --------------------
// Demo / Test
// --------------------
setToken("kjfdvknkn", 5000);

const interval = setInterval(async () => {
  await interceptor();

  if (!getSessionToken()) {
    clearInterval(interval);
  }
}, 2000);

