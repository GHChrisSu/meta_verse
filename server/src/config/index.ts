// 根据不同的NODE_ENV，输出不同的配置对象，默认输出development的配置对象
import development from "./development";
import production from "./production";
import local from "./local";
import test from "./test";

const nodeEnv: "test" | "local" | "development" | "production" =
  (process.env.NODE_ENV as "test" | "local" | "development" | "production") ||
  "local";

const allConfig: {
  test: typeof test;
  local: typeof local;
  development: typeof development;
  production: typeof production;
} = {
  test,
  local,
  development,
  production,
};

export default allConfig[nodeEnv];
