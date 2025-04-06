import { login } from "@/store/authSlice/authSlice";
import {
  addTransaction,
  setBudget,
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
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const debouncedInit = debounce(async (user, dispatch) => {
  try {
    if (user.uuid) {
      const data = await fetchUserData(user.uuid);

      if (data) {
        dispatch(
          login({
            uuid: user.uuid,
            name: data.profile?.name || "User",
            // name: data.profile?.name || "User",
            email: data.profile?.email || "",
          })
        );

        Object.entries(
          data.transactions as Record<string, Transaction>
        ).forEach(([id, transaction]) => {
          dispatch(addTransaction({ id, transaction }));
        });

        dispatch(setBudget(data.profile.budget));

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

type updateProfileProps = {
  userUUID: string;
  profileData: Record<string, string | number>;
};

export const updateProfileP = async ({
  userUUID,
  profileData,
}: updateProfileProps) => {
  const response = await fetch(import.meta.env.VITE_BACKEND, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userUUID,
      action: "update_profile",
      profileData,
    }),
  });

  return response.json();
};

export type transactionApiProps = {
  action: "add_transaction" | "edit_transaction" | "delete_transaction";
  userUUID: string;
  transactionId: string;
  transactionData?: Partial<Transaction>;
};

export const transactionApi = async ({
  userUUID,
  action,
  transactionId,
  transactionData,
}: any) => {
  const response = await fetch(import.meta.env.VITE_BACKEND, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userUUID,
      action,
      transactionId,
      transactionData,
    }),
  });

  return response.json();
};
