'use client';
import { useTheme } from 'next-themes';
import { IoSunnySharp, IoMoonSharp } from 'react-icons/io5';

export const ThemeButton = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const changeTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };
  return (
    <div>
      <button
        onClick={changeTheme}
        type="button"
        aria-label="Toggle Dark Mode"
        className="dark:hover:bg-bg-dark-accent m-2 mr-0 rounded-md p-2 transition-all hover:bg-gray-100"
      >
        {theme === 'light' ? (
          <>
            <IoMoonSharp className=" h-5 w-5" />
          </>
        ) : (
          <>
            <IoSunnySharp className=" h-5 w-5" />
          </>
        )}
      </button>
    </div>
  );
};
