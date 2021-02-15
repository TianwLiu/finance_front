/*var Highcharts = require('highcharts');
// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);*/
// main of test


function test_main(){

   // postPublicToken("hello");
  // getGroupTransactions(function (result){  console.log(result); });
  //getGroupBalances(function (result){console.log(result)});

    getAccounts("test1",function (result){  console.log(result); });
   //getTransactions(function (result){  console.log(result); });
    //console.log("test ...")

}


/*function watchNewTransaction(){
    apiVisitor.get(ProtocolHostAndPort+"/auth/watch").
    then(function (response){
        homeVM.pushNotification(response.data);
    }).
    catch(ajaxAccessFail);
}*/

function loopCheck(){
    window.requestAllFlag={
        getAccountsFlag:0,
        getCashFlowsFlag:0,
        getTransactionsFlag:0,
        getGroupAccountsFlag:0,
        getGroupCashFlowsFlag:0,
        getGroupTransactionsFlag:0,
    }
    requestAll();
    setTimeout(function () {
        if( checkRequestAllFlags()){
            homeVM.pushNotification("latest check finish...")
        }else{
            homeVM.pushNotification("! some info not update")
        }
    },1000*10);

    setTimeout(loopCheck,1000*60*3);
}

function checkRequestAllFlags() {
    let flag=requestAllFlag.getAccountsFlag*
    requestAllFlag.getCashFlowsFlag*
    requestAllFlag.getTransactionsFlag*
    requestAllFlag.getGroupAccountsFlag*
    requestAllFlag.getGroupCashFlowsFlag*
    requestAllFlag.getGroupTransactionsFlag;

    return flag !== 0;
}

function requestAll(){
    getAccounts();
    getCashFlows();
    getTransactions();
    getGroupAccounts();
    getGroupCashFlows();
    getGroupTransactions();
}



function refreshSelf() {
    getAccounts();
    getCashFlows();
    getTransactions();
    homeVM.pushNotification("Self info was updated！")

}
function refreshGroup(){
    getGroupAccounts();
    getGroupCashFlows();
    getGroupTransactions();
    homeVM.pushNotification("Group info was updated!")
}
function addMember(memberId,memberPassWord){
    let form=new FormData();
    form.append("member_id", memberId, );
    form.append(  "member_pass_word",memberPassWord );

    console.log("post memberid",memberId," memeber password",memberPassWord);
    apiVisitor.post(ProtocolHostAndPort+"/auth/group/addMember",form).
    then(addMemberSuccess).
    catch(ajaxAccessFail);
   /* apiVisitor({
        method: 'post',
        url: ProtocolHostAndPort+"/auth/group/addMember",
        data:form,
    })
        .then(function (response) {

        });*/
  /*  $.ajax(
        ProtocolHostAndPort+"/auth/group/addMember",
        {
            type:"post",
            data:{
                "member_id": memberId,
                "member_pass_word":memberPassWord},
            success:addMemberSuccess,
            error:ajaxAccessFail,
        }
    );*/

}
function delMember(memberId){
    let form=new FormData();
    form.append("member_id", memberId, );

    apiVisitor.post(ProtocolHostAndPort+"/auth/group/delMember",form).
    then(delMemberSuccess).
    catch(ajaxAccessFail);
/*
    $.ajax(
        ProtocolHostAndPort+"/auth/group/delMember",
        {
            type:"post",
            data:{
                "member_id": memberId,
                },
            success:delMemberSuccess,
            error:ajaxAccessFail,
        }
    );*/
}


function getAccounts(){
    apiVisitor.get(ProtocolHostAndPort+"/auth/accounts/get").
    then(getAccountsSuccess).
    catch(ajaxAccessFail);

/*    $.ajax(
        ProtocolHostAndPort+"/auth/accounts/get",
        {
            async:true,
            success: getAccountsSuccess,
            error:ajaxAccessFail,
        }
    );*/

}
function getGroupAccounts(){
    apiVisitor.get(ProtocolHostAndPort+"/auth/group/accounts/get").
    then(getGroupAccountsSuccess).
    catch(ajaxAccessFail);

/*    $.ajax(
        ProtocolHostAndPort+"/auth/group/accounts/get",
        {
            async:true,

            success: getGroupAccountsSuccess,
            error: ajaxAccessFail,
        }
    );*/

}
function getCashFlows(){
    apiVisitor.get(ProtocolHostAndPort+"/auth/cashflow/get?months=6").
    then(getCashFlowsSuccess).
    catch(ajaxAccessFail);

/*    $.ajax(
        ProtocolHostAndPort+"/auth/cashflow/get?months=6",
        {
            async:true,
            success: getCashFlowsSuccess,
            error: ajaxAccessFail,
        }
    );*/
}

function getGroupCashFlows(){
    apiVisitor.get(ProtocolHostAndPort+"/auth/group/cashflow/get?months=12").
    then(getGroupCashFlowsSuccess).
    catch(ajaxAccessFail);

/*    $.ajax(
        ProtocolHostAndPort+"/auth/group/cashflow/get?months=12",
        {
            async:true,
            success:getGroupCashFlowsSuccess,
            error: ajaxAccessFail,
        }
    );*/
}
function getTransactions(){
    apiVisitor.get(ProtocolHostAndPort+"/auth/transactions/get").
    then(getTransactionsSuccess).
    catch(ajaxAccessFail);

/*    $.ajax(ProtocolHostAndPort+"/auth/transactions/get",
        {
            async:true,
            success:getTransactionsSuccess,
            error:ajaxAccessFail,
        }
    );*/

}
function getGroupTransactions(){
    apiVisitor.get(ProtocolHostAndPort+"/auth/group/transactions/get").
    then(getGroupTransactionsSuccess).
    catch(ajaxAccessFail);

    /*$.ajax(
        ProtocolHostAndPort+"/auth/group/transactions/get",
        {
            async:true,
            success: getGroupTransactionsSuccess,
            error:ajaxAccessFail,
        }
    );*/

}

function initApi(){
//    $.ajaxSetup(   {headers: {"api_token":localStorage.token}})
    apiVisitor = axios.create({
        // baseURL: ProtocolHostAndPort
    });

    apiVisitor.defaults.headers.common['api_token'] = localStorage.token;
}

function getLinkToken(){
    apiVisitor.post(ProtocolHostAndPort+"/auth/getLinkToken").
    then(openLinkToken).
    catch(ajaxAccessFail);
}

function postPublicToken(publicToken,metadata){
    let form=new FormData();
    form.append("publicToken",publicToken );
    form.append(  "institutionName",metadata.institution.name);

    apiVisitor.post(ProtocolHostAndPort+"/auth/postPublicToken",form).
    then(postPublicTokenSuccess).
    catch(ajaxAccessFail);
    /*    $.ajax(
            ProtocolHostAndPort+"/auth/postPublicToken",
            {
                type:"post",
                data:{
                    "publicToken":publicToken,
                    "institutionName":metadata.institution.name
                },
                success:postPublicTokenSuccess,
                error:ajaxAccessFail,
            }
        );*/


}

//check if it is runed by node.js
if(typeof(global)!="undefined"){
    debug_env_build();
    test_main();
}

//build debug environment
function debug_env_build(){

    const { JSDOM } = require( "jsdom" );
    const { window } = new JSDOM( "" );
    $ = require( "jquery" )( window );

}






