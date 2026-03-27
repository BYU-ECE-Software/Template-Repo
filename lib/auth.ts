import { betterAuth } from 'better-auth';
import { genericOAuth } from 'better-auth/plugins/generic-oauth';
import { jwt as jwtPlugin } from 'better-auth/plugins/jwt';
import { env } from '@/lib/env';
import type { User, Session } from 'better-auth';

type ExtendedUser = User & {
  isAdmin: boolean;
  byuId: string;
};

export const auth = betterAuth({
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      strategy: 'jwt',
      refreshCache: {
        updateAge: 60 * 60, // 1 hour
      },
    },
    maxAge: 1 * 24 * 60 * 60, // 1 day
    expiresIn: 1 * 24 * 60 * 60, // 1 day
    updateAge: 3 * 60 * 60, // 3 hours
    freshAge: 0, // 0 means always fresh
  },
  account: {
    storeStateStrategy: 'cookie',
    storeAccountCookie: true,
  },
  plugins: [
    jwtPlugin({
      jwt: {
        expirationTime: 1 * 24 * 60 * 60, // 1 day
      },
      generatePayload: async ({ user, session }: { user: ExtendedUser; session: Session }) => {
        // Call GRO here at token generation time
        // const adminFlags = await fetchGroAdminFlags(user.email);

        return {
          // Standard claims
          sub: user.id,
          email: user.email,
          name: user.name,

          // Custom claims from ID token (mapped via genericOAuth)
          // preferredUsername: user.preferredUsername,
          // groups: user.groups,
          // given_name: user.given_name,
          // family_name: user.family_name,
          byu_id: user.byuId,

          // GRO-derived claims
          // isAdmin: adminFlags.isAdmin,
          // adminApps: adminFlags.apps,
        };
      },
    }),
    genericOAuth({
      config: [
        {
          providerId: 'okta',
          clientId: env.OKTA_CLIENT_ID,
          clientSecret: env.OKTA_CLIENT_SECRET,
          discoveryUrl: env.OKTA_DISCOVERY_URL,
          redirectURI: env.OKTA_REDIRECT_URI,
          pkce: true,
          scopes: ['openid', 'profile', 'email'],
          mapProfileToUser: async (profile) => {
            return {
              email: profile.preferred_username,
              name: profile.name,
              given_name: profile.given_name,
              byuId: profile.byu_id, // Example of a custom field from Okta profile
              // Add more fields as needed
            };
          },
        },
      ],
    }),
  ],
  user: {
    additionalFields: {
      isAdmin: { type: 'boolean', required: true, defaultValue: false, input: false },
      byuId: { type: 'string', required: true, input: false },
    },
  },
});
