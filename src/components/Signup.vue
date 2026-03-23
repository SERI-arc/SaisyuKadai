<script setup>
import { computed,onMounted,watch } from 'vue'
import { useSignUpStore } from '../stores/signup'

const signUpStore = useSignUpStore()
const signUp = computed(() => signUpStore.signUp)
const message = computed(() => signUpStore.message)
const companyList = computed(() => signUpStore.companyList)
const DepartmentList = computed(() => signUpStore.DepartmentList)

const SignUpStore= useSignUpStore()
//const getCompany=computed(() => SignUpStore.getCompany)
//const getDepartment=computed(() => SignUpStore.getDepartment)

watch(signUpStore.selectedCompanyId,()=>{
  signUpStore.setDepartmentList()
})

onMounted(() => {
signUpStore.getCompany()
})

onMounted(() => {
signUpStore.getDepartment()
})

</script>

<template>
  <v-app>
    <v-container>
      <v-row class="text-h4 mb-4" justify="center">ユーザー登録</v-row>
      <v-row justify="center">
        <v-col cols="12" sm="6" md="4">
          氏名
          <v-text-field v-model="signUpStore.name" label="入力してください" outlined></v-text-field>
          所属
          <v-row><v-col>会社<v-select :items="companyList" item-value="id" item-title="companyName" label="社名を選択" v-model="signUpStore.selectedCompanyId"></v-select></v-col></v-row>
          <v-row><v-col>部署<v-select :items="DepartmentList" item-value="id" item-title="DepartmentName" label="部署を選択" v-model="signUpStore.selectedDepartmentId"></v-select></v-col></v-row>
          社員番号
          <v-text-field v-model="signUpStore.employeeNumber" label="入力してください" outlined></v-text-field>
          メールアドレス
          <v-text-field v-model="signUpStore.mailAddress" label="入力してください" outlined></v-text-field>
          パスワード
          <v-text-field
            v-model="signUpStore.password"
            label="入力してください"
            type="password"
            outlined
          ></v-text-field>
          <v-btn color="primary" class="mt-4" block @click="signUp" :disabled="loading">
            <template v-if="!loading">登録</template>
            <template v-else>
              <v-progress-circular
                indeterminate
                color="white"
                size="20"
                class="mr-2"
              ></v-progress-circular>
              登録中...
            </template>
          </v-btn>
          <v-btn variant="text" class="mt-2" block to="/"> ログインに戻る </v-btn>
        </v-col>
      </v-row>
      <v-dialog v-model="signUpStore.dialog" max-width="400">
        <v-card>
          <v-card-title class="headline">メッセージ</v-card-title>
          <v-card-text>{{ message }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="text" @click="signUpStore.dialog = false">
              閉じる
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<style scoped>


</style>
