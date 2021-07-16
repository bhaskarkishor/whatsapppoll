<template>
<v-app class="d-flex justify-center px-2">
  <div style="height:20vh;width:100vw;background-color:#25D366;justify-content:center;" class="d-flex">
    <img src="@/assets/logo.png" height="70" alt="logo"/>
  </div>
  
  <router-view></router-view>
    <p class="text-subtitle-2 text-center mt-1">
      Made by <a class="text-decoration-none" href="https://github.com/bhaskarkishor">bhaskarkishor</a>
    </p>
</v-app>
</template>

<script>
export default {

};
</script>

<style>

.v-card{
  margin-top:-10vh;
}
</style>