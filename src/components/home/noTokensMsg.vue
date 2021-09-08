<template>
  <el-row>
    <el-col :sm="12" :lg="6">
      <el-card el-card shadow="never">
        <el-result
          icon="warning"
          title="No more websites can be created today"
          subTitle="Check back in a few hours"
        >
          <template slot="extra">
            <el-row>
              <el-popover
                placement="top"
                title="Why limit?"
                width="200"
                trigger="hover"
                content="Becuase the website is expensive to run. Tokens reset every 24 hours."
              >
                <el-button slot="reference" type="primary" size="medium">
                  Why?
                </el-button>
              </el-popover>
            </el-row>
          </template>
        </el-result>
      </el-card>
    </el-col>
  </el-row>
</template>
