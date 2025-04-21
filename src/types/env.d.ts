// env.d.ts
/// <reference types="astro/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly SECRET_KEY: string;
  readonly CLOUDFLARE_D1_TOKEN: string;
  readonly CLOUDFLARE_ACCOUNT_ID: string;
  readonly CLOUDFLARE_DATABASE_ID: string;
}