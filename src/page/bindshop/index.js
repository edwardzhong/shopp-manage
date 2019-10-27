import React, { useRef, useState } from 'react'
import { getContext } from '../../context'
import { Checkbox, Steps } from 'antd'
import Table from '../../component/table'
import './style.scss'
const { Step } = Steps;

const BindShop = () => {
    const { state, actions } = getContext();
    const column = [
        {title:'所属平台',data:'ter'},
        {title:'店铺名',data:'name'},
        {title:'店铺旺旺',data:'ww'},
        {title:'店铺网址',data:'adr'},
        {title:'状态',data:'status'},
        {title:'绑定日期',data:'date'},
    ];
    const data = [
        { ter:'taobao', name:'清新小铺', ww:'new', adr:'http://aa.com', status:'审核通过', date:'2019-1-1' },
        { ter:'taobao', name:'清新小铺', ww:'new', adr:'http://aa.com', status:'审核通过', date:'2019-1-1' },
    ];
    const onChange=()=>{

    };
    return <div styleName="content">
        <header styleName="header">
            <div>
                <h2 styleName="title">绑定新账户</h2>
                <span>（近活动对应的买手可见，不会被泄露）</span>
            </div>
            <Steps styleName="steps" current={2} size="small">
                <Step title="注册账号" />
                <Step title="绑定店铺" />
            </Steps>
        </header>
        <p styleName="desc">请先完成下面的店铺信息，绑定店铺后即可进入报名活动页面</p>
        <div styleName="form">
            <div styleName="form-item">
                <label>店铺类型：</label>
                <Checkbox onChange={onChange}>淘宝</Checkbox>
                <Checkbox onChange={onChange}>天猫</Checkbox>
            </div>
            <div styleName="form-item">
                <label>店铺主旺旺：</label>
                <input className="input"/>
                <span>（店铺主旺旺绑定后无法修改和删除）</span>
            </div>
            <div styleName="form-item">
                <label>店铺名称：</label>
                <input className="input"/>
                <span>（店铺名称绑定后无法修改和删除）</span>
            </div>
            <div styleName="form-item">
                <label>店铺首页网址：</label>
                <input className="input"/>
            </div>
            <div styleName="form-item">
                <label>验证码：</label>
                <input className="input" styleName="code-input" defaultValue="assd-123" />
                <button className="btn">复制</button>
            </div>
            <div styleName="img-block">
                <p>1、将验证码加到您店铺的某个商家商品的标题上，类似这样</p>
                <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                <p>2、将这个商品详情页链接复制到下面输入框</p>
                <p>提示：店铺绑定成功后，商品标题中添加的验证码可以去掉</p>
            </div>
            <div styleName="form-item">
                <label>商品网址（URL）：</label>
                <input className="input"/>
            </div>
            <div styleName="form-item">
                <label/>
                <p styleName="error">如无法绑定店铺或绑定店铺失败，请联系在线客服处理</p>
            </div>
            <div styleName="form-item">
                <label/>
                <button className="btn primary">确认绑定</button>
            </div>
        </div>
        <div styleName="shop-list">
            <h3>已绑定的店铺</h3>
            <Table column={column} data={data}/>
            <p>共2条</p>
        </div>
    </div>
}

export default BindShop;