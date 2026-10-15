import { priceLabel, type UnitType } from "@/content/unit-types";

/** Residences table: real HTML table; scrolls inside its own wrapper on small screens (P06-AC3). */
export function UnitTable({ units, showPrices, caption }: { units: UnitType[]; showPrices: boolean; caption: string }) {
  const showExtra = units.some((u) => u.extra);
  return (
    <div className="overflow-x-auto rounded-[6px] ring-1 ring-line" tabIndex={0} role="region" aria-label={caption}>
      <table className="w-full min-w-[640px] border-collapse bg-shell text-left text-[15px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-moss text-shell">
            <th scope="col" className="px-4 py-3 font-semibold">Residence</th>
            <th scope="col" className="px-4 py-3 font-semibold">Bedrooms</th>
            <th scope="col" className="px-4 py-3 font-semibold">Floor area</th>
            {showExtra ? <th scope="col" className="px-4 py-3 font-semibold">Notes</th> : null}
            <th scope="col" className="px-4 py-3 text-right font-semibold">Homes</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">Price</th>
          </tr>
        </thead>
        <tbody>
          {units.map((u, i) => (
            <tr key={u.name + u.group} className={i % 2 ? "bg-linen/50" : undefined}>
              <th scope="row" className="px-4 py-3 font-semibold">
                <span className="block text-[12px] font-normal text-driftwood">{u.group}</span>
                {u.name}
              </th>
              <td className="px-4 py-3">{u.bedrooms}</td>
              <td className="px-4 py-3 tabular-nums">{u.floorArea}</td>
              {showExtra ? <td className="px-4 py-3 text-driftwood">{u.extra ?? ""}</td> : null}
              <td className="px-4 py-3 text-right tabular-nums">{u.count}</td>
              <td className="px-4 py-3 text-right">{priceLabel(u, showPrices)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-line">
            <th scope="row" className="px-4 py-3 font-semibold" colSpan={showExtra ? 4 : 3}>Total</th>
            <td className="px-4 py-3 text-right font-semibold tabular-nums">{units.reduce((n, u) => n + u.count, 0)}</td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
