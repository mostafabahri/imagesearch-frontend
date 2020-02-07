<template>
  <div class="mx-5">
    <div class="mb-6">
      <h1 class=" text-4xl text-gray-800">
        Similar Colors Tool
      </h1>
      <p>Choose one image and and click twice for sorting based on color.</p>
    </div>
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
          <img class="w-full m-0" v-lazy="photo.url" />
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

const server = process.env.VUE_APP_SERVER;
console.log(server);

export default {
  name: "ImageView",
  data: function() {
    return {
      photos: null,
      pickedPhotoId: null,
      loading: false
    };
  },
  props: {},
  mounted() {
    axios.get(`${server}/images`).then(response => {
      this.photos = response.data.data;
    });
  },
  methods: {
    handleClick: function(photo) {
      // double click
      if (this.pickedPhotoId === photo.id) {
        this.sendClick();
        return;
      }
      this.pickedPhotoId = photo.id;
    },
    sendClick: function() {
      axios
        .post(`${server}/search`, {
          q: this.pickedPhotoId
        })
        .then(response => {
          this.pickedPhotoId = null;
          this.photos = response.data.data;

          window.scrollTo(0, 0);
        });
    }
  }
};
</script>

<style scoped>
.photos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  grid-gap: 10px;
}
.unfocused {
  opacity: 0.3;
  transition: 0.2s all;
}
</style>
