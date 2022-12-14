/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: [
    "recharts",
    "d3-shape",
    "d3-scale",
    "d3-interpolate",
    "d3-array",
    "d3-time",
    "d3-format",
    "d3-time-format",
    "d3-path",
    "d3-color",
    "internmap",
  ],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
