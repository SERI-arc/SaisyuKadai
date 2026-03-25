<script setup>
import { computed,onMounted } from 'vue'
import { useProjectStore } from '@/stores/project';
import { RouterLink} from 'vue-router'

const projectStore= useProjectStore()

const selectedProjectLists = computed(() => projectStore.selectedProjectLists)

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
          <v-col cols="4" v-for="selectedProjectList in selectedProjectLists" v-bind:key="selectedProjectList">
          <v-row >
          <v-card variant="elevated" elevation="5" color="#FAFAFA" rounded="x1" class="projectCard">
            <div class="d-flex ">
               <v-card color="#FAFAFA" variant="flat" >
                <v-card-text>案件名:{{selectedProjectList.projectName}}</v-card-text>
                <v-card-text >稼働日：{{selectedProjectList.operationStartDateFormatted}}</v-card-text>
                <div class="d-flex justify-center">
                 <Router-link to="/QAMenu" class="Link"><v-btn @click="moveToQAMenu(`${selectedProjectList.id}`)">選択</v-btn></Router-link>
                </div>
              </v-card>
            </div>
          </v-card>
         </v-row>
        </v-col>
        </v-row>
        <v-row justify="center">
          <Router-link to="/home" class="Link"><v-btn class="ml-3" size="large" rounded="pill">戻る</v-btn></Router-link>
          <Router-link to="/addProject" class="Link"><v-btn class="ml-3" size="large" rounded="pill">案件追加</v-btn></Router-link>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<style scoped>

.projectCard{
  width:900px;
  height:180px;
}

</style>

