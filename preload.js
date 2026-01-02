const { contextBridge, ipcRenderer } = require('electron');

try {
  contextBridge.exposeInMainWorld('annotateAPI', {
    minimize: () => { try { ipcRenderer.send('annotate:minimize'); } catch (e) {} },
    close: () => { try { ipcRenderer.send('annotate:close'); } catch (e) {} },
    saveJSON: (filePath, json) => { try { ipcRenderer.send('annotate:saveJSON', { filePath, json }); } catch (e) {} },
    loadJSON: async (filePath) => {
      try {
        return await ipcRenderer.invoke('annotate:loadJSON', { filePath });
      } catch (e) { return null; }
    },
    minimizeWithSave: (filePath, json) => { try { ipcRenderer.send('annotate:minimizeWithSave', { filePath, json }); } catch (e) {} },
  });
} catch (e) {}
