const { readdir } = require('fs').promises;
const path = require('path');
const fs = require('fs');



async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.join(dir, dirent.name);
    if (!dirent.isDirectory()) {
      yield res;
    }
  }
}

;(async () => {
    for await (const f of getFiles('./03-files-in-folder/secret-folder')) {
      fs.stat(f, (err, stats) => {
          const inf = path.parse(f);
          console.log("Name:",inf.name , "\tExt:",inf.ext || "none", "\tSize:", stats.size, 'bytes');
      })
    }
  })()