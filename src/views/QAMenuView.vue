<script setup>
import QAMenu from '../components/QAMenu.vue'
import { useLoginStore } from '@/stores/login';

const loginStore = useLoginStore()
</script>

<template>
<v-card height="60px" flat>
  <v-bottom-navigation
    v-model="bottomNav"
    bg-color="transparent"
    absolute
  >
  <Router-link to="/selectProject" class="Link">
    <v-btn value="recent">
    <v-icon icon="mdi-home"></v-icon>
    <span>HOME</span>
    </v-btn>
  </Router-link>
  <Router-link to="/addProject" class="Link">
    <v-btn>
     <v-icon icon="mdi-plus"></v-icon>
     <span>案件追加</span>
    </v-btn>
  </Router-link>
  <Router-link to="/AIChatBot" class="Link">
    <v-btn>
     <v-icon icon="mdi-robot-outline"></v-icon>
     <span>AIチャット</span>
    </v-btn>
  </Router-link>
  <Router-link to="/IssueQA" class="Link">
    <v-btn>
     <v-icon icon="mdi-file-question"></v-icon>
     <span>新規QA起票</span>
    </v-btn>
  </Router-link>
    <Router-link to="/" class="Link">
    <v-btn @click="loginStore.logout">
     <v-icon icon="mdi-logout"></v-icon>
     <span>ログアウト</span>
    </v-btn>
  </Router-link>
  </v-bottom-navigation>
</v-card>
  <main>
    <QAMenu />
  </main>
</template>
