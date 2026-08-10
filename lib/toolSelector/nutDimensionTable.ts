/**
 * Hex nut dimensions (across-flats, height) by metric bolt size, ported
 * verbatim from the standalone BTL fitment-check tool's NUT_DIM table.
 *
 * Across-corners (AC) is display-only — verified against the source tool's
 * runCheck() that no fitment rule actually consumes AC, only AF/height.
 */

export interface NutDimension {
  afMm: number;
  heightMm: number;
}

export const NUT_DIMENSIONS: Record<string, NutDimension> = {
  M16: { afMm: 24, heightMm: 14 },
  M18: { afMm: 27, heightMm: 15 },
  M20: { afMm: 30, heightMm: 18 },
  M22: { afMm: 32, heightMm: 19 },
  M24: { afMm: 36, heightMm: 22 },
  M27: { afMm: 41, heightMm: 25 },
  M30: { afMm: 46, heightMm: 28 },
  M33: { afMm: 50, heightMm: 30 },
  M36: { afMm: 55, heightMm: 33 },
  M39: { afMm: 60, heightMm: 36 },
  M42: { afMm: 65, heightMm: 39 },
  M45: { afMm: 70, heightMm: 42 },
  M48: { afMm: 75, heightMm: 44 },
  M52: { afMm: 80, heightMm: 48 },
  M56: { afMm: 85, heightMm: 52 },
  M60: { afMm: 90, heightMm: 55 },
  M64: { afMm: 95, heightMm: 58 },
  M68: { afMm: 100, heightMm: 62 },
  M72: { afMm: 105, heightMm: 65 },
  M76: { afMm: 110, heightMm: 68 },
  M80: { afMm: 115, heightMm: 72 },
  M85: { afMm: 120, heightMm: 76 },
  M90: { afMm: 130, heightMm: 82 },
  M95: { afMm: 135, heightMm: 86 },
  M100: { afMm: 145, heightMm: 90 },
  M105: { afMm: 150, heightMm: 95 },
  M110: { afMm: 155, heightMm: 98 },
  M120: { afMm: 170, heightMm: 108 },
  M125: { afMm: 175, heightMm: 112 },
  M130: { afMm: 180, heightMm: 116 },
  M140: { afMm: 195, heightMm: 125 },
  M150: { afMm: 210, heightMm: 135 },
};

export function getNutDimension(boltSize: string): NutDimension | undefined {
  return NUT_DIMENSIONS[boltSize];
}

/** AC = AF x 2/sqrt(3), rounded up. Display-only — see file header. */
export function afToAc(afMm: number): number {
  return Math.ceil(afMm * 1.1547);
}
