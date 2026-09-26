import { createClient } from "@neondatabase/neon-js";
import { BetterAuthReactAdapter } from "@neondatabase/neon-js/auth/react/adapters";

const authUrl =
  import.meta.env.VITE_NEON_AUTH_URL ||
  "https://ep-little-meadow-b3t2gsi8.neonauth.c-4.ap-southeast-1.aws.neon.tech/neondb/auth";

const dataApiUrl =
  import.meta.env.VITE_NEON_DATA_API_URL ||
  "https://ep-little-meadow-b3t2gsi8.apirest.c-4.ap-southeast-1.aws.neon.tech/neondb/rest/v1";

export const neon = createClient({
  auth: {
    url: authUrl,
    adapter: BetterAuthReactAdapter(),
  },
  dataApi: {
    url: dataApiUrl,
  },
});

export type NeonClient = typeof neon;
