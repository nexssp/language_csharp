let languageConfig = Object.assign({}, require("./csharp.win32.nexss.config"));

const os = require("@nexssp/os");
let sudo = os.sudo();

languageConfig.compilers = {
  dotnet: {
    install: `${sudo}apt install -y dotnet-sdk-3.1 aspnetcore-runtime-3.1 `,
    command: `dotnet-script`,
    args: "<file>",
    help: ``,
  },
};

switch (os.name()) {
  case os.distros.AMAZON:
    languageConfig.compilers.dotnet.install = os.replacePMByDistro(
      `${sudo}rpm --force -Uvh https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm
  yum install -y dotnet-sdk-2.1 aspnetcore-runtime-2.1`
    );
    languageConfig.compilers.dotnet.install += `
curl -s https://raw.githubusercontent.com/filipw/dotnet-script/master/install/install.sh | bash
${sudo}chmod +x ~/.dotnet/tools/dotnet-script`;
    break;
  case os.distros.CENTOS:
    if (os.v() < 8) {
      languageConfig.compilers.dotnet.install = `${sudo}rpm --force -Uvh https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm
${sudo}yum install -y dotnet-sdk-2.1 aspnetcore-runtime-2.1
`;
    } else {
      languageConfig.compilers.dotnet.install = `${sudo}rpm --force -Uvh https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm
yum install -y dotnet-sdk-2.1 aspnetcore-runtime-2.1`;
    }

    languageConfig.compilers.dotnet.install += `
curl -s https://raw.githubusercontent.com/filipw/dotnet-script/master/install/install.sh | bash`;

    break;
  case os.distros.UBUNTU:
    languageConfig.compilers.dotnet.install = `${sudo}wget -q https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb
${sudo}dpkg -i packages-microsoft-prod.deb
${sudo}add-apt-repository universe
${sudo}apt-get install -y apt-transport-https curl
${sudo}apt-get update
${sudo}apt-get install -y dotnet-sdk-2.1
curl -s https://raw.githubusercontent.com/filipw/dotnet-script/master/install/install.sh | bash
${sudo}chmod +x ~/.dotnet/tools/dotnet-script
grep -qxF 'export PATH="$HOME/.dotnet/tools/:$PATH"' ~/.bashrc || echo 'export PATH="$HOME/.dotnet/tools/:$PATH"' >> ~/.bashrc
. ~/.bashrc`;
    break;
  default:
    break;
}

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
