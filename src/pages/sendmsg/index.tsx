import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
// import TaskDetailTable from './components/form-render'
import PageHeader from '@/components/PageHeader';
import Template from './components';

const { Cell } = ResponsiveGrid;

const Sendmsg = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          title="任务管理"
          breadcrumbs={[{ name: '任务中心' },{ name: '任务推送' }]}
          description='推送新任务'
        />
    </Cell>
      <Cell colSpan={12}>
        <Template></Template>
        {/* <TaskDetailTable/> */}
      </Cell>
    </ResponsiveGrid>
  );
};

export default Sendmsg;
