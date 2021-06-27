<template>
      <v-card width="600" class="mx-auto my-10">
        <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
          <v-card-title>
              Create your poll
          </v-card-title>
          <v-card-text>
              <v-text-field label="What is your question?" v-model="options.question"></v-text-field>
              <v-list>
                  <v-list-item v-for="(option,idx) in options.answers" v-bind:key="idx">
                      <v-list-item-icon v-html="idx+1">
                      </v-list-item-icon>
                      <v-list-item-content v-html="option.text">
                      </v-list-item-content>
                      <v-list-item-action>
                          <v-btn @click="deleteOption(option.value)" icon color="red">
                              <v-icon>mdi-delete</v-icon>
                          </v-btn>
                      </v-list-item-action>
                  </v-list-item>
              </v-list>
                <v-text-field label="Add option" v-model="option" append-icon="mdi-plus" @click:append="addOption" @keydown.enter="addOption"></v-text-field>
          </v-card-text>
          <v-card-actions>
              <v-btn @click="createPoll" text class="text--green">Create Poll</v-btn>
              <v-btn @click="clearAll" text>Reset</v-btn>
          </v-card-actions>
      </v-card>
</template>

<script>
import { db } from './../firebase'

export default {
    data(){
        return{
            option:'',
            counter: 0,
            collection_id:null,
            options: {
                question: '',
                answers: []
            },
            overlay: false
        }
    },
    methods:{
        addOption(){
            this.option = this.option.trim()
            if(this.option.length===0){
                alert("Value invalid!")
                return
            }
            this.options.answers.push({
                value: this.counter,
                text: this.option,
                votes: 0
            })
            this.counter++
            this.option = ''
        },
        deleteOption(val){
            this.options.answers = this.options.answers.filter(obj => obj.value!=val)
        },
        async generateCollectionId(){
            this.collection_id = Math.random().toString(36).substring(7);
        },
        async createPoll(){
            this.overlay = true
            this.generateCollectionId()
            if(this.option.length!==0){
                this.addOption()
            }
            let batch = db.batch()
            batch.set(db.collection(this.collection_id).doc('poll'),{
                'question': this.options.question,
                'showResults': false
            })
            await this.options.answers.forEach((doc)=>{
                let docRef = db.collection(this.collection_id).doc('poll').collection('options').doc()
                console.log("docRef:",docRef)
                batch.set(docRef,doc)
            })
            await batch.commit()
            .then((response)=>{
                console.log(response);
            })
            .catch((err)=>{
                console.log(err)
                return
            })
            this.overlay = false
            this.$router.push("/share/"+this.collection_id)
        },
        clearAll(){
            this.options = {
                question: '',
                answers: [],
                showResults: false
            }
        }
    }
}
</script>

<style>

</style>