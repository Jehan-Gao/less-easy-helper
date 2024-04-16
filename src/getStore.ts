import fs from 'fs';
import { promisify } from 'util';

const read = promisify(fs.readFile);

export type Store = {
  [index: string]: string;
};

// 记录每一个less文件的数据
export let originalData: string[][] = [];

export async function getStore(mixinsPaths: string[]) {

  if (!mixinsPaths.length) {
    return [{}, {}, {}];
  }

  let promises: Promise<string>[] = [];

  mixinsPaths.forEach((item, index) => {
    if (!originalData[index]) {
      originalData[index] = [];
      originalData[index].push(item);
    }
    promises.push(read(item, { encoding: 'utf-8' }));
  });

  let variablesMap: Store = {};
  let methodsMap: Store = {};

  return Promise.all(promises).then(
    (res) => {
      const data = res.reduce((pre, cur, index) => {
        originalData[index].push(cur);
        return pre + cur;
      }, '');

      // 匹配 less 变量
      variablesMap = (data.match(/^@(?!import).*:.*/gm) || []).reduce(
        (pre: Store, cur: string) => {
          // console.log('cur ->', cur)
          const arr: string[] = cur.split(/:\s*/);
          pre[arr[0]] = arr[1]
            .replace(/;?/g, '')
            .replace(/\/\/.*/g, '')
            .replace(/\/\*.*\*\/.*/g, '')
            ?.trim();
          return pre;
        },
        {}
      );

      console.log('variablesMap', variablesMap)
      
      // 匹配 less 类名
      methodsMap = (data.match(/\.(.+?)\s+{([^]*?)}/g) || []).reduce(
        (pre: Store, cur: string) => {
          // @TODO:
          cur = cur.replace(/@{prefix}/g, 'k');
          const nameMatch = cur.match(/^.+(?=\s+{)/g)
          const name = nameMatch ? (nameMatch[0]).trim() : ''
          const value = cur.replace(new RegExp(`${name}\\s+`), '')
          pre[name] = value
          return pre;
        },
        {}
      );
      // console.log('methodsMap', methodsMap)
      return [{ ...variablesMap, ...methodsMap }, variablesMap, methodsMap];
    },
    (err) => {
      console.log('err', err);
      return [{}, {}, {}];
    }
  );
}
