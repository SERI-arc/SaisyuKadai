<script setup>
import { computed } from 'vue'
import { useLoginStore } from '../stores/login'

const loginStore = useLoginStore()
const login = computed(() => loginStore.login)
const showOkButton = computed(() => loginStore.showOkButton)
const message = computed(() => loginStore.message)
</script>

<template>
  <v-app>
    <v-container >
      <v-row justify="center" >
        <v-col cols="12" sm="6" md="4" >
          <v-card class="mx-auto px-6 py-8" max-width="344">
          <v-text-field v-model="loginStore.mailAddress" label="メールアドレス" outlined></v-text-field>

          <v-text-field
            v-model="loginStore.password"
            label="パスワード"
            type="password"
            outlined
          ></v-text-field>

          <!-- ログインボタン -->
          <v-btn color="primary" class="mt-4" block @click="login" :disabled="loading">
            <template v-if="!loading">ログイン</template>
            <template v-else>
              <v-progress-circular
                indeterminate
                color="white"
                size="20"
                class="mr-2"
              ></v-progress-circular>
              認証中...
            </template>
          </v-btn>


          <v-btn variant="text" class="mt-2" block to="/signup"> 新規登録はこちら </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <!-- ダイアログ -->
      <v-dialog v-model="loginStore.dialog" max-width="400">
        <v-card>
          <v-card-title class="headline">メッセージ</v-card-title>
          <v-card-text>{{ message }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="text" v-if="showOkButton" to="/SelectProject"> OK </v-btn>
            <v-btn color="grey" variant="text" @click="loginStore.dialog = false"> 閉じる </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>
