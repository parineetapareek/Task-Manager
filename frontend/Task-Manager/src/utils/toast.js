import { toast } from "react-toastify";

export const successToast = (msg) =>
  toast.success(msg, {
    style: { backgroundColor: "#EAF7F1", color: "#0F4C3A", fontWeight: 600 },
    progressStyle: { backgroundColor: "#0F4C3A" },
  });

export const errorToast = (msg) =>
  toast.error(msg, {
    style: { backgroundColor: "#FFF4F4", color: "#D32F2F", fontWeight: 600 },
    progressStyle: { backgroundColor: "#D32F2F" },
  });
