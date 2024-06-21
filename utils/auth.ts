import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

export function isValidToken(email: string, idToken: string) {
  const decodedToken: any = jwt.decode(idToken);
  const currentTime = Math.floor(Date.now() / 1000);
  console.log("DECODED TOKEN: ", decodedToken);
  if (
    !decodedToken ||
    !decodedToken.iss ||
    !decodedToken.exp ||
    !decodedToken.iat ||
    decodedToken.email !== email ||
    decodedToken.iss !== "https://razvedchik.us.auth0.com/" ||
    decodedToken.exp < currentTime ||
    Math.abs(decodedToken.auth_time - decodedToken.iat) > 5
  ) {
    return false;
  }
  return true;
}

async function getAuth0PublicKey(kid: any) {
  const client = jwksClient({
    jwksUri: process.env.AUTH0_ISSUER_BASE_URL + "/.well-known/jwks.json",
  });
  const key: any = await new Promise((resolve, reject) => {
    client.getSigningKey(kid, (err, key) => {
      if (err) {
        console.error(err);
      } else {
        resolve(key);
      }
    });
  });
  return key.publicKey || key.rsaPublicKey;
}

export const verifyToken = async function (idToken: string) {
  let verified = false;
  try {
    const kid: any = jwt.decode(idToken, { complete: true }).header.kid;
    let publicKey: string; // set to cache value if there is one
    if (publicKey === undefined) {
      publicKey = await getAuth0PublicKey(kid);
      //  set cache
    }
    await jwt.verify(
      idToken,
      publicKey,
      {
        algorithms: ["RS256"],
      },
      (err) => {
        if (err) {
          console.error(err);
        } else {
          verified = true;
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
  return verified;
};
