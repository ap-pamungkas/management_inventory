'use client';
import AdminLayout from "@/components/layout/Admin";
import Button from "@/components/ui/Button";

export default function ItemsPage() {
  return (
    <AdminLayout>
      <div className="card  shadow px-4 py-4 gap-2">
        <div className="card-header flex items-center justify-between outline-boo">
          <h1 className="text-2xl font-bold">Barang</h1>
          <button className="bg-blue-500 text-white mx-1 my-2 px-4 py-2 rounded">
            Tambah
          </button>
        </div>
        <hr />
        <div className="card-body mt-4">
          <div className="table-responsive overflow-x-auto ">
            <table className="table border-collapse w-full table-bordered">
              <thead>
                <tr>
                  <th className="w-2.5">No</th>
                  <th>Nama Barang</th>
                  <th>Jumlah</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Barang 1</td>
                  <td>10</td>
                  <td>
                   <Button label="Edit" onClick={() => alert("hahahahaha")} className="mx-1 my-2 bg-slate-500" />
                    <button className="bg-red-500 text-white mx-1 my-2 px-4 py-2 rounded">
                      Hapus
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
