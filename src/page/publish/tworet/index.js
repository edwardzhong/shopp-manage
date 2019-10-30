import React,{useState,useEffect} from 'react'
import { Input, Checkbox, message } from 'antd'
import { PrevBtn, NextBtn } from '../stepbtn'
import { getActivity,getOrderRequire,updateActivity } from '../../../service'
import {getContext} from '../../../context'
import './style.scss'

const TwoRet = ({prevStep, nextStep}) =>{
    const [req,setReq] = useState(false);
    const [info, setInfo] = useState({store:{platformtype:{name:''}}});
    const [kwList, setkwList] = useState([]);
    const [reqList, setReqList] = useState([]);
    const [reqRet, setReqRet] = useState([])

    const shopType = {'1':'旗舰店','2':'专卖店','3':'专营店'};
    const context = getContext();
    const { state }= context;
    const {sorts,dis,cities } = state;
    const id = state.activityInfo.id||22;
    const store_id = state.activityInfo.store_id||15;
    const activitytype_id = state.activityInfo.activitytype_id||1;

    useEffect(()=>{
        getOrderRequire().then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                const list = data.data.map(d=>({
                        label: d.name,
                        value: d.name
                    })
                )
                setReqList(list);
            }
        });

        getActivity({id}).then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                setInfo(data.data);
                setReqRet((data.data.order_requirement||'').split('|'));
                const list = (data.data.keyword_set||[]).map((k,i)=>{
                    // const sort = sorts.find(s=>s.id == k.sort_way);
                    // const sname = sort? sort.name:'';
                    // const dname = [];
                    // k.service.split('|').forEach(i=>{
                    //     let item = dis.find(d=>d.id == i);
                    //     if(item){
                    //         dname.push(item.name);
                    //     }
                    // });
                    // const add = cities.find(c=>c.num == k.send_address);
                    // const aname = add? ('所在地:'+add.name):'';
                    return {
                        // goodName: k.name,
                        // sortName: '排序方式:' + sname,
                        // brandName: k.brand?('筛选品牌:' + k.brand):'',
                        // disName:'折扣与服务:'+ dname.join('|'),
                        // typeName:'店铺类型:'+ shopType[''+k.store_classify],
                        // otherName: k.extra_info?('其他条件:'+ k.extra_info):'',
                        // priceName:'价格:' + k.price_range.replace('|','-') +'元',
                        // sendName:''+ aname
                        goodName: k.name,
                        sortName: '排序方式:' + k.sort_way,
                        brandName: k.brand?('筛选品牌:' + k.brand):'',
                        disName: k.service?('折扣与服务:'+ k.service):'',
                        typeName:'店铺类型:'+ k.store_classify,
                        otherName: k.extra_info?('其他条件:'+ k.extra_info):'',
                        priceName:'价格:' + k.price_range.replace('|','-') +'元',
                        sendName:k.send_address? ('所在地:'+ k.send_address):''
                    }
                });
                setkwList(list);
            }
        })

    },[]);

    
    const reqChange = ids =>{
        setReqRet(ids);
    };
    const confirm = ()=>{
        const param = {
            order_requirement:reqRet.join('|'),
            id:id,
            store_id:store_id,
            activitytype_id:activitytype_id, 
        }
        const hide = message.loading('请求中...');
        updateActivity(param).then(ret=>{
            hide();
            if(ret.data.error_code === 0){
                setReq(true);
            }
        },err=>{
            hide();
            message.error(err.message,2);
        });
    }
    
    return <>
        <h3>填写商品信息</h3>
        <h4>核对商品信息</h4>
        <div styleName="block">
            <div styleName="block-div">
                <div>
                    <label>商品：</label>
                    <p>{info.goods_title}</p>
                </div>
                <a onClick={prevStep}>修改</a>
            </div>
            <div styleName="block-div">
                <label>规格：</label>
                <p>{info.goods_standard}</p>
                <label>商品售价：</label>
                <p><i>{info.goods_price}</i>元</p>
                <label>每单拍：</label>
                <p><i>{info.goods_nums_per_order}</i>个</p>
            </div>
        </div>
        <h4>如何找到您的商品</h4>
        <div styleName="block">
            <div> 使用“手机{info.store.platformtype.name}搜索框”查找商品 </div>
            {
                kwList.map((k,i)=><div key={i}>
                    <p styleName="kw-item">
                        <strong>来源关键字{i+1}:{k.goodName}</strong>
                        <span>{k.sortName}</span>
                        <span>{k.brandName}</span>
                        <span>{k.disName}</span>
                        <span>{k.typeName}</span>
                        <span>{k.otherName}</span>
                        <span>{k.priceName}</span>
                        <span><strong>{k.sendName}</strong></span>
                    </p>
                </div>)
            }
        </div>
        <div styleName="divider"></div>
        <h4>活动下单要求</h4>
        {
            req ? <>
                <div styleName="block">
                    <div>要与小二先聊天</div>
                    <div>不领优惠券</div>
                    <div>禁止使用信用卡、花呗付款</div>
                </div>
                <div styleName="block">
                    <div><a onClick={()=>setReq(false)}>修改</a></div>
                </div>
            </> : <div styleName="req-block">
            {
                <Checkbox.Group options={reqList} value={reqRet} onChange={reqChange}/>
            }
            <h5>其他要求</h5>
            <div>
                <Input/>
            </div>
            <div styleName="btn-wrap">
                <button className="btn primary" onClick={confirm}>确认提交信息</button>
            </div>
        </div> 
        }
        
        <footer>
            <PrevBtn clickFn={prevStep}>上一步</PrevBtn>
            <NextBtn clickFn={nextStep}>下一步</NextBtn>
        </footer>
    </>
}

export default TwoRet