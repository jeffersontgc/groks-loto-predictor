/*
 * @param {string} string[]
 * Description: This function is used to convert string array to string
 * @return {string}
 */
export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
