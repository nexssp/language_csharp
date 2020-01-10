let languageConfig = Object.assign({}, require("../config.win32"));
languageConfig.title = "CSharp";
languageConfig.description =
  "C# (C-Sharp) is a programming language developed by Microsoft that runs on the .NET Framework.";
languageConfig.url = "https://docs.microsoft.com/pl-pl/dotnet/csharp/";
languageConfig.extensions = [".cs"];
languageConfig.builders = {};
languageConfig.compilers = {
  dotnet: {
    install: `scoop install dotnet-sdk dotnet-script`,
    command: `dotnet-script`,
    args: "<file>",
    help: ``
  }
};
languageConfig.errors = require("./nexss.csharp.errors");
languageConfig.languagePackageManagers = {
  vcpkg: {
    installation: `PowerShell.exe -File ${__dirname}/installVCPKG.bat`,
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
    else: "vcpkg"
  }
};

module.exports = languageConfig;
