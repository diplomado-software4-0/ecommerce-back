export class ResponseHttp<T> {
    public ok: boolean;
    public internal_code: number;
    public message: string;
    public data: T | null;

    constructor(
        data?: Partial<{ ok: boolean; internal_code: number; message: string; data: T | null }>
    ) {
        this.ok = Boolean(data?.ok);
        this.internal_code = data?.internal_code || 0;
        this.message = data?.message || "";
        this.data = data?.data || null;
    }
}

export class ResponseErrorHttp<T> {
    public ok: boolean;
    // public internalCode: number;
    public message: string;
    public errors: T | null;

    constructor(
        // data?: Partial<{ ok: boolean; internalCode: number; message: string; errors: T | null; discounts_redemeed?: T | null; }>
        data?: Partial<{ ok: boolean; message: string; errors: T | null; discounts_redemeed?: T | null; }>
    ) {
        this.ok = Boolean(data?.ok);
        // this.internalCode = data?.internalCode || 0;
        this.message = data?.message || "";
        this.errors = data?.errors || null;
    }
}
