<script setup>
import { RouterLink} from 'vue-router'
import {ref} from 'vue'
import axios from 'axios'

    const message = ref('');
    const messages = ref([]);

    const sendMessage = async () => {
      const trimmed = message.value.trim();
      if (!trimmed) return;

      messages.value.push({ role: 'user', text: trimmed });
      message.value = '';

      try {
        // API呼び出し
        const response = await axios.post('※ここにAPIのURLを記載※', {
          message: trimmed
        });

        const contentText = 'テスト応答';
        messages.value.push({ role: 'bot', text: contentText });

        console.log('レスポンス:', response);
      } catch (error) {
        console.error('APIエラー:', error);
        messages.value.push({ role: 'bot', text: 'APIエラーが発生しました。' });
      }
    };


</script>


<template>
  <v-app>
    <v-main>
      <v-container class="AIChatBot">
      <v-container>
       <div
          v-for="(m, i) in messages"
          :key="i"
          class="mb-2 d-flex"
          :class="{'justify-end': m.role === 'user', 'justify-start': m.role === 'bot'}"
        >
          <v-sheet
            :class="[m.role === 'user' ? 'bg-indigo-lighten-5' : 'bg-grey-lighten-3', 'pa-3', 'rounded-lg']"
            elevation="1"
            max-width="60%"
          >
            <div class="text-pre-line">{{ m.text }}</div>
          </v-sheet>
        </div>
      </v-container>

      <!-- 入力欄 -->
      <div class="chat-input-bar">
        <v-container class="pa-2">
          <v-row no-gutters>
            <v-col cols="10">
              <v-textarea
                v-model="message"
                placeholder="メッセージを入力..."
                auto-grow
                rows="1"
                variant="outlined"
                hide-details
                rounded
              ></v-textarea>
            </v-col>
            <v-col cols="2" class="pl-2">
              <v-btn color="primary" block class="mt-2" @click="sendMessage">
                送信
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.AIChatBot {
  height: 100%;
  margin: 0;
  background-color: #fff;
}

.chat-input-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
</style>
