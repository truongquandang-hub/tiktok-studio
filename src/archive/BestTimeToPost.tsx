import { Clock, Flame, Star, TrendingUp, Zap } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Mock engagement data (0–100 scale)                                 */
/*  Rows: Mon(0)→Sun(6)  ·  Cols: 6-9h, 9-12h, 12-15h, 15-18h,      */
/*         18-21h, 21-24h                                              */
/*  Evenings (18-21h col-index 4) on Tue/Thu/Sat are highest           */
/* ------------------------------------------------------------------ */
const engagementData: number[][] = [
  /* Thứ 2 (Mon) */ [12, 25, 35, 40, 55, 30],
  /* Thứ 3 (Tue) */ [10, 30, 42, 50, 95, 38],
  /* Thứ 4 (Wed) */ [14, 28, 38, 45, 60, 32],
  /* Thứ 5 (Thu) */ [11, 32, 44, 52, 92, 40],
  /* Thứ 6 (Fri) */ [15, 35, 48, 55, 72, 45],
  /* Thứ 7 (Sat) */ [18, 40, 50, 58, 98, 52],
  /* CN   (Sun)  */ [20, 38, 46, 50, 68, 42],
];

const dayLabels = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
const timeLabels = ["6–9h", "9–12h", "12–15h", "15–18h", "18–21h", "21–24h"];

/* Golden-hour threshold */
const GOLDEN_THRESHOLD = 88;

/* ------------------------------------------------------------------ */
/*  Colour helpers – pink / rose ramp                                  */
/* ------------------------------------------------------------------ */
function cellClasses(value: number) {
  if (value >= 90) return "bg-rose-600 text-white";
  if (value >= 75) return "bg-rose-500 text-white";
  if (value >= 60) return "bg-rose-400 text-white";
  if (value >= 45) return "bg-rose-300 text-rose-900";
  if (value >= 30) return "bg-rose-200 text-rose-800";
  if (value >= 15) return "bg-rose-100 text-rose-700";
  return "bg-rose-50 text-rose-500";
}

/* ------------------------------------------------------------------ */
/*  Top-3 best posting times                                           */
/* ------------------------------------------------------------------ */
interface BestSlot {
  day: string;
  time: string;
  value: number;
}

function getTopSlots(n: number): BestSlot[] {
  const flat: BestSlot[] = [];
  engagementData.forEach((row, ri) =>
    row.forEach((v, ci) => flat.push({ day: dayLabels[ri], time: timeLabels[ci], value: v })),
  );
  return flat.sort((a, b) => b.value - a.value).slice(0, n);
}

const topSlots = getTopSlots(3);

const rankEmojis = [
  <Flame key="1" className="size-5 text-amber-500" />,
  <Star key="2" className="size-5 text-yellow-400" />,
  <TrendingUp key="3" className="size-5 text-rose-400" />,
];

/* ------------------------------------------------------------------ */
/*  Legend stops                                                       */
/* ------------------------------------------------------------------ */
const legendStops = [
  { label: "Thấp", cls: "bg-rose-50" },
  { label: "", cls: "bg-rose-100" },
  { label: "", cls: "bg-rose-200" },
  { label: "TB", cls: "bg-rose-300" },
  { label: "", cls: "bg-rose-400" },
  { label: "", cls: "bg-rose-500" },
  { label: "Cao", cls: "bg-rose-600" },
];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
export const BestTimeToPost = () => {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      {/* -------- Card -------- */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-sm">
            <Clock className="size-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Khung Giờ Vàng Đăng Bài TikTok
            </h2>
            <p className="text-sm text-slate-500">Best Time to Post</p>
          </div>
        </div>

        {/* Heatmap grid */}
        <div className="overflow-x-auto px-6 pt-5 pb-2">
          <table className="w-full min-w-[480px] border-separate border-spacing-1">
            <thead>
              <tr>
                <th className="w-16" />
                {timeLabels.map((t) => (
                  <th
                    key={t}
                    className="pb-2 text-center text-xs font-medium text-slate-500"
                  >
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {engagementData.map((row, ri) => (
                <tr key={ri}>
                  <td className="pr-2 text-right text-xs font-medium text-slate-600 whitespace-nowrap">
                    {dayLabels[ri]}
                  </td>
                  {row.map((val, ci) => {
                    const isGolden = val >= GOLDEN_THRESHOLD;
                    return (
                      <td key={ci} className="p-0">
                        <div
                          className={`
                            flex aspect-[2/1] items-center justify-center rounded-lg text-xs font-semibold
                            transition-transform duration-200 hover:scale-110 hover:z-10
                            ${cellClasses(val)}
                            ${isGolden ? "ring-2 ring-amber-400 ring-offset-1 shadow-[0_0_12px_rgba(251,191,36,0.45)]" : ""}
                          `}
                          title={`${dayLabels[ri]} ${timeLabels[ci]}: ${val}%`}
                        >
                          {isGolden && <Zap className="mr-0.5 size-3" />}
                          {val}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-2 px-6 pt-1 pb-5">
          <span className="mr-1 text-xs text-slate-400">Mức tương tác:</span>
          {legendStops.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <div className={`h-3 w-6 rounded ${s.cls}`} />
              {s.label && (
                <span className="text-[10px] text-slate-400">{s.label}</span>
              )}
            </div>
          ))}
          <div className="ml-3 flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] text-amber-700">
            <Zap className="size-3" />
            Giờ vàng
          </div>
        </div>
      </div>

      {/* -------- Top 3 summary card -------- */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs">
        <div className="px-6 pt-5 pb-1">
          <h3 className="text-sm font-semibold text-slate-700">
            🏆 Top 3 khung giờ tốt nhất
          </h3>
        </div>
        <div className="grid gap-3 px-6 pb-5 sm:grid-cols-3">
          {topSlots.map((slot, i) => (
            <div
              key={i}
              className={`
                flex items-center gap-3 rounded-xl border px-4 py-3
                ${i === 0 ? "border-amber-200 bg-gradient-to-br from-amber-50 to-rose-50 shadow-2xs" : "border-slate-100 bg-slate-50"}
              `}
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-2xs">
                {rankEmojis[i]}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {slot.day}, {slot.time}
                </p>
                <p className="text-xs text-slate-500">
                  Tương tác: <span className="font-semibold text-rose-600">{slot.value}%</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
