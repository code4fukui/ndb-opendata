const find = (data, key) => {
  const keys = key.split(" ");
  const check = (d) => {
    for (const k of keys) {
      if (Array.isArray(d)) {
        for (const i of d) {
          if (check(i)) return true;
        }
      } else if (typeof d == "object") {
        for (const name in d) {
          if (check(d[name])) return true;
        }
      } else if (typeof d == "string") {
        if (d.indexOf(k) >= 0) {
          return true;
        }
      } else {
        return false;
      }
    }
    return false;
  };
  return check(data);
};

export const ObjectUtil = { find };
