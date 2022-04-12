import { Button, Checkbox, Input, message } from 'ant-design-vue';
import { defineComponent, reactive, Suspense, Teleport, ref, watch, computed, Transition, TransitionGroup, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import NabBar from '../../components/nabBar/nabBar';
import tabBar from '../../components/tabBar/tabBar';
// import * as echarts from 'echarts'
import * as echarts from 'echarts/core';
import {
    BarChart,
    // 系列类型的定义后缀都为 SeriesOption
    BarSeriesOption,
    LineChart,
    LineSeriesOption
} from 'echarts/charts';
import {
    TitleComponent,
    // 组件类型的定义后缀都为 ComponentOption
    TitleComponentOption,
    TooltipComponent ,
    GridComponent,
    GridComponentOption
} from 'echarts/components';
import {
    CanvasRenderer
} from 'echarts/renderers';

import { mapState } from "vuex"

import "./home.module.scss";
import 'animate.css';
export default defineComponent({
    components: { NabBar, tabBar },
    setup(props, context) {
        // console.log(echarts)
        const router = useRouter();
        const data: any = reactive({
            obj: localStorage.getItem("arrItem") ? JSON.parse(localStorage.getItem("arrItem") as string) : [{ name: "奔驰", sle: false }, { name: "宝马", sle: true }, { name: "玛莎", sle: false }, { name: "奥迪", sle: true }],
            inputvalue: '123',
            timer: 0,
            isChecked: computed(() => {
                if (data.obj.length <= 0) return false
                return data.obj.length === data.obj.reduce((pre: number, item: any) => pre += item.sle ? 1 : 0, 0)
            }),
            arr: [0, 1, 3, 4, 5]
        })
        const fun = {
            topInput: () => {
                return (
                    <div class="home-module_topinput">
                        <Input allowClear
                            onPressEnter={(e) => {
                                if (!e.target.value) {
                                    message.error("输入不能为空")
                                    return
                                }
                                //往数组的第一个位置插入
                                data.obj.unshift({
                                    name: e.target.value,
                                    sle: false
                                })
                                setObj(JSON.stringify(data.obj))
                            }}></Input>
                    </div>
                )
            },
            centerList: () => {
                return (
                    <div class="home-module_centerlist">
                        {data.obj.map((pro: any) => {
                            return (
                                <div class="home-module_checkboxDiv">
                                    <Checkbox checked={pro.sle} onChange={() => { pro.sle = !pro.sle; setObj(JSON.stringify(data.obj)) }}>{pro.name}</Checkbox>
                                </div>
                            )
                        })}

                    </div>
                )
            },
            btmBtn: () => {
                return (
                    <div class="home-module_btmBtn">
                        <Checkbox checked={data.isChecked} onChange={(e) => {
                            if (e.target.checked) {
                                data.obj.forEach((item: any) => {
                                    item.sle = true
                                })
                            } else {
                                data.obj.forEach((item: any) => {
                                    item.sle = false
                                })
                            }
                            setObj(JSON.stringify(data.obj))
                        }}>全选</Checkbox>
                        <text class="home-module_delBtn" onClick={() => {
                            data.obj = data.obj.filter((item: any) => !item.sle)
                            setObj(JSON.stringify(data.obj))
                        }}>删除</text>
                    </div>
                )
            }
        }

       
        //保存到本地
        const setObj = (item: string) => {
            localStorage.setItem('arrItem', item)
        }
        const randomIndex = () => {
            return Math.floor(Math.random() * data.arr.length)
        }
        const ish = ref(true);
        console.dir(Transition)
        console.dir(TransitionGroup)
        const echInit = () => {
            var myChart = echarts.init(document.getElementById('ech') as HTMLElement);
            // 绘制图表
            myChart.setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        data: [15, 20, 36, 18, 50, 20]
                    }
                ]
            });
        }
        onMounted(() => {
            // 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
            type ECOption = echarts.ComposeOption<
                BarSeriesOption  | LineSeriesOption | TitleComponentOption | GridComponentOption
            >;
            // 注册必须的组件
            echarts.use(
                [TitleComponent, GridComponent, BarChart, CanvasRenderer,TooltipComponent]
            );
            echInit()
        })
        return {
            fun, router, ish, arr: data.arr, randomIndex
        }
    },
    //自定义指令
    directives: {
        del: {
            created(el, binding) {
                console.log("create:在绑定元素的 attribute 或事件监听器被应用之前调用", el, binding)
            },
            // beforeMount(el, binding) {
            //     console.log("beforeMount：当指令第一次绑定到元素并且在挂载父组件之前调用", el, binding)
            // },
            // mounted(el, binding) {
            //     console.log("mounted：在绑定元素的父组件被挂载前调用", el, binding)
            // },
            // beforeUpdate(el, binding) {
            //     console.log("beforeUpdate：在更新包含组件的 VNode 之前调用", el, binding)
            // },
            // updated(el, binding) {
            //     console.log("updated：在包含组件的 VNode 及其子组件的 VNode 更新后调用", el, binding)
            // },
            // beforeUnmount(el, binding) {
            //     console.log("beforeUnmount：在卸载绑定元素的父组件之前调用", el, binding)
            // },
            unmounted(el, binding) {
                console.log("unmounted：当指令与元素解除绑定且父组件已卸载时，只调用一次", el, binding)
            }

        }

    },
    render() {
        return (
            <div class="home-module_main">
                <NabBar title='home页' onNabBack={(bool: string) => { this.ish = !this.ish; }}></NabBar>
                <div class="home-module_page">
                    <div v-show={true}>{this.fun.topInput()}</div>
                    <div>{this.fun.centerList()}</div>
                    <div>{this.fun.btmBtn()}</div>
                    <Transition
                        onBeforeEnter={() => { console.log("进入了") }}
                        onBeforeLeave={() => { console.log("离开了") }}
                        appear appearToClass="home-module_fade-enter-form"
                        enterToClass="home-module_fade-enter-form"
                        leaveToClass='home-module_fade-leave-form'>
                        <h6 v-show={this.ish} class="home-module_h6">123(借助动画实现)</h6>
                    </Transition>
                    <Transition
                        onBeforeEnter={() => { console.log("进入了") }}
                        onBeforeLeave={() => { console.log("离开了") }}
                        appear
                        enterActiveClass='home-module_h-enter-active'
                        enterFromClass='home-module_h-enter-form'
                        enterToClass="home-module_h-enter-to"

                        leaveActiveClass='home-module_h-leave-active'
                        leaveFromClass='home-module_h-leave-form'
                        leaveToClass='home-module_h-leave-to'
                    >
                        <h6 v-show={this.ish} class="home-module_h">123(借助过渡实现)</h6>
                    </Transition>

                    <Button onClick={() => {
                        this.arr.splice(this.randomIndex(), 0, this.arr.length + 1)
                    }}>add</Button>
                    <Button onClick={() => {
                        this.arr.splice(this.randomIndex(), 1)
                    }}>remove</Button>

                    <TransitionGroup tag='div' name='data'
                        enterActiveClass='home-module_data-enter-active'
                        enterFromClass='home-module_data-enter-form'
                        enterToClass="home-module_data-enter-to"

                        leaveActiveClass='home-module_data-leave-active'
                        leaveFromClass='home-module_data-leave-form'
                        leaveToClass='home-module_data-leave-to'
                    >
                        {this.arr.map((pro: any) => {
                            return (
                                <div class="home-module_proitem" key={pro}>
                                    {pro}
                                </div>
                            )
                        })}
                    </TransitionGroup>

                    <Transition name="animate__animated animate__bounce" appear
                        enterActiveClass='animate__jello'
                        leaveActiveClass='animate__backOutDown'
                    >
                        <div v-show={this.ish}>animate.css库动画</div>
                        {/* <text v-show={!this.ish}>animate.css库动画</text> */}
                    </Transition>
                    <TransitionGroup tag='div' name='animate__animated animate__bounce'
                        enterActiveClass='animate__jello'
                        leaveActiveClass='animate__backOutDown'
                    >
                        {this.arr.map((pro: any) => {
                            return (
                                <div class="home-module_proitem" key={pro}>
                                    {pro}
                                </div>
                            )
                        })}
                    </TransitionGroup>
                    <div id="ech" style="width:100%;height:10rem;"></div>
                </div>

                <div><tabBar /></div>
            </div>
        );
    },
});