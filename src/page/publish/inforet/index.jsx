import React, { useState, useEffect } from "react";
import { Input, Checkbox, message } from "antd";
import { PrevBtn, NextBtn } from "../stepbtn";
import { useHistory, useParams } from "react-router-dom";
import { getActivity, getOrderRequire, updateActivitySer } from "@/service";
import { getContext } from "@/context";
import "./style.scss";

const InfoRet = ({ setStep }) => {
	const history = useHistory();
	const params = useParams();
	const id = params.id;
	const context = getContext();
	const { dispatch, state } = context;
	const [req, setReq] = useState(false);
	const [info, setInfo] = useState({ store: { platformtype: { name: "" } } });
	const [kwList, setkwList] = useState([]);
	const [reqList, setReqList] = useState([]);
	const [reqRet, setReqRet] = useState([]);
	
	useEffect(() => {
		if (!id) {
			history.push("/publish/init");
			return;
		}
		setStep(1);
		getOrderRequire().then(ret => {
			const data = ret.data;
			if (data.error_code === 0) {
				const list = data.data.map(d => ({
					label: d.name,
					value: d.name
				}));
				setReqList(list);
			}
		});

		getActivity({ id }).then(ret => {
			const data = ret.data;
			if (data.error_code === 0) {
				const info = data.data;
				info.store_id = info.store.id;
				info.activitytype_id = info.activitytype.id; 
				setInfo(info);
				setReqRet((info.order_requirement || "").split("|"));
				const list = (info.keyword_set || []).map((k, i) => {
					return {
						goodName: k.name,
						sortName: "排序方式:" + k.sort_way,
						brandName: k.brand ? "筛选品牌:" + k.brand : "",
						disName: k.service ? "折扣与服务:" + k.service : "",
						typeName: "店铺类型:" + k.store_classify,
						otherName: k.extra_info ? "其他条件:" + k.extra_info : "",
						priceName: "价格:" + k.price_range.replace("|", "-") + "元",
						sendName: k.send_address ? "所在地:" + k.send_address : ""
					};
				});
				setkwList(list);
			} else {
                message.error(data.msg,2);
            }
		});
	}, []);

	const reqChange = ids => {
		setReqRet(ids);
	};
	const confirm = () => {
		const param = {
			id:Number(id),
            store_id:info.store_id,
			activitytype_id:info.activitytype_id, 
			order_requirement: reqRet.join("|"),
		};
		const hide = message.loading("请求中...");
		updateActivitySer(dispatch, param).then( ret => {
            hide();
            if (ret.data.error_code === 0) {
                setReq(true);
            } else {
                message.error(ret.data.msg, 2);
            }
        }, err => {
            hide();
            message.error(err.message, 2);
        });
	};

	return (
		<>
			<h3>填写商品信息</h3>
			<h4>核对商品信息</h4>
			<div styleName='block'>
				<div styleName='block-div'>
					<div>
						<label>商品：</label>
						<p>{info.goods_title}</p>
					</div>
					<a onClick={() => history.push("/publish/info")}>修改</a>
				</div>
				<div styleName='block-div'>
					<label>规格：</label>
					<p>{info.goods_standard}</p>
					<label>商品售价：</label>
					<p>
						<i>{info.goods_price}</i>元
					</p>
					<label>每单拍：</label>
					<p>
						<i>{info.goods_nums_per_order}</i>个
					</p>
				</div>
			</div>
			<h4>如何找到您的商品</h4>
			<div styleName='block'>
				<div> 使用“手机{info.store.platformtype.name}搜索框”查找商品 </div>
				{kwList.map((k, i) => (
					<div key={i}>
						<p styleName='kw-item'>
							<strong> 来源关键字{i + 1}:{k.goodName} </strong>{" "}
							<span>{k.sortName}</span>
							<span>{k.brandName}</span>
							<span>{k.disName}</span>
							<span>{k.typeName}</span>
							<span>{k.otherName}</span>
							<span>{k.priceName}</span>
							<span> <strong>{k.sendName}</strong> </span>
						</p>
					</div>
				))}
			</div>
			<div styleName='divider'></div>
			<h4>活动下单要求</h4>
			{req ? 
				<>
					<div styleName='block'>
						{reqRet.map((r, i) => (
							<div key={i}>{r}</div>
						))}
					</div>
					<div styleName='block'>
						<div>
							<a onClick={() => setReq(false)}>修改</a>
						</div>
					</div>
				</>
			:   <div styleName='req-block'>
					{
						<Checkbox.Group options={reqList} value={reqRet} onChange={reqChange} />
					}
					<h5>其他要求</h5>
					<div>
						<Input />
					</div>
					<div styleName='btn-wrap'>
						<button className='btn primary' onClick={confirm}>
							确认提交信息
						</button>
					</div>
				</div>
			}

			<footer>
				<PrevBtn clickFn={() => history.push("/publish/info/"+id)}> 上一步 </PrevBtn>
				{
                    req ? <NextBtn clickFn={() => history.push("/publish/num/"+id)}> 下一步 </NextBtn>
				    : <NextBtn disable={true}>下一步</NextBtn>
				}
			</footer>
		</>
	);
};

export default InfoRet;
