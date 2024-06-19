export declare const invalidTimestampError: Error;
export declare const requestTooOldError: Error;
export declare const signatureMismatchError: Error;
declare const _default: (signatureSecret: string) => (req: Request) => Promise<void>;
export default _default;
