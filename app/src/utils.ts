export const getIntNumberFromQueryParamOrUseDefault =
  (defaultValue: number, minValue: number, maxValue: number) =>
  (valueParam: string | null) => {
    if (valueParam === null) {
      return defaultValue;
    }
    const value = Number(valueParam);
    if (
      Number.isNaN(value) ||
      !Number.isInteger(value) ||
      value < minValue ||
      value > maxValue
    ) {
      return defaultValue;
    }
    return value;
  };

export const getBooleanFromQueryParamOrUseDefault =
  (defaultValue: boolean) => (valueParam: string | null) =>
    valueParam === null ? false : valueParam === 'true';
