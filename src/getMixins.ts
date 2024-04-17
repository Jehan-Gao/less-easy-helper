import * as vscode from 'vscode';
import path from 'path';
import fs from 'fs';

export function getMixinsPaths() {
  // 读取配置
  const configPaths =
    vscode.workspace.getConfiguration().get<Array<string>>('less-easy-helper.paths') || [];

  const mixinsPaths: string[] = []
  
  // console.log('configPaths', configPaths)

  if (configPaths.length) {
    configPaths.forEach((path) => {
      mixinsPaths.push(...new Set(getFilePath(path)));
    })
    // console.log('mixinsPaths---->', mixinsPaths)
    return mixinsPaths
  } else {
    return []
  } 

  function getFilePath (filePath: string) {
    const paths: string[] = []
    function getPaths(filePath: string) {
      try {
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
          const dirPath = fs.readdirSync(filePath);
          dirPath.forEach((file) => {
            paths.push(...new Set(getPaths(path.resolve(filePath, file)))) 
          })
        } else if (stats.isFile() && /\.less/.test(filePath)) {
          if (fs.existsSync(filePath)) {
            paths.push(filePath)
          }
        }
      } catch (error) {
         console.log('getFilePath error ->', error)
      }
      return paths
    }
    return getPaths(filePath);
  }
}
