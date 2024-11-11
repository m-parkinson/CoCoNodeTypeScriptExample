import apiRoot, { Credentials } from "./sdk/root";

async function request(credentials: Credentials) {
  return apiRoot(credentials)
    .products()
    .get()
    .execute()
    .catch((err: Error) => err);
}
async function test() {
  const credentials = {
    projectKey: process.env.CTP_PROJECT_KEY as string,
    clientID: process.env.CTP_CLIENT_ID as string,
    clientSecret: process.env.CTP_CLIENT_SECRET as string,
    scopes: process.env.CTP_SCOPES as string,
  };
  console.log(await request(credentials));
}
test().then(() => {
  console.log("Success");
});
