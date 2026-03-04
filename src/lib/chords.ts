// Guitar chord dictionary: chord name -> fingering pattern (low E to high E)
// x = muted, 0 = open, numbers = fret positions
export const guitarChords: Record<string, string> = {
  // Major
  A: "x02220",
  B: "x24442",
  C: "x32010",
  D: "xx0232",
  E: "022100",
  F: "133211",
  G: "320003",

  // Sharp/Flat Major
  "A#": "x13331",
  Bb: "x13331",
  "C#": "x46664",
  Db: "x46664",
  "D#": "x68886",
  Eb: "x68886",
  "F#": "244322",
  Gb: "244322",
  "G#": "466544",
  Ab: "466544",

  // Minor
  Am: "x02210",
  Bm: "x24432",
  Cm: "x35543",
  Dm: "xx0231",
  Em: "022000",
  Fm: "133111",
  Gm: "355333",

  // Sharp/Flat Minor
  "A#m": "x13321",
  Bbm: "x13321",
  "C#m": "x46654",
  Dbm: "x46654",
  "D#m": "x68876",
  Ebm: "x68876",
  "F#m": "244222",
  Gbm: "244222",
  "G#m": "466444",
  Abm: "466444",

  // 7th
  A7: "x02020",
  B7: "x21202",
  C7: "x32310",
  D7: "xx0212",
  E7: "020100",
  F7: "131211",
  G7: "320001",

  // Minor 7th
  Am7: "x02010",
  Bm7: "x20202",
  Cm7: "x35343",
  Dm7: "xx0211",
  Em7: "022030",
  Fm7: "131111",
  Gm7: "353333",

  // Major 7th
  Amaj7: "x02120",
  Bmaj7: "x24342",
  Cmaj7: "x32000",
  Dmaj7: "xx0222",
  Emaj7: "021100",
  Fmaj7: "1x2210",
  Gmaj7: "320002",

  // Sus2
  Asus2: "x02200",
  Bsus2: "x24422",
  Csus2: "x30013",
  Dsus2: "xx0230",
  Esus2: "024400",
  Fsus2: "x03011",
  Gsus2: "300033",

  // Sus4
  Asus4: "x02230",
  Bsus4: "x24452",
  Csus4: "x33011",
  Dsus4: "xx0233",
  Esus4: "022200",
  Fsus4: "133311",
  Gsus4: "330013",

  // Add9
  Aadd9: "x02420",
  Cadd9: "x32030",
  Dadd9: "xx0230",
  Eadd9: "024100",
  Gadd9: "320203",

  // Diminished
  Adim: "x0121x",
  Bdim: "x2343x",
  Cdim: "x3454x",
  Ddim: "xx0131",
  Edim: "0120xx",

  // Augmented
  Aaug: "x03221",
  Caug: "x32110",
  Eaug: "032110",

  // Power chords
  A5: "x022xx",
  B5: "x244xx",
  C5: "x355xx",
  D5: "xx023x",
  E5: "022xxx",
  F5: "133xxx",
  G5: "355xxx",

  // Common slash chords
  "C/B": "x22010",
  "C/G": "332010",
  "D/F#": "200232",
  "G/B": "x20003",
  "G/F#": "220003",
  "Am/G": "302210",
  "Am/E": "002210",
  "Em/B": "x22000",
  "F/C": "x33211",

  // 9th chords
  A9: "x02100",
  C9: "x32330",
  D9: "x54530",
  E9: "020102",
  G9: "300201",

  // 6th chords
  A6: "x02222",
  C6: "x32210",
  D6: "xx0202",
  E6: "022120",
  G6: "320000",

  // Minor 6th
  Am6: "x02212",
  Dm6: "xx0201",
  Em6: "022020",

  // 11th
  A11: "x00000",
  G11: "3x0211",

  // Common variations
  "Em7*": "022033",
  Cadd9_alt: "x32033",
};

