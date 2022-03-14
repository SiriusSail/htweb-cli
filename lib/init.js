const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const inquirer = require('inquirer')
const chalk = require('chalk')
const { clone } = require('./download')
const spawn = async (...args) => {
    const { spawn } = require('child_process')
    return new Promise(resolve => {
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        })
    })
}
const log = content => console.log(chalk.green(content))
module.exports = async name => {
    // 打印欢迎画面
    // clear()
    const data = await figlet('HTWEB CLI')
    log(data)

    const ie9 = {
      path: 'github:SiriusSail/htweb-app-ie',
      text: 'ie9以上( react16+, umi2, antd3',
      info: `
umi2文档: https://v2.umijs.org/ 
antd3文档: https://3x.ant.design/docs/react/introduce-cn
`
    }
    const ie11 = {
      path: 'github:SiriusSail/htweb-app',
      text: 'ie11及以上( react17+, umi3, antd4',
      info: `
umi3文档: https://umijs.org/zh-CN/docs 
antd4文档: https://ant.design/components/overview-cn/
`
    }
    const question = [
      {
          type: 'list',
          name: 'isIe',
          message: '请选择兼容IE的版本',
          choices: [ie11.text, ie9.text], 
          filter (val) {
              return val.toLowerCase()
          }
      }
    ]
    const option = await inquirer.prompt(question)
    // 创建项目
    log(`🚀创建项目:` + name)
    // 克隆代码
    const path = option.isIe === ie11.text? ie11: ie9;
    await clone(path.path, name)
    log('下载完成')
//     await spawn('yarn', [''], { cwd: `./${name}` })
    log(`
To get Start:
===========================
    安装依赖
    cd ${name}
    'yarn' or 'npm install'
  -------------------------
    启动开发环境
    yarn start
  -------------------------
    本地打包并验证，dist目录部署到服务器上
    yarn build              //打包项目

      npx serve ./dist // 启动本地服务
      or
      yarn global add serve   //安装serve
      serve ./dist            //启动本地服务
  -------------------------
    文档地址
  ${path.info}
  -------------------------
===========================
`)

//     const open = require('open')
//     open('http://localhost:8000')
//     await spawn('yarn', ['start'], { cwd: `./${name}` })
}