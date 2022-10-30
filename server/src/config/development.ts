/* eslint-disable no-console */
/* eslint-disable global-require */
// 缺省的配置文件
import defaultConfig from "./default";

// 重载配置文件
const config = {
  ...defaultConfig,
  a: "sssss",
  console: require("tracer").colorConsole({
    format:
      "{{timestamp}} <{{title}}> {{path}}:{{line}} ({{method}}) {{message}}",
    level: "log",
    inspectOpt: {
      showHidden: true, // the object's non-enumerable properties will be shown too
      depth: null,
    },
    transport(data) {
      console.log(data.output);
    },
  }),
};

export default config;
