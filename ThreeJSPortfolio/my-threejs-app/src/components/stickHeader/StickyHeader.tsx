import { useDispatch } from "react-redux";
import { setPlayerState, AnimationName } from "../../store/playerState"; // Adjust the import path as needed

export default function StickyHeader() {
  const dispatch = useDispatch();

  // Define menu items with id, label, and associated animation
  const menuItems = [
    { id: "work", label: "Work", animation: "Work" },
    { id: "projects", label: "Projects", animation: "Projects" },
    { id: "about", label: "About Me", animation: "About" },
    { id: "contact", label: "Contact", animation: "Contact" },
  ];

  // Handler to change the playerState
  const handleButtonClick = (id: string) => {
    console.log("BUTTON PRESSED", id);
    const item = menuItems.find((menuItem) => menuItem.id === id);
    if (item && item.animation) {
      dispatch(setPlayerState(item.animation as AnimationName));
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-10 p-6">
      <div className="mx-auto py-2 px-2 flex justify-between items-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-md rounded-2xl border">
        <button
          onClick={() => handleButtonClick("hero")}
          className="fade-down-enter"
        >
          <img src="" alt="c logo" className="w-[30px] h-[30px]" />
        </button>
        <nav className="flex-row gap-[20px] items-center justify-center hidden lg:flex ">
          {menuItems.map((item) => (
            <div key={item.id} className="font-medium fade-down-enter">
              <button
                onClick={() => handleButtonClick(item.id)}
                className="cursor-pointer text-fontWhite hover:text-secondaryColor focus:outline-none"
              >
                {item.label}
              </button>
            </div>
          ))}
          <div className="fade-down-enter">
            <button
              className="font-bold px-[20px] py-[10px] border-2 border-secondaryColor rounded-md bg-darkPrimary hover:bg-lightPrimary text-white"
              onClick={() => handleButtonClick("resume")}
            >
              Resume
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
