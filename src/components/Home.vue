<script setup>
import { RouterLink} from 'vue-router'

</script>


<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="5">
            <v-card height="150px" >
              <v-card-text>QA台帳</v-card-text>
                <div class="d-flex justify-center">
                   <Router-link to="/SelectProject" class="Link">
                      <v-btn>選択</v-btn>
                   </Router-link>
                </div>
             </v-card>
          </v-col>
          <v-col cols="5">
           <v-card height="150px" >
              <v-card-text>AIチャットボット</v-card-text>
             <div class="d-flex justify-center">
               <Router-link to="/AIChatBot" class="Link">
                <v-btn>選択</v-btn>
               </Router-link>
             </div>
           </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
