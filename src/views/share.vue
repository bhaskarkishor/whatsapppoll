<template>
  <v-card max-width="600px" width="90%" class="mx-auto">
      <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
      <v-card-subtitle>
          Share the link in group to collect response
      </v-card-subtitle>
        <v-card-title>
            {{optionsAlt.question}}
        </v-card-title>
      <v-card-text>

            <v-list>
                <v-list-item v-for="(option,idx) in optionsAlt.answers" v-bind:key="idx">
                      <v-list-item-icon v-html="idx+1">
                      </v-list-item-icon>
                      <v-list-item-content v-html="option.text">
                      </v-list-item-content>
                  </v-list-item>
            </v-list>
            
        
          <v-text-field 
          v-model="pollLink" readonly outlined append-icon="mdi-content-copy"
          @click:append="copyLink"
          @click="copyLink"></v-text-field>
          <input type="hidden" id="testing-code" :value="pollMsg">
          <input type="hidden" id="poll-link" :value="pollLink">
      </v-card-text>
      <v-card-actions>
            <v-btn color="green" depressed="" dark @click="shareMessage">
              <v-icon>mdi-whatsapp</v-icon>
              Share
            </v-btn>
          <v-btn text color="red" @click="disablePoll">Disable poll</v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>
import { db } from './../firebase'
export default {
    data(){
        return{
            overlay: false,
            optionsAlt:{
                question:'',
                answers:[]
            }
        }
    },
    async mounted(){
        if(this.options===undefined||this.options===null){
            
          const optionsRef = db.collection(this.$route.params.id).doc("poll").collection('options')
          const questionRef = db.collection(this.$route.params.id).doc('poll')
          await questionRef.get()
            .then((doc)=>{
              if(doc.exists){
                this.optionsAlt.question = doc.data().question
              }
            })
            .catch((error)=>{
              console.log("error: ",error)
              alert("Error Occured!")
            })
          await optionsRef.get()
            .then((querySnapShot)=>{
              querySnapShot.forEach((doc)=>{
                console.log("id:",doc.id,doc.data())
                
                  this.optionsAlt.answers.push({
                    value: doc.id,
                    text: doc.data().text,
                    votes: doc.data().votes
                  })
                
                
              })
            })
            .catch((error)=>{
              console.log("error: ",error)
              alert("Error Occured!")
            })
        }
    },
    computed:{
        pollLink(){
            return window.location.origin+"/#/poll/"+this.$route.params.id
        },
        pollMsg(){
            return this.optionsAlt.question+"\n"+window.location.origin+"/#/poll/"+this.$route.params.id
        }
    },
    methods:{
        copyLink(){
            let testingCodeToCopy = document.querySelector('#poll-link')
            testingCodeToCopy.setAttribute('type', 'text') 
            testingCodeToCopy.select()

            try {
                var successful = document.execCommand('copy');
                // var msg = successful ? 'successful' : 'unsuccessful';
                if(successful){
                    alert('Link was copied, paste it in whatsapp...');    
                }
                else{
                    throw "Something went"
                }
            } catch (err) {
                alert('Oops, unable to copy');
            }

            /* unselect the range */
            testingCodeToCopy.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
        },
        copyMsg(){
            let testingCodeToCopy = document.querySelector('#testing-code')
            testingCodeToCopy.setAttribute('type', 'text') 
            testingCodeToCopy.select()

            try {
                var successful = document.execCommand('copy');
                // var msg = successful ? 'successful' : 'unsuccessful';
                if(successful){
                    alert('Message was copied, paste it in whatsapp...');    
                }
                else{
                    throw "Something went"
                }
            } catch (err) {
                alert('Oops, unable to copy');
            }

            /* unselect the range */
            testingCodeToCopy.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
        },
        shareMessage(){
            window.open("https://wa.me/?text="+encodeURIComponent(this.pollMsg),'_blank')
            // this.copyMsg()
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