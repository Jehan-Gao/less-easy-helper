# less-easy-helper ![](https://img.shields.io/badge/vscode%20plugin-0.0.1-brightgreen)

🖖 一个方便使用 less 的 vscode 插件

## 使用
1. 支持在用户配置文件 `setting.json` 中手动修改配置项: `less-helper.paths` ，以更新读取 less 文件的路径。
默认读取 less 文件的路径：`{workspace}/node_modules/kfz-base-style/lib`

## 当前版本提供的功能

1. 在 less 文件中键入 `@` 自动补全变量名，如果是色值变量也会显示色值；输入 `.` 自动补全方法名。

2. 鼠标悬浮在变量或方法上显示其值。

3. 对于 less 变量或方法，`cmd` 或 `ctrl` 显示下划线点击可以直接跳转到其定义位置。

