'use client';

// import { BranchesTable } from '@/widgets/branches-table';
import { CardsTable } from '@/widgets/cards-table';
import { KeysTable } from '@/widgets/keys-table';
import { UsersTable } from '@/widgets/users-table';

export const AdminHomePage = () => {
  return (
    <div className='flex flex-col gap-12'>
      {/* <BranchesTable /> */}
      <UsersTable />
      <KeysTable />
      <CardsTable />
    </div>
  );
};
