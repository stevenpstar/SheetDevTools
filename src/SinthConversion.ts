import type { lMeasure, lNote } from "../modules/sheet/entry.d.mts";
import { type Note as SNote } from "../modules/sinth/main.mjs";
import { 
  ReturnMidiNumber,
} from "../modules/sheet/entry.mjs";


export function ConvertToSinthNotes(measures: lMeasure[]): SNote[] {
  const sinthNotes: SNote[] = [];

  let runningBeat = 0;
  measures.forEach((m: lMeasure) => {
    m.Notes.forEach((n: lNote) => {
      const clef = m.Clefs.find((c) => c.Staff === n.Staff);
      if (!clef) {
        return;
      }
      const clefString = clef.Type;
      sinthNotes.push(
        {
          Beat: runningBeat + n.Beat,
          Duration: n.Duration * 4,
          MidiNote: ReturnMidiNumber(clefString, n.Line),
        }
      );
    });
    // TODO: This is not final
    runningBeat += m.TimeSignature.top;
  });

  return sinthNotes;
}
