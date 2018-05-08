const config = {
  host: 'http://localhost:3000',
  upLoadAvatarUrl: 'http://localhost:8081/users/upload',
  uploadProductInfoUrl: 'http://localhost:8081/products/upload',
  avatarPath: '/images/user-avatar/',
  productImgPath: '/images/product/',
  getProductPicUrl (name) {
    return `${this.host}${this.productImgPath}${name}`;
  }
};
export default config;
