import { dummyDatt } from "@/assets/data/dummyData";
import { login } from "@/store/authSlice/authSlice";
import {
  addTransaction,
  Transaction,
} from "@/store/transactionSlice/transactionSlice";
import { debounce } from "@/utils/debounce";
import { toast } from "sonner";

export const fetchUserData = async (uuid: string) => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userUUID: uuid,
        action: "get",
      }),
    });

    if (!response.ok) throw new Error("Failed to fetch data");

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const debouncedInit = debounce(async (user, dispatch) => {
  try {
    if (user.uuid) {
      const data = dummyDatt;
      // await fetchUserData(user.uuid);

      if (data) {
        dispatch(
          login({
            uuid: user.uuid,
            name: data.profile?.name || "User",
            email: data.profile?.email || "",
          })
        );

        Object.entries(data.transactions).forEach(([id, transaction]) => {
          dispatch(addTransaction({ id, transaction }));
        });

        console.log(data);
        toast.success("data fetched successfully!!");
      }
    } else {
      console.log("No UUID");
    }
  } catch (err) {
    console.log(err);
    toast.error("Error occurred");
  }
}, 300);
