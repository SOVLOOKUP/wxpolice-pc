import { useQuery, gql, useLazyQuery } from '@apollo/client';

const getdata = () => useQuery(gql`
query MyQuery {
  wxpolice_wx_form {
    form
    name
    id
  }
}
`);


export { getdata }