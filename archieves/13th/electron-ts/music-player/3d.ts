//http://sedn.egret.com/examples/sponza_2/release/index.html

const electron = require('electron');
// Module to control application life.
const {app, ipcMain, dialog} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  win.loadURL(`http://sedn.egret.com/examples/sponza_2/release/index.html`);


  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('openFile', (e) => {
  dialog.showOpenDialog({
    filters: [
      { name: 'Mp3 Files', extensions: ['mp3'] }
    ]
  }, fileNames => {
    var filePath = null;
    if (fileNames.length) {
      filePath = fileNames[0];
    }
    e.sender.send('openFile', filePath);
  })
});

export = app;