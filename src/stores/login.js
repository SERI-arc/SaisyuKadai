import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useLoginStore = defineStore('login', {
  state: () => ({
    mailAddress: ref(''),
    password: ref(''),
    loading: ref(false),
    dialog: ref(false),
    message: ref(''),
    showOkButton: ref(false),
    MockMailAddress:ref('AAAA'),
    MockPassword:ref('AAAA')
  }),

  actions: {
    async login() {
      if (!this.mailAddress || !this.password) {
        this.message = 'メールアドレスとパスワードを入力してください。'
        this.dialog = true
        this.showOkButton = false
        return
      }
     try {
        const res = await axios.post('https://backapp-serita-saisyu.m3harbor.net/api/Login', {
        mailAddress: this.mailAddress,
        password: this.password,
       })

        // ステータスコード200で成功判定
        if (res.status === 200) {
          this.message = 'ログインしました。'
          this.dialog = true
          this.showOkButton = true
          window.location.href = '/SelectProject'

        } else {
          this.message = 'ログインに失敗しました。(Status: ' + res.status + ')'
          this.dialog = true
          this.showOkButton = false
         }
      } catch (err) {
        if (err.response) {
         this.message =
         '通信エラー (' + err.response.status + '): ' + (err.response.data || 'サーバーエラー')
        } else {
         this.message = '接続に失敗しました: ' + err.message
        }
          this.dialog = true
          this.showOkButton = false
      } finally {
         this.loading = false
       }
    },

      async logout () {
      this.loading = true;
      try {
        await axios.post('https://backapp-serita-saisyu.m3harbor.net/api/Logout');
        this.message = "ログアウトしました。\nログインページに戻ります。";
        this.dialog = true;
        setTimeout(() => window.location.href = '/', 1500);
      } catch (err) {
        this.message = "ログアウトに失敗しました。";
        this.dialog = true;
      } finally {
        this.loading = false;
      }
    },
  }
    })
