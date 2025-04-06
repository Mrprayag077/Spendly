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
