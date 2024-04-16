import * as vscode from 'vscode';
import path from 'path';
import fs from 'fs';

export function getMixinsPaths() {
  // 读取配置
  const configPaths =
    vscode.workspace.getConfiguration().get<Array<string>>('less-helper.paths') || [];

  const mixinsPaths: string[] = []
  console.log('configPaths', configPaths)

  if (configPaths.length) {
    configPaths.forEach((path) => {
      const targetLessFiles = fs.readdirSync(path);  
      getFilePath(targetLessFiles, path);
    })

    console.log('fafafafa', mixinsPaths)
  } else {
    const workspaceFolders = vscode.workspace.workspaceFolders
    if (!workspaceFolders) return []
    const curWorkspacePath = workspaceFolders[0].uri.fsPath;
    const lessPath = `${curWorkspacePath}/node_modules/kfz-base-style/lib`;
    // 同步配置文件
    vscode.workspace
    .getConfiguration()
    .update('less-helper.paths', [lessPath], true);

    const targetLessFiles = fs.readdirSync(lessPath);
    getFilePath(targetLessFiles, lessPath);
  } 

  function getFilePath (fileArr: string[], filePath: string) {
    fileArr.forEach((file) => {
      if (/\.less/.test(file)) {
        const curPath = path.resolve(filePath, file);
        if (fs.existsSync(curPath)) {
          mixinsPaths.push(curPath);
        }
      } else {
        const curPath = path.resolve(filePath, file);
        const fileArr = fs.readdirSync(curPath)
        if (fileArr) {
          getFilePath(fileArr, curPath);
        }
      }
    })
  }

  return mixinsPaths
}
