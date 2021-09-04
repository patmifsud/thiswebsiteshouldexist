<template>
  <el-container :class="formState">
    <el-form  :inline="true" :model="formData">

      <el-form-item label="Create a ">
        <el-select v-model="formData.siteAdjective">
          <el-option label="Neutral" value="Neutral"></el-option>
        </el-select>

        <el-select v-model="formData.siteType">
          <el-option label="Website" value="Website"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="about">
        <el-input
          v-model="formData.siteTopic"
          :placeholder="formData.placeholder"
          :rules="{ required: true, message: 'Enter an idea for your website' }">
         </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">Create it</el-button>
      </el-form-item>

    </el-form>

  </el-container>
</template>


<script>
   import { db } from '../firebase'

   const placeholders = [
      "eg. Cigarettes for dogs",
      "eg. Proof that toenails are highly nutritious",
      "eg. Buy used toothbrushes",
      "eg. Learn to program in latin",
   ];

   const dbSitePath = 'sites/ww1'
   // const dbServicePath = 'service'

   export default{
      data() {
         return {
            formState: 'ready', //ready, loading, success
            formData: {
               siteAdjective: "Neutral",
               siteType: "Website",
               siteTopic: "",
            },
            firebaseData: null,
            placeholder:
               placeholders[Math.floor(Math.random() * placeholders.length)],
         };
      },
      firestore(){
         return{firebaseData: db.doc(dbSitePath),};
      },

      methods: {

         async checkIfSiteExists(sitePath) {
            console.log("Checking if this site exists");
            const doc = await db.doc(sitePath).get();
               
            if (doc.exists) { return true
            } else { console.log("site doesn't already exist"); return false }
            
         },

         async handleSubmit() {
               const sitePath = `sites/${this.formData.siteTopic}`
               this.formState = 'loading'

            try {
               // TODO check credit amount, if too low throw error
               if (await this.checkIfSiteExists(sitePath)){
                  throw 'This site already exists';
               } 

               console.log("Creating a new site...")

               db.doc(sitePath).set(this.formData).then(() => {
                  console.log('success');
                  this.state = 'success';

                  // navigate to building page
               });

            } catch (error){
               this.errorMessage = JSON.stringify(error)
               this.state = 'ready';
               console.error(JSON.stringify(error));
            }
         },
   },
}
</script>
