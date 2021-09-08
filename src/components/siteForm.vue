<template>
  <div>
    <div v-if="limiterData.tokens > 1">
      <el-row>
        <token-status :tokens="limiterData.tokens" />
      </el-row>

      <el-container :class="formState">
        <el-form :inline="true" :model="formData">
          <el-form-item label="Create a ">
            <el-select v-model="formData.siteAdjective">
              <el-option label="informative" value="informative"></el-option>
              <el-option label="sales" value="sales"></el-option>
              <el-option label="serious" value="serious"></el-option>
              <el-option label="angry" value="angry"></el-option>
              <el-option label="sarcastic" value="sarcastic"></el-option>
              <el-option label="sensual" value="sensual"></el-option>
              <el-option label="insane" value="insane"></el-option>
            </el-select>

            <el-select v-model="formData.siteType">
              <el-option label="website" value="website"></el-option>
              <el-option label="blog" value="blog"></el-option>
              <el-option label="sales page" value="sales-page"></el-option>

            </el-select>
          </el-form-item>

          <el-form-item label="about">
            <el-input
              v-model="formData.siteTopic"
              :placeholder="formData.placeholder"
              :rules="{
                required: true,
                message: 'Enter an idea for your website',
              }"
            >
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSubmit"
              >Create it</el-button
            >
          </el-form-item>
        </el-form>
      </el-container>
    </div>
    <div v-else-if="limiterData.tokens < 1">
      <no-tokens-msg />
    </div>
    <div v-else>
      <el-button :loading="true" round>Loading</el-button>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import tokenStatus from './home/tokenStatus.vue'
import noTokensMsg from './home/noTokensMsg.vue';
var slugify = require('slugify')


const placeholders = [
  "eg. Cigarettes for dogs",
  "eg. Proof that toenails are highly nutritious",
  "eg. Buy used toothbrushes",
  "eg. Learn to program in latin",
];

// const dbServicePath = 'service'

export default {
  data() {
    return {
      formState: "ready", //ready, loading, success
      formData: {
        siteAdjective: "Neutral",
        siteType: "Website",
        siteTopic: "",
        seedFont: `seedFont${Math.floor(Math.random() * 6)}`,
        seedLayout: `seedLayout${Math.floor(Math.random() * 6)}`,
        seedColor: `seedColor${Math.floor(Math.random() * 6)}`,
        seedMisc:`seedMisc${Math.floor(Math.random() * 6)}`,
        url: '',
        loadingGpt: true,
      },
      limiterData: 'loading',
      placeholder:
        placeholders[Math.floor(Math.random() * placeholders.length)],
    };
  },
  firestore() {
    return { limiterData: db.collection("backend").doc("limiter") };
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

    async handleSubmit() {
      const siteUrl = slugify(
        this.formData.siteTopic, 
        {lower: true, strict: true}
      );
      this.formData.url = siteUrl;
      const sitePath = `sites/${siteUrl}`;
      this.formState = "loading";

      try {
        // TODO check credit amount, if too low throw error
        if (await this.checkIfSiteExists(sitePath)) {
          throw "This site already exists";
        } else {
          console.log(`Creating a new site: ${siteUrl}`);

          db.doc(sitePath)
            .set(this.formData)
            .then(() => {
              console.log("success");
              this.state = "success";
              window.location.href = `site/${siteUrl}`;
            });
        }
      } catch (error) {
        this.errorMessage = JSON.stringify(error);
        this.state = "ready";
        console.error(JSON.stringify(error));
      }
    },
  },
  components: {
    noTokensMsg,
    tokenStatus
  },
  props: {
   tokens: String
  }
};
</script>
