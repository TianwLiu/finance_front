

requirejs(["requireConfig"],function () {


    requirejs(["vue",
        'highcharts', "md5","axios",
        'highcharts/modules/exporting', 'highcharts/modules/accessibility',
        "plaid",
        "api_access","api_callback","BackEndHost","view_model","chart","component"],function (Vue,Highcharts,md5,axios) {

       // window.$=$;
        window.Vue=Vue;
        window.Highcharts=Highcharts;
        window.md5=md5;
        window.axios=axios;


        main();

    }

    );


});



function main(){

    //api will be called when Home model was created,so always call initApi first.
    initApi();

    window.homeVM=NewHome();

    loopCheck();
}





function setAccountInfo(result){

    //check result from self response or group

    if (isNone(result.user_accounts_list)){
        for (let j=0;j<result.accounts.length;j++){
            let accountID=result.accounts[j].account_id;
            let account=result.accounts[j];
            account.userId=result.user_id;
            //let institutionID=userAccountList[i].accounts[j].institution_id;
            //window.accounts[accountID]=userAccountList[i].accounts[j];
            //rootdata.accountInfo[accountID]=userAccountList[i].accounts[j];
            Vue.set(homeVM.accountInfo,accountID,account);
        }
        return;
    }

    //when result come from group response
    let userAccountList=result.user_accounts_list;
    for(let i=0;i<userAccountList.length;i++){

        for (let j=0;j<userAccountList[i].accounts.length;j++){
            let accountID=userAccountList[i].accounts[j].account_id;
            let account=userAccountList[i].accounts[j];
            account.userId=result.user_accounts_list[i].user_id;
            //let institutionID=userAccountList[i].accounts[j].institution_id;
            //window.accounts[accountID]=userAccountList[i].accounts[j];
            //rootdata.accountInfo[accountID]=userAccountList[i].accounts[j];
            Vue.set(homeVM.accountInfo,accountID,account);
        }
    }
    return;

}

function isNone(object){

    switch(typeof (object)){
        case "undefined":
            return true;
        case "object":
           // if(object==null){return true;}
            for( let i in object) {
                return false;
            }
            return true;
        case "string":
            return object === "";


    }
}




