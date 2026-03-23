import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useProjectStore = defineStore('project', {
  state: () => ({
  selectedProjectLists:[],
  selectedProjectNum:0,
  selectedProjectId:0,
  projectLists:[],
  projectNameLists:[],
  searchedProjectList:[],
 /* projectLists:[{id:1,
    projectName:"幸せものがたり",
    operationStartDate:2026/3/1,
  },{id:2,
    projectName:"幸せものがたり",
    operationStartDate:2026/3/1,
  }],*/
  project:ref(""),
  allQuestionLists:[],
  selectedQuestionId:0,
  projectMemberLists:[],
  searchProjectNum:0,
  issueDate:ref(),
  convertedIssueDate:(""),
  answerDeadDate:ref(),
  convertedAnswerDeadDate:(""),
  respondent:(""),
  respondentEmployeeId:0,
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
  answerDate:ref(),
  convertedAnswerDate:ref("")
  }),

  actions: {


    async getSelectedProject() {
      const res =await  axios.get('https://backapp-serita-saisyu.m3harbor.net/api/getSelectedProject')
      this.selectedProjectLists=res.data
      this.selectedProjectNum =this.selectedProjectLists.length-1;
    },
    async getProject() {
      const res = await  axios.get('https://backapp-serita-saisyu.m3harbor.net/api/getProject')
      console.log(res);
      this.projectLists=res.data
    },

    searchProject(){
      console.log(this.project);
      console.log(this.projectLists);
      this.searchProjectNum=0
      for (let num =0 ; num<=this.projectLists.length; num ++){
        if(this.projectLists?.[`${num}`]?.projectName == this.project){
          this.searchedProjectList.push(this.projectLists[`${num}`]);
        }
      }
      this.searchProjectNum =this.searchedProjectList.length-1;
      console.log(this.searchProjectNum);
    },

    async addMemberToProject(){
      console.log(this.searchedProjectList[this.searchProjectNum].id)
      axios.post('https://backapp-serita-saisyu.m3harbor.net/api/addMemberToProject',{
        projectId:this.searchedProjectList[this.searchProjectNum].id
      },)
    },

    //QAメニューに遷移する際に、選択されたプロジェクトのIDを保持するための関数
    moveToQAMenu(ProjectId){
      this.selectedProjectId=ProjectId
    },

   async getQuestion(){
    const res =axios.post('https://backapp-serita-saisyu.m3harbor.net/api/getQuestion',{
    })
    this.allQuestionLists=res.data
    },

    //QA回答画面に遷移する際に、選択されたQAのIDを保持するための関数
    moveToQuestion(QuestionId){
      this.selectedQuestionId=QuestionId
    },

    //新規起票画面でプロジェクト参画者の情報を取得する関数
    async getgetProjectMember(){
     const res=axios.post('https://backapp-serita-saisyu.m3harbor.net/api/getProjectMember',{
      projectId:this.projectId
     })
     this.projectMemberLists=res.data
     for(let projectMemberList of this.projectMemberLists){
      if(projectMemberList.companyId == 1){
        if(projectMemberList.departmentId ==1)
          projectMemberList.name.push(this.KeiyakuServiceEmployeeList)
        else if(projectMemberList.departmentId ==2)
          projectMemberList.name.push(this.HokenkinEmployeeList)
        else if(projectMemberList.departmentId ==3)
          projectMemberList.name.push(this.ITKikakuEmployeeList)
      }else if(projectMemberList.companyId ==2){
        if(projectMemberList.departmentId ==1)
            projectMemberList.name.push(this.KiditsuEmployeeList)
        else if(projectMemberList.departmentId ==2)
          projectMemberList.name.push(this.HozenEmployeeList)
        else if(projectMemberList.departmentId ==3)
          projectMemberList.name.push(this.SyoumeiEmployeeList)
     }else if(projectMemberList.companyId ==3){
        if(projectMemberList.departmentId ==1)
          projectMemberList.name.push(this.KaihatsuEmployeeList)
        else if(projectMemberList.departmentId ==2)
          projectMemberList.name.push(this.HosyuEmployeeList)
        else if(projectMemberList.departmentId ==3)
          projectMemberList.name.push(this.SupportEmployeeList)
        }
       }
     },

    convertDate(dateObj){
      if(!dateObj){
        return"";}
      else{
        let y = dateObj.getFullYear();
        let m = ('00' + (dateObj.getMonth()+1)).slice(-2);
        let d = ('00' + dateObj.getDate()).slice(-2);
        return (y + "-" + m + "-" + d);
      }
    },

     async issueQA(){
      this.convertedIssueDate =this.convertDate(this.issueDate)
      this.convertedAnswerDeadDate =this.convertDate(this.answerDeadDate)
    //バックエンドから渡されている社員IDをrespondentEmployeeIdに代入する
     axios.post('https://backapp-serita-saisyu.m3harbor.net/api/issueQA',{
      projectId:this.selectedProjectList.ProjectId,
      issueDate:this.convertedIssueDate,
      answerDeadDate:this.answerDeadDate,
      respondentEmployeeId:this.respondentEmployeeId,
      QATheme:this.QATheme,
      QAContents:this.QAContents
     })
    },

    //回答画面で選択された質問と、その質問の質問IDに紐づく回答IDを取得する関数
    async getSelectedQuestion(){
      const res = axios.post('https://backapp-serita-saisyu.m3harbor.net/api/getSelectedQuestion',{
      questionId:this.selectedQuestionId,
      })
      this.selectedQuestionLists=res.data
    },

    async AnswerQA(){
      this.convertedAnswerDate =this.convertDate(this.answerDate)
      this.convertedAnswerDeadDate =this.convertDate(this.answerDeadDate)
      const res = axios.post('https://backapp-serita-saisyu.m3harbor.net/api/answerQA',{
      questionId:this.this.selectedQuestionId,
      answerDate:this.convertedAnswerDate,
      answerDeadDate:this.answerDeadDate ?? null,
      respondentEmployeeId:this.respondentEmployeeId ?? null,
      QATheme:this.QATheme,
      QAContents:this.QAContents
      })
    }

  }
})
