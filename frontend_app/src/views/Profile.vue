<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const profile = ref(null);
const error = ref("");

async function fetchProfile() {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get("http://localhost:3000/api/v1/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    profile.value = response.data.user;
  } catch (err) {
    error.value = "Unauthorized. Please sign in again.";
  }
}

onMounted(fetchProfile);
</script>

<template>
  <div>
    <h2>Profile</h2>
    <p v-if="error">{{ error }}</p>
    <div v-if="profile">
      <p>Email: {{ profile.email }}</p>
    </div>
  </div>
</template>
