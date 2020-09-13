  <template>
  <div class="list">
    <el-breadcrumb separator-class="el-icon-video-camera">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="list" style="width:100%">
        <el-table-column align="center" type="index" label="序号" width="100" :index="indexMethod"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="user.nickname" label="作者"></el-table-column>
        <el-table-column label="创建时间">
          <template v-slot="scope">{{scope.row.create_date|time}}</template>
        </el-table-column>
        <el-table-column prop="cover[0].url" label="封面">
          <template v-slot="scope">
            <img :src="$url(scope.row.cover[0].url)" alt />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary">编辑</el-button>
          <el-button>删除</el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,sizes,prev, pager, next,jumper"
        :page-sizes="[5,10,15,20]"
        :total="total"
        :page-size="pageSize"
        @current-change="currentChange"
        @size-change="sizeChange"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 4,
      total: 0,
    };
  },
  created() {
    this.getPostList();
  },
  methods: {
    async getPostList() {
      const res = await this.$axios.get("/post", {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      });
      console.log(res);
      const { statusCode, data, total } = res;
      if (statusCode == 200) {
        this.list = data;
        this.total = total;
        console.log(this.list);
      }
    },
    currentChange(value) {
      this.pageIndex = value;
      this.getPostList();
    },
    sizeChange(value) {
      this.pageSize = value;
      this.getPostList();
    },
    indexMethod(index) {
      return index + 1 + (this.pageIndex - 1) * this.pageSize;
    },
  },
};
</script>

<style lang="scss">
.el-card {
  margin-top: 20px;
  img {
    width: 200px;
    height: 120px;
    object-fit: cover;
  }
}
</style>