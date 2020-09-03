let languageConfig = Object.assign(
  {},
  require(`../config.${process.platform}`)
);
languageConfig.title = "CSharp";
languageConfig.description =
  "C# (C-Sharp) is a programming language developed by Microsoft that runs on the .NET Framework.";
languageConfig.founders = ["Anders Hejlsberg"];
languageConfig.developers = [""];
languageConfig.years = ["2000"];
languageConfig.url = "https://docs.microsoft.com/pl-pl/dotnet/csharp/";
languageConfig.extensions = [".cs"];
languageConfig.builders = {};
languageConfig.compilers = {
  dotnet: {
    install: `apt install -y dotnet-sdk dotnet-script`,
    command: `dotnet-script`,
    args: "<file>",
    help: ``,
  },
};
languageConfig.errors = require("./nexss.csharp.errors");
languageConfig.languagePackageManagers = {
  vcpkg: {
    installation: `apt install -y nuget`,
    messageAfterInstallation: "",
    install: "nuget install",
    uninstall: "nuget remove",
    help: "nuget --help",
    version: "nuget version",
    init: () => {},
    else: "nuget",
  },
};

module.exports = languageConfig;
