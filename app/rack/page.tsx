"use client";
import AdminLayout from "@/components/layout/Admin";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";

export default function RackPage() {
  const handleAddRack = () => {
   
   alert("Tambah Rak");
  };
  return (
    <AdminLayout>
      {/* Card */}
      <Card
        title="Rak"
        additionalButton={
        <Button label="Tambah" onClick={handleAddRack} className="bg-blue-500 text-white mx-1 my-2 px-4 py-2 rounded" />
        }
      >
        {/* table  */}
        <Table>
          <thead>
            <tr>
              <th className="w-2.5">No</th>
              <th>Nama Rak</th>
              <th>Jumlah Barang</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>

              <td>Rak 1</td>
              <td>10</td>
              <td>
                <Button label="Edit" onClick={() => alert("Edit Rak")} className="mx-1 my-2 bg-slate-500" />
                <Button label="Hapus" onClick={() => alert("Hapus Rak")} className="mx-1 my-2 bg-red-500" />
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>

      
    </AdminLayout>
  );
}
