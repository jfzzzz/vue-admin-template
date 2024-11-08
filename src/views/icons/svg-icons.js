// const req = require.context('../../assets/icons/svg', false, /\.svg$/)

const req = import.meta.glob('../../assets/icons/svg/**/*.svg', { eager: true })

// const requireAll = requireContext => requireContext.keys()

// const re = /\.\/(.*)\.svg/

// const svgIcons = requireAll(req).map(i => {
//   return i.match(re)[1]
// })

const svgIcons = []

for (const path in req) {
  if (Object.prototype.hasOwnProperty.call(req, path)) {
    const element = req[path];

    const fileName = path.split('/').pop(); // 获取文件名及扩展名
    const nameWithoutExtension = fileName.split('.').slice(0, -1).join('.'); // 去掉扩展名得到文件名
    svgIcons.push(nameWithoutExtension);
    
  }
}


export default svgIcons
