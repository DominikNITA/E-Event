<template>
  <div class="wrapper">
    <div class="title-text">
      <div class="title signup">Signup Form</div>
    </div>
    <div class="form-container">
      <div class="form-inner">
        <form action="{% url 'connexion' %}" class="signup">
          <div class="field">
            <input type="text" placeholder="Email Address" required />
          </div>
          <div class="field">
            <input type="password" placeholder="Password" required />
          </div>
          <div class="field">
            <input type="password" placeholder="Confirm password" required />
          </div>
          <div class="field btn">
            <div class="btn-layer"></div>
            <input type="submit" value="Signup" />
          </div>
          <div class="signup-link">
            Already have an account?
            <router-link :to="{ name: 'Login' }">Login in!</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/styles/authViews.css";
export default {};
</script>

<style>
</style>