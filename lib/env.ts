// lib/env.ts
export const env = {
  OKTA_CLIENT_ID: process.env.OKTA_CLIENT_ID ?? (() => { throw new Error("Missing OKTA_CLIENT_ID") })(),
  OKTA_CLIENT_SECRET: process.env.OKTA_CLIENT_SECRET ?? (() => { throw new Error("Missing OKTA_CLIENT_SECRET") })(),
  OKTA_DISCOVERY_URL: process.env.OKTA_DISCOVERY_URL ?? (() => { throw new Error("Missing OKTA_DISCOVERY_URL") })(),
  OKTA_REDIRECT_URI: process.env.OKTA_REDIRECT_URI ?? (() => { throw new Error("Missing OKTA_REDIRECT_URI") })(),
};