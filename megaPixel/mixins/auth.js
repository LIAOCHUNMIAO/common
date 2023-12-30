export default {
    data() {
        return {
            params: null
        };
    },
    created() {

    },
    onLoad(e) {
        this.params = JSON.parse(e.data)
    },
    methods:{

    }
};