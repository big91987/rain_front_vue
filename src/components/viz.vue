<template>
  <div class="viz">
    <el-row display="margin-top:10px">
      <el-input v-model="test_name" placeholder="test_name" style="display:inline-table; width: 8%; float:left"></el-input>
      <el-input v-model="test_type" placeholder="test_type" style="display:inline-table; width: 8%; float:left"></el-input>
      <el-input v-model="sub_id" placeholder="sub_id" style="display:inline-table; width: 8%; float:left"></el-input>
      <el-input v-model="device_type" placeholder="device_type" style="display:inline-table; width: 8%; float:left"></el-input>
      <el-input v-model="viz_property" placeholder="viz_property" style="display:inline-table; width: 8%; float:left"></el-input>
      <el-button type="primary" @click="calculatePath()" style="float:left; margin: 2px;">check</el-button>
    </el-row>
    <!--el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="text">文字按钮</el-button-->

    <svg width="500" height="270">
      <g style="transform: translate(0, 10px)">
        <path :d="line" />
      </g>
    </svg>
  </div>
</template>
<script>
  import * as d3 from 'd3';
  //import * as d3 from '../js/d3.js';
  export default {
    name: 'vue-line-chart',
    data() {
      return {
        //search: ['conv_op_test','fast', '0','A5'],
        data: [99, 71, 78, 25, 36, 92, 33, 11, 22, 19, 87, 112, 23, 23, 2, -1, 77],
        // query_x: [],
        // query_y: [],
        // mae: [],
        // mse: [],
        // hardware_time:[],
        // viz_perproty: '',

        // 文本框输入值
        test_name: '',
        test_type: '',
        sub_id: '',
        device_type: '',
        viz_property: '',

        // 查询sql返回值
        ret: [],
        line: '',
      };
    },
    // 预先加载的app
    //mounted() {
    //  this.calculatePath();
    //},
    methods: {
      // 从ret里绑定数值
      getScales() {
        const x = d3.scaleTime().range([0, 430]);
        const y = d3.scaleLinear().range([210, 0]);
        d3.axisLeft().scale(x);
        d3.axisBottom().scale(y);

        var data = [];
        var r;

        console.log('reeeet =========>'+ JSON.stringify(this.ret));

        //for (r in this.ret) {
          //console.log('r ============>' + JSON.stringify(r));
          //console.log('r.fileds =====>' + JSON.stringify(r.fileds));
          //console.log('r.fileds.mse =====>' +r.fileds.mse);
          //data.append(r['fields']['mse'])
          //data.push(1)}
        //}


        //for (var i = 0; i < this.ret.length; i++) {
        //  // this.ret[i]
        //  console.log('r ============>' + JSON.stringify(this.ret[i]));
        //  console.log('fields ============>' + JSON.stringify(this.ret[i]['fields']));
        //  console.log('mse ============>' + JSON.stringify(this.ret[i]['fields']['mse']));
        //}

        data  = this.ret.map(o => {
          console.log('o ==== > ' + o)
          return o['fields'][this.viz_property]
        })

        console.log('data =========>' + data)
        // var timpstamp = this.ret['timestamp']
        // x.domain(d3.extent(this.data, (d, i) => i));
        // y.domain([0, d3.max(this.data, d => d)]);
        x.domain(d3.extent(data, (d, i) => i));
        y.domain([0, d3.max(data, d => d)]);
        return { x, y };
      },
      calculatePath() {
        this.query_test_info()
        // console.log(request_str)
        const scale = this.getScales();
        const path = d3.line()
          .x((d, i) => scale.x(i))
          .y(d => scale.y(d));
        this.line = path(this.data);
      },
      // 查询结果传出到ret里
      query_test_info () {
        var request_str = 'http://127.0.0.1:8000/api/query_test_info?'
          + "test_name=" + this.test_name + "&"
          + "test_type=" + this.test_type + "&"
          + "sub_id=" + this.sub_id + "&"
          + "device_type=" + this.device_type + "&"

        this.$http.get('http://127.0.0.1:8000/api/query_test_info?'
          + "test_name=" + this.test_name + "&"
          + "test_type=" + this.test_type + "&"
          + "sub_id=" + this.sub_id + "&"
          + "device_type=" + this.device_type + "&"
        )
          .then((response) => {
            var res = JSON.parse(response.bodyText)
            if (res.error_num === 0) {
              //this.show_test_infos()
              this.ret = res['list']
              console.log('res=========>'+res)
              console.log('ret=========>'+this.ret)
            } else {
              this.$message.error('新增test失败，请重试')
              console.log(res['msg'])
              console.log(request_str)
            }
          })
      },
    },
  };
</script>
<style lang="sass" scoped>
  svg
    margin: 25px;
    path
      fill: none
      stroke: #76BF8A
      stroke-width: 3px
</style>
