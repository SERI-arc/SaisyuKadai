<script setup>
import { computed,onMounted } from 'vue'
import { useProjectStore } from '@/stores/project';
import { RouterLink} from 'vue-router'

const projectStore= useProjectStore()

const selectedProjectLists = computed(() => projectStore.selectedProjectLists)

const moveToQAMenu = computed(() => projectStore.moveToQAMenu)
const operationStartProject = computed(() => projectStore.operationStartProject)

onMounted(() => {
projectStore.getSelectedProject()
})


const headers =[
    { title: "案件名", value: "projectName" },
    { title: "稼働日", value: "operationStartDateFormatted" },
    { title: '', key: 'actions', sortable: false }
]


</script>


<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="3">
          <v-card height="50px" width="200px">
           <div class="d-flex align-center justify-center fill-height">
              <div style="font-size:10px">案件数
              <div>
              <v-icon icon="mdi-briefcase-outline" class="icon"></v-icon>
              <span style="font-size:20px">{{selectedProjectLists.length}}件</span>
              </div>
              </div>
           </div>
          </v-card>
          </v-col>
          <v-col cols="3">
          <v-card height="50px" width="200px">
           <div class="d-flex align-center justify-center fill-height">
              <div style="font-size:10px">今月稼働
              <div>
              <v-icon icon="mdi-briefcase-outline" class="icon"></v-icon>
              <span style="font-size:20px">{{operationStartProject}}件</span>
              </div>
              </div>
           </div>
          </v-card>
          </v-col>
        </v-row>
        <v-data-table
            :headers="headers"
            :items="selectedProjectLists"
            item-key="id" items-per-page="10"
            @clickRow="projectStore.moveToQuestion"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <Router-link to="/QAMenu" class="Link">
              <v-btn size="small"
                color="primary"
                @click="moveToQAMenu(`${item.id}`)">
               選択する
             </v-btn>
           </Router-link>
         </template>
       </v-data-table>
      </v-container>
    </v-main>
  </v-app>
</template>


<style scoped>

.icon{
  padding-right:10px

}

.projectCard{
  width:900px;
  height:200px;
}


</style>

