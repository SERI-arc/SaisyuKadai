<script setup>
import {  RouterView } from 'vue-router'



</script>

<template>
  <v-app>
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

.v-toolbar__content{
  padding-left:10px;
}

.v-toolbar-title__placeholder{
  color:black;
  font-family:"M PLUS 1", sans-serif
}
</style>
