<script setup>
import { computed,onMounted } from 'vue'
import { useProjectStore } from '@/stores/project';
import { RouterLink} from 'vue-router'

const projectStore= useProjectStore()
const projectLists = computed(() => projectStore.projectLists)
const addMemberToProject =computed(()=>projectStore.addMemberToProject)

onMounted(() => {
projectStore.getProject()
})


</script>


<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="6">
            <v-select :items="projectLists" item-value="id" item-title="projectName" label="案件を選択してください" v-model="projectStore.project"></v-select>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-card color="#FAFAFA" variant="flat" height="150px">
              <v-card-text>案件名：{{ projectLists.projectName }}</v-card-text>
              <v-card-text>稼働日：{{ projectLists.operationStartDate }}</v-card-text>
              <div class="d-flex justify-center">
                <v-btn @click="addMemberToProject">追加</v-btn>
              </div>
            </v-card>
          </v-col>

        </v-row>
        <v-row justify="center">
          <Router-link to="/SelectProject" class="Link"><v-btn class="ml-3" size="large" rounded="pill">戻る</v-btn></Router-link>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
