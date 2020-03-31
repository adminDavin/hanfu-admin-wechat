
const app = getApp();
import util from '../utils/util.js';


function setImageUrls(list) {
  for (let item of list) {
    if (util.isRealNum(item.fileId)) {
      item.imageUrl = app.endpoint.file + '/goods/getFile?fileId=' + item.fileId;
    }
  }
}


function groupFileId(list) {
  for (let item of list) {
    // if (util.isRealNum(item.groupFileId)) {
      item.imageUrl = app.endpoint.file + '/goods/getFile?fileId=' + item.groupFileId;
    // }
  }
}

export default {
  setImageUrls: setImageUrls,
  groupFileId: groupFileId
};