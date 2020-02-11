
const app = getApp();
import util from '../utils/util.js';


function setImageUrls(list) {
  for (let item of list) {
    if (util.isRealNum(item.fileId)) {
      item.imageUrl = app.endpoint.file + '/goods/getFile?fileId=' + item.fileId;
    }
  }
}


export default {
  setImageUrls: setImageUrls
};