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

//テスト用ログインロジック
/*      if(this.mailAddress == this.MockMailAddress &&  this.password == this.MockPassword)
        window.location.href = '/home'
      else{
        this.message = 'ログインに失敗しました'
        this.dialog = true
        this.showOkButton = false
        console.log(this.mailAddress,this.MockMailAddress,this.password,this.MockPassword,)
      }*/

//本番用ログインロジック
 try {
   console.log(this.mailAddress)
   console.log(this.password)
   const res = await axios.post('https://m3h-serita-saisyukadai.livelyfield-07db6662.japaneast.azurecontainerapps.io/api/Login', {
     mailAddress: this.mailAddress,
     password: this.password,
   })

   console.log('レスポンス:', res)

   // ステータスコード200で成功判定
   if (res.status === 200) {
     this.message = 'ログイン成功！\n\nセッションが作成されました。'
     this.dialog = true
     this.showOkButton = true

     window.location.href = '/home'
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
 },
    })
