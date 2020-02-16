<template>
  <div class="mx-5">
    <div class="mb-6">
      <h1 class=" text-4xl text-gray-800 font-bold">
        Color Image Search
        <div class="font-bold text-sm text-gray-800">
          (Among {{ photos.length }} images)
        </div>
      </h1>
      <p class="text-gray-700 mt-1">
        Choose one image and and click twice for sorting based on the image
        colors.
      </p>
    </div>

    <div class="flex flex-row mb-4 justify-end mx-auto md:w-4/5 font-semibold">
      <div class="pr-4">
        <input type="radio" value="color" name="method" v-model="method" />
        Color
      </div>
      <div class="pr-4">
        <input type="radio" value="content" name="method" v-model="method" />
        Content
      </div>
      <div>
        <input type="radio" value="both" name="method" v-model="method" />
        Both
      </div>
    </div>

    <div v-if="photos.length" class="photos mx-auto md:w-4/5">
      <div
        v-for="(photo, index) in photos"
        :key="photo.id"
        class="border-black flex flex-col mb-2"
      >
        <div>
          <figure @click="handleClick(photo)" class="cursor-pointer">
            <img
              class="w-full m-0"
              v-lazy="photo.url"
              :class="{
                'border-8 border-red-500': index == 0
              }"
            />
            <figcaption>
              {{ photo.title }}
            </figcaption>
          </figure>
          <div v-if="photo.colors" class="palette flex flex-row mt-1">
            <div
              class="flex-1 h-8"
              v-for="color in photo.colors"
              :key="color.rgb"
              :style="{ backgroundColor: color.rgb }"
            ></div>
          </div>
        </div>
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
      queryId: null,
      loading: false,
      method: "color"
    };
  },
  watch: {
    method: function(method) {
      this.callSearch();
    }
  },
  props: {},
  mounted() {
    // load initial images
    axios.get(`${server}/images`).then(response => {
      this.photos = response.data.data;
    });
  },
  methods: {
    handleClick: function(photo) {
      this.queryId = photo.id;
      this.callSearch();
    },
    callSearch: function() {
      this.$Progress.start();
      axios
        .get(`${server}/search`, {
          params: {
            q: this.queryId,
            method: this.method
          }
        })
        .then(response => {
          this.$Progress.finish();
          this.photos = response.data.data;

          // scroll to top
          window.scrollTo(0, 0);
        });
    }
  }
};
</script>

<style scoped>
.photos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-row-gap: 15px;
  grid-column-gap: 12px;
}
.unfocused {
  opacity: 0.3;
  transition: 0.2s all;
}
</style>
