// env.d.ts
/// <reference types="astro/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly SECRET_KEY: string;
}