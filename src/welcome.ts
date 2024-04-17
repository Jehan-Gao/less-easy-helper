import * as vscode from 'vscode';
import fs from 'fs';

// @TODO: 修改属性
export function welcome() {
  const notice = vscode.workspace.getConfiguration().get('less-easy-helper.notice');

  if (!notice) {
    return;
  }

  let mixinsPaths: string[] = [];

  const paths =
    vscode.workspace.getConfiguration().get<Array<string>>('less-easy-helper.paths') || [];

  // console.log('paths ->', paths)

  if (paths?.length) {
    vscode.window
      .showInformationMessage(
        '已经选择less文, 是否更新?',
        '更新',
        '不再通知'
      )
      .then(
        (item) => {
          switch (item) {
            case '更新':
              vscode.window
                .showOpenDialog({
                  canSelectMany: true,
                  canSelectFolders: true,
                //   filters: { Less: ['less'] },
                })
                .then((uris) => {
                  if (uris && uris.length) {
                    uris?.forEach((uri) => {
                      const p = uri.path;
                      if (p && fs.existsSync(p)) {
                        mixinsPaths.push(p);
                      }
                    });
                  }
                  if (mixinsPaths.length) {
                    vscode.workspace
                      .getConfiguration()
                      .update('less-easy-helper.paths', mixinsPaths, true);
                    vscode.window.showInformationMessage('设置成功!');
                  }
                  // return resolve([mixinsPaths, true]);
                });
              break;
            case '不再通知':
              vscode.workspace
                .getConfiguration()
                .update('less-esay-helper.notice', false, true);
              break;
            // return resolve([files, false]);
            case undefined:
              break;
            // return resolve([files, false]);
          }
        },
        (e) => {
          // return reject([]);
        }
      );
  } else {
    vscode.window
      .showInformationMessage('初次使用，请选择less文件目录', '选择')
      .then(
        (item) => {
          if (item === '选择') {
            vscode.window
              .showOpenDialog({
                canSelectMany: true,
                canSelectFolders: true,
                // filters: { Less: ['less'] },
              })
              .then((uris) => {
                if (uris && uris.length) {
                  uris?.forEach((uri) => {
                    const p = uri.path;
                    if (p && fs.existsSync(p)) {
                      mixinsPaths.push(p);
                    }
                  });
                }
                if (mixinsPaths.length) {
                  vscode.workspace
                    .getConfiguration()
                    .update('less-easy-helper.paths', mixinsPaths, true);
                  vscode.window.showInformationMessage('设置成功!');
                }
                // return resolve([mixinsPaths, true]);
              });
          }
        },
        (e) => {
          // return reject([]);
        }
      );
  }
}