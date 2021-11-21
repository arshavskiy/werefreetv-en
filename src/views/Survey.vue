<template>
    <section class="survey">
        <div id="v-model-basic" class="question_app">
            <h1>добавите своего контингента на интервью</h1>
            <h2></h2>
            <div class="survey_holder">
                <div>
                    <input v-model="message" minlength="3" required placeholder="имя: " />
                    <input v-model="data" minlength="3" required placeholder="как связаться: " />
                    <!-- <button id="send" :class="{ enable: (message && data) }" @click="sendSurvey()">отправить</button> -->
                    <button id="send" @click="sendSurvey()">отправить</button>
                </div>
            </div>           
        </div>
    </section>

    <span class="arrow-down"/>
    <span class="arrow-inner"/>

    <section class="survey-sum">
        <h2>
            вы выбрали:
        </h2>
        <ol>
            <li v-for="(item, index) in surveys" :key="index">
                <span class="surveys-name">{{ item.name }}</span>
                <span v-if="!canVote(item.name)" class="surveys-selected"> </span>
                <span v-if="canVote(item.name)" class="surveys-select" v-on:click.once="sendSurvey(item)"> + </span>
                <span class="surveys-liner" :style="{ width: graph(item.weight) + 'px' }"></span>
                <span class="surveys-weight">{{ item.weight }}</span>
            </li>
        </ol>
    </section>
</template>

