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

//      this.loading = true

      if(this.mailAddress == this.MockMailAddress &&  this.password == this.MockPassword)
        window.location.href = '/Home'
      else{
        this.message = 'ログインに失敗しました'
        this.dialog = true
        this.showOkButton = false
        console.log(this.mailAddress,this.MockMailAddress,this.password,this.MockPassword,)
      }

//本番用ログインロジック
// try {
//   console.log(this.mailAddress)
//   console.log(this.password)
//   const res = await axios.post('https://m3hserita-backapp.m3harbor.net/api/LOGINUSER', {
//     id: this.mailAddress,
//     password: this.password,
//   })

//   console.log('レスポンス:', res)

//   // ステータスコード200で成功判定
//   if (res.status === 200) {
//     this.message = 'ログイン成功！\n\nセッションが作成されました。'
//     this.dialog = true
//     this.showOkButton = true

//     // 自動遷移したい場合は以下を有効化
//     //     window.location.href = '/home'
//   } else {
//     this.message = 'ログインに失敗しました。(Status: ' + res.status + ')'
//     this.dialog = true
//     this.showOkButton = false
//   }
// } catch (err) {
//   // 通信・認証エラー処理
//   if (err.response) {
//     this.message =
//       '通信エラー (' + err.response.status + '): ' + (err.response.data || 'サーバーエラー')
//   } else {
//     this.message = '接続に失敗しました: ' + err.message
//   }
//   this.dialog = true
//   this.showOkButton = false
// } finally {
//   this.loading = false
// }
// },
// },
    }
  }
})
