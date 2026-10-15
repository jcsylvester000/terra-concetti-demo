/**
 * Bento gallery cell sizing on a 2-column (mobile) / 4-column (md+) grid.
 * The first image is the large 2×2 cell; the last image stretches across two columns when the
 * small cells would otherwise leave a gap, so the grid never ends with an empty slot.
 */
export function galleryCellClass(count: number, i: number) {
  if (count === 1) return "col-span-2 md:col-span-4 aspect-[16/9] md:aspect-[21/9]";
  if (count === 2) return "col-span-2 aspect-[16/10]";
  if (i === 0) return "col-span-2 row-span-2 aspect-square md:aspect-auto";
  const small = count - 1;
  if (i === count - 1 && small % 2 === 1) return "col-span-2 aspect-[8/3]";
  return "aspect-[4/3]";
}
