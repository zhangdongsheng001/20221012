

<template>
  <div>
    <VuePicker :data="pickData"
      :layer="2"
      :defaultIndex="defaultIndex"
      :showToolbar="true"
      @cancel="cancel"
      @confirm="confirm"
      :visible.sync="pickerVisible"
    />
  </div>
</template>

<script>
  import VuePicker from 'vue-pickers'
  import tdata from './link-cols'
  export default {
    name: 'app',
    components: {
      VuePicker
    },
    data () {
      return {
        showToolbar: true,
        pickerVisible: false,
        defaultIndex: [1, 2],
        pickData: tdata,
        result: ''
      }
    },
    methods: {
      cancel () {
        console.log('cancel')
      },
      confirm (res) {
        console.log(res)
      }
    }
  }
  // link-cols.js
  var tdata = [
    {
      label: '深圳',
      value: 'sz',
      children: [
        {
          label: '南山',
          value: 'ns',
        },
        {
          label: '福田',
          value: 'ft',
        },
        {
          label: '宝安',
          value: 'ft',
        },
        {
          label: '罗湖',
          value: 'lh',
        },
        {
          label: '盐田',
          value: 'yt',
        }
      ]
    },
    {
      label: '广州',
      value: 'gz',
      children: [
        {
          label: '越秀',
          value: 'yx',
        },
        {
          label: '荔湾',
          value: 'lw',
        },
        {
          label: '海珠',
          value: 'zh',
        },
        {
          label: '天河',
          value: 'th',
        },
        {
          label: '白云',
          value: 'by',
        }
      ]
    },
    {
      label: '上海',
      value: 'sh',
      children: [
        {
          label: '黄浦',
          value: 'hp',
        },
        {
          label: '徐汇',
          value: 'xh',
        },
        {
          label: '长宁',
          value: 'cn',
        },
        {
          label: '虹口',
          value: 'hk',
        }
      ]
    },
    {
      label: '北京',
      value: 'bj',
      children: [
        {
          label: '东城',
          value: 'dc',
        },
        {
          label: '西城',
          value: 'xc',
        },
        {
          label: '海淀',
          value: 'hd',
        },
        {
          label: '朝阳',
          value: 'cy',
        },
        {
          label: '丰台',
          value: 'ft',
        },
        {
          label: '门头沟',
          value: 'mtg',
        },
        {
          label: '昌平',
          value: 'cp',
        },
        {
          label: '大兴',
          value: 'dx',
        },
        {
          label: '顺义',
          value: 'sy',
        }
      ]
    }
  ]  
</script>
