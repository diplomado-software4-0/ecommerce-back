export { }

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REST_PORT: number;
            NODE_ENV: "development" | "production";
            DB_DIALECT: any;
            DB_USER: string;
            DB_PASS: string;
            DB_HOST: string;
            DB_PORT: number;
            DB_NAME: string;
            SECRET_KEY: string;
            SECRET_KEY_TOKEN: string;
        }

        interface Process {
            errorContainerInstance: Array<ErrorConstructor>
        }
    }

    // Propiedad Personalizada para permitir el alamcenamiento de datos genericos y nulos
    type PropertyNullable<T> = T | null;

    // Propiedad Personalizada para permitir retornar de datos genericos y nulos
    type ReturnNullable<T> = T | null;

    // Propiedad Personalizada del Partial<T> para permitir el alamcenamiento de valores nullos en las propiedades del objeto
    type PartialNullable<T> = {
        [P in keyof T]?: T[P] | null;
    };

    type PartialAnyable<T> = {
        [P in keyof T]?: unknown;
    };

}