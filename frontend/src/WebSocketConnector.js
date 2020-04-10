import * as url from "url";
import { Buffer } from "buffer";

const WebSocketConnector = ({ uri, apiKey }) => {
  const wsUri = uri
    .replace("https://", "wss://")
    .replace("appsync-api", "appsync-realtime-api")
    .replace("gogi-beta", "grt-beta");

  const { host } = url.parse(wsUri);

  const dateString = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, "");

  const payloadString = "{}";
  const headerString = JSON.stringify({
    host,
    "x-amz-date": dateString,
    "x-api-key": apiKey,
  });

  return `${wsUri}?header=${Buffer.from(headerString).toString(
    "base64"
  )}&payload=${Buffer.from(payloadString).toString("base64")}`;
};

export default WebSocketConnector;
