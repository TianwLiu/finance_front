



function chart_InEx(tagID,result,) {
    let incomes=[];
    let expenses=[];
    let accumulations=[];
    let x=[];
    //the latest are the end of array
    for(let i=result.length-1; i>=0; i--) {
        accumulations.push(Number(result[i].Indicators.R_finance_accumulation.toFixed(2)));
        incomes.push(Number(result[i].Income.toFixed(2)));
        expenses.push(Number(result[i].Expense.toFixed(2)));
        x.push("->"+i);
    }

    return Highcharts.chart(tagID, {
        chart: {
            type:'column',
        //    type: 'bar',
          //  inverted:true,
        },
        inverted:true,
        /* ,*/
        title: {
            text: " 当30天收入："+incomes[incomes.length-1]+
                " 支出："+expenses[expenses.length-1]+
                " 积累："+accumulations[accumulations.length-1],
        },
        /*subtitle: {
            text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
        },*/
        xAxis: {
            categories: x,
            labels: {
                step: 1,
            },
            title: {
                text: null
            }
        },
        yAxis: {
            //min: 0,
            title: {
                text: 'Amount (dollars)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' dollars'
        },
        plotOptions: {
            column:{
                dataLabels: {
                    enabled: true
                }
            }
            /*bar: {
                dataLabels: {
                    enabled: true
                }
            }*/
        },
        /*legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },*/
        credits: {
            enabled: false
        },
        series: [{
            name: '月收入',
            data: incomes,
        }, {
            name: '月消费',
            data: expenses,
        }, {
            name: '月剩余',
            data: accumulations,
        }]
    });
}

function chart_Hl(tagID,result,){
    //let accumulations=[];
    let healths=[];
    let x=[];
    for(let i=result.length-1; i>=0; i--) {
        //accumulations.push(result[i].Indicators.R_finance_accumulation);
        healths.push(Number(result[i].Indicators.R_finance_health.toFixed(2)));
        x.push("->"+i);
    }
    let sum=0.0;
    for(let i=0;i<healths.length;i++){
        sum+=healths[i];
    }
    let totalEven=sum/healths.length;

    return Highcharts.chart(tagID, {
        chart: {
            type: 'line',
            //inverted:true,
        },
        title: {
            text: "健康指数总平均"+totalEven.toFixed(3),
        },

        xAxis: {
            categories: x,
        },
        yAxis: {
            title: {
                text: ''
            },
            min: 0,
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
            plotBands: [{
                from: 0,
                to: 0.5,
                color: 'rgba(255, 0, 0, 0.7)',
                label: {
                    text: '危险',
                    style: {
                        color: '#606060'
                    }
                }
            }, {
                from: 0.5,
                to: 1,
                color: 'rgba(255, 165, 0, 0.3)',
                label: {
                    text: '风险',
                    style: {
                        color: '#606060'
                    }
                }
            }, {
                from: 1,
                to: 2,
                color: 'rgba(0, 0, 228, 0.3)',
                label: {
                    text: '不错',
                    style: {
                        color: '#606060'
                    }
                }
            },{
                from: totalEven,
                to: totalEven+0.025,
                color: 'rgba(255, 215,0, 1)',
                label: {
                    text: "",
                    style: {
                        color: '#606060'
                    }
                }
            }, {
                from: 2,
                to: 20,
                color: 'rgba(0, 255, 0, 0.3)',
                label: {
                    text: '非常棒',
                    style: {
                        color: '#606060'
                    }
                }
            },
            ]
        },
        plotOptions: {
            line: {
                dataLabels: {
                    // 开启数据标签
                    enabled: true
                },
                // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                enableMouseTracking: false
            }
        },
        series: [{
            name: '健康指数',
            data:healths,
        },
        ]
    });

}
