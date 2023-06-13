const Path = require('path')
const fs = require('fs')

function getPath(dir) {
  let rootPath = __dirname
  
  const dirIndex = dir.lastIndexOf(rootPath)
  // console.log('__dirname = ', __dirname, 'rootPath = ', rootPath, ' endIndex = ', endIndex)
  if(dirIndex != -1){
    return dir
  }
  return Path.join(rootPath, dir)
}

class FileHandler {

  constructor() {
		
	}
  
  readFile(path){
    path = getPath(path)
    let data = null
    try {
      data = fs.readFileSync(path, 'utf8')
    } catch (error) {
      console.log('readFile: ', error.message)
    }
    return data
  }
  
  writeFile(path, data){
    path = getPath(path)
    let res = null
    try {
      if(fs.existsSync(path)){
        fs.writeFileSync(path, data)
      }
      res = true
      // console.log('writeFile data: ', data)
    } catch (error) {
      console.log('writeFile err: ', error.message)
    }
    return res
  }
  
  getModule(basePath = 'modular', isFile = false){
    let moduleDict = {}
    let fileDict = {}
    const platform = process.platform || 'linux'
    const baseSpace = platform.startsWith('win') ? '\\' : '/'
    const getModuleFromPath = ()=>{
      const modulePath = getPath(basePath)
      if(!fs.existsSync(modulePath)){
        console.log('there is no modular file! for: ', modulePath)
        return
      }
      if(!modulePath.includes('src')){
        let index = modulePath.lastIndexOf(basePath)
        modulePath += modulePath.slice(index-1)
        modulePath.splace('basePath', 'src')
      }
      let files = fs.readdirSync(modulePath)
      files.forEach(item=>{
        let filepath1 = `${modulePath}${baseSpace}${item}`
        let stat = fs.statSync(filepath1)
        if(stat.isFile()){
          // file
          fileDict[item] = `${basePath}${baseSpace}${item}`
        }else{
          // dir
          moduleDict[item] = `${basePath}${baseSpace}${item}`
        }
      })
    }
    try {
      getModuleFromPath()
    } catch (error) {
      console.log('err in getModule: ', error.message)
    }
    return isFile? fileDict: moduleDict
  }
}

module.exports = FileHandler