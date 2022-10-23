import tracer from "tracer";

export default tracer.colorConsole({
  format:
    "{{timestamp}} <{{title}}> {{path}}:{{line}} ({{method}}) {{message}}",
  level: "log",
  inspectOpt: {
    showHidden: true, // the object's non-enumerable properties will be shown too
    depth: null,
  },
  transport: (data) => {
    console.log(data.output);
  },
});
