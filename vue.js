var place_data = [
    {
        tag: "taipei_city",
        place: "臺北市",
    },
    {
        tag: "new_taipei_city",
        place: "新北市",
    },
    {
        tag: "taichung_city",
        place: "臺中市",
    },
    {
        tag: "tainan_city",
        place: "臺南市",
    },
    {
        tag: "kaohsiung_city",
        place: "高雄市",
    },
    {
        tag: "keelung_city",
        place: "基隆市",
    },
    {
        tag: "taoyuan_country",
        place: "桃園市",
    },
    {
        tag: "hsinchu_city",
        place: "新竹市",
    },
    {
        tag: "hsinchu_country",
        place: "新竹縣",
    },
    {
        tag: "miaoli_country",
        place: "苗栗縣",
    },
    {
        tag: "changhua_country",
        place: "彰化縣",
    },
    {
        tag: "nantou_country",
        place: "南投縣",
    },
    {
        tag: "yunlin_country",
        place: "雲林縣",
    },
    {
        tag: "chiayi_city",
        place: "嘉義市",
    },
    {
        tag: "chiayi_country",
        place: "嘉義縣",
    },
    {
        tag: "pingtung_country",
        place: "屏東縣",
    },
    {
        tag: "yilan_country",
        place: "宜蘭縣",
    },
    {
        tag: "hualien_country",
        place: "花蓮縣",
    },
    {
        tag: "taitung_country",
        place: "臺東縣",
    },
    {
        tag: "penghu_country",
        place: "澎湖縣",
    },
    {
        tag: "kinmen_country",
        place: "金門縣",
    },
    {
        tag: "lienchiang_country",
        place: "連江縣",
    },
]
    ;
let app = new Vue({
    el: '#app',
    data: {
        rawData: '',
        taiwan: '',
        selectCity: '',
        sites: [],
        dataUrl: 'http://localhost:8888/records',
        // dataUrl: 'https://cors-anywhere.herokuapp.com/https://od.moi.gov.tw/api/v1/rest/datastore/301000000A-000605-040'
    },
    methods: {
        mouseenterHandler(e) {
            const nowSelect = e.toElement.getAttribute('data-name')//現在點選的Dom的data-name
            const cities = place_data.filter(city => {//用filter在place_data中抓出點選的Dom資料
                return city.tag == nowSelect
            })
            this.selectCity = cities[0].place
            // console.log(cities[0].place)
            this.filterPlace()
            this.makeChart()
        },
        filterPlace() {
            this.sites = this.rawData.filter((site) => {
                return site.site_id.indexOf(this.selectCity) == 0
            })
            this.sites = this.sites.sort((a, b)=>{
                return b.people_total - a.people_total
            })
        },
        makeChart() {
            let chart = d3.select('#chart').selectAll('li')

            let update = chart.data(this.sites)
            let enter = update.enter()
            let exit = update.exit()

            update
                .text(function (data) {
                    return `${data.people_total}`
                })
                .style({
                    'width': function (data) {
                        return `${data.people_total / 500}px`
                    }
                })
                .attr('class', 'cahart-class')

            enter
                .append('li')
                .text(function (data) {
                    return `${data.people_total}`
                })
                .style({
                    'width': function (data) {
                        return `${data.people_total / 500}px`
                    }
                })
                .attr('class', 'cahart-class')

            exit.remove()
        }
    },
    computed: {

    },
    mounted() {
        this.taiwan = document.querySelectorAll('path');
        this.taiwan.forEach(city => {
            city.addEventListener('mouseenter', this.mouseenterHandler)
        });
        axios.get(this.dataUrl)
            .then((res) => {
                // console.log(res)
                this.rawData = res.data
                // console.log('rawData', this.rawData)
            })
            .catch((err) => {
                console.log(err)
            })
    }

})