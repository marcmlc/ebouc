import { contextBridge, ipcRenderer } from 'electron';

const IPC = {
  send: ['book:openPickBookDialog', 'app:close'],
  on: ['book:getBooks'],
  invoke: [],
};

const api = {
  send: (channel, ...args) => {
    if (!IPC.send.includes(channel)) {
      throw new Error(`${channel} not included in 'send'`);
    }

    return ipcRenderer.send(channel, ...args);
  },
  on: (channel, listener) => {
    if (!IPC.on.includes(channel)) {
      throw new Error(`${channel} not included in 'on'`);
    }

    ipcRenderer.on(channel, (event, ...args) => listener(...args));
  },
  removeListener: channel => {
    if (!IPC.on.includes(channel)) {
      throw new Error(`${channel} not included in 'on'`);
    }

    ipcRenderer.removeAllListeners(channel);
  },
  invoke: (channel, ...args) => {
    if (!IPC.invoke.includes(channel)) {
      throw new Error(`${channel} not included in 'invoke'`);
    }

    return ipcRenderer.invoke(channel, ...args);
  },
};

try {
  contextBridge.exposeInMainWorld('api', api);
} catch (error) {
  console.error(error);
}
