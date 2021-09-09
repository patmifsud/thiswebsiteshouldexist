<template>
  <div class="container">
    <div class="inner">
      <div class="lhs">
        <el-tag class="hideunless blog" size="small" type="info"
          >BLOG POST</el-tag
        >

        <h1>{{ this.heading }}</h1>

        <el-skeleton :loading="gptLoading" animated>
          <template slot="template">
            <el-skeleton-item />
          </template>

          <template>
            <h3>{{ this.paragraph }}</h3>
          </template>
        </el-skeleton>
      </div>

      <div class="rhs">
        <PageImage :imageLoaded="this.image.length < 2" :image="image" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container{
        border-bottom:solid 1px var(--clr3);
}
.inner{
     display: flex;
     padding:var(--sp3) 0;
}

h1 {
  margin-bottom: var(--sp4);
  text-transform: capitalize;
}

.lhs {
  padding-bottom: var(--sp3);
}

.el-tag {
  width: fit-content;
  font-size: 10px;
  margin-bottom: 12px;
}


</style>

<script>
import PageImage from "./elements/PageImage.vue";

export default {
  name: "headersite",

  props: ["heading", "paragraph", "image", "layout", "gptLoading"],
  components: {
    PageImage,
  },
};
</script>
