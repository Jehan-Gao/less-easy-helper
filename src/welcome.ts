// import * as vscode from 'vscode';
// import fs from 'fs';

// export function welcome() {
//   const notice = vscode.workspace.getConfiguration().get('less-helper.notice');
//   if (!notice) {
//     return;
//   }

//   // @NOTE: 默认读取的 less 路径，可以在配置中修改
//   let mixinsPaths: string[] = [];

//   const paths =
//     vscode.workspace.getConfiguration().get<Array<string>>('less-helper.paths') || [];

  
//   if (paths.length) {

//   } else {
//     const workspaceFolders = vscode.workspace.workspaceFolders;
//     if (workspaceFolders) {
//       const path = workspaceFolders[0].uri.fsPath;
//       vscode.workspace
//       .getConfiguration()
//       .update('less-helper.paths', [path], true);
//     } 
//   }

//   if (paths?.length) {
//     vscode.window
//       .showInformationMessage(
//         '已配置less读取路径, 是否更新?',
//         '更新',
//         '不再通知'
//       )
//       .then(
//         (item) => {
//           switch (item) {
//             case '更新':
//               vscode.window
//                 .showOpenDialog({
//                   canSelectMany: true,
//                   filters: { Less: ['less'] },
//                 })
//                 .then((uris) => {
//                   if (uris && uris.length) {
//                     uris?.forEach((uri) => {
//                       const p = uri.path;
//                       if (p && fs.existsSync(p)) {
//                         mixinsPaths.push(p);
//                       }
//                     });
//                   }

//                   if (mixinsPaths.length) {
//                     vscode.workspace
//                       .getConfiguration()
//                       .update('less.files', mixinsPaths, true);
//                     vscode.window.showInformationMessage('设置成功!');
//                   }
//                   // return resolve([mixinsPaths, true]);
//                 });
//               break;
//             case '不再通知':
//               vscode.workspace
//                 .getConfiguration()
//                 .update('less.notice', false, true);
//               break;
//             // return resolve([files, false]);
//             case undefined:
//               break;
//             // return resolve([files, false]);
//           }
//         },
//         (e) => {
//           // return reject([]);
//         }
//       );
//   } else {
//     vscode.window
//       .showInformationMessage('初次使用，请选择mixin文件', '选择')
//       .then(
//         (item) => {
//           if (item === '选择') {
//             vscode.window
//               .showOpenDialog({
//                 canSelectMany: true,
//                 filters: { Less: ['less'] },
//               })
//               .then((uris) => {
//                 if (uris && uris.length) {
//                   uris?.forEach((uri) => {
//                     const p = uri.path;
//                     if (p && fs.existsSync(p)) {
//                       mixinsPaths.push(p);
//                     }
//                   });
//                 }
//                 if (mixinsPaths.length) {
//                   vscode.workspace
//                     .getConfiguration()
//                     .update('less.files', mixinsPaths, true);
//                   vscode.window.showInformationMessage('设置成功!');
//                 }
//                 // return resolve([mixinsPaths, true]);
//               });
//           }
//         },
//         (e) => {
//           // return reject([]);
//         }
//       );
//   }
// }
