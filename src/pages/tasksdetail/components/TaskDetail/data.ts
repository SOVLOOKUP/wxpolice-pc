import { useQuery, gql, useLazyQuery } from '@apollo/client';

const getdata = (offset:number = 0,limit:number = 20) => useQuery(gql`
query MyQuery($offset: Int!,$limit: Int!) {
  wxpolice_wx_collects(offset: $offset, limit: $limit) {
    id
    submiter_name
    submit_time
    status
  }
  wxpolice_wx_collects_aggregate {
    aggregate {
      count
    }
  }
}`,{
    variables: { 
      offset: offset,
      limit: limit
    },
  });

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

export { getdata }