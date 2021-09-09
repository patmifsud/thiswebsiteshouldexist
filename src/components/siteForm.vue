<template>
  <div class="inner formBox">
    <div v-if="limiterData.tokens > 0">
      <div class="elementRow top">
        <token-status :tokens="limiterData.tokens" />
      </div>

      <div class="elementRow bottom">
        <el-container :class="formState">
          <el-form :model="formData">
            <label>Create a</label>
            <el-form-item prop="adjective">
              <el-select v-model="formData.siteAdjective">
                <el-option
                  label="🤔   informative"
                  value="informative"
                ></el-option>
                <el-option label="😡  angry" value="angry"></el-option>
                <el-option label="🧐  serious" value="serious"></el-option>
                <el-option label="😉  sarcastic" value="sarcastic"></el-option>
                <el-option label="😙   sensual" value="sensual"></el-option>
                <el-option
                  label="😠   malicious"
                  value="very malicious"
                ></el-option>
                <el-option label="😜   humorous" value="humorous"></el-option>
                <el-option
                  label="🥺   annoyingly cutesy"
                  value="annoyingly cutesy"
                ></el-option>
                <el-option
                  label="🤬   controversial"
                  value="very controversial"
                ></el-option>
              </el-select>

              <el-select v-model="formData.siteType" prop="type">
                <el-option label="website" value="website"></el-option>
                <el-option label="blog" value="blog"></el-option>
                <el-option label="sales page" value="sales-page"></el-option>
              </el-select>
            </el-form-item>
            <label>About:</label>

            <el-form-item prop="topic" >
              <el-input
                v-model="formData.siteTopic"
                :placeholder="placeholder"
                :rules="{
                  required: true,
                  message: 'Enter an idea for your website',
                }"
              >
              </el-input>
            </el-form-item>
            <br />
            <el-form-item class="buttonContainer">
              <div class="loadingButton" v-if="formState === 'loading'">
                <i class="el-icon-loading"></i>
              </div>
              <div v-else-if="formData.siteTopic.length < 1">
                <el-button class="novelty disabled"  >Create it</el-button>
              </div>
              <div v-else>
                <el-button class="novelty" @click="handleSubmit"
                  >Create it</el-button
                >
              </div>
            </el-form-item>
          </el-form>
        </el-container>
      </div>
    </div>
    <div v-else-if="limiterData.tokens < 1">
      <no-tokens-msg />
    </div>
    <div class="loadingForm" v-else>
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>
<style scoped>
.loadingForm {
  display: flex;
  max-width: 400px;
  width: 100%;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.loadingForm i::before {
  font-size: 60px;
  opacity: 0.5;
}
.loadingButton {
  text-align: center;
  width: 100%;
}

.formBox {
  border: solid 1px #eeeeee;
  /* padding: 2em; */
  min-height: 412px;

  border-radius: 0.3em;
}
.formBox .top,
.formBox .bottom {
  display: flex;
  justify-content: center;
}
.formBox label {
  margin-bottom: 0.5em;
  display: block;
}



input {
  max-width: 100% !important;
}

.formBox .top {
  border-bottom: solid 1px #eeeeee;
  padding: 1em 2em 1em 2em;
}

.formBox .bottom {
  padding: 1.5em 2em;
}

</style>
<script>
import { db } from "../firebase";
import tokenStatus from "./home/tokenStatus.vue";
import noTokensMsg from "./home/noTokensMsg.vue";
var slugify = require("slugify");

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
        siteAdjective: "informative",
        siteType: "website",
        siteTopic: "",
        seedFont: `seedFont${Math.floor(Math.random() * 6)}`,
        seedLayout: `seedLayout${Math.floor(Math.random() * 6)}`,
        seedColor: `seedColor${Math.floor(Math.random() * 6)}`,
        seedMisc: `seedMisc${Math.floor(Math.random() * 6)}`,
        gptTagline: " ",
        gptIntro: " ",
        gptMain: " ",
        gptCta: " ",
        gptQuote: " ",
        url: " ",
        loadingGpt: true,
        images: [],
      },
      limiterData: "loading",
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
      const siteUrl = slugify(this.formData.siteTopic, {
        lower: true,
        strict: true,
      });
      this.formData.url = siteUrl;
      const sitePath = `sites/${siteUrl}`;
      this.formState = "loading";

      try {
        // TODO check credit amount, if too low throw error
        if (await this.checkIfSiteExists(sitePath)) {
          this.formState = "ready";
              this.$message({
            dangerouslyUseHTMLString: true,
            showClose: true,
            type: 'warning',
            message: `<strong>This site already exists. Try another idea, or <a href="/site/${siteUrl}">visit the site here</a></strong>`
            });
          throw "This site already exists";
        } else {
          console.log(`Creating a new site: ${siteUrl}`);

          db.doc(sitePath)
            .set(this.formData)
            .then(() => {
              console.log("success");
              this.state = "success";
              this.$router.push(`site/${siteUrl}`);
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
    tokenStatus,
  },
  props: {
    tokens: String,
  },
};
</script>
