/**
 * 此js文件管理关于当前设备的机型系统信息
 */
export function systemInfo() {
	let deviceName = 'H5'
	/****************** 所有平台共有的系统信息 ********************/
	// 设备系统信息
	let systemInfomations = uni.getSystemInfoSync()
	// 机型适配比例系数
	let scaleFactor = 750 / systemInfomations.windowWidth
	// 当前机型-屏幕高度
	let windowHeight = systemInfomations.windowHeight * scaleFactor //rpx
	// 当前机型-屏幕宽度
	let windowWidth = systemInfomations.windowWidth * scaleFactor //rpx
	// 状态栏高度
	let statusBarHeight = (systemInfomations.statusBarHeight) * scaleFactor //rpx
 
	// 导航栏高度  注意：此导航栏高度只针对微信小程序有效 其他平台如自定义导航栏请使用：状态栏高度+自定义文本高度
	let navHeight = 0 //rpx
	// console.log(windowHeight,'哈哈哈哈哈');
	
	/****************** 微信小程序头部胶囊信息 ********************/
	// #ifdef MP-WEIXIN
	const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
	// 胶囊高度
	let menuButtonHeight = menuButtonInfo.height * scaleFactor //rpx
	// 胶囊宽度
	let menuButtonWidth = menuButtonInfo.width * scaleFactor //rpx
	// 胶囊上边界的坐标
	let menuButtonTop = menuButtonInfo.top * scaleFactor //rpx
	// 胶囊右边界的坐标
	let menuButtonRight = menuButtonInfo.right * scaleFactor //rpx
	// 胶囊下边界的坐标
	let menuButtonBottom = menuButtonInfo.bottom * scaleFactor //rpx
	// 胶囊左边界的坐标
	let menuButtonLeft = menuButtonInfo.left * scaleFactor //rpx
 
	// 微信小程序中导航栏高度 = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
	navHeight = menuButtonHeight + (menuButtonTop - statusBarHeight) * 2
	
	deviceName = 'vx'
	// #endif
 
 
	// #ifdef MP-WEIXIN
	return {
		scaleFactor,
		windowHeight,
		windowWidth,
		statusBarHeight,
		menuButtonHeight,
		menuButtonWidth,
		menuButtonTop,
		menuButtonRight,
		menuButtonBottom,
		menuButtonLeft,
		navHeight,
		deviceName
	}
	// #endif
 
	// #ifndef MP-WEIXIN
	return {
		scaleFactor,
		windowHeight,
		windowWidth,
		statusBarHeight,
		deviceName
	}
	// #endif
}


export function weekdays(date) {
	let weeks= []

	// 获取当前日期
	const today = new Date();
	// 创建一个 Date 对象
	let currentDate = new Date(date);
	// 获取当前日期是星期几
	let currentDay = currentDate.getDay();

	// 创建一个数组来存储星期几
	let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	for (let i = -2; i < 3; i++) {
		let week = weekdays[(currentDay - i + 7) % 7];  // 上一天
		let day = new Date(currentDate.getTime() + (i * 24 * 60 * 60 * 1000));  // 前一天的日期
		let d = dateConvert(day)
	  const t =	d.split(/-/)
		weeks.push({
			week:week,
			day: t[t.length-1],
			highLight: i === 0,
			date:d,
			isDidst: judgeTime(d)
		})
	}
	// 返回结果
	return weeks
}
const judgeTime = (date) => {
	// 获取当前日期
	const currentDate = new Date();

	// 将输入的日期字符串转换为 Date 对象
	const inputDate = new Date(date);

	// 获取当前日期的年、月、日
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	const currentDay = currentDate.getDate();

	// 获取输入日期的年、月、日
	const inputYear = inputDate.getFullYear();
	const inputMonth = inputDate.getMonth();
	const inputDay = inputDate.getDate();

	// 判断输入日期是否是昨天或以前
	if (
		(inputYear < currentYear) ||                                             // 今年之前
		(inputYear === currentYear && inputMonth < currentMonth) ||                // 同年但是月份早于当前月份
		(inputYear === currentYear && inputMonth === currentMonth && inputDay < currentDay) // 同年同月但是日期早于当前日期
	) {
		return true; // 是今天或今天以后

	} else {
		return false; // 是昨天或以前
	}
}

