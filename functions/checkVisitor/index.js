// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'wyardt-ea-h9jxk'
})

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database() // 查询当前用户所有的 counters
  try {
    return await db.collection('partyMembers').where({
      "guest0": event.guestName
    }).get({
      success: function(res) {
        return res
      }
    });
  } catch (e) {
    console.error(e)
  }
}