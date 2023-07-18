<template>
  <div>
    <form class="form-container" @submit.prevent="onSubmit">
      <label for="tweet">Tweet:</label>
      <textarea id="tweet" v-model="tweet" rows="4"></textarea>

      <label for="caption">Caption:</label>
      <input type="text" id="caption" v-model="caption" />

      <button type="submit">Post</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tweet: "",
      caption: "",
    };
  },
  methods: {
    onSubmit() {
      if (this.tweet.trim() === "") {
        alert("Enter a tweet.");
        return;
      } else if (this.caption.trim() === "") {
        alert("Enter a caption.");
        return;
      }

      this.$emit("tweet-data", {
        tweet: this.tweet,
        caption: this.caption,
      });
      this.resetForm();
    },
    resetForm() {
      this.tweet = "";
      this.caption = "";
    },
  },
};
</script>

<style>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  font-family: cursive;
}

label {
  font-weight: bold;
}

textarea {
  width: 100%;
  resize: vertical;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
