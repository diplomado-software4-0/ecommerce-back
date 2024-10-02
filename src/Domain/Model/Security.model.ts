export interface JWTpayloadBase<T> {
    user: T;
    check: boolean;
    data: string;
}

export interface SecurityBase {
    encryptSHA256: (str: string) => string;

    encryptSHA512: (str: string) => string;

    createToken: <T>(options: {
        data: T;
        hashEncode?: string;
        keyPrivate?: string;
    }) => string;

    createTokenWithExpirence: <T>(options: {
        data: T;
        expiresIn: string | number;
        hashEncode?: string;
        keyPrivate?: string;
    }) => string;

    decodeJsonWebToken: <T>(
        tokenText: string,
        keyPublic?: string
    ) => JWTpayloadBase<T> | null;
}