
<template>
  <div>
    <el-container>
        <span>TWSE</span>
        <el-divider direction="vertical"></el-divider>
    </el-container>      
    <el-divider></el-divider>

    <el-row>
      <h1>This website should exist</h1> 
      <p>a dumb GPT-3 demo</p>
    </el-row>

    <siteForm />


  </div>
</template>




<script>
import siteForm from '../components/siteForm.vue'

export default {
  name: "Home",
  
  components: {
    siteForm
  }
};
</script>
