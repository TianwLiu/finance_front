

requirejs.config({
    baseUrl:"js/",
    packages: [{
        name: 'highcharts',
        main: 'highcharts',
    }],
    paths:{
        //"jquery":["https://cdn.staticfile.org/jquery/1.10.2/jquery.min"],
        "plaid":["https://cdn.plaid.com/link/v2/stable/link-initialize"],
        "highcharts":["https://code.highcharts.com"],
        "md5":["https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.18.0/js/md5.min"],
        "vue":["https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.2/vue.min",
            "./lib/vue"
        ],
        "axios":["https://cdn.jsdelivr.net/npm/axios/dist/axios.min"],

    },

});
