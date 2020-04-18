const useLocalStorage = () => {
  return {
    get: (key: string) => localStorage.getItem(key),
    set: (key: string, value: any) => localStorage.setItem(key, value),
  };
};

export default useLocalStorage;
