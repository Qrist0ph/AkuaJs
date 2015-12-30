echo Building
rd dist /s /q
robocopy src\ dist\plain\ *.js
robocopy src\core\ dist\plain\core\
robocopy src\Libs\ dist\plain\libs\  /s
copy src\TestDriver1Axis0Pkm.html dist\plain\

cd dist
cd plain
 
md Tmp

FOR %%X in ("*.js") DO java -jar ..\..\compiler.jar --language_in=ECMASCRIPT5  --js %%X --js_output_file tmp\%%X
rm *.js
copy tmp\*.* .
rd tmp /s /q
cd Core
del CoreBundle.js

rem # noch Core Bundle in eine Datei
md Tmp
java -jar ..\..\..\compiler.jar --js *.js --js_output_file tmp\AkuaCore.js
del *.* /q
move tmp\AkuaCore.js .
rd tmp /s /q
echo define(['underscore-min', 'linq.min', 'jshashtable-2.1', 'core/AkuaCore'], function () {}); > CoreBundle.js

cd ..\..\..

cd dist
cd plain
7z a -tzip -r ..\..\bin\AkuaJs.min.zip *.*
cd ..\..