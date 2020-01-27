<template>
  <div class="mx-5">
    <h1 class="mb-3 text-4xl text-gray-800 mb-6">Pick one?</h1>
    <div v-if="photos" class="photos mx-auto w-4/5 ">
      <div
        v-for="photo in photos"
        :key="photo.id"
        class="border-black"
        :class="{
          unfocused: (pickedPhotoId != null) & (photo.id !== pickedPhotoId)
        }"
      >
        <figure @click="handleClick(photo)">
          <img class="w-full m-0" :src="photo.url" />
          <figcaption>
            {{ photo.title }}
          </figcaption>
        </figure>
      </div>
    </div>
    <div v-else>
      loading data...
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ImageView",
  data: function() {
    return {
      photos: null,
      pickedPhotoId: null
    };
  },
  props: {},
  mounted() {
    axios
      .get(`https://jsonplaceholder.typicode.com/photos?_limit=20`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.photos = response.data;
      });
  },
  methods: {
    handleClick: function(photo) {
      // toggle selection
      this.pickedPhotoId = this.pickedPhotoId != photo.id ? photo.id : null;
    }
  }
};
</script>

<style scoped>
.photos {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
}
.unfocused {
  opacity: 0.3;
  transition: 0.2s all;
}
</style>
