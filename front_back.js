
// main of test
function test_main(){

   // postPublicToken("hello");
  // getGroupTransactions(function (result){  console.log(result); });
  //getGroupBalances(function (result){console.log(result)});
    getBalances("test1",function (result){  console.log(result); });
   //getTransactions(function (result){  console.log(result); });
    //console.log("test ...")

}

function getLinkToken(){

    $.post(
        ProtocolHostAndPort+"/auth/getLinkToken",
        {},
        openLinkToken
    );

}

function openLinkToken(result){

    let linkToken=result.linkToken
    let userId=result.userId
    console.log(linkToken);

    var handler=Plaid.create({
        token: linkToken,

        onSuccess: function(public_token, metadata) {
            // Send the public_token to your app server.
            // The metadata object contains info about the institution the
            // user selected and the account ID or IDs, if the
            // Select Account view is enabled.
            // console.log(metadata);
            console.log(public_token);
            console.log(metadata);
            console.log(userId)
            postPublicToken(public_token,metadata);
        },
        onExit: function(err, metadata) {
            // The user exited the Link flow.
            if (err != null) {
                // The user encountered a Plaid API error prior to exiting.
            }
            // metadata contains information about the institution
            // that the user selected and the most recent API request IDs.
            // Storing this information can be helpful for support.
        }
    });

    handler.open();


}

function postPublicToken(publicToken,metadata){
    $.ajax(
        ProtocolHostAndPort+"/auth/postPublicToken",
        {
            type:"post",
            data:{
                "publicToken":publicToken,
                "institutionName":metadata.institution.name},
            success:function () {

               setTimeout(function (){
                   location.reload();
               },3000);
            }

        }
    );
}

function addMember(memberId,memberPassWord){
    $.ajax(
        ProtocolHostAndPort+"/auth/group/addMember",
        {
            type:"post",
            data:{
                "member_id": memberId,
                "member_pass_word":memberPassWord},
            success:function (result){
                if(result.flag){
                    location.reload();
                }else{
                    window.alert(result.error);
                }

            }

        }
    );

}

function delMember(memberId){
    $.ajax(
        ProtocolHostAndPort+"/auth/group/delMember",
        {
            type:"post",
            data:{
                "member_id": memberId,
                },
            success:function (result){
                if(result.flag){
                    location.reload();
                }else{
                    window.alert(result.error);
                }

            }

        }
    );
}

function initFrontBack(){

    $.ajaxSetup(   {headers: {"api_token":localStorage.token}})

}
function getBalances(onSuccess){

    $.ajax({
            async:true,
            url: ProtocolHostAndPort+"/auth/accounts/get",
            success: function (result) {
                console.log("获取个人余额成功");
                //console.log(result)
                onSuccess(result);
            },
            error: function (xhr,status,error){

                console.log("获取交易记录成功");
               // console.log(error);
            }

        }
    );

}

function getGroupBalances(onSuccess){

    $.ajax({
            async:true,
            url: ProtocolHostAndPort+"/auth/group/accounts/get",
            success: function (result) {
                console.log("获取余额成功");
                console.log(result);
                onSuccess(result);
            },
            error: function (xhr,status,error){

                console.log("获取交易记录成功");
                // console.log(error);
            }

        }
    );

}




function  getTransactions(onSuccess){

    $.ajax({
            async:true,
            url: ProtocolHostAndPort+"/auth/transactions/get",
            success: function (result) {
                console.log("获取交易记录成功");
                //console.log(result);
                onSuccess(result);
            },
            error: function (xhr,status,error){

                console.log("获取交易记录成功");
                //console.log(error);
            }

        }
    );

}

function  getGroupTransactions(onSuccess){

    $.ajax({
            async:true,
            url: ProtocolHostAndPort+"/auth/group/transactions/get",
            success: function (result) {
                console.log("获取交易记录成功");
                //console.log(result);
                onSuccess(result);
            },
            error: function (xhr,status,error){

                console.log("获取交易记录成功");
                console.log(error);
            }

        }
    );

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






