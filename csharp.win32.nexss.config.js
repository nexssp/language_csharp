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
    installation: `scoop install nuget`,
    messageAfterInstallation: "",
    install: "nuget install",
    uninstall: "nuget remove",
    help: "nuget --help",
    version: "nuget version",
    init: () => {},
    else: "nuget"
  }
};

module.exports = languageConfig;
