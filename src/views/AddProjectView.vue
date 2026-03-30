<script setup>
import Home from '../components/AddProject.vue'
import { useLoginStore } from '@/stores/login';

const loginStore = useLoginStore()


</script>

<template>
      <header
      data-v-e8c438bf=""
      class="v-toolbar v-toolbar--collapse-start v-toolbar--density-compact bg-primary v-theme--light v-locale--is-ltr v-app-bar"
      style="
        top: 0px;
        z-index: 1004;
        transform: translateY(0px);
        position: fixed;
        left: 0px;
        width: calc(100% + 0px);
        background-color: rgb(255, 255, 255);
        box-shadow:
          0 2px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
          0 4px 5px 0 var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
          0 1px 10px 0 var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
      "
    >
      <div class="v-toolbar__content" style="height: 48px">
        <div data-v-e8c438bf="" class="v-toolbar-title v-app-bar-title">
          <div class="v-toolbar-title__placeholder">
            <span>QA台帳管理APP</span>
          </div>
        </div>
            <v-bottom-navigation
      v-model="bottomNav"
      bg-color="transparent"
      class="navbtn"
      absolute>
     <v-btn value="recent" Rink to="/selectProject">
       <v-icon icon="mdi-home" color="red"></v-icon>
       <span>HOME</span>
     </v-btn>
     <v-btn Rink to="/addProject">
       <v-icon icon="mdi-plus"  color="blue"></v-icon>
       <span >案件追加</span>
     </v-btn>
     <v-btn Rink to="/AIChatBot">
       <v-icon icon="mdi-robot-outline" color="green"></v-icon>
       <span>AIチャット</span>
     </v-btn>
      <v-btn @click="loginStore.logout" Rink to="/" >
        <v-icon icon="mdi-logout" ></v-icon>
        <span>ログアウト</span>
      </v-btn>
     </v-bottom-navigation>
      </div>

    </header>
  <main>
    <Home />
  </main>
</template>

<style scoped>
.v-toolbar__content {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  position: relative;
  width: 100%;
}

.v-toolbar__content{
  padding-left:70px;
}

.v-toolbar-title__placeholder{
  color:black;
  font-family:"M PLUS 1", sans-serif
}
</style>

