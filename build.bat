echo Building
rd release /s /q
robocopy src\ release\ *.js
robocopy src\core\ release\core\
robocopy src\Libs\ release\libs\  /s
copy src\TestDriver1Axis0Pkm.html release\

cd Release
md Tmp

FOR %%X in ("*.js") DO java -jar ..\compiler.jar --language_in=ECMASCRIPT5  --js %%X --js_output_file tmp\%%X
rm *.js
copy tmp\*.* .
rd tmp /s /q
cd Core
del CoreBundle.js

rem # noch Core Bundle in eine Datei
md Tmp
java -jar ..\..\compiler.jar --js *.js --js_output_file tmp\AkuaCore.js
del *.* /q
move tmp\AkuaCore.js .
rd tmp /s /q
echo define(['underscore-min', 'linq.min', 'jshashtable-2.1', 'Core/AkuaCore'], function () {}); > CoreBundle.js

cd ..\..