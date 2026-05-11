"use client"
import BreadCrumb from '../../../components/bread-crumb'
import TableGrid from '../../../components/table-grid'
import FilterComponent from '../../../components/filter/base-filter'
import ModalRightForm from '../../../components/modal-right-form/modal-right-form'
import { User, UserList, UserFilters } from '../../../services/users/types'
import { userService } from '../../../services/users/userService'
import { DefaultFilter } from '@/src/app/services/filter/types'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import { DefaultForm } from '@/src/app/services/form/types'
import { TableAction, TableColumn } from '@/src/app/services/table/types'

const UserListPage = () => {

  const [tableData, setTableData] = useState<UserList>({ data: [], pagination: { currentPage: 1, totalPages: 1 } })
  const [isTableDataLoading, setIsTableDataLoading] = useState<boolean>(true)
  const [searchFilters, setSearchFilters] = useState<UserFilters>({})
  
  const addNewUserRef = useRef<HTMLButtonElement>(null)
  const tableColumns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Cargo' }
  ]

  const tableActions: TableAction<User>[] = [
    { label: 'Editar', action: handleUpdate},
    { label: 'Deletar', action: handleDelete},
  ]

  const filters: DefaultFilter = [
    { label: 'Nome', type: 'text', fieldName: 'name'},
    { label: 'Email', type: 'text', fieldName: 'email'},
    { label: 'Cargo', type: 'select', fieldName: 'role', options: [
      { value: 1, label: 'User' },
      { value: 2, label: 'Admin' }
    ]}
  ]

  const userForm: DefaultForm = [
    { label: 'Nome', type: 'text', fieldName: 'name', required: true},
    { label: 'Email', type: 'text', fieldName: 'email', required: true},
    { label: 'Senha', type: 'password', fieldName: 'password', required: true},
    { label: 'Cargo', type: 'select', fieldName: 'role', options: [
      { value: 1, label: 'User' },
      { value: 2, label: 'Admin' }
    ], required: true},
  ]

  function handleUpdate(data: User) {
    console.log('Editar usuario', data);
  }

  function handleDelete(data: User) {
    console.log('Deletar usuario', data);
  }

  function handleCreate(data: User) {
    console.log('Criar novo usuario', data);
  }

  function filterAction(filters: UserFilters) {
    setIsTableDataLoading(true);
    userService.list(filters).then((users) => {
      setTableData(users);
    }).finally(() => {
      setSearchFilters(filters);
      setIsTableDataLoading(false);
    });
  }

  useEffect(() => {
    userService.list().then((users) => {
      setTableData(users);
      setIsTableDataLoading(false);
    })
  }, []);

  return (
    <div className='page'>
      <div className='bread-crumb'>
        <BreadCrumb path={['Lista de Usuarios']} link={['/user/list']} />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <FilterComponent
          fields={filters}
          filterAction={ filterAction }
          loading={isTableDataLoading}
        />
      </div>
      <ModalRightForm 
        title='Adicionar Novo Usuario'
        btnToLink={addNewUserRef}
        form={userForm}
        btnAction={handleCreate}
      />
      <div className="grid grid-cols-1 gap-3 pb-3">
        <Button
          className='btn-new'
          variant="outline"
          onClick={() => addNewUserRef.current?.click()}
        >
          + Adicionar Usuario
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <TableGrid
          columns={tableColumns}
          data={tableData.data}
          actions={tableActions}
          emptyLabel='Nenhum usuario encontrado'
          isLoading={isTableDataLoading}
          pagination={tableData.pagination && {
            currentPage: tableData.pagination.currentPage,
            totalPages: tableData.pagination.totalPages,
            onPageChange: (page: number) => {
              const updatedFilters = { ...searchFilters, page };
              setSearchFilters(updatedFilters);
              filterAction(updatedFilters);
            }
          }}
        />
      </div>
    </div>
  )
}

export default UserListPage