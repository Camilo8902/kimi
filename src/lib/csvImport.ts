/**
 * CSV Import Utility for Products
 * Parses CSV files and converts them to product data
 */

export interface CSVProductRow {
  name: string;
  description: string;
  short_description?: string;
  sku: string;
  price: number;
  compare_at_price?: number;
  cost_price?: number;
  quantity: number;
  min_quantity: number;
  weight?: number;
  category: string;
  tags?: string;
  status: string;
}

export interface ImportResult {
  success: boolean;
  products: CSVProductRow[];
  errors: string[];
  totalRows: number;
  validRows: number;
}

/**
 * Parse a CSV string into product rows
 */
export function parseCSV(csvContent: string): ImportResult {
  const lines = csvContent.trim().split('\n');
  const errors: string[] = [];
  const products: CSVProductRow[] = [];

  if (lines.length < 2) {
    return {
      success: false,
      products: [],
      errors: ['El archivo CSV está vacío o no tiene encabezados'],
      totalRows: 0,
      validRows: 0,
    };
  }

  // Parse header
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));
  
  // Validate required headers
  const requiredHeaders = ['name', 'description', 'sku', 'price', 'quantity'];
  const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
  
  if (missingHeaders.length > 0) {
    return {
      success: false,
      products: [],
      errors: [`Faltan columnas requeridas: ${missingHeaders.join(', ')}`],
      totalRows: 0,
      validRows: 0,
    };
  }

  // Get column indices
  const getIndex = (name: string) => headers.findIndex(h => h === name);

  // Parse data rows
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    try {
      // Simple CSV parsing - handles basic cases
      const values = parseCSVLine(line);
      
      if (values.length < requiredHeaders.length) {
        errors.push(`Fila ${i + 1}: No tiene suficientes columnas`);
        continue;
      }

      const name = values[getIndex('name')]?.trim();
      const description = values[getIndex('description')]?.trim();
      const sku = values[getIndex('sku')]?.trim();
      const priceStr = values[getIndex('price')]?.trim();
      const quantityStr = values[getIndex('quantity')]?.trim();

      // Validate required fields
      if (!name) {
        errors.push(`Fila ${i + 1}: Falta el nombre`);
        continue;
      }
      if (!description) {
        errors.push(`Fila ${i + 1}: Falta la descripción`);
        continue;
      }
      if (!sku) {
        errors.push(`Fila ${i + 1}: Falta el SKU`);
        continue;
      }

      const price = parseFloat(priceStr || '0');
      const quantity = parseInt(quantityStr || '0', 10);

      if (isNaN(price) || price < 0) {
        errors.push(`Fila ${i + 1}: Precio inválido`);
        continue;
      }
      if (isNaN(quantity) || quantity < 0) {
        errors.push(`Fila ${i + 1}: Cantidad inválida`);
        continue;
      }

      // Parse optional fields
      const compare_at_price = values[getIndex('compare_at_price')] ? 
        parseFloat(values[getIndex('compare_at_price')]) : undefined;
      const cost_price = values[getIndex('cost_price')] ? 
        parseFloat(values[getIndex('cost_price')]) : undefined;
      const min_quantity = values[getIndex('min_quantity')] ? 
        parseInt(values[getIndex('min_quantity')], 10) : 1;
      const weight = values[getIndex('weight')] ? 
        parseFloat(values[getIndex('weight')]) : undefined;

      const product: CSVProductRow = {
        name,
        description,
        short_description: values[getIndex('short_description')]?.trim() || undefined,
        sku,
        price,
        compare_at_price: isNaN(compare_at_price || 0) ? undefined : compare_at_price,
        cost_price: isNaN(cost_price || 0) ? undefined : cost_price,
        quantity,
        min_quantity: isNaN(min_quantity) ? 1 : min_quantity,
        weight: isNaN(weight || 0) ? undefined : weight,
        category: values[getIndex('category')]?.trim() || 'general',
        tags: values[getIndex('tags')]?.trim() || undefined,
        status: (values[getIndex('status')]?.trim() || 'active').toLowerCase(),
      };

      products.push(product);
    } catch (err) {
      errors.push(`Fila ${i + 1}: Error al procesar - ${err}`);
    }
  }

  return {
    success: products.length > 0,
    products,
    errors,
    totalRows: lines.length - 1,
    validRows: products.length,
  };
}

/**
 * Parse a CSV line handling quoted values
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

/**
 * Generate a sample CSV template
 */
export function generateCSVTemplate(): string {
  return `name,description,short_description,sku,price,compare_at_price,cost_price,quantity,min_quantity,weight,category,tags,status
"Producto de Ejemplo","Descripción detallada del producto","Descripción corta","SKU-001",99.99,129.99,50.00,100,1,0.5,electronics,"tag1,tag2",active
"Otro Producto","Otra descripción","Corta","SKU-002",49.99,,25.00,50,1,0.3,clothing,"sale",draft`;
}

/**
 * Validate product data before import
 */
export function validateProduct(product: CSVProductRow): string[] {
  const errors: string[] = [];

  if (!product.name || product.name.length < 3) {
    errors.push('El nombre debe tener al menos 3 caracteres');
  }
  if (!product.description || product.description.length < 10) {
    errors.push('La descripción debe tener al menos 10 caracteres');
  }
  if (!product.sku || product.sku.length < 3) {
    errors.push('El SKU debe tener al menos 3 caracteres');
  }
  if (product.price <= 0) {
    errors.push('El precio debe ser mayor a 0');
  }
  if (product.quantity < 0) {
    errors.push('La cantidad no puede ser negativa');
  }
  if (product.min_quantity < 1) {
    errors.push('La cantidad mínima debe ser al menos 1');
  }

  const validStatuses = ['active', 'draft', 'out_of_stock', 'discontinued'];
  if (product.status && !validStatuses.includes(product.status)) {
    errors.push(`Estado inválido. Debe ser: ${validStatuses.join(', ')}`);
  }

  return errors;
}
