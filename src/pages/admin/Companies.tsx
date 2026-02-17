import { useState, useEffect } from 'react';
import { 
  Store, 
  Search, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  DollarSign,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { supabase } from '@/lib/supabase';
import type { Company } from '@/types';

export function AdminCompanies() {
  const { hasRole } = useAuthStore();
  const { addToast } = useUIStore();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showCommissionDialog, setShowCommissionDialog] = useState(false);
  const [newCommission, setNewCommission] = useState<number>(5);

  // Check if user is admin
  const isAdmin = hasRole(['super_admin', 'company_admin']);

  useEffect(() => {
    fetchCompanies();
  }, [statusFilter]);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setCompanies(data || []);
    } catch (error: any) {
      console.error('Error fetching companies:', error);
      addToast({
        type: 'error',
        title: 'Error',
        message: 'No se pudieron cargar las empresas',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (companyId: string) => {
    try {
      const { error } = await supabase.rpc('update_company_status', { 
        company_id: companyId, 
        new_status: 'verified' 
      });

      if (error) throw error;

      if (error) throw error;

      addToast({
        type: 'success',
        title: 'Empresa aprobada',
        message: 'La empresa ahora puede operar en la plataforma',
      });

      fetchCompanies();
    } catch (error: any) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'No se pudo aprobar la empresa',
      });
    }
  };

  const handleReject = async (companyId: string) => {
    try {
      const { error } = await supabase.rpc('update_company_status', { 
        company_id: companyId, 
        new_status: 'suspended' 
      });

      if (error) throw error;

      if (error) throw error;

      addToast({
        type: 'success',
        title: 'Empresa rechazada',
        message: 'La solicitud ha sido rechazada',
      });

      fetchCompanies();
    } catch (error: any) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'No se pudo rechazar la empresa',
      });
    }
  };

  const handleSuspend = async (companyId: string) => {
    try {
      const { error } = await supabase.rpc('update_company_status', { 
        company_id: companyId, 
        new_status: 'suspended' 
      });

      if (error) throw error;

      if (error) throw error;

      addToast({
        type: 'success',
        title: 'Empresa suspendida',
        message: 'La empresa ha sido suspendida temporalmente',
      });

      fetchCompanies();
    } catch (error: any) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'No se pudo suspender la empresa',
      });
    }
  };

  const handleUpdateCommission = async () => {
    if (!selectedCompany) return;

    try {
      const { error } = await supabase.rpc('update_company_commission', { 
        company_id: selectedCompany.id, 
        new_commission: newCommission 
      });

      if (error) throw error;

      if (error) throw error;

      addToast({
        type: 'success',
        title: 'Comisión actualizada',
        message: `La comisión de ${selectedCompany.name} es ahora ${newCommission}%`,
      });

      setShowCommissionDialog(false);
      fetchCompanies();
    } catch (error: any) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'No se pudo actualizar la comisión',
      });
    }
  };

  const openCommissionDialog = (company: Company) => {
    setSelectedCompany(company);
    setNewCommission(company.commission_rate || 5);
    setShowCommissionDialog(true);
  };

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.tax_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: companies.length,
    active: companies.filter(c => c.status === 'verified').length,
    pending: companies.filter(c => c.status === 'pending').length,
    suspended: companies.filter(c => c.status === 'suspended').length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500">Activa</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pendiente</Badge>;
      case 'suspended':
        return <Badge className="bg-red-500">Suspendida</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-500">Inactiva</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (!isAdmin) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Acceso Denegado</h2>
        <p className="text-gray-600">No tienes permisos para acceder a esta sección.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Empresas</h1>
          <p className="text-gray-600">Gestiona los vendedores de la plataforma</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Empresas</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Store className="w-8 h-8 text-violet-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Activas</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Suspendidas</p>
                <p className="text-2xl font-bold text-red-600">{stats.suspended}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre, email o RFC..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendientes</option>
              <option value="active">Activas</option>
              <option value="suspended">Suspendidas</option>
              <option value="inactive">Inactivas</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Companies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Empresas</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Cargando...</div>
          ) : filteredCompanies.length === 0 ? (
            <div className="text-center py-8">
              <Store className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No se encontraron empresas</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>RFC</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Comisión</TableHead>
                  <TableHead>Ventas</TableHead>
                  <TableHead>Calificación</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                          {company.logo_url ? (
                            <img src={company.logo_url} alt={company.name} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <Store className="w-5 h-5 text-violet-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{company.name}</p>
                          <p className="text-sm text-gray-500">{company.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{company.tax_id || '-'}</TableCell>
                    <TableCell>{getStatusBadge(company.status)}</TableCell>
                    <TableCell>
                      <span className="font-medium">{company.commission_rate || 5}%</span>
                    </TableCell>
                    <TableCell>{company.total_sales || 0}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>⭐ {company.rating || 0}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(company.created_at).toLocaleDateString('es-MX')}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedCompany(company);
                            setShowDetailDialog(true);
                          }}>
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openCommissionDialog(company)}>
                            <DollarSign className="w-4 h-4 mr-2" />
                            Cambiar Comisión
                          </DropdownMenuItem>
                          {company.status === 'pending' && (
                            <>
                              <DropdownMenuItem onClick={() => handleApprove(company.id)}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Aprobar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReject(company.id)}>
                                <XCircle className="w-4 h-4 mr-2" />
                                Rechazar
                              </DropdownMenuItem>
                            </>
                          )}
                          {company.status === 'verified' && (
                            <DropdownMenuItem onClick={() => handleSuspend(company.id)}>
                              <XCircle className="w-4 h-4 mr-2" />
                              Suspender
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles de la Empresa</DialogTitle>
          </DialogHeader>
          {selectedCompany && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-violet-100 rounded-xl flex items-center justify-center">
                  {selectedCompany.logo_url ? (
                    <img src={selectedCompany.logo_url} alt={selectedCompany.name} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <Store className="w-10 h-10 text-violet-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedCompany.name}</h3>
                  <p className="text-gray-600">{selectedCompany.slug}</p>
                  {getStatusBadge(selectedCompany.status)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedCompany.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="font-medium">{selectedCompany.phone || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">RFC</p>
                  <p className="font-medium">{selectedCompany.tax_id || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sitio Web</p>
                  <p className="font-medium">{selectedCompany.website || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Comisión</p>
                  <p className="font-medium">{selectedCompany.commission_rate || 5}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ventas Totales</p>
                  <p className="font-medium">{selectedCompany.total_sales || 0}</p>
                </div>
              </div>

              {selectedCompany.description && (
                <div>
                  <p className="text-sm text-gray-500">Descripción</p>
                  <p className="font-medium">{selectedCompany.description}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500">Fecha de Registro</p>
                <p className="font-medium">{new Date(selectedCompany.created_at).toLocaleString('es-MX')}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Commission Dialog */}
      <Dialog open={showCommissionDialog} onOpenChange={setShowCommissionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar Comisión</DialogTitle>
            <DialogDescription>
              Establece la comisión que cobra la plataforma por cada venta de {selectedCompany?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="block text-sm font-medium mb-2">
              Porcentaje de Comisión (%)
            </label>
            <Input
              type="number"
              min="0"
              max="100"
              value={newCommission}
              onChange={(e) => setNewCommission(Number(e.target.value))}
            />
            <p className="text-sm text-gray-500 mt-2">
              Ejemplo: 5% significa que por cada $100 de venta, la plataforma cobra $5
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCommissionDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateCommission}>
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
