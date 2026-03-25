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
              <v-card color="#FAFAFA" variant="flat" class="questionCard" align="center" justify="center">
                <v-card-text >表題:{{allQuestionList.QATheme}}</v-card-text>
                <v-card-text >起票日:{{allQuestionList.issueDateFormatted}}</v-card-text>
                <v-card-text >起票者:{{allQuestionList.issuerName}}</v-card-text>
                <v-card-text >回答依頼先：{{allQuestionList.respondentEmployeeName}}</v-card-text>
                <div class="d-flex justify-center">
                  <Router-link to="/AnswerQA" class="Link"><v-btn @click="projectStore.moveToQuestion(`${allQuestionList.id}`)" >選択</v-btn></Router-link>
                </div>
              </v-card>
            </v-row>
          </v-col>
        </v-row>
        <div class="d-flex justify-center">
          <Router-link to="/selectProject" class="Link"><v-btn class="ml-3" size="large" rounded="pill">戻る</v-btn></Router-link>
          <Router-link to="/IssueQA" class="Link"><v-btn>新規起票</v-btn></Router-link>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>

.questionCard{
  width:700px;
  height:250px;
}

</style>
