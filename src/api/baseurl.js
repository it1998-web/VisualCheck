// 存贮服务器地址
const globalApi = () => {
	let globalApi = localStorage.getItem('apiUrl')
	return globalApi
};
 export {
  globalApi
}