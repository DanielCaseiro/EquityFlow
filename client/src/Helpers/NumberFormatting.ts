const formatLargeNumber = (value: number): string => {
  const abs = Math.abs(value);

  let formatted: string;

  if (abs < 1_000) {
    formatted = abs.toString();
  } else if (abs < 1_000_000) {
    formatted = (abs / 1_000).toFixed(1) + "K";
  } else if (abs < 1_000_000_000) {
    formatted = (abs / 1_000_000).toFixed(1) + "M";
  } else if (abs < 1_000_000_000_000) {
    formatted = (abs / 1_000_000_000).toFixed(1) + "B";
  } else {
    formatted = (abs / 1_000_000_000_000).toFixed(1) + "T";
  }

  return value < 0 ? "-" + formatted : formatted;
};

export const formatLargeMonetaryNumber = (value: number): string => {
  return "$" + formatLargeNumber(value);
};

export const formatLargeNonMonetaryNumber = (value: number): string => {
  return formatLargeNumber(value);
};

export const formatRatio = (ratio: number): string => {
  return (Math.round(ratio * 100) / 100).toFixed(2);
};