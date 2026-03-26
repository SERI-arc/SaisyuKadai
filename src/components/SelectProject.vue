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

.projectCard{
  width:900px;
  height:200px;
}

</style>

