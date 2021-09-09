<template>
  <div class="container cta">
    <div class="inner">
      <el-skeleton :loading="gptLoading" animated>
        <template slot="template">
          <el-skeleton-item />
        </template>

        <template>
          <div class="center">
            <h2 class="topline">
              {{ this.paragraph }}
            </h2>
            <h1>{{ this.cta }}</h1>

            <el-button>Learn more</el-button>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<style>
.container.cta {
  background-color: var(--clr3);
}

.cta .inner {
  padding: var(--sp2) var(--sp3);
  justify-content: center;
}

.cta h2.topline {
  color: var(--clr1ll);
  margin-bottom: var(--sp2);
}

.cta h1 {
  font-size:2.4em;
  max-width: 700px;
  margin:0 auto var(--sp6) auto;
}

.center {
  text-align: center;
}

.el-button {
  margin-bottom: var(--sp3);
  width:fit-content;
  margin:0 auto;
}
</style>

<script>
export default {
  name: "cta",
  props: ["cta", "paragraph", "layout", "gptLoading"],
};
</script>
