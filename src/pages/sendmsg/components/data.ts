import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import { request } from 'ice';

const baseurl = "https://v.gonorth.top:444"

const getdata = () => useQuery(gql`
query MyQuery {
  wxpolice_wx_form {
    form
    name
    id
  }
}
`);

const mutationdata = () => useMutation(gql`
mutation MyMutation($target:_int2!,$content:String!,$deadline:timestamp!,$task_name:String!,$template_id:bpchar!) {
  insert_wxpolice_wx_tasks(objects: {target: $target, content:$content, deadline: $deadline, task_name: $task_name, template_id: $template_id}) {
    returning {
      id
    }
  }
}
`)


async function getalluser()  {
  return await request(baseurl + `/alluser`);
}

async function getalltags()  {
  return await request(baseurl + `/alltags`);
}

async function gettagsuser(tagid:number)  {
  return await request(baseurl + `/tagsuser?tagid=` +tagid);
}

async function gettemplatelist()  {
  return await request(baseurl + `/templatelist`);
}

async function posttemplatemsg(data) {
  return await request.post(baseurl + `/oatemplate`,data)
}


export { getdata, getalltags, getalluser, gettagsuser, gettemplatelist, mutationdata, posttemplatemsg }