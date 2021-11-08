/* eslint-disable */
export const isEmail = (value: string): boolean => !!value && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([A-z\-0-9]+\.)+[A-z]{2,}))$/.test(value);

export const isUsername = (value: string): boolean => !!value && value.length < 21 && value.length > 2 && /\D[\d\S-]*/gi.test(value);
