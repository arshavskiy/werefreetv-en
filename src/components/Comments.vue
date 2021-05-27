<template lang="html">

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
        <input id="comments_name" v-model="userName" placeholder="name" required name="name" type="text">
        <input id="comments_input" v-model="userComment" placeholder="comment" required name="comment" type="text">
        <button id="send" :class="{ enable: (userName && userComment) }"
          @click="sendMessage">Send</button>
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
        userName: ''
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
            referrer: "https://en.wearefree.tv",
            referrerPolicy: "no-referrer-when-downgrade",
            accessControlAllowOrigin: "https://en.wearefree.tv",
          }).then(response => response.json())
          .then(data => {
            // this.allComments = data.body;
            this.setComments(data.body);
            console.log('comments: ', this.allComments);

          });
      },

      sendMessage() {

        if (this.userComment && this.userName) {
          this.isDataSet = true;

          const name = encodeURIComponent(this.userName);
          const comment = encodeURIComponent(this.userComment);

          const data = this.params.postId + '/who/' + name + '/comment/' + comment;

          fetch('https://data.wearefree.tv/post/' + data, {
              referrer: "https://en.wearefree.tv",
              referrerPolicy: "no-referrer-when-downgrade",
              accessControlAllowOrigin: "https://en.wearefree.tv",
            }).then(response => response.json())
            .then(data => {
              this.userComment = this.userName = '';
              this.setComments(data.body);
              console.log('comments 2: ', this.allComments);

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


  #comments {
    margin-top: 4rem;
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
    padding: 10px;
    overflow-y: scroll;
    font-size: .8rem;
    color: #555;
    text-align: left;
  }

  #comments_holder {
    display: flex;
    flex-direction: column;
    background: #eee;
    border: 1px solid;
    border-radius: 5px;
  }

  #comments_name {
    background: #eee;
    border: 0;
    border-top: 1px solid;
    padding: 10px;
    font-size: 1rem;
  }

  #comments_input {
    height: 40px;
    background: #eee;
    border: none;
    padding: 0 10px;
    border-top: 1px solid;
    font-size: 1rem;
  }

  #send {
    width: 100%;
    border: 1px solid;
    background: cornflowerblue;
    color: #fff;
    border-radius: 5px;
    padding: 5px;
    font-weight: 900;
    font-size: 1rem;
    padding: 10px;
  }


  .message_name {
    font-size: .8rem;
    font-weight: 900;
    color: darkmagenta;
    margin-bottom: 0 !important;

  }

  .disabled {
    pointer-events: none;
    background: #eee !important;
  }

  .bull-views {
    color: #000;
  }

  .message_text {
    font-size: .8rem;
    color: initial;
  }

  #send {
    width: 100%;
    border: 1px solid;
    background: #6495ed;
    color: #fff;
    border-radius: 5px;
    padding: 5px;
    font-weight: 900;
    pointer-events: none;
    background: #eee;
  }

  .enable {
    pointer-events: all !important;
    background: #6495ed;
  }
</style>