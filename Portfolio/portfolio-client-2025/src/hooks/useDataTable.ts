import { useState, useEffect, useMemo } from 'react';
import { processTableData } from '@/lib/pagination';

interface UseDataTableOptions<T> {
  data: T[];
  defaultPageSize?: number;
  defaultSearchFields?: (keyof T)[];
  defaultSortField?: keyof T | null;
  defaultSortDirection?: 'asc' | 'desc' | null;
  filterFn?: (item: T, filters: Record<string, any>) => boolean;
}

/**
 * Hook personnalisé pour gérer les fonctionnalités d'une table de données
 * (pagination, recherche, tri, filtrage)
 */
export function useDataTable<T>({
  data,
  defaultPageSize = 10,
  defaultSearchFields = [],
  defaultSortField = null,
  defaultSortDirection = null,
  filterFn
}: UseDataTableOptions<T>) {
  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  
  // État pour la recherche
  const [searchValue, setSearchValue] = useState('');
  const [searchFields] = useState<(keyof T)[]>(defaultSearchFields);
  
  // État pour le tri
  const [sortField, setSortField] = useState<keyof T | null>(defaultSortField);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(defaultSortDirection);
  
  // État pour les filtres
  const [filters, setFilters] = useState<Record<string, any>>({});
  
  // Réinitialiser la page courante lorsque les filtres, la recherche ou la taille de page changent
  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, pageSize, filters]);
  
  // Traiter les données avec pagination, recherche, tri et filtrage
  const {
    paginatedData,
    totalItems,
    totalPages
  } = useMemo(() => {
    return processTableData(data, {
      currentPage,
      pageSize,
      searchValue,
      searchFields,
      sortField,
      sortDirection,
      filters,
      filterFn
    });
  }, [data, currentPage, pageSize, searchValue, searchFields, sortField, sortDirection, filters, filterFn]);
  
  // Fonction pour changer de page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Fonction pour changer la taille de page
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Revenir à la première page
  };
  
  // Fonction pour changer la valeur de recherche
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };
  
  // Fonction pour effacer la recherche
  const handleSearchClear = () => {
    setSearchValue('');
  };
  
  // Fonction pour changer le tri
  const handleSortChange = (field: keyof T) => {
    // Si on clique sur le même champ, on change la direction
    if (field === sortField) {
      setSortDirection(prev => {
        if (prev === 'asc') return 'desc';
        if (prev === 'desc') return null;
        return 'asc';
      });
    } else {
      // Sinon, on trie par le nouveau champ en ordre ascendant
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Fonction pour mettre à jour un filtre
  const handleFilterChange = (name: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Fonction pour réinitialiser tous les filtres
  const handleResetFilters = () => {
    setFilters({});
    setSearchValue('');
    setSortField(defaultSortField);
    setSortDirection(defaultSortDirection);
    setCurrentPage(1);
  };
  
  return {
    // Données et état de pagination
    data: paginatedData,
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    
    // État de recherche
    searchValue,
    
    // État de tri
    sortField,
    sortDirection,
    
    // État des filtres
    filters,
    
    // Gestionnaires d'événements
    handlePageChange,
    handlePageSizeChange,
    handleSearchChange,
    handleSearchClear,
    handleSortChange,
    handleFilterChange,
    handleResetFilters
  };
}
