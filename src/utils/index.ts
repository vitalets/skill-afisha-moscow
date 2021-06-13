/**
 * Shorten long string: XXXX -> XXX...XXX
 */
export function shorten(str: string, maxLength: number) {
  return str && str.length > maxLength
    ? `${str.substr(0, maxLength / 2)}... ...${str.substr(-maxLength / 2)}`
    : str;
}

/**
 * Returns regexp for separate word with russian letters (wraps with non-letters).
 */
export function makeWordRegexp(str: string, flags = '') {
  return typeof str === 'string'
    ? new RegExp(`(^|[^а-я])(${str})($|[^а-я])`, flags)
    : str;
}

/**
 * Select random element from array|object
 */
export function getRandomElement<T>(arrayOrObject: T[] | Record<string, T>) {
  if (Array.isArray(arrayOrObject)) {
    const index = getRandomIndex(arrayOrObject);
    return arrayOrObject[index];
  } else {
    const index: string = getRandomElement(Object.keys(arrayOrObject));
    return arrayOrObject[index];
  }
}

/**
 * Select random index of array
 */
export function getRandomIndex(arr: unknown[]) {
  return Math.floor(Math.random() * arr.length);
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export function shuffle(a: unknown[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ a[i], a[j] ] = [ a[j], a[i] ];
  }
  return a;
}
