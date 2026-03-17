<script setup>
import { computed,onMounted } from 'vue'
import { useProjectStore } from '@/stores/project';
import { VDateInput } from 'vuetify/labs/VDateInput'

const projectStore= useProjectStore()
const selectedQuestionLists=computed(() => projectStore.selectedQuestionLists)
const companyList=computed(() => projectStore.companyList)
const DLDepartmentList=computed(() => projectStore.DLDepartmentList)
const KeiyakuServiceEmployeeList=computed(() => projectStore.KeiyakuServiceEmployeeList)
const answerCompany=computed(() => projectStore.answerCompany)
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
const QAContents=computed(() => projectStore.QAContents)
const AnswerQA=computed(() => projectStore.AnswerQA)



onMounted(() => {
projectStore.getProjectParticipants()
})

onMounted(() => {
projectStore.getSelectedQuestion()
})



</script>
<template>
  <v-app>
    <v-main>
      <v-container>
      <v-card class="mx-auto px-6 py-8">
        <v-row >
          <v-col cols="2">回答日</v-col>
          <v-col cols="4"> <v-date-input label="日付を選択" input-format="yyyy/mm/dd" v-model=projectStore.issueQADate></v-date-input></v-col>
        </v-row>
        <v-row>
          <v-col cols="2">回答希望者（任意）</v-col>
        </v-row>
        <v-row>
         <v-col cols="2">社名</v-col>
         <v-vol cols="4">
          <v-select :items="companyList" label="社名を選択" v-model="answerCompany"></v-select>
         </v-vol>
         <v-col cols="2">部署名</v-col>
         <v-vol cols="10">
          <v-select :items="DLDepartmentList" label="部署を選択" v-if="answerCompany==companyList[0]"></v-select>
         </v-vol>
        </v-row>
        <v-row>
          <v-col cols="2">氏名</v-col>
          <v-vol cols="4"><v-select :items="projectLists" label="氏名を選択" v-model="projectStore.respondent"></v-select>
         </v-vol>
        </v-row>
         <v-row >
          <v-col cols="2">回答期限（任意）</v-col>
          <v-col cols="4"> <v-date-input label="日付を選択" input-format="yyyy/mm/dd" v-model=projectStore.answerDeadDate></v-date-input></v-col>
        </v-row>
        <v-row >
          <v-col cols="2">表題</v-col>
          <v-col cols="7"><v-text-field label="表題を入力"></v-text-field></v-col>
        </v-row>
        <v-row>
          <v-card>
            <v-col cols="10" v-for="selectedQuestionList in selectedQuestionLists" v-bind:key="selectedQuestionList">
              <v-card-text >From:{{selectedQuestionList.issuer}}</v-card-text>
              <v-card-text >{{selectedQuestionList.contents}}</v-card-text>
            </v-col>
          </v-card>
        </v-row>
        <v-row>
          <v-col>回答</v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field label="回答を入力してください" v-model="QAContents"></v-text-field>
          </v-col>
        </v-row>
        </v-card>
        <v-row justify="center">
         <Router-link to="/QAMenu" class="Link"><v-btn class="ml-3" size="large" rounded="pill">戻る</v-btn></Router-link>
         <v-col cols="3"><v-btn class="ml-3" size="large" rounded="pill" @click="AnswerQA">回答する</v-btn></v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
