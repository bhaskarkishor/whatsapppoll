<template>
  <v-card max-width="600px" width="90%" class="mx-auto">
      <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
      <v-card-title>
          Share the link in group to collect response
      </v-card-title>
      <v-card-text>
          <v-text-field 
          v-model="pollLink" readonly outlined append-icon="mdi-content-copy"
          @click:append="copyLink"
          @click="copyLink"></v-text-field>
          <input type="hidden" id="testing-code" :value="pollLink">
      </v-card-text>
      <v-card-actions>
          <v-btn text disabled="">Share</v-btn>
          <v-btn text color="red" @click="disablePoll">Disable poll</v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>
import { db } from './../firebase'
export default {
    data(){
        return{
            overlay: false
        }
    },
    computed:{
        pollLink(){
            return window.location.origin+"/#/poll/"+this.$route.params.id
        }
    },
    methods:{
        copyLink(){
            let testingCodeToCopy = document.querySelector('#testing-code')
            testingCodeToCopy.setAttribute('type', 'text') 
            testingCodeToCopy.select()

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                alert('Link was copied ' + msg);
            } catch (err) {
                alert('Oops, unable to copy');
            }

            /* unselect the range */
            testingCodeToCopy.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
        },
        disablePoll(){
            this.overlay = true
            let pollRef = db.collection(this.$route.params.id)
            pollRef.doc("poll").update({
                showResults: true
            })
            .then((res)=>{
                console.log("Response:",res)
            })
            .catch((err)=>{
                console.log("Error:",err)
            })
            .finally(()=>this.overlay = false)
        }
    }
}
</script>

<style>

</style>