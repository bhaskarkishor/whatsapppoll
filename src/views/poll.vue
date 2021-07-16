<template>
<v-card width="90%" max-width="600px" class="mx-auto">
  <v-card-subtitle>
    Select your choice
  </v-card-subtitle>
  <v-card-text>
    <vue-poll v-show="showResults" v-bind="options2" @addvote="addVote"/>
    <vue-poll v-show="!showResults" v-bind="options1" @addvote="addVote"/>
  </v-card-text>
  <v-card-actions>
    <v-btn @click="shareResults" v-show="showResults" dark depressed color="green">
      <v-icon>mdi-whatsapp</v-icon>
      Share results
    </v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
import VuePoll from 'vue-poll'
import firebase,{ db } from './../firebase'
// import 'firebase/firestore';

export default {
  data() {
    return {
      showResults: localStorage.getItem(this.$route.params.id)==="true",
      options1: {
        question: '',
        answers: [],
        showResults: localStorage.getItem(this.$route.params.id)==="true"
      },
      options2: {
        question: '',
        answers: [],
        showResults: true
      }
    }
  },
  created(){
    this.fetchPolls()
  },
  components: {
    'vue-poll':VuePoll
  },
  methods: {
    async fetchPolls(){
      const optionsRef = db.collection(this.$route.params.id).doc("poll").collection('options')
      const questionRef = db.collection(this.$route.params.id).doc('poll')
      await questionRef.get()
        .then((doc)=>{
          if(doc.exists){
            // this.showResults = doc.data().showResults
            if(this.showResults){
              this.options2.question = doc.data().question
            }
            else{
              this.options1.question = doc.data().question
            }
            
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
            if(this.showResults){
              this.options2.answers.push({
                value: doc.id,
                text: doc.data().text,
                votes: doc.data().votes
              })
            }
            else{
              this.options1.answers.push({
                value: doc.id,
                text: doc.data().text,
                votes: doc.data().votes
              })
            }
            
          })
        })
        .catch((error)=>{
          console.log("error: ",error)
          alert("Error Occured!")
        })
      return
    },
    addVote(obj){
      console.log('You voted ' + obj.value + '!');
      console.log('Total votes:',obj.votes);
      const optionRef = db.collection(this.$route.params.id).doc('poll').collection('options')
      optionRef.doc(obj.value).update({
        votes: firebase.firestore.FieldValue.increment(1)
      })
      localStorage.setItem(this.$route.params.id, true)
      this.showResults = true
    },
    shareResults(){
      let msg = this.options2.question+"\n"
      this.options2.answers.forEach((obj)=>{
        msg += obj.text + ' : '+obj.votes + '\n'
      })
      window.open("https://wa.me/?text="+encodeURIComponent(msg),'_blank')
    }
  }
};
</script>

<style>
</style>
