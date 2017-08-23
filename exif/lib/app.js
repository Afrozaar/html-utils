extractCaption = (json, options = {}) => {
  let debug = (options.debug || false);
  let keywords = options.keywords || ['Caption-Abstract', 'Description', 'UserComment', 'Title', 'XPTitle', 'XPSubject', 'XPComment', 'ImageDescription'];

  const walkTree = (node) => {

    if (debug) console.debug(`Walking tree from %o`, node);

    let isObj = obj => typeof obj === 'object';
    let isKeyword = k => keywords.includes(k);

    return Object.keys(node)
      .map(it => {
        let val = node[it];
        if (isObj(val)) {
          if (debug) console.debug(`recursing for key '${it}'...`);
          return walkTree(val);
        } else if (isKeyword(it)) {
          if (debug) console.info(`Found value for matching key '${it}': ${val}`);
          return val;
        }
      })
      .reduce((acc, next) => {
        if (debug) console.debug('reducing: acc=%o, next=%o', acc, next);
        if (next) {
          return acc.concat(next);
        } else {
          return acc;
        }
      }, []);
  };

  let captions = walkTree(json);

  return [...new Set(captions)].sort();

};