// 不可选 时间
export function disableTime(date){
	const currentDate = new Date();

	// 将输入的日期字符串转换为 Date 对象
	const inputDate = new Date(date);

	// 获取当前日期的年、月、日
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	const currentDay = currentDate.getDate();

	// 获取输入日期的年、月、日
	const inputYear = inputDate.getFullYear();
	const inputMonth = inputDate.getMonth();
	const inputDay = inputDate.getDate();
	if (inputYear < currentYear){
		return ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
			'13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
	}else if(inputYear === currentYear && inputMonth === currentMonth && currentDay === inputDay){
		let arr = []
		for (let i = currentDate.getHours(); i >= 0 ; i--) {
			arr.push(zeroReplace(i) + ':00')
		}
		return arr
	}else {
		return []
	}
}






export function today(style) {
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth() + 1; // 月份从0开始，需要加1
	var day = today.getDate();

	var todayDate = ''
	switch (style) {
		case 'cn':
			todayDate = year + '年' + (month < 10 ? '0' + month : month) + '月' + (day < 10 ? '0' + day : day) + '日';
			break;
		case '/':
			todayDate = year + '/' + (month < 10 ? '0' + month : month) + '/' + (day < 10 ? '0' + day : day);
			break;
		default:
			// [默认]将日期格式化为YYYY-MM-DD
			todayDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
			break;
	}
	return todayDate
}
export function dateStyleConvert(date, style) {
	 let from;
	 if (date.includes('年')){
		 from = 'cn'
	 }else if (date.includes('-')){
		 from = '-'
	 }else if (date.includes('/')) {
		 from = '-'
	 }
	 if (from === style){
		 return date
	 }

	// 中文转
	if (style === 'cn'){
		const str =  date.split(from)
		return str[0] + '年' + str[1] + '月' + str[2] + '日'
	}else{
		if (from === null){
			return date
		}
		return date.replace(from, style)
	}
}

export function dateConvert(time){
	let date = new Date(time);
	let year = date.getFullYear();
	let month = date.getMonth() + 1; // 注意，JavaScript中的月份是从0开始的，所以我们需要+1
	let day = date.getDate();
	return year + '-' + zeroReplace(month) + '-' + zeroReplace(day)
}

export const zeroReplace = (num)=>{
	return  Number(num) < 10 ? '0' + num : num
}

export  function isValueInArray(arr, value) {
	if (arr === undefined || arr === null || arr.length === 0) {
		return false;
	}

	return arr.includes(value);
}



//
export function calculateTimeIntervals(startTime,endTime) {

	const startHour = parseInt(startTime.substring(0, 2));
	const endHour = parseInt(endTime.substring(0, 2));

	const timeIntervals = [];
	for (let i = startHour; i <= endHour; i++) {
		timeIntervals.push(zeroReplace(i)+':00')
	}

	return timeIntervals;
}

export function getOtherTimeIntervals(startTime,endTime) {
	// 将字符串时间转换为小时数
	const startHour = parseInt(startTime.substring(0, 2));
	const endHour = parseInt(endTime.substring(0, 2));

	// 计算时间区间的小时数
	const intervalHours = endHour - startHour + 1;

	// 创建一个数组来存储时间区间之外的时间
	const outsideIntervals = [];

	// 获取开始时间之前的时间
	for (let i = 0; i < startHour; i++) {
		outsideIntervals.push(padZero(i) + ":00");
	}

	// 获取结束时间之后的时间
	for (let i = endHour + 1; i < 24; i++) {
		outsideIntervals.push(padZero(i) + ":00");
	}

	return outsideIntervals;
}
function padZero(num) {
	return num < 10 ? "0" + num : num.toString();
}