export type Json = boolean | null | number | string | { [key: string]: Json | undefined } | Json[];

/**
 * Placeholder until Milestone 1 generates types from the migrated local database.
 * Only the exposed `api` schema belongs in browser-facing generated types.
 */
export interface Database {
  api: {
    CompositeTypes: Record<string, never>;
    Enums: Record<string, never>;
    Functions: Record<string, never>;
    Tables: Record<string, never>;
    Views: Record<string, never>;
  };
}
