<template>
  <div class="container quote">
    <div class="inner">
      <el-skeleton :loading="gptLoading" animated>
        <template slot="template">
          <el-skeleton-item />
        </template>

        <template>
          <div class="center">
            <i class="el-icon-chat-square"></i>

            <h2 class="topline">
              {{ this.paragraph }}
            </h2>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<style>

.quote i{
   margin-bottom:2rem;
}
.quote i::before {
font-size: 34px;
color:var(--clr1ll);
}


.quote .inner {
  padding: var(--sp2) var(--sp3);
  justify-content: center;
  
}

.quote h2 {
  margin-bottom: var(--sp2);
   color:var(--clr1);
   font-weight: 400;
   line-height: 1.6;
}

.center {
  text-align: center;
}

</style>

<script>
export default {
  name: "quote",
  props: ["cta", "paragraph", "layout", "gptLoading"],
};
</script>
