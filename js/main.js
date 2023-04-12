function readTextLine(text) {
    var textArr = text.split(/[(\r\n)\r\n]+/);
    textArr.forEach((item, index) => {
        if (!item) {
            textArr.splice(index, 1); //删除空项
        }
    })
    return textArr;
}

function parseTextLines(inputArr) {
    var paramArr = []
    var id = 0;
    inputArr.forEach((item, index) => {
        // var ii = item.match(/g(0x\d+)\s+([\uxxxx.]+)/);
        var aa = item.match(/(0x\d+)/g);
        var bb = item.match(/[\u4e00-\u9fa5][^\d]+/g);
        if (aa && bb) {
            var code = parseInt(aa[0]);
            var desc = bb[0];
            paramArr.push({
                id: id,
                code: code,
                desc: desc
            });
            id++;
        }
    })
    return paramArr;
}

var outputBox = new Vue({
    el: '#output_box',
    data: {
        output_items: [{
            id: 0,
            code: 1,
            desc: "desc"
        }],
        checkOps: [],
        switchOption: 0,
        finalSwitchOption:"0x0" ,
    },
    watch: {
        checkOps: function(newCheckOps, oldCheckOps) {
            var sw = 0;
            for (var i = 0; i < newCheckOps.length; i++) {
                sw += newCheckOps[i];
            }
            this.switchOption = sw;
            this.finalSwitchOption = "0x" + this.switchOption.toString(16);
        },
        switchOption: function(newSwitchOption, oldSwitchOption) {
            if(newSwitchOption != oldSwitchOption){
                this.reset();
                for (var i = 0; i < this.output_items.length; i++){
                    var switchVal = parseInt(this.output_items[i].code);
                    var tt = switchVal & newSwitchOption;
                    if ( (switchVal & newSwitchOption) == switchVal ){
                        this.checkOps.push(switchVal)
                    }
                }
            }
        }
    },
    methods:{
        reset:function(){
            this.checkOps.length = 0;
            this.switchOption = 0;
            this.finalSwitchOption = "0x0";
        }
    },
})

var inputBox = new Vue({
    el: '#input_box',
    data: {
        inputSwitchOp: 0,
        inputMsg: `
0x00000001        最小积分
0x00000002        最大逃跑率
0x00000004        限制IP
`
    },
    watch: {
        // inputSwitchOp: function(newInputSwitchOp, oldInputSwitchOp) {
        //     outputBox.switchOption = inputSwitchOp;
        // }
    },
    methods: {
        reset: function() {
            var inputMsg = this.inputMsg;
            var inputArr = readTextLine(inputMsg)
            var params = parseTextLines(inputArr)
            outputBox.output_items = params;
            outputBox.switchOption = this.inputSwitchOp;
        },
        inputSwitchOpUpdate:function(){
            outputBox.switchOption = this.inputSwitchOp;
        }
    }
})
