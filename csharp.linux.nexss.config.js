let languageConfig = Object.assign({}, require("./csharp.win32.nexss.config"));

let sudo = process.sudo;

languageConfig.compilers = {
  dotnet21: {
    install: `${sudo}apt install -y dotnet-sdk-2.1 aspnetcore-runtime-2.1 `,
    command: `dotnet-script`,
    args: "<file>",
    help: ``,
  },
};

switch (process.distro) {
  case process.distros.DEBIAN:
    const upd = `${sudo}dpkg -i packages-microsoft-prod.deb
${sudo}apt update -y
${sudo}apt-get install -y apt-transport-https
${sudo}apt-get update -y`;
    if (process.distroVersion * 1 >= 10) {
      languageConfig.compilers.dotnet21.install = `wget https://packages.microsoft.com/config/debian/10/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
${upd}
${sudo}apt-get install -y dotnet-sdk-2.1`;
    } else {
      // Debian 9 as 8 is not supported anymore
      languageConfig.compilers.dotnet21.install = `wget -O - https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.asc.gpg
${sudo} mv microsoft.asc.gpg /etc/apt/trusted.gpg.d/
wget https://packages.microsoft.com/config/debian/9/prod.list
${sudo} mv prod.list /etc/apt/sources.list.d/microsoft-prod.list
${sudo} chown root:root /etc/apt/trusted.gpg.d/microsoft.asc.gpg
${sudo} chown root:root /etc/apt/sources.list.d/microsoft-prod.list
${upd}
${sudo}apt-get install -y dotnet-sdk-2.1 dotnet-runtime-2.1`;
    }

    break;
  case process.distros.ORACLE:
    languageConfig.compilers.dotnet21.install = `${sudo}yum install -y oracle-epel-release-el7 dotnet-sdk-2.1 dotnet-runtime-2.1
curl -s https://raw.githubusercontent.com/filipw/dotnet-script/master/install/install.sh | bash`;
    break;
  case process.distros.ARCH:
    languageConfig.compilers.dotnet21.install = `${sudo}pacman -S --noconfirm dotnet-sdk dotnet-runtime
curl -s https://raw.githubusercontent.com/filipw/dotnet-script/master/install/install.sh | bash`;
    break;
  case process.distros.AMAZON_AMI:
    // skip broken for aws
    languageConfig.compilers.dotnet21.install = process.replacePMByDistro(
      `${sudo}rpm --force -Uvh https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm
${sudo}yum install -y --skip-broken unzip dotnet-sdk-2.1 aspnetcore-runtime-2.1`
    );

    languageConfig.compilers.dotnet21.install += `
${sudo}curl -s https://raw.githubusercontent.com/filipw/dotnet-script/master/install/install.sh | bash
${sudo}chmod +x ~/.dotnet21/tools/dotnet-script`;
    break;
  case process.distros.AMAZON:
    languageConfig.compilers.dotnet21.install = process.replacePMByDistro(
      `${sudo}rpm --force -Uvh https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm
${sudo}yum install -y unzip dotnet-sdk-2.1 aspnetcore-runtime-2.1`
    );

    languageConfig.compilers.dotnet21.install += `
curl -s https://raw.githubusercontent.com/filipw/dotnet-script/master/install/install.sh | bash
${sudo}chmod +x ~/.dotnet21/tools/dotnet-script`;
    break;
  case process.distros.CENTOS:
    if (process.distroVersion * 1 < 8) {
      languageConfig.compilers.dotnet21.install = `${sudo}rpm --force -Uvh https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm
${sudo}yum install -y dotnet-sdk-2.1 aspnetcore-runtime-2.1
`;
    } else {
      languageConfig.compilers.dotnet21.install = `${sudo}rpm --force -Uvh https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm
${sudo}yum install -y dotnet-sdk-2.1 aspnetcore-runtime-2.1`;
    }

    languageConfig.compilers.dotnet21.install += `
${sudo}curl -s https://raw.githubusercontent.com/filipw/dotnet-script/master/install/install.sh | bash`;

    break;
  case process.distros.UBUNTU:
    const version = process.distroVersion; //20.04, 18.04

    languageConfig.compilers.dotnet21.install = `${sudo}wget -q https://packages.microsoft.com/config/ubuntu/${version}/packages-microsoft-prod.deb
${sudo}dpkg -i packages-microsoft-prod.deb
${sudo}apt-get install -y software-properties-common
${sudo}add-apt-repository universe
${sudo}apt-get install -y apt-transport-https curl
${sudo}apt-get update
${sudo}apt-get install -y dotnet-sdk-2.1
${sudo}curl -s https://raw.githubusercontent.com/filipw/dotnet-script/master/install/install.sh | ${sudo}bash`;
    // grep -qxF 'export PATH="$HOME/.dotnet21/tools/:$PATH"' ~/.bashrc || echo 'export PATH="$HOME/.dotnet21/tools/:$PATH"' >> ~/.bashrc
    // . ~/.bashrc`;
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
