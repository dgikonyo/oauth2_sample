<script lang="ts">
  import '@/assets/main.css';
  import { RouterLink, useRouter } from 'vue-router';
  import AuthenticationService from "@/services/auth/AuthenticationService.ts";
  import axios from "axios";
  
  export default {
    name:"LogInView",
    components: {
      RouterLink
    },
    setup() {
      const authService = new AuthenticationService();

      const loginWithGoogle = async () => {
        return await authService.redirectToGoogle();
      };

      return {
        loginWithGoogle,
      };
    },
  };
</script>
<template>
  <section class="login-section">
    <div class="container">
        <div class="option">Login Connect With Social Media</div>
        <div class="twitter">
          <button @click="loginWithGoogle" class="btn-primary"><i class="fab fa-twitter"></i>Sign in With Google</button>
        </div>
        <div class="facebook">
          <button><i class="fab fa-facebook-f"></i>Sign in With Github</button>
        </div>
        <div class="facebook">
          <button><i class="fab fa-facebook-f"></i>Sign in With Microsoft</button>
        </div>
        <div class="facebook">
          <button><i class="fab fa-facebook-f"></i>Sign in With auth0</button>
        </div>
    </div>
  </section>
</template>
