import { useState } from "react";
import { FolderGit2, Github, Linkedin, UserRound, X } from "lucide-react";

const AboutMe = () => {
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div className="absolute bottom-4 right-8 ">
      <button
        className=" bg-indigo-600 rounded-3xl text-white items-center px-2 lg:px-3 py-2 
          transition-colors duration-200 shadow-sm font-medium text-xs lg:text-sm cursor-pointer
         "
        onClick={toggleLinks}
      >
        <FolderGit2 className="icon" />
      </button>

      {showLinks && (
        <div className="fixed inset-0 bg-black/75  bg-opacity-10 z-50 flex items-center justify-center">
          <div className="relative max-w-xl w-full mx-4">
            <div className="text-sm text-white bg-black p-4 rounded-lg shadow-lg">
              <button
                onClick={toggleLinks}
                className="absolute top-2 right-2 p-2 hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Close"
              >
                <X size={24} className="text-gray-300" />
              </button>

              <p className="mb-4 text-center font-semibold text-lg lg:text-xl">
                Developer Profile
              </p>
              <div className="flex flex-col items-center gap-6 bg-gray-800 p-6 rounded-lg shadow-xl">
                <div className="text-center text-white">
                  <a
                    className="text-xl hidden lg:inline-block font-semibold underline mb-2 hover:text-orange-400"
                    target="_blank"
                    href="https://prayag-bhosale.web.app.web.app/"
                    rel="noopener noreferrer"
                  >
                    About the Developer Profile
                  </a>
                  <div className="text-sm lg:text-md font-bold mt-2 text-[#f6d970]">
                    Tech Stack: Next.js, TypeScript, Firebase, TailwindCSS, API,
                    Toast
                    <p className="text-lg text-white my-2">#Features:</p>
                    <ul className="list-disc list-inside space-y-1 mt-2 font-normal text-gray-300 text-left">
                      <li>
                        Integrated
                        <span className="font-semibold text-white">
                          Realtime Database
                        </span>
                        for dynamic seat management.
                      </li>
                      <li>
                        Implemented
                        <span className="font-semibold text-white">
                          real-time seat booking and availability tracking
                        </span>
                        .
                      </li>
                      <li>
                        Secure user authentication with
                        <span className="font-semibold text-white">
                          Authentication
                        </span>
                        (Signup, Login, Logout, Reset).
                      </li>
                      <li>
                        Implemented a
                        <span className="font-semibold text-white">
                          loading spinner
                        </span>{" "}
                        for better UX during data fetching.
                      </li>
                      <li>
                        Toast notifications for
                        <span className="font-semibold text-white">
                          success, error, and warning
                        </span>{" "}
                        messages using React.
                      </li>
                      <li>
                        Designed a
                        <span className="font-semibold text-white">
                          {" "}
                          fully responsive UI
                        </span>{" "}
                        for seamless booking on desktop and mobile.
                      </li>
                      <li>
                        Provided an
                        <span className="font-semibold text-white">
                          {" "}
                          admin panel
                        </span>{" "}
                        to manually update seat reservations.
                      </li>
                      <li>
                        Implemented
                        <span className="font-semibold text-white">
                          {" "}
                          seat reset functionality
                        </span>{" "}
                        for easy management.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Social Links Section */}
                <div className="flex gap-4 justify-center">
                  <a
                    href="https://www.linkedin.com/in/prayagbhosale22/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center w-14 h-14 bg-blue-700 hover:bg-blue-600 rounded-full transition-all duration-300"
                    title="LinkedIn"
                  >
                    <Linkedin className="icon-md" />
                  </a>
                  <a
                    href="https://github.com/Mrprayag077/AeroPath"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center w-14 h-14 bg-black hover:bg-gray-700 rounded-full transition-all duration-300"
                    title="GitHub"
                  >
                    <Github className="icon-md" />
                  </a>
                  <a
                    href="https://prayag-bhosale.web.app.web.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center w-14 h-14 bg-indigo-600 hover:bg-indigo-500 rounded-full transition-all duration-300"
                    title="Portfolio"
                  >
                    <UserRound className="icon-md" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutMe;
