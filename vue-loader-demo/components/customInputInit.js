import Vue from 'vue';
Vue.component('input-awesome', {
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  render: function (h) {
    let self = this;
    console.log('非函数式组件实例：', this);
    return h(
      'div', [
        h(
          'input', {
            // dom 属性
            domProps: {
              value: self.config.value,
              type: self.config.type,
              placeholder: self.config.placeholder,
              style: 'border: 1px solid #ccc;;line-height: 32px;padding: 0px 12px;'
            },
            // 事件监听
            on: {
              // 实现v-model类似功能
              input: function (e) {
                  self.$emit('change', e.target.value);
              }
            }
          },
        ),
        self.$slots.default
      ]
    )
  },
  created() {
    console.log('created', this, this.$props.config === this.config, this.config);
    console.log(`config.type = ${this.config.type}`)
  }
})

Vue.component('custom-input', {
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  render: function (h) {
    console.log('非函数式组件(JSX)实例：', this);
    return <div>
      <input type={this.config.type} placeholder={this.config.placeholder} style={'border: 1px solid #ccc;;line-height: 32px;padding: 0px 12px;'}/>
      { this.$slots.default }
    </div>
  }
})

Vue.component('functional-input', {
  functional: true,
  
  props: {
    config: {
      type: Object,
      default: {}
    }
  },

  render: function (h, context) {
    console.log('函数式组件实例：', context);
    return <div draggable="true" style="padding: 10px 0px;">
      <input 
        value={context.props.config.value}
        type={context.props.config.type} 
        placeholder={context.props.config.placeholder} 
        class={'fun_inout'}
        style={'border: 1px solid #ccc;;line-height: 32px;padding: 0px 12px;'}
      />
      { context.children }
    </div>
  }
})