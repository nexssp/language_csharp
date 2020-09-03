let languageConfig = Object.assign({}, require("./csharp.win32.nexss.config"));

languageConfig.compilers = {
  dotnet: {
    install: `snap install --classic dotnet-sdk && curl -s https://raw.githubusercontent.com/filipw/dotnet-script/master/install/install.sh | bash`,
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
