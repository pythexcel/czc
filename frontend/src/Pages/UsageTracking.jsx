const UsageTracking = () => {
  return (
    <>
      <div className="p-6">
        <div className="flex justify-between">
          <h6 className="font-bold  text-[#344767] text-3xl">Usage Tracking</h6>
        </div>
        <div className="w-full mt-6 bg-slate-50 shadow-lg  bg-opacity-17 rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 ">
                <th className="py-4 text-xl text-[#8392AB]">LOCATION NAME</th>
                <th className="py-4 text-xl px-4 text-[#8392AB]">
                  TOTAL MESSAGES
                </th>
                <th className="py-4 text-xl px-4 text-[#8392AB]">
                  BOOKING BOT
                </th>
                <th className="py-4 text-xl px-4 text-[#8392AB]">
                  NON BOOKING BOT
                </th>
                <th className="py-4 text-xl px-4 text-[#8392AB]">
                  LAST UPDATED
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 px-4 text-2xl text-center text-[#8392AB]">
                  180 Transformation
                </td>
                <td className="py-4 px-4 text-2xl text-center text-[#8392AB]">
                  220
                </td>
                <td className="py-4 px-4 text-2xl text-center text-[#8392AB]">
                  0
                </td>
                <td className="py-4 px-4 text-2xl text-center text-[#8392AB]">
                  220
                </td>
                <td className="py-4 px-4 text-2xl text-center text-[#8392AB]">
                  10/16/2023 11:26 pm
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UsageTracking;
