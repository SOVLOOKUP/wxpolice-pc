import React from 'react';
import PageHeader from '@/components/PageHeader';
import { ResponsiveGrid } from '@alifd/next';
import DispathTaskTable from './components/Tasks'

const { Cell } = ResponsiveGrid;

const Tasks = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          title="任务管理"
          breadcrumbs={[{ name: '任务中心' }]}
          description='查看已推送任务，发布新的任务。'
        />
      </Cell>

      <Cell colSpan={12}>
        <DispathTaskTable/>
      </Cell>
    </ResponsiveGrid>
  );
};

export default Tasks;
