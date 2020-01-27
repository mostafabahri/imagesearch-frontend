<template>
  <div class="mx-5">
    <h1 class="mb-3 text-lg text-gray-800 ">Image Gallery</h1>
    <div v-if="photos" class="photos mx-auto w-4/5 ">
      <div v-for="photo in photos" :key="photo.id">
        <figure>
          <img
            class="w-full m-0"
            :src="photo.thumbnailUrl"
            @click="handleClick(photo)"
          />
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
      photos: null
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
      alert(`clicked ${photo.title}`);
    }
  }
};
</script>

<style scoped>
.photos {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 8px;
}
</style>
