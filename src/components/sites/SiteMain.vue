<template>
  <div class="container">
    <div class="inner">
      <div class="lhs">
        <el-skeleton :loading="gptLoading" animated>
          <template slot="template">
            <el-skeleton-item />
          </template>

          <template>
            <p class="uppercase">Why {{
               (this.heading.length > 15) ? `was this started?` : `${this.heading}?` }}</p>
            <p class="empth">{{ this.paragraph1 }}</p>
            <p>{{ this.paragraph2 }}</p>
          </template>
        </el-skeleton>
      </div>

      <div class="rhs">
        <PageImage :imageLoaded="this.image.length < 2" :image="image" />
      </div>
    </div>
  </div>
</template>

<style scopped>

.container{
        border-bottom:solid 1px var(--clr3);
}

p{
  font-size: 1.3rem;
  max-width: 70vw;
  line-height:1.4;
margin-right: var(--sp4);


}
p.empth {
  color:var(--clr1);
    margin-bottom: var(--sp2);
}

.uppercase{
   margin-bottom:var(--sp2);
   color:var(--clr1ll);
}

.inner{
   display:flex;
}

</style>

<script>
import PageImage from "./elements/PageImage.vue";

export default {
  name: "mainsite",
  props: ["heading", "paragraph1", "paragraph2", "image", "layout", "gptLoading"],
  components: {
    PageImage,
  },
};
</script>
