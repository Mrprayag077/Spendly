export const ProfileIcon = ({
  name,
  width = "2.5rem",
  height = "2.5rem",
  fontSize = "0.875rem",
}: any) => {
  const getInitials = (name: string = "") => {
    const parts = name.trim().split(" ");
    const firstInitial = parts[0]?.[0]?.toUpperCase() || "";
    const lastInitial =
      parts.length > 1 ? parts[parts.length - 1]?.[0]?.toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full text-white font-medium shadow-md uppercase transition-transform duration-200 ease-in-out hover:scale-105`}
      style={{
        background: "linear-gradient(135deg, #0277bd, #4dd0e1)",
        fontSize,
        width,
        height,
      }}
    >
      {getInitials(name)}
    </div>
  );
};
