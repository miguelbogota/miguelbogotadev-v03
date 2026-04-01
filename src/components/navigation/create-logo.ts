/**
 * With the given logo name, this function returns a list of span elements, where the first
 * letter of each word is wrapped in a span and the rest of the word is wrapped in another span.
 * This allows for styling the first letter and give a shrinking effect.
 */
export const createLogoName = (logoName: string) =>
  logoName
    .split(' ')
    .map((word) => /*html */ `<span>${word.charAt(0)}</span><span>${word.slice(1)}</span>`)
    .join(' ');
