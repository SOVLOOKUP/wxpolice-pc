import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// 使用 Ant Design 风格
import FormRender from 'form-render/lib/antd';
import { Button, Card } from '@alifd/next';
import { getdata } from './data';
// 使用 Fusion 风格
// import FormRender from 'form-render/lib/fusion';
// import '@alifd/next/dist/next.min.css';

function Template() {
    const {loading, data, error} = getdata()
  const [formData, setData] = useState({});
  const [valid, setValid] = useState([]);
  const [showValidate, setShowValidate] = useState(false);

  // todo:推送功能、修改数据功能
  const onSubmit = () => {
    // valid 是校验判断的数组，valid 长度为 0 代表校验全部通过
    setShowValidate(true);
    if (valid.length > 0) {
      alert(`校验未通过字段：${valid.toString()}`);
    } else {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;


  return (
    <div>
    <Card free>
    <Card.Content>
    <FormRender
        {...data.wxpolice_wx_form[0].form}
        formData={formData}
        onChange={setData}
        onValidate={setValid}
        showValidate={showValidate}
      />
        <Button type="primary" onClick={onSubmit}>提交</Button>
        </Card.Content>
    </Card>
    
    </div>
  );
}
export default Template;