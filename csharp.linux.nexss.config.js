let languageConfig = Object.assign({}, require("./csharp.win32.nexss.config"));

let sudo = "sudo ";
if (process.getuid && process.getuid() === 0) {
  sudo = "";
}

languageConfig.compilers = {
  dotnet: {
    install: `${sudo}wget -q https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb
${sudo}dpkg -i packages-microsoft-prod.deb
${sudo}add-apt-repository universe
${sudo}apt-get install -y apt-transport-https curl
${sudo}apt-get update
${sudo}apt-get install -y dotnet-sdk-2.1
curl -s https://raw.githubusercontent.com/filipw/dotnet-script/master/install/install.sh | bash
${sudo}chmod +x ~/.dotnet/tools/dotnet-script
grep -qxF 'export PATH="$HOME/.dotnet/tools/:$PATH"' ~/.bashrc || echo 'export PATH="$HOME/.dotnet/tools/:$PATH"' >> ~/.bashrc
. ~/.bashrc`,
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
