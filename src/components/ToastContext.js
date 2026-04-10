import { useState, createContext } from "react";
import MySnackBar from "./MySnackBar";

export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");

  function ShowHideToast(message,variant) {
    setOpen(true);
    setVariant(variant);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ToastContext.Provider value={{ ShowHideToast }}>
      <MySnackBar open={open} message={message} variant={variant} />
      {children}
    </ToastContext.Provider>
  );
};
