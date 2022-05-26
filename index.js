const dynamicImport = ctx => {  
  const {
    exclude,
    include,
    target, 
    tStart, 
    tEnd
  } = {
    exclude: [ ],
    include: [ ],
    target: '@import',
    tStart: '(',
    tEnd: ')',
    ...ctx,
  };

  let command, mode;
  const order_deny = (Object.keys(ctx).indexOf('exclude') >>> 0) <= (Object.keys(ctx).indexOf('include') >>> 0);
  const _deny = (!order_deny && exclude.length == 0)?false:null;
  const _allow = (order_deny && include.length == 0)?false:null;


  function escapeRegExp(str) {
    return (str + '').replace(/[-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  const allow_reg = include.reduce((t, p) => {
    t.push(new RegExp(p, 'igm'));
    return t;
  },[])

  const deny_reg = exclude.reduce((t, p) => {
    t.push(new RegExp(p, 'igm'));
    return t;
  },[])

  const chk_allow = (id) => {
    return allow_reg.some(re => (re.lastIndex = 0) || re.test(id));
  }
  const chk_deny = (id) => {
    return deny_reg.some(re => (re.lastIndex = 0) || re.test(id));
  }

  return {
    name: 'vite-dynamicImport',
    // enforce: 'pre',
    config(config, args) {
      command = args.command;
      mode = args.mode;
    },
    transform: (ctx, id) => {
      const deny = _deny??chk_deny(id);
      const allow = _allow??chk_allow(id);
      if(order_deny) {
        if(deny && !allow) return false;
      } else {
        if(!allow || deny) return false;
      }
      
      const t0 = escapeRegExp(target);
      const t1 = escapeRegExp(tStart);
      const t2 = escapeRegExp(tEnd);
      return (
        ('development' == mode)?
        (str, id) => str.replace(new RegExp(`${t0}${t1}([^${t2}]+)${t2}`, 'igm'), (m, u) => `import(${u})`)
        :
        (str, id) => {
          return str.replace(new RegExp(`${t0}${t1}([^${t2}]+)${t2}`, 'igm'), function(m, u) {
            return `(new Function('return ' + (()=> import(${u})).toString().replace(/.+(import\\([^\\)]+\\)).*/,"$1") + ';'))()`;
          });
        }
      )(ctx, id);
    }
  };
};

export {
  dynamicImport,
};
