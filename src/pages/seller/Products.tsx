import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Upload,
  FileSpreadsheet,
  Download,
  X,
  Check,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useUIStore } from '@/stores/uiStore';
import { products } from '@/data/products';
import { parseCSV, generateCSVTemplate, type CSVProductRow } from '@/lib/csvImport';

export function SellerProducts() {
  const { addToast } = useUIStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Import state
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [parsedProducts, setParsedProducts] = useState<CSVProductRow[]>([]);
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const itemsPerPage = 10;

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const result = parseCSV(content);
      setParsedProducts(result.products);
      setImportErrors(result.errors);
    };
    reader.readAsText(file);
  };

  // Handle import
  const handleImport = async () => {
    if (parsedProducts.length === 0) return;
    
    setImporting(true);
    
    // Simulate import (in real app, call productService.importProducts)
    setTimeout(() => {
      addToast({
        type: 'success',
        title: 'Importación completada',
        message: `${parsedProducts.length} productos importados exitosamente`,
      });
      setImportDialogOpen(false);
      setParsedProducts([]);
      setImportErrors([]);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setImporting(false);
    }, 1500);
  };

  // Download template
  const downloadTemplate = () => {
    const template = generateCSVTemplate();
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantilla_productos.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter products (in real app, filter by company_id)
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleDelete = (productId: string) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      addToast({
        type: 'success',
        title: 'Producto eliminado',
        message: 'El producto ha sido eliminado exitosamente',
      });
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const configs: Record<string, { label: string; color: string }> = {
      active: { label: 'Activo', color: 'bg-green-100 text-green-700' },
      draft: { label: 'Borrador', color: 'bg-gray-100 text-gray-700' },
      out_of_stock: { label: 'Sin Stock', color: 'bg-red-100 text-red-700' },
      discontinued: { label: 'Descontinuado', color: 'bg-yellow-100 text-yellow-700' },
    };
    const config = configs[status] || configs.draft;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const lowStockCount = products.filter(p => p.quantity < 50).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 sm:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/seller/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Mis Productos</h1>
          </div>
          <Button className="bg-violet-600 hover:bg-violet-700" onClick={() => setImportDialogOpen(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Importar
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Producto
          </Button>
        </div>
      </header>

      <main className="p-4 sm:p-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Total Productos</p>
              <p className="text-2xl font-bold">{products.length}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Activos</p>
              <p className="text-2xl font-bold text-green-600">
                {products.filter(p => p.status === 'active').length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Stock Bajo</p>
              <p className="text-2xl font-bold text-red-600">{lowStockCount}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Vistas Hoy</p>
              <p className="text-2xl font-bold text-violet-600">1,234</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Buscar por nombre o SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-violet-500"
                >
                  <option value="all">Todos los estados</option>
                  <option value="active">Activos</option>
                  <option value="draft">Borradores</option>
                  <option value="out_of_stock">Sin Stock</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Producto</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">SKU</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Precio</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Stock</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Estado</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Ventas</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images?.[0]?.url}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded-lg"
                            loading="lazy"
                          />
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            {product.quantity < 50 && (
                              <p className="text-xs text-red-600 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Stock bajo
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{product.sku}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-medium">${product.price.toFixed(2)}</span>
                          {product.compare_at_price && (
                            <span className="text-xs text-gray-400 line-through">
                              ${product.compare_at_price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${product.quantity < 50 ? 'text-red-600' : ''}`}>
                          {product.quantity}
                        </span>
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(product.status)}</td>
                      <td className="py-3 px-4 text-sm">{product.sales_count}</td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Ver
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(product.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t">
                <p className="text-sm text-gray-500">
                  Mostrando {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredProducts.length)} de {filteredProducts.length}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar producto?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. El producto será eliminado permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5" />
              Importar Productos desde CSV
            </DialogTitle>
            <DialogDescription>
              Sube un archivo CSV con tus productos. La primera fila debe contener los encabezados.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Download Template */}
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={downloadTemplate}>
                <Download className="w-4 h-4 mr-2" />
                Descargar Plantilla
              </Button>
            </div>

            {/* File Input */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload" className="cursor-pointer">
                <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  {selectedFile ? selectedFile.name : 'Haz clic para seleccionar un archivo CSV'}
                </p>
              </label>
            </div>

            {/* Preview */}
            {parsedProducts.length > 0 && (
              <div className="max-h-60 overflow-auto border rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left">Nombre</th>
                      <th className="px-3 py-2 text-left">SKU</th>
                      <th className="px-3 py-2 text-left">Precio</th>
                      <th className="px-3 py-2 text-left">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedProducts.slice(0, 10).map((product, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="px-3 py-2">{product.name}</td>
                        <td className="px-3 py-2">{product.sku}</td>
                        <td className="px-3 py-2">${product.price}</td>
                        <td className="px-3 py-2">{product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {parsedProducts.length > 10 && (
                  <p className="text-xs text-gray-500 p-2">
                    Mostrando 10 de {parsedProducts.length} productos
                  </p>
                )}
              </div>
            )}

            {/* Errors */}
            {importErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm font-medium text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Errores encontrados:
                </p>
                <ul className="text-xs text-red-600 mt-1 space-y-1">
                  {importErrors.slice(0, 5).map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                  {importErrors.length > 5 && (
                    <li>...y {importErrors.length - 5} errores más</li>
                  )}
                </ul>
              </div>
            )}

            {/* Summary */}
            {parsedProducts.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-600" />
                {parsedProducts.length} productos listos para importar
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleImport} 
              disabled={parsedProducts.length === 0 || importing}
            >
              {importing ? (
                <>
                  Importando...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Importar {parsedProducts.length} Productos
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
