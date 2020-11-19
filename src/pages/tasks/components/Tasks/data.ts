import { useQuery, gql, useLazyQuery } from '@apollo/client';

const getdata = (offset:number = 0,limit:number = 10) => useQuery(gql`
  query MyQuery($offset: Int!,$limit: Int!) {
    wxpolice_wx_tasks_aggregate {
      aggregate {
        count
      }
    }
    wxpolice_wx_tasks(offset: $offset, limit: $limit,order_by: {id: desc}) {
      id
      task_name
      target
      dispatch_time
      deadline
    }
  }`,{
    variables: { 
      offset: offset,
      limit: limit
    },
  });

const getdetaildata = () => useLazyQuery(gql`
query MyQuery($id: Int!) {
  wxpolice_wx_tasks(where: {id: {_eq: $id}}) {
    content
    deadline
    dispatch_time
    feedback_id
    target
    task_name
    template_data
    template_id
    id
  }
}`);


  
// const lazygetdata = (offset:number = 0,limit:number = 10) => useLazyQuery(gql`
//   query MyQuery($offset: Int!,$limit: Int!) {
//     wxpolice_wx_tasks_aggregate {
//       aggregate {
//         count
//       }
//     }
//     wxpolice_wx_tasks(offset: $offset, limit: $limit) {
//       id
//       task_name
//       target
//       dispatch_time
//       deadline
//     }
//   }`,{
//     variables: { 
//       offset: offset,
//       limit: limit
//     },
// });

// let getCount = () => useQuery(gql`
//   query MyQuery($offset: Int!,$limit: Int!) {
//     wxpolice_wx_tasks_aggregate {
//       aggregate {
//         count
//       }
//     }
//   }`);

export { getdata,getdetaildata }