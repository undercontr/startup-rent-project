export default function BoughtCard({ salesData }) {

  const statusGenerate = () => {
    if (salesData.isApproved !== null) {
      if (salesData.isApproved == true) {
        if (salesData.isFinished == true) {
          return { border: "border-blue-400", bg: "bg-blue-400", keyword: "Tamamlanmış" };
        }
        return {
          border: "border-green-400",
          bg: "bg-green-400",
          keyword: "Onaylanmış",
        };
      } else {
        return { border: "border-red-400", bg: "bg-red-400", keyword: "Reddedilmiş" };
      }
    } else {
      return {
        border: "border-orange-400",
        bg: "bg-orange-400",
        keyword: "Aksiyon Bekliyor",
      };
    }
  };

  const status = statusGenerate();
  const startingDate = new Date(salesData.startingDate);
  const finishDate = new Date(startingDate.getFullYear(), startingDate.getMonth(), startingDate.getDate() + salesData.totalDays);
  const salesDate = new Date(salesData.salesDate);
  return (
    <div className={`border-2 relative overflow-hidden ${status.border} rounded-xl p-4`}>
      <div className={`p-2 px-4 absolute right-0 top-0 ${status.bg} rounded-bl-xl text-white font-bold text-xs`}>
        {status.keyword}
      </div>
      <div className="mb-4">
        <h1 className="text-4xl">
          <span className="font-bold">{salesData.userSeller.email}</span>
          <span> - {salesData.userSeller.name}</span>
        </h1>
        <div className={`${status.bg} mt-2 p-1 px-3 inline-flex rounded-md text-lg text-white`}>
          <span>Günlük Tutar: </span>
          <b>{Intl.NumberFormat("tr-TR", { currency: "TRY", style: "currency" }).format(salesData.userCar.dailyHireRate)}</b>
          <span> - Toplam Tutar: </span>
          <b>
            {Intl.NumberFormat("tr-TR", { currency: "TRY", style: "currency" }).format(
              salesData.userCar.dailyHireRate * salesData.totalDays
            )}
          </b>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-1 gap-2">
        <div className="mt-2 p-3 bg-slate-200 rounded-md">
          <p className="text-xl font-bold">{`${salesData.userCar.car.brand.name} ${salesData.userCar.car.name} ${salesData.userCar.car.package} ${salesData.userCar.year}`}</p>
          <p>
            Motor Hacmi: <span className="font-bold">{salesData.userCar.car.engineVolume}</span>
          </p>
          <p className="mb-2">
            Yakıt Türü: <span className="font-bold">{salesData.userCar.car.fuelType.name}</span>
          </p>
          <p className="font-bold">Açıklama: </p>
          <p>{salesData.userCar.car.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2 p-5 items-center bg-slate-200 rounded-md">
          <div>
            <p>
              Tarih Aralığı:{" "}
              <span className="font-bold">
                {startingDate.toLocaleDateString("tr")} / {finishDate.toLocaleDateString("tr")}
              </span>
            </p>
            {salesData.salesDate && (
              <p className="text-green-600 font-bold">
                Satış Onay Tarihi : <span className="font-bold">{salesDate.toLocaleString("tr")}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
