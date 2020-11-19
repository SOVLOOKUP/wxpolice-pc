import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// 使用 Ant Design 风格
import FormRender from 'form-render/lib/antd';
import { Button, Card, Dialog, Progress } from '@alifd/next';
import { getalltags, getdata, gettagsuser, posttemplatemsg, mutationdata } from './data';
// 使用 Fusion 风格
// import FormRender from 'form-render/lib/fusion';
// import '@alifd/next/dist/next.min.css';
import { Notification, NumberPicker } from '@alifd/next';
import { useBoolean } from 'ahooks';


const openNotification = (type,percent) => {
  // const [percent , setpercent] = useState(0)

    const args = {
        title: '推送任务进度',
        content: <Card free>
        <Card.Content>
        <Progress percent={percent} progressive shape="circle" size="large" />
        </Card.Content>
    </Card>
        ,
        duration:0,
        type
        // type:'notice',
    };
    Notification.open(args);
};

const DetailDialog: React.Fc = (props) => {
  const { visible, onclose, percent } = props
    return (
      <Dialog title="任务推送中"
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
          <Progress percent={percent} progressive shape="circle" size="large" />
          </Card.Content>
        </Card>
      </Dialog>
    )
}

function Template() {
    const {loading, data, error} = getdata()
  const [formData, setData] = useState({});
  const [valid, setValid] = useState([]);
  const [showValidate, setShowValidate] = useState(false);
  const [add] = mutationdata()
  const [percent , setpercent] = useState(0)
  const [visible, { toggle, setTrue, setFalse }] = useBoolean(false)

// todo
  const postone = (i:string,taskid:number) => {
    // console.log("发送给"+i)
    const postdata = {
      "touser":i,
      "template_id":formData.template_id,
      "data":{
          "task_name":formData.task_name,
          "content":formData.content,
          "deadline":formData.deadline
      },
      "miniprogram":{
          "appid":"wx50c7b88a568501fc",
          "pagepath":"pages/index/formtmp?formTemplateInfo={\"_id\":\"5faba3fc8404d300019ded31\"}&task_id="+taskid
      }
  }
    console.log(postdata)
    return posttemplatemsg(postdata)

  }

  


// 对传入的tags进行推送
  const syncdata = (idarray:number[],taskid:number) =>{
    var userlist:string[] = []
    
      try {
        // let idarray:number[] = []
        // let namearray:string[] = []
        
        // tags.map((item)=>{
        // // gettagsuser(item.id).then((res)=> {
        // //   console.log(res.data.data.openid)
        // //   // todo:遍历openid list推送
        // // })

        // idarray.push(item)
        // // namearray.push(item.name)
        
        // })

        idarray.forEach((item)=> {
          gettagsuser(item).then((res)=> {
            try {
              res.data.data.openid.map((r: string)=>{
                userlist.push(r)
              })
              
            } catch (error) {
              alert("id为"+ item +"的分组为空，推送失败")
            }
              // console.log(res.data)
            //   // todo:遍历openid list推送
            // })
        }).then(()=>{
          // todo:遍历openid list推送
          var succ:number = 0
          const total = userlist.length
          
          userlist.forEach((openid)=>{
            // let count = 5
            postone(openid,taskid).then((res)=>{
              console.log(res)
              if (typeof(res) === "number") {
                succ++

                setpercent(100*(succ/total))
              }else{
                // count--
                // if (count<=0) {
                //   return
                // }
                postone(openid,taskid).then((res)=>{
                  console.log(res)
                  if (typeof(res) === "number") {
                    succ++
    
                    setpercent(100*(succ/total))
                  }else{
                    // count--
                    // if (count<=0) {
                    //   return
                    // }
                    postone(openid,taskid).then((res)=>{
                      console.log(res)
                      if (typeof(res) === "number") {
                        succ++
        
                        setpercent(100*(succ/total))
                      }else{
                        // count--
                        // if (count<=0) {
                        //   return
                        // }
                        postone(openid,taskid).then((res)=>{
                          console.log(res)
                          if (typeof(res) === "number") {
                            succ++
            
                            setpercent(100*(succ/total))
                          }else{
                            // count--
                            // if (count<=0) {
                            //   return
                            // }
                            postone(openid,taskid).then((res)=>{
                              console.log(res)
                              if (typeof(res) === "number") {
                                succ++
                
                                setpercent(100*(succ/total))
                              }else{
                                // count--
                                // if (count<=0) {
                                //   return
                                // }
                                postone(openid,taskid).then((res)=>{
                                  console.log(res)
                                  if (typeof(res) === "number") {
                                    succ++
                    
                                    setpercent(100*(succ/total))
                                  }else{
                                    // count--
                                    // if (count<=0) {
                                    //   return
                                    // }
                                    postone(openid,taskid).then((res)=>{
                                      console.log(res)
                                      if (typeof(res) === "number") {
                                        succ++
                        
                                        setpercent(100*(succ/total))
                                      }else{
                                        // count--
                                        // if (count<=0) {
                                        //   return
                                        // }
                                        alert("发送失败，请检查网络链接")
                                      }
                        
                                      // console.log( )
                                    })
                                  }
                    
                                  // console.log( )
                                })
                              }
                
                              // console.log( )
                            })
                          }
            
                          // console.log( )
                        })
                      }
        
                      // console.log( )
                    })
                  }
    
                  // console.log( )
                })
              }

              // console.log( )
            })
            // console.log(openid)
            
      })
        }
        )
      }
      )
      // console.log(idarray)


      } catch (error) {
        console.log(error)
      }
        
      // console.log(res)
  }

  
  const sendata = (taskid:number) =>{
    // console.log(taskid)
    toggle()

    // todo:取消全部推送
    // console.log(formData.target)

    // getalltags().then((res)=>{
    //   // console.log(res.data)
    //   let newdata = res.data.map((r)=>{
    //     return r.id
    //   })
    //   console.log(newdata)
    //   console.log(formData.target)
    // })
    syncdata(formData.target,taskid)
    
    // console.log(formData)
    // getalltags().then((res)=>{
    //   try{res.data.map((item)=>{
    //     gettagsuser(item.id).then((res)=> {
    //       console.log(res.data.data.openid)
    //       // todo:遍历openid list推送
    //     })
    //     console.log(item.name)
    //   })}catch{}
    //   // console.log(res)
    // })
   
  }

  // todo:推送功能
  const onSubmit = () => {
    // valid 是校验判断的数组，valid 长度为 0 代表校验全部通过
    setShowValidate(true);
    if (valid.length > 0) {
      // alert(`校验未通过字段：${valid.toString()}`);
    } else {
      console.log(formData,"{" + formData.target.join() + "}")
      add({ variables: { 
        ...formData,
        target:"{" + formData.target.join() + "}"
      } }).then((res)=>{
        // 发送模板消息
        sendata(res.data.insert_wxpolice_wx_tasks.returning[0].id)
        // console.log(res)
      })

      
      // alert(JSON.stringify(formData, null, 2));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    const form = data.wxpolice_wx_form[0].form



  return (
    <div>
    <Card free>
    <Card.Content>
    <FormRender
        {...form}
        formData={formData}
        onChange={setData}
        closeable='esc,close'
        onValidate={setValid}
        showValidate={showValidate}
      />
        <Button type="primary" onClick={onSubmit}>提交</Button>
        </Card.Content>
    </Card>
    <DetailDialog visible={visible} onclose={() => {setFalse();setpercent(0)}} percent={percent}/>
    {/* <Button onClick={syncdata}>ssssss</Button> */}
    </div>
  );
}

export default Template;