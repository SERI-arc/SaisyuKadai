<script setup>
import { computed,onMounted } from 'vue'
import { useProjectStore } from '@/stores/project';
import { RouterLink} from 'vue-router'

const projectStore= useProjectStore()

const selectedProjectLists = computed(() => projectStore.selectedProjectLists)
const selectedProjectNum = computed(() => projectStore.selectedProjectNum)
const moveToQAMenu = computed(() => projectStore.moveToQAMenu)

onMounted(() => {
projectStore.getSelectedProject()
})


</script>


<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="8" v-for="selectedProjectList in selectedProjectLists" v-bind:key="selectedProjectList">
          <v-row dense align="center" justify="center">
          <v-card variant="elevated" elevation="5" color="#FAFAFA" class="w-80" rounded="x1">
            <div class="d-flex ">
               <v-card color="#FAFAFA" variant="flat">
                <!--[]のなかは?.[selectedProjectNum]?.かも？-->
                <v-card-text>案件名{{selectedProjectList?.[0]?.projectName}}</v-card-text>
                <v-card-text >稼働日：{{selectedProjectList?.[0]?.operationStartDate}}</v-card-text>
                <div class="d-flex justify-center">
                 <Router-link to="/QAMenu" class="Link"><v-btn @click="moveToQAMenu(`${selectedProjectList.ProjectId}`)">選択</v-btn></Router-link>
                </div>
              </v-card>
            </div>
          </v-card>
         </v-row>
        </v-col>
        </v-row>
        <v-row justify="center">
          <Router-link to="/addProject" class="Link"><v-btn class="ml-3" size="large" rounded="pill">案件追加</v-btn></Router-link>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

