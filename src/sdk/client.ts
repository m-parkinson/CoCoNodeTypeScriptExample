// import fetch from 'node-fetch';
import {
  ClientBuilder,
  type Client,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from "@commercetools/sdk-client-v2";

const date = new Date().toISOString();

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.CTP_API_URL as string,
  fetch,
};

// Export the ClientBuilder
export function client(
  projectKey: string,
  clientID: string,
  clientSecret: string,
  scopes: string
): Client {
  const _scopes = scopes.split(",");
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: process.env.CTP_AUTH_URL as string,
    projectKey,
    credentials: {
      clientId: clientID,
      clientSecret,
    },
    scopes: _scopes,
    fetch,
  };

  return (
    new ClientBuilder()
      .withProjectKey(projectKey)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withUserAgentMiddleware({
        libraryName: `stackblitz-env-${date}-typescript-sdk-v2`,
      })
      // .withLoggerMiddleware()
      .build()
  );
}
