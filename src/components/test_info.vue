<template>
  <div class="test_info">
    <el-row display="margin-top:10px">
      <el-input v-model="test_name" placeholder="test_name" style="display:inline-table; width: 8%; float:left"></el-input>
      <el-input v-model="test_type" placeholder="test_type" style="display:inline-table; width: 8%; float:left"></el-input>
      <el-input v-model="sub_id" placeholder="sub_id" style="display:inline-table; width: 8%; float:left"></el-input>
      <el-input v-model="device_type" placeholder="device_type" style="display:inline-table; width: 8%; float:left"></el-input>
      <el-input v-model="value_param" placeholder="value_param" style="display:inline-table; width: 8%; float:left"></el-input>
      <el-input v-model="seed" placeholder="seed" style="display:inline-table; width: 8%; float:left"></el-input>
      <el-input v-model="mae" placeholder="mae" style="display:inline-table; width: 8%; float:left"></el-input>
      <el-input v-model="mse" placeholder="mse" style="display:inline-table; width: 8%; float:left"></el-input>
      <el-input v-model="mae_threshold" placeholder="mae_threshold" style="display:inline-table; width: 8%; float:left"></el-input>
      <el-input v-model="mse_threshold" placeholder="mse_threshold" style="display:inline-table; width: 8%; float:left"></el-input>
      <el-input v-model="hardware_time" placeholder="hardware_time" style="display:inline-table; width: 8%; float:left"></el-input>
      <el-button type="primary" @click="add_test_info()" style="float:left; margin: 2px;">add</el-button>
    </el-row>
    <el-row>
      <el-table :data="test_info_list" style="width: 100%" border>
        <el-table-column prop="id" label="id" min-width="20">
          <template slot-scope="scope"> {{ scope.row.pk }} </template>
        </el-table-column>
        <el-table-column prop="test_name" label="test_name" min-width="80">
          <template slot-scope="scope"> {{ scope.row.fields.test_name }} </template>
        </el-table-column>
        <el-table-column prop="test_type" label="test_type" min-width="80">
          <template slot-scope="scope"> {{ scope.row.fields.test_type }} </template>
        </el-table-column>
        <el-table-column prop="sub_id" label="sub_id" min-width="80">
          <template slot-scope="scope"> {{ scope.row.fields.sub_id }} </template>
        </el-table-column>
        <el-table-column prop="device_type" label="device_type" min-width="80">
          <template slot-scope="scope"> {{ scope.row.fields.device_type }} </template>
        </el-table-column>
        <el-table-column prop="value_param" label="value_param" min-width="80">
          <template slot-scope="scope"> {{ scope.row.fields.value_param }} </template>
        </el-table-column>
        <el-table-column prop="seed" label="seed" min-width="80">
          <template slot-scope="scope"> {{ scope.row.fields.seed }} </template>
        </el-table-column>
        <el-table-column prop="mae" label="mae" min-width="80">
          <template slot-scope="scope"> {{ scope.row.fields.mae }} </template>
        </el-table-column>
        <el-table-column prop="mse" label="mse" min-width="80">
          <template slot-scope="scope"> {{ scope.row.fields.mse }} </template>
        </el-table-column>
        <el-table-column prop="mae_threshold" label="mae_threshold" min-width="80">
          <template slot-scope="scope"> {{ scope.row.fields.mae_threshold }} </template>
        </el-table-column>
        <el-table-column prop="mse_threshold" label="mse_threshold" min-width="80">
          <template slot-scope="scope"> {{ scope.row.fields.mse_threshold }} </template>
        </el-table-column>
        <el-table-column prop="hardware_time" label="hardware_time" min-width="80">
          <template slot-scope="scope"> {{ scope.row.fields.hardware_time }} </template>
        </el-table-column>
        <el-table-column prop="timestamp" label="timestamp" min-width="80">
          <template slot-scope="scope"> {{ scope.row.fields.timestamp }} </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'test_info',
    data () {
      return {
        // 文本框输入值
        test_name: '',
        test_type: '',
        sub_id: '',
        device_type: '',
        value_param: '',
        seed: '',
        mae: '',
        mse: '',
        mae_threshold: '',
        mse_threshold: '',
        hardware_time: '',
        // 返回值
        test_info_list: []
      }
    },
    mounted: function () {
      this.show_test_infos()
    },
    methods: {
      add_test_info () {
        var request_str = 'http://127.0.0.1:8000/api/add_test_info?'
          + "test_name=" + this.test_name + "&"
          + "test_type=" + this.test_type + "&"
          + "sub_id=" + this.sub_id + "&"
          + "device_type=" + this.device_type + "&"
          + "value_param=" + this.value_param + "&"
          + "seed=" + this.seed + "&"
          + "mae=" + this.mae + "&"
          + "mse=" + this.mse + "&"
          + "mae_threshold="+this.mae_threshold + "&"
          + "mse_threshold="+this.mse_threshold + "&"
          + "hardware_time="+this.hardware_time

        this.$http.get('http://127.0.0.1:8000/api/add_test_info?'
          + "test_name=" + this.test_name + "&"
          + "test_type=" + this.test_type + "&"
          + "sub_id=" + this.sub_id + "&"
          + "device_type=" + this.device_type + "&"
          + "value_param=" + this.value_param + "&"
          + "seed=" + this.seed + "&"
          + "mae=" + this.mae + "&"
          + "mse=" + this.mse + "&"
          + "mae_threshold="+this.mae_threshold + "&"
          + "mse_threshold="+this.mse_threshold + "&"
          + "hardware_time="+this.hardware_time
        )
          .then((response) => {
            var res = JSON.parse(response.bodyText)
            if (res.error_num === 0) {
              this.show_test_infos()
            } else {
              this.$message.error('新增test失败，请重试')
              console.log(res['msg'])
              console.log(request_str)
            }
          })
      },
      show_test_infos () {
        this.$http.get('http://127.0.0.1:8000/api/show_test_infos')
          .then((response) => {
            var res = JSON.parse(response.bodyText)
            console.log(res)
            if (res.error_num === 0) {
              this.test_info_list = res['list']
            } else {
              this.$message.error('查询test失败')
              console.log(res['msg'])
            }
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>



<!--http://127.0.0.1:8000/api/add_test_info?test_name=1&test_type=1$sub_id=1$device_type=1$value_param=1$seed=1$mae=1$mse=1$mae_threshold=1$mse_threshold=1$hardware_time=1-->
