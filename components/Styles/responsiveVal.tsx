/**
 * This will create a css value that sizes based on the viewport width.
 *
 * E.g.: `responsiveVal(16, 22)` -> Will render 16px at 320px window width, 22 ad 1280 window width
 */
export default function responsiveVal(min: number, max: number, axis: 'vw' | 'vh' = 'vw'): string {
  const round = (x: number, n: number): number => Math.round(x * 10 ** n) / 10 ** n

  const minBreakpoint = axis === 'vw' ? 320 : 560
  const maxBreakpoint = axis === 'vw' ? 1280 : 720
  const growth = (max - min) / (maxBreakpoint - minBreakpoint)
  const base = round(min - growth * minBreakpoint, 2)
  const vsize = round(growth * 100, 2)

  const calc = `(${base}px + ${vsize}${axis})`
  return `max(${min}px, min(${calc}, ${max}px))`
}