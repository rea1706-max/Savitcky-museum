// Shared by server and client code: a value exported from a 'use client' module reaches
// server components only as a client reference, never as the value itself.
export type Locale = 'EN' | 'RU' | 'UZ' | 'KK';

/** Karakalpak is the site's first language; a visitor's own choice is remembered. */
export const DEFAULT_LOCALE: Locale = 'KK';
