
requirejs(["requireConfig"],function () {

    requirejs(["vue","md5","axios","BackEndHost"],function (Vue,md5,axios) {
        window.Vue=Vue;
        window.md5=md5;
        window.axios=axios;
        main();
/*        $(document).ready(function (){

            $("#register").click(function (){
                register($("#user_id").val(),md5($("#pass_word").val()));
            });

            $("#logIn").click(function () {
                logIn($("#user_id").val(),md5($("#pass_word").val()));
            });

        });*/
    });

});

function main(){
 window.indexVM=NewLogInViewModel();
}

function test_main(){
   // logIn("test1","sdf");
    // postPublicToken("hello");
    // getGroupTransactions(function (result){  console.log(result); });
    //getGroupBalances(function (result){console.log(result)});
    //getBalances(function (result){  console.log(result); });
    //getTransactions(function (result){  console.log(result); });
    //console.log("test ...")

}

function NewLogInViewModel(){
    return new Vue({
        el:"#index",
        data:{
            userID:null,
            passWord:null,
        },
        methods:{
            logIn:function () {
                tryLogIn(this.userID,md5(this.passWord));
                this.userID=null;
                this.passWord=null;
            },
            register:function () {
                tryRegister(this.userID,md5(this.passWord));
                this.userID=null;
                this.passWord=null;
            }
        }
    });
}

function tryRegister(userId, passWord){

    let form=new FormData();
    form.append("user_id", userId );
    form.append(  "pass_word",passWord );


    axios.post(ProtocolHostAndPort+"/register",form).
    then(function (response) {
        if(response.data){
            window.alert("register success");
        }else{
            window.alert("register fail");
        }
    }).
    catch(function (error) {
        window.alert(error);
    });
}

function tryLogIn(userId,passWord){
    let form=new FormData();
    form.append("user_id", userId );
    form.append(  "pass_word",passWord );


    axios.post(ProtocolHostAndPort+"/logIn",form).
    then(logInApiAccessSuccess).
    catch(function (error) {
        window.alert(error);
    });

   /* $.ajax(
        ProtocolHostAndPort+"/logIn",
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
    );*/
}

function logInApiAccessSuccess(response){
    let result=response.data;
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
