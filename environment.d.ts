declare namespace NodeJS {
  export interface ProcessEnv {
    /** API Base URL */
    readonly NEXT_PUBLIC_API_BASE_URL: string;

    /** CDN Base URL */
    readonly CDN_BASE_URL: string;

  }
}
