<template>
    <div>
        <h3>扰码测试:</h3>
        <div class="input">
            <textarea v-model="source"  style="width: 500px;height: 300px;"/> 
        </div>
        <div style="margin: 10px 0;">
            <button @click="encode">Encode</button>
            <button @click="decode">Decode</button>
            <button @click="change">交换上下文</button>
        </div>
        <div class="output" style="margin: 10px 0;"><span style="font-weight: bolder;color: red;">result: </span> {{result}}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            source: '',
            result: ''
        }
    },

    mounted() {
        window.onload = () => {

        }
    },

    methods: {
        pwdEncrypt(source) {
            var getRandomLength = function(len) {
                var ret = '', random = 0;
                while(len --) {
                    random = Math.floor(Math.random() * 26);
                    ret += (random > 13 ? String.fromCharCode(97 + random % 26) : String.fromCharCode(65 + random % 26));
                }
                return ret;
            }

            var handle = function(source) {
                if (source.length < 10) return source;
                var codeTable = ['J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
                var codeTable2 = ['j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
                var randomIndex = Math.floor(Math.random() * 10);
                var posChar = codeTable[randomIndex];
                var randomLen = Math.floor(Math.random() * 10);
                var mixedStr = getRandomLength(randomLen);
                var lenChar = codeTable2[randomLen];
                return posChar + lenChar + source.slice(0, randomIndex) + mixedStr + source.slice(randomIndex);
            }

            return handle(btoa(source));
        },
        pwdDecrypt(secret) {
            var codeMap = {};
            ['j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'].forEach((char, pos) => {
                codeMap[char] = pos;
            })
            var index = codeMap[secret[0].toLowerCase()];
            var len = codeMap[secret[1].toLowerCase()];
            return atob(secret.slice(2, 2+index) + secret.slice(2+index+len));
        }, 
        decode() {
            this.result = this.pwdDecrypt(this.source);
        },
        encode() {
            this.result = this.pwdEncrypt(this.source);
        },
        change() {
            let tmp = this.source;
            this.source = this.result;
            // this.result = tmp;
        }
    }
}
</script>