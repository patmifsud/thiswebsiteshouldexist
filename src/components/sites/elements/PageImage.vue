<template>
  <div>
    <el-skeleton v-if="this.image.length < 2" animated>
      <template slot="template">
        <el-skeleton-item
          style=" width:100%; "
          variant="image"
        />
      </template>
    </el-skeleton>

    <div
      v-if="this.image.length > 2"
      v-bind:style="{ backgroundImage: 'url(' + this.image + ')' }"
      style="height:300px; border-radius:var(--borderRadius); width:100%; background-color:var(--clr3);"
      class="image"
      alt="this.paragraph"
    > </div>
  </div>
</template>

<script>
export default {
  props: ["image", "imageLoaded"],
};
</script>
