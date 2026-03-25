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
    companyList:ref(["第一生命","DLTX","BP"]),
    DLDepartmentList: ref(["契約サービス部","保険金部","IT企画部"]),
    DLTXDepartmentList: ref(["期日年金担当","保全担当","証明担当"]),
    BPDepartmentList: ref(["開発部","保守運用部","サポート部"]),
    selectedCompany:ref(),
    departmentLists:[],
    departmentList:[],
    selectedDepartment:ref(),
    selectedCompanyId:ref(),
    selectedDepartmentId:ref(),
  }),

  actions: {

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
      if ( !this.password || !this.selectedCompany || !this.selectedDepartment || !this.employeeNumber || !this.mailAddress) {
        this.message = 'すべての項目を入力してください。'
        this.dialog = true
        return
      }
      this.loading = true
      try {
        if (this.selectedCompany === this.companyList[0]) {
         this.selectedCompanyId = 1;
         if (this.selectedDepartment === this.DLDepartmentList[0]) {
          this.selectedDepartmentId = 1;
         } else if (this.selectedDepartment === this.DLDepartmentList[1]) {
          this.selectedDepartmentId = 2;
         } else if (this.selectedDepartment === this.DLDepartmentList[2]) {
          this.selectedDepartmentId = 3;
         }
        } else if (this.selectedCompany === this.companyList[1]) {
          this.selectedCompanyId = 2;
         if (this.selectedDepartment === this.DLTXDepartmentList[0]) {
          this.selectedDepartmentId = 1;
         } else if (this.selectedDepartment === this.DLTXDepartmentList[1]) {
          this.selectedDepartmentId = 2;
         } else if (this.selectedDepartment === this.DLTXDepartmentList[2]) {
          this.selectedDepartmentId = 3;
         }
        } else if (this.selectedCompany === this.companyList[2]) {
          this.selectedCompanyId = 3;
         if (this.selectedDepartment === this.BPDepartmentList[0]) {
          this.selectedDepartmentId = 1;
         } else if (this.selectedDepartment === this.BPDepartmentList[1]) {
          this.selectedDepartmentId = 2;
         } else if (this.selectedDepartment === this.BPDepartmentList[2]) {
          this.selectedDepartmentId = 3;
         }
        }
        console.log(this.selectedDepartment);
         console.log(this.selectedDepartmentId);
        const res = await axios.post(
          'https://backapp-serita-saisyu.m3harbor.net/api/SignUp',
          {
            name: this.name,
            employeeNumber:this.employeeNumber,
            companyId:this.selectedCompanyId,
            departmentId:this.selectedDepartmentId,
            mailAddress:this.mailAddress,
            password: this.password,
          },
          {
            withCredentials: true,
          },
        )
        console.log('レスポンス:', res)
        if (res.status === 200) {
          this.message = res.data.message
          this.dialog = true
          setTimeout(() => (window.location.href = '/'), 1000)
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


