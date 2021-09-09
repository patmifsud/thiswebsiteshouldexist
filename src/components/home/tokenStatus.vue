<template>
  <el-popover
    placement="top-start"
    title="Why is there a limit?"
    width="200"
    trigger="hover"
    content="Becuase the website is expensive to run. Tokens reset every 24 hours."
  >
    <el-button slot="reference" type="text" size="medium" style="white-space: wrap" round>
      <i class="el-icon-odometer" /> &nbsp;
      {{ this.tokens }} more sites can be created today.
    </el-button>
  </el-popover>
</template>

<style >
  button{
    color:var(--clr1ll);
    opacity: 0.8;
  }


.el-button span{
  white-space: normal!important;
}


</style>

<script>
  export default {
    props: ['tokens']
  }
</script>
