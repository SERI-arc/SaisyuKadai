<script setup>
import { computed,onMounted } from 'vue'
import { useProjectStore } from '@/stores/project';
import { RouterLink} from 'vue-router'

const projectStore= useProjectStore()
const addMemberToProject =computed(()=>projectStore.addMemberToProject)
const searchedProjectList =computed(()=>projectStore.searchedProjectList)
const searchProjectNum =computed(()=>projectStore.searchProjectNum)
onMounted(() => {
projectStore.getProject()
})


</script>


<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="6">
            <v-select :items="projectStore.projectLists"  item-title="projectName" label="案件を選択してください" v-model="projectStore.project"></v-select>
          </v-col>
          <v-col cols="2">
            <v-btn @click="projectStore.searchProject">検索</v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-card color="#FAFAFA" variant="flat" height="150px">
              <v-card-text>案件名：{{ searchedProjectList?.[searchProjectNum]?.projectName }}</v-card-text>
              <v-card-text>稼働日：{{ searchedProjectList?.[searchProjectNum]?.operationStartDateConverted }}</v-card-text>
              <div class="d-flex justify-center">
                <v-btn @click="addMemberToProject">追加</v-btn>
              </div>
            </v-card>
          </v-col>

        </v-row>
        <v-row justify="center" class="btn">
          <Router-link to="/SelectProject" class="Link"><v-btn size="large" rounded="pill">戻る</v-btn></Router-link>
        </v-row>
        <v-dialog v-model="projectStore.addProjectDialog" max-width="400">
        <v-card>
            <v-card-title class="headline">メッセージ</v-card-title>
                <v-card-text>{{ projectStore.addProjectDialogMessage }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="text" @click="projectStore.addProjectDialog = false">
               閉じる
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-container>
    </v-main>
  </v-app>


</template>
<style scoped>

.btn{
  padding-top:1rem ;
}


</style>

