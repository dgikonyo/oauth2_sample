<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

onMounted(async () => {
  const code = route.query.code; // Get code from URL

  if (code) {
    try {
      // Send code to backend for token exchange
      const response = await axios.post(`${backendUrl}/auth/google`, { code });
      localStorage.setItem("jwt", response.data.jwt); // Store backend JWT
      localStorage.setItem("access_token", response.data.access_token);
      router.push("/profile");
      
    } catch (error) {
      console.error("Authentication failed", error.message);
      router.push("/sign-up");
    }
  }
});
</script>

<template>
  <div>Processing authentication...</div>
</template>
