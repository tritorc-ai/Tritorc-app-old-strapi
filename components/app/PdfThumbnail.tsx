// A generated "stacked paper, folded corner" thumbnail for catalogues that
// have no real preview image — color is derived from the title so the same
// PDF always renders the same accent, and the grid reads as a colorful
// mosaic instead of a wall of identical gray placeholders.
const PALETTE = ["#d6312f", "#2563eb", "#7c3aed", "#d97706", "#0d9488", "#db2777", "#4f46e5"];

function hashColor(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

export function PdfThumbnail({ title }: { title: string }) {
  const color = hashColor(title);

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: `${color}0d` }}
    >
      <div
        className="absolute h-14 w-11 rounded-[3px]"
        style={{ background: `${color}40`, transform: "rotate(9deg) translate(5px, 3px)" }}
      />
      <div className="relative h-14 w-11 -rotate-6 rounded-[3px] bg-white shadow-[0_4px_10px_rgba(0,0,0,.18)]">
        <div
          className="absolute right-0 top-0 h-0 w-0"
          style={{
            borderStyle: "solid",
            borderWidth: "0 9px 9px 0",
            borderColor: `transparent ${color}55 transparent transparent`,
          }}
        />
        <div className="absolute inset-x-1.5 top-4 flex flex-col gap-1">
          <div className="h-0.5 rounded-full bg-black/10" />
          <div className="h-0.5 w-4/5 rounded-full bg-black/10" />
          <div className="h-0.5 w-3/5 rounded-full bg-black/10" />
        </div>
        <div
          className="absolute bottom-1 left-1 rounded-[2px] px-1 py-px text-[6px] font-black tracking-wide text-white"
          style={{ background: color }}
        >
          PDF
        </div>
      </div>
    </div>
  );
}
