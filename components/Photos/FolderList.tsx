import { useEffect } from "react";

export default function FolderList({ folderList, folder, setFolder }: any) {
  console.log(folderList);

  useEffect(() => {
    if (!folder) {
      setFolder(folderList[0]);
    }
  });

  return (
    <div className="flex flex-col items-center text-xl gap-2">
      {folderList.map((name: string, index: number) => (
        <button
          onClick={() => setFolder(name)}
          key={index}
          className={`underline cursor-pointer text-3xl ${
            folder === name && "text-blue"
          } `}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
