const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', ()=>{
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


// Make sure closing the window closes the app
// if we're on a mac
app.on('window-all-closed', ()=>{
  if (process.platform !== 'darwin') app.quit()
})