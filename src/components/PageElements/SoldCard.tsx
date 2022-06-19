export default function SoldCard({ salesData, onClickConfirm, onClickCancel }) {

  
  const confirmButtonClickHandler = () => {
    onClickConfirm(salesData);
  }
  
  const cancelButtonClickHandler = () => {
    onClickCancel(salesData);
  }

  const statusBorder = salesData.isApproved !== null ? salesData.isApproved == true ? "border-green-400" : "border-red-400" : "border-orange-400"
  const statusBg = salesData.isApproved !== null ? salesData.isApproved == true ? "bg-green-400" : "bg-red-400" : "bg-orange-400"
  const actionStatus = salesData.isApproved !== null ? salesData.isApproved == true ? "Onaylanmış" : "Reddedilmiş" : "Aksiyon Bekliyor"
  const startingDate = new Date(salesData.startingDate)
  const finishDate = new Date(startingDate.getFullYear(), startingDate.getMonth(), startingDate.getDate() + salesData.totalDays)

  return (
    <div className={`border-2 relative overflow-hidden ${statusBorder} rounded-xl p-4`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">
          <span className="font-bold">{salesData.userBuyer.email}</span>
          <span> - {salesData.userBuyer.name}</span>
        </h1>
        <div className={`p-2 px-4 absolute right-0 top-0 ${statusBg} rounded-bl-xl text-white font-bold text-xs`}>{actionStatus}</div>
      </div>
      <hr />
      <div className="grid grid-cols-1 gap-2">
        <div className="mt-2 p-3 bg-slate-200 rounded-md">
          <p className="text-xl font-bold">{`${salesData.userCar.car.brand.name} ${salesData.userCar.car.name} ${salesData.userCar.car.package} ${salesData.userCar.year}`}</p>
          <p>Motor Hacmi: <span className="font-bold">{salesData.userCar.car.engineVolume}</span></p>
          <p className="mb-2">Yakıt Türü: <span className="font-bold">{salesData.userCar.car.fuelType.name}</span></p>
          <p className="font-bold">Açıklama: </p>
          <p>{salesData.userCar.car.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2 p-3 bg-slate-200 rounded-md">
          <div>
            <p>Kira Başlangıcı: <span className="font-bold">{startingDate.toLocaleDateString("tr")}</span></p>
            <p>Tahmini İade Tarihi : <span className="font-bold">{finishDate.toLocaleDateString("tr")}</span></p>
          </div>
          {salesData.isApproved == null ? (<div className="grid grid-cols-2 gap-3">
            <button onClick={confirmButtonClickHandler} className="bg-green-300 rounded-lg font-bold text-green-700 transition-all hover:bg-green-400">Onayla</button>
            <button onClick={cancelButtonClickHandler} className="bg-red-300 rounded-lg font-bold text-red-700 transition-all hover:bg-red-400">Reddet</button>
          </div>) : salesData.isApproved == true ? (<div className="grid grid-cols-1 gap-3">
            <button className="bg-green-300 rounded-lg font-bold text-green-700 transition-all hover:bg-green-400" disabled>Onaylanmış</button>
          </div>) : (<div className="grid grid-cols-1 gap-3">
            <button className="bg-red-300 rounded-lg font-bold text-red-700 transition-all hover:bg-red-400" disabled>Reddedilmiş</button>
          </div>)}
          
        </div>
      </div>
    </div>
  );
}
