// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'wyardt-ea-h9jxk'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  ret: false
  if (event.password == 5023)
  {
    await db.collection('partyTime').add({
      data: event.date, 
      success(res) {
      //成功打印消息      
      console.log('3', res)
      ret = true
      },    
      fail(res) { 
        //存入数据库失败      
        console.log('订单存入数据库操作失败');
        ret = false      
        //云函数更新    
        }  
    })
  }
  else {
    ret = false
  }
  return {
    ret
  }
}