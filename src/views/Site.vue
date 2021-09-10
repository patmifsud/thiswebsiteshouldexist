<template>
  <div
    :class="
      `
    ${pageData.seedFont} 
    ${pageData.seedColor} 
    ${pageData.seedMisc} 
    ${pageData.siteAdjective} 
    ${pageData.siteType} 
  `
    "
  >
    <el-menu mode="horizontal" class="inner" style="padding:0;">
      <el-menu-item index="1" style="padding-right:0;" @click="goToHome()">
        <i class="el-icon-back"></i> &nbsp;
        <el-divider direction="vertical"></el-divider>
      </el-menu-item>
      <el-menu-item
        index="2"
        style="text-transform:capitalize; color:var(--clr1l);"
        target="/"
        >{{ pageData.siteTopic }} &nbsp; &nbsp;
      </el-menu-item>
    </el-menu>

    <!-- NEW LAYOUT -->
    <site-header
      :heading="pageData.siteTopic"
      :paragraph="pageData.gptTagline"
      :image="pageData.images[0]"
      :layout="pageData.seedLayout"
      :gptLoading="pageData.loadingGpt"
    />

    <site-main
      :heading="pageData.siteTopic"
      :paragraph1="pageData.gptIntro"
      :paragraph2="pageData.gptMain"
      :image="pageData.images[1]"
      :ad="null"
      :layout="pageData.seedLayout"
      :gptLoading="pageData.loadingGpt"
    />

    <site-quote
      :paragraph="pageData.gptQuote"
      :gptLoading="pageData.loadingGpt"
      :layout="pageData.seedLayout"
      :ctaButtonSeed="pageData.siteAdjective"
    />

    <site-cta
      :cta="pageData.gptCta"
      :paragraph="pageData.gptTagline"
      :gptLoading="pageData.loadingGpt"
      :layout="pageData.seedLayout"
      :ctaButtonSeed="pageData.siteAdjective"
      :url="pageData.url"

    />



    <site-footer />

    <!-- 
    pageData.gptCta
    pageData.gptIntro
    pageData.gptMain
    pageData.gptQuote
    pageData.gptTagline
    pageData.loadingGpt
    pageData.seedLayout
    pageData.siteAdjective
    pageData.siteType
    pageData.siteTopic -->
    <!-- 
    <div class="temp">
      <div v-if="Object.keys(pageData).length < 2">
        <el-skeleton animated />
      </div>
      <div v-else>
        <h1>{{ pageData.siteTopic }}</h1>

        <div v-if="pageData.loadingGpt">
          <el-skeleton animated />
        </div>
        <div v-else>
          <h4>{{ pageData.gptTagline }}</h4>

          <el-divider></el-divider>

          <p>{{ pageData.gptIntro }}</p>
          <img v-bind:src="pageData.images[0]" />

          <p>{{ pageData.gptMain }}</p>

          <img v-bind:src="pageData.images[1]" />

          <el-divider></el-divider>

          <h4>{{ pageData.gptQuote }}</h4>

          <el-card>
            <p>{{ pageData.gptCta }}</p>

            <el-button type="primary">Learn more</el-button>
          </el-card>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { db } from "../firebase";
import SiteQuote from "../components/sites/SiteQuote.vue";
import SiteHeader from "../components/sites/SiteHeader.vue";
import SiteMain from "../components/sites/SiteMain.vue";
import SiteCta from "../components/sites/SiteCta.vue";
import SiteFooter from "../components/sites/SiteFooter.vue";

//  const parameters = this.$route.params.siteId
//  console.log(parameters);

export default {
  data() {
    return {
      siteId: this.$route.params.siteId,
      pageData: {
        images: [" ", " "],
      },
    };
  },
  watch: {
    pageData: function() {
      if (Object.keys(this.pageData).length > 2) {
        if (this.pageData.loadingGpt === true) {
          this.openGenerateNoti();
        }
      }
    },
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
        title: "Willing your questionable website idea into existence",
        message: "It should appear soon....",
      });
    },
    goToHome() {
      this.$router.push("/");
    },
  },
  name: "Site",
  components: {
    SiteHeader,
    SiteMain,
    SiteCta,
    SiteFooter,
    SiteQuote
  },
  props: {
    image: String,
    heading: String,
    paragraph: String,
    gptMain: String,
    gptQuote: String,
    gptTagline: String,
    loadingGpt: Boolean,
    seedLayout: String,
    seedMisc: String,
    siteAdjective: String,
    siteType: String,
    siteTopic: String,
    url: String,
  },
};
</script>
