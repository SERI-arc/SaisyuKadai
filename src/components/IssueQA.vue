<script setup>
import { computed,onMounted,watch } from 'vue'
import { useProjectStore } from '@/stores/project';
import { VDateInput } from 'vuetify/labs/VDateInput'

const projectStore= useProjectStore()
const companyList=computed(() => projectStore.companyList)
const DLDepartmentList=computed(() => projectStore.DLDepartmentList)
const KeiyakuServiceEmployeeList=computed(() => projectStore.KeiyakuServiceEmployeeList)
const  HokenkinEmployeeList=computed(() => projectStore.HokenkinEmployeeList)
const  ITKikakuEmployeeList=computed(() => projectStore.ITKikakuEmployeeList)
const  DLTXDepartmentList=computed(() => projectStore.DLTXDepartmentList)
const  KiditsuEmployeeList=computed(() => projectStore.KiditsuEmployeeList)
const  HozenEmployeeList=computed(() => projectStore.HozenEmployeeList)
const  SyoumeiEmployeeList=computed(() => projectStore.SyoumeiEmployeeList)
const  BPDepartmentList=computed(() => projectStore.BPDepartmentList)
const  KaihatsuEmployeeList=computed(() => projectStore.KaihatsuEmployeeList)
const  HosyuEmployeeList=computed(() => projectStore.HosyuEmployeeList)
const  SupportEmployeeList=computed(() => projectStore.SupportEmployeeList)
const  issueQA=computed(() => projectStore.issueQA)


onMounted(() => {
projectStore.getProjectMember()
})

onMounted(() =>{
  projectStore.getDate()
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

watch(()=>projectStore.answerCompany,()=>{
      projectStore.answerDepartment=null;
      projectStore.respondent=null;
})

</script>
<template>
  <v-app>
    <v-main>
      <v-container>
      <v-card class="mx-auto px-6 py-8">
        <v-row>
          <v-col cols="2">回答希望者</v-col>
        </v-row>
        <v-row>
         <v-col cols="2">社名</v-col>
         <v-col cols="4">
          <v-select :items="companyList" label="社名を選択" v-model="projectStore.answerCompany"></v-select>
         </v-col>
        </v-row>
        <v-row>
         <v-col cols="2">部署名</v-col>
         <v-col cols="4">
          <v-select :items="departmentList" label="部署名を選択" v-model="projectStore.answerDepartment"></v-select>
         </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">氏名</v-col>
          <v-col cols="4">
            <v-select :items="employeeList" label="氏名を選択" v-model="projectStore.respondent"></v-select>
          </v-col>
        </v-row>
         <v-row >
          <v-col cols="2">回答期限</v-col>
          <v-col cols="4"> <v-date-input label="日付を選択" input-format="yyyy/mm/dd" v-model=projectStore.answerDeadDate></v-date-input></v-col>
        </v-row>
        <v-row >
          <v-col cols="2">表題</v-col>
          <v-col cols="7"><v-text-field label="表題を入力" v-model="projectStore.QATheme"></v-text-field></v-col>
        </v-row>
        <v-row>
          <v-col>質問内容</v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field label="内容を入力して下さい" v-model="projectStore.QAContents"></v-text-field>
          </v-col>
        </v-row>
        </v-card>
        <v-row justify="center">
         <Router-link to="/QAMenu" class="Link"><v-btn class="ml-3" size="large" rounded="pill" @click="projectStore.backtoQAMenu">戻る</v-btn></Router-link>
         <v-col cols="3"><v-btn class="ml-3" size="large" rounded="pill" @click="issueQA">起票する</v-btn></v-col>
        </v-row>
        <v-dialog v-model="projectStore.dialog" max-width="400">
        <v-card>
            <v-card-title class="headline">メッセージ</v-card-title>
            <v-card-text>{{ projectStore.message }}</v-card-text>
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
