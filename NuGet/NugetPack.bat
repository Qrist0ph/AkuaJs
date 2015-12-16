sed s/VersionHere/0.3.6.%date:~6,4%%date:~3,2%%date:~0,2%/ AkuaJs.nuspec > AkuaJsTmp.nuspec && ..\.nuget\NuGet.exe pack AkuaJsTmp.nuspec
