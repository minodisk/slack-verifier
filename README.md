# slack-verifier

Verify whether requests from Slack are authentic with a signed secrets using Web APIs.
As a feature, it is intended to run on non-Node runtimes such as Cloudflare workers, so it is built using only the Web API.

## Installation

```
npm i slack-verifier
```

```
pnpm add slack-verifier
```

## Usage

```typescript
import verifier from "slack-verifier";

export default {
  async fetch(request: Request): Promise<Response> {
    const verify = verifier("your-signing-secret");
    try {
      await verify(request);
    } catch (e) {
      return new Response("Unauthorized", { status: 401 });
    }
    return new Response("OK");
  },
};
```
