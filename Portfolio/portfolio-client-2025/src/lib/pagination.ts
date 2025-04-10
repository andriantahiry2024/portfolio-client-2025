/**
 * Utilitaire pour la pagination côté client
 */

/**
 * Pagine un tableau de données
 * @param data Tableau de données à paginer
 * @param currentPage Page actuelle (commence à 1)
 * @param pageSize Nombre d'éléments par page
 * @returns Les éléments de la page actuelle
 */
export function paginateData<T>(data: T[], currentPage: number, pageSize: number): T[] {
  const startIndex = (currentPage - 1) * pageSize;
  return data.slice(startIndex, startIndex + pageSize);
}

/**
 * Calcule le nombre total de pages
 * @param totalItems Nombre total d'éléments
 * @param pageSize Nombre d'éléments par page
 * @returns Nombre total de pages
 */
export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.ceil(totalItems / pageSize);
}

/**
 * Filtre un tableau de données en fonction d'une chaîne de recherche
 * @param data Tableau de données à filtrer
 * @param searchValue Chaîne de recherche
 * @param searchFields Champs sur lesquels effectuer la recherche
 * @returns Tableau filtré
 */
export function filterData<T>(
  data: T[],
  searchValue: string,
  searchFields: (keyof T)[]
): T[] {
  if (!searchValue.trim()) {
    return data;
  }
  
  const lowerCaseSearch = searchValue.toLowerCase();
  
  return data.filter(item => {
    return searchFields.some(field => {
      const value = item[field];
      if (value === null || value === undefined) {
        return false;
      }
      return String(value).toLowerCase().includes(lowerCaseSearch);
    });
  });
}

/**
 * Trie un tableau de données en fonction d'un champ
 * @param data Tableau de données à trier
 * @param sortField Champ sur lequel effectuer le tri
 * @param sortDirection Direction du tri ('asc' ou 'desc')
 * @returns Tableau trié
 */
export function sortData<T>(
  data: T[],
  sortField: keyof T | null,
  sortDirection: 'asc' | 'desc' | null
): T[] {
  if (!sortField || !sortDirection) {
    return data;
  }
  
  return [...data].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];
    
    // Gestion des valeurs null ou undefined
    if (valueA === null || valueA === undefined) return sortDirection === 'asc' ? -1 : 1;
    if (valueB === null || valueB === undefined) return sortDirection === 'asc' ? 1 : -1;
    
    // Comparaison en fonction du type
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    
    // Comparaison numérique par défaut
    return sortDirection === 'asc'
      ? (valueA < valueB ? -1 : valueA > valueB ? 1 : 0)
      : (valueA < valueB ? 1 : valueA > valueB ? -1 : 0);
  });
}

/**
 * Applique la pagination, le filtrage et le tri à un tableau de données
 * @param data Tableau de données
 * @param options Options de pagination, filtrage et tri
 * @returns Objet contenant les données paginées et des informations sur la pagination
 */
export function processTableData<T>(
  data: T[],
  options: {
    currentPage: number;
    pageSize: number;
    searchValue?: string;
    searchFields?: (keyof T)[];
    sortField?: keyof T | null;
    sortDirection?: 'asc' | 'desc' | null;
    filters?: Record<string, any>;
    filterFn?: (item: T, filters: Record<string, any>) => boolean;
  }
): {
  paginatedData: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
} {
  const {
    currentPage,
    pageSize,
    searchValue = '',
    searchFields = [],
    sortField = null,
    sortDirection = null,
    filters = {},
    filterFn
  } = options;
  
  // Appliquer les filtres personnalisés si fournis
  let filteredData = filterFn
    ? data.filter(item => filterFn(item, filters))
    : data;
  
  // Appliquer la recherche
  if (searchValue && searchFields.length > 0) {
    filteredData = filterData(filteredData, searchValue, searchFields);
  }
  
  // Appliquer le tri
  if (sortField && sortDirection) {
    filteredData = sortData(filteredData, sortField, sortDirection);
  }
  
  // Calculer le nombre total de pages
  const totalItems = filteredData.length;
  const totalPages = getTotalPages(totalItems, pageSize);
  
  // Appliquer la pagination
  const paginatedData = paginateData(filteredData, currentPage, pageSize);
  
  return {
    paginatedData,
    totalItems,
    totalPages,
    currentPage,
    pageSize
  };
}
