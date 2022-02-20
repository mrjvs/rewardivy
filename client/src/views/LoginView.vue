<template>
  <div>
    <p>Please login</p>
    <a :href="loginUrl">Login with discord</a>
  </div>
</template>

<script>
import { API_URL } from "../constants";

export default {
  computed: {
    loginUrl() {
      return `${API_URL}/auth/discord`;
    },
  },
};
</script>
