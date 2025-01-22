import { useState } from 'react';
import { Camera, Search, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Inventory {
  total_quantity: number;
  reserved_quantity: number;
  available_quantity: number;
}

interface ScannedProduct {
  barcode: string;
  name: string;
  description: string;
  category: string;
  stores: {
    [storeId: string]: Inventory;
  };
}

const BarcodeScanner = () => {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<ScannedProduct | null>(null);

  const sampleProduct: ScannedProduct = {
    barcode: "barcode123",
    name: "Produit Example",
    description: "Description du produit",
    category: "Alimentation",
    stores: {
      "store1": {
        total_quantity: 50,
        reserved_quantity: 2,
        available_quantity: 48,
      },
    },
  };

  const handleSearch = () => {
    if (barcodeInput === "barcode123") {
      setScannedProduct(sampleProduct);
    }
  };

  const handleScanClick = () => {
    setIsScanning(!isScanning);
  };

  const clearSearch = () => {
    setBarcodeInput('');
    setScannedProduct(null);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-xl font-semibold">
            Scanner de Code-barres
            <button
              onClick={handleScanClick}
              className={`p-3 rounded-full transition ${
                isScanning ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
              }`}
            >
              <Camera className="h-6 w-6" />
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                placeholder="Entrez barcode123"
                className="w-full p-4 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {barcodeInput && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              )}
            </div>
            <button
              onClick={handleSearch}
              className="p-4 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              <Search className="h-6 w-6" />
            </button>
          </div>

          {isScanning && (
            <div className="bg-gray-100 rounded-lg p-6 text-center mb-6">
              <div className="text-lg text-gray-600">Camera active</div>
              <div className="border-2 border-dashed border-gray-400 h-48 flex items-center justify-center mt-4">
                <p className="text-gray-500">Zone de scan</p>
              </div>
            </div>
          )}

          {scannedProduct && (
            <div className="bg-green-50 p-6 rounded-lg space-y-4">
              <h3 className="font-bold text-lg">{scannedProduct.name}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Code-barres</p>
                  <p className="font-mono">{scannedProduct.barcode}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Catégorie</p>
                  <p>{scannedProduct.category}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Inventaire par magasin</h4>
                {Object.entries(scannedProduct.stores).map(([storeId, inventory]) => (
                  <div key={storeId} className="grid grid-cols-3 gap-4 text-sm">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="font-semibold">Total</div>
                      <div>{inventory.total_quantity}</div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <div className="font-semibold">Réservé</div>
                      <div>{inventory.reserved_quantity}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="font-semibold">Disponible</div>
                      <div>{inventory.available_quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BarcodeScanner;
