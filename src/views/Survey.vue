<template>
    <section class="survey">

        <div id="v-model-basic" class="question_app">
            <h1>את מי הייתם רוצים לראיין?</h1>
            <div class="survey_holder">
                <input v-model="message" required placeholder="שם המרואיין/ת המוצע/ת"/>
                <input v-model="data" required placeholder="פרטי המרואיין/ת (טל, פייסבוק, מייל, אתר וכ״ו)"/>
                <button id="send" :class="{ enable: (message && data) }" @click="sendSurvey()"> שלח/י</button>
            </div>

            <ol>
                <li v-for="(item, index) in surveys" :key="index">
                    <span class="surveys-name">{{ item.name }}</span>
                    <span class="surveys-weight">{{ item.weight }}</span>
                    <span class="surveys-liner" :style="{ width: graph(item.weight) + 'px' }"></span>
                </li>
            </ol>
        </div>

    </section>
</template>

<script>
// @ is an alias to /src
// import Nav from '../components/Nav.vue'

export default {
    name: 'Survey',
    data() {
        return {
            page: {},
            message: '',
            data: '',
            surveys: {}
        }
    },
    beforeMount() {
        this.page = this.$route.params;
        this.getSurvey()
    },
    mounted() {
        console.log('Register get page: ', this.page);
    },
    computed: {},

    methods: {
        graph(weight){
            const max = window.innerWidth > 800 ? 500 : 270;
            let lineLength = max / 20;
            return weight * lineLength;
        },
        time(timeStamp) {
            const time = new Date(timeStamp);
            const formattedTime = time.toLocaleString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
            });
            return formattedTime;
        },
        filterRaw(raw) {
            let temp;
            temp = raw.filter((json) => {
                return json.date;
            });



            temp.forEach(item => {
                item.weight = 1;
            })

            temp.forEach(item => {
                if (item.name) {
                    temp.forEach(set => {
                        if (item.weight > 0 && (item.date != set.date ) && item.name.includes(set.name)) {
                            item.weight++;
                            set.weight = -1;
                        }
                    })
                }
            })

            temp = raw.sort((a, b) => {
               return b.weight - a.weight;
            });


            return temp.filter(item => item.weight > 0);
        },

        getSurvey() {
            fetch('https://data.wearefree.tv/get-survey', {
                referrer: "https://en.wearefree.tv",
                referrerPolicy: "no-referrer-when-downgrade",
                accessControlAllowOrigin: "https://en.wearefree.tv",
            }).then(response => response.json())
                .then(data => {
                    console.log('suveys: ', data);
                    this.surveys = this.filterRaw(data);
                });

        },
        sendSurvey() {
            if (this.message && this.data) {
                fetch('https://data.wearefree.tv/survey/' + this.message + '/' + this.data, {
                    referrer: "https://en.wearefree.tv",
                    referrerPolicy: "no-referrer-when-downgrade",
                    accessControlAllowOrigin: "https://en.wearefree.tv",
                }).then(response => response.json())
                    .then(data => {
                        this.message = this.data = '';
                        console.log('suveys: ', data);
                        this.surveys = this.filterRaw(data);
                    });
            }
        }


    },

}
</script>

<style scoped>
.question_app {
    direction: rtl;
    font-family: sans-serif;
    border-radius: 2px;
    padding: 20px 30px;
    margin-top: 1em;
    margin-bottom: 40px;
    user-select: none;
    overflow-x: auto;
}

@media screen and (min-width: 800px){
    .question_app {
        width: 800px;
    }
}

.question_app .survey_holder {
    display: flex;
    flex-direction: column;
}

.question_app button,
.question_app input {
    padding: 10px;
}

.question_app input {
    min-width: 200px;
}

.question_app button {
    pointer-events: none;

}

.enable {
    pointer-events: all !important;
    background: lightcoral !important;
    color: #fff !important;
}

ol {
    text-align: right;
    height: 300px;
    overflow-y: scroll;
    margin: 0;
    padding: 20px;
}

ol li {
    display: flex;
    justify-content: space-between;
    position: relative;
}

.surveys-name{
    position: relative;
}

.surveys-liner{
    position: absolute;
    background: lightskyblue;
    height: 3px;
    /*z-index: -1;*/
    bottom: -1px;
    left: 0px;
}

.question_app_time {
    direction: ltr;
    font-size: 14px;
    line-height: 18px;
}
</style>