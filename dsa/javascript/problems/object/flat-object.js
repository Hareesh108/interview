Object.prototype.extra = "oops";

const obj = {
  user: {
    name: "Hareesh",
    address: {
      city: "Bangalore",
      pin: 560001,
    },
  },
  isActive: true,
};

const flattenObject = (obj, parentKey = "", result = {}) => {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const newKey = parentKey ? `${parentKey}.${key}` : key;
    const value = obj[key];

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }

  return result;
};

console.log(flattenObject(obj));

