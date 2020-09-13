<template>
  <div class="publish">
    <el-breadcrumb separator-class="el-icon-right">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :model="post" label-width="80px">
        <el-form-item label="文章标题">
          <el-input placeholder="请输入文章标题" v-model="post.title"></el-input>
        </el-form-item>
        <el-form-item label="文章内容">
          <quill-editor v-model="post.content"></quill-editor>
        </el-form-item>
        <el-form-item label="栏目">
          <el-checkbox-group v-model="post.categories">
            <el-checkbox
              :label="item.id"
              name="type"
              v-for="item in tabList"
              :key="item.id"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            multiple
            action="/api/upload"
            list-type="picture-card"
            :headers="headers"
            :on-success="success"
            :on-remove="remove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="post.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publish">发布</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        content: "",
        categories: [],
        cover: [],
        type: 1,
      },
      tabList: [],
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
  },
  created() {
    this.getTabList();
  },
  methods: {
    async getTabList() {
      const res = await this.$axios.get("/category");
      const { statusCode, data } = res;
      if (statusCode === 200) {
        this.tabList = data.filter(
          (item) => item.name !== "关注" && item.id !== "头条"
        );
      }
    },
    success(res) {
      console.log("res", res);
      const { statusCode, data } = res;
      if (statusCode === 200) {
        this.post.cover.push(data);
      }
    },
    parseCategories(arr) {
      return arr.map((item) => {
        return {
          id: item,
        };
      });
    },
    async publish() {
      const res = await this.$axios.post("/post", {
        ...this.post,
        categories: this.parseCategories(this.post.categories),
      });
    },
    remove(file) {
      this.post.cover = this.post.cover.filter(
        (item) => item.id != file.response.data.id
      );
    },
  },
};
</script>

<style scoped>
/*
  /deep/
  ::v-deep
  >>>
*/
.el-card {
  margin-top: 20px;
}
.el-card >>> .ql-editor {
  height: 200px;
}
</style>