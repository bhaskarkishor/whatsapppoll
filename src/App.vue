<template>
<v-app class="d-flex justify-center px-2">
  <div style="height:20vh;width:100vw;background-color:#25D366;justify-content:center;" class="d-flex">
    <img src="@/assets/logo.png" height="70" alt="logo"/>
  </div>
  
  <router-view></router-view>

</v-app>
</template>

<script>
export default {

}
</script>

<style>

.v-card{
  margin-top:-10vh;
}
</style>