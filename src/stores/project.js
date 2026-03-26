import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useProjectStore = defineStore('project', {
  state: () => ({
  selectedProjectLists:[],
  selectedProjectListsBeforConverted:[],
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
  allQuestionListsBeforeConverted:[],
  selectedQuestionId:0,
  projectMemberLists:[],
  searchProjectNum:0,
  issueDate:ref(null),
  convertedIssueDate:(""),
  answerDeadDate:ref(null),
  convertedAnswerDeadDate:(null),
  respondent:(""),
  respondentEmployeeId:0,
  answerCompany:[],
  companyList:ref(["第一生命","DLTX","BP"]),
  DLDepartmentList: ref(["契約サービス部","保険金部","IT企画部"]),
  KeiyakuServiceEmployeeList: ref([]),
  HokenkinEmployeeList: ref([]),
  ITKikakuEmployeeList: ref([]),
  DLTXDepartmentList: ref(["期日年金担当","保全担当","証明担当"]),
  KiditsuEmployeeList: ref([]),
  HozenEmployeeList: ref([]),
  SyoumeiEmployeeList: ref([]),
  BPDepartmentList: ref(["開発部","保守運用部","サポート部"]),
  KaihatsuEmployeeList: ref([]),
  HosyuEmployeeList: ref([]),
  SupportEmployeeList: ref([]),
  QATheme:(""),
  QAContents:(""),
  selectedQuestionList:[],
  selectedAnswerLists:[],
  answerDate:ref(),
  convertedAnswerDate:ref(""),
  answerCompany:ref(),
  answerDepartment:ref(),
  message:ref(),
  dialog:ref(false),
  }),

  actions: {


    async getSelectedProject() {
      const res =await  axios.get('https://backapp-serita-saisyu.m3harbor.net/api/getSelectedProject')
      this.selectedProjectListsBeforConverted=res.data;
      for(let num =0; num<this.selectedProjectListsBeforConverted.length; num++){
        const originalDate = this.selectedProjectListsBeforConverted[num].operationStartDate;
        this.selectedProjectListsBeforConverted[num].operationStartDateFormatted = this.convertDateToSlash(originalDate);
      }
      this.selectedProjectLists = this.selectedProjectListsBeforConverted;
      console.log(this.selectedProjectLists);
      this.selectedProjectNum =this.selectedProjectLists.length-1;
    },

    convertDateToSlash(dateStr) {
     if (!dateStr) return "";
       const dateObj = new Date(dateStr);
       const y = dateObj.getFullYear();
       const m = ('00' + (dateObj.getMonth()+1)).slice(-2);
       const d = ('00' + dateObj.getDate()).slice(-2);
    return `${y}/${m}/${d}`;
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
          const originalDate = this.searchedProjectList[this.searchedProjectList.length-1].operationStartDate;
           this.searchedProjectList[this.searchedProjectList.length-1].operationStartDateConverted = this.convertDateToSlash(originalDate);
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
      console.log(this.selectedProjectId);
    },

   async getQuestion(){
    const res =await axios.post('https://backapp-serita-saisyu.m3harbor.net/api/getQuestion',{
      projectId:this.selectedProjectId
    })
    this.allQuestionListsBeforeConverted=res.data
    console.log(this.allQuestionListsBeforeConverted);
    for(let num =0; num<this.allQuestionListsBeforeConverted.length; num++){
        const originalIssueDate = this.allQuestionListsBeforeConverted[num].issueDate;
        this.allQuestionListsBeforeConverted[num].issueDateFormatted = this.convertDateToSlash(originalIssueDate);
        const originalAnswerDeadDate = this.allQuestionListsBeforeConverted[num].answerDeadDate;
        this.allQuestionListsBeforeConverted[num].answerDeadDateFormatted = this.convertDateToSlash(originalAnswerDeadDate);
      }
      this.allQuestionLists = this.allQuestionListsBeforeConverted;
      console.log(this.allQuestionLists);
    },

    //QA回答画面に遷移する際に、選択されたQAのIDを保持するための関数
    moveToQuestion(QuestionId){
      this.selectedQuestionId=QuestionId;
      console.log(this.selectedQuestionId);
      for (let num =0 ; num<this.allQuestionLists.length; num ++){
        if(this.allQuestionLists?.[`${num}`]?.id == this.selectedQuestionId){
          this.selectedQuestionList.push(this.allQuestionLists[`${num}`]);
        }
      }
      console.log(this.selectedQuestionList);
    },

    //新規起票画面でプロジェクト参画者の情報を取得する関数
    async getProjectMember(){
     const res= await axios.post('https://backapp-serita-saisyu.m3harbor.net/api/getProjectMember',{
      projectId:this.selectedProjectId
     })
     this.projectMemberLists=res.data
     console.log(this.projectMemberLists);
     this.KeiyakuServiceEmployeeList=[];
     this.HokenkinEmployeeList=[];
     this.ITKikakuEmployeeList=[];
     this.KiditsuEmployeeList=[];
     this.HozenEmployeeList=[];
     this.SyoumeiEmployeeList=[];
     this.KaihatsuEmployeeList=[];
     this.HosyuEmployeeList=[];
     this.SupportEmployeeList=[];
     for(let projectMemberList of this.projectMemberLists){
      if(projectMemberList.companyId == 1){
        if(projectMemberList.departmentId ==1)
          this.KeiyakuServiceEmployeeList[this.KeiyakuServiceEmployeeList.length]= projectMemberList.name
        else if(projectMemberList.departmentId ==2)
          this.HokenkinEmployeeList[this.HokenkinEmployeeList.length]= projectMemberList.name
        else if(projectMemberList.departmentId ==3)
          this.ITKikakuEmployeeList[this.ITKikakuEmployeeList.length]= projectMemberList.name
      }else if(projectMemberList.companyId ==2){
        if(projectMemberList.departmentId ==1)
          this.KiditsuEmployeeList[this.KiditsuEmployeeList.length]= projectMemberList.name
        else if(projectMemberList.departmentId ==2)
          this.HozenEmployeeList[this.HozenEmployeeList.length]= projectMemberList.name
        else if(projectMemberList.departmentId ==3)
          this.SyoumeiEmployeeList[this.SyoumeiEmployeeList.length]=projectMemberList.name
     }else if(projectMemberList.companyId ==3){
        if(projectMemberList.departmentId ==1)
          this.KaihatsuEmployeeList[this.KaihatsuEmployeeList.length]=projectMemberList.name
        else if(projectMemberList.departmentId ==2)
          this.HosyuEmployeeList[this.HosyuEmployeeList.length]=projectMemberList.name
        else if(projectMemberList.departmentId ==3)
          this.SupportEmployeeList[this.SupportEmployeeList.length]=projectMemberList.name
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
      if(this.respondent == ""){
        this.message ='回答希望者を設定してください。';
        this.dialog=true;
      }else if(this.QATheme ==""){
        this.message ='表題を設定してください。';
        this.dialog=true;
      }else if(this.QAContents == ""){
        this.message ='質問内容を設定してください。';
        this.dialog=true;
      }

      this.issueDate=this.getDate();
      if(this.answerDeadDate == null){
        this.message ='回答期限を設定してください。';
        this.dialog=true;
      }else if(this.answerDeadDate < this.issueDate){
        this.message ='回答期限を本日以降に設定してください。';
        this.dialog=true;
      }else{
        this.convertedAnswerDeadDate =this.convertDate(this.answerDeadDate);
      }

      if (this.respondent !=""){
          this.respondentEmployeeId=this.projectMemberLists.find(m => m.name === this.respondent)?.id;
      }
      const res= await axios.post('https://backapp-serita-saisyu.m3harbor.net/api/issueQA',{
      projectId:this.selectedProjectId,
      issueDate:this.issueDate,
      answerDeadDate:this.convertedAnswerDeadDate,
      respondentEmployeeId:this.respondentEmployeeId,
      QATheme:this.QATheme,
      QAContents:this.QAContents
     })
     if(res.status == 200 ){
        this.message = "質問を起票しました。";
        this.dialog  = true;
      }else{
        this.message = "質問を起票できませんでした。管理者にお問い合わせください。";
        this.dialog  = true;
      }
     },

    getDate(){
     return new Date().toISOString().slice(0,10);
    },

    //回答画面で選択された質問と、その質問の質問IDに紐づく回答IDを取得する関数
    async getSelectedQuestion(){
      console.log(this.selectedQuestionId);
      const res =await axios.post('https://backapp-serita-saisyu.m3harbor.net/api/getSelectedQuestion',{
      questionId:this.selectedQuestionId,
      })
      this.selectedAnswerLists=res.data
      console.log(this.selectedAnswerLists);
    },

    async AnswerQA(){
      if(this.QAContents == ""){
        this.message ='質問内容を設定してください。';
        this.dialog=true;
      }

      this.answerDate=this.getDate();
      if(this.answerDeadDate !=null && this.convertedAnswerDeadDate<this.answerDate){
        this.message ='回答期限を本日以降に設定してください。';
        this.dialog=true;
      }else if(this.answerDeadDate !=null && this.answerDate <= this.convertedAnswerDeadDate){
        this.convertedAnswerDeadDate =this.convertDate(this.answerDeadDate);
      }

      if (this.respondent !=""){
          this.respondentEmployeeId=this.projectMemberLists.find(m => m.name === this.respondent)?.id;
      }
      const res =await  axios.post('https://backapp-serita-saisyu.m3harbor.net/api/answerQA',{
      questionId:this.selectedQuestionId,
      answerDate:this.answerDate,
      answerDeadDate:this.convertedAnswerDeadDate ?? null,
      respondentEmployeeId:this.respondentEmployeeId ?? null,
      QATheme:this.selectedQuestionList[0].QATheme,
      QAContents:this.QAContents
      })
      if(res.status == 200 ){
        this.message = "回答を送信しました。";
        this.dialog  = true;
      }else{
        this.message = "回答を送信できませんでした。管理者にお問い合わせください。";
        this.dialog  = true;
      }
    },

    backtoQAMenu(){
      this.selectedQuestionList=[];
      this.answerCompany=[];
      this.answerDepartment=[];
      this.respondent=[];
      this.answerDeadDate=ref();
      this.QAContents=ref();
    }


  }
})
