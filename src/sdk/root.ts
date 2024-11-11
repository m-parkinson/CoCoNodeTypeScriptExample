import { client } from "./client";

import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from "@commercetools/platform-sdk";

export type Credentials = {
  projectKey: string;
  clientID: string;
  clientSecret: string;
  scopes: string;
};

export default function ({
  projectKey,
  clientID,
  clientSecret,
  scopes,
}: Credentials): ByProjectKeyRequestBuilder {
  return createApiBuilderFromCtpClient(
    client(projectKey, clientID, clientSecret, scopes)
  ).withProjectKey({ projectKey });
}
