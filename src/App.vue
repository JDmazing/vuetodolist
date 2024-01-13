<template>
  <v-app>
    <v-main class="main-wrapper">
      <TodoList/>
    </v-main>
  </v-app>
</template>

<script>
import TodoList from './components/TodoList/TodoList';

export default {
  name: 'App',

  components: {
    TodoList,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
.main-wrapper {
  background-color: rgb(134, 226, 233);
}
</style>