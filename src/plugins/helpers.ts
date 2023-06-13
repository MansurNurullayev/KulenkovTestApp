export function debounce<T extends Function>(cb: T, wait = 150) {
  let timeout: ReturnType<typeof setTimeout>;
  const callable = (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args), wait);
  };
  return <T>(<any>callable);
}
