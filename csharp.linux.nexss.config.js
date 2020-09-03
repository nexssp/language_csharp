let languageConfig = Object.assign({}, require("./csharp.win32.nexss.config"));

languageConfig.compilers = {
  dotnet: {
    install: `snap install dotnet-sdk dotnet-script`,
    command: `dotnet-script`,
    args: "<file>",
    help: ``,
  },
};

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
