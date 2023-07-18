<template>
  <div>
    <form class="form-container" @submit.prevent="onSubmit">
      <label for="image">Image:</label>
      <input
        type="file"
        id="image"
        ref="imageInput"
        @change="handleImageChange"
        accept="image/*"
      />

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
      image: null,
      caption: "",
    };
  },
  methods: {
    onSubmit() {
      if (!this.image) {
        alert("Select an image file.");
        return;
      } else if (this.caption.trim() === "") {
        alert("Enter a caption.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageBase64 = event.target.result;
        const post = {
          image: imageBase64,
          caption: this.caption,
        };
        this.$emit("post-data", post);
        this.resetForm();
      };
      reader.readAsDataURL(this.image);
    },
    handleImageChange(event) {
      this.image = event.target.files[0];
    },
    resetForm() {
      this.image = null;
      this.caption = "";
      this.$refs.imageInput.value = "";
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

input[type="file"] {
  width: 100%;
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
