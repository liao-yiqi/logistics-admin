/**
 * 防抖函数
 * @param {*} fn 函数体
 * @param {*} delay 时间
 */
export function Debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 500
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  return function (this: unknown, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param {*} fn 函数体
 * @param {*} delay 时间
 */

export function Throttle<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 500
): (...args: Parameters<T>) => void {
  let lastTime = 0
  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}