// Ukulele chord dictionary: chord name -> fingering pattern (G C E A)
export const ukuleleChords: Record<string, string> = {
  // Major
  A: "2100",
  B: "4322",
  C: "0003",
  D: "2220",
  E: "4442",
  F: "2010",
  G: "0232",

  // Sharp/Flat Major
  "A#": "3211",
  Bb: "3211",
  "C#": "1114",
  Db: "1114",
  "D#": "0331",
  Eb: "0331",
  "F#": "3121",
  Gb: "3121",
  "G#": "5343",
  Ab: "5343",

  // Minor
  Am: "2000",
  Bm: "4222",
  Cm: "0333",
  Dm: "2210",
  Em: "0432",
  Fm: "1013",
  Gm: "0231",

  // Sharp/Flat Minor
  "A#m": "3111",
  Bbm: "3111",
  "C#m": "1444",
  Dbm: "1444",
  "D#m": "3321",
  Ebm: "3321",
  "F#m": "2120",
  Gbm: "2120",
  "G#m": "4342",
  Abm: "4342",

  // 7th
  A7: "0100",
  B7: "2322",
  C7: "0001",
  D7: "2223",
  E7: "1202",
  F7: "2313",
  G7: "0212",

  // Minor 7th
  Am7: "0000",
  Bm7: "2222",
  Cm7: "3333",
  Dm7: "2213",
  Em7: "0202",
  Fm7: "1313",
  Gm7: "0211",

  // Major 7th
  Amaj7: "1100",
  Bmaj7: "3322",
  Cmaj7: "0002",
  Dmaj7: "2224",
  Emaj7: "1302",
  Fmaj7: "2410",
  Gmaj7: "0222",

  // Sus2
  Asus2: "2400",
  Csus2: "0233",
  Dsus2: "2200",
  Fsus2: "0011",
  Gsus2: "0230",

  // Sus4
  Asus4: "2200",
  Csus4: "0013",
  Dsus4: "0230",
  Fsus4: "3011",
  Gsus4: "0233",

  // Add9
  Cadd9: "0203",
  Gadd9: "0232",

  // Diminished
  Adim: "2323",
  Bdim: "4535",
  Cdim: "0101",
  Ddim: "2323",
  Edim: "0101",

  // Augmented
  Aaug: "2110",
  Caug: "1003",
  Eaug: "1003",
};

// Greedy regex to match a single chord token from the start of a string.
// Order matters: longer modifiers first so "maj7" matches before "m".
const SINGLE_CHORD =
  /^[A-G][#b]?(?:maj7|min7|maj|min|add[249]|sus[24]|dim|aug|m7|m6|m9|m|7|9|11|13|6|5)?(?:\/[A-G][#b]?)?/;

/**
 * Splits a token like "GAmD7G7" into "G Am D7 G7".
 * Returns the original token if it can't be fully parsed as chords.
 */
function splitConcatenatedChords(token: string): string {
  const parts: string[] = [];
  let remaining = token;

  while (remaining.length > 0) {
    const match = SINGLE_CHORD.exec(remaining);
    if (match) {
      parts.push(match[0]);
      remaining = remaining.slice(match[0].length);
    } else {
      // Remaining text isn't a chord — return original token unchanged
      // (handles section labels like "Chorus", "Bridge", etc.)
      return token;
    }
  }

  return parts.length > 1 ? parts.join(" ") : token;
}

/**
 * Auto-spaces concatenated chords in each line of the input.
 * "CCFC" → "C C F C", "GAmD7G7" → "G Am D7 G7"
 * Leaves already-spaced text and section labels untouched.
 */
export function autoSpaceChords(text: string): string {
  return text
    .split("\n")
    .map((line) => {
      // Split on existing whitespace, preserving it
      return line
        .split(/(\s+)/)
        .map((segment) => {
          if (/^\s*$/.test(segment)) return segment;
          return splitConcatenatedChords(segment);
        })
        .join("");
    })
    .join("\n");
}

export function extractChordNames(chordsText: string): string[] {
  const spaced = autoSpaceChords(chordsText);
  const chords = new Set<string>();

  for (const line of spaced.split("\n")) {
    const tokens = line.trim().split(/\s+/);
    for (const token of tokens) {
      if (SINGLE_CHORD.test(token) && token === SINGLE_CHORD.exec(token)?.[0]) {
        chords.add(token);
      }
    }
  }

  return Array.from(chords);
}

export function getChordFingerings(
  chordNames: string[],
  instrument: "guitar" | "ukulele"
): Record<string, string> {
  const dict = instrument === "guitar" ? guitarChords : ukuleleChords;
  const result: Record<string, string> = {};

  for (const name of chordNames) {
    if (dict[name]) {
      result[name] = dict[name];
    }
  }

  return result;
}

export function getAllChords(
  instrument: "guitar" | "ukulele"
): Record<string, string> {
  return instrument === "guitar" ? { ...guitarChords } : { ...ukuleleChords };
}
