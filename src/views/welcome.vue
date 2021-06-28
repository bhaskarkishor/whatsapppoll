<template>
  <div>
      <div class="upper-container">
          <v-container>
          <div class="text-h6">
              Welcome to
          </div>
          <div class="text-h1">
              WhatsApp Poll
          </div>          
          </v-container>
      </div>
      <v-container>
         
        <v-btn color="green" dark outlined to="/create-poll">
            Create your own pole
        </v-btn>
      </v-container>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.upper-container{
    background-color:green;
    height: 25vh;
    margin:0;
    color: white;
}
</style>