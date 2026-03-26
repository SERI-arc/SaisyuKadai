<script setup>
import { computed,onMounted } from 'vue'
import { useProjectStore } from '@/stores/project';
import { RouterLink} from 'vue-router'

const projectStore= useProjectStore()

const allQuestionLists = computed(() => projectStore.allQuestionLists)

onMounted(() => {
projectStore.getQuestion()
})

const headers =[
    { title: "表題", value: "QATheme" },
    { title: "起票者", value: "issuerName" },
    { title: "起票日", value: "issueDateFormatted" },
    { title: "回答期日", value: "answerDeadDateFormatted"},
    { title: "回答依頼先", value: "respondentEmployeeName" },
    { title: '', key: 'actions', sortable: false }
]



</script>


<template>
  <v-app>
    <v-main>
      <v-container>
        <v-data-table
            :headers="headers"
            :items="allQuestionLists"
            item-key="id" items-per-page="10"
            @clickRow="projectStore.moveToQuestion"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <Router-link to="/AnswerQA" class="Link">
              <v-btn size="small"
                color="primary"
                @click="projectStore.moveToQuestion(`${item.id}`)">
               回答する
             </v-btn>
           </Router-link>
         </template>
       </v-data-table>
       <div class="d-flex justify-center">
          <Router-link to="/selectProject" class="Link"><v-btn class="ml-3" size="large" rounded="pill">戻る</v-btn></Router-link>
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
