type NestedObject = { [key: string]: string | number | boolean | NestedObject };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TargetObject = { [key: string]: string | number | boolean | any[] };

export const flattenObject = (obj: NestedObject) => {
  return Object.entries(obj).reduce((acc: TargetObject, [key, value]) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      // Recursively flatten nested objects
      const flat = flattenObject(value);
      for (const subKey in flat) {
        const subValue = flat[subKey];
        // Add non-undefined values to the accumulator
        if (subValue !== undefined) {
          acc[subKey] = subValue;
        }
      }
    } else {
      // Only add non-undefined, non-array values to the accumulator
      acc[key] = value;
    }
    return acc;
  }, {});
};
