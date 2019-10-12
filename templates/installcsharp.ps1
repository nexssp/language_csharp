# Get nuget.exe command line
wget https://dist.nuget.org/win-x86-commandline/latest/nuget.exe -OutFile nuget.exe

# Download the C# Roslyn compiler (just a few megs, no need to 'install')
.\nuget.exe install Microsoft.Net.Compilers

# Compiler, meet code
.\Microsoft.Net.Compilers.1.3.2\tools\csc.exe .\HelloWorld.cs

# Run it
.\HelloWorld.exe   