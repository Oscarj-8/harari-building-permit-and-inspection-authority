import FileList from "../FileList";

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-center text-2xl text-slate-700 my-7">Files List</h1>
      <FileList />
    </div>
  );
}
