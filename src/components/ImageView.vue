<template>
  <div class="mx-5">
    <div class="mb-6">
      <h1 class=" text-4xl text-gray-800 font-bold">
        Color Image Match
        <div v-show="photos" class="font-bold text-sm text-gray-800">
          (Among {{ photos.length }} images)
        </div>
      </h1>
      <p class="text-gray-700 mt-1">
        Choose one image and and click twice for sorting based on the image
        colors.
      </p>
    </div>

    <div v-if="photos" class="photos mx-auto w-4/5 ">
      <div
        v-for="photo in photos"
        :key="photo.id"
        class="border-black flex flex-col mb-2"
        :class="{
          unfocused: (pickedPhotoId != null) & (photo.id !== pickedPhotoId)
        }"
      >
        <figure @click="handleClick(photo)">
          <img class="w-full m-0" v-lazy="photo.url" />
          <figcaption>
            <!-- {{ photo.title }} -->
          </figcaption>
        </figure>
        <lazy-component class="palette flex flex-row mt-1">
          <div
            class="flex-1 h-8"
            v-for="color in photo.colors"
            :key="color.rgb"
            :style="{ backgroundColor: color.rgb }"
          ></div>
        </lazy-component>
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
      photos: [],
      pickedPhotoId: null,
      loading: false
    };
  },
  props: {},
  mounted() {
    axios.get(`${server}/images`).then(response => {
      this.photos = response.data.data;
      console.log(this.photos);
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
      this.$Progress.start();
      axios
        .post(`${server}/search`, {
          q: this.pickedPhotoId
        })
        .then(response => {
          this.$Progress.finish();
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
  grid-row-gap: 15px;
  grid-column-gap: 12px;
}
.unfocused {
  opacity: 0.3;
  transition: 0.2s all;
}
</style>
