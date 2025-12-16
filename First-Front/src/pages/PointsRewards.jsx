import React, { useEffect, useState } from "react";
import { authStore } from "../store/authStore";
import { useTransactionStore } from "../store/transactionStore";
import bgImage from "../assets/pagebg.jpeg"; // background image
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading"; // your existing Loading component

export default function Rewards() {
  const { authData } = authStore();
  const {
    myTransactions,
    loading,
    error,
    fetchMyTransactions,
    fetchAllTransactions,
    redeemPoints,
  } = useTransactionStore();

  const [openModal, setOpenModal] = useState(false);
  const [redeeming, setRedeeming] = useState(false);

  useEffect(() => {
    fetchMyTransactions();
    fetchAllTransactions();
  }, [fetchMyTransactions, fetchAllTransactions]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const totalPoints =
    myTransactions?.reduce(
      (acc, txn) => acc + (txn.pointsEarned - txn.pointsRedeemed),
      0
    ) || 0;

  const handleConfirmRedeem = async () => {
    setRedeeming(true);
    const res = await redeemPoints({ points: totalPoints });
    setRedeeming(false);
    setOpenModal(false);

    if (res) {
      toast.success("Points redeemed successfully!");
      fetchMyTransactions();
    } else {
      toast.error("Failed to redeem points");
    }
  };

  if (loading && !redeeming) return <Loading />;

  return (
    <div className="w-full relative">
      {/* Hero Section */}
      <div className="relative w-full min-h-[420px] sm:min-h-[500px] bg-gradient-to-br from-[#AFD2E5] to-[#AFD2E5] text-black">
        <div className="flex flex-col lg:flex-row items-center justify-between h-full px-4 sm:px-6 lg:px-12 py-8 sm:py-10">
          <div className="flex flex-col justify-center max-w-full lg:max-w-[600px] space-y-4 sm:space-y-6 lg:ml-14 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug">
              Let's redeem your points!
            </h1>
            <div className="px-6 sm:px-8 lg:px-10 py-5 sm:py-6 rounded-2xl shadow-lg w-full max-w-[590px] bg-gradient-to-r from-[#0D8AFE] to-[#DA89FF]">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-1 sm:mb-2">
                Welcome, {authData?.name || "User"}
              </h2>
              <p className="text-base sm:text-lg opacity-80">
                View your points, charts, and rewards goal
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center mt-4 sm:mt-6 lg:mt-0 lg:mr-14">
            <img
              src="/trophy.png"
              alt="Trophy"
              className="w-[180px] sm:w-[240px] lg:w-[280px] h-auto drop-shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Background Section after Hero */}
      <div
        className="w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        {/* Overlay for readability */}
        <div className="bg-black/25">
          {/* Total Points Section */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 p-4 sm:p-6 lg:p-10 justify-center">
            <div className="flex flex-col items-center justify-center p-6 sm:p-8 min-h-[220px] sm:h-[300px] rounded-xl shadow-lg w-full lg:w-[486px] cursor-pointer bg-gradient-to-br from-[#BFA2FF] to-[#BFA2FF]">
              <h3 className="text-black text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Total Points</h3>
              <p className="text-black text-4xl sm:text-5xl font-bold mb-5 sm:mb-6">{totalPoints}</p>
              <button
                onClick={() => {
                  if (totalPoints > 0) setOpenModal(true);
                  else toast.info("No points to redeem!");
                }}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-black font-semibold text-base sm:text-lg cursor-pointer bg-gradient-to-r from-[#0D8AFE] to-[#DA89FF]"
              >
                Redeem points
              </button>
            </div>
          </div>

          {/* Recent Transactions Section */}
          <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 lg:p-10 justify-center items-center">
            <div className="w-full max-w-[1260px] h-[54px] sm:h-[60px] flex items-center px-5 sm:px-6 rounded-xl shadow-lg bg-gradient-to-br from-[#632F97] to-[#632F97] bg-opacity-30">
              <h3 className="text-white text-base sm:text-lg font-semibold">Recent Transactions</h3>
            </div>

            <div className="w-full max-w-[1260px] rounded-xl shadow-lg p-4 sm:p-6 overflow-x-auto bg-gradient-to-br from-[#632F97] to-[#632F97]">
              <h3 className="text-white text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Transaction Summary</h3>
              <div className="grid grid-cols-3 text-white font-medium text-sm sm:text-lg border-b border-white/40 pb-2 min-w-[500px]">
                <span>Date</span>
                <span>Amount</span>
                <span>Points Earned</span>
              </div>
              {myTransactions?.map((txn) => (
                <div
                  key={txn.id}
                  className="grid grid-cols-3 text-white text-sm sm:text-base py-2 sm:py-3 border-b border-white/20 min-w-[500px]"
                >
                  <span>{new Date(txn.date).toLocaleDateString()}</span>
                  <span>₹{txn.billAmount || 0}</span>
                  <span>{txn.pointsEarned - txn.pointsRedeemed}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Redeem Modal */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-8 w-[90%] max-w-md text-center">
            <h2 className="text-2xl font-semibold mb-4 text-[#1C2C46]">Redeem Points</h2>
            <p className="text-[#5E6C84] mb-6">
              You have{" "}
              <span className="font-bold text-[#ED7D31]">{totalPoints}</span>{" "}
              points. Do you want to redeem them now?
            </p>

            <div className="flex justify-center gap-6">
              <button
                onClick={() => setOpenModal(false)}
                className="px-6 py-2 rounded-md bg-gray-300 text-[#1C2C46] font-semibold hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRedeem}
                disabled={redeeming}
                className="px-6 py-2 rounded-md bg-gradient-to-r from-[#4D60E2] to-[#8A7CFB] text-black font-semibold hover:opacity-90 disabled:opacity-50"
              >
                {redeeming ? "Redeeming..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
