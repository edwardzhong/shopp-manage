export default [
	{ key: "1", title:'首页', name: "home", path: "/", layout: "basic", exact: true },
	{ key: "21", title:'基本信息', name: "info", path: "/info", layout: "basic", exact: true },
	{
		key: "22",
		title:'绑定店铺',
		name: "bindshop",
		path: "/bindshop",
		layout: "basic",
		exact: true
	},
	{
		key: "31",
		title:'发起活动',
		name: "publish",
		path: "/publish",
		layout: "basic",
		exact: false
	},
	{
		key: "0",
		title:'活动类型',
		name: "",
		path: "/publish/init",
		layout: "basic",
		exact: true
	},
	{
		key: "0",
		title:'商品信息',
		name: "",
		path: "/publish/info/:id",
		layout: "basic",
		exact: true
	},
	{
		key: "0",
		title:'商品信息确认',
		name: "",
		path: "/publish/inforet/:id",
		layout: "basic",
		exact: true
	},
	{
		key: "0",
		title:'活动数量',
		name: "",
		path: "/publish/num/:id",
		layout: "basic",
		exact: true
	},
	{
		key: "0",
		title:'增值服务',
		name: "",
		path: "/publish/ser/:id",
		layout: "basic",
		exact: true
	},
	{
		key: "0",
		title:'支付活动',
		name: "",
		path: "/publish/pay/:id",
		layout: "basic",
		exact: true
	},
	{
		key: "0",
		title:'活动支付成功',
		name: "",
		path: "/publish/ret",
		layout: "basic",
		exact: true
	},
	{
		key: "0",
		title:'活动详情',
		name: "activity",
		path: "/activity/:id",
		layout: "basic",
		exact: true
	},
	{
		key: "33",
		title:'订单详情',
		name: "order",
		path: "/order",
		layout: "basic",
		exact: true
	},
	{
		key: "41",
		title:'充值金币',
		name: "chargecoin",
		path: "/chargecoin",
		layout: "basic",
		exact: true
	},
	{
		key: "42",
		title:'充值押金',
		name: "chargecash",
		path: "/chargecash",
		layout: "basic",
		exact: true
	},
	{
		key: "43",
		title:'押金提现',
		name: "cashout",
		path: "/cashout",
		layout: "basic",
		exact: true
	},
	{
		key: "44",
		title:'资金记录',
		name: "records",
		path: "/records",
		layout: "basic",
		exact: true
	},
	{
		key: "0",
		title: "商家登录",
		name: "login",
		path: "/login",
		layout: "user",
		isLink: true,
		exact: false
	},
	{
		key: "0",
		title: "商家登录",
		name: "",
		path: "/login/pass",
		layout: "user",
		isLink: true,
		exact: true
	},
	{
		key: "0",
		title: "商家登录",
		name: "",
		path: "/login/code",
		layout: "user",
		isLink: true,
		exact: true
	},
	{
		key: "0",
		title: "商家注册",
		name: "register",
		path: "/register",
		layout: "user",
		isLink: true,
		exact: true
	},
	{
		key: "0",
		title: "找回登录密码",
		name: "findpass",
		path: "/findpass",
		layout: "user",
		isLink: false,
		exact: true
	},
	{
		key: "0",
		title: "修改登录密码",
		name: "modifypass",
		path: "/modifypass",
		layout: "user",
		isLink: false,
		exact: true
	},
	{
		key: "0",
		title: "服务协议",
		name: "protocal",
		path: "/protocal",
		layout: "user",
		exact: true
	},
	{
		key: "0",
		title: "帮助中心",
		name: "help",
		path: "/help",
		layout: "user",
		exact: true
	}
];
