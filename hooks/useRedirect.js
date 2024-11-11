import { useSelector } from "react-redux";
import { selectToken } from "@/redux/slices/userSlice";
import { useEffect } from "react";
import { toast } from "sonner";

const useAuthRedirect = () => {
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token) {
      toast.error("You need to log in to view your saved cart", {
        duration: 4000,
        style: { background: "#F87171", color: "white" },
      });
    }
  }, [token]);

  return !!token;
};

export default useAuthRedirect;
