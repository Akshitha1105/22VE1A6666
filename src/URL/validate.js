export const validateUrl = url => /^https?:\/\/.+\..+/.test(url);
export const validateMinutes = val => /^[0-9]+$/.test(val);
export const validateShortcode = code => /^[a-zA-Z0-9\-_]{3,10}$/.test(code);