import Decimal from "decimal.js";

export const FinancialDecimal = Decimal.clone({
  precision: 40,
  rounding: Decimal.ROUND_HALF_UP,
  toExpNeg: -40,
  toExpPos: 40,
});

export type VndInput = bigint | string | Decimal;

export function toVndDecimal(value: VndInput): Decimal {
  const decimal = new FinancialDecimal(value.toString());

  if (!decimal.isFinite() || !decimal.isInteger()) {
    throw new RangeError("VND values must be finite whole đồng.");
  }

  return decimal;
}

export function toVndBigInt(value: VndInput): bigint {
  return BigInt(toVndDecimal(value).toFixed(0));
}
