import findMe from "../../assets/findMe.png";

export default function Content() {
  return (
    <div class="flex-1 flex justify-center items-center">
      <img
        src={findMe}
        alt="Find me picture."
        class="h-full w-auto auto-contain"
      />
    </div>
  );
}
