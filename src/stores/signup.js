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
    companyList:[],
    DLDepartmentList:[],
    DLTXDepartmentList:[],
    BPdepartmentList:[],
   // companyList:[ { id: 1, companyName: "第一生命" }, { id: 2, companyName: "DLTX" }],
   // DLDepartmentList:[{companyId:1,departmentId:1,departmentName:"契約サービス部"},{companyId:1,id:2, departmentName:"保険金部 "}],
   // DLTXDepartmentList:[{companyId:2,departmentId:1,departmentName:"期日年金担当"},{companyId:2,id:2, departmentName:"保険金担当"}],
   // BPdepartmentList:[{companyId:3,departmentId:1,departmentName:"開発本部 "},{companyId:3,id:2, departmentName:"保守部 "}],
    selectedCompanyId:ref(),
    departmentLists:[],
    departmentList:[],
    selectedDepartmentId:ref()
  }),

  actions: {
    async getCompany(){
      const res = axios.get('https://backapp-serita-saisyu.m3harbor.net/api/getAllCompanyId')
      this.companyList=res.data
      console.log(this.companyList)
    },

        async getDepartment(){
      const res = axios.get('https://backapp-serita-saisyu.m3harbor.net/api/GetAllDepartmentId')
      this.departmentLists=res.data
      console.log(res.deta);
      console.log(this.departmentLists)
      for (let departmentList of this.departmentLists){
        if(departmentList.companyId == 1){
          departmentList.push(this.DLDepartmentList);
        }else if (departmentList.companyId == 2){
          departmentList.push(this.DLTXDepartmentList);
        }else{
         departmentList.push(this.BPdepartmentList);
        }
      }
    },

    setDepartmentList(){
      if (this.selectedCompanyId ==1){
        this.departmentList.push(this.DLDepartmentList);
      }else if(this.selectedCompanyId ==2){
        this.departmentList.push(this.DLTXDepartmentList);
      }else{
        this.departmentList.push(this.BPdepartmentList);
      }
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
          'https://backapp-serita-saisyu.m3harbor.net/api/SignUp',
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
