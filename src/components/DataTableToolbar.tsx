import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableToolbarProps {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchClear: () => void;
  filters?: {
    name: string;
    options: { label: string; value: string }[];
    value: string;
    onChange: (value: string) => void;
  }[];
}

const DataTableToolbar: React.FC<DataTableToolbarProps> = ({
  searchPlaceholder = "Rechercher...",
  searchValue,
  onSearchChange,
  onSearchClear,
  filters = []
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 py-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 w-full"
        />
        {searchValue && (
          <Button
            variant="ghost"
            onClick={onSearchClear}
            className="absolute right-0 top-0 h-full aspect-square p-0"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Effacer la recherche</span>
          </Button>
        )}
      </div>
      
      {filters.map((filter) => (
        <div key={filter.name} className="min-w-[150px]">
          <Select
            value={filter.value}
            onValueChange={filter.onChange}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Filtrer par ${filter.name}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous</SelectItem>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
};

export default DataTableToolbar;
