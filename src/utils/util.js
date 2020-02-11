const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 将时间戳转换成日期
function add0(m) {
  return m < 10 ? '0' + m : m;
}

function isRealNum(val) {
  // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，
  if (val === "" || val == null) {
    return false;　　
  }
  if (!isNaN(val)) {

    　　 //对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
    //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )

    return true;　　
  }

  　
  else {　　　　
    return false;　　
  }
}

function formatDate(timeStamp) {
  let time = new Date(timeStamp),
    y = time.getFullYear(),
    m = time.getMonth() + 1,
    d = time.getDate(),
    h = time.getHours(),
    mm = time.getMinutes(),
    s = time.getSeconds();

  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

function getNum() { //随机生成32位随机数
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var nums = "";
  for (var i = 0; i < 32; i++) {
    var id = parseInt(Math.random() * 61);
    nums += chars[id];
  }
  return nums;
}

function isEmpty(obj) {
  if (typeof obj == "undefined" || obj == null || obj == "") {
    return true;
  } else {
    return false;
  }
}

function getCurrentGMTString() {
  let odate = new Date();
  return odate.toISOString();
}

function myTimeToLocal(inputTime) {
  if (!inputTime && typeof inputTime !== 'number') {
    return '';
  }
  var localTime = '';
  inputTime = new Date(inputTime).getTime();
  const offset = (new Date()).getTimezoneOffset();
  localTime = (new Date(inputTime - offset * 60000)).toISOString();
  localTime = localTime.substr(0, localTime.lastIndexOf('.'));
  localTime = localTime.replace('T', ' ');
  return localTime;
}

function getInterveMilSecond(startTime, endTime) {
  let date3 = endTime.getTime() - startTime.getTime();   //时间差的毫秒数        
  return date3 % (24 * 3600 * 1000);
}

function getInterveMinSecond(startTime, endTime) {
  let leave1 = getInterveMilSecond(startTime, endTime);
  return Math.floor(leave1 / (60 * 1000));
}

module.exports = {
  formatTime: formatTime,
  getNum: getNum,
  formatDate: formatDate,
  isRealNum: isRealNum,
  isEmpty: isEmpty,
  getCurrentGMTString: getCurrentGMTString,
  myTimeToLocal: myTimeToLocal,
  getInterveMinSecond: getInterveMinSecond
  
}