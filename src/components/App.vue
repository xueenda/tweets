<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style>
body {
  margin: 0;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir, helvetica, 'helvetica neue', Ubuntu, 'segoe ui', arial, sans-serif;
}

.page {
  /* nesting for the need to test postcss */
  code {
    background-color: #f0f0f0;
    padding: 3px 5px;
    border-radius: 2px;
  }
  padding: 0 20px;
}

</style>

