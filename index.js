const hostAndPort="trytolog.com:10016"
function test_main(){
    logIn("test1","sdf");
    // postPublicToken("hello");
    // getGroupTransactions(function (result){  console.log(result); });
    //getGroupBalances(function (result){console.log(result)});
    //getBalances(function (result){  console.log(result); });
    //getTransactions(function (result){  console.log(result); });
    //console.log("test ...")

}


function register(userId, passWord){
    /*$.post(
        "http://localhost:8080/register",
        {"user_id": userId,
        "pass_word":passWord},
        openLinkToken
    );*/
    $.ajax(
        "http://"+hostAndPort+"/register",
        {
            type:"post",
            data:{"user_id": userId,
                "pass_word":passWord},
            success:function (flag){
                if(flag){
                    window.alert("register success");
                }else{
                    window.alert("register fail");
                }

            }

        }
    );
}

function logIn(userId,passWord){
    $.ajax(
        "http://"+hostAndPort+"/logIn",
        {
            type:"post",
            data:{"user_id": userId,
                "pass_word":passWord},
            success:function (result){
                if(result.flag){
                    localStorage.userId=result.user_id
                    localStorage.groupId=result.group_id
                    localStorage.token=result.token
                    console.log(localStorage.token);

                    location.href="./home.html"
                }else{
                    window.alert("user_id or password wrong");
                }

            }

        }
    );
}

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
