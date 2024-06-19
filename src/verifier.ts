export const invalidTimestampError = new Error("invalid timestamp");
export const requestTooOldError = new Error("request is too old");
export const signatureMismatchError = new Error("signature mismatch");

const VERSION = "v0";

export default (signatureSecret: string) => async (req: Request) => {
  const xSlackRequestTimestamp = req.headers.get("x-slack-request-timestamp");
  const timestamp = Number(xSlackRequestTimestamp);
  if (isNaN(timestamp)) {
    throw invalidTimestampError;
  }
  const now = (Date.now() / 1000) >> 0;
  if (now - timestamp > 5 * 60) {
    throw requestTooOldError;
  }

  const enc = new TextEncoder();
  const dec = new TextDecoder();

  const reader = req.body.tee()[0].getReader();
  let body = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    body += dec.decode(value);
  }
  console.log(body);

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(signatureSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const basestring = [VERSION, xSlackRequestTimestamp, body].join(":");
  const signedSignature = [
    ...new Uint8Array(
      await crypto.subtle.sign("HMAC", key, enc.encode(basestring))
    ),
  ]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");

  const xSlackSignature = new URLSearchParams(
    req.headers.get("x-slack-signature")
  ).get(VERSION);

  if (signedSignature !== xSlackSignature) {
    throw signatureMismatchError;
  }
};
