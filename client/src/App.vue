<template>
  <div id="app">
    <wait-wrapper>
      <LoginView v-if="!isLoggedIn" />
      <div v-else>
        <SynchorizeBar />
        <router-view />
      </div>
    </wait-wrapper>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import SynchorizeBar from "@/components/sync/SynchorizeBar.vue";
import LoginView from "@/views/LoginView.vue";
import WaitWrapper from "./components/sync/WaitWrapper.vue";

export default {
  components: {
    SynchorizeBar,
    LoginView,
    WaitWrapper,
  },
  computed: {
    isLoggedIn() {
      return (
        this.$store.state.auth.token && this.$store.state.auth.token.length > 0
      );
    },
  },
};
</script>
