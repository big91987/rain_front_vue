<template>
  <div class="hello">
    <h1>??????</h1>
    <h2>Essential Links</h2>
    <el-button>默认按钮</el-button>
    <el-button type="primary" @click="calculatePath()">主要按钮</el-button>
    <el-button type="text">文字按钮</el-button>

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
        data: [99, 71, 78, 25, 36, 92, 33, 11, 22, 19, 87, 112, 23, 23, 2, -1, 77],
        line: '',
      };
    },
    mounted() {
      // this.calculatePath();
    },
    methods: {
      getScales() {
        const x = d3.scaleTime().range([0, 430]);
        const y = d3.scaleLinear().range([210, 0]);
        d3.axisLeft().scale(x);
        d3.axisBottom().scale(y);
        x.domain(d3.extent(this.data, (d, i) => i));
        y.domain([0, d3.max(this.data, d => d)]);
        return { x, y };
      },
      calculatePath() {
        const scale = this.getScales();
        const path = d3.line()
          .x((d, i) => scale.x(i))
          .y(d => scale.y(d));
        this.line = path(this.data);
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
