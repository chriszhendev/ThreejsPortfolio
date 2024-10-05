export default function StickyHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-10 p-6">
      <div className="mx-auto py-2 px-2 flex justify-between items-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-md rounded-2xl border">
        <a href="#hero" className="fade-down-enter">
          <img src="" alt="c logo" className="w-[30px] h-[30px]" />
        </a>
        <nav className="flex-row gap-[20px] items-center justify-center hidden lg:flex ">
          <div className="font-medium fade-down-enter">
            <a href="#work">Work</a>
          </div>
          <div className="text-fontWhite hover:text-secondaryColor font-medium fade-down-enter">
            <a href="#projects">Projects</a>
          </div>
          <div className="text-fontWhite hover:text-secondaryColor font-medium fade-down-enter">
            <a href="#about">About Me</a>
          </div>
          <div className="text-fontWhite hover:text-secondaryColor font-medium fade-down-enter">
            <a href="#contact">Contact</a>
          </div>
          <div className="fade-down-enter">
            <a
              href="/ChrisZhenResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="font-bold px-[20px] py-[10px] border-2 border-secondaryColor rounded-md bg-darkPrimary hover:bg-lightPrimary text-white">
                Resume
              </button>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
