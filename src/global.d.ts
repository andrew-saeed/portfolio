declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BREVO_API_KEY: string;
        }
    }
}

export {};