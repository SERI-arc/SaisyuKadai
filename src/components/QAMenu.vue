<script setup>
import { computed,onMounted } from 'vue'
import { useProjectStore } from '@/stores/project';
import { RouterLink} from 'vue-router'

const projectStore= useProjectStore()
const allQuestionLists = computed(() => projectStore.allQuestionLists)
onMounted(() => {
projectStore.getQuestion()
})


</script>


<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="4" v-for="allQuestionList in allQuestionLists" v-bind:key="allQuestionList">
         <v-row dense align="center" justify="center">
            <div class="d-flex ">
              <v-card color="#FAFAFA" variant="flat">
                <v-card-text >起票日{{allQuestionList.IssueDate}}</v-card-text>
                <v-card-text >起票者{{allQuestionList.issuer}}</v-card-text>
                <v-card-text >回答依頼先：{{allQuestionList.assignedResponderId}}</v-card-text>
                <div class="d-flex justify-center">
                 <Router-link to="/QuestionList" class="Link"><v-btn @click="projectStore.moveToQuestion(allQuestionList.QuestionId)" >選択</v-btn></Router-link>
                </div>
              </v-card>
            </div>
        </v-row>
          </v-col>
        </v-row>
        <div class="d-flex justify-center">
         <Router-link to="/IssueQA" class="Link"><v-btn>新規起票</v-btn></Router-link>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
