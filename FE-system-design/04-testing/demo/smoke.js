import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 2,
  duration: "30s",
};

export default function () {
  const res = http.get(__ENV.TARGET || "https://httpbin.org/get");
  check(res, {
    "status is 200": (r) => r.status === 200,
    "ttfb < 200ms": (r) => r.timings.waiting < 200,
  });
  sleep(1);
}
