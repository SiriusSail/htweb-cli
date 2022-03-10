const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
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
    // 创建项目
    log(`🚀创建项目:` + name)
    // 克隆代码
    await clone('github:SiriusSail/htweb-app', name)
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
    yarn global add serve   //安装serve
    serve ./dist            //启动本地服务
===========================
`)

//     const open = require('open')
//     open('http://localhost:8000')
//     await spawn('yarn', ['start'], { cwd: `./${name}` })
}