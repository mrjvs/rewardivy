<template>
  <div>
    <div v-if="isSyncing">syncing...</div>
    <div v-else-if="hasSyncingFailed">
      Failed to sync <button @click="sync()">Retry</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isSyncing", "hasSyncingFailed"]),
  },
  methods: {
    sync() {
      this.$store.dispatch("startSync");
    },
  },
};
</script>
