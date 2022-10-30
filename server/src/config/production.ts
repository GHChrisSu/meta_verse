/* eslint-disable global-require */
// 缺省的配置文件
import defaultConfig from './default'

// 重载配置文件
const config = {
  ...defaultConfig,
  console: require('tracer').dailyfile({
    format: '{{timestamp}} <{{title}}> {{path}}:{{line}} ({{method}}) {{message}}',
    level: 'info',
    inspectOpt: {
      showHidden: true, // the object's non-enumerable properties will be shown too
      depth: null,
    },
    root: './logs',
    maxLogFiles: 10,
    allLogsFileName: `log`,
  }),
}

export default config
