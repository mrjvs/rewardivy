<template>
  <div class="home">
    <p>{{ data }}</p>
    <button @click="incrementVersion()">bump version</button>
  </div>
</template>

<script>
export default {
  computed: {
    data() {
      return this.$store.getters.data;
    },
  },
  methods: {
    incrementVersion() {
      this.$store.dispatch("incrementVersion", {
        version: Math.floor(Math.random() * 15),
      });
    },
  },
};
</script>
