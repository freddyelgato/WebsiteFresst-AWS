import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          <ProductList />
        </main>
      </div>
    </div>
  );
}
