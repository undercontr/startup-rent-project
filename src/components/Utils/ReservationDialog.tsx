import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function ReservationDialog({ isOpen = true, closeModal, onClickReservation, reservationData }) {
  const [rentPeriod, setRentPeriod] = useState(1);
  const [totalAmount, setTotalAmount] = useState(reservationData.dailyHireRate || 0);

  const dayInputChangeHandler = (e) => {
    if (e.target.value > 30) {
      e.target.value = 30;
    }
    const result = e.target.value.replace(/\D/g, "");

    setRentPeriod(result);
    setTotalAmount(Number(result) * reservationData.dailyHireRate);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-md leading-6 text-gray-900">
                    <span>{reservationData.user?.email} kullanıcısına ait</span>
                    <br />
                    <span className="font-bold text-xl text-gray-900">
                      {`${reservationData.car?.brand.name} ${reservationData.car?.name} ${reservationData.car?.package} ${reservationData.year}`}
                    </span>
                  </Dialog.Title>
                  <hr />
                  <div className="my-2">
                    <label htmlFor="">Kiralamak istediğiniz gün sayısı</label>
                    <input type="text" className="border-2 rounded-md border-gray-300 p-2" onChange={dayInputChangeHandler} />
                  </div>
                  <div className="mt-5">
                    <p className="text-sm text-gray-700 text-justify">
                      Bu aracı <b>{reservationData.totalDistance?.toLocaleString("tr")}</b> kilometrede{" "}
                      <b>{reservationData.user?.email}</b> kullanıcısından <b>{rentPeriod}</b> gün süre ile kiralamak istediğinize
                      emin misiniz?
                    </p>
                  </div>

                  <div className="flex justify-start items-center gap-5 mt-5">
                    <button
                      type="button"
                      className={`rounded-md bg-green-500 px-4 py-2 text-sm font-bold text-white hover:bg-green-700 transition-all ${rentPeriod == 0 ? "opacity-30" : null}`}
                      onClick={onClickReservation}
                      disabled={rentPeriod == 0 ? true : false}
                    >
                      Rezervasyon Yap ({Intl.NumberFormat("tr-TR", { currency: "TRY", style: "currency" }).format(totalAmount)})
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 transition-all"
                      onClick={(e) => {
                        setRentPeriod(0)
                        setTotalAmount(0)
                        closeModal(e)
                      }}
                    >
                      Vazgeç
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
