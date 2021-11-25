<template lang="html">



 <section id="comments_input_holder">
    <div>
        <p id="comments_title"> {{commentsLenght}} комментарии <span> Добавить комментарии </span>  </p>
            <div id="input_holder">
                <input id="comments_name" v-model="userName" placeholder="имя: " required name="name" type="text">
                <input id="comments_input" v-model="userComment" placeholder="комментарий :" required name="comment"
                    type="text">
                <button id="send" :class="{ enable: (userName && userComment) }"
                        @click="sendMessage">Отправить
                </button>
            </div>
                

    </div>


</section>

<section id="comments">
    <div id="icon_holder">
        <span id="like"></span>
        <span id="dislike"></span>
    </div>
    <div>
        <div id="comments_holder">
            <div id="comments_section">
                <span id="comments_section_line" v-for="comment in allComments" :key="comment.date">
                    <p class="message_name">{{ comment.comment.name }} :</p>
                    <p class="message_text">{{ comment.comment.value }}</p>
                </span>
            </div>
        </div>
    </div>

</section>

</template>

<script lang="js">
export default {
    name: 'Comments',
    props: {},
    data() {
        return {
            allComments: [],
            params: {},
            userComment: '',
            userName: '',
            commentsLenght : 0
        }
    },
    beforeMount() {
        this.params = this.$route.params;
    },
    mounted() {
        this.getComments();
    },
    computed() {
        // this.isDataSet = ()=> this.userName.lenght && this.userComment.lenght
    },
    methods: {

        setComments(commets) {
            commets = commets.filter(function (json) {
                return json.date;
            });

            this.allComments = commets.sort(function (a, b) {
                if (a.date && b.date) {
                    return a.date - b.date;
                }
            });
        },

        async getComments() {

            fetch('https://data.wearefree.tv/post/' + this.params.postId, {
                referrer: "https://ru.wearefree.tv",
                referrerPolicy: "no-referrer-when-downgrade",
                accessControlAllowOrigin: "https://ru.wearefree.tv",
            }).then(response => response.json())
                .then(data => {
                    // this.allComments = data.body;
                    this.setComments(data.body);
                    this.commentsLenght = data.body.length;

                });
        },

        sendMessage() {

            if (this.userComment && this.userName) {
                this.isDataSet = true;

                const name = encodeURIComponent(this.userName);
                const comment = encodeURIComponent(this.userComment);

                const data = this.params.postId + '/who/' + name + '/comment/' + comment;

                fetch('https://data.wearefree.tv/post/' + data, {
                    referrer: "https://ru.wearefree.tv",
                    referrerPolicy: "no-referrer-when-downgrade",
                    accessControlAllowOrigin: "https://ru.wearefree.tv",
                }).then(response => response.json())
                    .then(data => {
                        this.userComment = this.userName = '';
                        this.setComments(data.body);
                        this.commentsLenght = data.body.length;

                    })
            } else {
                // if (!this.userName) {
                //   this.userName = 'required';
                // }
                // if (!this.userComment) {
                //   this.userComment = 'required';
                // }
            }

        }
    }
}
</script>

<style scoped>

section {
    font-size: .8rem;
}

.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

#comments_input_holder{
    padding: 3rem 0;
    margin-top: 3rem;
    border-top: 2px solid #ccc;
}

#input_holder{
    margin-left: 330px;
    width: 400px;
    position: relative;
    top: -53px;
}

#comments_title{
    font-size: 1.1rem;
}
#comments_title>span{
    margin-left: 20px;
    font-size: .9rem;
    font-weight: bold;
}

#comments {
    margin-top: -4rem;
    margin-left: 150px;
    font-family: sans-serif;
    background: #eee;
}

#comments_holder {
    display: flex;
    flex-direction: column;
}

#comments_section {
    min-height: 200px;
    max-height: 400px;
    border-radius: 5px;
    padding: 10px 0;
    overflow-y: scroll;
    font-size: .8rem;
    color: #555;
    text-align: left;
}

#comments_holder {
    display: flex;
    flex-direction: column;
    background: rgb(250, 250, 250);
}

#comments_name {
    width: calc(100% - 20px);
    /* background: #eee; */
    border: 0;
    /* border-top: 1px solid; */
    padding: 10px;
    margin: 10px 0;
    font-size: 1rem;
}

#comments_input {
   width: calc(100% - 20px);
    height: 40px;
    /* background: #eee; */
    border: none;
    padding: 0 10px;
    /* border-top: 1px solid; */
    font-size: 1rem;
}

#send {
    margin-left: auto;
    margin-top: 10px;
    display: flex;
    border: 1px solid;
    background: #f00;
    color: #fff;
    border-radius: 5px;
    font-weight: 900;
    font-size: 1rem;
    padding: 10px;
}


.message_name {
    font-size: 0.9rem;
    font-weight: 900;
    margin-bottom: 0 !important;
    color: #000;
}

.disabled {
    pointer-events: none;
    background: #eee !important;
}

.bull-views {
    color: #000;
}

.message_text {
    font-size: .9rem;
    color: initial;
    color: #555;
    margin: 5px 0;
}

.enable {
    pointer-events: all !important;
    background: #6495ed;
}


@media screen and (max-width: 768px) {
    #input_holder {
        margin-left:0;
        width: auto;
        top: initial
    }

    #comments_input_holder{
        padding: 2rem 0;
    }

    #comments{
        margin-left: initial;
        margin-top: initial;
    }
}
</style>