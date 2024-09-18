export const updateLocalStorage = (key, value) => {
    if (value != null)
        localStorage.setItem(key, value);
    else
        localStorage.removeItem(key);

    // create and dispatch custom event for local storage listeners components
    const event = new CustomEvent('localStorageChange');
    window.dispatchEvent(event);
};
