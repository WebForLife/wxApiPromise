const wxApi = {
	/**
     * wx.chooseImage
     * 
     *  */

	chooseImage(params) {
		return new Promise((resolve, reject) => {
			wx.chooseImage({
				count: params.count || 1,
				sizeType: params.sizeType || [ 'original', 'compressed' ],
				sourceType: params.sourceType || [ 'album', 'camera' ],
				success(res) {
					// tempFilePath可以作为img标签的src属性显示图片
					resolve(res);
				},
				fail(res) {
					reject(res);
				}
			});
		}).catch((err) => {
			console.log('chooseImageErr', err);
		});
	},

	/**
	 * wx.downloadFile
	 *  
	 */
	downloadFile(params) {
		return new Promise((resolve, reject) => {
			wx.downloadFile({
				url: params.url,
				header: params.header || '',
				filePath: params.filePath || '',
				success(res) {
					if (res.statusCode == 200) {
						resolve(res);
					} else {
						reject(res);
					}
				},
				fail(res) {
					reject(res);
				}
			});
		}).catch((err) => {
			console.log('downloadFileErr', err);
		});
	},

	/**
	 * wx.saveFile
	 *  
	 */
	saveFile(tempFilePaths) {
		return new Promise((resolve, reject) => {
			wx.saveFile({
				tempFilePath: tempFilePaths,
				success(res) {
					res.statusCode = 200;
					resolve(res);
				},
				fail(res) {
					reject(res);
				}
			});
		}).catch((err) => {
			console.log('saveFileErr', err);
		});
	},

	/**
	 * wx.saveImageToPhotosAlbum
	 * 
	 */
	saveImageToPhotosAlbum(filePath) {
		return new Promise((resolve, reject) => {
			wx.saveImageToPhotosAlbum({
				filePath: filePath,
				success(res) {
					res.statusCode = 200;
					resolve(res);
				},
				fail(res) {
					if (
						res.errMsg == 'saveImageToPhotosAlbum:fail:auth denied' ||
						res.errMsg == 'saveImageToPhotosAlbum:fail auth deny'
					) {
						resolve(res);
					} else {
						reject(res);
					}
				}
			});
		}).catch((err) => {
			console.log('saveImageToPhotosAlbumErr', err);
		});
	},

	/**
	 * setClipboardData
	 * 
	 */
	setClipboardData(data){
		return new Promise((resolve,reject)=>{
			wx.setClipboardData({
				data:data,
				success(res){
					res.statusCode=200;
					resolve(res)
				},
				fail(res){
					reject(res);
				}
			})
		}).catch(err=>{
			console.log('setClipboardDataErr',err);
		});
	},
	/**
     * wx.showModal
	 * 
     */
	showModal(params) {
		return new Promise((resolve, reject) => {
			wx.showModal({
				title: params.title || '提示',
				content: params.content || '这是一个模态弹窗',
				showCancel: params.showCancel || true,
				cancelText: params.cancelText || '取消',
				cancelColor: params.cancelColor || '#000000',
				confirmText: params.confirmText || '确定',
				confirmColor: params.confirmColor || '#3cc51f',
				success(res) {
					res.statusCode = 200;
					resolve(res);
				},
				fail(res) {
					reject(res);
				}
			});
		}).catch((err) => {
			console.log('showModalErr', err);
		});
	}
};

export default wxApi;
