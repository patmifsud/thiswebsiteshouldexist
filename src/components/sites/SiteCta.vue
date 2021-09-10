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

            <el-button v-on:click="handleCtaClick">Learn more</el-button>
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
  font-size: 2.4em;
  max-width: 700px;
  margin: 0 auto var(--sp6) auto;
}

.center {
  text-align: center;
}

.el-button {
  margin-bottom: var(--sp3);
  width: fit-content;
  margin: 0 auto;
}

.alertThing{
  padding:10px;
}

.alertThing *{
margin-bottom:40px;
max-width: 80%;
}

.alertThing code{
margin-top:20px;
margin-bottom:10px;
display: block;
padding: 5px 0;
border-bottom: 1px solid rgb(203, 203, 255);
  -webkit-user-select: all;  /* Chrome 49+ */
  -moz-user-select: all;     /* Firefox 43+ */
  -ms-user-select: all;      /* No support yet */
  user-select: all; 
}

.el-button--small{
  display:none;
}
</style>

<script>
export default {
  name: "cta",
  props: ["cta", "paragraph", "layout", "gptLoading", "url"],
  methods: {
    handleCtaClick() {
      this.$alert(`<div class="alertThing"><h2>This is a fake website made by a Robot.</h2> Want to make your own? <a  href="/"> Try it out</a> <br/><br/> You can also share this site using the following link: <br/> <br/> <code>https://www.thiswebsiteshouldexist.com/site/${this.url}</code></div>` , '', {
          dangerouslyUseHTMLString: true
        });
    }
  },
};
</script>
