<script setup>
import { RouterLink} from 'vue-router'

</script>


<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
        <v-col cols="12" sm="6" md="8" >
          <v-card class="mx-auto px-6 py-8" max-width="700">
        <v-row justify="center">
          <v-col cols="5">
           <v-card
              max-width="340"
              color="red-lighten-4"
              link to ="/QAMenu"
              >
            <v-card-text class="text-title-large mb-1" >
              QA台帳
            </v-card-text>
              <template v-slot:actions>
             </template>
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
        </v-card>
        </v-col>
      </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
