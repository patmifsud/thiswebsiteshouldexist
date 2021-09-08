<template>
  <div>
    <div class="temp">
      <div v-if="Object.keys(pageData).length < 2">
        Loading...
      </div>
      <div v-else>
        <h1>{{ pageData.siteTopic }}</h1>

        <div v-if="pageData.loadingGpt">
          <el-skeleton />
        </div>
        <div v-else>
          <h4>{{ pageData.gptTagline }}</h4>

          <el-divider></el-divider>

          <p>{{ pageData.gptIntro }}</p>
          <p>{{ pageData.gptMain }}</p>
          
          <el-divider></el-divider>

          <h4>{{ pageData.gptQuote }}</h4>

          <el-card>
            <p>{{ pageData.gptCta }}</p>

            <el-button type="primary"
              >Learn more</el-button
            >
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";

//  const parameters = this.$route.params.siteId
//  console.log(parameters);

export default {
  data() {
    return {
      siteId: this.$route.params.siteId,
      //Object.keys(pageData).length
      pageData: {},
    };
  },
  watch: {
     pageData: function(){
        if (Object.keys(this.pageData).length > 2){
           if (this.pageData.loadingGpt === true){
               this.openGenerateNoti();
           }
        }
     }
   },
  firestore() {
    return { pageData: db.collection("sites").doc(this.siteId) };
  },
  methods: {
    async checkIfSiteExists(sitePath) {
      console.log("Checking if this site exists");
      const doc = await db.doc(sitePath).get();

      if (doc.exists) {
        return true;
      } else {
        console.log("site doesn't already exist");
        return false;
      }
    },
   openGenerateNoti() {
      this.$notify.info({
         title: 'Willing your questionable website idea into existence',
         message: "It should appear soon...."
      });
   },
  },
  name: "Site",
  components: {},
};
</script>
