<template>
  <div>
    <h1 class="header logo">
      Vuetter
      <img
        src="../components/twitter-logo.png"
        alt="Twitter Logo"
        class="twitter-logo"
      />
    </h1>
    <div v-if="postDataSet.length > 0">
      <div
        v-for="(post, index) in postDataSet"
        :key="index"
        class="post-container"
      >
        <div v-if="!post.editing">
          <p class="post-tweet logo">
            {{ post.tweet }}
            <img
              src="../components/twitter-logo.png"
              alt="Twitter Logo"
              class="twitter-logo"
            />
          </p>
          <p class="post-caption">{{ post.caption }}</p>
          <div class="comments-container">
            <h3>Comments:</h3>
            <div class="comment-dis">
              <div v-for="comment in post.comments" :key="comment.id">
                <p class="comment-line">{{ comment }}</p>
              </div>
            </div>
          </div>
          <div class="comment-input-container">
            <label for="comment">Comment:</label>
            <input
              type="text"
              v-model="post.newComment"
              class="comment-input"
            />
            <button
              type="submit"
              @click="addComment(index)"
              class="submit-button"
            >
              Add Comment
            </button>
          </div>
        </div>
        <div v-else>
          <textarea v-model="post.newTweet" class="edit-tweet-input"></textarea>
          <input v-model="post.newCaption" class="edit-caption-input" />
          <button
            type="button"
            @click="saveEdit(index, post.id)"
            class="save-button"
          >
            Save
          </button>
        </div>

        <button type="button" @click="editPost(index)" class="edit-button">
          {{ post.editing ? "Cancel" : "Edit" }}
        </button>
        <button
          type="button"
          @click="deletePost(index, post.id)"
          class="delete-button"
        >
          Delete
        </button>
        <button
          v-if="showPostButton"
          type="button"
          @click="postData(index)"
          class="post-data-button"
        >
          Post Data
        </button>
      </div>
    </div>
    <UsersData @tweet-data="addData" @caption-data="addData" />
  </div>
</template>

<script>
import axios from "axios";
import UsersData from "../components/UsersData.vue";

export default {
  data() {
    return {
      postDataSet: [],
      showPostButton: false,
    };
  },
  components: {
    UsersData,
  },
  mounted() {
    this.fetchPostData();
  },
  methods: {
    fetchPostData() {
      axios
        .get("http://localhost:3333/post")
        .then((response) => {
          this.postDataSet = response.data.map((post) => {
            return {
              id: post.id,
              tweet: post.tweet,
              caption: post.caption,
              comments: [post.comments],
              editing: false,
              newTweet: post.tweet,
              newCaption: post.caption,
              newComment: "",
            };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addData(data) {
      const post = {
        tweet: data.tweet,
        caption: data.caption,
        comments: [],
        editing: false,
        newTweet: data.tweet,
        newCaption: data.caption,
        newComment: "",
      };
      this.postDataSet.push(post);
    },
    addComment(index) {
      const post = this.postDataSet[index];
      if (post.newComment.trim() !== "") {
        post.comments.push(post.newComment);
        post.newComment = "";
        this.showPostButton = true;
      }
    },
    editPost(index) {
      const post = this.postDataSet[index];
      post.editing = !post.editing;
    },
    async saveEdit(index, postId) {
      let post = this.postDataSet[index];
      post.tweet = post.newTweet;
      post.caption = post.newCaption;
      post.editing = false;

      let postData = {
        tweet: post.tweet,
        caption: post.caption,
      };
      await axios
        .put(`http://localhost:3333/post/${postId}`, postData)
        .then(() => {
          console.log(post);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deletePost(index, postId) {
      console.log(postId);
      this.postDataSet.splice(index, 1);
      await axios
        .delete(`http://localhost:3333/post/${postId}`)
        .catch((error) => {
          console.log(error);
        });
    },
    postData(index) {
      const post = this.postDataSet[index];
      const postData = {
        tweet: post.tweet,
        caption: post.caption,
        comments: post.comments.filter((comment) => comment.trim() !== ""),
      };

      axios
        .post("http://localhost:3333/post", postData)
        .then(() => {
          console.log(postData);
        })
        .catch((error) => {
          console.error(error);
        });
      alert("Data posted successfully....");
      this.showPostButton = false;
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #1da1f2;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: cursive;
  font-size: 24px;
  color: #fff;
  display: flex;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 10px;
}

.logo img {
  width: 24px;
  height: 24px;
  margin-left: 10px;
}

.post-container {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #f5f8fa;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: cursive;
}

.post-tweet,
.post-caption {
  font-family: cursive;
  font-size: 16px;
  margin-bottom: 10px;
}

.post-tweet {
  color: #1da1f2;
}

.post-caption {
  color: #14171a;
  line-height: 1.4;
}

.comment-line {
  font-family: cursive;
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.comment-input-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.comment-input {
  flex: 1;
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.add-comment-button {
  padding: 5px 10px;
  background-color: #1da1f2;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 20px;
}

.add-comment-button:hover {
  background-color: #0c85d0;
}

.edit-comment-button,
.delete-button,
.save-button,
.save-comment-button,
.edit-button,
.submit-button {
  padding: 5px 10px;
  background-color: #1da1f2;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 20px;
}

.edit-comment-button:hover,
.delete-button:hover,
.save-button:hover,
.save-comment-button:hover,
.submit-button:hover {
  background-color: #0c85d0;
}
</style>
