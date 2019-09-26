import "./programs.scss";

import { ProgramDetails } from "gv-api-web";
import * as React from "react";
import { Table } from "shared/components/table/components";
import { ITableProps } from "shared/components/table/components/table";
import { TableToggleFavoriteHandlerType } from "shared/components/table/components/table.types";

import ProgramCard from "./program-card";
import ProgramTableHeaderCell from "./program-table-header-cell";
import ProgramTableRow from "./program-table-row";
import ProgramTableSortingValue from "./program-table-sorting";
import { PROGRAMS_COLUMNS } from "./programs.constants";

export const FAVORITE_COLUMN_NAME = "favorite";

interface IProgramsTableProps extends ITableProps {
  showRating?: boolean;
  currencies?: string[];
  data?: ProgramDetails[];
  toggleFavorite: TableToggleFavoriteHandlerType;
  isAuthenticated?: boolean;
  title: string;
  redirectToLogin?: () => void;
}

const ProgramsTable: React.FC<IProgramsTableProps> = ({
  renderMappings,
  disableTitle,
  columns,
  showRating,
  showSwitchView,
  currencies,
  data,
  sorting,
  updateSorting,
  filtering,
  updateFilter,
  renderFilters,
  paging,
  updatePaging,
  toggleFavorite,
  isAuthenticated,
  title
}) => {
  return (
    <Table
      renderMappings={renderMappings}
      disableTitle={disableTitle}
      title={title}
      showSwitchView={showSwitchView}
      sorting={sorting}
      filtering={filtering}
      updateFilter={updateFilter}
      updateSorting={updateSorting}
      paging={paging}
      updatePaging={updatePaging}
      columns={columns || PROGRAMS_COLUMNS}
      items={data}
      renderFilters={renderFilters}
      renderHeader={column => (
        <ProgramTableHeaderCell
          condition={
            !isAuthenticated ||
            (isAuthenticated && column.name !== FAVORITE_COLUMN_NAME)
          }
          column={column}
        />
      )}
      renderSorting={column => (
        <ProgramTableSortingValue
          condition={
            !isAuthenticated ||
            (isAuthenticated && column.name !== FAVORITE_COLUMN_NAME)
          }
          column={column}
        />
      )}
      renderBodyRow={(program: ProgramDetails) => (
        <ProgramTableRow
          showRating={Boolean(showRating)}
          title={title}
          program={program}
          toggleFavorite={toggleFavorite}
          isAuthenticated={Boolean(isAuthenticated)}
        />
      )}
      renderBodyCard={(program: ProgramDetails) => (
        <ProgramCard
          title={title}
          program={program}
          toggleFavorite={toggleFavorite}
        />
      )}
    />
  );
};

export default ProgramsTable;
