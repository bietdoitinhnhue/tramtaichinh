export type FormulaUnit = "days" | "months" | "ratio" | "vnd" | "years";

export interface FormulaMetadata {
  readonly assumptions: readonly string[];
  readonly formulaVersion: `${number}.${number}.${number}`;
  readonly units: Readonly<Record<string, FormulaUnit>>;
}

export function defineFormulaMetadata<const TMetadata extends FormulaMetadata>(
  metadata: TMetadata,
): TMetadata {
  return Object.freeze({
    ...metadata,
    assumptions: Object.freeze([...metadata.assumptions]),
    units: Object.freeze({ ...metadata.units }),
  }) as TMetadata;
}
