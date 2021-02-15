requirejs(["vue"],function (Vue) {




    Vue.component(
        "list-notification",{
            props:["notification"],
            data:function (){
                return {
                    notifications:[],
                }
            },
            watch:{
                notification: function () {
                    if(this.notification!=null){
                        this.notifications.unshift(this.notification);
                        this.$refs.list.scrollTop=0;
                    }
                }
            },
            methods:{
                clearAll:function () {
                    this.notifications=[];

                }
            },
            template:`
            <div>
                <button v-on:click="clearAll" class="button is-small" >Clear all</button>
                <div ref="list" style="overflow-y: auto;overflow-x: hidden; height: 100px;background-color: #0a0a0a">
                    <div  v-for="notification in notifications"  style="width:fit-content; color: #29b342">
                        {{notification}}
                    </div>
                </div>
                
            </div>
            `,
        }

    );

    Vue.component(
        "box-cashflow-month",{
            props:["get_cash_flows_response"],
            computed:{
                report:function () {
                    if(isNone(this.get_cash_flows_response)||isNone(this.get_cash_flows_response[0])){
                        return {
                            seen:true,
                            income:0,
                            expense:0,
                            accumulation:0,
                            health:0,
                            income_change_rate:0,
                            expense_change_rate:0,
                            accumulation_change_rate:0,
                            health_change_rate:0,
                        }
                    }
                    let result=this.get_cash_flows_response;
                    var income_change_rate=(result[0].Income-result[1].Income)/result[1].Income;
                    var expense_change_rate=(result[0].Expense-result[1].Expense)/result[1].Expense;
                    var accumulation_change_rate=(result[0].Indicators.R_finance_accumulation-result[1].Indicators.R_finance_accumulation)/result[1].Indicators.R_finance_accumulation;
                    var health_change_rate=(result[0].Indicators.R_finance_health-result[1].Indicators.R_finance_health)/result[1].Indicators.R_finance_health;
                    var report= {
                        seen:true,
                        income:result[0].Income.toFixed(2),
                        expense:result[0].Expense.toFixed(2),
                        accumulation:result[0].Indicators.R_finance_accumulation.toFixed(2),
                        health:result[0].Indicators.R_finance_health.toFixed(2),
                        income_change_rate:(income_change_rate*100).toFixed(2),
                        expense_change_rate:(expense_change_rate*100).toFixed(2),
                        accumulation_change_rate:(accumulation_change_rate*100).toFixed(2),
                        health_change_rate:(health_change_rate*100).toFixed(2),
                    };
                    return report;
                },
            },

            template:`<!--<div class="box" style="width: fit-content">-->
                        <table class=" ">
                            <tr><td><strong>收入：</strong></td><td>{{report.income}}</td><td><div v-if="report.income_change_rate>0" class="caretUp" ></div> <div v-else class="caretDown" ></div><strong>{{report.income_change_rate}}%</strong></td></tr>
                            <tr><td><strong>支出：</strong></td><td>{{report.expense}}</td><td><div v-if="report.expense_change_rate>0" class="caretUp" ></div> <div v-else class="caretDown" ></div><strong>{{report.expense_change_rate}}%</strong></td></tr>
                            <tr><td><strong>积累：</strong></td><td>{{report.accumulation}}</td><td><div v-if="report.accumulation_change_rate>0" class="caretUp" ></div> <div v-else class="caretDown" ></div><strong>{{report.accumulation_change_rate}}%</strong></td></tr>
                            <tr><td><strong>健康:</strong></td><td>{{report.health}}</td><td><div v-if="report.health_change_rate>0" class="caretUp" ></div> <div v-else class="caretDown" ></div><strong>{{report.health_change_rate}}%</strong></td></tr>
                        </table>
                    <!--</div>-->`,
        }
    );

    Vue.component(
        "box-totalbalance",{
            props:["cashbase"],
            template:`        
                    <table class="" >
                        <tbody>
                        <tr><td><strong>总余额：</strong></td><td>{{cashbase.depository_balance}}</td><td><strong>总信用卡债务</strong></td><td>{{cashbase.credit_liability}}</td></tr>
                        </tbody>
                    </table>
            `,
        }
    );




    Vue.component(
        "box-accounts-balance",{
            props:["user_accounts"],
            computed:{
                user_id:function () {
                    if(isNone(this.user_accounts)){
                        return "N/A";
                    }
                    return this.user_accounts.user_id;
                },
                accounts:function () {
                    if(isNone(this.user_accounts)){
                        return [];
                    }
                    return this.user_accounts.accounts;
                },
            },
            template:`
                <div >
                {{user_id}}&nbsp;余额：{{user_accounts.cash_base.depository_balance}}&nbsp;债务：{{user_accounts.cash_base.credit_liability}}
                    <table class="table">
                        <tbody>                            
                            <tr v-for="account in accounts"><td>{{account.name}}</td><td>{{account.subtype}}</td><td>{{account.balances.current}}</td></tr>
                           <!-- <tr><td>Adv Plus Banking</td><td>checking</td><td>1882.11</td></tr>
                            <tr><td>Discover it Card (1761)</td><td>credit card</td><td>0</td></tr>-->
                        </tbody>
                           
                    </table>
                </div>
            `,
        }
    );

    Vue.component(
        "list-transaction",{
            props: ["transactions","account_info"],
            watch:{
                transactions:function () {
                    this.$refs.list.scrollTop=0;
                },

            },
            methods:{

                getLogoUrl: function (accountID) {
                    if(isNone(accountID)){
                        return "icons/default_icon.png";
                    }
                    account=this.getAccount(accountID);
                    if (isNone(account)){return "icons/default_icon.png"}
                    switch (this.getAccount(accountID).institution_id) {
                        case "ins_1":
                            return "icons/boa_icon.png";
                        case "ins_3":
                            return "icons/chase_icon.png";
                        case "ins_33":
                            return "icons/discover_icon.png";
                        default:
                            return "icons/default_icon.png";
                    }

                },
                getMask: function (accountID) {
                    if(isNone(accountID)){
                        return "N/A";
                    }
                    account=this.getAccount(accountID);
                    if (isNone(account)){return "N/A"}
                    return this.getAccount(accountID).mask;
                },

                getAccount: function (accountId) {
                    if (isNone(accountId)){

                        return undefined;
                    }
                    if(isNone(this.account_info)){

                        return undefined;
                    }
                    return this.account_info[accountId];
                }
            },
            template:`
                <div ref="list" style="overflow-y: auto;overflow-x: hidden;height: 100%;">
                <div v-for="transaction in transactions" >
                    <div class="logo">
                        <img v-bind:src="getLogoUrl(transaction.account_id)" />
                        <h6 class="subtitle is-6">{{getMask(transaction.account_id)}}</h6>
                    </div>
                    <div class="left" >
                        <h4 class="title is-4 is-primary" style="color: #29b342">{{transaction.amount}}</h4>
                    </div>
                    <div class=" center">
                        <h5 class="subtitle is-5 is-primary" style="color: #29b342">{{transaction.date}}</h5>
                    </div>

                    <div class=" right"  >
                        <span class="subtitle is-6">{{transaction.name}}</span>

                    </div>
                    <div v-if="transaction.location.region!=''" class="left title is-5">
                        &nbsp;&nbsp;&nbsp;&nbsp;@{{transaction.location.region}}
                    </div>

                    <hr/>
                </div>
                </div>

                `,
        }
    );


    Vue.component("chart-inex",{
        props:["result"],
        methods:{
            render:function () {
                if(isNone(this.result)||isNone(this.result[0])){
                    console.log("group cash flow data temporary null")
                    return
                }
                chart_InEx(this.$refs.chart,this.result);

            }
        },
        watch:{
            result:function () {
                this.render();
            }
        },
        created:function () {
            this.render();
        },
        template: `
        <div ref="chart"  class="columns is-desktop is-vcentered is-centered " style="height: 50vh" >
                                    <div class="data-loading"></div>
        </div>
        `,
    });

    Vue.component("chart-hl",{
        props:["result"],
        methods:{
            render:function () {
                if(isNone(this.result)||isNone(this.result[0])){
                    console.log("group cash flow data temporary null")
                    return
                }
                chart_Hl(this.$refs.chart,this.result);

            }
        },
        watch:{
            result:function () {
                this.render();
            }
        },
        created:function () {
            this.render();
        },
        template: `
        <div ref="chart"  class="columns is-desktop is-vcentered is-centered " style="height: 50vh" >
                                    <div class="data-loading"></div>
        </div>
        `,
    });


/*
    Vue.component("loop",{
        props:["loopFlag"],
        computed:{
            loopContentClass:function () {
                return {
                    "loop-content-move":this.loopFlag,
                    "loop-content-stop":!this.loopFlag,
                };
            }
        },
        template:`
         <div  class="loop-window">
            <div  v-bind:class="loopContentClass">
            <slot></slot>
            </div>
         </div>              
        `,

    });
*/



    Vue.component("latest-trans",{
        props: ["transactions","account_info"],
        data:function () {
            return {
                latestTrans:[],
                latestTransLines:[],//[[["",],[""]，],] {id_1:{0:[],1:[],...,6:[]}}
            }
        },
        watch:{
            transactions:function () {
                if(!isNone(this.transactions)){
                    this.latestTransLines=[];
                    this.setLatestTrans();
                }

            }
        },
        methods:{

            creatLine:function () {
                return{
                    0:"",
                    1:"",
                    2:"",
                };
            },

            setLatestTrans:function () {
                let dateEnd=new Date();
                dateEnd.setDate(dateEnd.getDate()-7);
                let position=0;
                for(let i=0;i<this.transactions.length;i++){
                    let dateTrans=new Date(this.transactions[i].date);
                    if(dateTrans<dateEnd){
                        position=i;
                        break;
                    }
                }

                for(let i=position-1;i>=0;i--){
                    let dateTrans=new Date(this.transactions[i].date);
                    if(dateTrans<dateEnd){
                        break;
                    }
                    let index=dateTrans.getDate()+1-dateEnd.getDate();
                    let transLine=this.checkSplice(this.transactions[i].account_id);
                    if(transLine==null){
                        let newLine={
                            id:this.transactions[i].account_id,
                            history:[[],[],[],[],[],[],[]],
                        };
                        newLine.history[index].push(this.transactions[i].amount);
                        this.latestTransLines.unshift(newLine);
                    }else{
                        transLine.history[index].push(this.transactions[i].amount);
                        this.latestTransLines.unshift(transLine);
                    }

                }
            },
            checkSplice:function (account_id) {
                for(let i=0;i<this.latestTransLines.length;i++){
                    if(this.latestTransLines[i].id===account_id){
                        return this.latestTransLines.splice(i,1)[0];
                    }
                }
                return null;
            },
            getLogoUrl: function (accountID) {
                if(isNone(accountID)){
                    return "icons/default_icon.png";
                }
                account=this.getAccount(accountID);
                if (isNone(account)){return "icons/default_icon.png"}
                switch (this.getAccount(accountID).institution_id) {
                    case "ins_1":
                        return "icons/boa_icon.png";
                    case "ins_3":
                        return "icons/chase_icon.png";
                    case "ins_33":
                        return "icons/discover_icon.png";
                    default:
                        return "icons/default_icon.png";
                }

            },
            getUserName:function (accountID) {
                if(isNone(accountID)){
                    return "N/A";
                }
                let account=this.getAccount(accountID);
                if (isNone(account)){return "N/A"}
                return this.getAccount(accountID).userId.substring(0,1).toUpperCase();
            },
            getMask: function (accountID) {
                if(isNone(accountID)){
                    return "N/A";
                }
                let account=this.getAccount(accountID);
                if (isNone(account)){return "N/A"}
                return this.getAccount(accountID).mask;
            },

            getAccount: function (accountId) {
                if (isNone(accountId)){

                    return undefined;
                }
                if(isNone(this.account_info)){

                    return undefined;
                }
                return this.account_info[accountId];
            }

        },
        template:`
        <div ref="list" style="overflow-y: auto;overflow-x: hidden;height: 100%;">
            <div style="background-color: #29b342" >
                <div class="left">
                    账户
                </div>
                <div  class="left">
                       ->6
                </div>
                <div  class="left">
                       ->5
                </div>
                <div  class="left">
                       ->4
                </div>
                <div  class="left">
                      ->3 
                </div>
                <div  class="left">
                       ->2
                </div>
                <div  class="left">
                       ->1
                </div>
                <div  class="left">
                       ->0
                </div>
            </div>
               
                
                
                
                
            <div v-for="line in latestTransLines" >
                <div class="left"  >
                    <div style="display:flex;flex-wrap: nowrap;align-items: center" >
                        
                        <div class="logo">
                            <img v-bind:src="getLogoUrl(line.id)" />  
                        </div>
                        <div style="display: flex;flex-direction: column;align-content: center">
                            <span class="title is-4">{{getUserName(line.id)}}</span>
                            {{getMask(line.id)}}
                        </div>
                    </div>
                        
                         <!-- --->
                </div>
               
                <div v-for="day in line.history" class="left">
                    <div v-for="amount in day">
                        {{amount}}
                    </div>
                    
                </div>
            </div>
            </div>
        `,
        }
    );
    console.log("vue components registration done");



});










