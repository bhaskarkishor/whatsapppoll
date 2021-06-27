<template>
  <div class="full-page-container">
      <div class="text-container">
          <h1>
              Welcome
          </h1>
          <h2>
              to whats app poll
          </h2>
        <router-link to="/create-poll">Create your own pole</router-link>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.full-page-container{
    height: 100vh;
    width: 100vw;
    margin: 0;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    background-color:green;
}
h1{
    font-size: 5em;
}
.text-container{
    margin-left: 10%;
    color:white;
}
</style>