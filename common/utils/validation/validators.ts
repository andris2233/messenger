export const isEmail = (value: string): boolean => !!value && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([A-z\-0-9]+\.)+[A-z]{2,}))$/.test(value);

export const isUsername = (value: string): boolean => !!value && value.length < 21 && value.length > 2 && /\D[\d\S-]*/gi.test(value);

export const onlyRussianSymbol = (value: string): boolean => /^[А-я]+$/.test(value);

export const onlyEnglishSymbol = (value: string): boolean => /^[A-z]+$/.test(value);

export const isName = (value: string): boolean =>
  value.trim().length > 1 &&
  (onlyRussianSymbol(value) || onlyEnglishSymbol(value)) &&
  value[0].toUpperCase() + value.slice(1).toLowerCase() === value;
