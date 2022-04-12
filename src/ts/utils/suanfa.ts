export default function utils() {
    //js 统计一个字符串出现频率最高的字母/数字
    function strMaxFun(str: any) {
        let string = [...str],
            maxValue = '',
            obj: any = {},
            max: number = 0;
        string.forEach((value: any) => {
            obj[value] = obj[value] == undefined ? 1 : obj[value] + 1
            if (obj[value] > max) {
                max = obj[value]
                maxValue = value
            }
        })
        return maxValue;
    }
    //数组去重
    function unique(arr: any) {
        let obj:any = {}
        arr.forEach((value:any) => {
            obj[value] = 0
        })
        return Object.keys(obj)
    }


    return {
        strMaxFun,unique
    }
}