import Image from "next/image";

export default function LinaSirch() {
  return (
    <div className="min-h-[calc(100svh-93px)] ">
      <div className="flex flex-col items-center justify-center ">
        <div className="w-[95vw] footerXM:w-[90vw] footerSM:w-[85vw] sm:w-[80vw] xxl:w-[900px] flex flex-col items-center">
          <h1 className="mt-12 text-4xl text-center">
            In Memory of Lina Sirch
          </h1>
          <div className="mt-10 text-lg md:text-xl text-black flex flex-col">
            <div className="flex flex-col sev:flex-row justify-center items-center gap-6 sev:gap-0">
              <p className="">
                Lina Sirch (b 1930 - Kiev) passed away on Feb 21, 2024. She was
                mother of Julie Sirch-Brandon (Утка) and lifelong friend of the
                Los Angeles chapter of St George Pathfinders, an international
                Russian scouting organization.
              </p>
              <Image
                src="/lina-sirch.jpg"
                className="mx-16"
                width={220}
                height={320}
                alt="Lina Sirch"
              />
            </div>
            <p className="mt-6">
              Services will be as follows:
              <br />
              <span className="ml-6">
                March 21 - Panehida at Holy Transfiguration Russian Orthodox
                Cathedral (Fountain Church)
              </span>
              <br />
              <span className="ml-6">
                March 22 - Funeral at Fountain Church and Internment at Forest
                Lawn Hollywood Hills
              </span>
            </p>
            <p className="mt-6">
              Julie asks that in lieu of flowers donations be made to St George
              Pathfinders.
            </p>
          </div>
          <a
            href="https://razvedchik.square.site/"
            target="_blank"
            className="bg-blue text-white rounded-lg transition-colors duration-200 text-2xl
         py-1 px-3 whitespace-nowrap shadow-md hover:shadow-lg cursor-pointer hover:bg-blueHover mt-8 mb-6"
          >
            Donate
          </a>
        </div>
      </div>
    </div>
  );
}
