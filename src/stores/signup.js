import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useSignUpStore = defineStore('signUp', {
  state: () => ({
    name: ref(''),
    mailAddress: ref(''),
    company:ref(''),
    department:ref(''),
    employeeNumber:ref(null),
    password: ref(''),
    loading: ref(false),
    dialog: ref(false),
    message: ref(''),
    companyList:[ { id: 1, companyName: "第一生命" },
  { id: 2, companyName: "DLTX" }],
    selectedCompanyId:ref(),
    departmentList:[],
    selectedDepartmentId:ref()
  }),

  actions: {
    async getCompany(){
      const res = axios.get('getCompany')
      this.companyList=res.data
    },

        async getDepartment(){
      const res = axios.get('getDepartment')
      this.departmentList=res.data
    },


    async signUp() {
      if (!this.userid || !this.password || !this.displayName) {
        this.message = 'すべての項目を入力してください。'
        this.dialog = true
        return
      }
      this.loading = true
      try {
        const res = await axios.post(
          'https://m3h-serita-saisyukadai.livelyfield-07db6662.japaneast.azurecontainerapps.io/api/SignUp',
          {
            id: this.userid,
            password: this.password,
            name: this.displayName,
          },
          {
            withCredentials: true,
          },
        )
        console.log('レスポンス:', res)
        if (res.status === 200) {
          this.message = res.data.message
          this.dialog = true
          setTimeout(() => (window.location.href = '/login'), 1000)
        } else {
          this.message = res.data.message || '登録に失敗しました。'
          this.dialog = true
        }
      } catch (err) {
        console.error('通信エラー:', err)
        const serverMessage = err.response?.data?.message
        this.message = '通信エラー：' + (serverMessage || err.message || '不明なエラー')
        this.dialog = true
      } finally {
        this.loading = false
      }
    },
  },
})
