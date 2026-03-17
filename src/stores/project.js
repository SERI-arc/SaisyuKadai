import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useProjectStore = defineStore('project', {
  state: () => ({
  selectedProjectLists:[],
  selectedProjectId:0,
  projectLists:[{id:1,
    projectName:"幸せものがたり",
    operationStartDate:2026/3/1,
  },{id:2,
    projectName:"幸せものがたり",
    operationStartDate:2026/3/1,
  }],
  project:[],
  allQuestionLists:[],
  selectedQuestionId:0,
  projectMemberList:[],
  issueDate:ref(),
  answerDeadDate:ref(),
  respondent:(""),
  respondentEmployeeNumber:0,
  answerCompany:[],
  companyList:[],
  DLDepartmentList:["契約サービス部","保険金部","IT企画部"],
  KeiyakuServiceEmployeeList:[""],
  HokenkinEmployeeList:[""],
  ITKikakuEmployeeList:[""],
  DLTXDepartmentList:["期日年金担当","保全担当","証明担当"],
  KiditsuEmployeeList:[""],
  HozenEmployeeList:[""],
  SyoumeiEmployeeList:[""],
  BPDepartmentList:["開発部","保守運用部","サポート部"],
  KaihatsuEmployeeList:[""],
  HosyuEmployeeList:[""],
  SupportEmployeeList:[""],
  QATheme:(""),
  QAContents:(""),
  selectedQuestionLists:[],
  }),

  actions: {


    async getSelectedProject() {
      const res =axios.get('/getSelectedProject')
      this.selectedProjectLists=await res.data.project
    },
    async getProject() {
      const res =axios.get('/getProject')
      this.ProjectLists=await res.data.project
    },

    async addMemberToProject(){
      axios.post('/addMemberToProject',{
        projectId:this.project.projectId
      },)
    },

    //QAメニューに遷移する際に、選択されたプロジェクトのIDを保持するための関数
    moveToQAMenu(ProjectId){
      this.selectedProjectId=ProjectId
    },

   async getQuestion(){
    const res =axios.post('/getQuestion',{
      projectId:this.selectedProjectId
    })
    this.allQuestionLists=res.data
    },

    //QA回答画面に遷移する際に、選択されたQAのIDを保持するための関数
    moveToQuestion(QuestionId){
      this.selectedQuestionId=QuestionId
    },

    //新規起票画面でプロジェクト参画者の情報を取得する関数
    async getgetProjectMember(){
     const res=axios.post('/getProjectMember',{
      projectId:this.projectId
     })
     this.projectMemberList=res.data
     for(let i=0; i<this.projectMemberList.length;i++){
      if(this.projectMemberList.companyId == 1){
        if(this.projectMemberList.departmentId ==1)
          this.projectMemberList.name.push(this.KeiyakuServiceEmployeeList)
        else if(this.projectMemberList.departmentId ==2)
          this.projectMemberList.name.push(this.HokenkinEmployeeList)
        else if(this.projectMemberList.departmentId ==3)
          this.projectMemberList.name.push(this.ITKikakuEmployeeList)
      }else if(this.projectMemberList.companyId ==2){
        if(this.projectMemberList.departmentId ==1)
          this.this.projectMemberList.name.push(this.KiditsuEmployeeList)
        else if(this.projectMemberList.departmentId ==2)
          this.projectMemberList.name.push(this.HozenEmployeeList)
        else if(this.projectMemberList.departmentId ==3)
          this.projectMemberList.name.push(this.SyoumeiEmployeeList)
     }else if(this.projectMemberList.companyId ==3){
        if(this.projectMemberList.departmentId ==1)
          this.projectMemberList.name.push(this.KaihatsuEmployeeList)
        else if(this.projectMemberList.departmentId ==2)
          this.projectMemberList.name.push(this.HosyuEmployeeList)
        else if(this.projectMemberList.departmentId ==3)
          this.projectMemberList.name.push(this.SupportEmployeeList)
        }
       }
     },

     async issueQA(){
    //画面から渡されたrespondent（社員番号＋氏名）から社員番号だけ取り出し、
    // respondentEmployeeNumberに代入するロジックが入る予定
     axios.post('/issueQA',{
      projectId:this.selectedProjectList.ProjectId,
      issueDate:this.issueDate,
      answerDeadDate:this.answerDeadDate,
      respondentEmployeeNumber:this.respondentEmployeeNumber,
      QATheme:this.QATheme,
      QAContents:this.QAContents
     })
    },

    //回答画面で選択された質問と、その質問の質問IDに紐づく回答IDを取得する関数
    async getSelectedQuestion(){
      const res = axios.post('/getSelectedQuestion',{
      projectId:this.selectedProjectList.ProjectId,
      questionId:this.selectedQuestionId,
      })
      this.selectedQuestionLists=res.data
    },

    async AnswerQA(){
      const res = axios.post('/answerQA',{
      projectId:this.selectedProjectList.ProjectId,
      issueDate:this.issueDate,
      answerDeadDate:this.answerDeadDate ?? null,
      respondentEmployeeNumber:this.respondentEmployeeNumber ?? null,
      QAContents:this.QAContents
      })
    }

  }
})
