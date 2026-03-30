<script setup>
import { computed,onMounted } from 'vue'
import { useProjectStore } from '@/stores/project';
import { VDateInput } from 'vuetify/labs/VDateInput'

const projectStore= useProjectStore()
const selectedQuestionList=computed(() => projectStore.selectedQuestionList)
const companyList=computed(() => projectStore.companyList)
const DLDepartmentList=computed(() => projectStore.DLDepartmentList)
const KeiyakuServiceEmployeeList=computed(() => projectStore.KeiyakuServiceEmployeeList)
const HokenkinEmployeeList=computed(() => projectStore.HokenkinEmployeeList)
const ITKikakuEmployeeList=computed(() => projectStore.ITKikakuEmployeeList)
const DLTXDepartmentList=computed(() => projectStore.DLTXDepartmentList)
const KiditsuEmployeeList=computed(() => projectStore.KiditsuEmployeeList)
const HozenEmployeeList=computed(() => projectStore.HozenEmployeeList)
const SyoumeiEmployeeList=computed(() => projectStore.SyoumeiEmployeeList)
const BPDepartmentList=computed(() => projectStore.BPDepartmentList)
const KaihatsuEmployeeList=computed(() => projectStore.KaihatsuEmployeeList)
const HosyuEmployeeList=computed(() => projectStore.HosyuEmployeeList)
const SupportEmployeeList=computed(() => projectStore.SupportEmployeeList)
const selectedAnswerLists=computed(() => projectStore.selectedAnswerLists)
const AnswerQA=computed(() => projectStore.AnswerQA)


onMounted(() => {
projectStore.getSelectedQuestion()
})



onMounted(() => {
projectStore.getProjectMember()
})

const departmentList = computed(() => {

  if (projectStore.answerCompany == companyList.value[0]) {
    return DLDepartmentList.value
  }

  if (projectStore.answerCompany == companyList.value[1]) {
    return DLTXDepartmentList.value
  }

  if (projectStore.answerCompany == companyList.value[2]) {
    return BPDepartmentList.value
  }

  return []
})

const employeeList = computed(() => {
  if (projectStore.answerDepartment == DLDepartmentList.value[0] ) {
    return KeiyakuServiceEmployeeList.value
  }

  if (projectStore.answerDepartment == DLDepartmentList.value[1]) {
    return HokenkinEmployeeList.value
  }

  if (projectStore.answerDepartment == DLDepartmentList.value[2]) {
    return ITKikakuEmployeeList.value
  }

  if (projectStore.answerDepartment == DLTXDepartmentList.value[0]) {
    return KiditsuEmployeeList.value
  }

  if (projectStore.answerDepartment == DLTXDepartmentList.value[1]) {
    return HozenEmployeeList.value
  }

  if (projectStore.answerDepartment == DLTXDepartmentList.value[2]) {
    return SyoumeiEmployeeList.value
  }

  if (projectStore.answerDepartment == BPDepartmentList.value[0]) {
    return KaihatsuEmployeeList.value
  }

  if (projectStore.answerDepartment == BPDepartmentList.value[1]) {
    return HosyuEmployeeList.value
  }

  if (projectStore.answerDepartment == BPDepartmentList.value[2]) {
    return SupportEmployeeList.value
  }

  return []
})



</script>
<template>
  <v-app>
    <v-main>
      <v-container >
      <v-card class="mx-auto px-6 py-8 mb-6">
        <v-row>
          <v-col cols="4">回答希望者（任意）</v-col>
        </v-row>
        <v-row>
         <v-col cols="2">社名</v-col>
         <v-col cols="4">
          <v-select :items="companyList" label="社名を選択" v-model="projectStore.answerCompany" clearable></v-select>
         </v-col>
        </v-row>
        <v-row>
         <v-col cols="2">部署名</v-col>
         <v-col cols="4">
            <v-select :items="departmentList" label="部署名を選択" v-model="projectStore.answerDepartment" clearable></v-select>
        </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">氏名</v-col>
          <v-col cols="4">
            <v-select :items="employeeList" label="氏名を選択" v-model="projectStore.respondent" clearable></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">回答期限（任意）</v-col>
          <v-col cols="4"> <v-date-input label="日付を選択" input-format="yyyy/mm/dd" v-model=projectStore.answerDeadDate></v-date-input></v-col>
        </v-row>
        <v-row>
          <v-col cols="2">表題</v-col>
          <v-col cols="7"><v-text-field v-model="selectedQuestionList[0].QATheme"></v-text-field></v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
             <v-card>
              <v-card-text class="issuueEmployee" >起票者: {{selectedQuestionList?.[0]?.issuerName}}</v-card-text>
              <v-card-text >  {{ selectedQuestionList?.[0]?.QAContents}}</v-card-text>
             </v-card>
            </v-col>
        </v-row>
        <div class="answer">
         <v-row>
            <v-col class="mt-6" cols="12" v-for="selectedAnswerList in selectedAnswerLists" v-bind:key="selectedAnswerList">
            <v-card >
              <v-card-text class="answerEmployee"  >回答者: {{selectedAnswerList.answerEmployeeName}}</v-card-text>
              <v-card-text >{{selectedAnswerList.QAContents}}</v-card-text>
            </v-card>
            </v-col>
          </v-row>
        </div>
        <v-row>
          <v-col>回答</v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
          <v-textarea label="回答を入力してください" v-model="projectStore.QAContents"  rows="4"></v-textarea>
          </v-col>
        </v-row>
        </v-card>
        <div class="btn">
        <v-row justify="center" align="center" >
         <v-col cols="3" class="d-flex justify-center">
          <Router-link to="/QAMenu" class="Link"><v-btn  size="large" rounded="pill" @click="projectStore.backtoQAMenu">戻る</v-btn></Router-link>
         </v-col>
         <v-col cols="3" class="d-flex justify-center">
          <v-btn  size="large" rounded="pill" @click="AnswerQA">回答する</v-btn>
        </v-col>
        </v-row>
        </div>
        <v-dialog v-model="projectStore.errorDialog" max-width="400">
          <v-card>
            <v-card-title class="headline">メッセージ</v-card-title>
                <v-card-text >{{ projectStore.errorMessage }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="text" @click="projectStore.errorDialog = false">
               閉じる
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="projectStore.isLoading" max-width="400" >
          <v-card >
            <div class="text-center" >
                <v-progress-circular :size="50" color="purple" indeterminate ></v-progress-circular>
                <v-card-text >送信中です...</v-card-text>
            </div>
          </v-card>
        </v-dialog>
        <v-dialog v-model="projectStore.dialog" max-width="400">
        <v-card>
            <v-card-title class="headline">メッセージ</v-card-title>
                <v-card-text>{{ projectStore.resultMessage }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="text" @click="projectStore.dialog = false">
               閉じる
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>
<style scoped>

.answer{
 padding-top:2rem;
}

.btn{
  padding-top:1rem ;
}

.answerEmployee{
  border-bottom: 1px solid black;
  background-color:mintcream;
}

.issuueEmployee{
  border-bottom: 1px solid black;
  background-color:rgb(231, 213, 231);
}
</style>
