<template>
  <el-popover
    placement="top-start"
    title="Why is there a limit?"
    width="200"
    trigger="hover"
    content="Becuase the website is expensive to run. Tokens reset every 24 hours."
  >
    <el-button slot="reference" size="medium" round>
      <i class="el-icon-odometer" />
      {{ this.tokens }} more sites can be created today.
    </el-button>
  </el-popover>
</template>

<script>
  export default {
    props: ['tokens']
  }
</script>
