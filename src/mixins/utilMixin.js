export const utilMixin = {
    methods: {
        formatDate: (dateStr) => {
            let dArr = dateStr.slice(0,10).split("-");  // ex input "2020-01-18"
            return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0].substring(2); //ex out: "18/01/20"
        },
        formatDateYMD: (dateStr) => {
            let dArr = dateStr.slice(0,10).split("-");  // ex input "2020-01-18"
            return dArr[0].substring(2) + dArr[1] + dArr[2]; //ex out: "200118"
        },
        openUrl(url) {
            window.open(url, '_blank');
        }
    }
  }