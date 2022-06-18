export default function SoldCard({ salesData, onClickConfirm, onClickCancel }) {

  const confirmButtonClickHandler = () => {
    onClickConfirm(salesData);
  }

  const cancelButtonClickHandler = () => {
    onClickCancel(salesData);
  }

  return (
    <div className="border-2 border-blue-500 rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">
          <span className="font-bold">onder.alkan15@gmail.com</span>
          <span> - Önder ALKAN</span>
        </h1>
        <div className="p-2 px-4 bg-orange-400 text-white font-bold text-xs rounded-full">Aksiyon Bekliyor</div>
      </div>
      <hr />
      <div className="grid grid-cols-1 gap-2">
        <div className="mt-2 p-3 bg-slate-200 rounded-md">
          <p className="text-xl font-bold">Renault Clio Joy 2020</p>
          <p>Motor Hacmi: <span className="font-bold">1401</span></p>
          <p className="mb-2">Yakıt Türü: <span className="font-bold">Dizel</span></p>
          <p className="font-bold">Açıklama: </p>
          <p>Bagaj hacmi: 150 lt</p>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2 p-3 bg-slate-200 rounded-md">
          <div>
            <p>Kira Başlangıcı: <span className="font-bold">{new Date().toLocaleDateString("tr")}</span></p>
            <p>Tahmini İade Tarihi : <span className="font-bold">{new Date().toLocaleDateString("tr")}</span></p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={confirmButtonClickHandler} className="bg-green-300 rounded-lg font-bold text-green-700 transition-all hover:bg-green-400">Onayla</button>
            <button onClick={cancelButtonClickHandler} className="bg-red-300 rounded-lg font-bold text-red-700 transition-all hover:bg-red-400">Reddet</button>
          </div>
        </div>
      </div>
    </div>
  );
}
