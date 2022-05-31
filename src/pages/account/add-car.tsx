export default function AddCar(props) {
  return (
    <div className="py-3 container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold">Araç Ekle</h1>
        <button className="bg-blue-500 rounded-md py-1 px-5 text-white font-bold hover:bg-blue-800 transition-colors duration-150">
          Ekle
        </button>
      </div>
      <div className="my-3 p-4 rounded-xl border-2 border-blue-500">
          <div>
              <label className="block" htmlFor="">Marka</label>
              <select className="border-2 py-1 px-3 border-blue-500 rounded-md">
                  <option value="asda">sada</option>
              </select>
          </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      cars: [],
    },
  };
}
