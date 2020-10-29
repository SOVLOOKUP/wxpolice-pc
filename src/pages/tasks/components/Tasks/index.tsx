import React from 'react'
import { getdata} from './data';
import { Link } from 'react-router-dom';
import { Button, Field, Table, Card, Pagination, Icon, List, Collapse, Divider } from '@alifd/next';
import { PaginatedResult } from 'ahooks/lib/useFusionTable';
import styles from './index.module.scss';

interface ColumnWidth {
    id: number;
    task_name: number;
    target_id: number;
    dispath_time: number;
    deadline: number;
};

interface Prop {
  pagesize: number;
};

export interface Result<Item> extends Omit<PaginatedResult<Item>, 'tableProps'> {
  paginationProps: {
      onChange: (current: number) => void;
      onPageSizeChange: (size: number) => void;
      current: number;
      pageSize: number;
      total: number;
  };
  tableProps: {
      dataSource: Item[];
      loading: boolean;
      onSort: (dataIndex: String, order: String) => void;
      onFilter: (filterParams: Object) => void;
  };
  search: {
      type: 'simple' | 'advance';
      changeType: () => void;
      submit: () => void;
      reset: () => void;
  };
}

const columnWidth: ColumnWidth = {
    id: 80,
    task_name: 200,
    target_id: 150,
    dispath_time: 180,
    deadline: 180
  };

const cellOperation = (...args: any[]): React.ReactNode => {
    return (
        <div>
        <Link to="/tasks/detail">
            <Button
                text
                type="primary"
                onClick={() =>  {}}
            >
                详情
            </Button>
        </Link>
        </div>
    );
};




const DispatchTaskTable: React.Fc = () => {
    
    const { loading, error, data, fetchMore } = getdata()
    
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log(data)
    // todo
    const sort = (dataIndex: String, order: String) => undefined
    const filter = (filterParams: Object) => undefined
    const tableProps = {
      dataSource:data.wxpolice_wx_tasks,
      loading:loading,
      onSort: sort,
      onFilter: filter,
    }

    const loadMore = () => {
      fetchMore({ 
          variables: { offset: data.wxpolice_wx_tasks.length},
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) { return previousResult; }
            return Object.assign({}, previousResult, {
              // 将新的 feed 结果追加到旧的 feed 结果
              wxpolice_wx_tasks: [...previousResult.wxpolice_wx_tasks, ...fetchMoreResult.wxpolice_wx_tasks],
            });
          },
        })
    }
    // const onPageSizeChange = (size: number) => undefined
    
    // const paginationProps = {
    //   onChange: onchange,
    //   onPageSizeChange: onPageSizeChange,
    //   current: 1,
    //   pageSize: pagesize,
    //   total: data.wxpolice_wx_tasks_aggregate.aggregate.count,
    // }

    return (
      <div classID={styles.container}>
        <Card free>
        <Card.Content>
        <Link to="/sendmsg" >
          <Button type="primary">
            增加任务
            <Icon type="add" />
          </Button>
        </Link>
        </Card.Content>
        <Divider dashed={true}/>
        </Card>
        <Card free>
          <Card.Content>
            <Table
              {...tableProps}
              primaryKey="id"
            >
              <Table.Column title="任务ID" dataIndex="id" resizable width={columnWidth.id} />
              <Table.Column title="任务名称" dataIndex="task_name" resizable width={columnWidth.task_name} />
              <Table.Column title="目标用户" dataIndex="target" resizable width={columnWidth.target_id} />
              <Table.Column title="派发时间" dataIndex="dispatch_time" resizable width={columnWidth.dispath_time} />
              <Table.Column title="截止时间" dataIndex="deadline" resizable width={columnWidth.deadline} />
              <Table.Column title="操作" resizable width={columnWidth.dispath_time} cell={cellOperation} />
            </Table>
            <br/>
            显示{data.wxpolice_wx_tasks.length}/{data.wxpolice_wx_tasks_aggregate.aggregate.count}条记录
            <Card.Content >
            <Button type="primary" onClick={loadMore}>加载更多</Button>
            </Card.Content>
            
          </Card.Content>
        </Card>
    </div>
    )
  }

export default DispatchTaskTable