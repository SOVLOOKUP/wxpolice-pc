import React from 'react'
import { getdata, getdetaildata } from './data';
import { Link } from 'react-router-dom';
import { Button, Field, Table, Card, Pagination, Icon, List, Collapse, Divider, Dialog } from '@alifd/next';
import { PaginatedResult } from 'ahooks/lib/useFusionTable';
import styles from './index.module.scss';
import { useBoolean, useSetState } from 'ahooks';
import useUrlState from '@ahooksjs/use-url-state';
import { resultKeyNameFromField } from '@apollo/client/utilities';
import { Typography } from '@alifd/next';

const { H1, H2, Paragraph, Text } = Typography;

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
  console.log(args)
  const url = "/tasks/detail/" + args[0][2].id
  return (
    <div>
      <Link to={url} >
        <Button
          text
          type="primary"
          // todo link to iddetailpage
          onClick={() => { console.log(args[0][2].id) }}
        >
          反馈
            </Button>
      </Link>
        &nbsp;|&nbsp;
      <Button
        text
        type="primary"
        onClick={() => {
          console.log(args[0][2].id)
          // setdeatilData
          args[2](
            {
              variables: {
                id: args[0][2].id,
              },
            }
          )

          // toggle
          args[1]()
        }}
      >
        详情
            </Button>
    </div>
  );
};

type detaildata = {
  content: string
  deadline: number
  dispatch_time: number
  feedback_id: string
  target: Array<number>
  task_name: string
  template_data: object
  template_id: number
  id: number
}

type resultData = {
  wxpolice_wx_tasks: Array<detaildata>
}

type result = {
  loading: boolean
  data: resultData
}

const DetailDialog: React.Fc = (props: { visible: any; onclose: any; result: result; }) => {
  const { visible, onclose, result } = props

  if (result.loading) return <p>Loading...</p>;

  try {
    let data = result.data.wxpolice_wx_tasks[0]

    const commonProps = {
      title: data.task_name,
      // style: { width: 300 },
      subTitle: data.id,
      extra: data.target.map((a) => {
        return <Button text type="primary">{a}&nbsp;</Button>
      })
      ,
    };

    return (
      <Dialog title="任务详情"
        visible={visible}
        // width="auto"
        closeable={true}
        onClose={onclose}
        onOk={onclose}
        footerActions={['ok']}
        shouldUpdatePosition={true}

      >
        <Card free>
          <Card.Content>
            <Card free>
              <Card.Header {...commonProps} />
              <Card.Divider />
              <Card.Content>
                <H2>推送时间</H2>
                <Paragraph>
                  {data.dispatch_time}
                </Paragraph>

                <H2>截止时间</H2>
                <Paragraph>
                  {data.deadline}
                </Paragraph>

                <H2>内容</H2>
                <Paragraph>
                  {data.content}
                </Paragraph>

                <H2>模板数据</H2>
                <Paragraph>
                  {
                    JSON.stringify(
                      data.template_data
                    )
                  }
                </Paragraph>

              </Card.Content>

            </Card>



          </Card.Content>
        </Card>
      </Dialog>
    )
  } catch (error) {
    return <div></div>
  }



}

const DispatchTaskTable: React.Fc = () => {

  const { loading, error, data, fetchMore } = getdata()
  const [visible, { toggle, setTrue, setFalse }] = useBoolean(false)
  let [getddata, result] = getdetaildata()
  // const [detaildata, setData] = useSetState();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data)
  // todo
  const sort = (dataIndex: String, order: String) => undefined
  const filter = (filterParams: Object) => undefined
  const tableProps = {
    dataSource: data.wxpolice_wx_tasks,
    loading: loading,
    onSort: sort,
    onFilter: filter,
  }

  const loadMore = () => {
    fetchMore({
      variables: { offset: data.wxpolice_wx_tasks.length },
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
          <Link to="/tasks/sendmsg" >
            <Button type="primary">
              增加任务
            <Icon type="add" />
            </Button>
          </Link>
        </Card.Content>
        <Divider dashed={true} />
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
            <Table.Column title="操作" resizable width={columnWidth.dispath_time} cell={(...args) => (cellOperation(args, toggle, getddata))} />
          </Table>
          <br />
            显示{data.wxpolice_wx_tasks.length}/{data.wxpolice_wx_tasks_aggregate.aggregate.count}条记录
            <Card.Content >
            <Button type="primary" onClick={loadMore}>加载更多</Button>
          </Card.Content>

        </Card.Content>
      </Card>
      <DetailDialog visible={visible} onclose={setFalse} result={result} />
    </div>
  )
}

export default DispatchTaskTable