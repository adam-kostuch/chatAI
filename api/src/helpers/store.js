import store from 'store2';

const setLocalStorageItem = (itemKey, itemValue) => {
  store(itemKey, itemValue);
};

const getLocalStorageItem = (itemKey) => {
  return store(itemKey);
};

export { setLocalStorageItem, getLocalStorageItem };
