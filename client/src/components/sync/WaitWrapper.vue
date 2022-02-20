<template>
  <div>
    <slot v-if="storeInitalized" />
  </div>
</template>

<script>
export default {
  computed: {
    storeInitalized() {
      return this.$store.state.sync.initialized;
    },
  },
  methods: {
    getUrlToken() {
      if (!window.location.search) return undefined;
      try {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has("token")) return searchParams.get("token");
        return undefined;
      } catch {
        return undefined;
      }
    },
    checkToken() {
      if (!this.storeInitalized) return;
      const token = this.getUrlToken();
      if (token) {
        this.$store.commit("setToken", { token });
        window.location.search = "";
      }
    },
  },
  watch: {
    storeInitalized() {
      this.checkToken();
    },
  },
  mounted() {
    this.checkToken();
  },
};
</script>
