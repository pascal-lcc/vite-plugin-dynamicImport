# vite-plugin-dynamicImport

Vite plugin to handle your resources. For example, Vite plugin to handle your resources. For example, @import().then()

## How to use in project:

Install [npm package][npm] in your project like `devDependencies`:

```shell
  npm install --save-dev vite-plugin-dynamicImport
```

In the `vite.config.js` file, import the library and add it to the plugins list:

```javascript
// vite.config.js
import {dynamicImport} from 'vite-plugin-dynamicImport'; // here
export default defineConfig({
  plugins: [
    vue(),
    dynamicImport({
        tStart: '(',
        tEnd:   ')',
        target: '@import',
        include: ['/(\.js|\.vue)/'],
        exclude: [/node_modules/],
    }),
  ],
});
```

## exclude

```javascript
// vite.config.js
import {dynamicImport} from 'vite-plugin-dynamicImport'; // here
export default defineConfig({
  plugins: [
    vue(),
    dynamicImport({
        tStart: '(',
        tEnd:   ')',
        target: '@import',
        exclude: [/node_modules/],
    }),
  ],
});
```

## include

```javascript
// vite.config.js
import {dynamicImport} from 'vite-plugin-dynamicImport'; // here
export default defineConfig({
  plugins: [
    vue(),
    dynamicImport({
        tStart: '(',
        tEnd:   ')',
        target: '@import',
        include: [/src\/.+\.(vue|js)/],
    }),
  ],
});

In your working files, you can use code like this, then:

```javascript
// example.vue or  example.js

function mycode() {
    return new Promise((resolve) => {
      @import("@/myexample.js").then(m => {
          console.log('loaded:', m);
          resolve('loaded:', m);
      });
)

postMessage({'code' mycode.toString()});


@worker

onmessage = function(e) {
  const data = e.data;
  (new Function('self', 'return '+ e.data.code)().bind(self))(...args).then(m =>
    console.log("LOAD code");
  )
}

```

other example

```javascript
// vite.config.js
import {dynamicImport} from 'vite-plugin-dynamicImport'; // here
export default defineConfig({
  plugins: [
    vue(),
    dynamicImport({
        tStart: '{',
        tEnd:   '}',
        target: 'IMPORT',
        exclude: [/node_modules/],
    }),
  ],
});

you can use code like this:
```javascript
// example.vue or  example.js

function mycode() {
    return new Promise((resolve) => {
      IMPORT{"@/myexample.js"}.then(m => {
          console.log('loaded:', m);
          resolve('loaded:', m);
      });
)
```
