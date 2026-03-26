<script setup>
import QAMenu from '../components/QAMenu.vue'
</script>

<template>
<v-card height="60px" flat>
  <v-bottom-navigation
    v-model="bottomNav"
    bg-color="transparent"
    absolute
  >
  <Router-link to="/home" class="Link">
    <v-btn value="recent">
    <v-icon icon="mdi-home"></v-icon>
    <span>HOME</span>
    </v-btn>
  </Router-link>
  <Router-link to="/selectProject" class="Link">
    <v-btn>
      <v-icon icon="mdi-gesture-tap"></v-icon>
      <span>案件選択</span>
    </v-btn>
  </Router-link>
  <Router-link to="/addProject" class="Link">
    <v-btn>
     <v-icon icon="mdi-plus"></v-icon>
     <span>案件追加</span>
    </v-btn>
  </Router-link>
    <Router-link to="/IssueQA" class="Link">
    <v-btn>
     <v-icon icon="mdi-file-question"></v-icon>
     <span>新規QA起票</span>
    </v-btn>
  </Router-link>
  </v-bottom-navigation>
</v-card>
  <main>
    <QAMenu />
  </main>
</template>
