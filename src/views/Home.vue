<template>
  <div class="container home">
    <div class="inner">
      <div class="lhs">
        <h1>This website should exist</h1>
        <p>...a dumb GPT-3 demo</p>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path class="st0" d="M15.8,64.5c9.1,6.6,20.9,8.4,31.6,5.2C58,66.5,67.3,59,73.8,50.3c3.3-4.3,5.9-9,8-14c-0.3,4.1-0.1,8.2,0.7,12.3  c0.1,0.6,0.5,2,1.4,1.6c0.8-0.4,0.9-2.1,0.8-2.8c-0.9-4.7-1-9.4-0.2-14.1c0-0.1,0-0.2,0-0.3c1-1,0.4-5.3-1.2-3.9  c-2.2,2-4.6,3.8-7.2,5.3c-1.3,0.7-2.7,1.4-4,2c-1.4,0.6-2.8,1.2-4.3,1c-0.9-0.1-1.1,1.7-1.1,2.3c0,0.7,0.2,2.2,1.1,2.3  c1.6,0.2,3.2-0.4,4.7-1c1.5-0.6,2.9-1.3,4.3-2.1c0.4-0.2,0.9-0.5,1.3-0.8c-3.6,7.1-8.8,13.5-14.9,18.4c-4.3,3.5-9,6.4-14.2,8.3  c-5.1,1.9-10.6,2.5-16,1.9c-5.9-0.7-11.6-2.9-16.5-6.4c-0.8-0.6-1.3,1.1-1.4,1.6C14.9,62.6,15,63.9,15.8,64.5z"/></svg>
      </div>
       <div class="rhs">
      <siteForm />
    </div>
    </div>
   
  </div>
</template>

<style scoped>
div {
  margin-bottom: var(--sp5);
}
.inner.flexcol {
  flex-direction: column;
}

.home .lhs{
margin-bottom:0;
padding-bottom:0;
margin-right:var(--sp1);
}

.home .rhs{
justify-content: top;
padding-top:var(--sp3);
}

.home h1{
  font-size:4.5rem;
  margin-bottom:1.3rem;
}
svg{
  width: 184px;
  transform: rotate(
30deg);
    opacity: 0.5;
    margin-top: -2rem;
    margin-left: auto;
    margin-right: 5rem;
}
@media only screen and (max-width: 640px) {
  svg{display:none;}
}
</style>

<script>
import siteForm from "../components/siteForm.vue";

export default {
  name: "Home",

  components: {
    siteForm,
  },
};
</script>
