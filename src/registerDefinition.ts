import * as vscode from 'vscode';
import { unRegisters } from './extension';
import { originalData } from './getStore';
import { lessOption } from './constants';
const { replaceLessVariable, replaceLessVariableValue } = lessOption;

export default function (
  context: vscode.ExtensionContext,
  mixinsPaths: string[]
) {
  function provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ) {
    let uris: vscode.Location[] = [];
    const fileName = document.fileName;

    const word = document.getText(document.getWordRangeAtPosition(position));
    // 和 hover 中的判断有所区分
    const isMethod = /\.(.*)/i.test(word);
    const isVariable = /^@(?!import)\w+/i.test(word);

    // @NOTE: 这里需要使用 restorePrefix 将 k 前缀 再还原成 @{prefix},才能准确定位
    // @TODO: 是否要做成可配置的？不确定因素太多，会导致逻辑复杂
    function restorePrefix(str: string) {
      if (!isMethod) return str
      return str.replace(replaceLessVariableValue, `@{${replaceLessVariable}}`)
    }

    originalData.forEach((item) => {
      const [path, content] = item;
      if (
        !mixinsPaths.includes(fileName) &&
        content.indexOf(restorePrefix(word)) !== -1 &&
        (isMethod || isVariable)
      ) {
        const lines = content
          .slice(0, content.indexOf(restorePrefix(word)))
          ?.match(/\n/g)?.length;
        uris.push(
          new vscode.Location(
            vscode.Uri.file(path),
            new vscode.Position(lines ? lines : 0, 0)
          )
        );
      }
    });

    return uris;
  }
  const unRegister = vscode.languages.registerDefinitionProvider(['less'], {
    provideDefinition,
  });
  unRegisters.push(unRegister);
  context.subscriptions.push(unRegister);
}
