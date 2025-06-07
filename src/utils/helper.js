export const getFromLocalStorage = (key) => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
};

// Sets a value in localStorage
export const setToLocalStorage = (key, value) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, value);
};

export const addRippleEffect = (button, event) => {
  if (button) {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const span = document.createElement("span");
    span.classList.add("btn-animation");
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    button.appendChild(span);
    setTimeout(() => {
      span.remove();
    }, 500);
  }
};

export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const converToNormalTime = (isoTime) => {
  const date = new Date(isoTime);
  const readableTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return readableTime;
};
