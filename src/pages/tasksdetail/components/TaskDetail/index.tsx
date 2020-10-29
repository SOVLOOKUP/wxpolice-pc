import React from 'react'
import { getdata } from './data';
import { Link } from 'react-router-dom';
import { Button, Field, Table, Card, Pagination, Icon, List, Collapse, Divider, Tag } from '@alifd/next';
import { PaginatedResult } from 'ahooks/lib/useFusionTable';
import styles from './index.module.scss';

interface ColumnWidth {
    id: number;
    task_name: number;
    target_id: number;
    submiter_name: number;
    deadline: number;
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
    submiter_name: 180,
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
// dataIndex="status"
const cellStatus = (...args: any[]): React.ReactNode => {
  const color = ((args[0])===0 ? "red" : "green")
  const sty = ((args[0])!==1 ? "primary" : "normal")
  var msg = ((args[0])===1 ? "已确认" : "未确认")
  if ((args[0])===2) {
    var msg = "已完成"
  }

  console.log(args)
  return (
      <div>
      <Tag type={sty} color={color}>
        {msg}
      </Tag>
      </div>
  );
};



const TaskDetailTable: React.Fc = () => {
    
    const { loading, error, data, fetchMore } = getdata()
    
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log(data)
    // todo
    const sort = (dataIndex: String, order: String) => undefined
    const filter = (filterParams: Object) => undefined
    const tableProps = {
      dataSource:data.wxpolice_wx_collects,
      loading:loading,
      onSort: sort,
      onFilter: filter,
    }

    const loadMore = () => {
      fetchMore({ 
          variables: { offset: data.wxpolice_wx_collects.length},
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) { return previousResult; }
            return Object.assign({}, previousResult, {
              // 将新的 feed 结果追加到旧的 feed 结果
              wxpolice_wx_collects: [...previousResult.wxpolice_wx_collects, ...fetchMoreResult.wxpolice_wx_collects],
            });
          },
        })
    }

    return (
      <div classID={styles.container}>
        <Card free>
        <Card.Content>
          {/* todo 筛选 */}
        </Card.Content>
        <Divider dashed={true}/>
        </Card>
        <Card free>
          <Card.Content>
            <Table
              {...tableProps}
              primaryKey="id"
            >
              <Table.Column title="反馈ID" dataIndex="id" resizable width={columnWidth.id} />
              <Table.Column title="提交人" dataIndex="submiter_name" resizable width={columnWidth.submiter_name} />
              <Table.Column title="提交时间" dataIndex="submit_time" resizable width={columnWidth.task_name} />
              <Table.Column title="状态" dataIndex="status" resizable width={columnWidth.target_id} cell={cellStatus}/>
              <Table.Column title="操作" resizable width={columnWidth.submiter_name} cell={cellOperation} />
            </Table>
            <br/>
            显示{data.wxpolice_wx_collects.length}/{data.wxpolice_wx_collects_aggregate.aggregate.count}条记录
            <Card.Content >
            <Button type="primary" onClick={loadMore}>加载更多</Button>
            </Card.Content>
            
          </Card.Content>
        </Card>
    </div>
    )
  }

export default TaskDetailTable