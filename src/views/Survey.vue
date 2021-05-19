<template>
    <section class="survey">

        <div id="v-model-basic" class="question_app">
            <h1>את מי הייתם רוצים לראיין?</h1>
            <div class="survey_holder">
                <input v-model="message" required placeholder="שם" />
                <input v-model="data" required placeholder="פרטים" />
                <button id="send" :class="{ enable: (message && data) }" @click="sendSurvey()"> שלח/י </button>
            </div>

            <ol>
                <li v-for="(item, index) in surveys" :key="index">
                    <span>{{item.name}}</span>
                    <span class="question_app_time">{{time(item.date)}}</span>
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
            time(timeStamp){
                const time = new Date(timeStamp);
                const formattedTime = time.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric"
                });
                
                return formattedTime;

            },

            setComments(commets) {
                let temp;
                temp = commets.filter(function (json) {
                    return json.date;
                });

                temp = commets.sort(function (a, b) {
                    if (a.date && b.date) {
                        return a.date - b.date;
                    }
                });

                return temp;
            },

            getSurvey() {


                fetch('https://data.wearefree.tv/get-survey', {
                        referrer: "https://en.wearefree.tv",
                        referrerPolicy: "no-referrer-when-downgrade",
                        accessControlAllowOrigin: "https://en.wearefree.tv",
                    }).then(response => response.json())
                    .then(data => {
                        console.log('suveys: ', data);
                        this.surveys = this.setComments(data);
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
                            this.surveys = this.setComments(data);
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
        border: 1px solid #eee;
        border-radius: 2px;
        padding: 20px 30px;
        margin-top: 1em;
        margin-bottom: 40px;
        user-select: none;
        overflow-x: auto;
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

    .question_app button{
        pointer-events: none;

    }

    .enable {
        pointer-events: all !important;
        background: lightcoral;
        color: #fff;
    }

    ol {
        text-align: right;
        height: 300px;
        overflow-y: scroll;
        margin: 0;
        padding: 20px;
    }

    ol li{
        display: flex;
        justify-content: space-between;
    }

    .question_app_time{
        direction: ltr;
        font-size: 14px;
        line-height: 18px;
    }
</style>