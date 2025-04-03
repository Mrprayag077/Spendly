const SummaryCard = ({ title, value, icon, bgColor, textColor }: any) => {
  return (
    <div className={`p-6 rounded-xl shadow-sm ${bgColor}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`mt-2 text-3xl font-bold ${textColor}`}>${value}</p>
        </div>
        <div className="p-3 rounded-full bg-white shadow-sm">{icon}</div>
      </div>
    </div>
  );
};

export default SummaryCard;
