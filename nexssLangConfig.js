module.exports = {
  description: "C",
  type: "language",
  author: "Marcin Polak <mapoart@gmail.com>",
  version: "1.0",
  compiler: "csc",
  extension: ".cs",
  executeCommandLine: "",
  InteractiveShell: "csi.exe",
  installOnError: {
    win32: "scoop install shadowsocksr-csharp"
  },
  errors: {
    "Uncaught Error: Class '(.*?)'": {
      win32: "vcpkg install <package>",
      darwin: "",
      linux: ""
    }
  },
  url: ""
};