<script>
    // @ is an alias to /src
    // import Nav from '../components/Nav.vue'
    import {utils, contnet} from '../utils';

    export default {
        name: 'Surveys',
        data() {
            return {
                page: {},
                message: '',
                data: '',
                surveys: {},
                checkedNames: [],
                cookies: {},
                maxGraph: Number
            }
        },
        beforeMount() {
            this.page = this.$route.params;
            this.getSurvey();
        },
        mounted() {
            console.log('mounted survey: ', this.page);
        },
        computed: {},

        methods: {
            canVote(name) {
                return !utils.canIsue(this.cookies, name);
            },
            setCookies() {
                let tmpCookies = {};
                this.surveys.forEach(item => {
                    let incoded = utils.stringToUTF16(item.name)
                    let cookies = document.cookie.split('; ').find(row => row.startsWith(incoded + '='))
                    tmpCookies[item.name] = cookies;
                })
                return tmpCookies;
            },
            graph(weight) {
                const max = window.innerWidth > 800 ? 800 : 260;
                const maxLineLength = max / 2;
                let lineLength;
                let multiplayer = maxLineLength / this.maxGraph;
                if (weight === this.maxGraph) {
                    lineLength = maxLineLength;
                } else {
                    lineLength = weight * multiplayer;
                }
                return lineLength;
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
                if (typeof raw != Object && typeof raw.length != "number") return;
                temp = raw.filter((json) => {
                    return json.date;
                });


                temp.forEach(item => {
                    item.weight = 1;
                })

                temp.forEach(item => {
                    if (item.name) {
                        temp.forEach(set => {
                            if (item.weight > 0 && (item.date != set.date)) {
                                if (item.name.includes(set.name)) {
                                    item.weight++;
                                    set.weight = -1;
                                }
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
            
                fetch(contnet.surveyRuAPI, {
                        referrer: "ru.wearefree.tv",
                        referrerPolicy: "no-referrer-when-downgrade",
                        accessControlAllowOrigin: "ru.wearefree.tv"
                    }).then(response => response.json())
                    .then(data => {
                        console.log('suveys: ', data);
                        this.surveys = this.filterRaw(data);
                        this.maxGraph = this.surveys[0] && this.surveys[0].weight;
                        this.cookies = this.setCookies();
                    });

            },
            sendSurvey(item) {
                console.debug(this.checkedNames);
                let name = this.message || item.name;
                let data = this.data || '';
                const cantIsue = utils.canIsue(this.cookies, name);

                if (cantIsue) {
                    return
                }
                //document.cookie = utils.stringToUTF16(name) + '=' + true +';max-age=31536000';
                // Example of use:
                utils.setCookie(utils.stringToUTF16(name), true, {
                    domain: 'ru.wearefree.tv',
                    secure: true,
                    'max-age': 31536000
                });
                this.cookies[name] = true;

                let api = `${contnet.surveyRuPostAPI}${encodeURIComponent(name)}/${encodeURIComponent(data)}`;

                fetch(api, {
                        referrer: "ru.wearefree.tv",
                        referrerPolicy: "no-referrer-when-downgrade",
                        accessControlAllowOrigin: "ru.wearefree.tv"
                    }).then(response => response.json())
                    .then(data => {
                        this.message = this.data = '';
                        console.log('suveys: ', data);
                        this.surveys = this.filterRaw(data);
                    });
            }


        },

    }
</script>


<style>

    section.main_app { 
        width: 100%;
        max-width: initial;
    }

    section.main_app main {
        width: 100%;
    }


</style>

<style scoped>

    
    .survey-sum {
        background: #eee;
        min-height: 30vh;
        max-height: 700px;
        padding: 30px;
        border-top: 1px solid rgb(185, 185, 185);
        margin: 0 -8px;
    }

    .survey-sum ol {
        max-width: 700px;
        margin: 0 auto;
    }
    
    .question_app {
        /* direction: rtl; */
        font-family: sans-serif;
        padding: 20px 30px;
        margin-top: 1em;
        margin-bottom: 20px;
        user-select: none;
        overflow-x: auto;
    }


    .question_app .survey_holder {
        display: flex;
        justify-content: center;
    }

    h1,h2 {
        color: #000;
    }

    .survey_holder>div{
        width: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .question_app button,
    .question_app input {
        padding: 10px;
    }

    .arrow-down {
        position: relative;
        right: -17px;
        top: 40px;
        width: 0; 
        height: 0; 
        border-left: 18px solid transparent;
        border-right: 18px solid transparent;
        border-top: 20px solid rgb(185, 185, 185);
    }

    .arrow-inner {
        position: relative;
        top: 38px;
        left: -18px;
        width: 0; 
        height: 0; 
        border-left: 17px solid transparent;
        border-right: 17px solid transparent;
        border-top: 20px solid #fff;
    }

    .question_app input {
        min-width: 200px;
        border: none;
        background: #eee;
        margin: 3px;
        border-radius: 3px;
    }

    .question_app button {
        pointer-events: none;
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 16px;
        background: #f00;
        color: #fff;
        border: none;
        font-weight: bold;
        border-radius: 3px;
    }

    .enable {
        pointer-events: all !important;
        background: lightcoral !important;
        color: #fff !important;
    }

    ol {
        text-align: right;
        margin: 0;
        padding: 20px;
    }

    ol li {
        display: flex;
        justify-content: space-between;
        position: relative;
        color:rgb(61, 137, 184);
        font-weight: bold;
        height: 18px;
        margin:7px 0;
    }

    .survey_sum {
        background: #eee;
        height: 700px;
        padding: 30px;
    }

    .surveys-name {
        position: relative;
        color: rgb(61, 137, 184);
    }

    .surveys-liner {
        background: rgb(61, 137, 184);
        bottom: -1px;
        border-radius: 3px;
    }

    .question_app_time {
        direction: ltr;
        font-size: 14px;
        line-height: 18px;
    }

    .surveys-selected {
        width: 20px;
    }

    .surveys-select {
        padding: 0 4px;
        border-radius: 50%;
        margin: 0;
        display: flex;
        justify-content: space-between;
        position: relative;
        align-items: center;
        background: rgb(61, 137, 184);
        color: #fff;
        font-weight: 900;
    }

    .surveys-select:active {
        border-color: rgb(61, 137, 184);
        color: rgb(61, 137, 184);
    }


    @media screen and (max-width: 768px) {
        .survey-sum {
            padding: 30px 0;
          
        }
        .survey-sum ol {
            font-size: 12px;
        }

        ol li {
            height: 14px;
        }
    }

</style>