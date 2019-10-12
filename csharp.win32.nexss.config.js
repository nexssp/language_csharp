let languageConfig = Object.assign({}, require("../config.win32"));
languageConfig.title = "CSharp";
languageConfig.description =
  "PHP is a popular general-purpose scripting language that is especially suited to web development. Fast, flexible and pragmatic, PHP powers everything from your blog to the most popular websites in the world.";
languageConfig.url = "https://docs.microsoft.com/pl-pl/dotnet/csharp/";
languageConfig.extensions = [".cs"];
languageConfig.builders = {};
languageConfig.compilers = {
  csc: {
    install: "scoop install shadowsocksr-csharp",
    // Cpp does not have possibility to compile and run on the fly. We need to save it as a exe file first.
    command: "csc", // FIXME: compiler doenst work https://web.archive.org/web/20090426124057/http://www.tipsntracks.com/52/get-a-free-csharp-command-line-compiler.html
    args: "<file>",
    help: ``
  }
};
languageConfig.errors = require("./nexss.csharp.errors");
languageConfig.languagePackageManagers = {
  vcpkg: {
    installation: "PowerShell.exe -File installVCPKG.bat",
    messageAfterInstallation: "", //this message will be displayed after this package manager installation, maybe some action needed etc.
    installed: "vcpkg list",
    search: "vcpkg search",
    install: "vcpkg install",
    uninstall: "vcpkg remove",
    help: "vcpkg --help",
    version: "vcpkg version",
    init: () => {
      require("child_process").execSync("vcpkg integrate project");
      console.log("initialized vcpkg project.");
    },
    // if command not found in specification
    // run directly on package manager
    else: "vcpkg <default> <args>"
  }
};

module.exports = languageConfig;
