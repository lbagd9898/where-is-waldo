export default function ServerError() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="flex flex-col border-4 justify-center items-center border-[#E7CD78] p-4 font-harryPotter text-[#E7CD78] bg-[#00001b] gap-3 text-xl">
        <p>We are unable to access our servers at this time.</p>
        <p>Please try again later.</p>
      </div>
    </div>
  );
}
