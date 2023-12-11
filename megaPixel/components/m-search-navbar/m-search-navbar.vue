<template>
	<view style="background: white;padding: 10px;height: 44px;">
		<view style="display: flex;align-items: center;">
			<view style="margin: 2px;" @click="goBack()">
				<img style="height: 22px;width: 22px;" :src="backIcon" alt="">
			</view>
			<view style="margin-left: 10px;">
				<u-search placeholder="快速搜索" :clearabled="true"  v-model="keyword" actionText="" @change="changeValue"></u-search>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-search-navbar",
		data() {
			return {
				backIcon: require('@/static/images/my/back.png'),
				keyword: ''
			};
		},
		methods:{
			goBack(){
				uni.navigateBack()
			},
			changeValue(e){
				this.$emit("change",e)
			}
		}
	}
</script>

<style>

</style>