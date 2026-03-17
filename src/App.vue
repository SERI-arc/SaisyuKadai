<script setup>
import {  RouterView } from 'vue-router'



</script>

<template>
  <v-app>
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
        background-color: rgb(24, 103, 192);
        box-shadow:
          0 2px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
          0 4px 5px 0 var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
          0 1px 10px 0 var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
      "
    >
      <div class="v-toolbar__content" style="height: 48px">
        <div data-v-e8c438bf="" class="v-toolbar-title v-app-bar-title">
          <div class="v-toolbar-title__placeholder">QA台帳管理APP</div>
        </div>
      </div>
    </header>
        <v-main class="contents">
         <RouterView />
        </v-main>
  </v-app>
</template>

<style scoped>
.v-toolbar__content {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  position: relative;
  width: 100%;
}
.contents{
  padding-top:10px;

}
</style>
