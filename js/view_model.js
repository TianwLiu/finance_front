
function NewHome(){
    let homeVM=new Vue({
        el:"#home",
        data:{
            member:{
                userID:null,
                passWord:null,
            },
            accountInfo:{},
            self:{
                getAccountsResponse:{
                    cash_base: { depository_balance: 0, credit_liability: 0 },
                },
                getCashFlowsResponse:[],
                getTransactionsResponse:{
                    transactions:[],
                },
            },
            group:{
                getAccountsResponse:{
                    cash_base: { depository_balance: 0, credit_liability: 0 },
                    user_accounts_list:null
                },
                getCashFlowsResponse:[],
                getTransactionsResponse:{
                    transactions:[],
                },
            },

            //property about page display
            notification:null,
            groupModalActive:"",
            groupModalFlag:false,
            loopFlag:false,
        },
        methods:{
            linkBank:function () {
                window.getLinkToken();
            },
            //add group member
            addMember:function () {
                window.addMember(this.member.userID,md5(this.member.passWord));
                this.member.userID=null;
                this.member.passWord=null;
            },
            //del group member
            delMember:function () {
                window.delMember(this.member.userID);
                this.member.userID=null;
                this.member.passWord=null;
            },
            //push one message to notification,must add different part(Ex:time) to trigger view update
            pushNotification:function (message){
              this.notification=new Date().toLocaleTimeString()+":"+message;
            },

            //open group manage modal
            openGroupModal:function () {
                this.groupModalFlag=true;
            },
            //close group manage modal
            closeGroupModal:function () {
                this.groupModalFlag=false;
            },

            loopSwitch:function () {
                this.loopFlag=!this.loopFlag;
            }
        },

        watch: {
            loopFlag:function () {
                if(this.loopFlag){
                window.document.documentElement.style.overflow="hidden";
                }else{
                    window.document.documentElement.style.overflow="auto";
                }
            }
        },

        created:function () {
            window.requestAll();

        },

    });
    return homeVM;
}



