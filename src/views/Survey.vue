<template>
    <section class="survey">

        <div id="v-model-basic" class="question_app">
            <h1>את מי הייתם רוצים לראיין?</h1>
            <div class="survey_holder">
                <input v-model="message" required placeholder="שם המרואיין/ת המוצע/ת" />
                <input v-model="data" required placeholder="פרטי המרואיין/ת (טל, פייסבוק, מייל, אתר וכ״ו)" />
                <button id="send" :class="{ enable: (message && data) }" @click="sendSurvey()"> שלח/י</button>
            </div>

            <ol>
                <li v-for="(item, index) in surveys" :key="index">
                    <span v-if="!canVote(item.name)" class="surveys-selected"> </span>
                    <span v-if="canVote(item.name)" class="surveys-select" v-on:click.once="sendSurvey(item)"> + </span>
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
    import {utils} from '../utils';

    export default {
        name: 'Survey',
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
                    let cookies = document.cookie.split('; ').find(row => row.startsWith(incoded+'='))
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
                temp = raw.filter((json) => {
                    return json.date;
                });


                temp.forEach(item => {
                    item.weight = 1;
                })

                temp.forEach(item => {
                    if (item.name) {
                        temp.forEach(set => {
                            if (item.weight > 0 && (item.date != set.date) && item.name.includes(set
                                    .name)) {
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
                let api = 'https://data.wearefree.tv/get-survey';

                fetch(api, {
                        referrer: "https://en.wearefree.tv",
                        referrerPolicy: "no-referrer-when-downgrade",
                        accessControlAllowOrigin: "https://en.wearefree.tv",
                    }).then(response => response.json())
                    .then(data => {
                        console.log('suveys: ', data);
                        this.surveys = this.filterRaw(data);
                        this.maxGraph = this.surveys[0].weight;
                        this.cookies = this.setCookies();
                    });

            },
            sendSurvey(item) {
                console.debug(this.checkedNames);
                let name = this.message || item.name;
                let data = this.data || '+';
                const canIsue = utils.canIsue(this.cookies, name);

                if (canIsue) {
                    return
                }

                // document.cookie = utils.stringToUTF16(name) + '=' + true;
                // Example of use:
                utils.setCookie(this.stringToUTF16(name), true, {domain: '.wearefree.tv',secure: true, 'max-age': 31536000});
                //document.cookie = this.stringToUTF16(name) + '=' + true +';max-age=31536000';
                this.cookies[name] = true;

                let api = `https://data.wearefree.tv/survey/${encodeURIComponent(name)}/${encodeURIComponent(data)}`;

                fetch(api, {
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


        },

    }
</script>

<style scoped>
    .question_app {
        direction: rtl;
        font-family: sans-serif;
        padding: 20px 30px;
        margin-top: 1em;
        margin-bottom: 40px;
        user-select: none;
        overflow-x: auto;
    }

    @media screen and (min-width: 800px) {
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

    .surveys-name {
        position: relative;
    }

    .surveys-liner {
        position: absolute;
        background: lightskyblue;
        height: 3px;
        bottom: -1px;
        left: 0px;
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
        padding: 0 5px;
        line-height: 10px;
        /* border: 1px solid; */
        border-radius: 22px;
        margin: 0;
        display: flex;
        justify-content: space-between;
        position: relative;
        align-items: center;
        /* width: 20px; */
        /* min-width: 20px; */
        background: darksalmon;
        color: #fff;
        box-shadow: 1px 1px 2px #101060;
    }

    .surveys-select:active {
        border-color: lightcoral;
        color: lightcoral;
    }
</style>