// function for the header component
function Header() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className=" text-[#5409DA] bg-[#8DD8FF]/40 backdrop-brightness-90 my-4 px-5 rounded-2xl border-2 text-3xl backdrop-saturate-125 cursor-pointer drop-shadow-xl/50 text-center py-4 font-extrabold transition duration-500 hover:-translate-y-2 w-fit">
          TODO<span className="text-white">List</span>
        </div>
      </div>
    </>
  );
}

export default Header;
