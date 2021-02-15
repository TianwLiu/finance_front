
function openLinkToken(response){
    let result=response.data;
    let linkToken=result.linkToken;
    let userId=result.userId;
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

function postPublicTokenSuccess(response){
    setTimeout(function (){
        location.reload();
    },3000);
}

function addMemberSuccess(response){
    if(response.data.flag){
        refreshGroup();
    }else{
        window.alert(response.data.error);
    }
}

function delMemberSuccess(response){
    if(response.data.flag){
        refreshGroup();

    }else{
        window.alert(response.data.error);
    }
}



function getAccountsSuccess(response){
    requestAllFlag.getAccountsFlag=1;
    homeVM.self.getAccountsResponse=response.data;
    setAccountInfo(response.data);
}
function getCashFlowsSuccess(response){
    requestAllFlag.getCashFlowsFlag=1;
    homeVM.self.getCashFlowsResponse=response.data;
}
function getTransactionsSuccess(response){
    requestAllFlag.getTransactionsFlag=1;
    homeVM.self.getTransactionsResponse=response.data;
}


function getGroupAccountsSuccess(response){
    requestAllFlag.getGroupAccountsFlag=1;
    homeVM.group.getAccountsResponse=response.data;
    setAccountInfo(response.data);

}
function  getGroupCashFlowsSuccess(response){
    requestAllFlag.getGroupCashFlowsFlag=1;
    homeVM.group.getCashFlowsResponse=response.data;
}

function getGroupTransactionsSuccess(response){
    requestAllFlag.getGroupTransactionsFlag=1;
    homeVM.group.getTransactionsResponse=response.data;
}





function ajaxAccessFail(error) {
    console.log(error);
}