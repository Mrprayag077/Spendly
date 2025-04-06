interface ProfileIconProps {
  name: string;
  width?: string;
  height?: string;
  fontSize?: string;
}

export const ProfileIcon = ({
  name,
  width = "2rem",
  height = "2rem",
  fontSize = "0.875rem",
}: ProfileIconProps) => {
  const getInitials = (fullName: string): string => {
    if (!fullName || typeof fullName !== "string") return "U";

    const parts = fullName.trim().split(" ").filter(Boolean);

    if (parts.length < 2) return parts[0][0]?.toUpperCase() ?? "U";

    const firstInitial = parts[0][0]?.toUpperCase() ?? "";
    const lastInitial = parts[parts.length - 1][0]?.toUpperCase() ?? "";
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <div
      className="inline-flex items-center justify-center rounded-full text-white font-semibold shadow-md uppercase transition-transform duration-200 hover:scale-105"
      style={{
        width,
        height,
        fontSize,
        background: "linear-gradient(135deg, #0277bd, #4dd0e1)",
      }}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
};
